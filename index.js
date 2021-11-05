module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tiny-emitter/instance");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".vf-field {\n  margin-bottom: 40px;\n}\n.vf-error-message {\n  color: #ec1c23;\n  font-size: 0.85em;\n  height: 0px;\n  padding-top: 6px;\n  margin-bottom: -6px;\n}\n.vf-tooltip-message {\n  color: #000;\n  font-size: 0.85em;\n  height: 0px;\n  padding-top: 6px;\n  margin-bottom: -6px;\n}\n.vf-tooltip-btn {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-48%);\n  width: 23px;\n  height: 23px;\n  color: #fff;\n  font-weight: bold;\n  font-size: 14px;\n  opacity: 0.6;\n}\n.vf-tooltip-btn.active {\n  opacity: 0.8;\n}\n.vf-tooltip-btn:hover {\n  opacity: 1;\n}\n.vf-tooltip-icon {\n  position: relative;\n}\n.vf-tooltip-bkg {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  height: 95%;\n  background: #000;\n  border-radius: 23px;\n}\n.vf-slide-enter-active,\n.vf-slide-leave-active {\n  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 160ms;\n}\n.vf-slide-enter-to,\n.vf-slide-leave {\n  opacity: 1;\n}\n.vf-slide-enter,\n.vf-slide-leave-to {\n  opacity: 0;\n  transform: translateY(-8px);\n}\n.vf-inputfield {\n  width: 100%;\n  color: #000;\n}\n.vf-inputfield label {\n  display: block;\n  position: relative;\n  margin-bottom: 5px;\n}\n.vf-inputfield .input-wrap {\n  position: relative;\n}\n.vf-inputfield input {\n  width: 100%;\n  height: calc(46.478873239436616px + 0.938967136150235vw);\n  padding-left: calc(10.943661971830986px + 0.28169014084507vw);\n  padding-right: calc(10.943661971830986px + 0.28169014084507vw);\n  outline: 1px solid rgba(0,0,0,0.2);\n  border: none;\n  border-radius: 8px;\n  transition: color 200ms;\n}\n@media (max-width: 375px) {\n.vf-inputfield input {\n    height: 50px;\n}\n}\n@media (min-width: 1440px) {\n.vf-inputfield input {\n    height: 60px;\n}\n}\n@media (max-width: 375px) {\n.vf-inputfield input {\n    padding-left: 12px;\n    padding-right: 12px;\n}\n}\n@media (min-width: 1440px) {\n.vf-inputfield input {\n    padding-left: 15px;\n    padding-right: 15px;\n}\n}\n@media (hover: hover) {\n.vf-inputfield input:not([disabled]):hover {\n    outline-color: rgba(64,96,176,0.4);\n    color: #000;\n    background: rgba(64,96,176,0.01);\n}\n}\n.vf-inputfield input:not([disabled]):focus {\n  transition-duration: 100ms;\n  outline-color: rgba(64,96,176,0.6);\n  color: #000;\n  background: rgba(64,96,176,0.03);\n  outline-offset: 0px;\n}\n.vf-inputfield input.error {\n  outline-color: rgba(236,28,35,0.6);\n  color: #ec1c23;\n  background: rgba(236,28,35,0.03);\n}\n.vf-inputfield input[disabled],\n.vf-inputfield input[disabled]::placeholder {\n  color: #808080;\n  opacity: 1;\n}\n.vf-inputfield input::-webkit-outer-spin-button,\n.vf-inputfield input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.vf-inputfield input [type=number] {\n  -moz-appearance: textfield;\n}\n.vf-inputfield input:focus::placeholder {\n  color: transparent;\n}\n", ""]);



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".vf-field {\n  margin-bottom: 40px;\n}\n.vf-error-message {\n  color: #ec1c23;\n  font-size: 0.85em;\n  height: 0px;\n  padding-top: 6px;\n  margin-bottom: -6px;\n}\n.vf-tooltip-message {\n  color: #000;\n  font-size: 0.85em;\n  height: 0px;\n  padding-top: 6px;\n  margin-bottom: -6px;\n}\n.vf-tooltip-btn {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-48%);\n  width: 23px;\n  height: 23px;\n  color: #fff;\n  font-weight: bold;\n  font-size: 14px;\n  opacity: 0.6;\n}\n.vf-tooltip-btn.active {\n  opacity: 0.8;\n}\n.vf-tooltip-btn:hover {\n  opacity: 1;\n}\n.vf-tooltip-icon {\n  position: relative;\n}\n.vf-tooltip-bkg {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  height: 95%;\n  background: #000;\n  border-radius: 23px;\n}\n.vf-slide-enter-active,\n.vf-slide-leave-active {\n  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 160ms;\n}\n.vf-slide-enter-to,\n.vf-slide-leave {\n  opacity: 1;\n}\n.vf-slide-enter,\n.vf-slide-leave-to {\n  opacity: 0;\n  transform: translateY(-8px);\n}\n.vf-select {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  width: 100%;\n}\n.vf-select label {\n  color: #000;\n  display: block;\n  padding-bottom: 5px;\n}\n.vf-select .select {\n  position: relative;\n}\n.vf-select select {\n  min-width: 250px;\n  border: none;\n  cursor: pointer;\n  display: block;\n  font-weight: bold;\n  color: #000;\n  width: 100%;\n  height: calc(46.478873239436616px + 0.938967136150235vw);\n  padding-left: calc(10.943661971830986px + 0.28169014084507vw);\n  padding-right: calc(10.943661971830986px + 0.28169014084507vw);\n  outline: 1px solid rgba(0,0,0,0.2);\n  border-radius: 8px;\n}\n@media (max-width: 375px) {\n.vf-select select {\n    height: 50px;\n}\n}\n@media (min-width: 1440px) {\n.vf-select select {\n    height: 60px;\n}\n}\n@media (max-width: 375px) {\n.vf-select select {\n    padding-left: 12px;\n    padding-right: 12px;\n}\n}\n@media (min-width: 1440px) {\n.vf-select select {\n    padding-left: 15px;\n    padding-right: 15px;\n}\n}\n@media (hover: hover) {\n.vf-select select:not([disabled]):hover {\n    outline-color: rgba(64,96,176,0.4);\n    color: #000;\n    background: rgba(64,96,176,0.01);\n}\n}\n.vf-select select:not([disabled]):focus,\n.vf-select select:not([disabled]):active {\n  transition-duration: 100ms;\n  outline: 1px solid rgba(64,96,176,0.6);\n  color: #000;\n  background: rgba(64,96,176,0.03);\n  outline-offset: 0px;\n}\n.vf-select select.error {\n  outline-color: rgba(236,28,35,0.6);\n  color: #ec1c23;\n  background: rgba(236,28,35,0.03);\n}\n.vf-select select[disabled],\n.vf-select select[disabled]::placeholder {\n  color: #808080;\n  opacity: 1;\n}\n.vf-select .icon {\n  position: absolute;\n  display: block;\n  color: #000;\n  right: calc(10.943661971830986px + 0.28169014084507vw);\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n}\n@media (max-width: 375px) {\n.vf-select .icon {\n    right: 12px;\n}\n}\n@media (min-width: 1440px) {\n.vf-select .icon {\n    right: 15px;\n}\n}\n.vf-select .vf-tooltip-btn {\n  right: 42px;\n}\n", ""]);



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".vf-field {\n  margin-bottom: 40px;\n}\n.vf-error-message {\n  color: #ec1c23;\n  font-size: 0.85em;\n  height: 0px;\n  padding-top: 6px;\n  margin-bottom: -6px;\n}\n.vf-tooltip-message {\n  color: #000;\n  font-size: 0.85em;\n  height: 0px;\n  padding-top: 6px;\n  margin-bottom: -6px;\n}\n.vf-tooltip-btn {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-48%);\n  width: 23px;\n  height: 23px;\n  color: #fff;\n  font-weight: bold;\n  font-size: 14px;\n  opacity: 0.6;\n}\n.vf-tooltip-btn.active {\n  opacity: 0.8;\n}\n.vf-tooltip-btn:hover {\n  opacity: 1;\n}\n.vf-tooltip-icon {\n  position: relative;\n}\n.vf-tooltip-bkg {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  height: 95%;\n  background: #000;\n  border-radius: 23px;\n}\n.vf-slide-enter-active,\n.vf-slide-leave-active {\n  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 160ms;\n}\n.vf-slide-enter-to,\n.vf-slide-leave {\n  opacity: 1;\n}\n.vf-slide-enter,\n.vf-slide-leave-to {\n  opacity: 0;\n  transform: translateY(-8px);\n}\n.vf-checkbox {\n  color: #000;\n}\n.vf-checkbox .checkbox-wrap {\n  display: flex;\n  align-items: flex-start;\n  cursor: pointer;\n}\n.vf-checkbox .checkbox-bkg {\n  display: block;\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n  position: relative;\n  margin-right: calc(10.943661971830986px + 0.28169014084507vw);\n  outline: 1px solid rgba(0,0,0,0.2);\n}\n@media (max-width: 375px) {\n.vf-checkbox .checkbox-bkg {\n    margin-right: 12px;\n}\n}\n@media (min-width: 1440px) {\n.vf-checkbox .checkbox-bkg {\n    margin-right: 15px;\n}\n}\n.vf-checkbox .checkbox-icon {\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 6px;\n  top: 3px;\n  opacity: 0;\n  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms;\n  transform-origin: 20% 80%;\n  transform: scale(0.3, 0.3);\n}\n.vf-checkbox svg path {\n  fill: #000;\n}\n.vf-checkbox input[type=checkbox] {\n  opacity: 0;\n  width: 0;\n}\n.vf-checkbox .label {\n  padding-top: 5px;\n  position: relative;\n}\n.vf-checkbox.vf-checkbox .label {\n  padding-right: 38px;\n}\n.vf-checkbox input:checked ~ .checkbox-bkg .checkbox-icon {\n  opacity: 1;\n  transform: scale(1, 1);\n}\n.vf-checkbox input.focus-visible ~ .checkbox-bkg {\n  outline-color: rgba(64,96,176,0.6);\n  background: rgba(64,96,176,0.01);\n}\n.vf-checkbox .checkbox:hover .checkbox-bkg {\n  background: rgba(64,96,176,0.01);\n  outline-color: rgba(64,96,176,0.4);\n}\n.vf-checkbox.error .checkbox-bkg {\n  background: rgba(236,28,35,0.03);\n  outline-color: rgba(236,28,35,0.6);\n}\n.vf-checkbox .error-message {\n  padding-top: 10px;\n}\n.vf-checkbox .vf-tooltip-btn {\n  right: 0px;\n}\n", ""]);



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_checkbox_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_checkbox_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_checkbox_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "VueForm", function() { return /* reexport */ components_form; });
__webpack_require__.d(__webpack_exports__, "InputField", function() { return /* reexport */ input; });
__webpack_require__.d(__webpack_exports__, "SelectField", function() { return /* reexport */ components_select; });
__webpack_require__.d(__webpack_exports__, "CheckboxField", function() { return /* reexport */ components_checkbox; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form.vue?vue&type=template&id=230f5a58&lang=pug&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "vf-form",
      attrs: { id: _vm.id },
      on: {
        submit: function ($event) {
          $event.preventDefault()
          return _vm.onSubmit.apply(null, arguments)
        },
      },
    },
    [
      _vm._t("default", null, {
        submitting: _vm.submitting,
        submitted: _vm.submitted,
        success: _vm.success,
        error: _vm.error,
        validationError: _vm.validationError,
        form: _vm.form,
      }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/form.vue?vue&type=template&id=230f5a58&lang=pug&

// EXTERNAL MODULE: external "tiny-emitter/instance"
var instance_ = __webpack_require__(0);
var instance_default = /*#__PURE__*/__webpack_require__.n(instance_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/coffee-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form.vue?vue&type=script&lang=coffee&

/* harmony default export */ var formvue_type_script_lang_coffee_ = ({
  name: 'VueForm',
  // Provide @id to form fields so that they can include @id with their tiny-emitter events.
  provide: function () {
    return {
      id: this.id
    };
  },
  props: {
    // @id must be unique from all other forms on this page.
    // We include @id on all tiny-emitter events and use it to ignore events 
    // emitted by other forms that might be on this page.
    id: {
      type: String
    },
    // Submit callback function
    submit: {
      type: Function
    },
    // Form data object.  For syncing to parent component data, if desired.
    form: {
      type: Object
    }
  },
  data: function () {
    return {
      // Boolean states
      submitting: false,
      error: false,
      success: false,
      validationError: false,
      allFieldsValid: false,
      // Can't be computed prop of @valid because object keys created at runtime aren't reactive
      // Field states (objects keyed by field name)
      formData: {},
      // Form field data
      valid: {} // Whether field values are valid (booleans)

    };
  },
  computed: {
    // Array of field IDs
    fieldIds: function () {
      return Object.keys(this.formData);
    },
    submitted: function () {
      return this.error || this.success;
    }
  },
  mounted: function () {
    // Subscribe to child events
    return instance_default.a.on('vue-form-fieldupdated', this.onFieldUpdated);
  },
  beforeDestroy: function () {
    // Unsubscribe from child events
    return instance_default.a.off('vue-form-fieldupdated', this.onFieldUpdated);
  },
  methods: {
    onSubmit: function () {
      // Sync form data to parent
      this.$emit('update:form', this.formData); // Check if all fields are valid

      this.validateForm();
      return this.$defer(() => {
        if (this.allFieldsValid) {
          // If all fields are valid, then run @submit()
          return this.submit();
        }
      });
    },
    onFieldUpdated: function (args) {
      var id, name, valid, value;
      ({
        id,
        name,
        value,
        valid
      } = args); // Do nothing if this event was emitted from a different form.

      if (id !== this.id) {
        return;
      } // console.log 'fieldEvent', {id, name, value, valid}
      // Save our field's latest value


      this.formData[name] = value;
      this.valid[name] = valid; // Sync our form data to the parent Vue component

      return this.$emit('update:form', this.formData);
    },
    validateForm: function () {
      instance_default.a.emit('vue-form-validatefields', {
        id: this.id
      }); // Wait a tick for subcomponents to send us results

      return this.$defer(() => {
        // If all fields are valid return true
        this.allFieldsValid = Object.values(this.valid).every(function (val) {
          return val;
        });
        return this.allFieldsValid;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/form.vue?vue&type=script&lang=coffee&
 /* harmony default export */ var components_formvue_type_script_lang_coffee_ = (formvue_type_script_lang_coffee_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/form.vue





/* normalize component */

var component = normalizeComponent(
  components_formvue_type_script_lang_coffee_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/form.vue"
/* harmony default export */ var components_form = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/input.vue?vue&type=template&id=45dba22c&lang=pug&
var inputvue_type_template_id_45dba22c_lang_pug_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "vf-field vf-inputfield", on: { focusout: _vm.focusOut } },
    [
      _vm.label
        ? _c(
            "label",
            { staticClass: "vf-label-above", attrs: { for: _vm.name } },
            [_vm._v(_vm._s(_vm.label))]
          )
        : _vm._e(),
      _c(
        "div",
        { staticClass: "input-wrap" },
        [
          _vm.type === "checkbox"
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.value,
                    expression: "value",
                  },
                ],
                class: _vm.classes,
                attrs: {
                  name: _vm.name,
                  id: _vm.name,
                  placeholder: _vm.placeholder,
                  "aria-label": _vm.label,
                  required: _vm.required,
                  disabled: _vm.readonly,
                  autocomplete: _vm.autocomplete,
                  autocorrect: _vm.autocorrect,
                  autocapitalize: _vm.autocapitalize,
                  minlength: _vm.minlength,
                  maxlength: _vm.maxlength,
                  type: "checkbox",
                },
                domProps: {
                  checked: Array.isArray(_vm.value)
                    ? _vm._i(_vm.value, null) > -1
                    : _vm.value,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.value,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.value = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.value = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.value = $$c
                    }
                  },
                },
              })
            : _vm.type === "radio"
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.value,
                    expression: "value",
                  },
                ],
                class: _vm.classes,
                attrs: {
                  name: _vm.name,
                  id: _vm.name,
                  placeholder: _vm.placeholder,
                  "aria-label": _vm.label,
                  required: _vm.required,
                  disabled: _vm.readonly,
                  autocomplete: _vm.autocomplete,
                  autocorrect: _vm.autocorrect,
                  autocapitalize: _vm.autocapitalize,
                  minlength: _vm.minlength,
                  maxlength: _vm.maxlength,
                  type: "radio",
                },
                domProps: { checked: _vm._q(_vm.value, null) },
                on: {
                  change: function ($event) {
                    _vm.value = null
                  },
                },
              })
            : _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.value,
                    expression: "value",
                  },
                ],
                class: _vm.classes,
                attrs: {
                  name: _vm.name,
                  id: _vm.name,
                  placeholder: _vm.placeholder,
                  "aria-label": _vm.label,
                  required: _vm.required,
                  disabled: _vm.readonly,
                  autocomplete: _vm.autocomplete,
                  autocorrect: _vm.autocorrect,
                  autocapitalize: _vm.autocapitalize,
                  minlength: _vm.minlength,
                  maxlength: _vm.maxlength,
                  type: _vm.type,
                },
                domProps: { value: _vm.value },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.value = $event.target.value
                  },
                },
              }),
          _vm.tooltip
            ? _c("tooltip-btn", {
                attrs: { tooltipActive: _vm.tooltipActive },
                nativeOn: {
                  click: function ($event) {
                    return _vm.tooltipClick.apply(null, arguments)
                  },
                },
              })
            : _vm._e(),
        ],
        1
      ),
      _c("transition", { attrs: { name: "vf-slide" } }, [
        _vm.error && !_vm.tooltipActive
          ? _c("div", { staticClass: "vf-error-message" }, [
              _vm._v(_vm._s(_vm.error)),
            ])
          : _vm._e(),
      ]),
      _c("transition", { attrs: { name: "vf-slide" } }, [
        _vm.tooltipActive
          ? _c("div", { staticClass: "vf-tooltip-message" }, [
              _vm._v(_vm._s(_vm.tooltip)),
            ])
          : _vm._e(),
      ]),
    ],
    1
  )
}
var inputvue_type_template_id_45dba22c_lang_pug_staticRenderFns = []
inputvue_type_template_id_45dba22c_lang_pug_render._withStripped = true


