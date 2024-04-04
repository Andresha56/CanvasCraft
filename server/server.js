import express from "express";
import { createServer } from 'node:http';
import { Server } from "socket.io";
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});
io.on("connection", (socket) => {
    console.log("user connected successfully!");

    socket.on("joinRoom", ({ username, roomId }) => {
        console.log("user joined room  successfully!", username + " ", roomId);
        socket.join(roomId);
        const initialContent='';
        socket.emit('load-doc',initialContent)
        socket.on("text-change", (delta) => {
            socket.broadcast.to(roomId).emit('receive-changes', delta);
        })
    })

});

server.listen(4000, () => {
    console.log('server running at http://localhost:4000');

})