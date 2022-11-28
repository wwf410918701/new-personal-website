import Paper from "../../../components/Paper";

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
  <div className='w-full flex flex-col justify-center items-center mt-20'>
    <h2 className='dark:text-white font-semibold mb-10'>Skills</h2>
    {SKILLSSET_CONTENT.map((content, index) => (
      <div
        key={`skillset_grid-${index}`}
        className='w-full flex justify-center mb-5 last:mb-0'
      >
        <div className='flex md:flex-row flex-col'>
          <div className='w-96 md:mr-5 md:mb-0 mb-5'>
            <Paper>
              <svg
                className='w-6 h-6 dark:text-green-500 mr-2'
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
                className='w-6 h-6 dark:text-green-500 mr-2'
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
