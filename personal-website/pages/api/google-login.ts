import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../firebase/config';
import { fetchUserInfo, signInWithGoogle, storeUser } from '../../firebase/usersRelevantApis';
import { LoginResData } from '../../mobx/helper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }

  try {
    let resData: LoginResData;

    await signInWithGoogle();;
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
            // storeUser(user.uid, user.displayName, user.email, new Date())
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
      }
    });
  } catch (error) {
    console.log('Error when logging in user')
    console.log(error)
    res.status(405).send({ message: 'Fail to login user' })
    return
  }
  };


export default handler