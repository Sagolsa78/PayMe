const express=require("express")
const cors=require("cors");
const rootRouter=require("./Routes/index")
const dotenv= require("dotenv");


const app=express();

app.use(cors({
    origin:"https://payme-sagolsa78.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]

}));

app.options("*",cors());



app.use(express.json());
app.use("/api/v1",rootRouter);

 const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
});

