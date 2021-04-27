import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {BadRequestError, validateRequest} from '@sobsontickets/common';
import {User} from '../models/user';
import {PasswordManager} from '../services/password-manager';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const isLoggedIn = await PasswordManager.compare(existingUser.password, password);
        if (!isLoggedIn) {
            throw new BadRequestError('Invalid credentials');
        }

        const userJWT = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);
        req.session = {
            jwt: userJWT
        };
        res.status(200).send(existingUser);
    });

export {router as signInRouter};
