const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
       type:String,
       required:true
    },
    bio: String,
    image: String,
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
})

//Author == name of database
module.exports = mongoose.model('Author',authorSchema)