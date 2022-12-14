interface IPaper {
  children: JSX.Element | JSX.Element[];
}

const Paper = ({ children }: IPaper) => (
  <div className='w-full  bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-start py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700'>
    {children}
  </div>
);

export default Paper;
