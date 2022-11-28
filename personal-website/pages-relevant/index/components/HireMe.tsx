import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import { storeEmployerMessage } from "../../../firebase/apis";
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
    <div className='flex flex-col justify-center items-center'>
      <ConfirmModal
        type={"success"}
        message={"Successfully submit, I will get in touch with you soon."}
        visible={successModalVisible}
        onUpdateVisible={function (visible: boolean): void {
          setSuccessModalVisible(visible);
        }}
      />
      <ConfirmModal
        type={"error"}
        message={"Opps, some errors happen, please try again later."}
        visible={failModalVisible}
        onUpdateVisible={function (visible: boolean): void {
          setFailModalVisible(visible);
        }}
      />
      <h2 className='dark:text-white font-semibold mt-20 md:mb-0 mb-10 '>
        Hire Me
      </h2>
      <div className='flex md:flex-row gap-x-10 flex-col justify-center items-center'>
        <div className='w-96 h-96 md:h-128'>
          <GoogleMap />
        </div>
        <div className='md:mt-12 mt-5'>
          <div className='mb-6  w-96 md:h-128 h-80 flex flex-col items-start gap-y-5'>
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
