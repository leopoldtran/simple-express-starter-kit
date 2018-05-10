import { MongoClient, ObjectID } from 'mongodb'

const _inner = {
  db: null,
  dbName: null,
}
const ITEMS_PER_PAGE = 30

export const MongoDbService = {
  init: async ({ endpoint, dbName }) => {
    await MongoClient.connect(endpoint, async (err, db) => {
      if (err) {
        return console.log('Cannot connect to MongoDb', err);
      }
      _inner.dbName = dbName
      _inner.db = db.db(dbName)
      console.log('Connect to DB!');
    })
  },

  mongoDb: () => _inner.db,

  getById: ({ collection, id }) => new Promise((resolve, reject) => {
    const obId = new ObjectID(id)
    _inner.db.collection(collection).find({ _id: obId }).toArray((err, item) => {
      if (err) {
        console.log(`Error: getById ---- ${collection} ${id}`)
        reject({})
        return
      }
      resolve(item)
    })
  }),

  getItems: ({ collection, page = 0, size = ITEMS_PER_PAGE, ...filter }) => new Promise((resolve, reject) => {
    const skip = (Number(page)) * Number(size)
    if(filter.block_num) {
      filter.block_num = Number(filter.block_num)
    }
    if(filter.action_id) {
      filter.action_id = Number(filter.action_id)
    }
    _inner.db.collection(collection).find({...filter}).sort([['block_num', -1]]).skip(skip).limit(Number(size)).toArray((err, items) => {
      if (err) {
        console.log(`Error: getItems ---- ${collection}`)
        reject({})
        return
      }
      resolve(items)
    })
  }),
  count: ({ collection }) => new Promise((resolve, reject) => {
    _inner.db.collection(collection).count((err, count) => {
      if(err) {
        console.log(`Error: count ---- ${collection}`)
        reject(0)
        return
      }
      resolve(count)
    })
  }),
  aggregate: ({ collection, aggregate }) => new Promise((resolve, reject) => {
    _inner.db.collection(collection).aggregate(aggregate).toArray((err, items) => {
      if (err) {
        console.log(`Error: aggregate ---- ${collection}`)
        reject({})
        return
      }
      resolve(items)
    })
  }),
  getItem: ({ collection, ...filter }) => new Promise((resolve, reject) => {
    _inner.db.collection(collection).findOne({...filter},(err, item) => {
      if (err) {
        console.log(`Error: aggregate ---- ${collection}`)
        reject({})
        return
      }
      resolve(item)
    })
  })

}
