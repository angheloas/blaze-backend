require('dotenv').config();
const mongoose =require('../config/database');
const faker = require('faker');
const Customer = require('../models/customer');

const seeder = async _ => {
    await Customer.deleteMany({});
    for (var $i=1; $i<=1000; $i++) {
        const customer = new Customer({        
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "phone_number": faker.phone.phoneNumber()
        });
        await customer.save();
    }
}

seeder().then(_ => mongoose.connection.close());