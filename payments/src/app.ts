import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

import cookieSession from 'cookie-session';


import { errorHandler,currentUser } from '@sgtickets/common';
import { NotFoundError } from '@sgtickets/common';

import { createChargeRouter } from './routes/new';



const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed:false,
    //false in test env
    secure:process.env.NODE_ENV!=='test'
})); 



app.use(errorHandler);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*',async (req,res)=>{
    throw new NotFoundError();
});

export {app};