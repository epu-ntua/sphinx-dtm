import React from 'react';
import { withTranslation } from 'react-i18next';

class StatisticsComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_AD_API_URL,
            status: "Status: -",
            fields: "-",
        }
    }

    async componentDidMount() {

        document.title = "AD - Statistics";


    }

    render(){
        const { t } = this.props;
        return(
           <div className={'mt-3'}>

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">{t('page.ad.style.statisticsComponent.home')}</a></li>
                       <li className="breadcrumb-item"><a href="./ad">{t('page.ad.style.statisticsComponent.ad')}</a></li>
                       <li className="breadcrumb-item active" aria-current="page">{t('page.ad.style.statisticsComponent.statistics')}</li>
                   </ol>
               </nav>

               <h1>Under construction!</h1>
               <br/>
               <h4>The AD component focuses on the near real-time extraction of spatiotemporal statistics,
                   such as the connectivity between pair of IP-enabled components
                   (computers, IT devices & Artificial Intelligence or AI Honeypots) available in the core network system.
               </h4>
           </div>
        )
    }

}

export default withTranslation()(StatisticsComponent);