export const USER_TABLE_HEAD = [
  { id: 'id', label: 'ID', sort: true },
  { id: 'name', label: 'Name', sort: true },
  { id: 'email', label: 'Email', sort: true },
  { id: 'organization', label: 'Organization', sort: true },
  { id: 'actions', label: 'Actions', sort: false }
];

export const ORGANIZATION_TABLE_HEAD = [
  { id: 'id', label: 'ID', sort: true },
  { id: 'name', label: 'Name', sort: true },
  { id: 'acronym', label: 'Acronym', sort: true },
  { id: 'country', label: 'Country', sort: true },
  { id: 'projects', label: 'Projects', sort: true },
  { id: 'users', label: 'Users', sort: false },
  { id: 'actions', label: 'Actions', sort: false }
];

export const PROJECT_TABLE_HEAD = [
  { id: 'id', label: 'ID', sort: true },
  { id: 'name', label: 'Name', sort: true },
  { id: 'acronym', label: 'Acronym', sort: true },
  { id: 'description', label: 'Description', sort: true },
  { id: 'organizations', label: 'Organizations', sort: true },
  { id: 'actions', label: 'Actions', sort: false }
];
