import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {Ticket} from '../model/ticket';
import {BadRequestError, NotFoundError, reqquireAuth, validateRequest} from '@sobsontickets/common';
import {natsWrapper} from '../nats-wrapper';
import {TicketUpdatedPublisher} from '../events/publishers/ticket-updated-publisher';

const router = express.Router();

router.put('/api/tickets/:id', reqquireAuth, [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title required'),
        body('price')
            .isFloat({gt: 0})
            .withMessage('Price must be provided and must be greater than 0')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new NotFoundError();
        }
        if (ticket.orderId){
            throw new BadRequestError('something went wrong')
        }
        if (ticket.userId !== req.currentUser!.id) {
            throw new NotFoundError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price
        });
        await ticket.save();
        await new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version
        });
        res.send(ticket);
    });

export {router as updateTicketRouter};
