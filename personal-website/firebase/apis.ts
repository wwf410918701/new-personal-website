import moment from 'moment';
import { firestore } from './config'
import { Summary } from './type';

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

//Get the next linesToReadCount lines of summary data start at startAt id
export const fetchAllPostsSummaries = async () => {
  const postsSummariesCollectionRef = firestore.collection(`postsAbstract/`)

  const data = await postsSummariesCollectionRef.get()
  return data.docs.map(doc => {
    const { author, id, posterImgUrl, summary, time, title} = doc.data()
    return {
      author: author?? '', id: id?? '', posterImgUrl: posterImgUrl?? '', summary: summary?? '' , time: time?.toString()?? '', title: title?? ''
    }
  }) as Summary[]
}
