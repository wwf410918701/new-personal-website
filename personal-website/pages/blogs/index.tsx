import Carousel from "../../components/Carsouel";
import Header from "../../components/Header";
import { fetchAllPostsSummaries } from "../../firebase/blogApis";
import { Summary } from "../../firebase/type";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import defaultBlogPoster from "../../public/images/blog/default-blog-poster.png";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
interface IBlogs {
  summaries: Summary[];
}

const Blogs = ({ summaries }: IBlogs) => {
  return (
    <div className='dark dark:bg-gray-900'>
      <Header />
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <div className='pt-24'>
        {summaries.length > 0 && (
          <div className='flex items-center justify-center'>
            <div className='md:w-224 w-96'>
              <Carousel
                images={summaries.map((summary) => ({
                  src: summary.posterImgUrl,
                  linkPage: summary.id,
                  title: summary.title,
                }))}
              />
            </div>
          </div>
        )}
        <div className='flex flex-col items-center justify-center w-full sm:gap-y-5'>
          {summaries.map((summary) => (
            <Card
              key={summary.id}
              posterUrl={
                summary?.posterImgUrl === ""
                  ? defaultBlogPoster
                  : summary?.posterImgUrl
              }
              title={summary.title}
              des={summary.summary}
              linkPageUrl={summary.id}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const summaries = await fetchAllPostsSummaries();
  return {
    props: {
      summaries,
    },
  };
}

export default Blogs;
