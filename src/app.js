import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import swaggerUi  from 'swagger-ui-express';
import cors from 'cors';

import { router } from './api/config/routes';
import swaggerDocument from './api/config/swagger.json';

const url = "mongodb+srv://Danientc:Deaf10sw-mx@cluster0.z2sxima.mongodb.net/invoices-build"

mongoose.Promise = global.Promise;
mongoose.connect(url);
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(logger('dev')); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));
app.use('/api', router);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
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