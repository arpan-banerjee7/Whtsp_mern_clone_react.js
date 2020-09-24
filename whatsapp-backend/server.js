// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;
// const pusher = new Pusher({
//     appId: '1071060',
//     key: '213c701d4f851b7e4bed',
//     secret: '357602364c1eb762eb6b',
//     cluster: 'us3',
//     encrypted: true
//   });
//   const db= mongoose.connection

//   db.once('open',()=>{ console.log("db connected")
//   const msgCollection = db.collection("messagecontents")
//   const changeStream = msgCollection.watch();

//   changeStream.on('change', (change)=>{
//      if(change.operationType ==='insert'){
//          const messageDetails = change.fullDocument;
//          pusher.trigger('messages', "inserted",
//           {
//             name: messageDetails.name,
//             message: messageDetails.message,
//             timestamp: messageDetails.timestamp,

//           }
//         );
//      }
//      else{
//          console.log('Error triggering Pusher');
//      }
//   })

// })

//middleware
app.use(express.json());

// /*Setting headers without cors */
// // app.use((req,res,next)=>{
// //     res.setHeader("Access-Control-Allow-Origin","*");
// //     res.setHeader("Access-Control-Allow-Headers","*");
// // });
// app.use(cors())

//db config xFMWcglaQNsAvyRF
const connectionUrl =
  "mongodb+srv://userArpan:passwordArpan@cluster0-3pvdp.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose
  .connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error(err));

// const db =
//   "mongodb+srv://userArpan:passwordArpan@cluster0-3pvdp.mongodb.net/udemy-angular?retryWrites=true&w=majority";
// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected."))
//   .catch((err) => console.error(err));
// //???

//api routes
/* get requests */
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) =>
    err ? res.status(500).send(err) : res.status(200).send(data)
  );
});

/* post requests */
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status.apply(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });

  //err? res.status(500).send(err) : res.status(201).send(data));
});

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
