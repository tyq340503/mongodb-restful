const express = require('express');
const validate = require('express-validation');
const authen = require('../../services/auth.service');
const userController = require('./user.controllers');
const userValidation = require('./user.validation');

const routes = express.Router();

routes.post('/signup', validate(userValidation.signup), userController.signUp);

routes.post('/login', authen.authentic, userController.login);
// routes.use('*', (req, res) => {
//     console.log('test2');
//     console.log(req.body);
//     res.status(404).json({ error: "Not found" });
// });

module.exports = routes;