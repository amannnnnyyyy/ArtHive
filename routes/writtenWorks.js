const express = require("express")
const router = express.Router()
const Og_writtenWork = require("../models/writtenWork")
const Author = require("../models/author")
const multer = require("multer")
const path = require('path')
const uploadPath = path.join('public',Og_writtenWork.coverImagePath)

const imageMimeTypes = ['image/png','image/jpeg','image/jpg','image/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter:(req,file,callback)=>{
    callback(null,imageMimeTypes.includes(file.mimetype))
  }
})

//All writtenWorks route

router.get("/",async(req,res)=>{
  res.send("All writtenWorks")
  res.render("writtenWorks/")
  })


//New writtenWork

router.get("/new",async(req,res)=>{
  renderNewPage(res,new Og_writtenWork())
 
})


//create a new writtenWork
router.post("/", upload.single('cover') ,async(req, res)=>{
  const fileName = req.file!=null ? req.file.filename : null
  const writtenWork = new Og_writtenWork({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImage: fileName
  })
  try{
    const newWrittenWork = await writtenWork.save()
    res.redirect('writtenWorks')
  }catch(err){
    console.log(err)
    renderNewPage(res,writtenWork,true)
  }
})

async function renderNewPage(res,writtenWork,hasError=false){
  try{
    let authors = []
    authors = await Author.find({})
    const params = {
      writtenWork: writtenWork,
      authors
   }
    // const writtenWorks = new writtenWork()
    if(hasError) params.errorMessage = "Error creating written Work!"
    res.render('writtenWorks/new', params)
  }catch(err){
    console.log(err)
    res.redirect('/writtenWorks')
  }
}


  
  module.exports = router
  