import Paper from "../../../components/Paper";

interface ICommentCard {
  comment: string;
  author: string;
  createAt: string;
}

const CommentCard = ({ comment, author, createAt }: ICommentCard) => (
  <Paper>
    <div className='flex flex-col items-center justify-center p-2 break-all gap-y-3 dark:text-white sm:w-112 md:w-224 w-80'>
      <p>{comment}</p>
      <div className='flex flex-col items-center justify-end w-full md:flex-row'>
        <div>
          <p>{`By: ${author}`}</p>
        </div>
        <div className='ml-5'>
          <p>
            Create At:
            <span className='ml-2 text-blue-400'>{createAt}</span>
          </p>
        </div>
      </div>
    </div>
  </Paper>
);

export default CommentCard;
