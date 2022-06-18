/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./front.js":
/*!******************!*\
  !*** ./front.js ***!
  \******************/
/***/ (() => {

eval("const fetchData = async () => {\n  // index.html 이 로드되면 백엔드 서버로 직접 요청을 보냄.\n  try {\n    const result = await fetch(\"http://localhost:3065/api/test\", {\n      message: \"proxy server test\",\n    });\n    const data = result.json();\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n};\n\nconst testData = async () => {\n  try {\n    const result = await fetch(\"http://localhost:3065/api\");\n    const data = result.text();\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n};\n\n// fetchData().then((r) => null);\n\ntestData().then((r) => null);\n\n\n//# sourceURL=webpack:///./front.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./front.js"]();
/******/ 	
/******/ })()
;