const express=require('express');
const app = express(); 
require('dotenv').config()
require("./connections/db")
const PORT=process.env.PORT || 4000;
const cors=require('cors');
const socket=require('socket.io');
app.use(cors()); 
app.use(express.json());
app.use("/",require("./routes/index"))

app.get((req,res)=>{
  res.send("server running" ,PORT);
})

// const express = require('express');
// const app = express();
// // require('dotenv').config()
// // require("./connections/db")
// const axios = require("axios")
// const PORT = process.env.PORT || 4000;
// // const cors=require('cors');

// const asana = require('asana');
// app.use(express.json());
// const client = asana.Client.create().useAccessToken('1/1202622092763317:33a279112829ae41cffd6214c3229f76');
// app.get("/", async (req, res) => {
//     try {
//         client.projects.getProjects({ param: "value", param: "value", opt_pretty: true })
//             .then((result) => {
//                 console.log(result);
//             });
//         // var config = {
//         //     method: "get",
//         //     url:  'https://app.asana.com/api/1.0/projects',
//         //     headers: {
//         //       "Accept": "application/json",
//         //       Authorization: `Bearer 1/1202622092763317:33a279112829ae41cffd6214c3229f76`
//         //     },
//         //   };
//         //   const trackingRes = await axios(config);
//         //   console.log(trackingRes.data);
//     } catch (e) {
//         console.log(e);
//     }
// })

// // app.use(cors());

// // app.use("/",require("./routes/index"))

const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});