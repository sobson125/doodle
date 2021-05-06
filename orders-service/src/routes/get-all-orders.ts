import express, {Request, Response} from 'express';
import {Order} from '../model/order';
import {reqquireAuth} from '@sobsontickets/common';

const router = express.Router();


router.get('/api/orders', reqquireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({
        userId: req.currentUser!.id
    }).populate('ticket');

    res.send(orders);
});


export {router as getAllOrdersRouter};
