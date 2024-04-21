import React from 'react';
import { withTranslation } from 'react-i18next';

class CustomRulesComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            data:[],
            dataPortCatalogue:[],
            dataPortDiscovery:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM - Custom rules";

        var getBlackWebCategoryUrl = this.state.server+'/sphinx/dtm/blackwebcategory/list';
        var response = await fetch(getBlackWebCategoryUrl);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

        var getPortCataloguesAlertList = this.state.server+'/sphinx/dtm/portcatalogue/getPortCatalogueList';
        var response = await fetch(getPortCataloguesAlertList);
        const bodyPc = await response.json();
        this.setState({ dataPortCatalogue: bodyPc, isLoading: false });

    }

    deleteBlackwebCategory(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/blackwebcategory/delete/'+d.id, "./dtm/custom-rules#blackweb");
    }

    deletePortCatalog(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/portcatalogue/delete/'+d.id,  "./dtm/custom-rules#portdiscovery");
    }

    doAction(d, url, returnUrl){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (returnUrl){
                    window.location = returnUrl;
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
                       <li className="breadcrumb-item"><a href="./">Home</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item active" aria-current="page">Custom Rules</li>
                   </ol>
               </nav>

               <ul className="nav nav-tabs" id="adAlertTab" role="tablist">
                   <li className="nav-item">
                       <a className={"nav-link " + this.isActive('blackweb')} id="blackweb-tab" data-toggle="tab" href="#blackweb" role="tab"
                          aria-controls="blackweb" aria-selected="true">BlackWeb</a>
                   </li>

                   <li className="nav-item">
                       <a className={"nav-link " + this.isActive('portdiscovery')} id="portdiscovery-tab" data-toggle="tab" href="#portdiscovery" role="tab"
                          aria-controls="portdiscovery" aria-selected="false">Port Discovery</a>
                   </li>

               </ul>

               <div className="tab-content" id="myTabContent">
                   <div className={"tab-pane fade show " + this.isActive('blackweb')} id="blackweb" role="tabpanel" aria-labelledby="blackweb-tab">

                       <div className="mt-3 mb-3 text-left">
                           <a href={"./dtm/custom-rules/blackwebcategory/crud"} className="btn btn-primary">Add blackweb category</a>&nbsp;
                       </div>

                       <table className="table table-striped table-hover table-dark">
                           <thead>
                           <tr>
                               <th>Name</th>
                               <th>Description</th>
                               <th>Actions</th>
                           </tr>
                           </thead>
                           <tbody>
                           {this.state.data.map(d =>
                               <tr>
                                   <td>{d.name}</td>
                                   <td>{d.description}</td>
                                   <td className="text-center">
                                    <span>
                                        <a href={"./dtm/custom-rules/blackweb/list/"+d.id} type="button" className="btn btn-info">list</a>&nbsp;

                                        <a href={"./dtm/custom-rules/blackwebcategory/crud/"+d.id} type="button" className="btn btn-primary">edit</a>&nbsp;
                                        <button onClick={() => this.deleteBlackwebCategory(d)} type="button" className="btn btn-danger">delete</button>&nbsp;
                                    </span>
                                   </td>
                               </tr>
                           )}

                           </tbody>
                       </table>

                   </div>

                   <div className={"tab-pane fade " + this.isActive('portdiscovery')} id="portdiscovery" role="tabpanel" aria-labelledby="portdiscovery-tab">

                       <div className="mt-3 mb-3 text-left">
                           <a href={"./dtm/custom-rules/port-catalogue/add"} className="btn btn-primary">Add to port catalogue</a>&nbsp;
                       </div>

                       <div id="portaccordion">

                           <div className="card border-0">
                               <div className="card-header table-title" id="heading-port2">
                                   <a data-toggle="collapse"
                                      data-target="#collapseport2" aria-expanded="true"
                                      aria-controls="collapseport2">
                                       {t('page.ad.style.alertComponent.portCatalogue')}
                                   </a>
                               </div>

                               <div id="collapseport2" className="collapse show" aria-labelledby="heading-port2" data-parent="#portaccordion">
                                   <div className="card-body p-0 m-0">

                                       <table className="table table-hover table-dark mb-0">
                                           <thead>
                                           <tr>
                                               <th scope="col">#</th>
                                               <th>{t('page.ad.style.alertComponent.portCatalogue.port')}</th>
                                               <th>{t('page.ad.style.alertComponent.portCatalogue.endPort')}</th>
                                               <th>{t('page.ad.style.alertComponent.portCatalogue.name')}</th>
                                               <th>{t('page.ad.style.alertComponent.portCatalogue.description')}</th>
                                               <th>{t('page.ad.style.alertComponent.portCatalogue.action')}</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                           {this.state.dataPortCatalogue.map((d,index) =>
                                               <tr key={"dpc_"+index}>
                                                   <td scope="row">{index+1}</td>
                                                   <td scope="row">{d.port}</td>
                                                   <td scope="row">{d.endPortInterval}</td>
                                                   <td scope="row">{d.name}</td>
                                                   <td scope="row">{d.description}</td>
                                                   <td>
                                                       <a href={"./dtm/custom-rules/port-catalogue/edit/"+d.id} type="button" className="btn btn-success">edit</a> &nbsp;
                                                       <button onClick={() => this.deletePortCatalog(d)} type="button" className="btn btn-danger">delete</button>&nbsp;
                                                   </td>
                                               </tr>
                                           )}
                                           </tbody>
                                       </table>

                                   </div>
                               </div>
                           </div>



                       </div>
                   </div>

               </div>

           </div>
        )
    }

}

export default withTranslation()(CustomRulesComponent);