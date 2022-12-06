import express from "express";
import invoiceController from "../controller/invoice.controller";
export const router = express.Router();

router.get('/invoices/:id', invoiceController.findOne);
router.get('/invoices', invoiceController.findAll);
router.delete('/invoices/:id', invoiceController.delete);
router.put('/invoices/:id', invoiceController.update);
router.post('/invoices', invoiceController.create);