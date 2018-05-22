var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;
// var agent = chai.request.agent(app);
var Cart = require('../helpers/cart');
var Product = require('../models').product;

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

describe('GET /add-to-cart/:idProduct', () => {
    it('It should add one product to the shopping cart with an specified idProduct', (done) =>{
       
        Product.findAll({limit:1}).then(product => {
            var idProduct = product[0].idProduct

            chai.request(app)
            .get('/cart/add-to-cart/'+idProduct)
            .set('Cookie', Cookies)
            .end(function(err, res){
                // console.log(res);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Product added to the cart');
                done();
            })
        });
    });
});

describe('GET /checkout', () => {
    it('It should return the shopping cart summary', (done) =>{
        // Product.findAll({limit:1}).then(product => {
        //     var idProduct = product[0].idProduct
            chai.request(app)
            .get('/cart/checkout')
            .set('Cookie', Cookies)
            .end(function(err, res){                
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(res.body).to.have.property('products');
                expect(res.body).to.have.property('totalPrice');
                expect(res.body).to.have.property('totalQuantity');
                done();
            })
        // });  
    });
});

describe('GET /empty-cart', () => {
    it('It should display that the shopping cart is empty', (done) =>{
            
        chai.request(app)
        .get('/cart/empty-cart')
        .set('Cookie', Cookies)
        .end(function(err, res){                
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            expect(res.body).to.have.property('message').eql('The cart is now empty');
            done();
            
        })
    });
});