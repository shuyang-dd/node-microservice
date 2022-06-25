import mongoose from 'mongoose';
import { app } from './app';

const start= async ()=>{

    if(!process.env.JWT_KEY){
        throw new Error('jwt key');
    }
    if(!process.env.MONGO_URI){
        throw new Error('mongo uri');
    }
    try{
await mongoose.connect(process.env.MONGO_URI);
    } catch(err){
        console.error(err);
    };

  app.listen(3000,()=>{

});  
}

start();

