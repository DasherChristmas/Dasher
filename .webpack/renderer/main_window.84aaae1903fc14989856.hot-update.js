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

/***/ "./src/render/components/CheckBox.tsx":
/*!********************************************!*\
  !*** ./src/render/components/CheckBox.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n      desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __rest = (this && this.__rest) || function (s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r\n                t[p[i]] = s[p[i]];\r\n        }\r\n    return t;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nvar CheckBox = function (_a) {\r\n    var type = _a.type, className = _a.className, value = _a.value, checked = _a.checked, onChange = _a.onChange, inputProps = __rest(_a, [\"type\", \"className\", \"value\", \"checked\", \"onChange\"]);\r\n    var _b = (0, react_1.useState)(!!(value || checked)), realValue = _b[0], setValue = _b[1];\r\n    return ((0, jsx_runtime_1.jsx)(\"input\", __assign({ type: \"checkbox\", className: \"\".concat(className || \"\", \" m-1 h-4 w-4 cursor-pointer accent-purple-500 dark:invert-[90%] dark:checked:invert-0 bg-white dark:bg-zinc-900\"), checked: realValue, onChange: function (e) {\r\n            setValue(e.target.checked);\r\n            onChange === null || onChange === void 0 ? void 0 : onChange(e);\r\n        } }, inputProps)));\r\n};\r\nexports[\"default\"] = CheckBox;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvQ2hlY2tCb3gudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhGQUF3QztBQUV4QyxJQUFNLFFBQVEsR0FBMEQsVUFBQyxFQU94RTtJQU5DLFFBQUksWUFDSixTQUFTLGlCQUNULEtBQUssYUFDTCxPQUFPLGVBQ1AsUUFBUSxnQkFDTCxVQUFVLGNBTjBELHFEQU94RSxDQURjO0lBRVAsU0FBd0Isb0JBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsRUFBckQsU0FBUyxVQUFFLFFBQVEsUUFBa0MsQ0FBQztJQUM3RCxPQUFPLENBQ0wsMkNBQ0UsSUFBSSxFQUFDLFVBQVUsRUFDZixTQUFTLEVBQUUsVUFDVCxTQUFTLElBQUksRUFBRSxvSEFDZ0csRUFDakgsT0FBTyxFQUFFLFNBQVMsRUFDbEIsUUFBUSxFQUFFLFVBQUMsQ0FBQztZQUNWLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDLElBQ0csVUFBVSxFQUNkLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLHFCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Rhc2hlci8uL3NyYy9yZW5kZXIvY29tcG9uZW50cy9DaGVja0JveC50c3g/MTk0MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgQ2hlY2tCb3g6IFJlYWN0LkZDPFJlYWN0LklucHV0SFRNTEF0dHJpYnV0ZXM8SFRNTElucHV0RWxlbWVudD4+ID0gKHtcbiAgdHlwZSxcbiAgY2xhc3NOYW1lLFxuICB2YWx1ZSxcbiAgY2hlY2tlZCxcbiAgb25DaGFuZ2UsXG4gIC4uLmlucHV0UHJvcHNcbn0pID0+IHtcbiAgY29uc3QgW3JlYWxWYWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoISEodmFsdWUgfHwgY2hlY2tlZCkpO1xuICByZXR1cm4gKFxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgIGNsYXNzTmFtZT17YCR7XG4gICAgICAgIGNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICB9IG0tMSBoLTQgdy00IGN1cnNvci1wb2ludGVyIGFjY2VudC1wdXJwbGUtNTAwIGRhcms6aW52ZXJ0LVs5MCVdIGRhcms6Y2hlY2tlZDppbnZlcnQtMCBiZy13aGl0ZSBkYXJrOmJnLXppbmMtOTAwYH1cbiAgICAgIGNoZWNrZWQ9e3JlYWxWYWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICBzZXRWYWx1ZShlLnRhcmdldC5jaGVja2VkKTtcbiAgICAgICAgb25DaGFuZ2U/LihlKTtcbiAgICAgIH19XG4gICAgICB7Li4uaW5wdXRQcm9wc31cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tCb3g7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/render/components/CheckBox.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("07ed10135fab1285cd54")
/******/ })();
/******/ 
/******/ }
);