import { UserOutlined, BankOutlined, SnippetsOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { NavItemType } from 'types/menu';

const icons = {
  UserOutlined,
  BankOutlined,
  SnippetsOutlined,
  BarChartOutlined,
  PieChartOutlined
};

const other: NavItemType = {
  id: 'other',
  title: '',
  type: 'group',
  children: [
    {
      id: 'user-list',
      title: 'UsersTable',
      url: '/user-list',
      icon: icons.UserOutlined
    },
    {
      id: 'organization-list',
      title: 'OrganizationsTable',
      url: '/organization-list',
      icon: icons.BankOutlined
    },
    {
      id: 'project-list',
      title: 'ProjectsTable',
      url: '/project-list',
      icon: icons.SnippetsOutlined
    },
    {
      id: 'organization-statistics',
      title: 'OrganizationStatistics',
      url: '/organization-statistics',
      icon: icons.BarChartOutlined
    },
    {
      id: 'project-statistics',
      title: 'ProjectStatistics',
      url: '/project-statistics',
      icon: icons.PieChartOutlined
    }
  ]
};

export default other;
