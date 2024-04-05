import { Document } from "../model/Document.js";

export const findOrCreateDoc = async (roomId, newRoom) => {
    try {
        if (newRoom) {
            console.log("New Room");
            const document = await Document.findById(roomId);
            console.log(document)
            if (document) {
                return document;
            } else {
                console.log("Document not found, creating new one");
                const initialValue = '';
                return await Document.create({ _id: roomId, data: initialValue });
            }
        } else {
            console.log("Existing Room");
            const room = await Document.findById(roomId);
            return room;
        }
    } catch (error) {
        console.error("Error in findOrCreateDoc:", error);
        throw error;
    }
};

export const findAndUpdate = async (roomId, newData) => {
    try {
        console.log("Updating document with ID:", roomId);
        const updatedDoc = await Document.findByIdAndUpdate(roomId, { data: newData });
        return updatedDoc;
    } catch (error) {
        console.error("Error in findAndUpdate:", error);
        throw error;
    }
};
