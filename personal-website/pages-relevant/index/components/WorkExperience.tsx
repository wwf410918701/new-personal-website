type WorkExperience = {
  startTime: string;
  endTime: string;
  companyName: string;
  position: string;
  base: string;
  Des: {
    workOutCome: string | JSX.Element;
    des: string[];
    workOutComeLink?: string;
  }[];
};

const WORK_ERPERIENCE_CONTENT: WorkExperience[] = [
  {
    startTime: "Aug 2022",
    endTime: "Now",
    companyName: "Kepple / Spark Relief Teachers",
    position: "Part Time Frontend Developer",
    base: "Melbourne - Collingwood",
    Des: [
      {
        workOutCome: (
          <a
            onClick={() => window.open("https://www.sparkreliefteachers.com/")}
          >
            Official website of Spark Relief Teacher
          </a>
        ),
        des: [
          "1. Rebuilt Spark Relief Teacher's website based on the original wordpress design, contributed 90% codes.",
          "2. Responsive website with customized design for each device size.",
          "3. Implemented by Typescript, React, Material UI, Redux, Sass, Postcss.",
          "4. Ensured code quality and set up project policies through eslint, prettier and husky.",
          "5. Used most popular react techniques to tune the app, including reactLazy, useMemo, useCallback, react.Memo.",
        ],
        workOutComeLink: "https://www.sparkreliefteachers.com/",
      },
      {
        workOutCome: "Referee survey page",
        des: [
          "Worked closely with marketing manager, designed and implemented survery page.",
        ],
      },
      {
        workOutCome: "Data admin system",
        des: [
          "1. Provides UI interfaces to update contents on spark relief teacher website, like blogs, teacher guides.",
          "2. Controlled users' data access based on their login account",
          "3. Implemented data filter panels for each dataset",
          "4. Generated corresponding CSV file based on the selected dataset and filter criterias.",
        ],
      },
    ],
  },
  {
    startTime: "Dec 2021",
    endTime: "Apr 2022",
    companyName: "SenseTime",
    position: "Frontend Developer Intern - Autodrive Dataplatform Department",
    base: "ShenZhen",
    Des: [
      {
        workOutCome: "Automated Data Report",
        des: [
          "Used React, Typescript, TinyMCE , Antd(ant design), AntV to create an automated data report panel, which provides overall accumulated histograms and detail tables about the cases of a round of auto drive road test. Users can filter the cases that they want to show and make or modify reviews on the rows of case data that needs to be awared of. Last but not least, users can conviently ouput the whole form to PDF then share with others.",
        ],
      },
      {
        workOutCome: "Automatically Generated FrontEnd",
        des: [
          "Used React & Typescript to create an operating panel for users to create web pages of different types of quality test, user can spcify details of the created page such as which data visualization tabs the page should contains, which datasets to include, corresponding frontend page will be generated automatically. Users can also do CRUD on the existing test pages.",
        ],
      },
      {
        workOutCome: "Simulated Road Editor",
        des: [
          "Created new features, such as allowing users to add pedestrians and set the routines that pedestrians will run on the preview mode, adding loading and error pages.",
        ],
      },
    ],
  },
  {
    startTime: "Jul 2020",
    endTime: "Oct 2020",
    companyName: "Procter & Gamble",
    position: "Software Engineer Intern - IT department",
    base: "GuangZhou",
    Des: [
      {
        workOutCome: "Backend SQL APIs",
        des: [
          "Developed two APIs on P&G's loyalty system to fetch customer's data from different data bases and push the results to message queue.",
        ],
      },
      {
        workOutCome: "Code Optimization",
        des: [
          "Optimized 10+ code errors and warnings that were detected by sonarqube.",
        ],
      },
      {
        workOutCome: "Backend Internationalization",
        des: [
          "Analysised and determined which part of the loyalty system will be used by the foreign frontend users, translated thoseAPI, paramaters, DTO into English.",
        ],
      },
    ],
  },
];

const WorkExperience = () => (
  <div className='w-full flex justify-center items-center flex-col'>
    <h2 className='dark:text-white font-semibold'>Work Experience</h2>
    <div className='md:w-224 p-10 w-100'>
      <ol className='relative border-l border-gray-200 dark:border-gray-700'>
        {WORK_ERPERIENCE_CONTENT.map((content) => (
          <li className='mb-10 ml-4' key={content.companyName}>
            <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
            <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              {`${content.startTime} - ${content.endTime}`}
            </time>
            <h2 className='font-semibold text-gray-900 dark:text-white'>
              {content.companyName}
            </h2>
            <p className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5'>
              {`${content.position}`}
            </p>
            {content.Des.map((d) => (
              <div key={d.workOutCome.toString()}>
                <div className='flex flex-row items-center'>
                  <svg
                    className='w-6 h-6 text-gray-500 dark:text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <h3 className='text-gray-500 dark:text-gray-200 ml-2'>
                    {d.workOutCome}
                  </h3>
                </div>
                <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
                  {d.des.map((dd, index) => (
                    <>
                      <span key={`{workOutCome-des${index}}`}>{dd}</span>
                      <br key={`{workOutCome-des${index}}-br`} />
                    </>
                  ))}
                </p>
                {d.workOutComeLink && (
                  <a
                    onClick={() => window.open(d.workOutComeLink)}
                    className='mb-5 cursor-pointer inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                  >
                    View Website{" "}
                    <svg
                      className='ml-2 w-3 h-3'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default WorkExperience;
