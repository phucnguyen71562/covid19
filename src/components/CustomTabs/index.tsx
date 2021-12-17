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

  const borderStyle =
    orientation === 'horizontal'
      ? {
          borderBottom: 1,
          borderColor: 'divider',
        }
      : {
          borderRight: 1,
          borderColor: 'divider',
        };

  return (
    <Box sx={borderStyle}>
      <Tabs
        orientation={orientation}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {items.map((item, index) => (
          <Tab
            key={item}
            label={item}
            disableRipple
            sx={{
              alignItems: 'flex-start',
            }}
            {...a11yProps(index, ariaLabel)}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default CustomTabs;
