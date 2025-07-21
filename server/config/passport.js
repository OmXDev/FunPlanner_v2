import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/user.model.js";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";


dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = await new User({
                    googleId: profile.id,
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                }).save();
            }

            const token = jwt.sign(
                { _id: user._id, email: user.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1d' }
            );

            const plainUser = {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                token,
            };

            return done(null, plainUser);
        } catch (err) {
            return done(err, null);
        }
    }));



passport.serializeUser((user, done) => {
    console.log('Serializing User ', user)

    if (!user || !user.id) {
        console.error('Cannot serialize invalid user:', user);
        return done(new Error('Invalid user during serialization'), null);
    }
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
})