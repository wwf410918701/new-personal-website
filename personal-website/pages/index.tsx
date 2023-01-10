import Footer from "../components/Footer";
import Header from "../components/Header";
import FeedbacksFromWorkmates from "../index-page-relevant/FeedbacksFromWorkmates";
import HireMe from "../index-page-relevant/HireMe";
import MyProjects from "../index-page-relevant/MyProjects";
import PersonalIntro from "../index-page-relevant/PersonalIntro";
import SkillsSet from "../index-page-relevant/SkillsSet";
import WorkExperience from "../index-page-relevant/WorkExperience";
import backgroundImg from "../public/images/public/background-img.jpg";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [workExpRef, workExpInView, workExpEntry] = useInView({
    /* Optional options */
    threshold: 0.15,
  });
  const [projExpRef, projInView, projEntry] = useInView({
    /* Optional options */
    threshold: 0.15,
  });
  const [skillsRef, skillsInView, skillsEntry] = useInView({
    /* Optional options */
    threshold: 0.15,
  });
  const [feedbackRef, feedbackInView, feedbackEntry] = useInView({
    /* Optional options */
    threshold: 0.15,
  });
  const [hireMeRef, hireMeInView, hireMeEntry] = useInView({
    /* Optional options */
    threshold: 0.15,
  });

  return (
    <div className='dark dark:bg-gray-900'>
      <Head>
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
        <title>About me</title>
        <meta
          name='description'
          content='Software / Frontend / React / NextJS / Javascript Engineer with one year experience looking for full time opportunity of June next year after graduation.'
          key='desc'
        />
      </Head>
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <Header />
      <div className='z-10 pt-10'>
        <div className='overflow-x-hidden overflow-y-scroll snap-mandatory snap-y scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-gray-300'>
          <div className='flex items-center justify-center w-full min-h-screen'>
            <section id='PersonalIntro' className='snap-start'>
              <PersonalIntro />
            </section>
          </div>
          <div className='flex justify-center w-full'>
            <div
              className={`${
                workExpInView
                  ? "fadeIn-animation-loaded"
                  : "fadeIn-animation-preLoad"
              } dark:bg-gray-800 md:w-260 w-92 pt-10 md:mt-5 !mt-24 rounded-2xl`}
            >
              <section
                id='workExperience'
                className='snap-start'
                ref={workExpRef}
              >
                <WorkExperience />
              </section>
            </div>
          </div>
          <div className='flex justify-center w-full'>
            <div
              className={`${
                projInView
                  ? "fadeIn-animation-loaded"
                  : "fadeIn-animation-preLoad"
              } dark:bg-gray-800 md:w-260 w-92 pt-10 !mt-24 pb-16 rounded-2xl`}
            >
              <section className='snap-start' ref={projExpRef}>
                <MyProjects />
              </section>
            </div>
          </div>
          <div className='flex justify-center w-full'>
            <div
              className={`${
                skillsInView
                  ? "fadeIn-animation-loaded"
                  : "fadeIn-animation-preLoad"
              } dark:bg-gray-800 md:w-260 w-92 pt-10 !mt-24 pb-16 rounded-2xl`}
            >
              <section id='SkillsSet' className='snap-start' ref={skillsRef}>
                <SkillsSet />
              </section>
            </div>
          </div>
          <div className='flex justify-center w-full'>
            <div
              className={`${
                feedbackInView
                  ? "fadeIn-animation-loaded"
                  : "fadeIn-animation-preLoad"
              } dark:bg-gray-800 md:w-260 w-92 pt-10 !mt-24 pb-14 rounded-2xl`}
            >
              <section id='SkillsSet' className='snap-start' ref={feedbackRef}>
                <FeedbacksFromWorkmates />
              </section>
            </div>
          </div>
          <div className='flex justify-center w-full'>
            <div
              className={`${
                hireMeInView
                  ? "fadeIn-animation-loaded"
                  : "fadeIn-animation-preLoad"
              } dark:bg-gray-800 md:w-260 w-92 pt-10 !mt-24 pb-14 rounded-2xl`}
            >
              <section className='snap-start' ref={hireMeRef}>
                <HireMe />
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
