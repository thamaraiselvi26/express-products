const Product = require('../models/product');
const { validationResult } = require('express-validator');

const list = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const product = await Product.find().skip((page - 1) * limit).limit(limit);
    const totalProduct = await Product.countDocuments();
    if(product){
        res.json({status: true, message: `${product.length} Record(s) Found`, result: [{record: product, total: totalProduct}]}) 
    }else{
        res.json({status: true, message: 'No Record Found', result: []})
    }
}

const show = async (req, res) => {
    let result = await Product.findByIdAndUpdate(req.params.id);

    if(result){
        res.json({status: true, message: '1 Record Found', result: result}) 
    }else{
        res.json({status: true, message: 'No Record Found', result: []})
    }
}

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const imageUrl = req.file ? req.file.path : '';

    let data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: imageUrl // Store the file path in the database
    };

    try {
        let result = await Product.create(data);
        if (result) {
            return res.json({
                status: true,
                message: 'Product created successfully',
                result: []
            });
        } else {
            return res.json({
                status: false,
                message: 'Failed to create product',
                result: []
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const imageUrl = req.file ? req.file.path : '';

    let request = req.body;
    let data = {
        'name': request.name,
        'price': request.price,
        'description': request.description,
        'imageUrl': imageUrl
    }

    let result = await Product.findByIdAndUpdate(req.params.id, data);
    result ? 
    res.json({status: true, message: 'Product updated successfully', result: []}) : 
    res.json({status: false, message: 'Failed to update product', result: []});
}

const destroy = async (req, res) => {
    let result = await Product.findByIdAndDelete(req.params.id);
    result ? 
    res.json({status: true, message: 'Product deleted successfully', result: []}) : 
    res.json({status: false, message: 'Failed to delete product', result: []});
}

module.exports = {
    list,
    show,
    create,
    update,
    destroy
}