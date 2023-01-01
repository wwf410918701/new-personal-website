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
        auth.signInWithEmailAndPassword(email, password).then(() => {
          Router.push("/");
        });
      }
    } catch (error) {
      console.log("Error when sign in user");
      console.log(error);
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
                  className='text-white mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Submit
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

export default Login;
