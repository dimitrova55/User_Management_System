/** Customer Routes */

import express from "express";
import * as customerController from "../controllers/customerController.js"

const router = express.Router();

// customer routes
router.get('/', customerController.homepage); // needs export called 'homepage'

router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);

router.get('/view/:id', customerController.viewCustomer);
router.get('/edit/:id', customerController.editCustomer);
router.put('/edit/:id', customerController.putCustomer);
router.delete('/edit/:id', customerController.deleteCustomer);
router.post('/search', customerController.searchCustomer);

export default router;