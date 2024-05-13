const express = require("express")
const router = express.Router()
const Author = require("../models/author")

//All authors route

router.get("/",async(req,res)=>{
  let searchOptions = {}
  if(req.query.name!= null && req.query.name!= ''){
    searchOptions.name = new RegExp(req.query.name,'i')
  }
 try {
  const authors = await Author.find(searchOptions)
  res.render('authors/index',{authors:authors,searchOptions:req.query})
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
      
      res.redirect('authors'); 
    } catch (error) {
      console.error(error);
      if (error) {
        res.render('authors/new', { author, errorMessage: "Error creating author" }); // Pass the error message
      } else {
        res.render('authors/new', {
          author: author
        });
      }
      
    }
})



  
  module.exports = router
  