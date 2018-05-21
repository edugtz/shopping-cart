'use strict'

var Product = require('../models').product;

module.exports.list = function(req, res, next){
    Product.findAll().then(function(products) {
        if(products){
            return res.status(200).send({products:products});
        } else{
            return res.send({message: "We currently have no products in stock"});
        }
    })
}

module.exports.product = function(req, res, next){
    Product.findOne({where: {idProduct:req.params.idProduct}}).then(function(product) {
        if(product){
            return res.status(200).send({product:product});
        } else{
            return res.send({message: "We currently don't have the specified product"});
        }
    })
}
