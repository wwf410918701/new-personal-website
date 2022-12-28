import { IDomEditor } from "@wangeditor/editor";
import { Router, useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import FileUpload from "../../components/FileUpload";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Input from "../../components/Input";
import LoadingButton from "../../components/LoadingButton";
// NOTE: text editor can't be generate through ssr, so can't be imported through general way
const TextEditor = dynamic(import("../../components/TextEditor/TextEditor"), {
  ssr: false,
});
// import TextEditor from "../../components/TextEditor/TextEditor";
import { fetchPost, fetchPostSummary } from "../../firebase/blogApis";
import { updatePost, uploadImg } from "../../firebase/blogApisWithoutType";
import { Blog, UploadingStatus } from "../../firebase/type";
import { RootStoreContext } from "../_app";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";

const summaryInputHasError = (Summary: string) => {
  if (Summary.trim().length === 0) {
    return true;
  }
  return false;
};

const titleInputHasError = (title: string) => {
  if (title.trim().length === 0) {
    return true;
  }
  return false;
};

const paragraphInputHasError = (paragraph: string) => {
  if (paragraph.trim().length === 0) {
    return true;
  }
  return false;
};

const POSETER_TYPES = ["png", "jpg", "svg"];

const ModifyBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [paragraph, setParagraph] = useState("<p>Enjoying writing!</p>");
  const [posterName, setPosterName] = useState<string>("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [posterHasError, setPosterHasError] = useState(false);
  const editorRef = useRef<IDomEditor | null>(null);
  const allUploadedImages = useRef<string[]>([]);
  const [hasTouched, setHasTouched] = useState({
    title: false,
    summary: false,
    paragraph: false,
  });
  const [submitStatus, setSubmitStatus] = useState<UploadingStatus>("default");
  const { userStore } = useContext(RootStoreContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPost(id as string)
        .then((blog) => {
          if (blog) {
            setTitle(blog.title);
            setParagraph(blog.content);
          }
        })
        .then(() => {
          fetchPostSummary(parseInt(id as string)).then((blogSummary) => {
            if (blogSummary) {
              setSummary(blogSummary.summary);
              setPosterUrl(blogSummary.posterImgUrl);
            }
          });
        })
        .catch((e) => {
          console.log(
            "Errors when fetching blog data, please try again later."
          );
          console.log(e);
        });
    }
  }, [id]);

  const handleBlogModification = () => {
    setHasTouched({
      title: true,
      summary: true,
      paragraph: true,
    });
    if (
      titleInputHasError(title) ||
      summaryInputHasError(summary) ||
      paragraphInputHasError(paragraph) ||
      posterHasError
    ) {
      return;
    }
    setSubmitStatus("loading");
    if (posterFile) {
      uploadImg(posterName, posterFile)
        .then(async (posterImgUrl) => {
          await updatePost(
            id,
            title,
            summary,
            paragraph,
            userStore.userName,
            posterImgUrl,
            userStore.userID
          );
        })
        .then(() => {
          setSubmitStatus("success");
          router.push("/blogs");
        })
        .catch((e) => {
          console.log("Error when submitting new blog");
          console.log(e);
          setSubmitStatus("failure");
        });
    } else {
      updatePost(
        title,
        summary,
        paragraph,
        userStore.userName,
        null,
        userStore.userID
      )
        .then(() => {
          setSubmitStatus("success");
          router.push("/blogs");
        })
        .catch((e) => {
          console.log("Error when submitting new blog");
          console.log(e);
          setSubmitStatus("failure");
        });
    }
  };

  const updateAllUploadedImages = (newAllUploadedImages: string[]) => {
    allUploadedImages.current = [
      ...allUploadedImages.current,
      ...newAllUploadedImages,
    ];
  };

  return (
    <div className='dark dark:bg-gray-900'>
      <Head>
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
        <title>{`Modify blog ${title}`}</title>
      </Head>
      <Header />
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <div className='z-10 flex flex-col items-center justify-center w-full min-h-screen pt-36'>
        <div className='z-10 flex flex-col md:w-260 w-96'>
          <div className='z-10 mb-10'>
            <h2 className='mb-5 text-white'>Title</h2>
            <Input
              onUpdate={function (inputString: string): void {
                setHasTouched((preState) => ({
                  ...preState,
                  title: true,
                }));
                setTitle(inputString);
              }}
              placeHolder={"Title..."}
              type={"text"}
              id={"title"}
              required={true}
              value={title}
              isError={hasTouched.title && titleInputHasError(title)}
            />
          </div>
          <div className='z-10 mb-10'>
            <h2 className='mb-5 text-white'>Summary</h2>
            <Input
              onUpdate={function (inputString: string): void {
                setHasTouched((preState) => ({
                  ...preState,
                  summary: true,
                }));
                setSummary(inputString);
              }}
              placeHolder={"Summary of the blog..."}
              type={"text"}
              id={"summary"}
              required={true}
              isError={hasTouched.summary && summaryInputHasError(summary)}
              value={summary}
            />
          </div>
          <div className={`mb-10 `}>
            <h2
              className={`mb-5 text-white ${
                posterHasError ? "!text-red-500" : ""
              }`}
            >
              Poster
            </h2>
            {posterUrl ? (
              <div className='flex flex-col items-center md:flex-row'>
                <img src={posterUrl} alt='blog-poster' className='max-w-sm' />
                <button
                  className='mt-5 md:ml-5'
                  onClick={(e) => {
                    e.preventDefault();
                    setPosterUrl(null);
                  }}
                >
                  <svg
                    className='w-6 h-6 text-red-500 hover:text-red-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <FileUpload
                updateFileName={function (fileName: string): void {
                  if (POSETER_TYPES.includes(fileName.split(".")[1])) {
                    setPosterHasError(false);
                    setPosterName(fileName);
                  } else {
                    setPosterHasError(true);
                  }
                }}
                updateFile={function (file: File): void {
                  setPosterFile(file);
                }}
                hasError={posterHasError}
              />
            )}
          </div>
          <h2 className='mb-5 text-white'>Content</h2>
          <div
            className={`${
              hasTouched.paragraph && paragraphInputHasError(paragraph)
                ? "border-2 border-red-500 border-solid"
                : ""
            }`}
          >
            <TextEditor
              placeholder={paragraph}
              updateCallback={function (htmlString: string): void {
                setParagraph(htmlString);
              }}
              blogId={""}
              updateAllUploadedImages={updateAllUploadedImages}
              updateEditor={(editor: IDomEditor) =>
                (editorRef.current = editor)
              }
            />
          </div>
          <div className='flex flex-row items-center justify-center mt-10'>
            <LoadingButton
              isLoading={submitStatus === "loading"}
              handleCallBack={handleBlogModification}
            >
              DONE
            </LoadingButton>
            <button
              type='button'
              className='focus:outline-none w-24 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ModifyBlog;
