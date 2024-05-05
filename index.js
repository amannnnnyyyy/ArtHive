if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

//set view engine
app.set('view engine','ejs')

//set views directory
app.set('views',__dirname+'/views')

//hook up layouts  : every single file put insinde this file, 
    //so no header and footer required for html
app.set('layout','layouts/layout')
app.use(expressLayouts)

//public files locations
app.use(express.static('public'))

//set up mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('connected to mongoose!'))


// fetch from main.js
const main = require('./routes/main')
app.use('/',main)

//fetch from authors
const authors = require('./routes/authors')
app.use('/authors',authors)


// listening port default is 3000 but once deployed the server tells us the port
app.listen(process.env.PORT || 3000)

