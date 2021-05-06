import express, {Request, Response} from 'express';
import {NotAuthorizedError, NotFoundError, OrderStatus, reqquireAuth} from '@sobsontickets/common';
import {Order} from '../model/order';

const router = express.Router();


router.delete('/api/orders/:orderId', reqquireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError('not authorized');
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    res.status(204).send(order);
});


export {router as deleteOrderRouter};
