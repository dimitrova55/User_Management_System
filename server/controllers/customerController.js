/** Customer Controllers */

import Customer from "../models/Customer.js";
import mongoose from "mongoose";

/**
 * GET /
 * Homepage 
 */

export const homepage = async function (req, res) {

    const locals = {
        title: 'NodeJS',
        description: 'Free NodeJS User Management System',
    }

    res.render('index.ejs', {locals, messages: req.flash('info')});
} 

/**
 * GET /
 * New Customer Form 
 */

export const addCustomer = async function (req, res) {
    const locals = {
        title: 'Add New Customer - NodeJS',
        description: 'Free NodeJS User Management System',
    }

    res.render('customer/add.ejs', locals);
}

/**
 * POST /
 * Create New Customer 
 */

export const postCustomer = async function (req, res) {
    console.log(req.body);
    
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        
    });

    try {
        await Customer.create(newCustomer);
        // await newCustomer.save();
        req.flash('info', 'New Customer has been added.');

        res.redirect('/');
    } catch (error) {
        console.error(error);
        
    }
    
}