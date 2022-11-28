interface ITextArea {
  id: string;
  rows: number;
  onUpdate: (inputString: string) => void;
  placeHolder: string;
  required: boolean;
  isError: boolean;
}

const TextArea = ({
  id,
  rows,
  onUpdate,
  placeHolder,
  required,
  isError,
}: ITextArea) => (
  <textarea
    id={id}
    rows={rows}
    onChange={(e) => {
      onUpdate(e.target.value);
    }}
    className={`${
      isError
        ? "focus:border-red-500 border-red-500 dark:border-red-500 "
        : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  focus:ring-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
    }bg-gray-50 pb-20 border  text-sm rounded-lg focus:ring-blue-500  block w-full dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 `}
    placeholder={placeHolder}
    required={required}
  />
);

export default TextArea;
