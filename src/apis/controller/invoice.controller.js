import Invoice from '../models/invoice.model';
import Joi from 'joi';
import HttpStatus from 'http-status-codes';

export default {
    findAll(req, res, next) {
        Invoice.find()
        .then(invoices => res.json(invoices))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    create(req, res, next) {

        const schema = Joi.object().keys({
            item : Joi.string().required(),
            date : Joi.date().required(),
            due: Joi.date().required(),
            qty : Joi.number().integer().optional(),
            tax : Joi.number().optional(),
            rate : Joi.number().optional()
        });
        const { error, value } = Joi.Validate(req.body, schema);
        if(error && error.details)
        {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Invoice.create(value).then(invoice => res.json(invoice))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    findOne(res, req) {
        const { id } = req.params;
        Invoice.findByIdAndRemove(id).then(invoice => {
            if (!invoice) {
                return res.status(HttpStatus.NOT_FOUND).json({ err : 'Cloud not find any invoice' });
            }
            return res.json(invoice);
        });
    },
    delete(res, req) {
        const { id } = req.params;
        Invoice.findById(id).then(invoice => {
            if (!invoice) {
                return res.status(HttpStatus.NOT_FOUND).json({ err : 'Cloud not delete any invoice' });
            }
            return res.json(invoice);
        }).catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    update(res, req) {
        const { id } = Joi.object().keys({
            item : Joi.string().optional(),
            date : Joi.date().optional(),
            due: Joi.date().optional(),
            qty : Joi.number().integer().optional(),
            tax : Joi.number().optional(),
            rate : Joi.number().optional()
        });
        const { error, value } = Joi.Validate(req.body, id);
        if(error && error.details)
        {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Invoice.findOneAndUpdate({_id: id}, value, {new: true}).then(invoice => res.json(invoice))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    }
};