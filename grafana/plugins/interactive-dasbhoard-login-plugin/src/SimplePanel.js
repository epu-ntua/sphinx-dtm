"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var emotion_1 = require("emotion");
var ui_1 = require("@grafana/ui");
require("./Navbar.css");
require("./../node_modules/bootstrap/dist/js/bootstrap.js");
require("jquery");
exports.SimplePanel = function (_a) {
    var options = _a.options, data = _a.data, width = _a.width, height = _a.height;
    //const theme = useTheme();
    var styles = getStyles();
    return (<div className={emotion_1.cx(styles.wrapper, emotion_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          width: ", "px;\n          height: ", "px;\n        "], ["\n          width: ", "px;\n          height: ", "px;\n        "])), width, height))}>
      <div className="navbar navbar-expand-lg navbar-light border border-dark">
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">SPHINX toolkit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Alerts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Statistics</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Dashboard
                Settings</a>
            </li>
          </ul>

          <form className="form-inline">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
          </form>

          <button className="btn btn-outline-success my-2border border-dark">Contacts
          </button>

          <button className="btn btn-outline-success border border-dark">LOGIN
          </button>


          <button className="btn btn-outline-success border border-dark"><span className="glyphicon glyphicon-cog"></span></button>

          <button className="btn btn-outline-success border border-dark">EN</button>

        </div>
      </div>
    </div>);
};
var getStyles = ui_1.stylesFactory(function () {
    return {
        wrapper: emotion_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    "], ["\n    "]))),
        svg: emotion_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "], ["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "]))),
        textBox: emotion_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "], ["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "]))),
        li: emotion_1.css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      list-style-type: none;\n      display: inline-block;\n    "], ["\n      list-style-type: none;\n      display: inline-block;\n    "])))
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
