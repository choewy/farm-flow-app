export type User = {
  id: string;
  email: string;
  name: string;
  status: 'activated' | 'inactivated' | 'deleted';
};

export type AuthUser = Pick<User, 'id' | 'email' | 'name' | 'status'>;
export type RoleUser = Pick<User, 'id' | 'name' | 'email'>;
