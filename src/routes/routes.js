//routes.js
const productController = require('../controllers/product.controller');
const brandController = require('../controllers/brand.controller');

module.exports = (app, router) => {
    router.post('/api/products', productController.processCreateProduct);
    router.post('/api/brands/', brandController.processCreateBrand);
    router.delete('/api/brands/:brandId', brandController.processDeleteBrand);
}