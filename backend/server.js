const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { getUserFromToken } = require("./middleware/authMiddleware");
const Chat = require("./models/chatModel");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: CLIENT_URL,
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return next(new Error("Unauthorized"));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  socket.join(socket.user._id.toString());
  socket.emit("connected");

  socket.on("join chat", async (room) => {
    const chat = await Chat.findOne({
      _id: room,
      users: { $elemMatch: { $eq: socket.user._id } },
    }).select("_id");

    if (!chat) {
      socket.emit("socket error", "Unauthorized chat access");
      return;
    }

    socket.join(room);
  });
  socket.on("typing", async (room) => {
    const chat = await Chat.findOne({
      _id: room,
      users: { $elemMatch: { $eq: socket.user._id } },
    }).select("_id");

    if (chat) {
      socket.in(room).emit("typing");
    }
  });
  socket.on("stop typing", async (room) => {
    const chat = await Chat.findOne({
      _id: room,
      users: { $elemMatch: { $eq: socket.user._id } },
    }).select("_id");

    if (chat) {
      socket.in(room).emit("stop typing");
    }
  });

  socket.on("new message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    if (newMessageRecieved.sender._id !== socket.user._id.toString()) {
      socket.emit("socket error", "Unauthorized message event");
      return;
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    socket.leave(socket.user._id.toString());
  });
});
