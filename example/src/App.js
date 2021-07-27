import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Provider as BumbagNativeProvider,
} from 'bumbag-native';
import {
  CandlestickChartProvider,
  Candles,
  Crosshair,
  PriceText,
  DatetimeText,
} from '@coinjar/react-native-candlestick-chart';
import mockData from './data.json';
export default function App() {
  return React.createElement(
    BumbagNativeProvider,
    null,
    React.createElement(
      Box.Safe,
      { flex: '1' },
      React.createElement(
        Box.Scroll,
        null,
        React.createElement(
          Heading.H6,
          { paddingX: 'major-2', marginBottom: 'major-2' },
          'React Native Candlestick Chart \uD83D\uDD6F'
        ),
        React.createElement(
          CandlestickChartProvider,
          { data: mockData },
          React.createElement(
            Box,
            null,
            React.createElement(Candles, null),
            React.createElement(Crosshair, null)
          ),
          React.createElement(
            Stack,
            { padding: 'major-2', spacing: 'major-1' },
            React.createElement(Heading.H6, null, 'PriceText'),
            React.createElement(
              Box,
              null,
              React.createElement(Text, { fontWeight: '500' }, 'Formatted: '),
              React.createElement(
                Flex,
                null,
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Current'),
                  React.createElement(PriceText, null)
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Open'),
                  React.createElement(PriceText, { type: 'open' })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'High'),
                  React.createElement(PriceText, { type: 'high' })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Low'),
                  React.createElement(PriceText, { type: 'low' })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Close'),
                  React.createElement(PriceText, { type: 'close' })
                )
              )
            ),
            React.createElement(
              Box,
              null,
              React.createElement(Text, { fontWeight: '500' }, 'Value: '),
              React.createElement(
                Flex,
                null,
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Current'),
                  React.createElement(PriceText, { variant: 'value' })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Open'),
                  React.createElement(PriceText, {
                    type: 'open',
                    variant: 'value',
                  })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'High'),
                  React.createElement(PriceText, {
                    type: 'high',
                    variant: 'value',
                  })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Low'),
                  React.createElement(PriceText, {
                    type: 'low',
                    variant: 'value',
                  })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Close'),
                  React.createElement(PriceText, {
                    type: 'close',
                    variant: 'value',
                  })
                )
              )
            ),
            React.createElement(
              Box,
              null,
              React.createElement(
                Text,
                { fontWeight: '500' },
                'Custom format: '
              ),
              React.createElement(
                Flex,
                null,
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Current'),
                  React.createElement(PriceText, {
                    format: (d) => {
                      'worklet';
                      return `$${d.formatted} AUD`;
                    },
                  })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Open'),
                  React.createElement(PriceText, {
                    type: 'open',
                    format: (d) => {
                      'worklet';
                      return `$${d.formatted} AUD`;
                    },
                  })
                ),
                React.createElement(
                  Box,
                  { flex: '1' },
                  React.createElement(Text, { fontSize: '100' }, 'Close'),
                  React.createElement(PriceText, {
                    type: 'close',
                    format: (d) => {
                      'worklet';
                      return `$${d.formatted} AUD`;
                    },
                  })
                )
              )
            )
          ),
          React.createElement(
            Stack,
            { padding: 'major-2', spacing: 'minor-1' },
            React.createElement(Heading.H6, null, 'DatetimeText'),
            React.createElement(
              Flex,
              null,
              React.createElement(Text, { fontWeight: '500' }, 'Formatted: '),
              React.createElement(DatetimeText, null)
            ),
            React.createElement(
              Flex,
              null,
              React.createElement(Text, { fontWeight: '500' }, 'Float: '),
              React.createElement(DatetimeText, { variant: 'value' })
            ),
            React.createElement(
              Flex,
              null,
              React.createElement(
                Text,
                { fontWeight: '500' },
                'Custom format: '
              ),
              React.createElement(DatetimeText, {
                locale: 'en-AU',
                options: {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                },
              })
            )
          )
        )
      )
    )
  );
}
