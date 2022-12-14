import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../firebase/config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    auth.signOut()
    .then(() => {
      console.log('User log out successfully')
      res.status(200).send({ message: 'Sign out success' })}
    ).catch((e) => {
      console.log('Error when getting user infos')
      console.log(e)
      res.status(405).send({ message: 'Fail get user infos' })
      return
    })
}

export default handler