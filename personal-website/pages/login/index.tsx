import Link from "next/link";
import { useContext, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Paper from "../../components/Paper";
import { signInWithGoogle } from "../../firebase/usersRelevantApis";
import { RootStoreContext } from "../_app";
import Router from "next/router";
import { LoginResData } from "../../mobx/helper";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
import Head from "next/head";
import { auth } from "../../firebase/config";
import RestrictedRoute from "../../components/RestrictedRoute";
import { UploadingStatus } from "../../firebase/type";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasseword] = useState("");
  const [error, setError] = useState({
    email: true,
    password: true,
  });
  const [userHasInputed, setUserHasInputed] = useState({
    email: false,
    password: false,
  });
  const { userStore } = useContext(RootStoreContext);
  const [submitStatus, setSubmitStatus] = useState<UploadingStatus>("default");

  const handleGoogleLogin = () => {
    // signInWithGoogle();
    fetch("/api/google-login")
      .then((response) => response.json())
      .then((response) => {
        const res = response as LoginResData;
        userStore.userLogin(res.uid, res.displayName, res.email, res.blogs);
      })
      .catch((e) => {
        console.log("Error when login through google api");
        console.log(e);
      });
  };

  const handleSubmit = () => {
    setSubmitStatus("loading");
    try {
      if (email.trim().length === 0) {
        setError((preErrorState) => ({
          ...preErrorState,
          email: true,
        }));
      }
      if (password.trim().length === 0) {
        setError((preErrorState) => ({
          ...preErrorState,
          password: true,
        }));
      }
      setError({
        email: false,
        password: false,
      });

      if (!Object.values(error).includes(true)) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            Router.push("/");
          })
          .then(() => {
            setSubmitStatus("success");
          });
      }
    } catch (error) {
      console.log("Error when sign in user");
      console.log(error);
      setSubmitStatus("failure");
    }
  };

  return (
    <div className='dark dark:bg-gray-900'>
      <Head>
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
        <title>Login your account</title>
      </Head>
      <Header />
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <div className='z-10 flex items-center justify-center w-full h-screen'>
        <div className='z-10 flex items-center justify-center md:w-128 w-92 opacity-90'>
          <Paper>
            <div className='flex items-center justify-center w-full pt-10 pb-10'>
              <form className='flex flex-col justify-center md:w-96 w-80'>
                <div className='mb-6'>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <Input
                    onUpdate={(input) => {
                      if (
                        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          input
                        )
                      ) {
                        setError((preState) => ({
                          ...preState,
                          email: true,
                        }));
                      } else {
                        setError((preState) => ({
                          ...preState,
                          email: false,
                        }));
                      }
                      setUserHasInputed((preState) => ({
                        ...preState,
                        email: true,
                      }));
                      setEmail(input);
                    }}
                    placeHolder={"email"}
                    type={"email"}
                    id={"email"}
                    required={true}
                    isError={userHasInputed.email && error.email}
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your password
                  </label>
                  <Input
                    onUpdate={(input) => {
                      if (input.trim().length != 0) {
                        setError((preState) => ({
                          ...preState,
                          password: false,
                        }));
                      } else {
                        setError((preState) => ({
                          ...preState,
                          password: true,
                        }));
                      }
                      setUserHasInputed((preState) => ({
                        ...preState,
                        password: true,
                      }));
                      setPasseword(input);
                    }}
                    placeHolder={"password"}
                    type={"password"}
                    id={"password"}
                    required={true}
                    isError={userHasInputed.password && error.password}
                  />
                </div>
                <Link className='mb-2 text-purple-400' href='/signup'>
                  <h3>Create your own account!</h3>
                </Link>
                <button
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className={`text-white mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                    submitStatus === "loading"
                      ? "dark:bg-gray-500 dark:hover:bg-gray-700"
                      : " dark:bg-blue-600 dark:hover:bg-blue-700"
                  } dark:focus:ring-blue-800`}
                >
                  {submitStatus === "loading" ? (
                    <div className='text-center'>
                      <div role='status'>
                        <svg
                          className='inline w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
                {/* <button
                  type='button'
                  className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 w-full focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                  onClick={(e) => {
                    e.preventDefault();
                    handleGoogleLogin();
                  }}
                >
                  Sign In With Google
                </button> */}
              </form>
            </div>
          </Paper>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const RestrictedLogin = () => (
  <RestrictedRoute>
    <Login />
  </RestrictedRoute>
);

export default RestrictedLogin;