// CONCATENATED MODULE: ./src/components/input.vue?vue&type=template&id=45dba22c&lang=pug&

// CONCATENATED MODULE: ./src/concerns/is-field.coffee

/* harmony default export */ var is_field_coffee = ({
  // Common logic for all fields
  props: {
    // Name.  Used for id, label[for], and keying the main form data object.
    name: {
      type: String,
      default: ''
    },
    // Placeholder as well as input name
    label: String,
    // Add html5 attributes
    required: Boolean,
    readonly: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    // Shows a "?" button inside the input which toggles a tooltip message.
    tooltip: {
      type: String
    }
  },
  data: function () {
    return {
      value: '',
      // Tooltip state
      tooltipActive: false
    };
  },
  // Inject @id from form-field
  inject: ['id'],
  computed: {
    commonClasses: function () {
      return [{
        'error': !!this.error,
        'disabled': this.disabled
      }, this.tooltip ? 'has-tooltip' : void 0];
    }
  },
  mounted: function () {
    return this.$defer(() => {
      // On mounted, run sendEvent so that the form has our name, value, and validation status.
      // We must defer so that the form component is ready to receive our event.
      this.sendEvent(); // Listen for events emitted by the form component

      return instance_default.a.on('vue-form-validatefields', this.onValidateFields);
    });
  },
  beforeDestroy: function () {
    // Unsubscribe from child events
    return instance_default.a.off('vue-form-validatefields', this.onValidateFields);
  },
  methods: {
    tooltipClick: function (event) {
      this.tooltipActive = !this.tooltipActive;
      return event.preventDefault();
    },
    // Focusout handler
    // We must defer, or else 'document.activeElement' is sometimes 'body'
    // TODO: figure this out... 100ms is definite code smell
    focusOut: function (event) {
      return this.$wait(100, () => {
        // If keyboard focus is still inside this component (such as the user clicked 
        // from the tooltip to the input), then ignore the event.
        if (this.$el.contains(document.activeElement)) {
          return;
        } // If keyboard focus has left this component, then close the tooltip and validate the input.


        this.tooltipActive = false;
        return this.validate();
      });
    },
    // Send our field information to the form component using tiny-emitter
    sendEvent: function () {
      // console.log 'sendEvent', @name, @value
      return instance_default.a.emit('vue-form-fieldupdated', {
        id: this.id,
        name: this.name,
        value: this.value,
        valid: !this.error
      });
    },
    // Listen for events emitted from the form component
    onValidateFields: function (args) {
      var id;
      ({
        id
      } = args); // Do nothing if this event was emitted from a different form.

      if (id !== this.id) {
        return;
      } // console.log 'formEvent', {type}
      // Form component has asked us to validate our input
      // Clear the error, wait a tick, then validate.
      // This is a hacky way to force the error messages to re-animate and get the user's attention.


      this.error = '';
      return this.$nextTick(() => {
        return this.validate();
      });
    }
  }
});
// CONCATENATED MODULE: ./src/services/validators-regex.coffee
// Regex for validation functions
// Matches a string that is an IPv4 address, or contains one in any position.
// Based off "simple regex" on this page:
// https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
var ipv4Regex = /.*(?:[0-9]{1,3}\.){3}[0-9]{1,3}.*/i; // Matches a string that is an IPv6 address, or contains one in any position.
// https://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses

