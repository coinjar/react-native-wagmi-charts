"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLineChart = useLineChart;

var React = _interopRequireWildcard(require("react"));

var _Context = require("./Context");

var _Data = require("./Data");

var _useCurrentY = require("./useCurrentY");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useLineChart() {
  const lineChartContext = React.useContext(_Context.LineChartContext);
  const maybeId = (0, _Data.useLineChartId)();
  const dataContext = (0, _Data.useLineChartData)({
    id: maybeId
  });
  const currentY = (0, _useCurrentY.useCurrentY)();
  let tmpContext = {
    data: []
  };

  for (const item of dataContext === null || dataContext === void 0 ? void 0 : dataContext.data) {
    tmpContext.data.push({ ...item
    });
  }

  return React.useMemo(() => ({ ...lineChartContext,
    ...tmpContext,
    currentY
  }), [lineChartContext, dataContext, currentY]);
}
//# sourceMappingURL=useLineChart.js.map