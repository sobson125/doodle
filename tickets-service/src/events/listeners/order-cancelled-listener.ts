import {Listener, NotFoundError, OrderCancelledEvent, OrderCreatedEvent, Subjects} from '@sobsontickets/common';
import {Message} from 'node-nats-streaming';
import {queueGroupName} from './queue-group-name';
import {Ticket} from '../../model/ticket';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {

    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);
        if (!ticket) {
            throw new NotFoundError();
        }
        ticket.set({orderId: undefined});

        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            //@ts-ignore
            orderId: ticket.orderId,
            version: ticket.version
        });
        msg.ack();
    }


}
