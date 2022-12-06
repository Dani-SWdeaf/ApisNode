'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./api/config/routes');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swagger = require('./api/config/swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "mongodb+srv://Danientc:Deaf10sw-mx@cluster0.z2sxima.mongodb.net/invoices-build";

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(url);
var app = (0, _express2.default)();
var PORT = 3000;

app.use(_express2.default.json());
app.use(_express2.default.urlencoded());
app.use((0, _morgan2.default)('dev'));
app.use("/api-docs", _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default, {
    explorer: true
}));
app.use('/api', _routes.router);
app.use(function (req, res, next) {
    var error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, function () {
    console.log('Server is running at PORT ' + PORT);
});
//# sourceMappingURL=app.js.map