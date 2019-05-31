const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Users.findById(jwt_payload.id)
                .then(users => {
                    if (users) {
                        return done(null, users);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
