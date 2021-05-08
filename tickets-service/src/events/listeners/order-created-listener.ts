import {Listener, NotFoundError, OrderCreatedEvent, Subjects,TicketUpdatedEvent} from '@sobsontickets/common';
import {Message} from 'node-nats-streaming';
import {queueGroupName} from './queue-group-name';
import {Ticket} from '../../model/ticket';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {

    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);
        if (!ticket) {
            throw new NotFoundError();
        }
        ticket.set({orderId: data.id});

        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version,
            userId: ticket.userId,
            //@ts-ignore
            orderId: ticket.orderId,
        });
        msg.ack();
    }
}
