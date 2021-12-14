import { Box, Fade } from '@mui/material';
import { CovidCountry, GlobalData, useCovidSummary } from 'apis/covidApi';
import Header from 'components/Header';
import Hero from 'components/Hero';
import ListCountries, { SORT_OPTIONS } from 'components/ListCountries';
import { GlobalLoading } from 'components/Loading';
import useLocalStorage from 'hooks/useLocalStorage';
import { useState } from 'react';

function App() {
  const [bookmark, setBookmark] = useLocalStorage('bookmark', []);
  const [global, setGlobal] = useState<GlobalData | null>(null);
  const [countries, setCountries] = useState<CovidCountry[]>([]);
  const [bookmarkCountries, setBookmarkCountries] = useState<CovidCountry[]>(
    []
  );
  const [date, setDate] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS.DEFAULT);
  const [tab, setTab] = useState(0);

  const { isLoading } = useCovidSummary({
    onSuccess: (data) => {
      setGlobal(data.Global);
      setCountries(data.Countries);
      setDate(data.Date);
    },
  });

  const sortCountries = (sortBy: number, data: CovidCountry[]) => {
    switch (sortBy) {
      case SORT_OPTIONS.DEFAULT: {
        return [...data].sort((a, b) => {
          return a.Country.toLowerCase() > b.Country.toLowerCase() ? 1 : -1;
        });
      }
      case SORT_OPTIONS.MOST_CONFIRMED: {
        return [...data].sort((a, b) => {
          return b.TotalConfirmed - a.TotalConfirmed;
        });
      }
      case SORT_OPTIONS.HIGHEST_DEATHS: {
        return [...data].sort((a, b) => {
          return b.TotalDeaths - a.TotalDeaths;
        });
      }
      case SORT_OPTIONS.LEAST_RECOVERED: {
        return [...data].sort((a, b) => {
          return a.TotalRecovered - b.TotalRecovered;
        });
      }
      default: {
        return [...data];
      }
    }
  };

  const handleSortCountries = (sortBy: number) => {
    if (tab === 0) {
      setCountries(sortCountries(sortBy, countries));
    } else {
      setBookmarkCountries(sortCountries(sortBy, bookmarkCountries));
    }
  };

  const handleBookmark = (country: CovidCountry) => {
    if (!bookmark.includes(country.ID)) {
      setBookmark([...bookmark, country.ID]);
    } else {
      setBookmark(bookmark.filter((id: string) => id !== country.ID));
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setSort(SORT_OPTIONS.DEFAULT);
    if (newValue === 0) {
      setCountries(countries);
    } else {
      setBookmarkCountries(
        countries.filter((country: CovidCountry) =>
          bookmark.includes(country.ID)
        )
      );
    }
  };

  if (isLoading) {
    return <GlobalLoading />;
  }

  return (
    <Fade in={!isLoading}>
      <Box>
        <Header />
        <Hero global={global} />
        <ListCountries
          countries={countries}
          bookmarkCountries={bookmarkCountries}
          date={date}
          sort={sort}
          tab={tab}
          handleChangeTab={handleChangeTab}
          handleSortCountries={handleSortCountries}
          handleBookmark={handleBookmark}
        />
      </Box>
    </Fade>
  );
}

export default App;
