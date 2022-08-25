"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatedasher"]("main_window",{

/***/ "./src/render/components/TextInput.tsx":
/*!*********************************************!*\
  !*** ./src/render/components/TextInput.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __rest = (this && this.__rest) || function (s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r\n                t[p[i]] = s[p[i]];\r\n        }\r\n    return t;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\r\nvar react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\r\nvar TextInput = function (_a) {\r\n    var type = _a.type, className = _a.className, value = _a.value, onChange = _a.onChange, inputProps = __rest(_a, [\"type\", \"className\", \"value\", \"onChange\"]);\r\n    var _b = (0, react_1.useState)(value || \"\"), realValue = _b[0], setValue = _b[1];\r\n    return ((0, jsx_runtime_1.jsx)(\"input\", __assign({ type: \"string\", className: \"\".concat(className || \"\", \" m-1 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none rounded-t-md border-b-2 !border-opacity-20 focus:!border-opacity-100 border-b-zinc-900 dark:border-b-white transition-colors py-0.5 px-1\"), value: realValue, onChange: function (e) {\r\n            setValue(e.target.value);\r\n            onChange === null || onChange === void 0 ? void 0 : onChange(e);\r\n        } }, inputProps)));\r\n};\r\nexports[\"default\"] = TextInput;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvVGV4dElucHV0LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0ZBQWlDO0FBRWpDLElBQU0sU0FBUyxHQUEwRCxVQUFDLEVBTXpFO0lBTEMsUUFBSSxZQUNKLFNBQVMsaUJBQ1QsS0FBSyxhQUNMLFFBQVEsZ0JBQ0wsVUFBVSxjQUwyRCwwQ0FNekUsQ0FEYztJQUVQLFNBQXdCLG9CQUFRLEVBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUE1QyxTQUFTLFVBQUUsUUFBUSxRQUF5QixDQUFDO0lBQ3BELE9BQU8sQ0FDTCwyQ0FDRSxJQUFJLEVBQUMsUUFBUSxFQUNiLFNBQVMsRUFBRSxVQUNULFNBQVMsSUFBSSxFQUFFLHVOQUNtTSxFQUNwTixLQUFLLEVBQUUsU0FBUyxFQUNoQixRQUFRLEVBQUUsVUFBQyxDQUFDO1lBQ1YsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsSUFDRyxVQUFVLEVBQ2QsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYscUJBQWUsU0FBUyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFzaGVyLy4vc3JjL3JlbmRlci9jb21wb25lbnRzL1RleHRJbnB1dC50c3g/NjY4MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBUZXh0SW5wdXQ6IFJlYWN0LkZDPFJlYWN0LklucHV0SFRNTEF0dHJpYnV0ZXM8SFRNTElucHV0RWxlbWVudD4+ID0gKHtcbiAgdHlwZSxcbiAgY2xhc3NOYW1lLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIC4uLmlucHV0UHJvcHNcbn0pID0+IHtcbiAgY29uc3QgW3JlYWxWYWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUodmFsdWUgfHwgXCJcIik7XG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwic3RyaW5nXCJcbiAgICAgIGNsYXNzTmFtZT17YCR7XG4gICAgICAgIGNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICB9IG0tMSBiZy13aGl0ZSBkYXJrOmJnLXppbmMtOTAwIHRleHQtemluYy05MDAgZGFyazp0ZXh0LXdoaXRlIG91dGxpbmUtbm9uZSByb3VuZGVkLXQtbWQgYm9yZGVyLWItMiAhYm9yZGVyLW9wYWNpdHktMjAgZm9jdXM6IWJvcmRlci1vcGFjaXR5LTEwMCBib3JkZXItYi16aW5jLTkwMCBkYXJrOmJvcmRlci1iLXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIHB5LTAuNSBweC0xYH1cbiAgICAgIHZhbHVlPXtyZWFsVmFsdWV9XG4gICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgc2V0VmFsdWUoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBvbkNoYW5nZT8uKGUpO1xuICAgICAgfX1cbiAgICAgIHsuLi5pbnB1dFByb3BzfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/render/components/TextInput.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7cb837dcc6ddd4c2a63b")
/******/ })();
/******/ 
/******/ }
);