import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Paper from "../../components/Paper";
import { fetchAllPostsSummaries, fetchPost } from "../../firebase/blogApis";
import { Blog } from "../../firebase/type";
import CommentCard from "./components/CommentCard";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
interface IBlog {
  blog: Blog | null;
}

const Blog = ({ blog }: IBlog) => (
  <div className='dark dark:bg-gray-900'>
    <Header />
    <Image
      src={backgroundImg}
      alt='flowerImg-background'
      className='fixed top-0 z-0 h-screen'
    />
    <div className='z-10 flex flex-col items-center justify-center w-full pt-36 gap-y-10 dark:text-white'>
      <div className='z-10 flex flex-col items-center justify-between min-h-screen p-5 bg-gray-800 opacity-80 sm:p-20 rounded-xl gap-y-10'>
        {blog ? (
          <>
            <div className='flex flex-col items-center justify-center gap-y-5'>
              <h1 className='text-center'>{blog?.title}</h1>
              <div className='flex flex-row justify-between w-80'>
                <p>
                  BY:
                  <span className='pl-1 text-blue-400'>{`${
                    blog.author ?? "No Data"
                  }`}</span>
                </p>
                <p>
                  Create At:{" "}
                  <span className='pl-1 text-blue-400'>{`${
                    blog.time ?? "No Data"
                  }`}</span>
                </p>
              </div>
            </div>
            <div
              className='break-all overflow-clip sm:w-112 md:w-224 w-80'
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className='sm:w-112 md:w-224 w-96 overflow-clip '>
              <div className='flex flex-row items-center justify-center w-full'>
                <div className='w-full border-b border-gray-200 dark:border-gray-600' />
                <h2 className='w-full text-center'>Comments</h2>
                <div className='w-full border-b border-gray-200 dark:border-gray-600' />
              </div>
              {blog.comments.map((comment) => (
                <CommentCard
                  key={comment.commentID}
                  comment={comment.content}
                  author={comment.displayName}
                  createAt={comment.createAt}
                />
              ))}
            </div>
          </>
        ) : (
          <h1>Sorry, this blog not exist, may be deleted.</h1>
        )}
      </div>
    </div>
    <Footer />
  </div>
);

export async function getStaticPaths() {
  const res = await fetchAllPostsSummaries();
  const paths = res.map((re) => ({
    params: { id: re.id.toString() },
  }));

  return { paths, fallback: false };
}

interface IgetStaticProps {
  params: { id: string };
}

export async function getStaticProps({ params: { id } }: IgetStaticProps) {
  const blog = await fetchPost(id);

  return { props: { blog } };
}

export default Blog;
