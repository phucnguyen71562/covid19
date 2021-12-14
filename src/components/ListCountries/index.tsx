import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Container,
  Grid,
  Hidden,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useCountry } from 'apis/countryApi';
import { CovidCountry, useCovidByCountry } from 'apis/covidApi';
import Binoculars from 'assets/images/binoculars.gif';
import CustomTabs from 'components/CustomTabs';
import DetailedPopup from 'components/DetailedPopup';
import DropdownMenu from 'components/DropdownMenu';
import dayjs from 'dayjs';
import useLocalStorage from 'hooks/useLocalStorage';
import { useState } from 'react';

export const SORT_OPTIONS = {
  DEFAULT: 0,
  MOST_CONFIRMED: 1,
  HIGHEST_DEATHS: 2,
  LEAST_RECOVERED: 3,
};

const OPTIONS = [
  {
    label: 'Default',
    value: SORT_OPTIONS.DEFAULT,
  },
  {
    label: 'Most total confirmed cases',
    value: SORT_OPTIONS.MOST_CONFIRMED,
  },
  {
    label: 'Highest number of deaths',
    value: SORT_OPTIONS.HIGHEST_DEATHS,
  },
  {
    label: 'Least number of recovered cases',
    value: SORT_OPTIONS.LEAST_RECOVERED,
  },
];

export interface ListCountriesProps {
  date: string;
  countries: CovidCountry[];
  bookmarkCountries: CovidCountry[];
  sort: number;
  tab: number;
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
  handleSortCountries: (sortBy: number) => void;
  handleBookmark: (country: CovidCountry) => void;
}

function ListCountries(props: ListCountriesProps) {
  const {
    date,
    countries,
    bookmarkCountries,
    sort,
    tab,
    handleChangeTab,
    handleSortCountries,
    handleBookmark,
  } = props;

  const mdDown = useMediaQuery('(max-width:960px)');

  const [bookmark] = useLocalStorage('bookmark', []);

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    countryCode: '',
    slug: '',
  });

  const data = tab === 0 ? countries : bookmarkCountries;

  const { data: country, isLoading: isLoadingCountry } = useCountry(
    selectedCountry.countryCode,
    {
      enabled: !!selectedCountry.countryCode,
    }
  );

  const { data: covidData, isLoading: isLoadingCovidData } = useCovidByCountry(
    selectedCountry.slug,
    {
      enabled: !!selectedCountry.slug,
    }
  );

  const handleClickOpen = (value: CovidCountry) => {
    setSelectedCountry({
      countryCode: value.CountryCode,
      slug: value.Slug,
    });
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters={mdDown}
      sx={{
        mt: { xs: 7, md: 10 },
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <CustomTabs
            orientation={mdDown ? 'horizontal' : 'vertical'}
            ariaLabel="basic tabs example"
            items={['All', 'Bookmarked']}
            value={tab}
            onChange={handleChangeTab}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <Box
            sx={{
              mb: 1,
              p: 2,
              backgroundColor: 'common.white',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography color="gray" fontSize="small" mr={1}>
                Updated at {dayjs(date).format('HH:mm - DD/MM/YYYY')}
              </Typography>
              <DropdownMenu
                title="Sort By"
                options={OPTIONS}
                value={sort}
                onChange={handleSortCountries}
              />
            </Box>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Country</Typography>
              </Grid>
              <Grid item xs>
                <Typography textAlign="center">Total Confirmed</Typography>
              </Grid>
              <Hidden mdDown>
                <Grid item xs>
                  <Typography textAlign="center">Deaths</Typography>
                </Grid>
              </Hidden>
              <Grid item xs>
                <Typography textAlign="center">Recovered</Typography>
              </Grid>
            </Grid>
          </Box>
          {tab !== 0 && data?.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                my: 4,
              }}
            >
              <Box
                component="img"
                src={Binoculars}
                alt="No data"
                sx={{
                  width: 300,
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  my: 3,
                  fontWeight: 'bold',
                }}
              >
                No country in your bookmark
              </Typography>
            </Box>
          )}
          {data.map((country) => (
            <Stack
              direction="row"
              alignItems="center"
              key={country.ID}
              sx={{
                p: { xs: 1, md: 2 },
                borderRadius: 2,
                '&:hover': {
                  cursor: 'pointer',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Checkbox
                inputProps={{ 'aria-label': 'bookmark' }}
                icon={<BookmarkBorder />}
                checkedIcon={<Bookmark />}
                disableRipple
                size="small"
                defaultChecked={bookmark.includes(country.ID)}
                onChange={() => handleBookmark(country)}
                sx={{
                  '&.Mui-checked': {
                    color: 'warning.light',
                  },
                }}
              />
              <Grid
                container
                sx={{
                  '&:hover .item-text': {
                    color: 'primary.main',
                  },
                }}
                onClick={() => handleClickOpen(country)}
              >
                <Grid
                  item
                  xs={5}
                  className="item-text"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h3" variant="subtitle1">
                    {country.Country}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography color="error.light" textAlign="center">
                    {country.TotalConfirmed}
                  </Typography>
                </Grid>
                <Hidden mdDown>
                  <Grid item xs>
                    <Typography textAlign="center">
                      {country.TotalDeaths}
                    </Typography>
                  </Grid>
                </Hidden>
                <Grid item xs>
                  <Typography color="success.light" textAlign="center">
                    {country.TotalRecovered}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          ))}
        </Grid>
      </Grid>
      <DetailedPopup
        open={openPopup}
        handleClose={handleClose}
        isLoadingCountry={isLoadingCountry}
        country={country?.[0]}
        isLoadingCovidData={isLoadingCovidData}
        covidData={covidData}
      />
    </Container>
  );
}

export default ListCountries;
