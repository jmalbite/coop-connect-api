/* eslint-disable prettier/prettier */

import { Prisma } from "@prisma/client";

export const contributionSelectedReturns = (): Prisma.ContributionArgs => {
  return {
    select: {
      id: true,
      cTransactionNumber: true,
      member: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      contributionDate: true,
      amount: true,
      paymentType: true,
      remarks: true,
    },
  };
};
