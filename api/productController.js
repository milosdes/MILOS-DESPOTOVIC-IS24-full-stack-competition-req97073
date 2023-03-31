const mockData = require('../data.json');
const fs = require('fs');

const createProduct = async (req, res) => {
    // Note: Normally the ID/primary key auto-incrementation would be handled on a
    // database level or with an ORM
    // Create a productId by adding 1 to length since productIds start at 1
    let newProductId = mockData.length + 1;

    // Check the in memory object to make sure the new productId doesn't collide with
    // an existing productId. This should not happen, but this check is done for
    // good measure, and additionally incremented if
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

    //Create a new object combining generated productId with the post body
    //We could just use the spread operator and write ...req.body since we are doing validations on the frontend
    //But this adds an extra layer of protection if someone tries to create a new product by sending a POST request to our /products endpoint with a different client or a tool like Postman

    //The startDate format is not validated here, the validation is performed on the frontend. For more robustness, we would want to perform validation here as well
    const newProductObject = {
        // ...req.body would be a simpler but less safe way to do this
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
    res.status(200).json(mockData);
};

const updateProduct = async (req, res) => {
    //The search would traditionally be done with an ORM or SQL query on a database level. This function simulates a search by looping through the mockData object until it finds the productId, and then updates it with the updatedValesOb provided
    const searchAndUpdateMockDb = (id, updatedValuesObj) => {
        for (let i = 0; i < mockData.length; i++) {
            if (mockData[i].productId === id) {
                mockData[i] = { ...mockData[i], ...updatedValuesObj };
                return mockData[i];
            }
        }
    };

    //Ensure that relevant id is present
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

    res.status(200).json({
        message: `Product with ID of ${id} has been successfully updated!`,
        updateResult,
    });
};

const deleteProduct = async (req, res) => {
    const searchAndDeleteMockDb = (id) => {
        for (let i = 0; i < mockData.length; i++) {
            if (mockData[i].productId === id) {
                const deletedItem = mockData.splice(i, 1);
                return deletedItem;
            }
        }
    };

    //Ensure that relevant id is present
    if (!req.params.id)
        res.status(404).send({
            message:
                'For some reason there was no product ID associated with this delete request. Please try again.',
        });

    const id = parseInt(req.params.id);
    const deleteResult = searchAndDeleteMockDb(id);
    res.status(200).json({
        message: `Product with ID of ${id} has been successfully deleted.`,
        deleteResult,
    });
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
