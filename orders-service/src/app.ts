import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {currentUser, errorHandler, NotFoundError} from '@sobsontickets/common';
import {deleteOrderRouter} from './routes/cancel-order';
import {createOrderRouter} from './routes/create-order';
import {getSingleOrderRouter} from './routes/get-single-order';
import {getAllOrdersRouter} from './routes/get-all-orders';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);
app.use(getAllOrdersRouter);
app.use(createOrderRouter);
app.use(deleteOrderRouter);
app.use(getSingleOrderRouter);
app.get('*', async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};
