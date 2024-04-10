import { Document } from "../model/Document.js";

export const findOrCreateDoc = async (DocumentID, newDocument) => {
    try {
        if (newDocument) {
            const initialValue = '';
            return await Document.create({ _id: DocumentID, data: initialValue });
        } else {
            const room = await Document.findById(DocumentID);
            return room;
        }
    } catch (error) {
        console.error("Error in findOrCreateDoc:", error);
        throw error;
    }
};

export const findAndUpdate = async (DocumentID, newData) => {
    try {
        const updatedDoc = await Document.findByIdAndUpdate(DocumentID, { data: newData });
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
