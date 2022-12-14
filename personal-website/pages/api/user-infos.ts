import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next/types'
import { auth } from '../../firebase/config';
import { fetchUserInfo, storeUser } from '../../firebase/usersRelevantApis';
import { LoginResData } from '../../mobx/helper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let resData: LoginResData;

    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user.uid).then((userInfo) => {
          if (userInfo?.displayName) {
            resData = {
              uid: user.uid,
              displayName: userInfo.displayName,
              email: user.email as string,
              blogs: userInfo.blogs
            };
          }
          else if (user.displayName && !userInfo) {
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
              blogs: null
            };
            
          }
          res.send(resData)
        });
      }})
  } catch (error) {
    console.log('Error when getting user infos')
    res.status(405).send({ message: 'Fail get user infos' })
    return
  }
}

export default handler