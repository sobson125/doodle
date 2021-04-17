import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT KEY must be defined');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('connecting to mongodb');
    } catch (error) {
        console.log(error);
    }
    app.listen(3000, () => {
        console.log('port test again test');
        console.log('another!!');
    });
};
start();
