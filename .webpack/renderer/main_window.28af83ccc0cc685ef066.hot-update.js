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

/***/ "./src/render/components/Toggle.tsx":
/*!******************************************!*\
  !*** ./src/render/components/Toggle.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n      desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __rest = (this && this.__rest) || function (s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r\n                t[p[i]] = s[p[i]];\r\n        }\r\n    return t;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nvar Toggle = function (_a) {\r\n    var type = _a.type, className = _a.className, value = _a.value, checked = _a.checked, onChange = _a.onChange, inputProps = __rest(_a, [\"type\", \"className\", \"value\", \"checked\", \"onChange\"]);\r\n    var _b = (0, react_1.useState)(!!checked), realValue = _b[0], setValue = _b[1];\r\n    return ((0, jsx_runtime_1.jsx)(\"div\", __assign({ className: \"relative\" }, { children: (0, jsx_runtime_1.jsx)(\"label\", __assign({ className: \"absolute !w-8 !h-4 !m-1 bg-purple-500 rounded-full cursor-pointer\" }, { children: (0, jsx_runtime_1.jsx)(\"input\", __assign({ type: \"checkbox\", className: \"\".concat(className || \"\", \" appearance-none bg-white absolute rounded-full aspect-square top-0.1 bottom-0.1 left-0.1 checked:left-auto right-auto checked:right-0.1\"), onChange: function (e) {\r\n                    setValue(e.target.checked);\r\n                    onChange === null || onChange === void 0 ? void 0 : onChange(e);\r\n                } }, inputProps)) })) })));\r\n};\r\nexports[\"default\"] = Toggle;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvVG9nZ2xlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RkFBd0M7QUFFeEMsSUFBTSxNQUFNLEdBQTBELFVBQUMsRUFPdEU7SUFOQyxRQUFJLFlBQ0osU0FBUyxpQkFDVCxLQUFLLGFBQ0wsT0FBTyxlQUNQLFFBQVEsZ0JBQ0wsVUFBVSxjQU53RCxxREFPdEUsQ0FEYztJQUVQLFNBQXdCLG9CQUFRLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUExQyxTQUFTLFVBQUUsUUFBUSxRQUF1QixDQUFDO0lBQ2xELE9BQU8sQ0FDTCx5Q0FBSyxTQUFTLEVBQUMsVUFBVSxnQkFDdkIsMkNBQU8sU0FBUyxFQUFDLG1FQUFtRSxnQkFDbEYsMkNBQ0UsSUFBSSxFQUFDLFVBQVUsRUFDZixTQUFTLEVBQUUsVUFDVCxTQUFTLElBQUksRUFBRSw2SUFDeUgsRUFDMUksUUFBUSxFQUFFLFVBQUMsQ0FBQztvQkFDVixRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0IsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLElBQ0csVUFBVSxFQUNkLElBQ0ksSUFDSixDQUNQLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixxQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXNoZXIvLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvVG9nZ2xlLnRzeD81YjY1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBUb2dnbGU6IFJlYWN0LkZDPFJlYWN0LklucHV0SFRNTEF0dHJpYnV0ZXM8SFRNTElucHV0RWxlbWVudD4+ID0gKHtcbiAgdHlwZSxcbiAgY2xhc3NOYW1lLFxuICB2YWx1ZSxcbiAgY2hlY2tlZCxcbiAgb25DaGFuZ2UsXG4gIC4uLmlucHV0UHJvcHNcbn0pID0+IHtcbiAgY29uc3QgW3JlYWxWYWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoISFjaGVja2VkKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWJzb2x1dGUgIXctOCAhaC00ICFtLTEgYmctcHVycGxlLTUwMCByb3VuZGVkLWZ1bGwgY3Vyc29yLXBvaW50ZXJcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBjbGFzc05hbWU9e2Ake1xuICAgICAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgICB9IGFwcGVhcmFuY2Utbm9uZSBiZy13aGl0ZSBhYnNvbHV0ZSByb3VuZGVkLWZ1bGwgYXNwZWN0LXNxdWFyZSB0b3AtMC4xIGJvdHRvbS0wLjEgbGVmdC0wLjEgY2hlY2tlZDpsZWZ0LWF1dG8gcmlnaHQtYXV0byBjaGVja2VkOnJpZ2h0LTAuMWB9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICBzZXRWYWx1ZShlLnRhcmdldC5jaGVja2VkKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlPy4oZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4uaW5wdXRQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2dnbGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/render/components/Toggle.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5c78908d45cbbb1dea8e")
/******/ })();
/******/ 
/******/ }
);