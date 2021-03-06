import express,{Request,Response} from 'express';
import {body} from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import {User} from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router=express.Router();

router.post('/api/users/signup',[
    body('email')
      .isEmail()
      .withMessage('invalid'),
    body('password')
      .trim()
      .isLength({min:4,max:20})
      .withMessage('length')
],
validateRequest,
async (req:Request,res:Response)=>{

  const {email,password} =req.body;

  const existingUser=await User.findOne({email});

  if(existingUser){
    throw new BadRequestError('email in use');
  }

  const user=User.build({email,password});
  await user.save();

 
  const userJwt=jwt.sign({
    id:user.id,
    email:user.email
  },process.env.JWT_KEY!);

  req.session={
    jwt:userJwt
  };

  res.status(201).send(user);
   
});

export {router as signupRouter};