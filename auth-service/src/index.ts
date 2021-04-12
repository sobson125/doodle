import express, {json} from 'express';
import {currentUserRouter} from './routes/current-user';

const app = express();
app.use(json());

app.use(currentUserRouter);

app.listen(3000, () => {
    console.log('port test again test');
    console.log('another');
});