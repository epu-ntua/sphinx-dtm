"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var emotion_1 = require("emotion");
var ui_1 = require("@grafana/ui");
require("./RightPanel.css");
exports.SimplePanel = function (_a) {
  var options = _a.options, data = _a.data, width = _a.width, height = _a.height;
  var styles = getStyles();
  return (<div className={emotion_1.cx(styles.wrapper, emotion_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          width: ", "px;\n          height: ", "px;\n        "], ["\n          width: ", "px;\n          height: ", "px;\n        "])), width, height))}>

    <div className="RightPanel border border-primary">
      <table className="table">
        <thead>
          <tr className="first-row">
            <th scope="col">SPHINX tools</th>
            <th scope="col">DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/ad">
                AD
              </a>
            </th>
            <td>Anomaly Detection</td>
          </tr>
          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                DTM
              </a>
            </th>
            <td>Data Traffic Monitoring</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                AE
              </a>
            </th>
            <td>Analytic Engine</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                BBTR
              </a>
            </th>
            <td>Blockchain Based Threats Registry</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                HP
              </a>
            </th>
            <td>Artificial Intelligence Honeypot</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                RCRA
              </a>
            </th>
            <td>Real-time Cyber Risk Assesment</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                KB
              </a>
            </th>
            <td>Knowledge Base</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                DSS
              </a>
            </th>
            <td>Decision Support System</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                VAaaS
              </a>
            </th>
            <td>Vulnerability Assesment as a Service</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                SIEM
              </a>
            </th>
            <td>Security Information and Event Management</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                MLID
              </a>
            </th>
            <td>Machine Learning-empowered Intrusion Detection</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                HE
              </a>
            </th>
            <td>Homomorphic Encryption</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                AP
              </a>
            </th>
            <td>Anonymisation and Privacy</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                FDCE
              </a>
            </th>
            <td>Forensic Data Collection Engine</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                CST
              </a>
            </th>
            <td>Cyber Security Toolbox</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                S-API
              </a>
            </th>
            <td>Application Programming Interface for Third Parties</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                SB
              </a>
            </th>
            <td>Sandbox</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                ABS
              </a>
            </th>
            <td>Attack and Behaviour Simulators</td>
          </tr>

          <tr className="odd-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                SM
              </a>
            </th>
            <td>Service Manager</td>
          </tr>

          <tr className="even-row">
            <th scope="row">
              <a href="http://localhost:3001/dtm">
                CIP
              </a>
            </th>
            <td>Common Integration Platform</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>);
};
var getStyles = ui_1.stylesFactory(function () {
  return {
    wrapper: emotion_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      position: relative;\n    "], ["\n      position: relative;\n    "]))),
    svg: emotion_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "], ["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "]))),
    textBox: emotion_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "], ["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "])))
  };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
