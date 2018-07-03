const passport = require("passport")
const LocalStrategy = require("passport-local")
const jwtStrategy = require("passport-jwt")
const constants = require('../config/constant');
const User = require("../modules/users/user.model")

const localOpts = {
    usernameField: 'email',
}

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        // console.log(email, password)
        const user = await User.findOne({ email });
        // console.log(user)
        if (!user) {
            //console.log('false1')
            return done(null, false)
        } else if (!user.comparePassword(password)) {
            //console.log('false2')
            return done(null, false)
        }
        console.log('success');
        return done(null, user)
    } catch (error) {
        return done(error, false);
    }
});

const jwtOpts = {
    jwtFromRequest: jwtStrategy.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: constants.JWT_SECRET,
};

const JwtStrategy = new jwtStrategy.Strategy(jwtOpts, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

passport.use(localStrategy);
passport.use(JwtStrategy);
const authentic = passport.authenticate('local', { session: false });
const authJwt = passport.authenticate('jwt', { session: false });

module.exports = { authentic, authJwt };