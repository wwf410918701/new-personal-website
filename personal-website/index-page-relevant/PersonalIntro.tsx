import CodingPng from "../public/images/index/codingPng.png";
import Image from "next/image";
import PersonalLinkedInIcon from "../components/PersonalLinkedIcon";

const PersonalIntro = () => (
  <div className='flex items-center justify-center w-full'>
    <div className='flex flex-col items-center md:flex-row md:p-20'>
      <div className='z-10 flex flex-col items-start mt-10 text-center md:mr-10 md:w-128 w-80 md:mt-0 md:text-left'>
        <h1 className='z-10 dark:text-white'>
          Hi, I'm Jimmy, a frontend developer.
          <span className='ml-2 '>
            <PersonalLinkedInIcon />
          </span>
        </h1>
        <h2 className='text-gray-200 dark:'>
          I have one and a half year experience in frontend development and
          looking for full time opportunity of June next year after my
          graduation.
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
  </div>
);

export default PersonalIntro;
