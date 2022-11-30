'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _invoice = require('../models/invoice.model');

var _invoice2 = _interopRequireDefault(_invoice);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        _invoice2.default.find().then(function (invoices) {
            return res.json(invoices);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    create: function create(req, res, next) {

        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().required(),
            date: _joi2.default.date().required(),
            due: _joi2.default.date().required(),
            qty: _joi2.default.number().integer().optional(),
            tax: _joi2.default.number().optional(),
            rate: _joi2.default.number().optional()
        });

        var _Joi$Validate = _joi2.default.Validate(req.body, schema),
            error = _Joi$Validate.error,
            value = _Joi$Validate.value;

        if (error && error.details) {
            return res.status(_httpStatusCodes2.default.BAD_REQUEST).json(error);
        }
        _invoice2.default.create(value).then(function (invoice) {
            return res.json(invoice);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    findOne: function findOne(res, req) {
        var id = req.params.id;

        _invoice2.default.findByIdAndRemove(id).then(function (invoice) {
            if (!invoice) {
                return res.status(_httpStatusCodes2.default.NOT_FOUND).json({ err: 'Cloud not find any invoice' });
            }
            return res.json(invoice);
        });
    },
    delete: function _delete(res, req) {
        var id = req.params.id;

        _invoice2.default.findById(id).then(function (invoice) {
            if (!invoice) {
                return res.status(_httpStatusCodes2.default.NOT_FOUND).json({ err: 'Cloud not delete any invoice' });
            }
            return res.json(invoice);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    update: function update(res, req) {
        var _Joi$object$keys = _joi2.default.object().keys({
            item: _joi2.default.string().optional(),
            date: _joi2.default.date().optional(),
            due: _joi2.default.date().optional(),
            qty: _joi2.default.number().optional().required(),
            tax: _joi2.default.number().optional(),
            rate: _joi2.default.number().optional()
        }),
            id = _Joi$object$keys.id;

        var _Joi$Validate2 = _joi2.default.Validate(req.body, schema),
            error = _Joi$Validate2.error,
            value = _Joi$Validate2.value;

        if (error && error.details) {
            return res.status(_httpStatusCodes2.default.BAD_REQUEST).json(error);
        }
        _invoice2.default.findOneAndUpdate({ _id: id }, value, { new: true }).then(function (invoice) {
            return res.json(invoice);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    }
};
//# sourceMappingURL=invoice.controller.js.map