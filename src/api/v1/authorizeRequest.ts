import passport from "passport";

export default function authorizeRequest() {
  return passport.authenticate("jwt", { session: false });
}
