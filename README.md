# react-native-wagmi-charts 💸

A sweet & simple chart library for React Native that will make us feel like **W**e're **A**ll **G**onna **M**ake **I**t

<div style="display: flex; align-items: center; justify-content: center; width: 100%;">
  <img src="https://user-images.githubusercontent.com/7336481/133024970-07321941-4f26-44d2-867f-dac19d110941.gif" width="300px" />
  <img src="https://user-images.githubusercontent.com/7336481/133024976-3dc9056c-d936-439a-af41-57cbf9277a01.gif" width="300px" />
</div>

## Features

📈 Line charts & candlestick charts (more to come 🔜)

🏷 Interactive price & date/time label components

🧱 Built with composability in mind

🛠 Highly customizable APIs

✨ Uses React Native Reanimated 2 under-the-hood

🧈 Slick data transition animations

💬 Interactive tooltips


## Install

To get started with using WAGMI charts in your React Native project, install the `react-native-wagmi-charts` package.

```
npm install react-native-wagmi-charts
```

WAGMI charts also depends on a few libraries, you will also need to install these packages if you don't already have them:

```
npm install react-native-reanimated react-native-gesture-handler react-native-haptic-feedback
```

## Basic Usage

The library currently comes with 2 types of charts: Line & Candlestick. Below are the most basic usages of them.

### Line chart

To render a simple line chart, you will need to use the `LineChart.Provider`, `LineChart` & `LineChart.Path` components.

The `LineChart.Provider` component sets up the context of your chart, `LineChart` composes the chart elements, and the `LineChart.Path` component renders your data in the form of a line path.

> Note: This chart does not include an interactive cursor like in the animated example above. If you want one, [check out the "Basic Line Chart with Cursor" recipe]()

```jsx
import { LineChart } from 'react-native-wagmi-charts'; 

const data = [
  {
    timestamp: 1625945400000,
    value: 33575.25
  },
  {
    timestamp: 1625946300000,
    value: 33545.25
  },
  {
    timestamp: 1625947200000,
    value: 33510.25
  },
  {
    timestamp: 1625948100000,
    value: 33215.25
  }
]

function Example() {
  return (
    <LineChart.Provider data={data}>
      <LineChart>
        <LineChart.Path />
      </LineChart>
    </LineChart.Provider>
  )
}
```

### Candlestick chart

To render a simple candlestick chart, you will need to use the `CandlestickChart` & `CandlestickChart.Candles` components.

The `CandlestickChart.Provider` component sets up the context of your chart, `CandlestickChart` composes the chart elements, and the `CandlestickChart.Candles` component renders your data in the form of a line path.

> Note: This chart does not include an interactive cursor like in the animated example above. If you want one, [check out the "Basic Candlestick Chart with Cursor" recipe]()

```jsx
import { CandlestickChart } from 'react-native-wagmi-charts'; 

const data = [
  {
    timestamp: 1625945400000,
    open: 33575.25,
    high: 33600.52,
    low: 33475.12,
    close: 33520.11
  },
  {
    timestamp: 1625946300000,
    open: 33545.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11
  },
  {
    timestamp: 1625947200000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11
  }
]

function Example() {
  return (
    <CandlestickChart.Provider data={data}>
      <CandlestickChart>
        <CandlestickChart.Candles />
      </CandlestickChart>
    </CandlestickChart.Provider>
  )
}
```

## Guides

### Interactive cursors

#### Line chart

To render an interactive cursor on your line chart, you can include either the `LineChart.CursorCrosshair` or `LineChart.CursorLine` components:

##### `LineChart.CursorCrosshair`

```jsx
<LineChart.Provider data={data}>
  <LineChart>
    <LineChart.Path />
    <LineChart.CursorCrosshair />
  </LineChart>
</LineChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133027332-009b8996-4141-4865-bfd6-777e63b5e44d.gif" width="200px" />

##### `LineChart.CursorLine`

```jsx
<LineChart.Provider data={data}>
  <LineChart>
    <LineChart.Path />
    <LineChart.CursorLine />
  </LineChart>
</LineChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133027471-1c620ece-a95e-46b7-bd92-50f33757ce92.gif" width="200px" />


#### Candlestick chart

To render an interactive cursor on your candlestick chart, you can include the `CandlestickChart.Crosshair` component:

##### `CandlestickChart.Crosshair`

```jsx
<CandlestickChart.Provider data={data}>
  <CandlestickChart>
    <CandlestickChart.Candles />
    <CandlestickChart.Crosshair />
  </CandlestickChart>
</CandlestickChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133027656-a877b248-77c1-4bf3-822f-a05dee4efa20.gif" width="200px" />

### Interactive labels

To render an interactive label as your cursor moves along the graph, you can use the `PriceText` or `DatetimeText` components:

> Note: These components **must** be within the `LineChart.Provider` component.

```jsx
<LineChart.Provider data={data}>
  <LineChart>
    <LineChart.Path />
    <LineChart.CursorCrosshair />
  </LineChart>
  <LineChart.PriceText />
  <LineChart.DatetimeText />
</LineChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133028134-a0b65499-9edf-4535-9fcc-fcf8c1e4e0c4.gif" width="200px" />

### Interactive tooltips

### Colors

### Cursor types

### Customizing styles

### Customizing size

### Customizing labels

### Hooks for prices & date/time

## Components & API

<!-- date options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat -->


### Credits

This library wouldn't be possible if it weren't for:

- [Rainbow's Animated Charts](https://github.com/rainbow-me/react-native-animated-charts)
- @wcandillon and his [Can It Be Done In React Native](www.youtube.com/wcandillon) series 💪😍  
