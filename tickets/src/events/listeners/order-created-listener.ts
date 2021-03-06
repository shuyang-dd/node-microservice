import { Listener,OrderCancelledEvent,OrderCreatedEvent, Subjects } from "@sgtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/tickets-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject:Subjects.OrderCreated=Subjects.OrderCreated;

    queueGroupName=queueGroupName;

    async onMessage(data:OrderCancelledEvent['data'],msg:Message){

        const ticket=await Ticket.findById(data.ticket.id);

        if(!ticket){
            throw new Error('not found');
        }

        ticket.set({orderId:data.id});

        await ticket.save();

        new TicketUpdatedPublisher(this.client).publish({
            id:ticket.id,
            price:ticket.price,
            title:ticket.title,
            userId:ticket.userId,
            orderId:ticket.orderId,
            version:ticket.version,
        });


        msg.ack();

    }


}