const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const productController = require('./productController');
const path = require('path');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerJsonOptions = require('./swagger.json');

//Configure cors options if using development server for frontend
const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//JSON parsing middleware
const jsonParser = bodyParser.json();
app.use(jsonParser);

//Serve the swagger docs
app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsonOptions));

//Serve the build of the client app as a static resource
app.use(express.static(path.resolve(__dirname, '../client/build')));

//Use product endpoint routes
app.use('/api/products', require('./routes/product.js'));

//Check health of in-memory data object
app.get('/api/health', productController.healthCheck);

//Serve the index page for the client app
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//Save updated data to data.json on exit
process.on('exit', productController.saveDataOnExit);
process.on('SIGINT', () => {
    process.exit();
});

//Run server
app.listen(PORT, () =>
    console.log(
        `App running on port ${PORT}\nPlease visit http://localhost:${PORT}`
    )
);
