import Paper from "../components/Paper";

type WorkmateFeedback = {
  paragraph: string;
  name: string;
  position: string;
  linkinUrl?: string;
};

const WORKMATEFEEDBACKS_CONTENT: WorkmateFeedback[] = [
  {
    paragraph:
      "WeiFeng has solid knowledge of key techniques in frontend development like react, js, hence he was really fast to adapt and start building apps after arrived at company. Besides, I was impressed by his good learning ability, when facing with tasks that contains unfamiliar techniques, he can grasp the skills fastly then begin working.",
    name: "WeiBin Zhou",
    position: "Frontend developer, Sensetime",
    linkinUrl:
      "https://maimai.cn/contact/share/card?u=q23gewjwffc0&_share_channel=copy_link",
  },
  {
    paragraph:
      "I would say WeiFeng is a reliable workmate, he didn't afraid to overcome challenges and can delivery complicated features on time and in high quality.",
    name: "Liang Yu",
    position: "Senior fullstack developer, Sensetime",
  },
];

const FeedbacksFromWorkmates = () => (
  <div className='z-10 flex flex-col items-center justify-center'>
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
          d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
        ></path>
      </svg>
      <h2 className='mb-10 font-semibold dark:text-white'>
        Feedbacks From My Colleagues
      </h2>
    </div>
    <div className='flex flex-col items-center justify-center w-full md: md:flex-row gap-x-5'>
      {WORKMATEFEEDBACKS_CONTENT.map((content, index) => (
        <div className='z-10 mb-5 w-96' key={`workmate_feedback-${index}`}>
          <Paper>
            <div className='flex flex-col items-end p-8 h-112 gap-y-2'>
              <p className='dark:text-white/80'>{content.paragraph}</p>
              <div className='flex flex-row items-center justify-center'>
                <p className='mr-2'>{content.name}</p>
                {content.linkinUrl && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                    className='w-5 h-5 text-blue-400 cursor-pointer'
                    onClick={() => window.open(content.linkinUrl)}
                  >
                    <path
                      fill='currentColor'
                      d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'
                    />
                  </svg>
                )}
              </div>
              <p className='text-end dark:text-green-500'>{content.position}</p>
            </div>
          </Paper>
        </div>
      ))}
    </div>
  </div>
);

export default FeedbacksFromWorkmates;
