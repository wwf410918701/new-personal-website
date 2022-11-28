import PersonalGithubIcon from "../PersonalGithubIcon";
import PersonalLinkedInIcon from "../PersonalLinkedIcon";

const Footer = () => (
  <footer className='p-4 bg-white rounded-lg md:pl-24 md:pr-24 shadow md:flex md:items-center md:justify-between mt-8 md:p-6 dark:bg-gray-800'>
    <div className='sm:flex md:w-full md:items-stretch sm:items-center sm:justify-between'>
      <h3 className=' text-gray-500 sm:text-center dark:text-gray-400'>
        Find Jimmy at:
      </h3>
      <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
        <PersonalLinkedInIcon />
        <PersonalGithubIcon />
      </div>
    </div>
  </footer>
);

export default Footer;
