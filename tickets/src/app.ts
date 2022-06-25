import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

import cookieSession from 'cookie-session';


import { errorHandler,currentUser } from '@sgtickets/common';
import { NotFoundError } from '@sgtickets/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed:false,
    //false in test env
    secure:process.env.NODE_ENV!=='test'
})); 



app.use(errorHandler);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.use(currentUser);

app.all('*',async (req,res)=>{
    throw new NotFoundError();
});

export {app};