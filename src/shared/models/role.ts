export type Role = {
  id: string;
  name: string;
  super: boolean;
  required: boolean;
  permissions: string[];
};

export type AuthRole = Pick<Role, 'id' | 'name' | 'required' | 'super' | 'permissions'>;
