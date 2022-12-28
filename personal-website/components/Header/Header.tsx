import WSlogon from "../../public/images/public/websiteSlogan.webp";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../pages/_app";
import { useRouter } from "next/router";
import { LoginResData } from "../../mobx/helper";
import { auth } from "../../firebase/config";
import { fetchUserInfo, storeUser } from "../../firebase/usersRelevantApis";
import moment from "moment";

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
    text: "About Me",
    link: "/",
  },
  {
    text: "Blogs",
    link: "/blogs",
  },
];

const SIGNINED_HEADER_BUTTONS_CONFIG = [
  {
    text: "Write A Blog",
    style: "",
    link: "/writeBlog",
    icon: (
      <svg
        className='w-6 h-6'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z'></path>
        <path
          fillRule='evenodd'
          d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
          clipRule='evenodd'
        ></path>
      </svg>
    ),
  },
  {
    text: "My Blogs",
    style: "",
    link: "/myBlogs",
    icon: (
      <svg
        className='w-6 h-6'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z'></path>
      </svg>
    ),
  },
];

const Header = observer(() => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userStore } = useContext(RootStoreContext);
  const { asPath } = useRouter();

  useEffect(() => {
    // fetch("/api/user-infos")
    //   .then(async (response) => {
    //     console.log("user-info in header");
    //     const data = await response.json();
    //     console.log(data);
    //     return data;
    //   })
    //   .then((response) => {
    //     if (response.uid) {
    //       const res = response as LoginResData;
    //       userStore.userLogin(res.uid, res.displayName, res.email, res.blogs);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("Error when updating user login status");
    //     console.log(e);
    //   });

    //
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user.uid).then((userInfo: any) => {
          console.log("userInfo");
          console.log(userInfo);
          if (user.displayName && !userInfo) {
            storeUser(
              user.uid,
              user.displayName,
              user.email ?? "",
              moment().format("MMM Do YY"),
              []
            );
          }
          userStore.userLogin(
            user.uid,
            userInfo.displayName,
            user?.email ?? "",
            userInfo.blogs
          );
        });
      }
    });
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className='bg-white absolute z-50 w-full border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 opacity-90 hover:opacity-80'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <a className='flex items-center' href='/'>
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
          <ul className='flex flex-col items-center justify-center p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 '>
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
              <>
                {SIGNINED_HEADER_BUTTONS_CONFIG.map((config) => (
                  <li
                    key={config.text}
                    className={`flex flex-row items-center justify-center gap-x-2 rounded-lg ${config.style}`}
                  >
                    <span className='text-white'>{config.icon}</span>
                    <HeaderInButton
                      text={config.text}
                      link={config.link}
                      selected={asPath === config.link}
                    />
                  </li>
                ))}
                <li>
                  <button
                    className={
                      "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      fetch("/api/sign-out")
                        .then((response) => {
                          if (response.status === 200) {
                            userStore.userLogout();
                            console.log(userStore.userID);
                          } else {
                            console.log("Fail to log out users");
                          }
                        })
                        .catch((e) => {
                          console.log("Error when sign out users");
                          console.log(e);
                        });
                    }}
                  >
                    {"Sign Out"}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <HeaderInButton
                    text={"Login"}
                    link={"/login"}
                    selected={false}
                  />
                </li>
                <li>
                  <HeaderInButton
                    text={"Signup"}
                    link={"/signup"}
                    selected={false}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Header;
