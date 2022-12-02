"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartDataProvider = LineChartDataProvider;
exports.LineChartIdProvider = LineChartIdProvider;
exports.useLineChartData = useLineChartData;
exports.useLineChartId = exports.DefaultLineChartId = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DefaultLineChartId = '__LineChartData';
exports.DefaultLineChartId = DefaultLineChartId;
const LineChartDataContext = /*#__PURE__*/(0, _react.createContext)({
  [DefaultLineChartId]: []
});

function LineChartDataProvider({
  children,
  data
}) {
  const contextValue = (0, _react.useMemo)(() => {
    if (Array.isArray(data)) {
      return {
        [DefaultLineChartId]: data
      };
    }

    return data;
  }, [data]);
  return /*#__PURE__*/_react.default.createElement(LineChartDataContext.Provider, {
    value: contextValue
  }, children);
}

const LineChartIdContext = /*#__PURE__*/(0, _react.createContext)(undefined);

function LineChartIdProvider({
  id,
  children
}) {
  return /*#__PURE__*/_react.default.createElement(LineChartIdContext.Provider, {
    value: id
  }, children);
}

const useLineChartId = () => (0, _react.useContext)(LineChartIdContext);

exports.useLineChartId = useLineChartId;

function useLineChartData({
  id
}) {
  const dataContext = (0, _react.useContext)(LineChartDataContext);
  validateLineChartId(dataContext, id);
  const data = dataContext[id || DefaultLineChartId];
  return (0, _react.useMemo)(() => ({
    data
  }), [data]);
}

function validateLineChartId(dataContext, id) {
  if (id != null && !dataContext[id]) {
    const otherIds = Object.keys(dataContext).filter(otherId => otherId !== DefaultLineChartId);
    const singular = otherIds.length <= 1;
    const joinedIds = otherIds.join(', ');
    const suggestion = otherIds.length ? `Did you mean to use ${singular ? 'this ID' : 'one of these IDs'}: ${joinedIds}` : `You didn't pass any IDs to your <LineChart.Provider />'s data prop. Did you mean to pass an array instead?`;
    console.warn(`[react-native-wagmi-charts] Invalid usage of "id" prop on LineChart. You passed id="${id}", but this ID does not exist in your <LineChart.Provider />'s "data" prop.

${suggestion}`);
  } else if (id == null && !dataContext[DefaultLineChartId]) {
    const otherIds = Object.keys(dataContext);
    const singular = otherIds.length <= 1;
    const joinedIds = otherIds.join(', ');
    const suggestion = otherIds.length ? `Did you mean to use ${singular ? 'this ID' : 'one of these IDs'}: ${joinedIds}` : `You didn't pass any IDs to your <LineChart.Provider />'s data prop. Did you mean to pass an array instead?`;
    console.error(`[react-native-wagmi-charts] Missing data "id" prop on LineChart. You must pass an id prop to <LineChart /> when using a dictionary for your data.

${suggestion}
    `);
  }
}
//# sourceMappingURL=Data.js.map