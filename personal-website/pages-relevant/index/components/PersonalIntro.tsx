import CodingPng from "../../../public/images/index/CodingPng.png";
import Image from "next/image";
import PersonalLinkedInIcon from "../../../components/PersonalLinkedIcon";

const PersonalIntro = () => (
  <div className='w-full flex justify-center items-center'>
    <div className='flex flex-col md:flex-row items-center md:p-20'>
      <div className='md:w-128 w-80 md:mt-0 md:text-left flex flex-col text-center items-start mr-10 mt-10'>
        <h1 className='dark:text-white'>
          Hi, I'm Jimmy, a frontend developer.
          <span className='ml-2'>
            <PersonalLinkedInIcon />
          </span>
        </h1>
        <h2 className='dark: text-gray-200'>
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
        className='md:w-96 md:h-96 w-80 h-80'
        alt='W slogon'
      />
    </div>
  </div>
);

export default PersonalIntro;
