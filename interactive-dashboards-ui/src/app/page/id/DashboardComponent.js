import React from 'react';
import { faBroadcastTower,faChartBar, faBell, faChartArea  } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { withTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
  
class DashboardComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "Sphinx Components";

    }


    render(){
        const { t } = this.props;
        return(
           <div className="container mt-3">

               <div className="row">
                   <div className="col-lg-4 col-md-8 mb-5 mb-lg-0 mx-auto">
                       <Link to="/dtm" className="ad-item card border-0 card-statistics shadow-lg">
                           <FontAwesomeIcon icon={faChartBar}/>
                           <div className="card-body d-flex align-items-end flex-column text-right">
                               <h5>{t('page.id.dashboardComponent.card-body')}</h5>
                               <p className="w-75">{t('page.id.dashboardComponent.w')}</p>
                           </div>
                       </Link>
                   </div>

                   <div className="col-lg-4 col-md-8 mb-5 mb-lg-0 mx-auto">
                       <a href="./ad" className="ad-item card border-0 card-ad shadow-lg">
                           <FontAwesomeIcon icon={faBroadcastTower}/>
                           <div className="card-body d-flex align-items-end flex-column text-right">
                               <h5>{t('page.id.dashboardComponent.card')}</h5>
                               <p className="w-75">{t('page.id.dashboardComponent.w-75')}</p>
                           </div>
                       </a>
                   </div>

                   <div className="col-lg-4 col-md-8 mb-5 mb-lg-0 mx-auto">
                       <a href="./grafana/config" className="ad-item card border-0 card-alert shadow-lg">
                           <FontAwesomeIcon icon={faChartArea}/>
                           <div className="card-body d-flex align-items-end flex-column text-right">
                               <h5>{t('page.id.dashboardComponent.id')}</h5>
                               <p className="w-75">{t('page.id.dashboardComponent.grafana')}</p>
                           </div>
                       </a>
                   </div>

               </div>


           </div>
        )
    }

}

export default withTranslation()(DashboardComponent);