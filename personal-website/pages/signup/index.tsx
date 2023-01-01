import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Paper from "../../components/Paper";
import Router from "next/router";
import ConfirmModal from "../../components/ConfirmModal";
import backgroundImg from "../../public/images/public/background-img.jpg";
import Image from "next/image";
import Head from "next/head";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasseword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    userName: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const [userHasInputed, setUserHasInputed] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [successModalVisble, setSuccessModalVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        setError((preErrorState) => ({
          ...preErrorState,
          password: true,
          confirmPassword: true,
        }));
      }
      if (email.trim().length === 0) {
        setError((preErrorState) => ({
          ...preErrorState,
          email: true,
        }));
      }
      setUserHasInputed({
        userName: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      if (!Object.values(error).includes(true)) {
        fetch("/api/createuser", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            email,
            password,
          }),
        })
          .then((res) => {
            if (res.status !== 200) {
              throw new Error("Fail to create new user");
            } else {
              setSuccessModalVisible(true);
            }
          })
          .catch((e) => {
            console.log("Fail to create new user");
            console.log(e);
          });
      }
    } catch (error) {
      console.log("Error when sign up user");
      console.log(error);
      // setShowFailureMessage(true);
    }
  };

  return (
    <div className='dark dark:bg-gray-900'>
      <Head>
        <link rel='icon' href='/images/public/websiteSlogan.webp' />
        <title>Create new account</title>
      </Head>
      <Header />
      <Image
        src={backgroundImg}
        alt='flowerImg-background'
        className='fixed top-0 z-0 h-screen'
      />
      <ConfirmModal
        type={"success"}
        message={
          "Successfully create your account! Please login in the login page."
        }
        visible={successModalVisble}
        onConfirm={function (visible: boolean): void {
          setSuccessModalVisible(visible);
          Router.push("/blogs");
        }}
        onCancel={function (visible: boolean): void {
          setSuccessModalVisible(visible);
        }}
      />
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='z-10 flex items-center justify-center md:w-128 w-92 opacity-90'>
          <Paper>
            <div className='flex items-center justify-center w-full pt-10 pb-10'>
              <form className='flex flex-col justify-center md:w-96 w-80'>
                <div className='mb-6'>
                  <label
                    htmlFor='userName'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    {"User's Name"}
                  </label>
                  <Input
                    onUpdate={(input) => {
                      if (input.trim().length !== 0) {
                        setError((preState) => ({
                          ...preState,
                          userName: false,
                        }));
                        setUserHasInputed((preState) => ({
                          ...preState,
                          userName: true,
                        }));
                        setUserName(input);
                      }
                    }}
                    placeHolder={"User name"}
                    type={"text"}
                    id={"userName"}
                    required={true}
                    isError={userHasInputed.userName && error.userName}
                  />
                </div>
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
                <div className='mb-6'>
                  <label
                    htmlFor='confirmPassword'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Confirm your password
                  </label>
                  <Input
                    onUpdate={(input) => {
                      if (input.trim().length != 0) {
                        setError((preState) => ({
                          ...preState,
                          confirmPassword: false,
                        }));
                      } else {
                        setError((preState) => ({
                          ...preState,
                          confirmPassword: true,
                        }));
                      }
                      setUserHasInputed((preState) => ({
                        ...preState,
                        confirmPassword: true,
                      }));
                      setPasseword(input);
                    }}
                    placeHolder={"Confirm password"}
                    type={"password"}
                    id={"confirmPassword"}
                    required={true}
                    isError={
                      userHasInputed.confirmPassword && error.confirmPassword
                    }
                  />
                </div>
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
              </form>
            </div>
          </Paper>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
