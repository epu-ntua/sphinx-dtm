import React from 'react';
import { faBroadcastTower,faChartBar, faBell, faList, faListAlt, faCogs, faCog  } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { withTranslation } from 'react-i18next';

class DTMDashboardComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            statisticsSectionVisible: process.env.REACT_APP_DTM_STATISTICS_SECTION_VISIBLE,
            customRulesSectionVisible: process.env.REACT_APP_DTM_CUSTOM_RULES_SECTION_VISIBLE,
            configSectionVisible: process.env.REACT_APP_DTM_CONFIG_SECTION_VISIBLE,
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM";
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container mt-3">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.DTMDashboard.home')}</a></li>
                       <li className="breadcrumb-item active" aria-current="page">{t('page.dtm.style.DTMDashboard.dtm')}</li>
                   </ol>
               </nav>

               <div className="row">

                   <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                       <a href="./dtm/instances" className="ad-item card border-0 card-dtm shadow-lg">
                           <FontAwesomeIcon icon={faList}/>
                           <div className="card-body d-flex align-items-end flex-column text-right">
                               <h4>{t('page.dtm.style.DTMDashboard.instances')} & Tools</h4>
                               <p className="w-75">Instances & Tools</p>
                           </div>
                       </a>
                   </div>

                   {this.state.statisticsSectionVisible == "true" &&
                       <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                           <a href="./dtm/statistics" className="ad-item card border-0 card-statistics shadow-lg">
                               <FontAwesomeIcon icon={faChartBar}/>
                               <div className="card-body d-flex align-items-end flex-column text-right">
                                   <h4>{t('page.ad.style.adDashboard.statistics')}</h4>
                                   <p className="w-75">{t('page.ad.style.adDashboard.statistics')}</p>
                               </div>
                           </a>
                       </div>
                   }

               </div>
               <br/>
               <div className="row">

                   <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                       <a href="./dtm/alerts" className="ad-item card border-0 card-alert shadow-lg">
                           <FontAwesomeIcon icon={faBell}/>
                           <div className="card-body d-flex align-items-end flex-column text-right">
                               <h4>Alerts</h4>
                               <p className="w-75">Alerts</p>
                           </div>
                       </a>
                   </div>

                   <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                       <a href="./dtm/asset-discovery" className="ad-item card border-0 card-event shadow-lg">
                           <FontAwesomeIcon icon={faListAlt}/>
                           <div className="card-body d-flex align-items-end flex-column text-right">
                               <h4>Asset Discovery</h4>
                               <p className="w-75">Asset Discovery</p>
                           </div>
                       </a>
                   </div>

               </div>

               <br/>
               <div className="row">

                   {this.state.customRulesSectionVisible == "true" &&
                       <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                           <a href="./dtm/custom-rules" className="ad-item card border-0 card-custom-rules shadow-lg">
                               <FontAwesomeIcon icon={faCog}/>
                               <div className="card-body d-flex align-items-end flex-column text-right">
                                   <h4>Custom rules</h4>
                                   <p className="w-75">Custom rules</p>
                               </div>
                           </a>
                       </div>
                   }

                   {this.state.configSectionVisible == "true" &&
                       <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                           <a href="./dtm/config" className="ad-item card border-0 card-config shadow-lg">
                               <FontAwesomeIcon icon={faCogs}/>
                               <div className="card-body d-flex align-items-end flex-column text-right">
                                   <h4>Config</h4>
                                   <p className="w-75">Configuration</p>
                               </div>
                           </a>
                       </div>
                   }
               </div>

           </div>
        )
    }

}

export default withTranslation()(DTMDashboardComponent);