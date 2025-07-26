import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient, Gender } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  scope: ['profile', 'email'],
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Try to find user by email
      const email = profile.emails?.[0]?.value;
      if (!email) return done(null, false);

      let user = await prisma.user.findUnique({ where: { email } });

      // If user doesn't exist, create one!
      if (!user) {
        user = await prisma.user.create({
          data: {
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            email,
            password: '', // Not used for OAuth
            gender: Gender.other, // or decide this differently
            dateOfBirth: "01/01/2000", // placeholder
            dateJoined: new Date(),
            lastLogin: new Date(),
          }
        });
      } else {
        // update lastLogin
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        });
      }

      // Attach user info for session
      done(null, { id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` });
    } catch (err) {
      done(err);
    }
  }
));

// Serialize/deserialize user for login session (by user id)
passport.serializeUser((user: any, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
