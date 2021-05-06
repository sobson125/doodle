import express, {Request, Response} from 'express';
import {NotAuthorizedError, NotFoundError, OrderStatus, reqquireAuth} from '@sobsontickets/common';
import {Order} from '../model/order';
import {OrderCancelledPublisher} from '../events/publishers/order-cancelled-publisher';
import {natsWrapper} from '../nats-wrapper';

const router = express.Router();


router.delete('/api/orders/:orderId', reqquireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError('not authorized');
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    await new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
            id: order.ticket.id
        }
    });
    res.status(204).send(order);
});


export {router as deleteOrderRouter};