import express from "express";
import { createServer } from 'node:http';
import { ConnectToDB } from "./Connection/DB.js";
import { Server } from "socket.io";
import { findOrCreateDoc } from "./controller/Document.js";
import { findAndUpdate } from "./controller/Document.js";
import { checkIsDocument } from "./controller/Document.js";
const app = express();
const server = createServer(app);
ConnectToDB();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});
io.on("connection", (socket) => {
    console.log("user connected successfully!");
    socket.on("joinRoom", async ({ username, roomId, newRoom }) => {
        socket.join(roomId);
        const docs = await findOrCreateDoc(roomId, newRoom)
        socket.emit('load-doc', docs.data)
        socket.on("text-change", (delta) => {
            socket.broadcast.to(roomId).emit('receive-changes', delta);
        })
        socket.on('save-document', async (newData) => {
            const result = await findAndUpdate(roomId, newData);
        })
    })
    socket.on("checkIsDocument", async (documentId) => {
        try {
            
            const isDocument = await checkIsDocument(documentId);
            console.log(isDocument)
            socket.emit('is-document', {isDocument});
        } catch (error) {
            console.error('Error checking document:', error);
            socket.emit('is-document', { exists: false, error: 'Error checking document' });
        }
    });
    

});

server.listen(4000, () => {
    console.log('server running at http://localhost:4000');

})