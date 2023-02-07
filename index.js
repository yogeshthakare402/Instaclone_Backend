const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

mongoose.set('strictQuery', true);
// let url = 'mongodb://localhost:27017/instaApi';
let atlasUrl = "mongodb+srv://yogeshthakare402:Yogesh402@cluster0.426av8b.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(atlasUrl)
.then(console.log("Connected to InstatApi DB"))
.catch(console.error);

let app = express();
app.use(cors());
app.use(express.json({
    limit: '50mb'
  }));
// app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1/",postRoutes)

app.listen(8000, ()=>console.log("app is running on 8000 PORT"));