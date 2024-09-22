const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const dbConnect = require("./config/dbConnect");
const qRoute = require("./routes/QRoute");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  return res.send("Pong");
});

dbConnect();
app.use("/user", userRouter);
app.use("/questions", qRoute);
app.use("/answers", require("./routes/Aroute"));
app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("CHAT SERVER RUNNING ON PORT 3001");
});
