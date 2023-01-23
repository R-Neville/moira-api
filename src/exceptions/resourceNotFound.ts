import MoiraError from "./MoiraError";
import { HttpStatus } from "../HttpStatus";

export default function resourceNotFound(model: string, id: string) {
  return new MoiraError({
    title: `${model} Not Found`,
    detail: `Could not find the ${model.toLowerCase()} with ID ${id}`,
    httpStatus: HttpStatus.NOT_FOUND,
  });
}
