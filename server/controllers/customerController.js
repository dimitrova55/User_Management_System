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
    console.log(locals);  

    let perPage = 3;
    let page = req.query.page || 1;

    try {
        //const customers = await Customer.find({}).limit(22);
        const customers = await Customer.aggregate([{$sort: {updatedAt: -1}}])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        
        const count = await Customer.countDocuments({});

        res.render('index.ejs', {
            messages: await req.flash('info'),
            customers,
            current: page,
            pages: Math.ceil(count / perPage)});   

    } catch (error) {
        console.log(error);
        
    }    
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
    console.log(locals);    
    res.render('customer/add.ejs');
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

/**
 * GET /
 * Customer Data 
 */

export const viewCustomer =async function (req, res) {
    const locals = {
        title: 'View Customer Data',
        description: 'Free NodeJS User Management System',
    }
    console.log(locals);

    try {
        const customer = await Customer.findOne({_id: req.params.id });

        res.render('customer/view.ejs', {customer});

    } catch (error) {
        console.log(error);        
    }    
}


/**
 * GET /
 * Edit Customer Data 
*/

export const editCustomer =async function (req, res) {
    const locals = {
        title: 'Edit Customer Data',
        description: 'Free NodeJS User Management System',
    }
    console.log(locals);

    try {
        const customer = await Customer.findOne({_id: req.params.id });

        res.render('customer/edit.ejs', {customer});

    } catch (error) {
        console.log(error);        
    }    
}


/**
 * PUT /
 * Update Customer Data 
*/

export const putCustomer = async function (req, res) {
    const locals = {
        title: 'Update Customer Data',
        description: 'Free NodeJS User Management System',
    }
    console.log(locals);
    try {
        console.log(req.params._id);
        
        await Customer.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now(),
        });

        await res.redirect(`/edit/${req.params.id}`);

    } catch (error) {
        console.log(error);        
    }
}


/**
 * DELETE /
 * Delete Customer Data 
*/

export const deleteCustomer = async function (req, res) {
    const locals = {
        title: 'Delete Customer Data',
        description: 'Free NodeJS User Management System',
    }
    console.log(locals);
    try {
        await Customer.deleteOne({_id: req.params.id});
        res.redirect('/');

    } catch (error) {
        console.log(error);        
    }
}


/**
 * GET /
 * Search Customer Data 
*/

export const searchCustomer = async function (req, res) {
    const locals = {
        title: 'Search Customer Data',
        description: 'Free NodeJS User Management System',
    }
    console.log(locals);
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const customers = await Customer.find({
            $or: [
                {firstName : {$regex: new RegExp(searchNoSpecialChar, "i")}},
                {lasttName : {$regex: new RegExp(searchNoSpecialChar, "i")}},
            ]
        });

        res.render('search.ejs', {customers});

    } catch (error) {
        console.log(error);        
    }
}