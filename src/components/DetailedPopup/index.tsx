import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Country } from 'apis/countryApi';
import { CovidDataByCountry } from 'apis/covidApi';
import CustomDialogTitle from 'components/CustomDialogTitle';
import { Loading } from 'components/Loading';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import Chart from './Chart';

interface DetailedPopupProps {
  open: boolean;
  handleClose: () => void;
  isLoadingCountry: boolean;
  country?: Country;
  isLoadingCovidData: boolean;
  covidData?: CovidDataByCountry[];
}

function DetailedPopup(props: DetailedPopupProps) {
  const {
    open,
    handleClose,
    isLoadingCountry,
    country,
    isLoadingCovidData,
    covidData,
  } = props;

  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const data = useMemo(() => {
    if (covidData) {
      return covidData.map((data) => ({
        name: dayjs(data.Date).format('MMM DD'),
        Confirmed: data.Confirmed,
        Deaths: data.Deaths,
        Recovered: data.Recovered,
      }));
    }

    return [];
  }, [covidData]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="lg"
      scroll="paper"
      open={open}
      onClose={handleClose}
      aria-labelledby="detailed-covid-situation"
    >
      <CustomDialogTitle id="detailed-covid-situation" onClose={handleClose}>
        Detailed covid situation
      </CustomDialogTitle>
      <DialogContent dividers>
        {(isLoadingCountry || isLoadingCovidData) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Loading />
          </Box>
        )}
        {!isLoadingCountry && !isLoadingCovidData && (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src={country?.flags?.svg}
                  alt={country?.name?.common}
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 4,
                  }}
                />
              </Grid>
              <Grid item xs>
                <Typography component="p" variant="subtitle1">
                  Name: {country?.name?.common}
                </Typography>
                <Typography component="p" variant="subtitle1">
                  Population: {country?.population}
                </Typography>
                <Typography component="p" variant="subtitle1">
                  Capital: {country?.capital}
                </Typography>
                <Typography component="p" variant="subtitle1">
                  Region: {country?.region}
                </Typography>
                <Typography component="p" variant="subtitle1">
                  Subregion: {country?.subregion}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ width: '100%', height: 400, mt: 4, overflow: 'hidden' }}>
              <Chart data={data} />
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DetailedPopup;
