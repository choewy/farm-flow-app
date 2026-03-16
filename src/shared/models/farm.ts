export type Farm = {
  id: string;
  name: string;
  payRatePerHour: number;
  payDeductionAmount: number;
};

export type AuthFarm = Pick<Farm, 'id' | 'name'>;
