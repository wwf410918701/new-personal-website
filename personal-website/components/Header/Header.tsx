import WSlogon from "../../public/images/public/websiteSlogan.webp";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../pages/_app";
import { useRouter } from "next/router";

interface IHeaderInButton {
  text: string;
  link: string;
  selected: boolean;
}

const HeaderInButton = ({ text, link, selected }: IHeaderInButton) => (
  <a
    href={link}
    className={`${
      selected
        ? "text-white dark:text-white block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
        : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    }`}
    aria-current='page'
  >
    {text}
  </a>
);

const HEADER_BUTTONS_CONFIG = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Blogs",
    link: "/blogs",
  },
  {
    text: "Contact",
    link: "#",
  },
  {
    text: "About Me",
    link: "#",
  },
];

const Header = observer(() => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userStore } = useContext(RootStoreContext);
  const { asPath } = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className='bg-white absolute z-50 w-full border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <a className='flex items-center'>
          <Image src={WSlogon} className='w-6 h-6 mr-3 ' alt='W slogon' />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            Jimmy's Personal
          </span>
        </a>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => toggleDropdown()}
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div
          className={`${
            dropdownVisible ? "" : "hidden"
          }  w-full md:block md:w-auto`}
          id='navbar-default'
        >
          <ul className='flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 '>
            {HEADER_BUTTONS_CONFIG.map((header_button_config) => (
              <li key={header_button_config.text}>
                <HeaderInButton
                  text={header_button_config.text}
                  link={header_button_config.link}
                  selected={asPath === header_button_config.link}
                />
              </li>
            ))}
            {userStore.userID ? (
              <li>
                <HeaderInButton text={"Log Out"} link={"#"} selected={false} />
              </li>
            ) : (
              <li>
                <HeaderInButton text={"Login"} link={"#"} selected={false} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Header;
