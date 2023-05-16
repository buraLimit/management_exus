export type UserStateProps = {
  error: boolean;
  isLoading: boolean;
  users: User[];
  totalItems: number;
};

export type NewUser = {
  name: string;
  email: string;
  organizationId?: number;
};

export type User = NewUser & {
  id: number;
};
