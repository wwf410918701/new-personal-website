import { useEffect, useState } from "react";
import { UploadingStatus } from "../../firebase/type";
import { getImageTypeBasedOnFirebaseLink } from "../../firebase/helpers";
import ConfirmModal from "../ConfirmModal";
import { UploadImageSuccessRes } from "../../pages/api/upload-image";
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  SlateElement,
} from "@wangeditor/editor";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";

type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};

type InsertFnType = (url: string, alt: string, href: string) => void;

interface ITextEditor {
  placeholder: string;
  updateCallback: (htmlString: string) => void;
  blogId: string;
  updateAllUploadedImages: (newAllImagesList: string[]) => void;
  updateEditor: (editor: IDomEditor) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TextEditor = ({
  placeholder,
  updateCallback,
  blogId,
  updateAllUploadedImages,
  updateEditor,
}: ITextEditor) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [htmlString, setHtmlString] = useState(placeholder); // 编辑器内容
  const [uploadingImageStatus, setUploadingImageStatus] =
    useState<UploadingStatus>("default");
  const [imageNamingModalVis, setImageNamingModalVis] = useState(false);
  const [imageAlt, setImageAlt] = useState("");

  i18nChangeLanguage("en");

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      "blockquote",
      // 'codeBlock',
      "insertTable",
      "group-video",
      "insertImage",
      "group-more-style",
      "codeBlock",
    ],
  };

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: htmlString,
    MENU_CONF: {},
  };

  // the customized image upload function, because we want to use firestore and the res of firestore is not accord to the requirements of wangEditor
  if (editorConfig?.MENU_CONF) {
    editorConfig.MENU_CONF.uploadImage = {
      // TODO: input modal when inserting new image
      customUpload(file: File, insertFn: InsertFnType) {
        console.log("fileName in client");
        console.log(file.name);
        console.log("file in client");
        console.log(file);

        fetch("/api/upload-image", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file, fileName: file.name }),
        })
          .then((response) => response.json())
          .then((response) => {
            // globalUiStore.upLoadingImg = false
            //update image to the editor based on the online url that is returned by the database
            const imageData = response as UploadImageSuccessRes;
            if (response.status === 200) {
              insertFn(imageData.url, imageData.fileName, "");
            } else {
              setUploadingImageStatus("failure");
            }
          })
          .catch((e) => {
            console.log("Errors occur when uploading image");
            console.log(e);
            setUploadingImageStatus("failure");
          });
      },
    };
    editorConfig.MENU_CONF.insertImage = {
      onInsertedImage(imageNode: ImageElement | null) {
        // TS 语法
        if (imageNode == null) return;

        const { src, alt } = imageNode;
        updateAllUploadedImages([
          `${alt}.${getImageTypeBasedOnFirebaseLink(src)}`,
        ]);
      },
    };
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    updateCallback(htmlString);
  }, [htmlString]);

  //update this component when parent node passes in new params (placeHolder)
  useEffect(() => {
    setHtmlString(placeholder);
  }, [placeholder]);

  const handleAltInput = () => {
    setImageNamingModalVis(false);
    setImageAlt("");
  };

  const onCreateEditor = (editor: IDomEditor) => {
    setEditor(editor);
    const images = editor.getElemsByType("image");
    updateAllUploadedImages(
      images.map(
        (image) =>
          `${(image as any)?.alt}.${getImageTypeBasedOnFirebaseLink(
            (image as any)?.src ?? ""
          )}`
      )
    );
    updateEditor(editor);
  };

  return (
    <>
      <ConfirmModal
        type='error'
        message='Errors happen when uploading image, please try again'
        visible={uploadingImageStatus === "failure"}
        onConfirm={() => setUploadingImageStatus("default")}
        onCancel={() => setUploadingImageStatus("default")}
      />
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={htmlString}
          onCreated={onCreateEditor}
          onChange={(editor) => setHtmlString(editor.getHtml())}
          mode='default'
          style={{ height: "500px" }}
        />
      </div>
    </>
  );
};

export default TextEditor;
