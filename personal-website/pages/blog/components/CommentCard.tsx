import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import Input from "../../../components/Input";
import Paper from "../../../components/Paper";
import {
  deleteComment,
  updateComment,
} from "../../../firebase/blogApisWithoutType";
import { RootStoreContext } from "../../_app";

interface ICommentCard {
  blogId: string;
  comment: string;
  author: string;
  createAt: string;
  commentBelogerId: string;
  commentId: string;
}

const CommentCard = observer(
  ({
    comment,
    author,
    blogId,
    commentId,
    createAt,
    commentBelogerId,
  }: ICommentCard) => {
    const [inEditorMode, setInEditorMode] = useState(false);
    const [currentComment, setCurrentComment] = useState(comment);
    const [inputHasError, setInputHasError] = useState(false);
    const [commentIsDeleted, setCommentIsDeleted] = useState(false);
    const [updateFailureModalVisbile, setUpdateFailureModalVisbile] =
      useState(false);
    const [deleteFailureModalVisbile, setDeleteFailureModalVisbile] =
      useState(false);
    const [
      deleteCommentConfirmModalVisible,
      setDeleteCommentConfirmModalVisible,
    ] = useState(false);
    const { userStore } = useContext(RootStoreContext);

    const handleSubmit = () => {
      if (currentComment.trim().length == 0) {
        setInputHasError(true);
      } else {
        updateComment(
          blogId,
          commentId,
          currentComment,
          userStore.userName,
          userStore.userID
        )
          .then(() => {
            setInEditorMode(false);
          })
          .catch((e) => {
            console.log("Error happens when upadting comment");
            console.log(e);
            setUpdateFailureModalVisbile(true);
          });
      }
    };

    return (
      <div className={`${commentIsDeleted ? "hidden" : ""}`}>
        <Paper>
          <ConfirmModal
            type='error'
            message='Errors happen when updating comment, please try again'
            visible={updateFailureModalVisbile}
            onConfirm={() => setUpdateFailureModalVisbile(false)}
            onCancel={() => setUpdateFailureModalVisbile(false)}
          />
          <ConfirmModal
            type='error'
            message='Errors happen when deleting comment, please try again'
            visible={deleteFailureModalVisbile}
            onConfirm={() => setDeleteFailureModalVisbile(false)}
            onCancel={() => setDeleteFailureModalVisbile(false)}
          />
          <ConfirmModal
            type='error'
            message='Are you sure to delete this comment?'
            visible={deleteCommentConfirmModalVisible}
            onConfirm={() => {
              deleteComment(blogId, commentId)
                .then(() => {
                  setCommentIsDeleted(true);
                })
                .catch((e) => {
                  console.log("Errors while deleting comment");
                  console.log(e);
                  setDeleteFailureModalVisbile(true);
                });
              setDeleteCommentConfirmModalVisible(false);
            }}
            onCancel={() => setDeleteCommentConfirmModalVisible(false)}
          />
          <div className='flex flex-col items-start justify-center w-full p-5 break-all gap-y-3 dark:text-white sm:w-112 md:w-224'>
            <div className='flex justify-end w-full'>
              <div
                className={`flex flex-row sm:gap-y-1 gap-x-1 ${
                  userStore.userID === commentBelogerId ? "" : "hidden"
                }`}
              >
                <button
                  onClick={(e) => {
                    if (inEditorMode) {
                      // Revert to origin comment after user give up changes
                      setCurrentComment(comment);
                    }
                    setInEditorMode(!inEditorMode);
                  }}
                >
                  {inEditorMode ? (
                    <svg
                      className='w-6 h-6 text-blue-500 hover:text-blue-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className='w-6 h-6 text-blue-500 hover:text-blue-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z'></path>
                      <path
                        fillRule='evenodd'
                        d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    setDeleteCommentConfirmModalVisible(true);
                  }}
                >
                  <svg
                    className='w-6 h-6 text-red-500 hover:text-red-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            {inEditorMode ? (
              <>
                <Input
                  onUpdate={function (inputString: string): void {
                    setInputHasError(false);
                    setCurrentComment(inputString);
                  }}
                  placeHolder={""}
                  value={currentComment}
                  type={"test"}
                  id={"newCommentInput"}
                  required={false}
                  isError={inputHasError}
                />
                <div className='flex flex-row items-center justify-end w-full'>
                  <button
                    type='button'
                    className=' bg-[#3b5998] w-24 h-9 flex justify-center items-center text-sm hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg px-5 py-2.5 dark:focus:ring-[#3b5998]/55'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{currentComment}</p>
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
              </>
            )}
          </div>
        </Paper>
      </div>
    );
  }
);

export default CommentCard;
