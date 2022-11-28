import Footer from "../components/Footer";
import Header from "../components/Header";
import FeedbacksFromWorkmates from "../pages-relevant/index/components/FeedbacksFromWorkmates";
import HireMe from "../pages-relevant/index/components/HireMe";
import MyProjects from "../pages-relevant/index/components/MyProjects";
import PersonalIntro from "../pages-relevant/index/components/PersonalIntro";
import SkillsSet from "../pages-relevant/index/components/SkillsSet";
import WorkExperience from "../pages-relevant/index/components/WorkExperience";

export default function Home() {
  return (
    <div className='dark dark:bg-gray-900 '>
      <Header />
      <PersonalIntro />
      <WorkExperience />
      <MyProjects />
      <SkillsSet />
      <FeedbacksFromWorkmates />
      <HireMe />
      <Footer />
    </div>
  );
}
