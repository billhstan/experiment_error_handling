const express = require("express");
const cors = require('cors')
const routes = require('./src/routes/routes')
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./src/middlewares/errorhandler');
const morgan = require('./src/middlewares/morgan');

app.use(cors({
    origin: ['http://localhost:3089'],
    optionsSuccessStatus: 200,
    credentials: true,
}));


//Server settings
const path = require("path");

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.use(router);
const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));
app.use(morgan);
routes(app, router)
app.use(errorHandler);

module.exports = app;