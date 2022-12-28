import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next/types";
import { auth } from "../../firebase/config";
import { fetchUserInfo, storeUser } from "../../firebase/usersRelevantApis";
import { LoginResData } from "../../mobx/helper";

type UserEmailAndPassword = {
  email: string;
  password: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const body = req.body;
    let resData: LoginResData;

    await auth.signInWithEmailAndPassword(body.email, body.password);
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user.uid).then((userInfo) => {
          if (userInfo?.displayName) {
            resData = {
              uid: user.uid,
              displayName: userInfo.displayName,
              email: user.email as string,
              blogs: userInfo.blogs,
            };
            // storeUser(user.uid, user.displayName, user.email, new Date())
          } else if (user.displayName && !userInfo) {
            storeUser(
              user.uid,
              user.displayName,
              user.email ?? "",
              moment().format("MMM Do YY"),
              []
            );
            resData = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email as string,
              blogs: null,
            };
          }
          res.send(resData);
        });
      }
    });
  } catch (error) {
    console.log("Error when logging in user");
    res.status(405).send({ message: `Fail to login user: ${error}` });
    return;
  }
};

export default handler;
