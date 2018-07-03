const userRoutes = require('./users/user.routes');
const authJWT = require('../services/auth.service');
const postRoutes = require( './posts/post.routes');

const constructorMethod = app => {
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/posts', postRoutes);
    app.use('/test', authJWT.authJwt, (req, res) => {
        res.send('private test');
    });
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
}

module.exports = constructorMethod;