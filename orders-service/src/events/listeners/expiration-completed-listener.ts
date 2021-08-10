import {ExpirationCompletedEvent, Listener, Subjects} from '@sobsontickets/common';
import {Message} from 'node-nats-streaming';
import {queueGroupName} from './queue-group-name';
import {Order, OrderStatus} from '../../model/order';
import {OrderCancelledPublisher} from '../publishers/order-cancelled-publisher';
import {natsWrapper} from '../../nats-wrapper';

export class ExpirationCompletedListener extends Listener<ExpirationCompletedEvent> {
    queueGroupName = queueGroupName;

    readonly subject = Subjects.ExpirationCompleted;

    async onMessage(data: ExpirationCompletedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId).populate('ticket');

        if (!order) {
            throw new Error('Order not found');
        }
        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }
        order.set({
            status: OrderStatus.Cancelled
        });
        await order.save();
        await new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });
        msg.ack();
    }
}
