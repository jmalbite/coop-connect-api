import { CreateMemberDto } from "../dto";

//member has no default
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

//member has no defaults
export const newMemberActiveND: CreateMemberDto = {
  firstName: "Connor",
  lastName: "Koss",
  userName: "Cassandre",
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

export const newNoDefaultMembers: CreateMemberDto[] = [
  {
    firstName: "Hettie",
    lastName: "Morissette",
    userName: "Cristina",
    password: "!test123@",
    contactNumber: "412-498-9127",
    contributionPerMonth: 2000,
    member: true,
    active: true,
    roleId: "1",
  },
  {
    firstName: "Alvah",
    lastName: "Strosin",
    userName: "Rachel",
    password: "!test123@",
    contactNumber: "412-498-9127",
    contributionPerMonth: 2000,
    member: true,
    active: true,
    roleId: "1",
  },
  {
    firstName: "Damion",
    lastName: "Gerhold",
    userName: "Hattie",
    password: "!test123@",
    contactNumber: "412-498-9127",
    contributionPerMonth: 2000,
    member: true,
    active: true,
    roleId: "1",
  },
  {
    firstName: "Kaleb",
    lastName: "Cassin",
    userName: "Kadin",
    password: "!test123@",
    contactNumber: "412-498-9127",
    contributionPerMonth: 2000,
    member: true,
    active: true,
    roleId: "1",
  },
  {
    firstName: "Wayne",
    lastName: "Breitenberg",
    userName: "Mina",
    password: "!test123@",
    contactNumber: "412-498-9127",
    contributionPerMonth: 2000,
    member: true,
    active: true,
    roleId: "1",
  },
];
