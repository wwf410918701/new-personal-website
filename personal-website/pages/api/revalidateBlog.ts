import { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const body = req.body as RequestData;

    console.log("validate blog page");
    await res.revalidate(`/blog/${body.id}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
