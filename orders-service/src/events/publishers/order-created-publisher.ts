import {Publisher, Subjects, OrderCreatedEvent} from '@sobsontickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;

}
