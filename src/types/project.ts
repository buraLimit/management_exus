import { Organization } from './organization';

export type ProjectStateProps = {
  error: boolean;
  isLoading: boolean;
  projects: Project[];
  totalItems: number;
};

export type NewProject = {
  name: string;
  acronym: string;
  description: string;
};

export type Project = NewProject & {
  id: number;
  organizations?: Organization[];
};
