// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');

// passport.use(
//     new GoogleStrategy(
//         {
//             clientId: process.env.CLIENT_ID,
//             clientSecret:process.env.CLIENT_SECRET,
//             callbackURL:'auth/google/callback',
//             scope:["profile", "email"]
//         },
//         function(accessToken, refreshToken,profile,callback){
//             callback(null, profile);
//         }
//     )
// )