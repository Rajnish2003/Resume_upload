const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfo = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be greater than 6 charaters"]
    },
    address:{
        type:String,
    },
    stacks:{
        type: String
    },
    file:{
        type:String,
        required:true
    }
},{
    timestamps:true,
});

const collection = new mongoose.model("task", userInfo);
module.exports = collection;
