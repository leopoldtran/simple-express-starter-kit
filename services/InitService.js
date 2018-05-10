import { MongoDbService } from './MongoDbService'

export default async () => {

  try {
    await MongoDbService.init({
      endpoint: process.env.mongodb__END_POINT,
      dbName: process.env.mongodb_DB_NAME
    })
  } catch (err) {
    console.error('Error initialized Mongodb')
  }
}
