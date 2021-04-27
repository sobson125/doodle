import express, {Request, Response} from 'express';
import {currentUser} from '@sobsontickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null});
    // res.send('Hi there 123');
});

export {router as currentUserRouter};
