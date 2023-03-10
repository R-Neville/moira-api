import passport from "passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { User } from "../sequelize/models/user.model";
import logger from "../logger";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (payload: any, done: VerifiedCallback) => {
      return User.findOne({ where: { id: payload.id } })
        .then((user) => {
          return done(null, user!);
        })
        .catch((error) => {
          logger.error(error);
          done(error);
        });
    }
  )
);
