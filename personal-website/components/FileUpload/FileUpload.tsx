interface IFileUpload {
  updateFileName: (fileName: string) => void;
  updateFile: (file: File) => void;
  hasError: boolean;
}

export const getObjectURL = (file: any) => {
  var url = null;
  if ((window as any).createObjcectURL != undefined) {
    url = (window as any).createOjcectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};

const FileUpload = ({ updateFileName, updateFile, hasError }: IFileUpload) => (
  <div>
    <label
      className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
        hasError ? "!text-red-500" : ""
      }`}
      htmlFor='file_input'
    >
      Upload file
    </label>
    <input
      className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
      aria-describedby='file_input_help'
      id='file_input'
      type='file'
      onChange={(e: any) => {
        const uploadFile = document.getElementById("file_input") as any;
        const uploadFileSRC = uploadFile.files[0];
        updateFileName(uploadFileSRC.name);
        updateFile(uploadFile.files[0]);
      }}
    />
    <p
      className={`mt-1 text-sm text-gray-500 dark:text-gray-300 ${
        hasError ? "!text-red-500" : ""
      }`}
      id='file_input_help'
    >
      SVG, PNG, JPG
    </p>
  </div>
);

export default FileUpload;
