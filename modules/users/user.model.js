const mongoose = require('mongoose');
// const Schema = require('mongoose');
const validator = require('validator');
const validation = require('./user.validation');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const constants = require('../../config/constant');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator(email) {
                return validator.isEmail(email)
            },
            message: '{value} is not a valid email'
        },
    },
    firstName: {
        type: String,
        required: [true, 'firstName is required!'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required!'],
        trim: true,
    },
    userName: {
        type: String,
        required: [true, 'userName is required!'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required!'],
        trim: true,
        minlength: [6, 'password need to be longer than 6'],
        validate: {
            validator(password) {
                return validation.passwordReg.test(password);
            },
            message: '{value} is not a valid email'
        }
    },
    t_password: {
        type: String,
        trim: true,
    }
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.t_password = this.password;
        this.password = this.hashPassword(this.password);
    }

    return next();
});

UserSchema.methods = {
    hashPassword(password) {
        return bcrypt.hashSync(password);
    },
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            constants.JWT_SECRET,
        );
    },
    toJSON() {
        return {
            _id: this._id,
            userName: this.userName
        };
    },
    toAuthJSON() {
        return {
            _id: this._id,
            userName: this.userName,
            token: `JWT ${this.createToken()}`
        };
    },
}

module.exports = mongoose.model('User', UserSchema);