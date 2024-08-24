const { check } = require('express-validator');

const validateProduct = [
    check('name')
        .isString()
        .withMessage('Name must be a required and string')
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters long')
        .notEmpty()
        .withMessage('Name is required'),
    
    check('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a number greater than or equal to 0')
        .notEmpty()
        .withMessage('Price is required'),

    check('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),

    check('imageUrl')
        .optional()
        .isString()
        .withMessage('Image URL must be a string'),
];

module.exports = { validateProduct };
