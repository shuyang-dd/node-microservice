import request from 'supertest';
import { app } from '../../app';

it('fails when email doesnot exist',async()=>{
    await request(app)
   .post('/api/users/signin')
   .send({
    email:'test@test.com',
    password:'password'
   })
   .expect(400);
})

it('fincorrect pasword',async()=>{
    await request(app)
   .post('/api/users/signup')
   .send({
    email:'test@test.com',
    password:'password'
   })
   .expect(201);
   
    await request(app)
   .post('/api/users/signin')
   .send({
    email:'test@test.com',
    password:'pass'
   })
   .expect(400);

})