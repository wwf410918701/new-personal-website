import CodingPng from "../public/images/index/codingPng.png";
import Image from "next/image";
import PersonalLinkedInIcon from "../components/PersonalLinkedIcon";

const PersonalIntro = () => (
  <div className='flex flex-col items-center justify-center w-full'>
    <div className='flex flex-col items-center pb-8 md:pb-10 md:flex-row md:p-20'>
      <div className='z-10 flex flex-col items-start mt-10 text-center md:mr-10 md:w-128 w-80 md:mt-0 md:text-left'>
        <h1 className='z-10 dark:text-white'>
          Hi, I'm Jimmy, a frontend developer.
          <span className='ml-2 '>
            <PersonalLinkedInIcon />
          </span>
        </h1>
        <h2 className='text-gray-200 dark:'>
          I have one year experience in frontend development and looking for
          full time opportunity of June next year after my graduation.
        </h2>
        <p className=' dark:text-white/50'>
          I am now a student of unimelb, majoring in master of IT and working as
          part time frontend developer in{" "}
          <a
            onClick={() => window.open("https://www.sparkreliefteachers.com/")}
          >
            SPARK RELIEF TEACHERS
          </a>
          . I previously worked as frontend developer intern in{" "}
          <a onClick={() => window.open("https://www.sensetime.com/en")}>
            Sensetime
          </a>
          , which is the top one Chinese AI company. Besides, I also worked in{" "}
          <a
            onClick={() =>
              window.open("https://www.pgcareers.com/location-greaterchina")
            }
          >
            P&G China
          </a>{" "}
          as Software Engineer intern. Building apps is both my job and
          interests.
        </p>
      </div>
      <Image
        src={CodingPng}
        className='z-10 md:w-96 md:h-96 w-80 h-80'
        alt='W slogon'
      />
    </div>
    <div className='z-10 flex justify-center w-full gap-x-2'>
      <button
        type='button'
        className='focus:outline-none z-10 text-white opacity-80 bg-cGreen hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
        onClick={(e) => {
          e.preventDefault();
          document
            .querySelector("#workExperience")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Work Experience
      </button>
      <button
        type='button'
        className='focus:outline-none text-white bg-cPurple hover:bg-purple-400 opacity-80 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 '
        onClick={(e) => {
          e.preventDefault();
          document
            .querySelector("#myProjects")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        My Projects
      </button>
    </div>
  </div>
);

export default PersonalIntro;
