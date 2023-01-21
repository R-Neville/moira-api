import { HttpStatus } from "../HttpStatus";

export interface MoiraErrorArgs {
  title: string;
  detail: string;
  httpStatus: HttpStatus;
}

export default class MoiraError extends Error {
  public readonly title: string;
  public readonly detail: string;
  public readonly httpStatus: HttpStatus;

  __proto__ = Error;

  constructor(args: MoiraErrorArgs) {
    super();

    Object.setPrototypeOf(this, MoiraError.prototype);

    this.title = args.title;
    this.detail = args.detail;
    this.httpStatus = args.httpStatus;
  }
}
