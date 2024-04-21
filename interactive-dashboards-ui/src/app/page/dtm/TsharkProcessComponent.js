import React from 'react';
import { withTranslation } from 'react-i18next';

class TsharkProcessComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            status: "Tshark Status: -",
            fields: "-",
            instanceId: "",
            data:[],
            instances:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM - Manage Instance";

        const { id } = this.props.match.params;
        this.setState({instanceId:id});

        var getProcessesUrl = this.state.server+'/sphinx/dtm/tshark/getProcesses/'+id;
        var response = await fetch(getProcessesUrl);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

        this.setState({status: body[0].info});

        var getFieldsUrl = this.state.server+'/sphinx/dtm/tshark/getFields';
        fetch(getFieldsUrl).then((resp)=>{ return resp.text() }).then((text)=>{
            this.setState({ fields: text, isLoading: false });
        });

        var getInstancesUrl = this.state.server+'/sphinx/dtm/instance/all';
        var response = await fetch(getInstancesUrl);
        const instances = await response.json();
        this.setState({ instances: instances, isLoading: false });
    }

    startProcess(d){
        var pid = -88;
        if (d!=null){
            pid = d.processModel.pid;
        }
        this.doAction(d,this.state.server+'/sphinx/dtm/tshark/start/' + pid + "/" + this.state.instanceId);
    }

    stopProcess(d){
        var pid = -88;
        if (d!=null){
            pid = d.processModel.pid;
        }
        this.doAction(d,this.state.server+'/sphinx/dtm/tshark/stop/' + pid + "/" + this.state.instanceId);
    }

    statusProcess(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/tshark/status/'+d.processModel.pid+ "/" + this.state.instanceId);
    }

    disableProcess(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/tshark/disable/'+d.processModel.pid+ "/" + this.state.instanceId);
    }

    enableProcess(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/tshark/enable/'+d.processModel.pid+ "/" + this.state.instanceId);
    }

    disableOneProcess(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/tshark/disable/'+d.pid+ "/" + this.state.instanceId);
    }

    enableOneProcess(d){
        this.doAction(d,this.state.server+'/sphinx/dtm/tshark/enable/'+d.pid+ "/" + this.state.instanceId);
    }


    isAlive(d){
        const className = "badge" + ((d.alive==true)?" badge-success ":" badge-danger ");
        return className;
    }

    isActive(d){

        const starting = this.isOneProcess() && this.state.data[0].starting;

        if (starting){
            return "badge badge-warning";
        }

        const className = "badge" + ((d.active==true && d.enabled)?" badge-success ":" badge-danger ");
        return className;
    }

    refresh(){
        window.location = "./dtm/instance/"+this.state.instanceId+"/tshark";
    }

    doAction(d, url){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (this.isOneProcess()) {
                    window.location = "./dtm/instance/" + this.state.instanceId + "/tshark";
                } else {
                    var isAlive = data.alive;
                    if (isAlive == undefined) {
                        isAlive = false;
                    }

                    this.state.data.map(dd => {
                        if (dd.processModel.pid == d.processModel.pid) {
                            dd.alive = isAlive;
                            dd.noPcap = data.noPcap;
                            dd.processModel.enabled = data.processModel.enabled;
                        }
                    });

                    var str = JSON.stringify(data, undefined, 4);
                    var html = this.syntaxHighlight(str);
                    this.setState({status: html});
                }
            })
            .catch(()=>{
                this.setState({ status: '<b>Error!</b>' });
            });
    }

    syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    change(event){
        const instanceId = event.target.value
        window.location = "./dtm/instance/"+instanceId+"/tshark";
    }

    isOneProcess(){
        if (this.state.data){
            if (this.state.data.length==1){
                if (this.state.data[0].processModel==null){
                    return true;
                }
            }
        }
        return false;
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.ProcessComponent.home')}</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">{t('page.dtm.style.ProcessComponent.dtm')}</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/instances">Instances</a></li>
                       <li className="breadcrumb-item active" aria-current="page">Tshark instance</li>
                   </ol>
               </nav>
               {
               <div className="mt-3 mb-3 text-left">
                   {/*
                   <a href={"/dtm/instance/"+this.state.instanceId+"/tshark/process/add"} className="btn btn-success">{t('page.dtm.style.ProcessComponent.btnAddProcess')}</a>&nbsp;
                   */}
                   {this.isOneProcess() ? (
                            <span>
                                <button  onClick={() => this.stopProcess()} type="button"  className="btn btn-danger">Stop</button>&nbsp;
                                <button  onClick={() => this.startProcess()} type="button"  className="btn btn-success">Restart</button>&nbsp;
                            </span>
                        ):(
                            <span/>
                       )}
                   &nbsp;<button  onClick={() => this.refresh()} type="button"  className="btn btn-warning">Refresh page</button>&nbsp;
                   {/*<a href={"./dtm/instance/"+this.state.instanceId+"/tshark/filter"} className="btn btn-success">{t('page.dtm.style.ProcessComponent.btnFilter')}</a>&nbsp;*/}
                   {/*<a href={"./dtm/instance/"+this.state.instanceId+"/tshark/real-time-dtm"} className="btn btn-info">Real-time data traffic</a>&nbsp;*/}
               </div>
               }
               <select name="instanceName" className="form-control mb-2 instance" placeholder="Instances"  value={this.state.instanceId} onChange={this.change}>
                   <option value="">Select a instance...</option>
                   {this.state.instances.map(d =>
                       <option key={"k_"+d.id} value={d.id}>{d.name} ({d.url})</option>
                   )}
               </select>

               <div className="alert alert-warning text-left">
                   <strong>{t('page.dtm.style.ProcessComponent.fields')}</strong>:
                   {this.state.fields}
               </div>

               <div dangerouslySetInnerHTML={{ __html: this.state.status }} id="status" className="alert alert-warning">

               </div>

               <table className="table table-striped table-hover table-dark">
                   <thead>
                        {!this.isOneProcess() ? (
                           <tr>
                               {/*<th>{t('page.dtm.style.ProcessComponent.pid')}</th>*/}
                               <th>#</th>
                               <th>{t('page.dtm.style.ProcessComponent.interface')}</th>
                               <th>{t('page.dtm.style.ProcessComponent.filter')}</th>
                               <th>{t('page.dtm.style.ProcessComponent.packages')}</th>
                               <th>{t('page.dtm.style.ProcessComponent.actions')}</th>
                           </tr>):(
                            <tr>
                                {/*<th>{t('page.dtm.style.ProcessComponent.pid')}</th>*/}
                                <th>#</th>
                                <th>{t('page.dtm.style.ProcessComponent.interface')}</th>
                                <th>{t('page.dtm.style.ProcessComponent.actions')}</th>
                            </tr>
                            )
                        }

                   </thead>
                   <tbody>
                        {!this.isOneProcess() && this.state.data.map((d,id) =>
                            <tr>
                                <td>
                                    <span className={this.isAlive(d)}>{id+1}</span>
                                </td>

                                <td className={!d.processModel.active?'font-italic':''}>
                                    {d.processModel.interfaceDisplayName}
                                    <br/>
                                    <span className={"smallTest"}>{d.processModel.interfaceName}</span>
                                </td>

                                <td>{d.processModel.filterName}</td>
                                <td>{d.noPcap}</td>
                                <td className="text-center">
                                    { d.processModel.active==true && d.processModel.enabled==true ? (
                                        <span>
                                            {
                                                d.alive ? (<button onClick={() => this.stopProcess(d)} type="button" className="btn btn-danger">{t('page.dtm.style.ProcessComponent.btnStop')}</button>):(<span/>)
                                            }
                                            {
                                                d.alive==false ? (<button onClick={() => this.startProcess(d)} type="button" className="btn btn-success">{t('page.dtm.style.ProcessComponent.btnStart')}</button>):(<span/>)
                                            }
                                            &nbsp;<a href={"./dtm/instance/"+this.state.instanceId+"/tshark/process/edit/"+d.processModel.pid} type="button" className="btn btn-primary">{t('page.dtm.style.ProcessComponent.btnEdit')}</a>
                                            &nbsp;<button onClick={() => this.statusProcess(d)} type="button" className="btn btn-info">{t('page.dtm.style.ProcessComponent.btnUpdate')}</button>&nbsp;
                                        </span>
                                        ):(<span/>)
                                    }

                                    {d.processModel.enabled == true ? (
                                        <span>
                                            <button onClick={() => this.disableProcess(d)} type="button" className="btn btn-secondary">{t('page.dtm.style.ProcessComponent.btnDisable')}</button>&nbsp;
                                        </span>
                                        ):(
                                        <button onClick={() => this.enableProcess(d)} type="button" className="btn btn-warning">{t('page.dtm.style.ProcessComponent.btnEnable')}</button>
                                        )
                                    }
                                </td>
                            </tr>
                        )}
                        {this.isOneProcess() && this.state.data[0].processModelList.map((d, id) =>
                            <tr>
                                <td>
                                    <span className={this.isActive(d)}>{id+1}</span>
                                </td>
                                <td className={!d.active?'font-italic':''}>
                                    {d.interfaceDisplayName}
                                    <br/>
                                    <span className={"smallTest"}>({d.interfaceName})</span>
                                </td>
                                <td className="text-center">

                                    {d.enabled == true ? (
                                        <span>
                                            &nbsp;<button onClick={() => this.disableOneProcess(d)} type="button" className="btn btn-secondary">{t('page.dtm.style.ProcessComponent.btnDisable')}</button>&nbsp;
                                        </span>
                                    ):(
                                        <button onClick={() => this.enableOneProcess(d)} type="button" className="btn btn-warning">{t('page.dtm.style.ProcessComponent.btnEnable')}</button>
                                    )
                                    }
                                </td>
                            </tr>
                        )}

                   </tbody>
               </table>

           </div>
        )
    }

}

export default withTranslation()(TsharkProcessComponent);