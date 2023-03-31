const mockData = require('../data.json');
const fs = require('fs');

const createProduct = async (req, res) => {
    // Note: Normally the ID/primary key auto-incrementation would be handled on a database level or with an ORM
    // Create a productId by adding 1 to length since productIds start at 1
    let newProductId = mockData.length + 1;

    // Check the in memory object to make sure the new productId doesn't collide with an existing productId. This should not happen, but this check is done for good measure.
    const checkForIdCollisions = (id) => {
        for (i = 0; i < mockData.length; i++) {
            if (mockData[i].productId === id) {
                return -1;
            }
        }
    };

    // If there happen to somehow be collissions, continue to increment the newProductId
    // until it does not collide
    while (checkForIdCollisions(newProductId) === -1) {
        newProductId++;
    }

    //Ensure all required fields are present
    const validateRequiredDataIsPresent = () => {
        if (
            !req.body.productName |
            !req.body.productOwnerName |
            !req.body.Developers |
            !req.body.scrumMasterName |
            !req.body.startDate |
            !req.body.methodology
        ) {
            res.send(400).json({
                message: 'All input fields are required to add a new product.',
            });
        }
    };

    validateRequiredDataIsPresent();

    //Create a new object combining generated productId with the post body data
    //The startDate format is not validated here, the validation is performed on the frontend. For more robustness, we would want to perform validation here as well
    const newProductObject = {
        productId: newProductId,
        productName: req.body.productName,
        productOwnerName: req.body.productOwnerName,
        Developers: req.body.Developers,
        scrumMasterName: req.body.scrumMasterName,

        startDate: req.body.startDate,
        methodology: req.body.methodology,
    };

    //Simulates writing to database by pushing to array in memory
    mockData.push(newProductObject);

    res.status(201).json({
        message: 'Product successfully added!',
        newProductObject,
    });
};

const getAllProducts = async (req, res) => {
    if (!mockData) {
        res.status(500).json({
            status: 'There is an error with the server data',
        });
    }

    res.status(200).json(mockData);
};

const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (!mockData) {
        res.status(500).json({
            status: 'There is an error with the server data',
        });
    }

    const searchMockDb = (id) => {
        for (let i = 0; i < mockData.length; i++) {
            if (mockData[i].productId === id) {
                return mockData[i];
            }
        }
        return false;
    };

    const product = searchMockDb(id);

    res.status(200).json(product);
};

const updateProduct = async (req, res) => {
    //The search would traditionally be done with an ORM or SQL query on a database level. This function simulates a search by looping through the mockData object until it finds the productId, and then updates it with the updatedValuesObj provided. If the productId is not found, it returns false
    const searchAndUpdateMockDb = (id, updatedValuesObj) => {
        for (let i = 0; i < mockData.length; i++) {
            if (mockData[i].productId === id) {
                mockData[i] = { ...mockData[i], ...updatedValuesObj };
                return mockData[i];
            }
        }
        return false;
    };

    //Ensure that relevant productId is present as a parameter in the url path
    if (!req.params.id)
        res.status(404).json({
            message:
                'There was no product ID associated with this update request. Please try again and include a product ID.',
        });

    //Ensure that relevant data is present
    const validateRequiredDataIsPresent = () => {
        if (
            !req.body.productName |
            !req.body.productOwnerName |
            !req.body.Developers |
            !req.body.scrumMasterName |
            !req.body.startDate |
            !req.body.methodology
        ) {
            res.send(400).json({
                message: 'All input fields are required to update a product.',
            });
        }
    };

    validateRequiredDataIsPresent();

    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
        res.status(400).json({
            message: 'Product ID must be a number. Please try again.',
        });
    }

    //Again, avoiding use of spread operator (...req.body) to ensure that only relevant data is received
    const updatedValues = {
        productName: req.body.productName,
        productOwnerName: req.body.productOwnerName,
        Developers: req.body.Developers,
        scrumMasterName: req.body.scrumMasterName,
        startDate: req.body.startDate,
        methodology: req.body.methodology,
    };

    const updateResult = searchAndUpdateMockDb(id, updatedValues);

    if (!updateResult) {
        res.status(400).json({
            message: `Product with ID of ${id} does not exist.`,
        });
    } else {
        res.status(200).json({
            message: `Product with ID of ${id} has been successfully updated!`,
            updateResult,
        });
    }
};

const deleteProduct = async (req, res) => {
    //Returns false if the id is not found, otherwise returns the deleted item
    const searchAndDeleteMockDb = (id) => {
        for (let i = 0; i < mockData.length; i++) {
            if (mockData[i].productId === id) {
                const deletedItem = mockData.splice(i, 1);
                return deletedItem;
            }
        }
        return false;
    };

    //Ensure that relevant id is present
    if (!req.params.id)
        res.status(400).send({
            message:
                'For some reason there was no product ID associated with this delete request. Please try again.',
        });

    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
        res.status(400).json({
            message: 'Product ID must be a number. Please try again.',
        });
    }

    const deleteResult = searchAndDeleteMockDb(id);

    if (!deleteResult) {
        res.status(404).json({
            message: `Product with ID of ${id} does not exist.`,
        });
    } else {
        res.status(200).json({
            message: `Product with ID of ${id} has been successfully deleted.`,
            deleteResult,
        });
    }
};

const saveDataOnExit = async () => {
    const dataToSave = JSON.stringify(mockData);
    console.log('Saving file..');
    fs.writeFileSync('data.json', dataToSave, (err) => {
        console.log('Error saving file: ', err.message);
    });
    console.log('Data saved to data.json file in root folder.');
};

const healthCheck = async (req, res) => {
    if (!Array.isArray(mockData) || !mockData) {
        res.status(500).send({
            status: 'There is an issue with the data in memory.',
        });
    }
    res.status(200).send({ status: 'Healthy' });
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    saveDataOnExit,
    healthCheck,
};
