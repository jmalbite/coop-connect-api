import { CreateMemberDto } from "../dto";

export const newMemberActive: CreateMemberDto = {
  firstName: "Fannie",
  lastName: "Quigley",
  userName: "fanquigley",
  password: "!test123@",
  contactNumber: "412-498-9127",
  contributionPerMonth: 2000,
  member: true,
  active: true,
  roleId: "1",
};

export const newMemberNotActive: CreateMemberDto = {
  firstName: "Linnie",
  lastName: "Pinkie",
  userName: "fanquigley",
  password: "!test123@",
  contactNumber: "412-498-9127",
  contributionPerMonth: 1500,
  member: true,
  active: false,
  roleId: "1",
};

export const newNonMember: CreateMemberDto = {
  firstName: "Lonzo",
  lastName: "Dashawn",
  userName: "fanquigley",
  password: "!test123@",
  contactNumber: "412-498-9127",
  contributionPerMonth: 2500,
  member: false,
  active: false,
  roleId: "1",
};
