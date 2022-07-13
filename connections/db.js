const mongoose = require('mongoose');
require('dotenv').config()
const db=mongoose.connect(
    process.env.URL,
    {
        useNewUrlParser: true,
        // useFindAndModify: false,
        // userUnifiedTopology: true
    },
    (err)=>{
        if(err){
            console.log('DB Error!', err)
        }else{
            console.log('DB connected!')
        }
    }
)
