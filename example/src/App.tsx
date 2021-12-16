import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Box,
  Button,
  Text,
  Heading,
  Level,
  Provider as BumbagNativeProvider,
} from 'bumbag-native';

import CandlestickChart from './CandlestickChart';
import LineChart from './LineChart';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [selected, setSelected] = React.useState('');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BumbagNativeProvider>
        <Box.Safe flex="1">
          <Level
            verticalBelow=""
            paddingX="major-2"
            paddingY="major-2"
            alignY="center"
          >
            <Heading.H5 key={'heading'}>
              React Native WAGMI Charts 💸
            </Heading.H5>
            {selected ? (
              <Button size="small" onPress={() => setSelected('')}>
                Back
              </Button>
            ) : null}
          </Level>
          <Box.Scroll>
            {!selected && (
              <Box paddingX="major-2" marginTop="major-6">
                <Heading.H6 marginBottom="major-2">
                  Click a chart below to get started
                </Heading.H6>
                <Button onPress={() => setSelected('candlestick')}>
                  <Text>Candlestick</Text>
                </Button>
                <Button onPress={() => setSelected('line')}>
                  <Text>Line</Text>
                </Button>
              </Box>
            )}
            <Box marginTop="major-2">
              {selected === 'candlestick' && <CandlestickChart />}
              {selected === 'line' && <LineChart />}
            </Box>
          </Box.Scroll>
        </Box.Safe>
      </BumbagNativeProvider>
    </GestureHandlerRootView>
  );
}
