import moment from 'moment';
import { firestore } from './config'

export const storeEmployerMessage = async (name: string, email: string, message: string) => {
  try {
    const createAt = moment().format("MMM Do YY");  
    const employerMessageRef = firestore.doc(`employer-messages/${createAt}_${name}`)
    await employerMessageRef.set(
      {
          name,
          email,
          message,
          time: createAt,
      }
    )
    return true
  } catch (error) {
    console.log('Error when saving employer message to firebase')
    return false
  }
}