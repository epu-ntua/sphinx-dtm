import React from 'react';
import { withTranslation } from 'react-i18next';

class InstanceComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM - Instances";

        var getInstancesUrl = this.state.server+'/sphinx/dtm/instance/all';
        var response = await fetch(getInstancesUrl);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

    }

    toggleInstance(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/instance/toggle/'+d.id);
    }

    deleteInstance(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/instance/delete/'+d.id);
    }

    doAction(d, url){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                window.location.reload(false);
            })
            .catch(()=>{

            });
    }

    isAlive(d){
        const className = "badge" + ((d.up==true)?" badge-success ":" badge-danger ");
        return className;
    }

    render(){
        const { t } = this.props;
        return(
            <div className="container">

                <nav aria-label="breadcrumb breadcrumb-dark">
                    <ol className="breadcrumb breadcrumb-dark">
                        <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.InstanceComponent.Home')}</a></li>
                        <li className="breadcrumb-item"><a href="./dtm">{t('page.dtm.style.InstanceComponent.dtm')}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('page.dtm.style.InstanceComponent.instances')}</li>
                    </ol>
                </nav>

                <div className="mt-3 mb-3 text-left">
                    <a href="./dtm/instance/add" className="btn btn-success">{t('page.dtm.style.InstanceComponent.btnAddInstance')}</a>&nbsp;
                </div>

                <table className="table table-striped table-hover table-dark">
                    <thead>
                    <tr>
                        <th>{t('page.dtm.style.InstanceComponent.status')}</th>
                        <th>{t('page.dtm.style.InstanceComponent.name')}</th>
                        <th>tools</th>
                        <th>{t('page.dtm.style.InstanceComponent.key')}</th>
                        <th>{t('page.dtm.style.InstanceComponent.description')}</th>
                        <th>{t('page.dtm.style.InstanceComponent.actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(d =>
                        <tr key={"key_"+d.id}>
                            <td><span className={this.isAlive(d)}>&nbsp;</span></td>
                            <td>
                                {d.name} <span className={'small-url'}>({d.url})</span>
                            </td>
                            <td>
                                    <span>
                                        <span className={!d.hasTshark?'hidden':''}>
                                            &nbsp;<a className="link" href={"./dtm/instance/"+d.id+"/tshark"}><span className="badge badge-info">tshark</span></a>
                                        </span>
                                        <span className={!d.hasSuricata?'hidden':''}>
                                            &nbsp;<a className="link" href={"./dtm/instance/"+d.id+"/suricata"}><span className="badge badge-info">suricata</span></a>
                                        </span>
                                    </span>

                            </td>
                            <td>{d.key}</td>
                            <td>{d.description}</td>
                            <td className="text-center">
                                    <span className={!d.up?'hidden':''}>
                                        <a href={"./dtm/instance/"+d.id+"/metrics"} type="button" className="btn btn-info">statistics</a>&nbsp;
                                    </span>

                                {d.enabled == true ? (
                                    <span className={!d.up?'hidden':''}>
                                            <button onClick={() => this.toggleInstance(d)} type="button" className="btn btn-secondary">{t('page.dtm.style.InstanceComponent.btnDisable')}</button>&nbsp;
                                        </span>
                                ):(
                                    <span  className={!d.up?'hidden':''}>
                                            <button onClick={() => this.toggleInstance(d)} type="button" className="btn btn-warning">{t('page.dtm.style.InstanceComponent.btnEnable')}</button>&nbsp;
                                        </span>
                                )
                                }
                                <span>
                                        <button onClick={() => this.deleteInstance(d)} type="button" className="btn btn-danger">{t('page.dtm.style.InstanceComponent.btnDelete')}</button>&nbsp;
                                    <a href={"./dtm/instance/edit/"+d.id} type="button" className="btn btn-primary">{t('page.dtm.style.InstanceComponent.btnEdit')}</a>&nbsp;
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

export default withTranslation()(InstanceComponent);