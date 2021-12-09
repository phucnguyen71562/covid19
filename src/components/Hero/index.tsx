import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { GlobalData } from 'apis/covidApi';
import HeroVideo from 'assets/images/hero.mp4';

interface HeroProps {
  global: GlobalData | null;
}

function Hero(props: HeroProps) {
  const { global } = props;
  return (
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'warning.light',
            }}
            gutterBottom
          >
            Corona Virus Pandemic
          </Typography>
          <Typography
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 'bold',
            }}
          >
            Stay Home
          </Typography>
          <Typography
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 'bold',
            }}
          >
            Stay Safe
          </Typography>
          <Box
            sx={{
              width: 40,
              height: 4,
              my: 3,
              borderRadius: 2,
              backgroundColor: 'common.black',
            }}
          />
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{
              color: 'gray.600',
            }}
          >
            The 2019 novel coronavirus (2019 nCoV), officially named as COVID 19
            pandemic by WHO, has spread to more than 180 countries.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box component="video" width="100%" autoPlay loop muted>
            <source src={HeroVideo} type="video/mp4" />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: 'fit-content',
          mx: 'auto',
          padding: 3,
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.3)',
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          sx={{
            fontWeight: 'bold',
          }}
          gutterBottom
        >
          Global Stats
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          spacing={2}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 5,
            }}
          >
            <Typography variant="subtitle1">Total Cases</Typography>
            <Typography variant="h6">{global?.TotalConfirmed}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 5,
            }}
          >
            <Typography variant="subtitle1">Recovered</Typography>
            <Typography variant="h6">{global?.TotalRecovered}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 5,
            }}
          >
            <Typography variant="subtitle1">Deaths</Typography>
            <Typography variant="h6">{global?.TotalDeaths}</Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export default Hero;
