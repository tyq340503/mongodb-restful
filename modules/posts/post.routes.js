const express = require('express');
const validate = require('express-validation');

const postController = require('./post.controller');
const authJwt = require('../../services/auth.service');
const postValidation = require('./post.validations');

const routes = express.Router();

routes.post('/', authJwt.authJwt, validate(postValidation.createPost), postController.createPost);
routes.get('/:id', postController.getPostById);
routes.get('/', postController.getPostsList);
routes.patch('/:id', authJwt.authJwt, validate(postValidation.updatePost), postController.updatePost);

module.exports = routes;