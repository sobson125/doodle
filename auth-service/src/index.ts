import express, {json} from 'express';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi there');
});

app.listen(3000, () => {
    console.log('port test again test');
});