var ipv6Regex = /.*(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])).*/i; // Very permissive URL regex.
// Matches a string that is ".tld" or contains ".tld" in any position,
// where ".tld" is any valid top-level domain maintained by the IANA.
// The TLDs in this regex were retrieved from the following URL on 11/13/2021:
// https://www.icann.org/resources/pages/tlds-2012-02-25-en

var veryPermissiveUrlRegex = /(?:.*\.(?:AAA|AARP|ABARTH|ABB|ABBOTT|ABBVIE|ABC|ABLE|ABOGADO|ABUDHABI|AC|ACADEMY|ACCENTURE|ACCOUNTANT|ACCOUNTANTS|ACO|ACTOR|AD|ADAC|ADS|ADULT|AE|AEG|AERO|AETNA|AF|AFAMILYCOMPANY|AFL|AFRICA|AG|AGAKHAN|AGENCY|AI|AIG|AIRBUS|AIRFORCE|AIRTEL|AKDN|AL|ALFAROMEO|ALIBABA|ALIPAY|ALLFINANZ|ALLSTATE|ALLY|ALSACE|ALSTOM|AM|AMAZON|AMERICANEXPRESS|AMERICANFAMILY|AMEX|AMFAM|AMICA|AMSTERDAM|ANALYTICS|ANDROID|ANQUAN|ANZ|AO|AOL|APARTMENTS|APP|APPLE|AQ|AQUARELLE|AR|ARAB|ARAMCO|ARCHI|ARMY|ARPA|ART|ARTE|AS|ASDA|ASIA|ASSOCIATES|AT|ATHLETA|ATTORNEY|AU|AUCTION|AUDI|AUDIBLE|AUDIO|AUSPOST|AUTHOR|AUTO|AUTOS|AVIANCA|AW|AWS|AX|AXA|AZ|AZURE|BA|BABY|BAIDU|BANAMEX|BANANAREPUBLIC|BAND|BANK|BAR|BARCELONA|BARCLAYCARD|BARCLAYS|BAREFOOT|BARGAINS|BASEBALL|BASKETBALL|BAUHAUS|BAYERN|BB|BBC|BBT|BBVA|BCG|BCN|BD|BE|BEATS|BEAUTY|BEER|BENTLEY|BERLIN|BEST|BESTBUY|BET|BF|BG|BH|BHARTI|BI|BIBLE|BID|BIKE|BING|BINGO|BIO|BIZ|BJ|BLACK|BLACKFRIDAY|BLOCKBUSTER|BLOG|BLOOMBERG|BLUE|BM|BMS|BMW|BN|BNPPARIBAS|BO|BOATS|BOEHRINGER|BOFA|BOM|BOND|BOO|BOOK|BOOKING|BOSCH|BOSTIK|BOSTON|BOT|BOUTIQUE|BOX|BR|BRADESCO|BRIDGESTONE|BROADWAY|BROKER|BROTHER|BRUSSELS|BS|BT|BUDAPEST|BUGATTI|BUILD|BUILDERS|BUSINESS|BUY|BUZZ|BV|BW|BY|BZ|BZH|CA|CAB|CAFE|CAL|CALL|CALVINKLEIN|CAM|CAMERA|CAMP|CANCERRESEARCH|CANON|CAPETOWN|CAPITAL|CAPITALONE|CAR|CARAVAN|CARDS|CARE|CAREER|CAREERS|CARS|CASA|CASE|CASH|CASINO|CAT|CATERING|CATHOLIC|CBA|CBN|CBRE|CBS|CC|CD|CENTER|CEO|CERN|CF|CFA|CFD|CG|CH|CHANEL|CHANNEL|CHARITY|CHASE|CHAT|CHEAP|CHINTAI|CHRISTMAS|CHROME|CHURCH|CI|CIPRIANI|CIRCLE|CISCO|CITADEL|CITI|CITIC|CITY|CITYEATS|CK|CL|CLAIMS|CLEANING|CLICK|CLINIC|CLINIQUE|CLOTHING|CLOUD|CLUB|CLUBMED|CM|CN|CO|COACH|CODES|COFFEE|COLLEGE|COLOGNE|COM|COMCAST|COMMBANK|COMMUNITY|COMPANY|COMPARE|COMPUTER|COMSEC|CONDOS|CONSTRUCTION|CONSULTING|CONTACT|CONTRACTORS|COOKING|COOKINGCHANNEL|COOL|COOP|CORSICA|COUNTRY|COUPON|COUPONS|COURSES|CPA|CR|CREDIT|CREDITCARD|CREDITUNION|CRICKET|CROWN|CRS|CRUISE|CRUISES|CSC|CU|CUISINELLA|CV|CW|CX|CY|CYMRU|CYOU|CZ|DABUR|DAD|DANCE|DATA|DATE|DATING|DATSUN|DAY|DCLK|DDS|DE|DEAL|DEALER|DEALS|DEGREE|DELIVERY|DELL|DELOITTE|DELTA|DEMOCRAT|DENTAL|DENTIST|DESI|DESIGN|DEV|DHL|DIAMONDS|DIET|DIGITAL|DIRECT|DIRECTORY|DISCOUNT|DISCOVER|DISH|DIY|DJ|DK|DM|DNP|DO|DOCS|DOCTOR|DOG|DOMAINS|DOT|DOWNLOAD|DRIVE|DTV|DUBAI|DUCK|DUNLOP|DUPONT|DURBAN|DVAG|DVR|DZ|EARTH|EAT|EC|ECO|EDEKA|EDU|EDUCATION|EE|EG|EMAIL|EMERCK|ENERGY|ENGINEER|ENGINEERING|ENTERPRISES|EPSON|EQUIPMENT|ER|ERICSSON|ERNI|ES|ESQ|ESTATE|ET|ETISALAT|EU|EUROVISION|EUS|EVENTS|EXCHANGE|EXPERT|EXPOSED|EXPRESS|EXTRASPACE|FAGE|FAIL|FAIRWINDS|FAITH|FAMILY|FAN|FANS|FARM|FARMERS|FASHION|FAST|FEDEX|FEEDBACK|FERRARI|FERRERO|FI|FIAT|FIDELITY|FIDO|FILM|FINAL|FINANCE|FINANCIAL|FIRE|FIRESTONE|FIRMDALE|FISH|FISHING|FIT|FITNESS|FJ|FK|FLICKR|FLIGHTS|FLIR|FLORIST|FLOWERS|FLY|FM|FO|FOO|FOOD|FOODNETWORK|FOOTBALL|FORD|FOREX|FORSALE|FORUM|FOUNDATION|FOX|FR|FREE|FRESENIUS|FRL|FROGANS|FRONTDOOR|FRONTIER|FTR|FUJITSU|FUN|FUND|FURNITURE|FUTBOL|FYI|GA|GAL|GALLERY|GALLO|GALLUP|GAME|GAMES|GAP|GARDEN|GAY|GB|GBIZ|GD|GDN|GE|GEA|GENT|GENTING|GEORGE|GF|GG|GGEE|GH|GI|GIFT|GIFTS|GIVES|GIVING|GL|GLADE|GLASS|GLE|GLOBAL|GLOBO|GM|GMAIL|GMBH|GMO|GMX|GN|GODADDY|GOLD|GOLDPOINT|GOLF|GOO|GOODYEAR|GOOG|GOOGLE|GOP|GOT|GOV|GP|GQ|GR|GRAINGER|GRAPHICS|GRATIS|GREEN|GRIPE|GROCERY|GROUP|GS|GT|GU|GUARDIAN|GUCCI|GUGE|GUIDE|GUITARS|GURU|GW|GY|HAIR|HAMBURG|HANGOUT|HAUS|HBO|HDFC|HDFCBANK|HEALTH|HEALTHCARE|HELP|HELSINKI|HERE|HERMES|HGTV|HIPHOP|HISAMITSU|HITACHI|HIV|HK|HKT|HM|HN|HOCKEY|HOLDINGS|HOLIDAY|HOMEDEPOT|HOMEGOODS|HOMES|HOMESENSE|HONDA|HORSE|HOSPITAL|HOST|HOSTING|HOT|HOTELES|HOTELS|HOTMAIL|HOUSE|HOW|HR|HSBC|HT|HU|HUGHES|HYATT|HYUNDAI|IBM|ICBC|ICE|ICU|ID|IE|IEEE|IFM|IKANO|IL|IM|IMAMAT|IMDB|IMMO|IMMOBILIEN|IN|INC|INDUSTRIES|INFINITI|INFO|ING|INK|INSTITUTE|INSURANCE|INSURE|INT|INTERNATIONAL|INTUIT|INVESTMENTS|IO|IPIRANGA|IQ|IR|IRISH|IS|ISMAILI|IST|ISTANBUL|IT|ITAU|ITV|JAGUAR|JAVA|JCB|JE|JEEP|JETZT|JEWELRY|JIO|JLL|JM|JMP|JNJ|JO|JOBS|JOBURG|JOT|JOY|JP|JPMORGAN|JPRS|JUEGOS|JUNIPER|KAUFEN|KDDI|KE|KERRYHOTELS|KERRYLOGISTICS|KERRYPROPERTIES|KFH|KG|KH|KI|KIA|KIM|KINDER|KINDLE|KITCHEN|KIWI|KM|KN|KOELN|KOMATSU|KOSHER|KP|KPMG|KPN|KR|KRD|KRED|KUOKGROUP|KW|KY|KYOTO|KZ|LA|LACAIXA|LAMBORGHINI|LAMER|LANCASTER|LANCIA|LAND|LANDROVER|LANXESS|LASALLE|LAT|LATINO|LATROBE|LAW|LAWYER|LB|LC|LDS|LEASE|LECLERC|LEFRAK|LEGAL|LEGO|LEXUS|LGBT|LI|LIDL|LIFE|LIFEINSURANCE|LIFESTYLE|LIGHTING|LIKE|LILLY|LIMITED|LIMO|LINCOLN|LINDE|LINK|LIPSY|LIVE|LIVING|LIXIL|LK|LLC|LLP|LOAN|LOANS|LOCKER|LOCUS|LOFT|LOL|LONDON|LOTTE|LOTTO|LOVE|LPL|LPLFINANCIAL|LR|LS|LT|LTD|LTDA|LU|LUNDBECK|LUXE|LUXURY|LV|LY|MA|MACYS|MADRID|MAIF|MAISON|MAKEUP|MAN|MANAGEMENT|MANGO|MAP|MARKET|MARKETING|MARKETS|MARRIOTT|MARSHALLS|MASERATI|MATTEL|MBA|MC|MCKINSEY|MD|ME|MED|MEDIA|MEET|MELBOURNE|MEME|MEMORIAL|MEN|MENU|MERCKMSD|MG|MH|MIAMI|MICROSOFT|MIL|MINI|MINT|MIT|MITSUBISHI|MK|ML|MLB|MLS|MM|MMA|MN|MO|MOBI|MOBILE|MODA|MOE|MOI|MOM|MONASH|MONEY|MONSTER|MORMON|MORTGAGE|MOSCOW|MOTO|MOTORCYCLES|MOV|MOVIE|MP|MQ|MR|MS|MSD|MT|MTN|MTR|MU|MUSEUM|MUTUAL|MV|MW|MX|MY|MZ|NA|NAB|NAGOYA|NAME|NATURA|NAVY|NBA|NC|NE|NEC|NET|NETBANK|NETFLIX|NETWORK|NEUSTAR|NEW|NEWS|NEXT|NEXTDIRECT|NEXUS|NF|NFL|NG|NGO|NHK|NI|NICO|NIKE|NIKON|NINJA|NISSAN|NISSAY|NL|NO|NOKIA|NORTHWESTERNMUTUAL|NORTON|NOW|NOWRUZ|NOWTV|NP|NR|NRA|NRW|NTT|NU|NYC|NZ|OBI|OBSERVER|OFF|OFFICE|OKINAWA|OLAYAN|OLAYANGROUP|OLDNAVY|OLLO|OM|OMEGA|ONE|ONG|ONL|ONLINE|OOO|OPEN|ORACLE|ORANGE|ORG|ORGANIC|ORIGINS|OSAKA|OTSUKA|OTT|OVH|PA|PAGE|PANASONIC|PARIS|PARS|PARTNERS|PARTS|PARTY|PASSAGENS|PAY|PCCW|PE|PET|PF|PFIZER|PG|PH|PHARMACY|PHD|PHILIPS|PHONE|PHOTO|PHOTOGRAPHY|PHOTOS|PHYSIO|PICS|PICTET|PICTURES|PID|PIN|PING|PINK|PIONEER|PIZZA|PK|PL|PLACE|PLAY|PLAYSTATION|PLUMBING|PLUS|PM|PN|PNC|POHL|POKER|POLITIE|PORN|POST|PR|PRAMERICA|PRAXI|PRESS|PRIME|PRO|PROD|PRODUCTIONS|PROF|PROGRESSIVE|PROMO|PROPERTIES|PROPERTY|PROTECTION|PRU|PRUDENTIAL|PS|PT|PUB|PW|PWC|PY|QA|QPON|QUEBEC|QUEST|RACING|RADIO|RAID|RE|READ|REALESTATE|REALTOR|REALTY|RECIPES|RED|REDSTONE|REDUMBRELLA|REHAB|REISE|REISEN|REIT|RELIANCE|REN|RENT|RENTALS|REPAIR|REPORT|REPUBLICAN|REST|RESTAURANT|REVIEW|REVIEWS|REXROTH|RICH|RICHARDLI|RICOH|RIL|RIO|RIP|RO|ROCHER|ROCKS|RODEO|ROGERS|ROOM|RS|RSVP|RU|RUGBY|RUHR|RUN|RW|RWE|RYUKYU|SA|SAARLAND|SAFE|SAFETY|SAKURA|SALE|SALON|SAMSCLUB|SAMSUNG|SANDVIK|SANDVIKCOROMANT|SANOFI|SAP|SARL|SAS|SAVE|SAXO|SB|SBI|SBS|SC|SCA|SCB|SCHAEFFLER|SCHMIDT|SCHOLARSHIPS|SCHOOL|SCHULE|SCHWARZ|SCIENCE|SCJOHNSON|SCOT|SD|SE|SEARCH|SEAT|SECURE|SECURITY|SEEK|SELECT|SENER|SERVICES|SES|SEVEN|SEW|SEX|SEXY|SFR|SG|SH|SHANGRILA|SHARP|SHAW|SHELL|SHIA|SHIKSHA|SHOES|SHOP|SHOPPING|SHOUJI|SHOW|SHOWTIME|SI|SILK|SINA|SINGLES|SITE|SJ|SK|SKI|SKIN|SKY|SKYPE|SL|SLING|SM|SMART|SMILE|SN|SNCF|SO|SOCCER|SOCIAL|SOFTBANK|SOFTWARE|SOHU|SOLAR|SOLUTIONS|SONG|SONY|SOY|SPA|SPACE|SPORT|SPOT|SR|SRL|SS|ST|STADA|STAPLES|STAR|STATEBANK|STATEFARM|STC|STCGROUP|STOCKHOLM|STORAGE|STORE|STREAM|STUDIO|STUDY|STYLE|SU|SUCKS|SUPPLIES|SUPPLY|SUPPORT|SURF|SURGERY|SUZUKI|SV|SWATCH|SWISS|SX|SY|SYDNEY|SYSTEMS|SZ|TAB|TAIPEI|TALK|TAOBAO|TARGET|TATAMOTORS|TATAR|TATTOO|TAX|TAXI|TC|TCI|TD|TDK|TEAM|TECH|TECHNOLOGY|TEL|TEMASEK|TENNIS|TEVA|TF|TG|TH|THD|THEATER|THEATRE|TIAA|TICKETS|TIENDA|TIFFANY|TIPS|TIRES|TIROL|TJ|TJMAXX|TJX|TK|TKMAXX|TL|TM|TMALL|TN|TO|TODAY|TOKYO|TOOLS|TOP|TORAY|TOSHIBA|TOTAL|TOURS|TOWN|TOYOTA|TOYS|TR|TRADE|TRADING|TRAINING|TRAVEL|TRAVELCHANNEL|TRAVELERS|TRAVELERSINSURANCE|TRUST|TRV|TT|TUBE|TUI|TUNES|TUSHU|TV|TVS|TW|TZ|UA|UBANK|UBS|UG|UK|UNICOM|UNIVERSITY|UNO|UOL|UPS|US|UY|UZ|VA|VACATIONS|VANA|VANGUARD|VC|VE|VEGAS|VENTURES|VERISIGN|VERSICHERUNG|VET|VG|VI|VIAJES|VIDEO|VIG|VIKING|VILLAS|VIN|VIP|VIRGIN|VISA|VISION|VIVA|VIVO|VLAANDEREN|VN|VODKA|VOLKSWAGEN|VOLVO|VOTE|VOTING|VOTO|VOYAGE|VU|VUELOS|WALES|WALMART|WALTER|WANG|WANGGOU|WATCH|WATCHES|WEATHER|WEATHERCHANNEL|WEBCAM|WEBER|WEBSITE|WED|WEDDING|WEIBO|WEIR|WF|WHOSWHO|WIEN|WIKI|WILLIAMHILL|WIN|WINDOWS|WINE|WINNERS|WME|WOLTERSKLUWER|WOODSIDE|WORK|WORKS|WORLD|WOW|WS|WTC|WTF|XBOX|XEROX|XFINITY|XIHUAN|XIN|XN--11B4C3D|XN--1CK2E1B|XN--1QQW23A|XN--2SCRJ9C|XN--30RR7Y|XN--3BST00M|XN--3DS443G|XN--3E0B707E|XN--3HCRJ9C|XN--3OQ18VL8PN36A|XN--3PXU8K|XN--42C2D9A|XN--45BR5CYL|XN--45BRJ9C|XN--45Q11C|XN--4DBRK0CE|XN--4GBRIM|XN--54B7FTA0CC|XN--55QW42G|XN--55QX5D|XN--5SU34J936BGSG|XN--5TZM5G|XN--6FRZ82G|XN--6QQ986B3XL|XN--80ADXHKS|XN--80AO21A|XN--80AQECDR1A|XN--80ASEHDB|XN--80ASWG|XN--8Y0A063A|XN--90A3AC|XN--90AE|XN--90AIS|XN--9DBQ2A|XN--9ET52U|XN--9KRT00A|XN--B4W605FERD|XN--BCK1B9A5DRE4C|XN--C1AVG|XN--C2BR7G|XN--CCK2B3B|XN--CCKWCXETD|XN--CG4BKI|XN--CLCHC0EA0B2G2A9GCD|XN--CZR694B|XN--CZRS0T|XN--CZRU2D|XN--D1ACJ3B|XN--D1ALF|XN--E1A4C|XN--ECKVDTC9D|XN--EFVY88H|XN--FCT429K|XN--FHBEI|XN--FIQ228C5HS|XN--FIQ64B|XN--FIQS8S|XN--FIQZ9S|XN--FJQ720A|XN--FLW351E|XN--FPCRJ9C3D|XN--FZC2C9E2C|XN--FZYS8D69UVGM|XN--G2XX48C|XN--GCKR3F0F|XN--GECRJ9C|XN--GK3AT1E|XN--H2BREG3EVE|XN--H2BRJ9C|XN--H2BRJ9C8C|XN--HXT814E|XN--I1B6B1A6A2E|XN--IMR513N|XN--IO0A7I|XN--J1AEF|XN--J1AMH|XN--J6W193G|XN--JLQ480N2RG|XN--JLQ61U9W7B|XN--JVR189M|XN--KCRX77D1X4A|XN--KPRW13D|XN--KPRY57D|XN--KPUT3I|XN--L1ACC|XN--LGBBAT1AD8J|XN--MGB9AWBF|XN--MGBA3A3EJT|XN--MGBA3A4F16A|XN--MGBA7C0BBN0A|XN--MGBAAKC7DVF|XN--MGBAAM7A8H|XN--MGBAB2BD|XN--MGBAH1A3HJKRD|XN--MGBAI9AZGQP6J|XN--MGBAYH7GPA|XN--MGBBH1A|XN--MGBBH1A71E|XN--MGBC0A9AZCG|XN--MGBCA7DZDO|XN--MGBCPQ6GPA1A|XN--MGBERP4A5D4AR|XN--MGBGU82A|XN--MGBI4ECEXP|XN--MGBPL2FH|XN--MGBT3DHD|XN--MGBTX2B|XN--MGBX4CD0AB|XN--MIX891F|XN--MK1BU44C|XN--MXTQ1M|XN--NGBC5AZD|XN--NGBE9E0A|XN--NGBRX|XN--NODE|XN--NQV7F|XN--NQV7FS00EMA|XN--NYQY26A|XN--O3CW4H|XN--OGBPF8FL|XN--OTU796D|XN--P1ACF|XN--P1AI|XN--PGBS0DH|XN--PSSY2U|XN--Q7CE6A|XN--Q9JYB4C|XN--QCKA1PMC|XN--QXA6A|XN--QXAM|XN--RHQV96G|XN--ROVU88B|XN--RVC1E0AM3E|XN--S9BRJ9C|XN--SES554G|XN--T60B56A|XN--TCKWE|XN--TIQ49XQYJ|XN--UNUP4Y|XN--VERMGENSBERATER-CTB|XN--VERMGENSBERATUNG-PWB|XN--VHQUV|XN--VUQ861B|XN--W4R85EL8FHU5DNRA|XN--W4RS40L|XN--WGBH1C|XN--WGBL6A|XN--XHQ521B|XN--XKC2AL3HYE2A|XN--XKC2DL3A5EE0H|XN--Y9A3AQ|XN--YFRO4I67O|XN--YGBI2AMMX|XN--ZFR164B|XXX|XYZ|YACHTS|YAHOO|YAMAXUN|YANDEX|YE|YODOBASHI|YOGA|YOKOHAMA|YOU|YOUTUBE|YT|YUN|ZA|ZAPPOS|ZARA|ZERO|ZIP|ZM|ZONE|ZUERICH|ZW).*)/i;
// CONCATENATED MODULE: ./src/services/validators.coffee
// Vuetify-style validator functions
// Functions should return true (valid input), false (invalid input) or a string error message (invalid input).
 // Must be a valid email address

