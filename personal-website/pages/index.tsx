import Footer from "../components/Footer";
import Header from "../components/Header";
import FeedbacksFromWorkmates from "../index-page-relevant/FeedbacksFromWorkmates";
import HireMe from "../index-page-relevant/HireMe";
import MyProjects from "../index-page-relevant/MyProjects";
import PersonalIntro from "../index-page-relevant/PersonalIntro";
import SkillsSet from "../index-page-relevant/SkillsSet";
import WorkExperience from "../index-page-relevant/WorkExperience";
import backgroundImg from "../public/images/public/background-img.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className='dark dark:bg-gray-900'>
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <Header />
      <div className='z-10 pt-10'>
        <div className='overflow-x-hidden overflow-y-scroll snap-mandatory snap-y scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-gray-300'>
          <section id='PersonalIntro' className='snap-start'>
            <PersonalIntro />
          </section>
          <section id='WorkExperience' className='snap-start'>
            <WorkExperience />
          </section>
          <section id='MyProjects' className='snap-start'>
            <MyProjects />
          </section>
          <section id='SkillsSet' className='snap-start'>
            <SkillsSet />
            <FeedbacksFromWorkmates />
          </section>
          <section id='FeedbacksFromWorkmates' className='snap-start'>
            <HireMe />
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}
