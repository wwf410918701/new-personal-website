import { useContext, useEffect, useState } from "react";
import CommentCard from "../../pages/blog/components/CommentCard";
import { Comment } from "../../firebase/type";
import { fetchPost } from "../../firebase/blogApis";
import Input from "../Input";
import { createComment } from "../../firebase/blogApisWithoutType";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../pages/_app";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
interface IComments {
  blogId: string;
}

const Comments = observer(({ blogId }: IComments) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInputHasError, setCommentInputHasError] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const { userStore } = useContext(RootStoreContext);

  useEffect(() => {
    fetchPost(blogId).then((blog) => {
      if (blog) {
        setComments(blog.comments);
      }
    });
  }, []);

  const handleSubmit = () => {
    if (commentInput.trim().length != 0) {
      createComment(
        blogId,
        commentInput,
        userStore.userName,
        userStore.userID
      ).then(() => {
        setComments((preComments) => [
          ...preComments,
          {
            commentID: uuidv4(),
            content: commentInput,
            createAt: moment().format("DD/MM/YYYY"),
            displayName: userStore.userName ?? "",
            uid: userStore.userID ?? "",
          },
        ]);
      });
    } else {
      setCommentInputHasError(true);
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center mb-5 md:items-end gap-y-2'>
        <Input
          onUpdate={function (inputString: string): void {
            setCommentInputHasError(false);
            setCommentInput(inputString);
          }}
          placeHolder={"Share your ideas here.."}
          type={""}
          id={"user-comment"}
          required={false}
          isError={commentInputHasError}
        />
        <button
          type='button'
          className=' bg-[#3b5998] w-20 h-9 flex justify-center items-center text-sm hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg px-5 py-2.5 dark:focus:ring-[#3b5998]/55'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className='flex flex-col gap-y-5'>
        {comments.map((comment) => (
          <CommentCard
            key={comment.commentID}
            blogId={blogId}
            comment={comment.content}
            commentId={comment.commentID}
            author={comment.displayName}
            createAt={comment.createAt}
            commentBelogerId={comment.uid}
          />
        ))}
      </div>
    </div>
  );
});

export default Comments;
