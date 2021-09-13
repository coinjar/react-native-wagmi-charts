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

Below are some guides to help you make your charts suit your brand. Hopefully a combination of the below will enable you to make a great chart! :-)

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

[Learn how to further customise your cursor]()

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

[Learn how to further customise your cursor]()


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

[Learn how to further customise your crosshair]()

### Interactive labels

#### Line chart

To render an interactive label on your line chart as your cursor moves along the graph, you can use the `PriceText` or `DatetimeText` components:

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

[Learn how to further customise your labels]()

#### Candlestick chart

To render an interactive label on your candlestick chart, you can use the `PriceText` or `DatetimeText` components:

> Note: These components **must** be within the `CandlestickChart.Provider` component.

```jsx
<CandlestickChart.Provider data={data}>
  <CandlestickChart>
    <CandlestickChart.Candles />
    <CandlestickChart.Crosshair />
  </CandlestickChart>
  <CandlestickChart.PriceText type="open" />
  <CandlestickChart.PriceText type="high" />
  <CandlestickChart.PriceText type="low" />
  <CandlestickChart.PriceText type="close" />
  <CandlestickChart.DatetimeText />
</LineChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133034935-faea61e6-09c2-4dba-a1ab-555d1ebee880.gif" width="200px" />

[Learn how to further customise your labels]()

### Interactive tooltips

#### Line charts

To render an interactive tooltip that follows your cursor, you can use the `Tooltip` component.

```jsx
<LineChart.Provider data={data}>
  <LineChart>
    <LineChart.Path />
    <LineChart.CursorCrosshair>
      <LineChart.Tooltip />
    </LineChart.CursorCrosshair>
  </LineChart>
</LineChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133035626-a58b0258-e720-40b5-902b-522b2430b254.gif" width="200px" />

You can even add another tooltip to show something like date/time:

```jsx
<LineChart.Provider data={data}>
  <LineChart>
    <LineChart.Path />
    <LineChart.CursorCrosshair>
      <LineChart.Tooltip />
      <LineChart.Tooltip position="bottom">
        <LineChart.DatetimeText />
      </LineChart.Tooltip>
    </LineChart.CursorCrosshair>
  </LineChart>
</LineChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133036011-8a9b4865-10dd-4e88-9fd1-1e109435a73c.gif" width="200px" />

[Learn how to further customise your tooltips]()

#### Candlestick charts

To render an interactive tooltip that follows your crosshair, you can use the `Tooltip` component.

```jsx
<CandlestickChart.Provider data={data}>
  <CandlestickChart>
    <CandlestickChart.Candles />
    <CandlestickChart.Crosshair>
      <CandlestickChart.Tooltip />
    </CandlestickChart.Crosshair>
  </CandlestickChart>
</CandlestickChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133036451-e1f2f12b-9e96-4a0f-8c69-4f630bb8ded3.gif" width="200px" />

### Colors

By default, the charts come with default colors out-of-the-box... But you probably will want to change these to suit your brand.

#### Line charts

##### Coloring the path

To customise the color of the line chart path, supply a `color` prop to `LineChart.Path`. This can be any valid React Native `StyleSheet` compatible color.

```jsx
<LineChart.Provider data={data}>
  <LineChart>
    <LineChart.Path color="hotpink" />
  </LineChart>
</LineChart.Provider>
```

<img src="https://user-images.githubusercontent.com/7336481/133037040-ce13ba5b-6ee5-45a2-ba14-18bf12e13746.png" width="200px" />


##### Coloring the cursor

To customise the color of the line chart cursor, supply a `color` prop to `LineChart.CursorCrosshair`. This can be any valid React Native `StyleSheet` compatible color.

> Note: This also works for `LineChart.CursorLine`

```jsx
<LineChart.Provider data={data}>
  <LineChart>
    <LineChart.Path color="hotpink" />
    <LineChart.CursorCrosshair color="hotpink />
  </LineChart>
</LineChart.Provider>
```

<img width="200px" alt="Screen Shot 2021-09-13 at 4 53 46 pm" src="https://user-images.githubusercontent.com/7336481/133037333-6b1345e5-a98b-459c-b3b1-6e5b08143f33.png">

#### Candlestick charts

##### Coloring the candles

To customise the color of the candlestick chart candles, supply a `negativeColor` and a `positiveColor` to `CandlestickChart.Candles`. This can be any valid React Native `StyleSheet` compatible color.

