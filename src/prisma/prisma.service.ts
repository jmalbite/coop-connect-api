import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // eslint-disable-next-line prettier/prettier
          url: config.get("DATABASE_URL"),
        },
      },

      errorFormat: "pretty",
    });
  }
}
