/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export class CoMakersException extends HttpException {
  constructor(message?: string, errorCode?: HttpStatus) {
    console.log("🥳", message);
    super(
      message ?? "Somethings wrong with co-makers selected",
      errorCode ?? HttpStatus.BAD_REQUEST
    );
  }
}
