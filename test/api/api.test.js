
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../server');
const conn = require('../../app/db');

describe('POST /api/auth/signup', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });


    it('ok, signup user ', (done) => {
        request(server.app).post('/api/auth/signup')
            .send({
                "username": "userTest",
                "email": "userTest@gmail.com",
                "password": "123",
                "roles": ["user"]
            })
            .then((res) => {
                const body = res.body;
                expect(res.statusCode).to.equal(200);
                done();
            })
            .catch((err) => done(err));
    });

    it('ok, signup admin ', (done) => {
        request(server.app).post('/api/auth/signup')
            .send({
                "username": "adminTest",
                "email": "adminTest@gmail.com",
                "password": "123",
                "roles": ["admin"]
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            })
            .catch((err) => done(err));
    });
})

describe('POST /api/auth/signin', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('ok, signin admin ', (done) => {
        request(server.app).post('/api/auth/signin')
            .send({
                "username": "adminTest",
                "password": "123"
            })
            .then((res) => {
                const body = res.body;
                expect(res.statusCode).to.equal(200);
                expect(body).to.contain.property('accessToken');
                done();
            })
            .catch((err) => done(err));
    });

    it('ok, signin user ', (done) => {
        request(server.app).post('/api/auth/signin')
            .send({
                "username": "userTest",
                "password": "123"
            })
            .then((res) => {
                const body = res.body;
                expect(res.statusCode).to.equal(200);
                expect(body).to.contain.property('accessToken');
                done();
            })
            .catch((err) => done(err));
    });
})

describe('POST /api/products/admin', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('ok, adding products card without admin token ', (done) => {
        request(server.app).post('/api/products/admin')
            .send({
                "name": "A",
                "description": "B",
                "price": 2455,
                "make": 12345
            })
            .then((res) => {
                expect(res.statusCode).to.equal(403);
                done();
            })
            .catch((err) => done(err));
    });

    it('ok, adding products with admin token ', (done) => {
        request(server.app).post('/api/auth/signin')
            .send({
                "username": "adminTest",
                "password": "123"
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.contain.property('accessToken');
                request(server.app).post('/api/products/admin')
                    .set('x-access-token', res.body.accessToken)
                    .send({
                        "name": "A",
                        "description": "B",
                        "price": 2455,
                        "make": 12345
                    })
                    .then((res) => {
                        expect(res.statusCode).to.equal(200);
                        done();
                    })
                    .catch((err) => done(err));
            }).catch(err => {
                done(err);
            });
    });


})

describe('POST /api/cart/user', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('ok, adding products in user card without user token ', (done) => {
        request(server.app).post('/api/cart/user')
            .send({
                "products": ["A"]
            })
            .then((res) => {
                expect(res.statusCode).to.equal(403);
                done();
            })
            .catch((err) => done(err));
    });

    it('ok, adding products in user card with user token ', (done) => {
        request(server.app).post('/api/auth/signin')
            .send({
                "username": "userTest",
                "password": "123"
            })
            .then((res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.body).to.contain.property('accessToken');
                request(server.app).post('/api/cart/user')
                    .set('x-access-token', res.body.accessToken)
                    .send({
                        "products": ["A"]
                    })
                    .then((res) => {
                        expect(res.statusCode).to.equal(200);
                        done();
                    })
                    .catch((err) => done(err));
            }).catch(err => {
                done(err);
            });
    });


})

describe('GET /api/cart/user', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('ok, get user card with user token ', (done) => {
        request(server.app).post('/api/auth/signin')
            .send({
                "username": "userTest",
                "password": "123"
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.contain.property('accessToken');
                request(server.app).get('/api/cart/user')
                    .set('x-access-token', res.body.accessToken)
                    .send({})
                    .then((res) => {
                        expect(res.statusCode).to.equal(200);
                        done();
                    })
                    .catch((err) => done(err));
            }).catch(err => {
                done(err);
            });
    });


})
