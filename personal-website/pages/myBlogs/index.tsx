import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import ConfirmModal from "../../components/ConfirmModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchPostSummary } from "../../firebase/blogApis";
import { deletePost } from "../../firebase/blogApisWithoutType";
import { Summary } from "../../firebase/type";
import defaultBlogPoster from "../../public/images/blog/default-blog-poster.png";
import { RootStoreContext } from "../_app";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
import Head from "next/head";

interface IMyBlogs {
  summaries: Summary[];
}

const MyBlogs = observer(() => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const { userStore } = useContext(RootStoreContext);
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState<{
    [index: string]: boolean;
  }>({});
  const router = useRouter();

  useEffect(() => {
    Promise.allSettled(
      userStore.userBlogs.map((blogid) => fetchPostSummary(blogid))
    )
      .then((results) => {
        setSummaries(
          results
            .map((result) => {
              if (result.status === "fulfilled") {
                return result.value;
              }
            })
            .filter((resultValue) => resultValue) as Summary[]
        );
      })
      .catch((e) => {
        console.log("Error when loading user's blogs");
        console.log(e);
      });
  }, [userStore.userBlogs]);

  const handleBlogDelete = (summaryId: string) => {
    setDeleteConfirmModalVisible({ [summaryId]: false });
    deletePost(summaryId, userStore.userID)
      .then(() => {
        setSummaries(
          summaries.filter(
            (blogSummaryarray) => blogSummaryarray.id !== summaryId
          )
        );
      })
      .then(async () => {
        await fetch(
          "/api/revalidateBlogs?secret=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDA2MDIxOTk5MDUwNiIsIm5hbWUiOiJKaW1teSBXdSIsIndlYnNpdGUiOiJwZXJzb25hbCBibG9nIG9mIEppbW15In0.AJeRrqzPP06IWCbKOwfjjxT9oOS4CMfBOdVhduNjg5Q"
        );
      })
      .catch((error) => {
        console.log("Error when deleting blogs " + " postID");
        console.log(error);
      });
  };

  return (
    <div className='dark dark:bg-gray-900'>
      <Head>
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
        <title>Your own blogs</title>
      </Head>
      <Header />
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <div className='relative flex flex-col items-center justify-start w-full min-h-screen pt-52 sm:gap-y-5'>
        <div className='absolute pb-10 sm:w-112 md:w-144 xl:w-260 top-32 w-96'>
          <div className='flex flex-row items-center justify-center w-full'>
            <div className='w-full border-b border-gray-200 dark:border-gray-600' />
            <h2 className='w-full text-center text-white'>Your Posts</h2>
            <div className='w-full border-b border-gray-200 dark:border-gray-600' />
          </div>
        </div>
        {summaries.map((summary, index) => (
          <div
            className='flex flex-col items-center sm:flex-row gap-x-5'
            key={`summary-${index}`}
          >
            <ConfirmModal
              visible={deleteConfirmModalVisible[summary.id]}
              type={"error"}
              message={`Are you sure to delete blog ${summary.title}`}
              onConfirm={() => {
                handleBlogDelete(summary.id);
                setDeleteConfirmModalVisible({});
              }}
              onCancel={() => {
                setDeleteConfirmModalVisible({});
              }}
            />
            <Card
              key={summary.id}
              posterUrl={
                summary?.posterImgUrl === "" || !summary?.posterImgUrl
                  ? defaultBlogPoster
                  : summary?.posterImgUrl
              }
              title={summary.title}
              des={summary.summary}
              linkPageUrl={summary.id}
            />
            <div className='flex flex-row sm:gap-y-1 gap-x-1 sm:flex-col'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/modifyBlog/${summary.id}`);
                }}
              >
                <svg
                  className='w-6 h-6 text-blue-500 hover:text-blue-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z'></path>
                  <path
                    fillRule='evenodd'
                    d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteConfirmModalVisible(() => ({
                    [summary.id]: true,
                  }));
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
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
});

export default MyBlogs;
