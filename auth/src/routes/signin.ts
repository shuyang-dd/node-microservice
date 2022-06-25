import express from 'express';
import { Request,Response } from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router=express.Router();

router.post('/api/users/signin',[
    body('email')
      .isEmail()
      .withMessage('invalid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password')
],
validateRequest,
async (req:Request,res:Response)=>{

   const {email,password}=req.body;

   const existingUser=await User.findOne({email});

   if(!existingUser){
    throw new BadRequestError('invalid');
   }

   const passwordsMatch=await Password.compare(existingUser.password,password);
   if(!passwordsMatch){
    throw new BadRequestError('invalid');
   }

   const userJwt=jwt.sign({
    id:existingUser.id,
    email:existingUser.email
  },process.env.JWT_KEY!);

  req.session={
    jwt:userJwt
  };

  res.status(201).send(existingUser);

});

export {router as signinRouter};