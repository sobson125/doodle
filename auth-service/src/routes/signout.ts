import express, {Request, Response} from 'express';
import {currentUser} from '@sobsontickets/common';

const router = express.Router();

router.post('/api/users/signout', currentUser, (req: Request, res: Response) => {
    req.session = null;
    res.send({});
});

export {router as signOutRouter};
