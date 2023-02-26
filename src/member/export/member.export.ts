/* eslint-disable prettier/prettier */
export function memberSelectedReturns(): object {
  return {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      userName: true,
      contactNumber: true,
      member: true,
      active: true,
      role: {
        select: {
          roleName: true,
        },
      },
    },
  };
}
