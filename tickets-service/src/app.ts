import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {currentUser, errorHandler, NotFoundError} from '@sobsontickets/common';
import {createTicketRouter} from './routes/create-ticket';
import {getSingleTicket} from './routes/get-single-ticket';
import {getAllTickets} from './routes/get-all-tickets';
import {updateTicketRouter} from './routes/update-ticket';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);
app.use(getSingleTicket);
app.use(createTicketRouter);
app.use(updateTicketRouter)
app.use(getAllTickets);
app.get('*', async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};
