import request from 'supertest';
import {app} from '../../app';

it('should fail when put invalid email', function () {
    request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('should fail when given wrong password', async function () {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'testa'
        })
        .expect(400);

});
