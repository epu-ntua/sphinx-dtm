import React, { Suspense } from 'react';

import './App.css';
import './page/dtm/style/dtm.css';
import './page/ad/style/ad.css';
import './page/grafana/style/grafana.css';
import Navbar from "./common/Navbar";

import FilterComponent from "./page/dtm/FilterComponent";
import AddFilterComponent from "./page/dtm/AddFilterComponent";
import { Route, Switch } from "react-router-dom";
import EditFilterComponent from "./page/dtm/EditFilterComponent";
import EditProcessComponent from "./page/dtm/EditProcessComponent";
import AlgorithmConfigComponent from "./page/ad/AlgorithmConfigComponent";
import AdDashboardComponent from "./page/ad/AdDashboardComponent";
import SimulationComponent from "./page/ad/SimulationComponent";
import DashboardComponent from "./page/id/DashboardComponent";
import Footer from "./common/Footer";
import AddProcessComponent from "./page/dtm/AddProcessComponent";
import InstanceComponent from "./page/dtm/InstanceComponent";
import DTMDashboardComponent from "./page/dtm/DTMDashboardComponent";
import GrafanaComponent from "./page/grafana/GrafanaComponent";
import InstanceMetricsComponent from "./page/dtm/InstanceMetricsComponent";

import MetricsComponent from "./page/dtm/MetricsComponent";

import InstanceCrudComponent from "./page/dtm/InstanceCrudComponent";
import TsharkProcessComponent from "./page/dtm/TsharkProcessComponent";
import SuricataProcessComponent from "./page/dtm/SuricataProcessComponent";
import InfoInstanceMetricComponent from "./page/dtm/stats/instance/InfoMetricComponent";
import InstanceAndProtocolMetricComponent from "./page/dtm/stats/global/InstanceAndProtocolMetricComponent";
import ProtocolAndInterfaceMetricComponent from "./page/dtm/stats/instance/ProtocolAndInterfaceMetricComponent";
import InfoMetricComponent from "./page/dtm/stats/global/InfoMetricComponent";
import DTMAlertComponent from "./page/dtm/AlertComponent";
import AssetDiscoveryComponent from "./page/dtm/AssetDiscoveryComponent";
import AssetCatalogueCrudComponent from "./page/dtm/AssetCatalogueCrudComponent";
import ConfigComponent from "./page/dtm/ConfigComponent";
import CustomRulesComponent from "./page/dtm/CustomRulesComponent";
import PortCatalogueCrud from "./page/dtm/PortCatalogueCrud";
import BlackWebCategoryCrud from "./page/dtm/blackweb/BlackWebCategoryCrud";
import BlackWebList from "./page/dtm/blackweb/BlackWebList";
import BlackWebCrud from "./page/dtm/blackweb/BlackWebCrud";
import RealTimeDTMComponent from "./page/dtm/RealTimeDTMComponent";


import 'eventsource-polyfill';
import AccessDeniedContent from "./page/AccessDeniedContent";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./security/PrivateRoute";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={(<div>Loading</div>)}>
          <Navbar />
          <ToastContainer />
          <main className="container">
            <Switch>
              <Route path="/access-denied" component={AccessDeniedContent} exact />

              <PrivateRoute path="/" component={DashboardComponent} exact />
              <PrivateRoute path="/dtm" component={DTMDashboardComponent} exact />
              <PrivateRoute path="/dtm/instances" component={InstanceComponent} />
              <PrivateRoute path="/dtm/instance/add" component={InstanceCrudComponent} exact />
              <PrivateRoute path="/dtm/instance/edit/:id" component={InstanceCrudComponent} />

              <PrivateRoute path="/dtm/instance/:id/suricata" component={SuricataProcessComponent} exact/>

              <PrivateRoute path="/dtm/instance/:id/tshark" component={TsharkProcessComponent} exact/>
              <PrivateRoute path="/dtm/instance/:id/tshark/process/edit/:pid" component={EditProcessComponent} />
              <PrivateRoute path="/dtm/instance/:id/tshark/process/add" component={AddProcessComponent} />

              <PrivateRoute path="/dtm/instance/:id/tshark/filter" component={FilterComponent} exact/>
              <PrivateRoute path="/dtm/instance/:id/tshark/filter/add" component={AddFilterComponent} exact/>
              <PrivateRoute path="/dtm/instance/:instanceId/tshark/filter/edit/:id" component={EditFilterComponent} />

              <PrivateRoute path="/dtm/instance/:id/tshark/real-time-dtm" component={RealTimeDTMComponent} exact />

              <PrivateRoute path="/dtm/instance/:id/metrics" component={InstanceMetricsComponent} exact/>
              <PrivateRoute path="/dtm/instance/:id/metrics/stats.suricata.dtmi" component={InfoInstanceMetricComponent} exact/>
              <PrivateRoute path="/dtm/instance/:id/metrics/stats.tshark.dtmpi" component={ProtocolAndInterfaceMetricComponent} exact/>

              <PrivateRoute path="/dtm/statistics" component={MetricsComponent} exact />
              <PrivateRoute path="/dtm/statistics/stats.tshark.dtmip" component={InstanceAndProtocolMetricComponent} exact />
              <PrivateRoute path="/dtm/statistics/stats.suricata.dtmi" component={InfoMetricComponent} exact />

              <PrivateRoute path="/dtm/alerts" component={DTMAlertComponent} exact />
              <PrivateRoute path="/dtm/asset-discovery" component={AssetDiscoveryComponent} exact />
              <PrivateRoute path="/dtm/assetcatalogue/add/:physicalAddress" component={AssetCatalogueCrudComponent} />
              <PrivateRoute path="/dtm/assetcatalogue/edit/:id" component={AssetCatalogueCrudComponent} />

              <PrivateRoute path="/dtm/config" component={ConfigComponent} exact />
              <PrivateRoute path="/dtm/custom-rules" component={CustomRulesComponent} exact />
              <PrivateRoute path="/dtm/custom-rules/port-catalogue/add" component={PortCatalogueCrud} exact />
              <PrivateRoute path="/dtm/custom-rules/port-catalogue/edit/:id" component={PortCatalogueCrud} />

              <PrivateRoute path="/dtm/custom-rules/blackwebcategory/crud" component={BlackWebCategoryCrud} exact />
              <PrivateRoute path="/dtm/custom-rules/blackwebcategory/crud/:id" component={BlackWebCategoryCrud} />
              <PrivateRoute path="/dtm/custom-rules/blackwebcategory/crud" component={BlackWebCategoryCrud} exact />
              <PrivateRoute path="/dtm/custom-rules/blackwebcategory/crud/:id" component={BlackWebCategoryCrud} />
              <PrivateRoute path="/dtm/custom-rules/blackweb/list/:id" component={BlackWebList} />
              <PrivateRoute path="/dtm/custom-rules/blackweb/:categoryId/crud" component={BlackWebCrud} exact/>
              <PrivateRoute path="/dtm/custom-rules/blackweb/:categoryId/crud/:id" component={BlackWebCrud} />

              <PrivateRoute path="/ad" component={AdDashboardComponent} exact />
              {/*<PrivateRoute path="/ad/statistics" component={StatisticsComponent} exact />*/}
              <PrivateRoute path="/ad/algorithms" component={AlgorithmConfigComponent} exact />
              <PrivateRoute path="/ad/simulation" component={SimulationComponent} exact />
              {/*<PrivateRoute path="/ad/alert" component={AlertComponent} exact />*/}

              <PrivateRoute path="/grafana/config" component={GrafanaComponent} exact />

            </Switch>
          </main>

          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
