const upload = require('../helpers/uploads');
let productController = require('../controllers/productController')
const { validateProduct } = require('../validators/productValidator');

const api = (app) => {
    app.get('/product', productController.list)
    app.get('/product/:id', productController.show)
    app.post('/product', upload.single('imageUrl'), validateProduct,  productController.create)
    app.put('/product/:id',upload.single('imageUrl'), validateProduct, productController.update)
    app.delete('/product/:id', productController.destroy)
}

module.exports = api;