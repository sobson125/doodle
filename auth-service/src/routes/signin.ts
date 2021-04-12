import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.send('Hi there 123');
});

export {router as signInRouter};