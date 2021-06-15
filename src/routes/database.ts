const MongoClient = require('mongodb').MongoClient;
import mongoose from 'mongoose'
import config from '../config';

const uri =`mongodb://localhost/${config.MONGO_DATABASE}`
console.log(config.MONGO_DATABASE)
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(db =>console.log('conectamos la base de datos'))
.catch((err)=>{
  console.log(err)
})

