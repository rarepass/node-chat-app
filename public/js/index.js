var socket = io();

socket.on("connect", () => {
    console.log("Connected to server")

    /*
    socket.emit("createEmail", {
        to: "oboro@example.com",
        text: "ganbaru"
    })*/
    socket.emit("createMessage", {
        from: "createMessage@example.com",
        text: "ganbaru"
    })

});

socket.on("disconnect", () => {
    console.log("disconnected from server")
})

/*
socket.on("newEmail", (email)=> {
    console.log("New email---")
    console.log(email)
})
*/
socket.on("newMessage", (message)=> {
    console.log("New message", message)
})
