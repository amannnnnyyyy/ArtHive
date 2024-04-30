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


// fetch from main.js
const main = require('./routes/main')
app.use('/',main)




// listening port default is 3000 but once deployed the server tells us the port
app.listen(process.env.PORT || 3000)

