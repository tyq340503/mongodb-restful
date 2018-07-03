const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const passport = require("passport");

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const middleware = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
}

module.exports = middleware;