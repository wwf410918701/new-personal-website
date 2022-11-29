import Carousel from "../../components/Carsouel";
import Header from "../../components/Header";
import { fetchAllPostsSummaries } from "../../firebase/apis";
import { Summary } from "../../firebase/type";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

interface IBlogs {
  summaries: Summary[];
}

const Blogs = ({ summaries }: IBlogs) => {
  return (
    <div className='dark dark:bg-gray-900'>
      <Header />
      <div className='pt-24'>
        {summaries.length > 0 && (
          <div className='flex items-center justify-center'>
            <div className='md:w-224 w-96'>
              <Carousel
                images={summaries.map((summary) => ({
                  src: summary.posterImgUrl,
                  linkPage: summary.id,
                  title: summary.title,
                }))}
              />
            </div>
          </div>
        )}
        <div className='flex flex-col items-center justify-center w-full sm:gap-y-5'>
          {summaries.map((summary) => (
            <Card
              key={summary.id}
              posterUrl={summary.posterImgUrl}
              title={summary.title}
              des={summary.summary}
              linkPageUrl={summary.id}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const summaries = await fetchAllPostsSummaries();
  return {
    props: {
      summaries,
    },
  };
}

export default Blogs;
