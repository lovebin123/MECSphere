const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const dbConnect = require("./config/dbConnect");
const qRoute = require("./routes/QnARoute");

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
app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
