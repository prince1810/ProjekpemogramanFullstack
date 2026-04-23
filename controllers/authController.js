const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {validateRegister, validateLogin} = require('../utils/validatOR');
const errorHandler = require('../utils/errorHandler');
class AuthController {
    register(req, res) {
        const data = req.body;
        const error = validateRegister(data);
        if (error) {
            return errorHandler(res, "error, 400, error");
        }
        // cek email
        User.findByEmail(data.email, async (err, result) => {
            
            
            
            
            
            
            
            const user = {}
        });
    }
}
