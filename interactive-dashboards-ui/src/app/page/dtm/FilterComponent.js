import React from 'react';
import { withTranslation } from 'react-i18next';

class FilterComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server:window._env_.REACT_APP_SPHINX_DTM_API_URL,
            instanceId:"",
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM - Manage filters";

        const { id } = this.props.match.params;
        this.setState({instanceId:id});

        var getProcessesUrl = this.state.server+'/sphinx/dtm/process/filter/all';
        var response = await fetch(getProcessesUrl);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });
    }

    deleteFilter(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/process/filter/delete/'+d.id);
    }

    doAction(d, url){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                window.location.reload(false);
            })
            .catch(()=>{
                this.setState({ status: '<b>Error!</b>' });
            });
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.FilterComponent.Home')}</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/instances">{t('page.dtm.style.FilterComponent.dtm')}</a></li>
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.instanceId+"/tshark"}>{t('page.dtm.style.FilterComponent.instance')}</a></li>
                       <li className="breadcrumb-item active" aria-current="page">{t('page.dtm.style.FilterComponent.filters')}</li>
                   </ol>
               </nav>

               <div className="mt-3 mb-3 text-left">
                   <a href={"./dtm/instance/"+this.state.instanceId+"/tshark/filter/add"} className="btn btn-primary">{t('page.dtm.style.FilterComponent.btnAddFilter')}</a>&nbsp;
               </div>

               <table className="table table-striped table-hover table-dark">
                   <thead>
                       <tr>
                           <th>#</th>
                           <th>{t('page.dtm.style.FilterComponent.name')}</th>
                           <th>{t('page.dtm.style.FilterComponent.command')}</th>
                           <th>{t('page.dtm.style.FilterComponent.description')}</th>
                           <th>{t('page.dtm.style.FilterComponent.actions')}</th>
                       </tr>
                   </thead>
                   <tbody>
                        {this.state.data.map((d, index) =>
                            <tr key={"t_"+index}>
                                <td>{index+1}</td>
                                <td>{d.name}</td>
                                <td>{d.command}</td>
                                <td>{d.description}</td>
                                <td className="text-center">
                                    <span>
                                        <a href={"./dtm/instance/"+this.state.instanceId+"/tshark/filter/edit/"+d.id} type="button" className="btn btn-info">{t('page.dtm.style.FilterComponent.edit')}</a>&nbsp;
                                        {d.canDelete!=false?
                                            <button onClick={() => this.deleteFilter(d)} type="button" className="btn btn-danger">{t('page.dtm.style.FilterComponent.delete')}</button>:<span/>
                                        }

                                    </span>
                                </td>
                            </tr>
                        )}

                   </tbody>
               </table>

           </div>
        )
    }

}

export default withTranslation()(FilterComponent);