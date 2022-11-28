import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface IImageBoxWithDescription {
  title: string;
  subTitle: string;
  des: string;
  img: StaticImageData;
  outerLink?: string;
}

const ImageBoxWithDescription = ({
  title,
  subTitle,
  des,
  img,
  outerLink,
}: IImageBoxWithDescription) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className={`${outerLink ? "cursor-pointer" : ""} w-full h-full relative`}
      onClick={() => {
        if (outerLink) {
          window.open(outerLink);
        }
      }}
      onPointerEnter={() => setShowDescription(true)}
      onPointerLeave={() => setShowDescription(false)}
    >
      <Image src={img} className='w-full h-full z-0' alt={title} />
      <div
        className={`flex flex-col ${
          showDescription ? "" : "hidden"
        } justify-center items-center absolute top-0 w-full h-full  z-10 opacity-90 dark:text-white bg-gray-800`}
      >
        <h2 className='dark:text-green-500'>{title}</h2>
        <h3>{subTitle}</h3>
        <p className='text-center dark:text-white/50'>{des}</p>
      </div>
    </div>
  );
};

export default ImageBoxWithDescription;
