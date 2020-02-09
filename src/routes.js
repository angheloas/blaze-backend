const { Router } = require('express');
const { check } = require('express-validator');
const CustomerController = require('./controllers/customerController');
const CustomerRepository = require('./repositories/customerRepository');

const router = Router();
const customerRepo = new CustomerRepository();
const customerCtrl = new CustomerController(customerRepo);

//routes
router.get('/customers', (req, res) => customerCtrl.paginate(req, res));
router.get('/customers/all', (req, res) => customerCtrl.all(req, res));
router.patch('/customers/:id', (req, res) => customerCtrl.update(req, res));
router.post('/customers', [
  check('first_name').isLength({ min: 3 }),
  check('last_name').isLength({ min: 3 }),
  check('email').isEmail(),
  check('phone_number').notEmpty()
], (req, res) => customerCtrl.store(req, res));

module.exports = router;