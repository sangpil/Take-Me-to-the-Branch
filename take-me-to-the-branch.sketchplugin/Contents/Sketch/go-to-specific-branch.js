var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/go-to-specific-branch.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/go-to-specific-branch.js":
/*!**************************************!*\
  !*** ./src/go-to-specific-branch.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
 // documentation: https://developer.sketchapp.com/reference/api/

/* harmony default export */ __webpack_exports__["default"] = (function () {
  run();
});
var bootstrapInfo;
var projectId;
var branchId;
var branchName;
var fileId;
var commitId;
var targetObject;
var layerId;
var urlString;

function run() {
  var lastInput = context.command.valueForKey_onDocument_forPluginIdentifier("user_lastBranchID", context.document.documentData(), "com.sangpil.sketch");
  bootstrapInfo = PROSketchBootstrap.documentKey(context.document);
  projectId = bootstrapInfo.split("/")[0];
  branchId = bootstrapInfo.split("/")[1];
  branchName = bootstrapInfo.split("/")[2];
  fileId = bootstrapInfo.split("/")[3];
  commitId = bootstrapInfo.split("/")[4];
  targetObject = context.selection.firstObject();
  layerId = null;

  if (targetObject != null && bootstrapInfo != null) {
    if (targetObject.isKindOfClass(MSArtboardGroup) && targetObject.class() != "MSSymbolMaster") {
      layerId = targetObject.objectID();
    } else if (targetObject.isKindOfClass(MSSymbolMaster) && targetObject.class() == "MSSymbolMaster") {
      layerId = targetObject.symbolID();
    } else if (targetObject.isKindOfClass(MSSymbolInstance)) {
      layerId = targetObject.symbolID();
    } else if (targetObject.isKindOfClass(MSSliceLayer)) {
      layerId = targetObject.objectID();
    } else {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message('Please select an artboard');
    }

    var userInterface = COSAlertWindow.new();
    userInterface.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon-small.png").path()));
    userInterface.setMessageText("Go to specific branch");
    userInterface.setInformativeText("Please copy the Branch ID from Abstract");
    var artboardLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 20));
    artboardLabel.setBezeled(true);
    artboardLabel.setDrawsBackground(true);
    artboardLabel.setEditable(true);
    artboardLabel.setSelectable(true);

    if (lastInput != null) {
      artboardLabel.setStringValue(lastInput);
    } else {
      artboardLabel.setStringValue('');
    }

    artboardLabel.setFont(NSFont.paletteFontOfSize(NSFont.systemFontSize()));
    userInterface.addAccessoryView(artboardLabel);
    userInterface.addButtonWithTitle('Close'); //1000

    userInterface.addButtonWithTitle('GO!'); //1001

    modalHandler(userInterface, userInterface.runModal());
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message('Please select an Artboard or Symbol.');
  }
}

function modalHandler(modal, action) {
  switch (action) {
    case 1000:
      //close
      break;

    case 1001:
      //go!
      var specificBranchID = modal.viewAtIndex(0).stringValue();

      if (specificBranchID != nil && specificBranchID != '') {
        // log(branchID);
        // log("https://app.goabstract.com/projects/"+ projectId +"/branches/"+ branchId +"/commits/"+ commitId +"/files/"+ fileId +"/layers/"+ layerId +"?mode=design");
        context.command.setValue_forKey_onDocument_forPluginIdentifier(specificBranchID, "user_lastBranchID", context.document.documentData(), "com.sangpil.sketch");
        urlString = "https://app.goabstract.com/projects/" + projectId + "/branches/" + specificBranchID + "/commits/" + commitId + "/files/" + fileId + "/layers/" + layerId + "?mode=design";
        openURL(urlString);
      }

      break;

    case 1002:
      //close
      break;

    default:
  }
}

function openURL(url) {
  var nsurl = NSURL.URLWithString(url);
  NSWorkspace.sharedWorkspace().openURL(nsurl);
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=go-to-specific-branch.js.map