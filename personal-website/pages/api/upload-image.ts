import { NextApiRequest, NextApiResponse } from 'next/types'
import { uploadBlogsImgs } from '../../firebase/blogApis';

type Image = {
  filename: string, file: File
}

export type UploadImageSuccessRes = {
  url: string,
  fileName: string,
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
   const body = req.body as Image

   uploadBlogsImgs(body.filename, body.file)
   .then(backwardUrl => {
    res.status(200).send({
      url: backwardUrl,
      fileName: body.filename
    })
   })
  } catch (error) {
    console.log('Error uploading images')
    res.status(500).send({ message: 'Fail to upload image' })
    return
  }
  };


export default handler