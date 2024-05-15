const mongoose = require('mongoose')

const writtenWorkSchema = new mongoose.Schema({
    title: {
       type:String,
       required:true,
       default:''
     },
     description: {
        type:String,
        required:false,
        default:''
      },
      publishDate:{
        type:Date,
        required:true
      },
      pageCount: {
        type:Number,
        required:false,
      },
      createdAt: {
        type:Date,
        required:false,
        default:Date.now()
      },
     coverImage:{
        type:String,
        required:true,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmhJla55Wmu_eiMde4emN6Tik5brGG_uM907_XmgU6lg&s'
     },
     author: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Author'
     }
    // bio: String,
    // image: String,
    // books: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Book'
    //     }
    // ]   
})

//Author == name of database
module.exports = mongoose.model('WrittenWork',writtenWorkSchema)