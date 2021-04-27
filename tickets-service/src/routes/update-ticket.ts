import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {Ticket} from '../model/ticket';
import {NotFoundError, reqquireAuth, validateRequest} from '@sobsontickets/common';

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
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            throw new NotFoundError();
        }
        if (ticket.userId !== req.currentUser!.id) {
            throw new NotFoundError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price
        });
        await ticket.save();
        res.send(ticket);
    });

export {router as updateTicketRouter};
