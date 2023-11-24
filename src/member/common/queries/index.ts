import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const memberDefaultSelectionQuery =
  (): Prisma.MemberSelect<DefaultArgs> => ({
    id: true,
    firstName: true,
    lastName: true,
    userName: true,
    contactNumber: true,
    member: true,
    active: true,
    contributionPerMonth: true,
    role: {
      select: {
        roleName: true,
        createdAt: false,
        updatedAt: false,
      },
    },
  });
