import { User } from './user';

export type OrganizationStateProps = {
  error: boolean;
  isLoading: boolean;
  organizations: Organization[];
  totalItems: number;
};

export type NewOrganization = {
  name: string;
  acronym: string;
  country: string;
  projectId?: number;
};

export type Organization = NewOrganization & {
  id: number;
  users?: User[];
};
