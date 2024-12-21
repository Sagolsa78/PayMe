
const mongoose =require("mongoose");


mongoose.connect("mongodb+srv://sahanimohit5ed:w9oYbCgdKeUSdrpp@cluster03.ckuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster03/AppData");

const userSchema= new mongoose.Schema({
    username:{
        trim:true,
        required:true,
        type:String,
        minLength:5,
        maxLength:50,

    },

    password:{
        trim:true,
        required:true,
        type:String,
        minLength:6,


    },
    firstname:{
        trim:true,
        required:true,
        type:String,
        minLength:2,
        maxLength:50,

    },
    lastname:{
        trim:true,
        rerquired:true,
        type:String,
        maxLength:50,
        minLength:3,
    }
});


const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    
    },
    balance:{
        type:Number,
        required:true,
    }

})

const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",accountSchema);


module.exports={
    User,
    Account
}
