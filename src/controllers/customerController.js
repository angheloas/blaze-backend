const Customer = require('../models/customer');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

class CustomerController {
    constructor(customerRepository) {
      this.customerRepository = customerRepository;
    }
  
    async all(req, res) {
        const keyword = req.query.keyword;
        const sortBy = req.query.sort_by;
        const sortDir = req.query.sort_dir;

        const customers = await this.customerRepository.findAll(keyword, sortBy, sortDir);
        res.json(customers);
    }

    async paginate(req, res) {
        
        var currentPage = parseInt(req.query.page) || 1;
        
        const customers = await this.customerRepository.paginate(currentPage);
        res.json(customers);
    }

    async store(req, res) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        const customer = new Customer(req.body);
        res.json(await customer.save());
    }

    async update(req, res) {
        
        const id = req.params.id;
        
        if (mongoose.Types.ObjectId.isValid(id)) {
            Customer.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true, useFindAndModify: false})
            .then((doc) => {
                doc ? res.json(doc) : res.status(404).json({'message': `Customer with ${id} ID not found`});
            }).catch((err) => {
                console.log(err);
                res.status(500).json({'message': 'An error has occurred'});
            });
        } else {
            res.status(428).json({'message': 'Please provide correct Id'});
        }
    }
  }
  
  module.exports = CustomerController;