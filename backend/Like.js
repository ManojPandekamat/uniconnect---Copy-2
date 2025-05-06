const mongoose = require('mongoose')

const Like = new mongoose.Schema({
    post_id:mongoose.Types.ObjectId, //postId
    usn:String,
    time:Date
})


module.exports =mongoose.model("Like",Like)