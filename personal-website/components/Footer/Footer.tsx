import PersonalGithubIcon from "../PersonalGithubIcon";
import PersonalLinkedInIcon from "../PersonalLinkedIcon";

const Footer = () => (
  <footer className='z-10 p-4 mt-8 bg-white shadow opacity-90 md:pl-24 md:pr-24 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800'>
    <div className='z-10 sm:flex md:w-full md:items-stretch sm:items-center sm:justify-between'>
      <h3 className='z-10 text-gray-500 sm:text-center dark:text-gray-400'>
        Find Jimmy at:
      </h3>
      <div className='z-10 flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
        <PersonalLinkedInIcon />
        <PersonalGithubIcon />
      </div>
    </div>
  </footer>
);

export default Footer;
