"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formatDatetime = require("./formatDatetime");

Object.keys(_formatDatetime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _formatDatetime[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formatDatetime[key];
    }
  });
});

var _formatPrice = require("./formatPrice");

Object.keys(_formatPrice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _formatPrice[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formatPrice[key];
    }
  });
});

var _usePrevious = require("./usePrevious");

Object.keys(_usePrevious).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _usePrevious[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _usePrevious[key];
    }
  });
});
//# sourceMappingURL=index.js.map