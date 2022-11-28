import ImageBoxWithDescription from "../../../components/ImageBoxWithDescription";
import BlogScreenShotPic from "../../../public/images/index/blogScreenshot.png";
import EcommercePic from "../../../public/images/index/ecommerce-screenshot.png";
import SparkWebsitePic from "../../../public/images/index/SparkWebsiteScreenshot.png";

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
      url: undefined,
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
  <div className='flex flex-col justify-center items-center'>
    <h2 className='dark:text-white font-semibold mb-10'>My Projects</h2>
    <div>
      {MY_PROJECT_CONTENT.map((content, index) => (
        <div
          key={`project-${index}`}
          className='flex md:flex-row flex-col md:last:mb-0 mb-10 w-full items-center'
        >
          {content.map((c) => (
            <div
              key={c.des[0]}
              className='w-100 h-60 md:mr-10 md:mb-0 mb-10 last:mb-0 last:mr-0 md:pl-0 md:pr-0 pl-2 pr-2 '
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
