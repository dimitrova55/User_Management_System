/** Customer Schema Models */

import mongoose from "mongoose";

const Schema = mongoose.Schema; /** NB.!!! */
const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Customer model
const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;