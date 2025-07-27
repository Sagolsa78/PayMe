const express=require("express")
const cors=require("cors");
const rootRouter=require("./Routes/index")

const app=express();

app.use(cors({
    origin:"https://payme-sagolsa78.vercel.app/",
    credentials: true,
    methods:["GET", "POST"]
}));

app.use(express.json());
app.use("/api/v1",rootRouter);


app.listen(3000);

