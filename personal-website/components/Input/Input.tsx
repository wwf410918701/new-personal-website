interface IInput {
  onUpdate: (inputString: string) => void;
  placeHolder: string;
  type: string;
  id: string;
  required: boolean;
  isError: boolean;
  value?: string;
}

const Input = ({
  onUpdate,
  placeHolder,
  type,
  id,
  required,
  isError,
  value,
}: IInput) => (
  <input
    type={type}
    id={id}
    onChange={(e) => {
      onUpdate(e.target.value);
    }}
    className={`${
      isError
        ? "focus:border-red-500 border-red-500 dark:border-red-500"
        : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
    } bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 `}
    placeholder={placeHolder}
    required={required}
    value={value}
  />
);

export default Input;
