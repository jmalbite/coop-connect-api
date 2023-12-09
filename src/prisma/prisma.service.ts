/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    switch (process.env.NODE_ENV) {
      case "production":
        super({
          datasources: {
            db: {
              url: config.get("DATABASE_URL_PRODUCTION"),
            },
          },
          errorFormat: "pretty",
        });
        break;
      case "test":
        super({
          datasources: {
            db: {
              url: config.get("DATABASE_URL_TEST"),
            },
          },
          errorFormat: "pretty",
        });
        break;
      default:
        super({
          datasources: {
            db: {
              url: config.get("DATABASE_URL"),
            },
          },
          errorFormat: "pretty",
        });
        break;
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === "production") return;

    return await this.$transaction([
      this.loanCoMakers.deleteMany(),
      this.loansPayments.deleteMany(),
      this.loan.deleteMany(),
      this.member.deleteMany(),
      this.contribution.deleteMany(),
      this.rolesPermissions.deleteMany(),
      this.role.deleteMany(),
      this.permission.deleteMany(),
    ]);
  }
}
