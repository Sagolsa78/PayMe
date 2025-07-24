
const mongoose =require("mongoose");
const dotenv =require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Db Connected"));



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


const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true // User performing the transaction
  },
  type: {
    type: String,
    required: true // e.g., "UPI Transfer", "Electricity Bill"
  },
  amount: {
    type: Number,
    required: true
  },
  note: {
    type: String
  },
  status: {
    type: String,
    enum: ["completed", "pending", "failed"],
    default: "completed"
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // e.g., "Rahul Sharma" or "MSEB Maharashtra",
    ref:"User",
  },
  time: {
    type: String,
    required: true // human-readable like "2 hours ago"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Transactions= mongoose.model("Transaction", transactionSchema);


const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",accountSchema);


module.exports={
    User,
    Account,
    Transactions,
}