```jsx
<CandlestickChart.Provider data={data}>
  <CandlestickChart>
    <CandlestickChart.Candles positiveColor="hotpink" negativeColor="black" />
  </CandlestickChart>
</CandlestickChart.Provider>
```

<img width="200px" alt="Screen Shot 2021-09-13 at 4 58 52 pm" src="https://user-images.githubusercontent.com/7336481/133037949-aba76daa-20bb-4d4e-b05e-b0cff42b69a6.png">


##### Coloring the crosshair

To customise the color of the line chart cursor, supply a `color` prop to `CandlestickChart.Crosshair`. This can be any valid React Native `StyleSheet` compatible color.

```jsx
<CandlestickChart.Provider data={data}>
  <CandlestickChart>
    <CandlestickChart.Candles positiveColor="hotpink" negativeColor="black" />
    <CandlestickChart.Crosshair color="hotpink" />
  </CandlestickChart>
</CandlestickChart.Provider>
```

<img width="200px" alt="Screen Shot 2021-09-13 at 4 58 52 pm" src="https://user-images.githubusercontent.com/7336481/133038181-33ee91bf-a5e2-4124-ab7b-df745a5ba804.gif">

### Customizing size

You can modify the width & height of the charts by providing `width` and `height` props to `LineChart` or `CandlestickChart`. Your chart should adapt to it's size.

```jsx
<LineChart.Provider data={data}>
  <LineChart width={150} height={150}>
    <LineChart.Path />
  </LineChart>
</LineChart.Provider>
```

### Customizing labels

#### Price labels

##### Precision

By default, the price labels have a precision of `2`, meaning that the prices will always be to 2 decimal places. However, you can customize this with the `precision` prop:

```jsx
<LineChart.PriceText precision={4} />
<CandlestickChart.PriceText precision={4} />
```

##### Custom formatting

To customize the formatting of the price text, you can supply a `format` function in the form of a [reanimated worklet](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/worklets):

> Note: due to the nature of reanimated worklets, you cannot define functions that run on the React Native JS thread. [Read more here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/worklets)

```jsx
<LineChart.PriceText
  format={({ value }) => {
    'worklet';
    const formattedPrice = yourOwnFormatValueFn(value);
    return `$${formattedPrice} AUD`;
  }}
/>
```

#### Datetime labels

##### Date/time options

Internally, WAGMI charts uses [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) to generate the date/time label. You can customise it's options like so:

```jsx
<LineChart.DatetimeText
  locale="en-AU"
  options={{
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }}
/>
```

##### Custom formatting

To customize the formatting of the date/time text, you can supply a `format` function in the form of a [reanimated worklet](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/worklets):

> Note: due to the nature of reanimated worklets, you cannot define functions that run on the React Native JS thread. [Read more here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/worklets)

```jsx
<LineChart.DatetimeText
  format={({ value }) => {
    'worklet';
    const formattedDate = yourOwnFormatValueFn(value);
    return formattedDate;
  }}
/>
```

### Customizing tooltips

#### Style

You can customize the style of the tooltip by providing the `textStyle` prop:

```jsx
<LineChart.Tooltip
  style={{
    backgroundColor: 'black',
    borderRadius: 4,
    color: 'white',
    fontSize: 18,
    padding: 4,
  }}
/>
```

![Kapture 2021-09-13 at 18 46 41](https://user-images.githubusercontent.com/7336481/133053224-88ac9462-dd61-4070-a541-d1e6168f579e.gif)

#### Gutter

You can customize the gutters of the tooltip by providing `cursorGutter`, `xGutter` or `yGutter`.

`cursorGutter` is the gutter between the cursor and the tooltip.

`xGutter` and `yGutter` is the gutter on the x & y axis of the chart (the tooltip can't pass the gutter).

```jsx
<LineChart.Tooltip 
  cursorGutter={60} 
  xGutter={16} 
  yGutter={16} 
/>
```

![Kapture 2021-09-13 at 18 54 01](https://user-images.githubusercontent.com/7336481/133054393-28d542c1-c9fc-4ba6-b4a0-86cf096ebcda.gif)

## Components & API

<!-- date options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat -->


### Credits

This library wouldn't be possible if it weren't for:

- [Rainbow's Animated Charts](https://github.com/rainbow-me/react-native-animated-charts)
- @wcandillon and his [Can It Be Done In React Native](www.youtube.com/wcandillon) series 💪😍  
