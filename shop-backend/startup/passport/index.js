const { User } = require("../../models/user");
const passport = require("passport")

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log("*** serializeUser called, user:");
  console.log(user); // the whole raw user object!
  console.log("---------");
  done(null, user._id);
});

// user object attaches to the request as req.user
passport.deserializeUser(async (id, done) => {
  console.log(`*** Deserialize user, user: ${id}`);
  console.log("--------------");
  try {
    const user = await User.findById(id);
    console.log(user);
    if (user) return done(null, user);
  } catch (err) {
    done(err, false);
  }
});
