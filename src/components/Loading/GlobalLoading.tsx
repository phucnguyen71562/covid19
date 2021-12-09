import { Box } from '@mui/material';
import Loading from './Loading';

export interface GlobalLoadingProps {}

function GlobalLoading(props: GlobalLoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Loading />
    </Box>
  );
}

export default GlobalLoading;
