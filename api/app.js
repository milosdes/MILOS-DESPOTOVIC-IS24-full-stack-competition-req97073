const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const productController = require('./productController');
const path = require('path');
const fs = require('fs');

//Configure cors options
const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};

//JSON parsing middleware
const jsonParser = bodyParser.json();

app.use(cors(corsOptions));
app.use(jsonParser);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//Checks health of in-memory data object
app.get('/api/health', productController.healthCheck);

//For user story 1, returns list of all products
app.get('/api/products', productController.getAllProducts);

//For user story 2, creates a new product
app.post('/api/products', productController.createProduct);

//For user story 3, accepts a PUT request with data to update existing product
//We use PUT rather than PATCH because the entire resource is being replaced with the data sent from the client, even if the data values don't change
app.put('/api/products/:id', productController.updateProduct);

//DELETE endpoint that was mentioned under 'API Component'
app.delete('/api/products/:id', productController.deleteProduct);

//Saves updated data to data.json on exit
process.on('exit', productController.saveDataOnExit);
process.on('SIGINT', () => {
    process.exit();
});

app.listen(PORT, () =>
    console.log(
        `App running on port ${PORT}\nPlease visit http://localhost:${PORT}`
    )
);
