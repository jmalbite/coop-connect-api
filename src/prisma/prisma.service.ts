import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "postgresql://jmalbite:jmALBITE@localhost:5434/amv-dev?schema=public",
        },
      },

      errorFormat: "pretty",
    });
  }
}
