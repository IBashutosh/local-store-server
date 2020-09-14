const expect = require('chai').expect;
const server = require('../server');
const request = require('supertest');
describe('Server', () => {
    it('Should exists', () => {
        expect(server.app).to.be.a('function');
    });

    it('GET / should return 200 and message', (done) => {
        request(server.app).get('/')
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch(err => {
                done(err);
            });
    });
})