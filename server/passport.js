const passport       = require('passport')
const JwtStrategy    = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy  = require('passport-local').Strategy;

const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const { JWT_SECRET, oauth } = require('./config');
const { google, facebook } = oauth;
const User = require('./models/user')

// JSON WRB STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try{
        // Find the user specified in token
        const user = User.findById( payload.sub );

        // If user doesn't exists, handle it
        if(!user){
            return done(null, false)
        }

        // Otherwise, return the user
        done(null, user)
    }catch(err){
        done(err, false)
    }
}))


// GOOGLE OAuth STRATEGY
const { G_CLIENT_ID, G_CLIENT_SECRET} = google;

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: G_CLIENT_ID,
    clientSecret: G_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log('__ACCESSTOKEN:', accessToken)
        // console.log('__REFRESHTOKEN__:', refreshToken);
        // console.log('__PROFILE__:', profile)

        // Check whether this current user exists in DB
        const existingUser = await User.findOne({ "google.id": profile.id })
        if(existingUser){
            console.log('User already exists')
            return done(null, existingUser)
        }

        console.log('User doesn`t exists creating a new Account')
        // If new Account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName
            },
            addresses: {
                shipping: {
                        firstname: '',
                        lastname: '',
                        address: '',
                        country: '',
                        city: '',
                        zip: '',
                        email: '',
                        phone: ''
                    },
                    billing: {
                        firstname: '',
                        lastname: '',
                        address: '',
                        country: '',
                        city: '',
                        zip: ''
                    }
            }
        })
        await newUser.save()
        done(null, newUser)

    } catch (err) {
        done(err, false, err.message)
    }
}))


// FACKBOOK OAuth STRATEGY
const { FB_CLIENT_ID, FB_CLIENT_SECRET } = facebook
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log('__ACCESSTOKEN:', accessToken)
        // console.log('__REFRESHTOKEN__:', refreshToken);
        // console.log('__PROFILE__:', profile)

        const exisingUser = await User.findOne({ 'facebook.id': profile.id });
        if(exisingUser){
            console.log('User already exists')
            return done(null, exisingUser)
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName
            },
            addresses: {
                shipping: {
                        firstname: '',
                        lastname: '',
                        address: '',
                        country: '',
                        city: '',
                        zip: '',
                        email: '',
                        phone: ''
                    },
                    billing: {
                        firstname: '',
                        lastname: '',
                        address: '',
                        country: '',
                        city: '',
                        zip: ''
                    }
            }
        })
        await newUser.save()
        done(null, newUser)
    } catch (err) {
        done(err, false, err.message)
    }
}))


// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ 'local.email': email })

    // If not, handle it
    if(!user){
        console.log('is existed')
        return done(null, false)
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);

    // If not, handle it
    if(!isMatch){
        console.log('doesnt match');
        return done(null, false)
    }

    // Otherwise, return user
    done(null, user)
  } catch (err) {
      done(err, false)
  }
}))