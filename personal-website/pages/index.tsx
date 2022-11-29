import Footer from "../components/Footer";
import Header from "../components/Header";
import FeedbacksFromWorkmates from "../index-page-relevant/FeedbacksFromWorkmates";
import HireMe from "../index-page-relevant/HireMe";
import MyProjects from "../index-page-relevant/MyProjects";
import PersonalIntro from "../index-page-relevant/PersonalIntro";
import SkillsSet from "../index-page-relevant/SkillsSet";
import WorkExperience from "../index-page-relevant/WorkExperience";

export default function Home() {
  return (
    <div className='dark dark:bg-gray-900'>
      <Header />
      <div className='pt-10'>
        <PersonalIntro />
        <WorkExperience />
        <MyProjects />
        <SkillsSet />
        <FeedbacksFromWorkmates />
        <HireMe />
        <Footer />
      </div>
    </div>
  );
}
