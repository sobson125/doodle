import express, {Request, Response} from 'express';
import {reqquireAuth} from '../middlewares/require-auth';
import {currentUser} from '../middlewares/current-user';

const router = express.Router();

router.post('/api/users/signout', currentUser, reqquireAuth, (req: Request, res: Response) => {
    req.session = null;
    res.send({});
});

export {router as signOutRouter};
