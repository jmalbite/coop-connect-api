import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const contriDefaultSelectionQuery =
  (): Prisma.ContributionSelect<DefaultArgs> => ({
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
    screenshot_id: true,
    amount: true,
    paymentType: true,
    remarks: true,
  });
