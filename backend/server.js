const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connnection = require("./config/db");
require("./config/db");
dotenv.config();
const app = express();
connnection();

const PORT = process.env.PORT;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
