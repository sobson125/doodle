import express, {Request, Response} from 'express';
import {BadRequestError, NotFoundError, OrderStatus, reqquireAuth, validateRequest} from '@sobsontickets/common';
import {body} from 'express-validator';
import {Ticket} from '../model/ticket';
import {Order} from '../model/order';

const router = express.Router();
const EXPIRATION_TIME = 15 * 60;

router.post('/api/orders', reqquireAuth, [
        body('ticketId')
            .not()
            .isEmpty()
            .withMessage('TicketId must be provided')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const {ticketId} = req.body;
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError();
        }
        const isReserved = await ticket.isReserved();
        if (isReserved) {
            throw new BadRequestError('Order already exists');
        }
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_TIME);

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket: ticket
        });
        await order.save();

        res.status(201).send({});
    });


export {router as createOrderRouter};
