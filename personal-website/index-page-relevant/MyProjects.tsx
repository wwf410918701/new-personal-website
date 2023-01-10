import ImageBoxWithDescription from "../components/ImageBoxWithDescription";
import BlogScreenShotPic from "../public/images/index/blogScreenshot.png";
import EcommercePic from "../public/images/index/ecommerce-screenshot.png";
import SparkWebsitePic from "../public/images/index/SparkWebsiteScreenshot.png";

const EcommerceDesParagraph =
  "An online shop which contains most frequently-used features like login, items display, shopping cart, payment.";
const BlogDesParagraph =
  "A Blog website that allows public users to read blogs, signed up users CRUD on their blogs and comments through a convenient online editor.";
const SparkWebsiteParagrapoh =
  "Official website of Spark Relief Teachers, blogs, teachers onboard system";

const MY_PROJECT_CONTENT = [
  [
    {
      img: SparkWebsitePic,
      url: "https://www.sparkreliefteachers.com/",
      des: [
        "SPARK RELIEF TEACHERS",
        "Official website",
        SparkWebsiteParagrapoh,
      ],
    },
    {
      // TODO: Update linke and image to new blog
      img: BlogScreenShotPic,
      url: "/blogs",
      des: ["Personal Blog", "Blog website", BlogDesParagraph],
    },
  ],
  [
    {
      img: EcommercePic,
      url: "https://weifeng-shop.herokuapp.com/",
      des: ["WWF's Shop", "ECommerce website", EcommerceDesParagraph],
    },
  ],
];

const MyProjects = () => (
  <div className='flex flex-col items-center justify-center'>
    <div className='flex flex-col items-center justify-center'>
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
          d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
        ></path>
      </svg>
      <h2 className='mb-10 font-semibold dark:text-white'>My Projects</h2>
    </div>
    <div id='myProjects'>
      {MY_PROJECT_CONTENT.map((content, index) => (
        <div
          key={`project-${index}`}
          className='flex flex-col items-center w-full mb-10 md:flex-row md:last:mb-0'
        >
          {content.map((c) => (
            <div
              key={c.des[0]}
              className='pl-2 pr-2 mb-10 md:w-100 md:h-60 md:mr-10 md:mb-0 last:mb-0 last:mr-0 md:pl-0 md:pr-0 '
            >
              <ImageBoxWithDescription
                title={c.des[0]}
                subTitle={c.des[1]}
                des={c.des[2]}
                img={c.img}
                outerLink={c.url}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default MyProjects;
