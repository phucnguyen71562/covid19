import { keyframes } from '@emotion/react';
import { Coronavirus } from '@mui/icons-material';
import { Typography } from '@mui/material';

const spinAndHueRotate = keyframes`
  from {
    transform: rotate(0deg);
    filter: hue-rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
`;

export interface LoadingProps {}

function Loading(props: LoadingProps) {
  return (
    <>
      <Coronavirus
        color="primary"
        sx={{
          animation: `${spinAndHueRotate} 1s ease infinite`,
        }}
      />
      <Typography variant="h6" sx={{ ml: 0.5, fontWeight: 'normal' }}>
        Loading...
      </Typography>
    </>
  );
}

export default Loading;
