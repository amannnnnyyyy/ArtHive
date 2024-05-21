if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const cors = require('cors');
const express = require("express")
const path = require('path');
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
//fetch from authors
const authors = require('./routes/authors')
//fetch from writtenWork
const writtenWorks = require('./routes/writtenWorks')
// fetch from main.js
const main = require('./routes/main')
const methodOverride = require("method-override")





app.use(cors({
    origin: '*'||'http://localhost:5174', // Allow requests from your React development server
    methods: 'GET', // Allow the GET method for fetching data (adjust as needed)
    credentials: false // Optional: Disable credential exposure if not needed
}));
//set view engine
app.set('view engine','ejs')
//set views directory
app.set('views',__dirname+'/views')
//hook up layouts  : every single file put inside this file, 
    //so no header and footer required for html
app.set('layout','layouts/layout')
app.use(expressLayouts)

app.use(methodOverride('_method'))
//public files locations
//app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//app.use(express.static('public'))
app.use('/',main)
app.use('/authors',authors)
app.use('/writtenWorks',writtenWorks)





//set up mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('connected to mongoose!'))






// listening port default is 3000 but once deployed the server tells us the port
app.listen(process.env.PORT || 3000)

