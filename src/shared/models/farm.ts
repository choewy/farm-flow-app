export type Farm = {
  id: string;
  name: string;
};

export type AuthFarm = Pick<Farm, 'id' | 'name'>;
