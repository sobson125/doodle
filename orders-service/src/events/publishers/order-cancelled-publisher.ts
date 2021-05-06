import {OrderCancelledEvent, Publisher, Subjects} from '@sobsontickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;

}
