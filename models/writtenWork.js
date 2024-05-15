const mongoose = require('mongoose')

const coverImageBasePath='uploads/writtenCover'
const writtenWorkSchema = new mongoose.Schema({
    title: {
       type:String,
       required:true,
       default:''
     },
      publishDate:{
        type:Date,
        required:true
      },
      description: {
        type:String,
        required:false,
        default:''
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
writtenWorkSchema.virtual('coverImagePath').get(function() {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})
//Author == name of database
module.exports = mongoose.model('WrittenWork',writtenWorkSchema)
module.exports.coverImagePath = coverImageBasePath