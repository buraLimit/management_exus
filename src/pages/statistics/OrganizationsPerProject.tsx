import { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'store';
import { Box, Card } from '@mui/material';
import { getProjectList } from 'store/reducers/project';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const OrganizationsPerProject = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);

  const labels = projects.map((prj) => prj.name);

  const data = {
    labels,
    datasets: [
      {
        label: 'Organizations: ',
        data: projects.map((prj) => prj?.organizations?.length),
        backgroundColor: 'rgba(239,183,16,0.2)',
        borderColor: 'rgba(239,183,16,1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1
        },
        min: 0,
        max: 5
      }
    }
  };

  return (
    <Card>
      <Box sx={{ flex: 1, position: 'relative', height: '70vh' }}>
        <Bar options={options} data={data} />
      </Box>
    </Card>
  );
};

export default OrganizationsPerProject;
