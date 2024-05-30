import { Container } from 'app/views/style/style';
import { Breadcrumb } from 'app/components';
import { Box } from '@mui/material';

const Aide = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Benefice par nature', path: 'admin/stocktypemateriel' },
            { name: 'Benefice par nature' }
          ]}
        />
      </Box>
    </Container>
  );
};
export default Aide;
