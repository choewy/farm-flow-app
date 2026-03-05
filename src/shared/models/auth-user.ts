export type AuthUser = {
  email: string;
  name: string;
  status: 'activated' | 'inactivated' | 'deleted';
};
