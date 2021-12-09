import { Coronavirus } from '@mui/icons-material';
import { Container, Stack, Typography } from '@mui/material';

interface HeaderProps {}

function Header(props: HeaderProps) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 1,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Coronavirus
          fontSize="large"
          color="error"
          sx={{
            transform: 'rotate(30deg)',
          }}
        />
        <Typography
          component="h1"
          variant="h6"
          sx={{
            fontWeight: 'normal',
          }}
        >
          COVID - 19
        </Typography>
      </Stack>
    </Container>
  );
}

export default Header;
