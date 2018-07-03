// const mongoCollections = require("../../config/mongoCollections");
const User = require('./user.model');

module.exports = {
    signUp: async function (req, res) {
        try {
            console.log('signup');
            const user = await User.create(req.body);
            return res.status(201).json(user.toAuthJSON());
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    login: function (req, res, next) {
        res.status(200).json(req.user.toAuthJSON());

        return next;
    },
   
}