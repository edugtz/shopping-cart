'use strict'

/**
*  This is a helper function to add, remove and retrieve products from the shopping cart
* @param {object} oldCart Object containing all previous product data saved in the shopping cart
 */
module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
  
    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}
        }   
        storedItem.qty ++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
    };

    this.remove = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };
  
    this.getItems = function(){
        var arr = [];
        for (var id in this.items) {
            if (this.items.hasOwnProperty(id)) {
            arr.push(this.items[id]);
            }
        }
        return arr;
    };
};