"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArea = getArea;

var shape = _interopRequireWildcard(require("d3-shape"));

var _d3Scale = require("d3-scale");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore
// @ts-ignore
function getArea({
  data,
  width,
  height,
  gutter,
  shape: _shape,
  yDomain
}) {
  const timestamps = data.map((_, i) => i);
  const scaleX = (0, _d3Scale.scaleLinear)().domain([Math.min(...timestamps), Math.max(...timestamps)]).range([0, width]);
  const scaleY = (0, _d3Scale.scaleLinear)().domain([yDomain.min, yDomain.max]).range([height - gutter, gutter]);
  const area = shape.area().x((_, i) => scaleX(i)).y0(d => scaleY(d.value)).y1(() => height).curve(_shape)(data);
  return area;
}
//# sourceMappingURL=getArea.js.map