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
import { useSelector } from "react-redux";
import { RootStoreContext } from "../_app";
import Router from "next/router";
import { uploadImg, storePost } from "../../firebase/blogApisWithoutType";

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
    console.log("handleBlogPost");
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
    console.log("posterFile");
    console.log(posterFile);
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
          setSubmitStatus("success");
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
      );
    }
  };

  return (
    <div className='dark dark:bg-gray-900'>
      <Header />
      <div className='flex flex-col items-center justify-center w-full min-h-screen pt-36 '>
        <div className='flex flex-col md:w-260 w-96'>
          <div className='mb-10'>
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
          <div className='mb-10'>
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
          <div className={`mb-10 `}>
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