var email = function (val) {
  return /\S+@\S+\.\S+/.test(val) || 'Error: Not a valid email';
}; // Must not be empty or unchecked

var required = function (val) {
  // Checkbox
  if (typeof val === 'boolean') {
    return val || 'Error: This field is required';
  }

  return !!(val != null ? typeof val.trim === "function" ? val.trim() : void 0 : void 0) || 'Error: This field is required';
}; // Must be a URL

var url = function (val) {
  return veryPermissiveUrlRegex.test(val) || 'Error: Not a valid URL';
}; // Must not be a URL

var notUrl = function (val) {
  return !veryPermissiveUrlRegex.test(val) || 'Error: You may not enter a URL';
}; // Must be an IP address

var ipAddress = function (val) {
  return ipv4Regex.test(val) || ipv6Regex.test(val) || 'Error: Not a valid IP address';
}; // Must not be an IP address

var notIpAddress = function (val) {
  return !(ipv4Regex.test(val) || ipv6Regex.test(val)) || 'Error: You may not enter an IP address';
};
// CONCATENATED MODULE: ./src/concerns/has-validation.coffee

/* harmony default export */ var has_validation_coffee = ({
  props: {
    // Pass in array of validators to this field.
    // Each validator can be a string (if using a validator provided in this package)
    // or a function (custom validator)
    rules: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data: function () {
    return {
      // Validation error message
      error: ''
    };
  },
  watch: {
    // Validate this field immediately each time the field value changes.
    value: function () {
      // console.log "watch value. validate...", @value
      return this.validate();
    }
  },
  methods: {
    // Our main validation function
    validate: function () {
      var errorMessage, passedAllRules, ref;

      if (!((ref = this.rules) != null ? ref.length : void 0)) {
        this.error = '';
        this.sendEvent();
        return true;
      } // Loop through rules, running each function on the field value.
      // Each function returns true if valid, or a string with the validation error message.
      // On first validation failure, save errorMessage and stop the loop.


      errorMessage = '';
      passedAllRules = this.rules.every((ruleArg, index) => {
        var rule;
        rule = this.getRuleFunction(ruleArg);
        errorMessage = rule(this.value); // Default message if ruleFunction returns false

        if (errorMessage === false) {
          errorMessage = "Error: This field is invalid";
        }

        return errorMessage === true;
      }); // If we passed validation, clear the error message and return true

      if (passedAllRules) {
        this.error = '';
        this.sendEvent();
        return true;
      }

      if (!this.$el.contains(document.activeElement)) {
        this.error = errorMessage;
      }

      this.sendEvent();
      return false;
    },
    // Look up validator function from a string
    getRuleFunction: function (rule) {
      if (typeof rule === 'function') {
        return rule;
      }

      switch (rule) {
        case 'required':
          return required;

        case 'email':
          return email;

        case 'notUrl':
          return notUrl;

        case 'notIpAddress':
          return notIpAddress;

        default:
          console.warn(`Couldn't find validator rule for ${rule}`); // Fallback function that always returns true

          return () => {
            return true;
          };
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/tooltip-btn.vue?vue&type=template&id=549576b2&lang=pug&
var tooltip_btnvue_type_template_id_549576b2_lang_pug_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    { staticClass: "vf-tooltip-btn", class: _vm.tooltipActive ? "active" : "" },
    [
      _c("div", { staticClass: "vf-tooltip-bkg" }),
      _c("div", { staticClass: "vf-tooltip-icon" }, [_vm._v("?")]),
    ]
  )
}
var tooltip_btnvue_type_template_id_549576b2_lang_pug_staticRenderFns = []
tooltip_btnvue_type_template_id_549576b2_lang_pug_render._withStripped = true


// CONCATENATED MODULE: ./src/components/tooltip-btn.vue?vue&type=template&id=549576b2&lang=pug&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/coffee-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/tooltip-btn.vue?vue&type=script&lang=coffee&
/* harmony default export */ var tooltip_btnvue_type_script_lang_coffee_ = ({
  props: {
    tooltipActive: Boolean
  }
}); // 	data: ->
// 	computed:
// 	watch:
// 	methods:
// CONCATENATED MODULE: ./src/components/tooltip-btn.vue?vue&type=script&lang=coffee&
 /* harmony default export */ var components_tooltip_btnvue_type_script_lang_coffee_ = (tooltip_btnvue_type_script_lang_coffee_); 
// CONCATENATED MODULE: ./src/components/tooltip-btn.vue





/* normalize component */

var tooltip_btn_component = normalizeComponent(
  components_tooltip_btnvue_type_script_lang_coffee_,
  tooltip_btnvue_type_template_id_549576b2_lang_pug_render,
  tooltip_btnvue_type_template_id_549576b2_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var tooltip_btn_api; }
tooltip_btn_component.options.__file = "src/components/tooltip-btn.vue"
/* harmony default export */ var tooltip_btn = (tooltip_btn_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/coffee-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/input.vue?vue&type=script&lang=coffee&



/* harmony default export */ var inputvue_type_script_lang_coffee_ = ({
  name: 'InputField',
  mixins: [is_field_coffee, has_validation_coffee],
  components: {
    TooltipBtn: tooltip_btn
  },
  props: {
    // Type of textfield
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: null
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'on'
    },
    autocapitalize: {
      type: String,
      default: 'on'
    },
    minlength: {
      type: String,
      default: '1'
    },
    maxlength: {
      type: String,
      default: '100'
    }
  },
  computed: {
    classes: function () {
      return [...this.commonClasses];
    }
  }
});
// CONCATENATED MODULE: ./src/components/input.vue?vue&type=script&lang=coffee&
 /* harmony default export */ var components_inputvue_type_script_lang_coffee_ = (inputvue_type_script_lang_coffee_); 
// EXTERNAL MODULE: ./src/components/input.vue?vue&type=style&index=0&lang=stylus&
var inputvue_type_style_index_0_lang_stylus_ = __webpack_require__(5);

// CONCATENATED MODULE: ./src/components/input.vue






/* normalize component */

var input_component = normalizeComponent(
  components_inputvue_type_script_lang_coffee_,
  inputvue_type_template_id_45dba22c_lang_pug_render,
  inputvue_type_template_id_45dba22c_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var input_api; }
input_component.options.__file = "src/components/input.vue"
/* harmony default export */ var input = (input_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select.vue?vue&type=template&id=1279210c&lang=pug&
var selectvue_type_template_id_1279210c_lang_pug_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "vf-field vf-select", on: { focusout: _vm.focusOut } },
    [
      _c("label", { staticClass: "vf-label-above", attrs: { for: _vm.name } }, [
        _vm._v(_vm._s(_vm.label)),
      ]),
      _c(
        "div",
        { staticClass: "select" },
        [
          _vm.options.length
            ? _c(
                "select",
                {
                  class: _vm.classes,
                  attrs: {
                    id: _vm.name,
                    name: _vm.name,
                    "aria-label": _vm.label,
                    required: _vm.required,
                    disabled: _vm.readonly,
                  },
                },
                [
                  _vm.placeholder
                    ? _c("option", { attrs: { value: "" } }, [
                        _vm._v(_vm._s(_vm.placeholder)),
                      ])
                    : _vm._e(),
                  _vm._l(_vm.optionsComputed, function (option) {
                    return _c("option", { domProps: { value: option.value } }, [
                      _vm._v(_vm._s(option.label)),
                    ])
                  }),
                ],
                2
              )
            : _vm._e(),
          _vm.tooltip
            ? _c("tooltip-btn", {
                attrs: { tooltipActive: _vm.tooltipActive },
                nativeOn: {
                  click: function ($event) {
                    return _vm.tooltipClick.apply(null, arguments)
                  },
                },
              })
            : _vm._e(),
          _c(
            "svg",
            {
              staticClass: "icon",
              attrs: {
                height: "16",
                viewBox: "0 0 16 16",
                width: "16",
                xmlns: "http://www.w3.org/2000/svg",
              },
            },
            [_c("path", { attrs: { d: "m16 5.5-2-2-6 6-6-6-2 2 8 8z" } })]
          ),
        ],
        1
      ),
      _c("transition", { attrs: { name: "vf-slide" } }, [
        _vm.error && !_vm.tooltipActive
          ? _c("div", { staticClass: "vf-error-message" }, [
              _vm._v(_vm._s(_vm.error)),
            ])
          : _vm._e(),
      ]),
      _c("transition", { attrs: { name: "vf-slide" } }, [
        _vm.tooltipActive
          ? _c("div", { staticClass: "vf-tooltip-message" }, [
              _vm._v(_vm._s(_vm.tooltip)),
            ])
          : _vm._e(),
      ]),
    ],
    1
  )
}
var selectvue_type_template_id_1279210c_lang_pug_staticRenderFns = []
selectvue_type_template_id_1279210c_lang_pug_render._withStripped = true


// CONCATENATED MODULE: ./src/components/select.vue?vue&type=template&id=1279210c&lang=pug&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/coffee-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select.vue?vue&type=script&lang=coffee&



/* harmony default export */ var selectvue_type_script_lang_coffee_ = ({
  mixins: [is_field_coffee, has_validation_coffee],
  components: {
    TooltipBtn: tooltip_btn
  },
  props: {
    options: {
      type: Array,
      default: function () {
        return [];
      }
    },
    name: {
      type: String,
      default: ''
    },
    labelAbove: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: [String, Boolean],
      default: '--Choose an option--'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    optionsComputed: function () {
      var ref;
      return (ref = this.options) != null ? ref.map(option => {
        var arr;
        arr = option != null ? typeof option.split === "function" ? option.split(/(?:\s)+(?:\|)+(?:\s)+/) : void 0 : void 0;
        return {
          label: arr != null ? arr[0] : void 0,
          value: (arr != null ? arr[1] : void 0) || (arr != null ? arr[0] : void 0)
        };
      }) : void 0;
    },
    classes: function () {
      return [...this.commonClasses];
    }
  }
});
// CONCATENATED MODULE: ./src/components/select.vue?vue&type=script&lang=coffee&
 /* harmony default export */ var components_selectvue_type_script_lang_coffee_ = (selectvue_type_script_lang_coffee_); 
// EXTERNAL MODULE: ./src/components/select.vue?vue&type=style&index=0&lang=stylus&
var selectvue_type_style_index_0_lang_stylus_ = __webpack_require__(6);

// CONCATENATED MODULE: ./src/components/select.vue






/* normalize component */

var select_component = normalizeComponent(
  components_selectvue_type_script_lang_coffee_,
  selectvue_type_template_id_1279210c_lang_pug_render,
  selectvue_type_template_id_1279210c_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var select_api; }
select_component.options.__file = "src/components/select.vue"
/* harmony default export */ var components_select = (select_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/checkbox.vue?vue&type=template&id=8903635a&lang=pug&
var checkboxvue_type_template_id_8903635a_lang_pug_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "vf-field vf-checkbox",
      class: _vm.classes,
      on: { focusout: _vm.focusOut },
    },
    [
      _c("label", { staticClass: "checkbox-wrap", attrs: { for: _vm.name } }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.value,
              expression: "value",
            },
          ],
          attrs: { type: "checkbox", name: _vm.name, id: _vm.name },
          domProps: {
            checked: Array.isArray(_vm.value)
              ? _vm._i(_vm.value, null) > -1
              : _vm.value,
          },
          on: {
            change: function ($event) {
              var $$a = _vm.value,
                $$el = $event.target,
                $$c = $$el.checked ? true : false
              if (Array.isArray($$a)) {
                var $$v = null,
                  $$i = _vm._i($$a, $$v)
                if ($$el.checked) {
                  $$i < 0 && (_vm.value = $$a.concat([$$v]))
                } else {
                  $$i > -1 &&
                    (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
                }
              } else {
                _vm.value = $$c
              }
            },
          },
        }),
        _c("div", { staticClass: "checkbox-bkg" }, [
          _c("span", { staticClass: "checkbox-icon" }, [
            _c(
              "svg",
              {
                attrs: {
                  viewBox: "0 0 44.27 33.51",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                _c("path", {
                  attrs: {
                    d: "m12.24 33.51a2.25 2.25 0 0 1 -1.58-.64l-10-9.82a2.25 2.25 0 0 1 3.16-3.21l8.41 8.27 28.22-27.47a2.25 2.25 0 1 1 3.14 3.22l-29.78 29a2.24 2.24 0 0 1 -1.57.65z",
                  },
                }),
              ]
            ),
          ]),
        ]),
        _c(
          "div",
          { staticClass: "label" },
          [
            _vm._v(_vm._s(_vm.label)),
            _vm.tooltip
              ? _c("tooltip-btn", {
                  attrs: { tooltipActive: _vm.tooltipActive },
                  nativeOn: {
                    click: function ($event) {
                      return _vm.tooltipClick.apply(null, arguments)
                    },
                  },
                })
              : _vm._e(),
          ],
          1
        ),
      ]),
      _c("transition", { attrs: { name: "vf-slide" } }, [
        _vm.error && !_vm.tooltipActive
          ? _c("div", { staticClass: "vf-error-message" }, [
              _vm._v(_vm._s(_vm.error)),
            ])
          : _vm._e(),
      ]),
      _c("transition", { attrs: { name: "vf-slide" } }, [
        _vm.tooltipActive
          ? _c("div", { staticClass: "vf-tooltip-message" }, [
              _vm._v(_vm._s(_vm.tooltip)),
            ])
          : _vm._e(),
      ]),
    ],
    1
  )
}
var checkboxvue_type_template_id_8903635a_lang_pug_staticRenderFns = []
checkboxvue_type_template_id_8903635a_lang_pug_render._withStripped = true


