import * as React from 'react';
import { Box, Heading } from 'bumbag-native';
import { LineChart } from 'react-native-wagmi-charts';

import mockData from './line-data.json';

export default function App() {
  return (
    <>
      <Heading.H5 paddingX="major-2" marginBottom="major-2">
        WAGMI Line Chart 📈
      </Heading.H5>
      <LineChart.Provider data={mockData}>
        <Box>
          <LineChart.Chart />
          <LineChart.Cursor />
        </Box>
      </LineChart.Provider>
    </>
  );
}
