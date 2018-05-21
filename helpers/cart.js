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

    this.removeItem = function(id){
        this.totalQty -= this.items[id].qty;
        delete this.items[id]
    }
  
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