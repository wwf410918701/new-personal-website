import { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import Input from "../components/Input";
import PersonalLinkedIcon from "../components/PersonalLinkedIcon";
import TextArea from "../components/TextArea";
import { storeEmployerMessage } from "../firebase/blogApis";
import GoogleMap from "./GoogleMap";

const HireMe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [error, setError] = useState({
    name: true,
    email: true,
    message: true,
  });
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);

  useEffect(() => {
    if (name === "") {
      setError((preState) => ({
        ...preState,
        name: true,
      }));
    } else {
      setError((preState) => ({
        ...preState,
        name: false,
      }));
    }
    if (email === "") {
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
    if (message === "") {
      setError((preState) => ({
        ...preState,
        message: true,
      }));
    } else {
      setError((preState) => ({
        ...preState,
        message: false,
      }));
    }
  }, [name, email, message]);

  const handleSubmit = () => {
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (!Object.values(error).includes(true)) {
      storeEmployerMessage(name, email, message).then((isSuccess) => {
        if (isSuccess) {
          setSuccessModalVisible(true);
        } else {
          setFailModalVisible(true);
        }
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <ConfirmModal
        type={"success"}
        message={"Successfully submit, I will get in touch with you soon."}
        visible={successModalVisible}
        onConfirm={function (visible: boolean): void {
          setSuccessModalVisible(visible);
        }}
        onCancel={function (visible: boolean): void {
          setSuccessModalVisible(visible);
        }}
      />
      <ConfirmModal
        type={"error"}
        message={"Opps, some errors happen, please try again later."}
        visible={failModalVisible}
        onConfirm={function (visible: boolean): void {
          setFailModalVisible(visible);
        }}
        onCancel={function (visible: boolean): void {
          setSuccessModalVisible(visible);
        }}
      />
      <div className='z-10 flex flex-col items-center justify-center'>
        <svg
          className='w-12 h-12 mb-2 text-cGreen'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
          ></path>
        </svg>
        <h2 className='mb-5 font-semibold dark:text-white md:mb-0 '>Hire Me</h2>
        <div className='flex flex-col items-center mb-10 sm:flex-row gap-x-3 md:mt-3'>
          <p className='text-center dark:text-white/50'>
            My base and contact details are as followed
          </p>
          <PersonalLinkedIcon />
        </div>
      </div>
      <div className='z-10 flex flex-col items-center justify-center md:flex-row gap-x-10'>
        <div className='md:w-96 w-80 h-96 md:h-128'>
          <GoogleMap />
        </div>
        <div className='mt-5 md:mt-12'>
          <div className='flex flex-col items-start mb-6 w-80 md:w-96 md:h-128 h-80 gap-y-5'>
            <Input
              onUpdate={function (inputString: string): void {
                setTouched((preState) => ({
                  ...preState,
                  email: true,
                }));
                setEmail(inputString);
              }}
              placeHolder={"Email"}
              type={"email"}
              id={"email"}
              required={true}
              isError={error.email && touched.email}
            />
            <Input
              onUpdate={function (inputString: string): void {
                setTouched((preState) => ({
                  ...preState,
                  name: true,
                }));
                setName(inputString);
              }}
              placeHolder={"Name"}
              type={"text"}
              id={"name"}
              required={true}
              isError={touched.name && error.name}
            />
            <TextArea
              id='message'
              rows={13}
              placeHolder='Message'
              required
              isError={touched.message && error.message}
              onUpdate={function (inputString: string): void {
                setTouched((preState) => ({
                  ...preState,
                  message: true,
                }));
                setMessage(inputString);
              }}
            />
            <button
              type='button'
              className='text-white text-center w-full bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2'
              onClick={handleSubmit}
            >
              <p className='w-full text-center'>Submit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
