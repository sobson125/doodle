import express, {Request, Response} from 'express';
import {Ticket} from '../model/ticket';
import {NotFoundError} from '@sobsontickets/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new NotFoundError();
    }
    res.status(200).send({ticket});
});

export {router as getSingleTicket};
