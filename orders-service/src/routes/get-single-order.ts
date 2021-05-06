import express, {Request, Response} from 'express';
import {NotAuthorizedError, NotFoundError, reqquireAuth} from '@sobsontickets/common';
import {Order} from '../model/order';

const router = express.Router();


router.get('/api/orders/:orderId', reqquireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError('Not authorized');
    }
    res.send(order);
});


export {router as getSingleOrderRouter};
