const mockData = require('../data.json');
const fs = require('fs');

const createProduct = async (req, res) => {
    res.status(201).json({
        message: 'Product successfully added!',
    });
};

const getAllProducts = async (req, res) => {
    res.status(200).json(mockData);
};

const updateProduct = async (req, res) => {
    res.status(200).json({
        message: `Product has been successfully updated!`,
    });
};

const deleteProduct = async (req, res) => {
    res.status(200).json({
        message: `Product has been successfully deleted.`,
    });
};

const healthCheck = async (req, res) => {
    res.status(200).send({ status: 'Healthy' });
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    healthCheck,
};
