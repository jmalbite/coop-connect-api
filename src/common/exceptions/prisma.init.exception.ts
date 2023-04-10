/* eslint-disable prettier/prettier */
import { Prisma } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";

export class PrismaInitException extends HttpException {
  constructor(
    message?: Prisma.PrismaClientInitializationError,
    errorCode?: HttpStatus
  ) {
    super(
      message?.message || "Something wrong with db connection or querying",
      errorCode || HttpStatus.NOT_FOUND
    );
  }
}
