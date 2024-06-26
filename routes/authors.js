const express = require("express")
const router = express.Router()
const Author = require("../models/author")
const WrittenWorks = require("../models/writtenWork")

//All authors route

router.get("/",async(req,res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const skip = (page - 1) * limit;
  let searchOptions = {}
  if(req.query.name!= null && req.query.name!= ''){
    searchOptions.name = new RegExp(req.query.name,'i')
  }
try {
  const authors = await Author.find(searchOptions).skip(skip).limit(limit)
  const totalAuthors = await Author.countDocuments();
  const totalPages = Math.ceil(totalAuthors / limit);
  console.log("total authors : ",totalAuthors , "totalPages : ", totalPages)
  res.json({authors:authors,totalAuthors})
  //res.json(authors)
  //res.render('authors/index',{authors:authors,searchOptions:req.query})
  //res.json(authors)
  }catch{
    res.redirect('/authors')
  }})


//New authors

router.get("/new",(req,res)=>{
 res.render('authors/new',{
    author: new Author()
 })
})


//create a new author
router.post("/", async(req, res)=>{
  console.log("this is req.body: ",req.body)
  const this_name = req.body.name||'';
  const author = new Author({
    name:this_name
  })
    try {
      const newAuthor = await author.save();
      
      // res.redirect(`authors/${newAuthor.id}`); 
      res.json(newAuthor)
    } catch (error) {
      console.error(error);
      if (error) {
        console.log("error creating author: ",error)
        //res.render('authors/new', { author, errorMessage: "Error creating author" }); // Pass the error message
      } else {
        res.render('authors/new', {
          author: author
        });
      }
      
    }
})

router.get("/:id",async(req,res)=>{
  try{
    const author = await Author.findById(req.params.id)
    const writtenWorks = await WrittenWorks.find({author:author.id}).limit(6).exec()
  
    // res.render('authors/show',{
    //   author:author,
    //   writtenWorksByAuthor:writtenWorks
    // })
    res.json({writtenWorks:writtenWorks,
        author
    });
  }catch(err){
    console.log("|||--------"+err.message+"--------|||")
    res.redirect('/authors')
  }
})

router.get("/:id/edit",async(req,res)=>{
  try{
    const author = await Author.findById(req.params.id)
    res.render('authors/edit',{
      author: author
   })
  }catch{
    res.redirect('/authors')
  }
 
})


//we can't use put and delete methods from browser we can
//only use post and get for the above two we install
//npm i method-override
//include it in index.js (parent)
router.put('/:id',async(req,res)=>{
  let author
    try {
      author = await Author.findById(req.params.id)
      author.name = req.body.name
      await author.save();
      res.redirect(`/authors/${author.id}`); 
    } catch (error) {
      console.error(error);
      if (author == null) {
        res.redirect('/');
      }else{
        res.render('/authors/edit', 
        { author:author, 
          errorMessage: "Error updating author" }); // Pass the error message
   
      }   
    }
})

router.delete("/:id",async(req,res)=>{
  let author
    try {
      author = await Author.findById(req.params.id)
      await author.deleteOne();
      res.redirect(`/authors`); 
    } catch (error) {
      console.error(error);
      if (author == null) {
        res.redirect('/');
      }else{
        res.redirect(`/authors/${author.id}`)
      }   
    }
})


  
  module.exports = router
  