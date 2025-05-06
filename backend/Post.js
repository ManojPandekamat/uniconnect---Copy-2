const mongoose= require('mongoose')

const post =new mongoose.Schema({
    photo_url:String,
    description:String,
    type:String,
    usn:String,
    date:Date
})

module.exports = mongoose.model("posts",post)

