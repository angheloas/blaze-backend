const Customer = require('../models/customer');

class CustomerRepository {
  
    async findAll(keyword, sortBy, sortDir) {
        const columns = ["first_name", "last_name", "email", "phone_number"];
        
        let find = {};
        if (keyword) {
            find.$or = [];
            columns.forEach((field) => {
                find.$or.push({[field]: {$regex: new RegExp(`^${keyword}`,"i")}});
            })
        }

        let order = columns.indexOf(sortBy) != -1 ? {[sortBy]: sortDir === 'desc' ? -1 : 1} : {}
        
        return await Customer.find(find).sort(order);
        
    }

    async paginate(page) {

        var query = {};

        const perPage = 10;

        query.skip = perPage * (page - 1);
        query.limit = perPage;
        
        const totalCount = await Customer.countDocuments();
        const data = await Customer.find({}, {}, query);
        
        return {
            "data" : data,
            "last_page": totalCount ? Math.ceil(totalCount / perPage) : 1,
            "current_page": page,
            "per_page": perPage
        };
    }

  }
  
  module.exports = CustomerRepository;