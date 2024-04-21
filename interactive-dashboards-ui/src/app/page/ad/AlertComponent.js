import React from 'react';
import { withTranslation } from 'react-i18next';

class AlertComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_AD_API_URL,
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "AD - Alerts";

        var getBlackWebAlertList = this.state.server+'/sphinx/ad/api/getBlackWebAlertList';
        var response = await fetch(getBlackWebAlertList);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

    }

    doAction(d, url, returnUrl){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (returnUrl){
                    window.location = "./ad/alert#portdiscovery";
                    window.location.reload(false);
                }else{
                    window.location.reload(false);
                }
            })
            .catch(()=>{

            });
    }

    isActive(t){
        var t = "#"+t;
        var tab = window.location.hash;
        if (tab==null || tab=="" || tab == undefined){
            if (t=="#blackweb"){
                return " show active";
            }else{
                return "";
            }
        }
        if (t===tab){
            return " show active";
        }
        return "";
    }

    render(){
        var dtf = new Intl.DateTimeFormat('en-US',
            {   year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false});
        const { t } = this.props;
        return(
            <div className="container mt-3">

                <nav aria-label="breadcrumb breadcrumb-dark">
                    <ol className="breadcrumb breadcrumb-dark">
                        <li className="breadcrumb-item"><a href="./">{t('page.ad.style.alertComponent.home')}</a></li>
                        <li className="breadcrumb-item"><a href="./ad">{t('page.ad.style.alertComponent.ad')}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('page.ad.style.alertComponent.alert')}</li>
                    </ol>
                </nav>

                {/*
               <ul className="nav nav-tabs" id="adAlertTab" role="tablist">
                   <li className="nav-item">
                       <a className={"nav-link " + this.isActive('blackweb')} id="blackweb-tab" data-toggle="tab" href="#blackweb" role="tab"
                          aria-controls="blackweb" aria-selected="true">{t('page.ad.style.alertComponent.blackWeb')}</a>
                   </li>
               </ul>

               <div className="tab-content" id="myTabContent">
                   <div className={"tab-pane fade show " + this.isActive('blackweb')} id="blackweb" role="tabpanel" aria-labelledby="blackweb-tab">

                       <table className="table table-hover table-dark">
                           <thead>
                           <tr>
                               <th scope="col">#</th>
                               <th scope="col">{t('page.ad.style.alertComponent.time')}</th>
                               <th scope="col">{t('page.ad.style.alertComponent.eth')}</th>
                               <th scope="col">{t('page.ad.style.alertComponent.ip')}</th>
                               <th scope="col">{t('page.ad.style.alertComponent.DNS')}</th>
                               <th scope="col">{t('page.ad.style.alertComponent.type')}</th>
                           </tr>
                           </thead>
                           <tbody>
                           {this.state.data.map((d,index) =>
                               <tr>
                                   <th scope="row">{index+1}</th>
                                   <td>
                                       {d.time}
                                   </td>
                                   <td>{d.ethSource}</td>
                                   <td>{d.ipDest}</td>
                                   <td>{d.dnsQry}</td>
                                   <td>{d.type}</td>
                               </tr>
                           )}
                           </tbody>
                       </table>
                   </div>

               </div>
                */}
            </div>
        )
    }

}

export default withTranslation()(AlertComponent);