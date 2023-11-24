import { Member, Role } from "@prisma/client";

export interface MemberResponse
  extends Pick<
    Member,
    | "id"
    | "firstName"
    | "lastName"
    | "userName"
    | "contactNumber"
    | "member"
    | "active"
    | "contributionPerMonth"
  > {
  role: Pick<Role, "roleName">;
}
