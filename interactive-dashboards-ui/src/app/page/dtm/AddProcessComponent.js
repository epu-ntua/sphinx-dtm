import React from 'react';
import { withTranslation } from 'react-i18next';

class AddProcessComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            instanceId:"",
            fields: {
                interfaceName:"",
                filterName:""
            },
            interfaces:[],
            filters:[],
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        document.title = "DTM - Add process";

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
    }

    save(){

        let data = {
            interfaceFullName: this.state.fields.interfaceName,
            filterName: this.state.fields.filterName
        };

        let url = this.state.server+'/sphinx/dtm/tshark/process/save/'+this.state.instanceId;

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
                console.log(data);
            }
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

        fields[name] = value;

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
                       <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.AddProcess.Home')}</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/instances">{t('page.dtm.style.AddProcess.dtm')}</a></li>
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.instanceId+"/tshark"}>{t('page.dtm.style.AddProcess.instance')}</a></li>
                       <li className="breadcrumb-item active" aria-current="page">{t('page.dtm.style.AddProcess.addProcess')}</li>
                   </ol>
               </nav>

               <div className="card text-left">
                   <form name="processForm" className="processForm" onSubmit={this.processSubmit.bind(this)}>
                       <div className="card-body">
                           <div className="form-group">
                               <label htmlFor="interfaceName">{t('page.dtm.style.AddProcess.interfaceName')}</label>
                               <select name="interfaceName" className="form-control" placeholder="Filter"  value={this.state.fields["interfaceName"]} onChange={this.handleInputChange}>
                                   <option value="">{t('page.dtm.style.AddProcess.select')}</option>
                                   {this.state.interfaces.map(d =>
                                       <option value={d.fullName}>{d.displayName}</option>
                                   )}
                               </select>
                               <small style={{color: "red"}}>{this.state.errors["interfaceName"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="filter">{t('page.dtm.style.AddProcess.filter')}</label>
                               <select name="filterName" className="form-control" placeholder="Filter"  value={this.state.fields["filterName"]} onChange={this.handleInputChange}>
                                   <option value="">{t('page.dtm.style.AddProcess.selectFilter')}</option>
                               {this.state.filters.map(d =>
                                   <option value={d.name}>{d.name}</option>
                               )}
                               </select>
                               <small style={{color: "red"}}>{this.state.errors["filterName"]}</small>
                           </div>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">{t('page.dtm.style.AddProcess.save')}</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(AddProcessComponent);