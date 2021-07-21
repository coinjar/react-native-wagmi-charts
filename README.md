# react-native-candlestick-chart

A sweet candlestick chart for React Native

## Installation

```sh
npm install react-native-candlestick-chart
```

## Usage

```jsx
import CandlestickChart from "react-native-candlestick-chart";

const data = {
  { date: "2019-12-31T09:00:00Z", open: 25228.7, high: 25234.58, low: 25182.26, close: 25183.03 },
  { date: "2019-12-31T10:00:00Z", open: 25182.41, high: 25206.59, low: 25176.55, close: 25197.28 },
  { date: "2019-12-31T11:00:00Z", open: 25197.17, high: 25197.54, low: 25142.38, close: 25149.72 },
}

<CandlestickChartProvider data={data}>
  <Candles />
  <Crosshair />
</CandlestickChartProvider>
```

<!-- date options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat -->