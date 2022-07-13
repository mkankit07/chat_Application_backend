const express=require('express');
const app = express(); 
require('dotenv').config()
require("./connections/db")
const PORT=process.env.PORT || 4000;
const cors=require('cors');

app.use(cors()); 
app.use(express.json());
app.use("/",require("./routes/index"))

app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
});
