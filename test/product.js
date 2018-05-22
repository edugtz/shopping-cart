var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;
var Product = require('../models').product;

chai.use(chaiHttp);

describe('GET /products', () => {
    it('It should GET all existing products', (done) =>{
        chai.request(app)
        .get('/products')
        .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            done();
        })
    });
});

describe('POST /products', () => {
    it('It should POST a product', (done) =>{
        let product = {
            code: 'JACKET',
            name: 'Jacket',
            description: 'A beautiful leather Jacket for men',
            price: 15.00
        }
        chai.request(app)
        .post('/products')
        .send(product)
        .end(function(err, res){
            // console.log(res);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.product).to.have.property('code');
            expect(res.body.product).to.have.property('name');
            expect(res.body.product).to.have.property('description');
            expect(res.body.product).to.have.property('price');
            expect(res.body).to.have.property('message').eql('The product was successfully created');
            done();
        })
    });
});

describe('GET /products/:idProduct', () => {
    it('It should GET a product by the given idProduct', (done) =>{
        Product.findAll({limit:1}).then(product => {
            var idProduct = product[0].idProduct

            chai.request(app)
            .get('/products/'+idProduct)
            .end(function(err, res){
                // console.log(res);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(res.body.product).to.have.property('code');
                expect(res.body.product).to.have.property('name');
                expect(res.body.product).to.have.property('description');
                expect(res.body.product).to.have.property('price');
                done();
            })
        });
    });
});