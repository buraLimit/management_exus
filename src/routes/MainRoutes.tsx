import { lazy } from 'react';
import MainLayout from 'layout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import OrganizationListPage from 'pages/tables/organization-table/OrganizationListPage';
import ProjectListPage from 'pages/tables/project-table/ProjectListPage';
import OrganizationsPerProject from 'pages/statistics/OrganizationsPerProject';
import UsersPerProject from 'pages/statistics/UsersPerProject';

const UserListPage = Loadable(lazy(() => import('pages/tables/user-table/UserListPage')));
//TODO: Add other pages to Loadable

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'user-list',
          element: <UserListPage />
        },
        {
          path: 'organization-list',
          element: <OrganizationListPage />
        },
        {
          path: 'project-list',
          element: <ProjectListPage />
        },
        {
          path: 'organization-statistics',
          element: <OrganizationsPerProject />
        },
        {
          path: 'project-statistics',
          element: <UsersPerProject />
        }
      ]
    }
  ]
};

export default MainRoutes;
