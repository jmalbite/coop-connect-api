import { Contribution, Member, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

// export interface ContributionResponse
//   extends Pick<
//     Contribution,
//     | "id"
//     | "cTransactionNumber"
//     | "contributionDate"
//     | "screenshot_id"
//     | "amount"
//     | "paymentType"
//     | "remarks"
//     | "amount"
//   > {
//   member: Pick<Member, "id" | "firstName" | "lastName">;
// }
export interface ContributionResponse {
  //   id: string;
  //   memberId: string;
  //   cTransactionNumber: string;
  //   amount: Prisma.Decimal;
  //   paymentType: number;
  //   remarks: string | null;
  //   screenshot_id: string | null;
  member: Pick<Member, "id" | "firstName" | "lastName">;
}
