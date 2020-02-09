const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String
}, { versionKey: false });

module.exports = mongoose.model('customers', CustomerSchema);