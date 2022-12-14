// import "./carousel-wrapper.styles.scss";

import { useState } from "react";

interface ICarsouelWrapper {
  images: {
    src: string;
    linkPage: string;
    title: string;
  }[];
}

const Carousel = ({ images }: ICarsouelWrapper) => {
  const [currentPoster, setCurrentPoster] = useState(0);

  const handleChoosePreviousPoster = () => {
    if (currentPoster > 0) {
      setCurrentPoster((preState) => preState - 1);
    }
  };

  const handleChooseNextPoster = () => {
    if (currentPoster < images.length - 2) {
      setCurrentPoster((preState) => preState + 1);
    }
  };

  return (
    <div id='indicators-carousel' className='relative' data-carousel='static'>
      {/* <!-- Carousel wrapper --> */}
      <div className='relative h-56 mb-10 overflow-hidden rounded-lg md:h-96'>
        {images.slice(0, 3).map((image, index) => (
          <div
            key={`Carsouel-${index}`}
            className={`${
              currentPoster === index ? "" : "hidden"
            } duration-700 ease-in-out flex justify-center items-center h-full`}
            data-carousel-item='active'
          >
            <img
              src={image.src}
              className='absolute block object-contain w-full -translate-x-1/2 -translate-y-1/2 rounded-lg cursor-pointer top-1/2 left-1/2'
              alt={image.title}
              onClick={() => window.open(`blog/${image.linkPage}`)}
            />
            <div
              className='absolute flex items-center justify-center p-10 bg-gray-500 cursor-pointer rounded-2xl bg-opacity-90 min-h-36 md:w-128 w-72'
              onClick={() => window.open(`blog/${image.linkPage}`)}
            >
              <span className={`md:text-5xl text-2xl text-white text-center`}>
                {image.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* <!-- Slider controls --> */}
      <button
        type='button'
        className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        data-carousel-prev
        onClick={handleChoosePreviousPoster}
      >
        <span className='inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-700 group-hover:bg-white/50 dark:group-hover:bg-gray-600 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-white sm:w-6 sm:h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            ></path>
          </svg>
          <span className='sr-only'>Previous</span>
        </span>
      </button>
      <button
        type='button'
        className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        data-carousel-next
        onClick={handleChooseNextPoster}
      >
        <span className='inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-700 group-hover:bg-white/50 dark:group-hover:bg-gray-600 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-white sm:w-6 sm:h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5l7 7-7 7'
            ></path>
          </svg>
          <span className='sr-only'>Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
