interface IConfirmModal {
  type: "success" | "error";
  message: string;
  visible: boolean;
  onUpdateVisible: (visible: boolean) => void;
}

const getStyles = (type: "success" | "error") => {
  if (type === "error") {
    return "bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800";
  } else if (type === "success") {
    return "bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800";
  }
};

const ConfirmModal = ({
  message,
  type,
  visible,
  onUpdateVisible,
}: IConfirmModal) => (
  <div
    id='popup-modal'
    tabIndex={99}
    className={`${
      visible ? "" : "hidden"
    } 'overflow-y-auto overflow-x-hidden bg-gray-400 bg-opacity-50 fixed flex justify-center items-center h-full  top-0 right-0 left-0 z-50 p-4 md:inset-0  md:h-full'`}
  >
    <div className='relative w-full max-w-md h-full md:h-auto'>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
        <button
          type='button'
          className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
          data-modal-toggle='popup-modal'
          onClick={() => onUpdateVisible(false)}
        >
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>Close modal</span>
        </button>
        <div className='p-6 text-center pt-10'>
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-white'>
            {message}
          </h3>
          <button
            data-modal-toggle='popup-modal'
            type='button'
            className={`${getStyles(
              type
            )}'text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'`}
            onClick={() => onUpdateVisible(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
