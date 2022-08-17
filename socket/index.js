
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});
let onlineUsers=[]

const addNewUser=(username,socketId)=>{
    if ( !onlineUsers.some((user) => user.username === username)) {
        const user={username,socketId}
        onlineUsers.push(user)
     
      }
}
const removeUser=(socketId)=>onlineUsers=onlineUsers.filter((user)=>user.socketId!==socketId)
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username); 
};
io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
  
  socket.on("sendNotification",({receiverName,type,sender})=>{
    const receiver =getUser(receiverName) 
    io.to(receiver?.socketId).emit("getNotification",{type,sender})
  })
  io.emit("firstEvent","helloooo")
  socket.on('disconnect',()=>{
    removeUser(socket.id)
  })
});

io.listen(process.env.PORT||3001);