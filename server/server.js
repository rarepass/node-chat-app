const path = require('path');
const express = require('express');
const socketIO = require("socket.io")
const http = require("http")
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("new user connected");

    socket.emit("newEmail",{
        from: "mike@exapmle.com",
        text:"hey hey hye!!",
        createAt:123
    });

    socket.emit("newMessage",{
        from: "message_from_server@exapmle.com",
        text:"hey hey hye!!",
        createAt:123
    });


    /*
    socket.on('createEmail', (newEmail)=> {
        console.log("createEmail", newEmail)
    })*/
    socket.on('createMessage', (message)=> {
        console.log("createMessage", message)
    })
    socket.on("disconnect", () => {
        console.log("user was disconnected")
    })
});


server.listen(port, () => {
    console.log(`server on ${port}`)
})