import { NextApiRequest, NextApiResponse } from "next/types";
import { uploadBlogsImgs } from "../../firebase/blogApis";

type Image = {
  fileName: string;
  file: File;
};

export type UploadImageSuccessRes = {
  url: string;
  fileName: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const body = req.body as Image;
    console.log("filename");
    console.log(body.fileName);
    console.log("file");
    console.log(body.file);

    uploadBlogsImgs(body.fileName, body.file).then((backwardUrl) => {
      res.status(200).send({
        url: backwardUrl,
        fileName: body.fileName,
      });
    });
  } catch (error) {
    console.log("Error uploading images");
    console.log(error);
    res.status(500).send({ message: "Fail to upload image" });
    return;
  }
};

export default handler;
