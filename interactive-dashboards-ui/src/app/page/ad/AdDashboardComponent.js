import React from 'react';
import {faBroadcastTower, faChartBar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {withTranslation} from 'react-i18next';

class AdDashboardComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server:window._env_.REACT_APP_SPHINX_AD_API_URL,
            simulationSectionVisible: process.env.REACT_APP_SIMULATION_SECTION_VISIBLE,
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "AD";
    }


    render(){
        const { t } = this.props;
        return(
           <div className="container mt-3">

                   <nav aria-label="breadcrumb breadcrumb-dark">
                       <ol className="breadcrumb breadcrumb-dark">
                           <li className="breadcrumb-item"><a href="./">{t('page.ad.style.adDashboard.home')}</a></li>
                           <li className="breadcrumb-item active" aria-current="page">{t('page.ad.style.adDashboard.anomaly')}</li>
                       </ol>
                   </nav>

                   <div className="row">
                       {/*<div className="col-lg-4 col-md-8 mb-5 mb-lg-0 mx-auto">*/}
                           {/*<a href="./ad/alert" className="ad-item card border-0 card-alert shadow-lg">*/}
                               {/*<FontAwesomeIcon icon={faBell}/>*/}
                               {/*<div className="card-body d-flex align-items-end flex-column text-right">*/}
                                   {/*<h4>{t('page.ad.style.adDashboard.alert')}</h4>*/}
                                   {/*<p className="w-75">{t('page.ad.style.adDashboard.adAlert')}</p>*/}
                               {/*</div>*/}
                           {/*</a>*/}
                       {/*</div>*/}

                       <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                           <a href="./ad/algorithms" className="ad-item card border-0 card-ad shadow-lg">
                               <FontAwesomeIcon icon={faBroadcastTower}/>
                               <div className="card-body d-flex align-items-end flex-column text-right">
                                   <h4>Algorithms</h4>
                                   <p className="w-75">Algorithms</p>
                               </div>
                           </a>
                       </div>

                       { this.state.simulationSectionVisible=="true" &&
                           <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto">
                               <a href="./ad/simulation" className="ad-item card border-0 card-statistics shadow-lg">
                                   <FontAwesomeIcon icon={faChartBar}/>
                                   <div className="card-body d-flex align-items-end flex-column text-right">
                                       <h4>Simulation</h4>
                                       <p className="w-75">Generation alerts</p>
                                   </div>
                               </a>
                           </div>
                       }

                       {/*<div className="col-lg-4 col-md-8 mb-5 mb-lg-0 mx-auto">*/}
                           {/*<a href="./ad/statistics" className="ad-item card border-0 card-statistics shadow-lg">*/}
                               {/*<FontAwesomeIcon icon={faChartBar}/>*/}
                               {/*<div className="card-body d-flex align-items-end flex-column text-right">*/}
                                   {/*<h4>{t('page.ad.style.adDashboard.statistics')}</h4>*/}
                                   {/*<p className="w-75">{t('page.ad.style.adDashboard.dtm')}</p>*/}
                               {/*</div>*/}
                           {/*</a>*/}
                       {/*</div>*/}
                   </div>
           </div>
        )
    }

}

export default withTranslation()(AdDashboardComponent);