const mong=require("mongoose");

const schema=mong.Schema;

const userSchema=schema({
    Name:{
        type:String,
        required:true,
    },

    Email:{
        type:String,
        required:true,
    },

    Phone:{
        type:String,
        required:true,
    },

    Password:{
        type:String,
        required:true,
    },
    isActive: {
        type: Boolean,
        default: false 
    }
});

const user= mong.model("users", userSchema);
module.exports=user;