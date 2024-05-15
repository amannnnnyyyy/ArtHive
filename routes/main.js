const express = require("express")
const router = express.Router()
const Og_writtenWorks = require("../models/writtenWork")


router.get("/", async(req, res) => {
  let writtenWorks
  try{
    writtenWorks = await Og_writtenWorks.find().sort({createdAt:'desc'}).limit(10).exec()
    console.log(writtenWorks)
  }catch(err){
    console.log(err)
    writtenWorks = []
  }
  res.render('main.ejs',{writtenWorks:writtenWorks})
  })



  
  module.exports = router
  