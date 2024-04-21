import React from 'react';
import { withTranslation } from 'react-i18next';

class EditProcessComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            instanceId:"",
            fields: {
                processModel:{
                    pid:"",
                    interfaceName:"",
                    filterName:""
                }
            },
            filters:[],
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        document.title = "DTM - Edit process";

        const { id } = this.props.match.params;
        this.setState({instanceId:id});

        const { pid } = this.props.match.params;
        var getProcessUrl = this.state.server+'/sphinx/dtm/tshark/status/'+pid;
        var response = await fetch(getProcessUrl);
        const body = await response.json();
        this.setState({ fields: body, isLoading: false });

        var getFiltersUrl = this.state.server+'/sphinx/dtm/process/filter/all';
        var response = await fetch(getFiltersUrl);
        const filters = await response.json();
        this.setState({ filters: filters, isLoading: false });
    }

    save(){

        let data = {
            pid:this.state.fields.processModel.pid,
            interfaceName: this.state.fields.processModel.interfaceName,
            filterName: this.state.fields.processModel.filterName
        };

        let url = this.state.server+'/sphinx/dtm/tshark/process/update/'+this.state.instanceId;

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
                window.location = "./dtm/instance/"+this.state.instanceId+"/tshark";
                console.log(data)}
            )
            .catch(error => console.log(error));
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        this.setState({errors: errors});
        return formIsValid;
    }

    handleInputChange(event) {
        let fields = this.state.fields;

        const target = event.target;
        const value = target.value;
        const name = target.name;

        fields["processModel"][name] = value;

        this.setState({fields});

    }

    processSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
            this.save();
        }
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.EditProcess.Home')}</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/instances">{t('page.dtm.style.EditProcess.dtm')}</a></li>
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.instanceId+"/tshark"}>{t('page.dtm.style.EditProcess.instance')}</a></li>
                       <li className="breadcrumb-item active" aria-current="page">{t('page.dtm.style.EditProcess.editProcess')}</li>
                   </ol>
               </nav>

               <div className="mt-3 mb-3 text-left">
                   {/*
                   <button className="btn btn-success">Add process</button>&nbsp;
                   */
                   }
                   {/*
                   <a href="/dtm/process" className="btn btn-success">Process management</a>&nbsp;
                   */}
               </div>

               <div className="card text-left">
                   <form name="processForm" className="processForm" onSubmit={this.processSubmit.bind(this)}>
                       <div className="card-body">
                           <div className="form-group">
                               <label htmlFor="pid">{t('page.dtm.style.EditProcess.pid')}</label>: <b><span>{this.state.fields["processModel"]["pid"]}</span></b>
                               <input name="pid" type="hidden" value={this.state.fields["pid"]}/>
                           </div>
                           <div className="form-group">
                               <label htmlFor="interfaceName">{t('page.dtm.style.EditProcess.interfaceName')}</label>: <b><span>{this.state.fields["processModel"]["interfaceName"]}</span></b>
                               <input name="interfaceName" type="hidden" value={this.state.fields["processModel"]["interfaceName"]}/>
                               <small style={{color: "red"}}>{this.state.errors["interfaceName"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="filter">{t('page.dtm.style.EditProcess.filter')}</label>
                               <select name="filterName" className="form-control" placeholder="Filter"  value={this.state.fields["processModel"]["filterName"]} onChange={this.handleInputChange}>
                                   <option value="">{t('page.dtm.style.EditProcess.selectFilter')}</option>
                               {this.state.filters.map(d =>
                                   <option key={'f_'+d.name} value={d.name}>{d.name}</option>
                               )}
                               </select>
                               <small style={{color: "red"}}>{this.state.errors["filterName"]}</small>
                           </div>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">{t('page.dtm.style.EditProcess.save')}</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(EditProcessComponent);