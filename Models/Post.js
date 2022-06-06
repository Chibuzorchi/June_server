const mongoose = require("mongoose");
const {Schema} = mongoose
const userSchema = new Schema({
    title : {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    }},
    
    {timestamps: true});

    const User = mongoose.model("user", userSchema)
    module.exports = Post;