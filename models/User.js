const mongo = require('mongoose');
const Schema = mongo.Schema;


const userSchema =  new Schema(
   {
    email :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true

    },
    lastLogin : {
        type: Date,
        default: Date.now
    }, 
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt : Date,

   },
   { timestamps: true } 



);


module.exports = mongo.model('User', userSchema);




