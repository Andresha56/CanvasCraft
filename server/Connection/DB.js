import mongoose from "mongoose";
const DB_URL='mongodb://localhost:27017';
export const ConnectToDB=async()=>{
    try{
        await mongoose.connect(DB_URL,{
            dbName:'google_docs',
        })
    }catch{
        console.log('Connection fail!')
    }
}