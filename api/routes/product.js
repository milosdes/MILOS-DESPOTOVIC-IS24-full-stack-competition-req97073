const express = require('express');
const router = express.Router();
const productController = require('../productController');

//For user story 1, returns list of all products
router.get('/', productController.getAllProducts);

//For user story 2, creates a new product
router.post('/', productController.createProduct);

//For user story 3, accepts a PUT request with data to update existing product
//We use PUT rather than PATCH because the entire resource is being replaced with the data sent from the client, even if the data values don't change
router.put('/:id', productController.updateProduct);

//DELETE endpoint that was mentioned under 'API Component'
router.delete('/:id', productController.deleteProduct);
module.exports = router;
