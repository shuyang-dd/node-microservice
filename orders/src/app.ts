import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

import cookieSession from 'cookie-session';


import { errorHandler,currentUser } from '@sgtickets/common';
import { NotFoundError } from '@sgtickets/common';

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter} from './routes/delete';

const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed:false,
    //false in test env
    secure:process.env.NODE_ENV!=='test'
})); 



app.use(errorHandler);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.use(currentUser);

app.all('*',async (req,res)=>{
    throw new NotFoundError();
});

export {app};