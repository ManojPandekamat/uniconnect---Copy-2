const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    post_id:mongoose.Types.ObjectId, //postId
    usn:String,
    comment:String,
    time:Date
})


module.exports =mongoose.model("Comment",Comment)