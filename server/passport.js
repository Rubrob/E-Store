const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const {
  JWT_SECRET,
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET
} = require("./config");
const { User } = require("./models");

// JSON WRB STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub).select(`-local.password`);
        if (!user) return done(null, false);
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// GOOGLE OAuth STRATEGY
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: G_CLIENT_ID,
      clientSecret: G_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("__ACCESSTOKEN:", accessToken, "\n__REFRESHTOKEN__:", refreshToken, "\n__PROFILE__:", profile);
        const existingUser = await User.findOne({ "google.id": profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// FACKBOOK OAuth STRATEGY
passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: FB_CLIENT_ID,
      clientSecret: FB_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("__ACCESSTOKEN:", accessToken, "\n__REFRESHTOKEN__:", refreshToken, "\n__PROFILE__:", profile);
        const exisingUser = await User.findOne({ "facebook.id": profile.id });

        if (exisingUser) {
          return done(null, exisingUser);
        }

        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ "local.email": email });

      if (!user) {
        console.log({ message: "User doesn't exists" });
        return done(null, false);
      }

      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);

      // If not, handle it
      if (!isMatch) {
        console.log({ message: "Credantials doesn't match" });
        return done(null, false);
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);
