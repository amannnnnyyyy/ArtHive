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

router.get("/:id",async (req,res)=>{
  try{
    let authorName
      const written = await Og_writtenWork.findById(req.params.id).populate('author').exec();
      if(written.author.name!=null){
        authorName = written.author.name
      }else{
        authorName = 'Unknown'
      }
      res.render('writtenWorks/show',{
        written:written,
        authorName:authorName
      })
  }catch{
    res.redirect('/')
  }
})



// Edit Book
router.get("/:id/edit",async(req,res)=>{
  try{
    const writtenWork = await Og_writtenWork.findById(req.params.id)
  
  renderEditPage(res,writtenWork)
  }catch{
    res.redirect('/')
  }

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
    res.redirect(`writtenWorks/${writtenWork.id}`)
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



//Update written work
router.put("/:id", upload.single('cover') ,async(req, res)=>{
  let written
  try{
    written = await Og_writtenWork.findById(req.params.id)
    written.title = req.body.title
    written.author = req.body.author
    written.description = req.body.description
    written.publishDate = new Date(req.body.publishDate)
    written.pageCount = req.body.pageCount
    if(req.file!=null){
      written.coverImage = req.file.filename
    }
    // if(req.body.coverImage!=null && req.body.coverImage!== ''){
    //saveCoverImage(writtenWork,req.body.coverImage) 
 // }
    await written.save()
    res.redirect(`/writtenWorks/${written.id}`)
  }catch(err){
    console.log(err)
    if (written.coverImage!=null) {
      removeCover(written.coverImage)  
    }

    if(written!=null){
      renderEditPage(res,written,true)
    }else{
        res.redirect('/')
    }
    
  }
})

//delete written work
router.delete("/:id",async(req,res)=>{
  let written
  try{
    written = await Og_writtenWork.findById(req.params.id)
    removeCover(written.coverImage)
    await written.deleteOne()
    res.redirect('/writtenWorks')
  }catch(err){
    if(written != null){
      res.render('writtenWorks/show',{
        written:written,
        errorMessage:"Could not delete Written Work"
      })
    }else{
    res.redirect(`/writtenWorks/${written.id}`)
    }
  }
})

async function renderNewPage(res,writtenWork,hasError=false){
  renderFormPage(res,writtenWork,'new',hasError);
}

async function renderEditPage(res,writtenWork,hasError=false){
 renderFormPage(res,writtenWork,'edit',hasError);
}


async function renderFormPage(res,writtenWork,form,hasError=false){
  try{
    let authors = []
    authors = await Author.find({})
    const params = {
      writtenWork: writtenWork,
      authors
   }
    // const writtenWorks = new writtenWork()
    if(hasError)
    { if(form == 'edit'){
      params.errorMessage = "Error Editing written Work!"}
    }
    else if(form == 'new'){
      params.errorMessage = "Error Creating written Work!"
    }
    res.render(`writtenWorks/${form}`, params)
  }catch(err){
    console.log(err)
    res.redirect('/writtenWorks')
  }
}
  module.exports = router
  