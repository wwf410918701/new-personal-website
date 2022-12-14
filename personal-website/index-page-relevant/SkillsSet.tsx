import Paper from "../components/Paper";

const SKILLSSET_CONTENT = [
  ["React", "NextJS"],
  ["Typescript", "Javascript"],
  ["Material UI", "Tailwind"],
  ["MobX", "Redux & Its popular middlewares"],
  ["Responsive Design", "Device customized design"],
  ["Styled Component", "SCSS"],
  [" PostCSS", "Less"],
  ["Firebase", "SQL"],
];

const SkillsSet = () => (
  <div className='flex flex-col items-center justify-center w-full mt-20'>
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
          d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
        ></path>
      </svg>
      <h2 className='mb-10 font-semibold dark:text-white'>Skills</h2>
    </div>
    {SKILLSSET_CONTENT.map((content, index) => (
      <div
        key={`skillset_grid-${index}`}
        className='flex justify-center w-full mb-5 last:mb-0'
      >
        <div className='flex flex-col md:flex-row'>
          <div className='mb-5 w-96 md:mr-5 md:mb-0'>
            <Paper>
              <svg
                className='w-6 h-6 ml-2 mr-2 dark:text-green-500'
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
              <h3>{content[0]}</h3>
            </Paper>
          </div>
          <div className='w-96'>
            <Paper>
              <svg
                className='w-6 h-6 ml-2 mr-2 dark:text-green-500'
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
              <h3>{content[1]}</h3>
            </Paper>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default SkillsSet;
