import express, {Request, Response} from 'express';
import {currentUser} from '../middlewares/current-user';
import {reqquireAuth} from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, reqquireAuth, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null});
    // res.send('Hi there 123');
});

export {router as currentUserRouter};
