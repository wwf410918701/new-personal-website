import Footer from "../../components/Footer";
import Header from "../../components/Header";
const TextEditor = dynamic(
  () => import("../../components/TextEditor/TextEditor"),
  { ssr: false }
);
import { IDomEditor } from "@wangeditor/editor";
import dynamic from "next/dynamic";
import { useContext, useRef, useState } from "react";
import Input from "../../components/Input";
import LoadingButton from "../../components/LoadingButton";
import { UploadingStatus } from "../../firebase/type";
import FileUpload from "../../components/FileUpload";
import { RootStoreContext } from "../_app";
import Router from "next/router";
import { uploadImg, storePost } from "../../firebase/blogApisWithoutType";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
import Head from "next/head";

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

const WriteBlogPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [paragraph, setParagraph] = useState("<p>Enjoying writing!</p>");
  const [posterName, setPosterName] = useState<string>("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
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

  const updateAllUploadedImages = (newAllUploadedImages: string[]) => {
    allUploadedImages.current = [
      ...allUploadedImages.current,
      ...newAllUploadedImages,
    ];
  };

  const handleBlogPost = () => {
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
          await storePost(
            title,
            summary,
            paragraph,
            userStore.userName,
            posterImgUrl,
            userStore.userID
          );
        })
        .then(() => {
          fetch(
            "https://next-personal-blog-9fxg.vercel.app/api/revalidateBlogs?secret=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDA2MDIxOTk5MDUwNiIsIm5hbWUiOiJKaW1teSBXdSIsIndlYnNpdGUiOiJwZXJzb25hbCBibG9nIG9mIEppbW15In0.AJeRrqzPP06IWCbKOwfjjxT9oOS4CMfBOdVhduNjg5Q"
          );
          setSubmitStatus("success");
          Router.push("/blogs");
        })
        .catch((e) => {
          console.log("Error when submitting new blog");
          console.log(e);
          setSubmitStatus("failure");
        });
    } else {
      storePost(
        title,
        summary,
        paragraph,
        userStore.userName,
        null,
        userStore.userID
      )
        .then(() => {
          setSubmitStatus("success");
          Router.push("/blogs");
        })
        .catch((e) => {
          console.log("Error when submitting new blog");
          console.log(e);
          setSubmitStatus("failure");
        });
    }
  };

  return (
    <div className='dark dark:bg-gray-900'>
      <Head>
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
        <title>Post your blog</title>
      </Head>
      <Header />
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <div className='z-10 flex flex-col items-center justify-center w-full min-h-screen pt-36'>
        <div className='z-10 flex flex-col md:w-260 w-96 '>
          <div className='z-10 mb-10 '>
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
              isError={hasTouched.title && titleInputHasError(title)}
            />
          </div>
          <div className='z-10 mb-10 '>
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
            />
          </div>
          <div className={`mb-10  z-10 `}>
            <h2
              className={`mb-5 text-white ${
                posterHasError ? "!text-red-500" : ""
              }`}
            >
              Poster
            </h2>
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
          </div>
          <h2 className='z-10 mb-5 text-white '>Content</h2>
          <div
            className={`${
              hasTouched.paragraph && paragraphInputHasError(paragraph)
                ? "border-2 border-red-500 border-solid"
                : ""
            }  z-10 `}
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
          <div className='z-10 flex flex-row items-center justify-center mt-10 '>
            <LoadingButton
              isLoading={submitStatus === "loading"}
              handleCallBack={handleBlogPost}
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

export default WriteBlogPage;
