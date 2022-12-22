import Image from "next/image";

interface ICard {
  posterUrl: any;
  title: string;
  des: string;
  linkPageUrl: string;
}

const Card = ({ posterUrl, title, des, linkPageUrl }: ICard) => (
  <a
    href={`blog/${linkPageUrl}`}
    // target='_blank'
    className='z-10 flex flex-col items-center m-5 bg-white border rounded-lg shadow-md opacity-80 sm:m-0 sm:w-112 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:w-144 md:flex-row xl:h-48 xl:w-260'
  >
    <Image
      className='object-cover w-full rounded-t-lg h-96 md:h-full md:w-48 md:rounded-none md:rounded-l-lg'
      width={48}
      height={96}
      src={posterUrl}
      alt={title}
    />
    <div className='flex flex-col justify-between p-4 leading-normal'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {title}
      </h5>
      <p className='mb-3 font-normal text-gray-700 text-ellipsis dark:text-gray-400'>
        {des}
      </p>
    </div>
  </a>
);

export default Card;
