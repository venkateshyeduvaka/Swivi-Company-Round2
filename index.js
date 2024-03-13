const express= require("express")

const bodyparser=require("body-parser")

const mongoose =require("mongoose")

const cors=require("cors")

const FormRoute=require("./routes/formRoute")


const app=express()
app.use(cors())
app.use(bodyparser.json({limit:"30mb",extend:true}))





//mongoose.connect("mongodb://127.0.0.1:27017/SwivlAssignment")
//mongoose.connect("mongodb+srv://venkatesh2002:Venkatesh@2002@cluster0.ig24jva.mongodb.net/SwivlAssignment?retryWrites=true&w=majority&appName=Cluster0")

const password = encodeURIComponent("Venkatesh@2002");

mongoose.connect(`mongodb+srv://venkatesh2002:${password}@cluster0.ig24jva.mongodb.net/SwivlAssignment?retryWrites=true&w=majority&appName=Cluster0`);

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  
mongoose.connection.once("open", () => {
    console.log("MongoDB connected successfully");
  });

app.use('/form',FormRoute )

app.listen(6500,()=>{
    console.log("server is running")
})