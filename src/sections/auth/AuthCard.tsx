import { Box, Card } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthCard = ({ children }: Props) => (
  <Card
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
  >
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
  </Card>
);

export default AuthCard;
