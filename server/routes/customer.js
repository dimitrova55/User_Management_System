/** Customer Routes */

import express from "express";
import {homepage, addCustomer, postCustomer} from "../controllers/customerController.js"

const router = express.Router();

// customer routes
router.get('/', homepage); // needs export called 'homepage'

router.get('/add', addCustomer);
router.post('/add', postCustomer);

export default router;