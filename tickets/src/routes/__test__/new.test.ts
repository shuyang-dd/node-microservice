import request from 'supertest';
import { isTypedArray } from 'util/types';
import {app} from '../../app'
import '@types/jest';

jest.mock('../../nats-wrapper');

it('has a route handler listening to /api/tickets for post requests',async ()=>{

    const response=await request(app)
      .post('/api/tickets')
      .send({});
    expect(response.status).not.toEqual(404);
});

it('only signed in',async ()=>{

    const response=await request(app)
      .post('/api/tickets')
      .send({});
    expect(response.status).toEqual(401);
});

it('returns status other than 401 if signed in',async ()=>{

    const response=await request(app)
      .post('/api/tickets')
      .send({});
    expect(response.status).not.toEqual(401);
});

it('invalid title',async ()=>{

});

it('invalid price',async ()=>{

});

it('valid',async ()=>{

})