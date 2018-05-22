var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

// Default user credentials to log in
var userCredentials = {
    username: 'Eduardo',
    password: 'csplayer16'
}

// Variable to store cookies
var Cookies;

before(function(done){
    chai.request(app)
    .post('/signin')
    .send(userCredentials)
    .end(function(err, res){
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message').eql('You have successfully logged in');
        done();
    });
});

describe('GET /profile', () => {
    it('It should print a welcome message to authenticated user', (done) =>{
        chai.request(app)
        .get('/profile')
        .set('Cookie', Cookies)
        .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            expect(res.body).to.have.property('message').include('Welcome to your profile');
            done();
        });
        
    });
});

describe('POST /signin', () => {
    it('It should display that the user successfully logged in', (done) =>{
        chai.request(app)
        .post('/signin')
        .send(userCredentials)
        .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            expect(res.body).to.have.property('message').eql('You have successfully logged in');
            done();
        });
    });
});

describe('POST /signup', () => {
    let newUser = {
        username: 'Jorge',
        password: '123',
        name: 'Jorge',
        lastName: 'Berumen'
    }
    it('It should display that a new account has been created or that it already exists', (done) =>{
        chai.request(app)
        .post('/signup')
        .send(newUser)
        .set('Cookie', Cookies)
        .end(function(err, res){
            
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            done();
        });
    });
});

describe('POST /logout', () => {
    it('It should display that the user successfully logged out of his session', (done) =>{
        chai.request(app)
        .get('/logout')
        .set('Cookie', Cookies)
        .end(function(err, res){
            
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            expect(res.body).to.have.property('message').eql('You have successfully logged out');
            done();
        });
    });
});