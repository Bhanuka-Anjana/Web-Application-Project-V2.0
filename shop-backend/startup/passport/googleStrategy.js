const passport = require("passport");
const { User } = require("../../models/user");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile.name, profile.id, profile.email, profile.picture);
      try {
        const googleUser = await User.findOneAndUpdate(
          { email: profile.email },
          {
            $set: {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              googleId: profile.id,
              email: profile.email,
              imgURL: profile.picture,
            },
          },
          { upsert: true }
        );

        if (googleUser) return done(null, googleUser);
        throw new Error("Something went wrong!");
      } catch (err) {
        done(err, false);
      }
    }
  )
);
