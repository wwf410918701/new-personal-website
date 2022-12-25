import Carousel from "../../components/Carsouel";
import Header from "../../components/Header";
import { fetchAllPostsSummaries } from "../../firebase/blogApis";
import { Summary } from "../../firebase/type";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import defaultBlogPoster from "../../public/images/blog/default-blog-poster.png";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Head from "next/head";

interface IBlogs {
  summaries: Summary[];
}

const Blogs = ({ summaries }: IBlogs) => {
  const [loadedAnimation, setLoadedAnimation] = useState(false);
  const [carouselRef, carouselInView, carouselEntry] = useInView({
    /* Optional options */
    threshold: 0.15,
  });
  const [blogsListRef, blogsListInView, blogsListEntry] = useInView({
    /* Optional options */
    threshold: 0.15,
  });

  useEffect(() => {
    setLoadedAnimation(true);
  });

  return (
    <div className='dark dark:bg-gray-900'>
      <Head>
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
        <title>Blog homepage</title>
        <meta
          name='description'
          content='Read all blogs that are shared by Jimmy Wu and other users.'
          key='desc'
        />
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
      </Head>
      <Header />
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <div className='pt-24'>
        {summaries.length > 0 && (
          <div
            className={`flex items-center justify-center ${
              carouselInView || loadedAnimation
                ? "fadeIn-animation-loaded"
                : "fadeIn-animation-preLoad"
            }`}
          >
            <div className='md:w-224 w-96' ref={carouselRef}>
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
        <div
          className='flex flex-col items-center justify-center w-full sm:gap-y-5'
          ref={blogsListRef}
        >
          {summaries.map((summary, index) => (
            <div
              className={`${
                blogsListInView
                  ? "fadeIn-animation-loaded"
                  : "fadeIn-animation-preLoad"
              }`}
              style={{ transitionDelay: `${index * 0.25 + 0.3}s` }}
            >
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
            </div>
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
