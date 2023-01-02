import { IDomEditor } from "@wangeditor/editor";
import { useRouter } from "next/router";
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
import { fetchPost, fetchPostSummary } from "../../firebase/blogApis";
import { updatePost, uploadImg } from "../../firebase/blogApisWithoutType";
import { UploadingStatus } from "../../firebase/type";
import { RootStoreContext } from "../_app";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import ConfirmModal from "../../components/ConfirmModal";
import { auth } from "../../firebase/config";
import { fetchUserInfo } from "../../firebase/usersRelevantApis";

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

const POSETER_TYPES = ["png", "jpg", "svg", "jpeg", "svg+xml"];

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
  const [alreadyLoadedData, setAlreadyLoadedData] = useState(false);
  const [errorPromptVisible, setErrorPromptVisible] = useState(false);
  const [giveupConfirmModalVisible, setGiveupConfirmModalVisible] =
    useState(false);
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
          fetchPostSummary(id as string).then((blogSummary) => {
            if (blogSummary) {
              setSummary(blogSummary.summary);
              setPosterUrl(blogSummary.posterImgUrl);
            }
          });
        })
        .then(() => {
          setAlreadyLoadedData(true);
        })
        .catch((e) => {
          console.log(
            "Errors when fetching blog data, please try again later."
          );
          console.log(e);
          setAlreadyLoadedData(false);
          setErrorPromptVisible(true);
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
          ).then(async () => {
            await fetch("/api/revalidateBlogs");
            await fetch("/api/revalidateBlog", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,
              }),
            });
          });
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
        id,
        title,
        summary,
        paragraph,
        userStore.userName,
        posterUrl,
        userStore.userID
      )
        .then(async () => {
          await fetch("/api/revalidateBlogs");
          await fetch("/api/revalidateBlog", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
            }),
          });
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
      <ConfirmModal
        type='error'
        message='Errors happen when loading old blog data, please try again'
        visible={errorPromptVisible}
        onConfirm={() => {
          setErrorPromptVisible(false);
          router.push("/blogs");
        }}
        onCancel={() => {
          setErrorPromptVisible(false);
          router.push("/blogs");
        }}
      />
      <ConfirmModal
        type='error'
        message='Are you sure to give up modification?'
        visible={giveupConfirmModalVisible}
        onConfirm={() => {
          setGiveupConfirmModalVisible(false);
          router.push("/blogs");
        }}
        onCancel={() => {
          setGiveupConfirmModalVisible(false);
        }}
      />
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
        {alreadyLoadedData ? (
          <div className='z-10 flex flex-col md:w-260 w-92'>
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
                  updateFileName={function (fileName: string): void {}}
                  updateFile={function (file: File): void {
                    const fileType = file.type.split("/")[1];

                    if (POSETER_TYPES.includes(fileType)) {
                      setPosterHasError(false);
                      setPosterName(file.name);
                      setPosterFile(file);
                    } else {
                      setPosterHasError(true);
                    }
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
                onClick={(e) => {
                  e.preventDefault();
                  setGiveupConfirmModalVisible(true);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <div role='status'>
              <svg
                className='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

interface IModifyBlogProtecterWrapperComponent {
  children: JSX.Element;
}

const ModifyBlogProtecterWrapperComponent = ({
  children,
}: IModifyBlogProtecterWrapperComponent) => {
  const [alreadyCheckUserLogin, setAlreadyCheckUserLogin] = useState(false);
  const [userAuthorizedToModify, setUserAuthorizedToModify] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user.uid)
          .then((userInfo: any) => {
            if ((userInfo.blogs as string[]).includes(id as string)) {
              setUserAuthorizedToModify(true);
            } else {
              setUserAuthorizedToModify(false);
            }
          })
          .then(() => {
            setAlreadyCheckUserLogin(true);
          });
      } else {
        setAlreadyCheckUserLogin(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!userAuthorizedToModify && alreadyCheckUserLogin) {
      router.push("/blogs");
    }
  }, [alreadyCheckUserLogin, userAuthorizedToModify]);

  return alreadyCheckUserLogin ? (
    !userAuthorizedToModify ? (
      <div className='flex items-center justify-center w-screen h-screen dark dark:bg-gray-900'>
        <Image
          src={backgroundImg}
          alt='flowerImg-background'
          className='fixed top-0 z-0 h-screen'
        />
      </div>
    ) : (
      children
    )
  ) : (
    <div className='flex items-center justify-center w-screen h-screen dark dark:bg-gray-900'>
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <div className='text-center'>
        <div role='status'>
          <svg
            className='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    </div>
  );
};

const ProtectedModifyBlog = () => (
  <ModifyBlogProtecterWrapperComponent>
    <ModifyBlog />
  </ModifyBlogProtecterWrapperComponent>
);

export default ProtectedModifyBlog;
