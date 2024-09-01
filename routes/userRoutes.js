const express = require('express'); 

const {createUser} = require('../controlers/userControlers');

const router = express.Router();

router.route('/createUser').post(createUser);

module.exports = router;