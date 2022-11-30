import express from 'express';
import mongoose from 'mongoose';
import { router } from './apis/config/routes';
import logger from 'morgan';
import SwaggerOptions  from 'swagger-ui-express';
import swaggerDocument from './apis/config/swagger.json';

const url = "mongodb+srv://Danientc:Deaf10sw-mx@cluster0.z2sxima.mongodb.net/invoices-build"

mongoose.Promise = global.Promise;
mongoose.connect(url);
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use("/api-docs", SwaggerOptions.serve, SwaggerOptions.setup(swaggerDocument, {
    explorer: true
}))
app.use('/apis', router);
app.use(logger('dev'));
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = "Invalid route";
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});