import { Box, Tab, Tabs } from '@mui/material';

function a11yProps(index: number, ariaLabel: string) {
  return {
    id: `${ariaLabel}-${index}`,
    'aria-controls': `${ariaLabel}panel-${index}`,
  };
}

export interface CustomTabsProps {
  orientation?: 'vertical' | 'horizontal';
  ariaLabel: string;
  items: string[];
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

function CustomTabs(props: CustomTabsProps) {
  const {
    orientation = 'vertical',
    ariaLabel,
    items,
    value,
    onChange,
    ...rest
  } = props;

  if (orientation === 'horizontal') {
    return (
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          orientation={orientation}
          value={value}
          onChange={onChange}
          {...rest}
        >
          {items.map((item, index) => (
            <Tab key={item} label={item} {...a11yProps(index, ariaLabel)} />
          ))}
        </Tabs>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Tabs
        orientation={orientation}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {items.map((item, index) => (
          <Tab key={item} label={item} {...a11yProps(index, ariaLabel)} />
        ))}
      </Tabs>
    </Box>
  );
}

export default CustomTabs;
