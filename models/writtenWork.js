const mongoose = require('mongoose')
const path = require('path')

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
        required:true 
         },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Author'
    },
})
  
writtenWorkSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null) {
    return path.join('/', coverImageBasePath, this.coverImage)
  }
})
writtenWorkSchema.set('toJSON', { virtuals: true });
writtenWorkSchema.set('toObject', { virtuals: true });
//Author == name of database
module.exports = mongoose.model('WrittenWork',writtenWorkSchema)
module.exports.coverImagePath = coverImageBasePath