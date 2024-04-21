import React from 'react';
import { withTranslation } from 'react-i18next';

class RealTimeDTMComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            status: "Status: -",
            fields: [],
            instanceId: "",
            data:[],
            instances:[],
            interfaces:[],
            filters:[],
            filter:"",
            errors: {},
            filterFields:{
                interfaceName:"",
                filterName:"",
                filterText:""
            },
            disabled:"",
            process:{
                active:false,
                interfaceName:"",
                filterModel:{
                    command:""
                }
            },
            onload:false

        }
    }

    async componentDidMount() {
        document.title = "DTM - Manage Instance";

        const { id } = this.props.match.params;
        this.setState({instanceId:id});

        var getInterfacesUrl = this.state.server+'/sphinx/dtm/tshark/getInterfaces/'+id;
        var response = await fetch(getInterfacesUrl);
        const body = await response.json();
        this.setState({ interfaces: body, isLoading: false });

        var getFiltersUrl = this.state.server+'/sphinx/dtm/process/filter/all';
        var response = await fetch(getFiltersUrl);
        const filters = await response.json();
        this.setState({ filters: filters, isLoading: false });

        var getFieldsUrl = this.state.server+'/sphinx/dtm/tshark/realtime/getFields';
        fetch(getFieldsUrl).then((resp)=>{ return resp.json() }).then((text)=>{
            this.setState({ fields: text, isLoading: false });
        });

        var getInstancesUrl = this.state.server+'/sphinx/dtm/instance/all';
        var response = await fetch(getInstancesUrl);
        const instances = await response.json();
        this.setState({ instances: instances, isLoading: false });

        var getProcessUrl = this.state.server+'/sphinx/dtm/tshark/realtime/process/' + this.state.instanceId;
        var response = await fetch(getProcessUrl);
        const process = await response.json();
        this.setState({ process: process, isLoading: false });

        this.setState({
            filterFields:{
                interfaceName:process.interfaceName,
               // interfaceName:"Wi-Fi",
                filterText:process.filterModel!=null?process.filterModel.command:""
            }
        });

        if (process.active){
            this.setState({ disabled: "disabled"});
        }else{
            this.setState({ disabled: ""});
        }


        // SSE
        const eventSource = new EventSource(this.state.server+'/sphinx/dtm/tshark/realtime/sse/getData');
        eventSource.onopen = (event) => console.log('open', event);
        eventSource.onmessage = (event) =>
        {
            const line = JSON.parse(event.data);
            this.state.data.unshift(line);
            const len = this.state.data.length;

            var newData = this.state.data;
            if (len>100) {
                newData = this.state.data.slice(len - 100);
            }
            this.setState({data: newData});
        };
        eventSource.onerror = (event) => console.log('error', event);

        // SSE
        const statusEventSource = new EventSource(this.state.server+'/sphinx/dtm/tshark/realtime/sse/getDataStatus');
        statusEventSource.onopen = (event) => console.log('open', event);
        statusEventSource.onmessage = (event) =>
        {
            const status = JSON.parse(event.data);
            this.setState({status: status.status});
        };
        statusEventSource.onerror = (event) => console.log('error', event);

        this.timer = setInterval(()=> this.touch(), 10000)
    }

    async touch(){
        fetch(this.state.server+'/sphinx/dtm/tshark/realtime/touch/' + this.state.instanceId, {method: "GET"})
            .then((response) => response.json())
            .then((responseData) =>
            {

            })
            .catch((error) => {

            });

    }

    change(event){
        const instanceId = event.target.value
        window.location = "./dtm/instance/"+instanceId+"/tshark/real-time-dtm";
    }

    handleInputChange(event) {
        let filterFields = this.state.filterFields;

        const target = event.target;
        const value = target.value;
        const name = target.name;

        filterFields[name] = value;

        if (name=='filterName'){
            if (value!=''){
                let command = target.selectedOptions[0].getAttribute('data-command');
                filterFields["filterText"]=command;
            }
        }
        this.setState({filterFields});

    }

    handleValidation() {
        let filterFields = this.state.filterFields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!filterFields["interfaceName"]) {
            formIsValid = false;
            errors["interfaceName"] = "InterfaceName cannot be empty";
        }

        //Command
        if (formIsValid && !filterFields["filterText"]) {
            formIsValid = false;
            errors["filterText"] = "Filter cannot be empty";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    stopProcess(){
        this.setState({ disabled: ""});
        this.setState({ onload: true});
       // this.setState({ process: {active:false}});
        this.doAction(this.state.server+'/sphinx/dtm/tshark/realtime/stop/' + this.state.instanceId);
    }

    startProcess(){
        this.setState({ disabled: "disabled"});
      //  this.setState({ process: {active:true}});
        this.setState({ onload: true});
        let data = {
            interfaceName: this.state.filterFields.interfaceName,
            filterModel:{
                command: this.state.filterFields.filterText,
            }

        };

        let url = this.state.server+'/sphinx/dtm/tshark/realtime/start/' + this.state.instanceId;
        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // mode: "cors",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ disabled: "disabled"});
                this.setState({ process: {active:true}});
                this.setState({ onload: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({ disabled: ""});
                this.setState({ process: {active:false}});
                this.setState({ onload: false});
            }
            );

        window.location = "./dtm/instance/"+this.state.instanceId+"/tshark/real-time-dtm";
    }

    doAction(url){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ disabled: ""});
                this.setState({ process: {active:false}});
                this.setState({ onload: false});
            })
            .catch((error)=>{
                this.setState({ disabled: ""});
             //   this.setState({ process: {active:true}});
                this.setState({ status: '<b>Error!</b>' + error });
                this.setState({ onload: false});
            });
    }

    processSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
           this.startProcess();
        }
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
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.instanceId+"/tshark"} aria-current="page">Tshark instance</a></li>
                       <li className="breadcrumb-item active"  aria-current="page">Real-time data traffic</li>
                   </ol>
               </nav>
               <select name="instanceName" className="form-control mb-2 instance" placeholder="Instances"  value={this.state.instanceId} onChange={this.change}>
                   <option value="">Select a instance...</option>
                   {this.state.instances.map(d =>
                       <option key={"k_"+d.id} value={d.id}>{d.name} ({d.url})</option>
                   )}
               </select>

               <div dangerouslySetInnerHTML={{ __html: this.state.status }} id="status" className="alert alert-warning">

               </div>

               <div className="card text-left text-white bg-dark">
                   <form name="processForm" className="processForm form-inline m-1" onSubmit={this.processSubmit.bind(this)}>
                       <div className="form-group m-2">
                           <label className={"sr-only"} htmlFor="interfaceName">{t('page.dtm.style.AddProcess.interfaceName')}</label>
                           <select disabled={this.state.disabled} name="interfaceName" className="form-control filter" placeholder="Interface"  value={this.state.filterFields["interfaceName"]} onChange={this.handleInputChange.bind(this)}>
                               <option value="">{t('page.dtm.style.AddProcess.select')}</option>
                               {this.state.interfaces && this.state.interfaces.map(d =>
                                   <option key={"i_"+d.fullName} value={d.fullName}>{d.displayName}</option>
                               )}
                           </select>
                       </div>
                       <div className="form-group m-2">
                           <label className={"sr-only"} htmlFor="filter">{t('page.dtm.style.AddProcess.filter')}</label>
                           <select disabled={this.state.disabled} name="filterName" className="form-control filter" placeholder="Filter"  value={this.state.fields["filterName"]} onChange={this.handleInputChange.bind(this)}>
                               <option value="">{t('page.dtm.style.AddProcess.selectFilter')}</option>
                               {this.state.filters.map(d =>
                                   <option key={"f_"+d.name} data-command={d.command} value={d.name}>{d.name}</option>
                               )}
                           </select>
                       </div>
                       <div className="form-group m-2">
                           <input disabled={this.state.disabled} name="filterText" type="text" className="form-control filter" placeholder="filter" value={this.state.filterFields["filterText"]} onChange={this.handleInputChange.bind(this)}/>
                       </div>
                       { !this.state.process.active?
                           <button disabled={this.state.onload?'disabled':''} type="submit" className="btn btn-primary m-2">start</button>
                           :
                           <button disabled={this.state.onload?'disabled':''} onClick={() => this.stopProcess()} type="button" className="btn btn-danger m-2">stop</button>
                       }


                       <small style={{color: "red"}}>{this.state.errors["filterText"]}</small>
                       <small style={{color: "red"}}>{this.state.errors["interfaceName"]}</small>
                   </form>
               </div>

               <div className={"table-scroll"}>
                   <table className="table table-striped table-hover table-dark">
                       <thead>
                           <tr>
                               {this.state.fields.map((d) =>
                                   <th key={"c_"+d}>{d}</th>
                               )}
                           </tr>
                       </thead>
                       <tbody>
                         {this.state.data.map((line) =>
                             <tr>
                                 {line.map((d) =>
                                     <th>{d}</th>
                                 )}
                             </tr>
                         )}
                       </tbody>
                   </table>
               </div>
           </div>
        )
    }

}

export default withTranslation()(RealTimeDTMComponent);