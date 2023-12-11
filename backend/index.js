const express = require('express')
const app = express()
const mongoose = require('mongoose')
var router = require('./route/route')
app.use(express.json());
const cors = require('cors')

const corsOption = {
  origin: 'http://localhost:4200',
  Credential:true,
}

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, function check(error){
  if(error)
    console.log('Error');
  else
    console.log('Started..')
})

const ConnectMongoose = mongoose.connect('mongodb://127.0.0.1:27017')
ConnectMongoose.then(response => console.log('Connected'))

app.use(cors(corsOption))
app.use(router)

