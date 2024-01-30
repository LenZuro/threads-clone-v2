import mongoose from 'mongoose';

let isConnected = false 

export const connectToDb =async () => {
    mongoose.set('strictQuery' , true);
    if(!process.env.MONGODB_URL) return console.log('MONGOBD_URL not found')
    if(isConnected) return console.log('Already connect to MONGODB')
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true
        console.log('Connected to MongoBD')
    } catch (error) {
        console.log(error)
    }
    
}

