import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { auth } from '../../firebase/config';
import { storeUser } from '../../firebase/usersRelevantApis';

type NewUserData = {
  email: string,
  password: string,
  userName: string,
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
    const body = req.body as NewUserData
    const { user } = await auth.createUserWithEmailAndPassword(
      body.email,
      body.password
    );

    await storeUser(
      user?.uid ?? "",
      body.userName,
      body.email,
      moment().format("MMM Do YY"),
      []
    );

    res.status(200).send({message: 'Successfully create a new user'})
  } catch (error) {
    console.log('Error when creating user')
    res.status(500).send({ message: 'Fail to create user' })
    return
  }
  };


export default handler