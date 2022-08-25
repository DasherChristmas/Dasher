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

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __rest = (this && this.__rest) || function (s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r\n                t[p[i]] = s[p[i]];\r\n        }\r\n    return t;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\r\nvar react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\r\nvar TextInput = function (_a) {\r\n    var type = _a.type, className = _a.className, value = _a.value, onChange = _a.onChange, inputProps = __rest(_a, [\"type\", \"className\", \"value\", \"onChange\"]);\r\n    var _b = (0, react_1.useState)(value || \"\"), realValue = _b[0], setValue = _b[1];\r\n    return ((0, jsx_runtime_1.jsx)(\"input\", __assign({ type: \"string\", className: \"\".concat(className || \"\"), value: realValue, onChange: function (e) {\r\n            setValue(e.target.value);\r\n            onChange === null || onChange === void 0 ? void 0 : onChange(e);\r\n        } }, inputProps)));\r\n};\r\nexports[\"default\"] = TextInput;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvVGV4dElucHV0LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0ZBQWlDO0FBRWpDLElBQU0sU0FBUyxHQUEwRCxVQUFDLEVBTXpFO0lBTEMsUUFBSSxZQUNKLFNBQVMsaUJBQ1QsS0FBSyxhQUNMLFFBQVEsZ0JBQ0wsVUFBVSxjQUwyRCwwQ0FNekUsQ0FEYztJQUVQLFNBQXdCLG9CQUFRLEVBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUE1QyxTQUFTLFVBQUUsUUFBUSxRQUF5QixDQUFDO0lBQ3BELE9BQU8sQ0FDTCwyQ0FDRSxJQUFJLEVBQUMsUUFBUSxFQUNiLFNBQVMsRUFBRSxVQUFHLFNBQVMsSUFBSSxFQUFFLENBQUUsRUFDL0IsS0FBSyxFQUFFLFNBQVMsRUFDaEIsUUFBUSxFQUFFLFVBQUMsQ0FBQztZQUNWLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDLElBQ0csVUFBVSxFQUNkLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLHFCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Rhc2hlci8uL3NyYy9yZW5kZXIvY29tcG9uZW50cy9UZXh0SW5wdXQudHN4PzY2ODMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgVGV4dElucHV0OiBSZWFjdC5GQzxSZWFjdC5JbnB1dEhUTUxBdHRyaWJ1dGVzPEhUTUxJbnB1dEVsZW1lbnQ+PiA9ICh7XG4gIHR5cGUsXG4gIGNsYXNzTmFtZSxcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICAuLi5pbnB1dFByb3BzXG59KSA9PiB7XG4gIGNvbnN0IFtyZWFsVmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKHZhbHVlIHx8IFwiXCIpO1xuICByZXR1cm4gKFxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cInN0cmluZ1wiXG4gICAgICBjbGFzc05hbWU9e2Ake2NsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICB2YWx1ZT17cmVhbFZhbHVlfVxuICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgIHNldFZhbHVlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgb25DaGFuZ2U/LihlKTtcbiAgICAgIH19XG4gICAgICB7Li4uaW5wdXRQcm9wc31cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/render/components/TextInput.tsx\n");

/***/ }),

/***/ "./src/render/containers/Controllers/index.tsx":
/*!*****************************************************!*\
  !*** ./src/render/containers/Controllers/index.tsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\r\nvar TextInput_1 = __importDefault(__webpack_require__(/*! ../../components/TextInput */ \"./src/render/components/TextInput.tsx\"));\r\nvar Controllers = function () {\r\n    return ((0, jsx_runtime_1.jsx)(\"div\", __assign({ className: \"w-full h-full\" }, { children: (0, jsx_runtime_1.jsx)(TextInput_1.default, {}) })));\r\n};\r\nexports[\"default\"] = Controllers;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVuZGVyL2NvbnRhaW5lcnMvQ29udHJvbGxlcnMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0lBQW1EO0FBR25ELElBQU0sV0FBVyxHQUFhO0lBQzVCLE9BQU8sQ0FDTCx5Q0FBSyxTQUFTLEVBQUMsZUFBZSxnQkFDNUIsdUJBQUMsbUJBQVMsS0FBRyxJQUNULENBQ1AsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLHFCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Rhc2hlci8uL3NyYy9yZW5kZXIvY29udGFpbmVycy9Db250cm9sbGVycy9pbmRleC50c3g/NjcwZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2hlY2tCb3ggZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvQ2hlY2tCb3hcIjtcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvVGV4dElucHV0XCI7XG5pbXBvcnQgVG9nZ2xlIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1RvZ2dsZVwiO1xuXG5jb25zdCBDb250cm9sbGVyczogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICA8VGV4dElucHV0IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVycztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/render/containers/Controllers/index.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cc2abd8de492d8b3bfb3")
/******/ })();
/******/ 
/******/ }
);