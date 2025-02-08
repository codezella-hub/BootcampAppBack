const mongo =require('mongoose')
const Schema=mongo.Schema
const user=new Schema(
    {
        name:String,
    }
);

module.exports=mongo.model('user',user);