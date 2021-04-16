import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    if (!req.session || !req.session.jwt) {
        return res.send({currentUser: null});
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({currentUser: payload});
    } catch (err) {
        res.send({currentUser: null});
    }
    // res.send('Hi there 123');
});

export {router as currentUserRouter};
