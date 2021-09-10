import * as React from 'react';
import 'react-native-gesture-handler';
import { Box, Text, Provider as BumbagNativeProvider } from 'bumbag-native';

import CandlestickChart from './CandlestickChart';
import LineChart from './LineChart';

export default function App() {
  const [selected, setSelected] = React.useState('');
  return (
    <BumbagNativeProvider>
      <Box.Safe flex="1">
        <Box.Scroll>
          {!selected && (
            <Box paddingX="major-2" marginTop="major-6">
              <Box.Touchable onPress={() => setSelected('candlestick')}>
                <Text>Candlestick</Text>
              </Box.Touchable>
              <Box.Touchable onPress={() => setSelected('line')}>
                <Text>Line</Text>
              </Box.Touchable>
            </Box>
          )}
          {selected === 'candlestick' && <CandlestickChart />}
          {selected === 'line' && <LineChart />}
        </Box.Scroll>
      </Box.Safe>
    </BumbagNativeProvider>
  );
}
