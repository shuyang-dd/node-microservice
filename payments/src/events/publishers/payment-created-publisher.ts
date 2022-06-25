import { Publisher,Subjects,PaymentCreatedEvent } from "@sgtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject:Subjects.PaymentCreated=Subjects.PaymentCreated;

}