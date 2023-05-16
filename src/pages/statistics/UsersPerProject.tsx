import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'store';
import { getOrganizationList } from 'store/reducers/organization';
import { Box, Card } from '@mui/material';
import { getProjectList } from 'store/reducers/project';

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  'rgb(240, 84, 94)',
  'rgb(204, 0, 255)',
  'rgb(0, 238, 255)',
  'rgb(127, 219, 255)',
  'rgb(102, 249, 102)',
  'rgb(255, 133, 27)',
  'rgb(255, 215, 0)',
  'rgb(248, 180, 184)',
  'rgb(163, 163, 163)',
  'rgb(87, 83, 85)'
];

const UsersPerProject = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.organization);
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getOrganizationList());
    dispatch(getProjectList());
  }, [dispatch]);

  const labels = projects.map((project) => project.name);
  const data = projects.map((project) =>
    project.organizations?.length
      ? project.organizations.reduce((acc, prjOrg) => {
          const usersNum = organizations.find((org) => org.id === prjOrg.id)?.users?.length;
          return acc + (usersNum ?? 0);
        }, 0)
      : 0
  );

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Users:',
        data,
        backgroundColor: labels.map((_prj, index) => {
          const colorIndex = index > 9 ? index - 10 : index;
          return colors[colorIndex];
        })
      }
    ]
  };

  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem', position: 'relative', height: '70vh' }}>
        <Pie data={pieData} />
      </Box>
    </Card>
  );
};

export default UsersPerProject;
