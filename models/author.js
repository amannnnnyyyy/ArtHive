const mongoose = require('mongoose')
const writtenWork = require('./writtenWork')

const authorSchema = new mongoose.Schema({
    name: {
       type:String,
       required:true,
       default:''
    // },
    // bio: String,
    // image: String,
    // books: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Book'
    //     }
    // ]   
}})

//Author == name of database

authorSchema.pre("deleteOne", async function (next) {
    try {
        const query = this.getFilter();
        console.log("/|||||/|||||/|||->"+query._id)
        const hasWritten = await writtenWork.exists({ author: query._id });
  
        if (hasWritten) {
            next(new Error("This author still has books."));
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Author',authorSchema)