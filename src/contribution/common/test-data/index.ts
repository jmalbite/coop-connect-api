import { CreateContributionDto, EditContributionDto } from "../dto";

const newDate = new Date();

export const newContribution: CreateContributionDto = {
  memberId: "to-be-assigned",
  amount: 2000,
  paymentType: 1,
  screenshot_id: "sample-screenshot-id",
  remarks: "contribution for mark",
  contributionDate: newDate.toISOString(),
};

export const udpateContribution: EditContributionDto = {
  id: "to-be-assigned",
  memberId: "to-be-assigned",
  amount: 2500,
  paymentType: 2,
  screenshot_id: "edit-screenshot-id",
  remarks: "updated contribution remarks",
  contributionDate: newDate.toISOString(),
};
