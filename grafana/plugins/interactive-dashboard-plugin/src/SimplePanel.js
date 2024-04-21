"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var emotion_1 = require("emotion");
var ui_1 = require("@grafana/ui");
exports.SimplePanel = function (_a) {
    var options = _a.options, data = _a.data, width = _a.width, height = _a.height;
    var theme = ui_1.useTheme();
    var styles = getStyles();
    /*
      let color: string;
      switch (options.color) {
        case 'red':
          color = theme.palette.redBase;
          break;
        case 'green':
          color = theme.palette.greenBase;
          break;
        case 'blue':
          color = theme.palette.blue95;
          break;
      }
    */
    return (<div className={emotion_1.cx(styles.wrapper, emotion_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          width: ", "px;\n          height: ", "px;\n        "], ["\n          width: ", "px;\n          height: ", "px;\n        "])), width, height))}>

      <div className="row">
        <br /><br />
        <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto" style={{ backgroundColor: "#2092ed" }}>
          <br />
          <a href="http://localhost:3001/ad" className="ad-item card border-0 card-ad shadow-lg" target="_blank">

            <div className="card-body d-flex align-items-end flex-column text-right">
              <h4>Anomaly detection (AD)</h4>
              <p className="w-75">Anomaly detection</p>
            </div>
          </a>
        </div>


        <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto" style={{ backgroundColor: "#28a745" }}>
          <br />
          <a href="http://localhost:3001/dtm" className="ad-item card border-0 card-statistics shadow-lg" target="_blank">

            <div className="card-body d-flex align-items-end flex-column text-right">
              <h4>Data traffic monitoring (DTM)</h4>
              <p className="w-75">Data traffic monitoring</p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.textBox}>
        {options.showSeriesCount && (<div className={emotion_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              font-size: ", ";\n            "], ["\n              font-size: ", ";\n            "])), theme.typography.size[options.seriesCountSize])}>
            Number of series: {data.series.length}
          </div>)}

      </div>
    </div>);
};
var getStyles = ui_1.stylesFactory(function () {
    return {
        wrapper: emotion_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: relative;\n    "], ["\n      position: relative;\n    "]))),
        svg: emotion_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "], ["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "]))),
        textBox: emotion_1.css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "], ["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "])))
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
