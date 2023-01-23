import MoiraError from "./MoiraError";
import { HttpStatus } from "../HttpStatus";

const internalServerError = new MoiraError({
  title: "Internal Server Error",
  detail: "Sorry - something when wrong on our end",
  httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
});

export default internalServerError;
