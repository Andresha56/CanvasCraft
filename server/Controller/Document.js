import { Document } from "../model/Document.js";

export const findOrCreateDoc = async (roomId, newRoom) => {
    try {
        if (newRoom) {
            const initialValue = '';
            return await Document.create({ _id: roomId, data: initialValue });
        } else {
            console.log("check Existing Room");
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

export const checkIsDocument=async(docId)=>{
    const _id=docId;
    const isDoc=await Document.findById(_id);
    return isDoc;
}
