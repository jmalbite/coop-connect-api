/* eslint-disable prettier/prettier */

export function contributionSelectedReturns(): object {
  return {
    select: {
      id: true,
      ctransactionNum: true,
      member: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      amount: true,
      paymentType: true,
      remarks: true,
    },
  };
}