// CONCATENATED MODULE: ./src/components/checkbox.vue?vue&type=template&id=8903635a&lang=pug&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/coffee-loader!./node_modules/vue-loader/lib??vue-loader-options!./src/components/checkbox.vue?vue&type=script&lang=coffee&



/* harmony default export */ var checkboxvue_type_script_lang_coffee_ = ({
  mixins: [is_field_coffee, has_validation_coffee],
  props: {
    name: String,
    label: String
  },
  components: {
    TooltipBtn: tooltip_btn
  },
  // Sync external v-model
  data: function () {
    return {
      state: this.value
    };
  },
  computed: {
    classes: function () {
      return [this.inverted ? 'inverted' : void 0, ...this.commonClasses];
    }
  },
  watch: {
    value: function () {
      return this.state = this.value;
    },
    state: function () {
      return this.$emit('input', this.state);
    }
  }
});
// CONCATENATED MODULE: ./src/components/checkbox.vue?vue&type=script&lang=coffee&
 /* harmony default export */ var components_checkboxvue_type_script_lang_coffee_ = (checkboxvue_type_script_lang_coffee_); 
// EXTERNAL MODULE: ./src/components/checkbox.vue?vue&type=style&index=0&lang=stylus&
var checkboxvue_type_style_index_0_lang_stylus_ = __webpack_require__(7);

// CONCATENATED MODULE: ./src/components/checkbox.vue






/* normalize component */

var checkbox_component = normalizeComponent(
  components_checkboxvue_type_script_lang_coffee_,
  checkboxvue_type_template_id_8903635a_lang_pug_render,
  checkboxvue_type_template_id_8903635a_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var checkbox_api; }
checkbox_component.options.__file = "src/components/checkbox.vue"
/* harmony default export */ var components_checkbox = (checkbox_component.exports);
// CONCATENATED MODULE: ./index.coffee





/***/ })
/******/ ]);