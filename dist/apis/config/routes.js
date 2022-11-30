"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _invoice = require("../controller/invoice.controller");

var _invoice2 = _interopRequireDefault(_invoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();

router.get('/invoices', _invoice2.default.findAll);
router.get('/invoices/:id', _invoice2.default.findOne);
router.delete('/invoices/:id', _invoice2.default.delete);
router.put('/invoices/:id', _invoice2.default.update);
router.post('/invoices', _invoice2.default.create);
//# sourceMappingURL=routes.js.map