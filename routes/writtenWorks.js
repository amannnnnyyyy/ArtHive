const express = require("express")
const router = express.Router()
const Author = require("../models/writtenWork")

//All writtenWorks route

router.get("/",async(req,res)=>{
  res.send("All writtenWorks")
  res.render("writtenWorks/")
  })


//New writtenWork

router.get("/new",(req,res)=>{
  res.render('writtenWorks/new'
//   ,{
//     writtenWork: new writtenWork()
//  }
)
})


//create a new writtenWork
router.post("/", async(req, res)=>{
  res.send("create written")
})



  
  module.exports = router
  