
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});
let activeUsers = [];
let onlineUsers = []

const addNewUser = (username, socketId) => {
  if (!onlineUsers.some((user) => user.username === username)) {
    const user = { username, socketId }
    onlineUsers.push(user)

  }
}
const removeUser = (socketId) => onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};
io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ receiverName, type, sender }) => {
    const receiver = getUser(receiverName)
    console.log(receiverName);
    io.to(receiver?.socketId).emit("getNotification", { type, sender })
  })
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });
  socket.on('disconnect', () => {
    removeUser(socket.id)
  })
  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    // console.log("Sending from socket to :", receiverId)
    // console.log("Data: ", data)
    console.log(user.socketId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
  socket.emit("me", socket.id);
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {

    const user = activeUsers.find((user) => user.userId === userToCall);

    user && io.emit("userCall", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.emit("callAccepted", data.signal)
  });
  socket.on("leaveCall", () => {
    io.emit("leaveCall")
  });
  socket.on("callDeclined", (userId) => {
    const user = activeUsers.find((user) => user.userId === userId);
    io.emit("callDeclined", userId)
  });
});

io.listen(process.env.PORT || 3001);