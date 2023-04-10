/* eslint-disable prettier/prettier */
import { EditContributionDto } from "../dto";

export function editContributionQuery(params: EditContributionDto): object {
  return {
    amount: params.amount,
    memberId: params.memberId,
    paymentType: params.paymentType,
    remarks: params.remarks,
    screenshot_id: params.screenshot_id,
    contributionDate: params.contributionDate,
  };
}
