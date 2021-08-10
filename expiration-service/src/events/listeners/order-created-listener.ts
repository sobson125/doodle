import {Listener, OrderCreatedEvent, Subjects} from '@sobsontickets/common';
import { queueGroupName } from './queueGroupName';
import {Message} from 'node-nats-streaming';
import {expirationQueue} from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    queueGroupName = queueGroupName
    readonly subject = Subjects.OrderCreated
    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
        await expirationQueue.add({
            orderId: data.id
        },{
            delay: delay
        })
        msg.ack()
    }

}
