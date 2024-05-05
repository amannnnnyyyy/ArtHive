const express = require("express")
const router = express.Router()
const Author = require("../models/author")

//All authors route
router.get("/", (req, res) => {
    //res.send("Hello World!!")
    res.render('main')
  })

//New authors

router.get("/get",(req,res)=>{
    res.render('authors/index')
   })
router.get("/new",(req,res)=>{
 res.render('authors/new',{
    author: new Author()
 })
})


//create a new author
router.post("/", (req, res)=>{
    res.send('Author created successfully')
})



  
  module.exports = router
  