import request from 'supertest';
import {app} from '../../app';


it('should return 201 status on succesful signup', () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(201);
});

it('should return 400 with invalid email', function () {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'test'
        })
        .expect(400);
});

it('should return 400 with invalid password', function () {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'te'
        })
        .expect(400);
});

it('should forbid duplicate emails', async function () {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(400);
});

it('should set a cookie after successful signup', async function () {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
