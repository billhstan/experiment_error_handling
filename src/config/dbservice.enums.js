// DbOption enums can be grouped as static members of a class
//Reference: https://masteringjs.io/tutorials/fundamentals/enum
//https://www.sohamkamani.com/javascript/enums/
class DbOption {
    // Create new instances of the same class as static attributes
    static FIND_ONE_PRODUCT_SEARCHBY_PRODUCT_ID = new DbOption('get one product searched by product id');
    static FIND_ONE_PRODUCT_SEARCHBY_MULTIPLE_PARAMS = new DbOption('search one product searched by multiple parameters');
    static UPDATE_ONE_PRODUCT_SEARCHBY_ID = new DbOption('update one product searched by product id');
    static CREATE_ONE_PRODUCT =  new DbOption('create one product');
    constructor(name) {
      this.name = name
    }
  }
//https://stackabuse.com/how-to-use-module-exports-in-node-js/
//I was stuck on how to module.exports JavaScript class. 
  module.exports = {
    DbOption:DbOption
  }