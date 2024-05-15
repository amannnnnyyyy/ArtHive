const express = require("express")
const router = express.Router()
const Og_writtenWork = require("../models/writtenWork")
const Author = require("../models/author")
const multer = require("multer")
const path = require('path')
const fs = require('fs')
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
  let query = Og_writtenWork.find()
  if(req.query.title!=null && req.query.title!=''){
    query = query.regex('title',new RegExp(req.query.title,'i'))
  }
  if(req.query.publishedBefore!=null && req.query.publishedBefore!=''){
    query = query.lte('publishDate',new RegExp(req.query.publishedBefore))
  }
  if(req.query.publishedAfter!=null && req.query.publishedAfter!=''){
    query = query.gte('publishDate',new RegExp(req.query.publishedAfter))
  }
  try{
    const writtenWorks = await query.exec()
    res.render("writtenWorks/index",{
      writtenWorks:writtenWorks,
      searchOptions:req.query
    })
  }catch{
    res.redirect('/')
  }
  
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
    if (writtenWork.coverImage!=null) {
      removeCover(writtenWork.coverImage)  
    }
    
    renderNewPage(res,writtenWork,true)
  }
})
function removeCover(fileName){
  fs.unlink(path.join(uploadPath,fileName),err=>{
    if(err) console.error(err)
    console.log('cover image has been removed')
  })
}

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
  