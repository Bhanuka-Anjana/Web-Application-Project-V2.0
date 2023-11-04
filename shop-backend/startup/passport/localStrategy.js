const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../models/user");

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    username,
    password,
    done
  ) {
    // const { error } = validateUser({ username, password });
    // if (error) return done(error.details[0].message, false);
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect email or password" });
      }
      const conformation = await user.checkPassword(password);
      if (conformation) {
        return done(null, user, {
          message: `Welcome! ${user.firstName}  ${user.lastName}`,
        });
      }

      return done(null, false, { message: "Incorrect email or password" });
    } catch (err) {
      return done(err, null, { message: "Internal server error" });
    }
  })
);
