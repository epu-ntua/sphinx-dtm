import React from 'react';
import { withTranslation } from 'react-i18next';

class EditFilterComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            instanceId:"",
            fields: {
                id:"",
                name:"",
                command:"",
                description:""
            },
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        document.title = "DTM - Edit filter";

        const { instanceId } = this.props.match.params;
        this.setState({instanceId:instanceId});

        const { id } = this.props.match.params;

        var getProcessesUrl = this.state.server+'/sphinx/dtm/process/filter/'+id;
        var response = await fetch(getProcessesUrl);
        const body = await response.json();
        this.setState({ fields: body, isLoading: false });
    }

    saveFilter(){

        let data = {
            id:this.state.fields.id,
            name: this.state.fields.name,
            command: this.state.fields.command,
            description: this.state.fields.description
        };

        let url = this.state.server+'/sphinx/dtm/process/filter/save';
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
                window.location = "./dtm/instance/"+this.state.instanceId+"/tshark/filter";
                console.log(data)}
            )
            .catch(error => console.log(error));
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        //Command
        if (!fields["command"]) {
            formIsValid = false;
            errors["command"] = "Cannot be empty";
        }

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

    filterSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
            this.saveFilter();
        }
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.EditFilter.Home')}</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/instances">{t('page.dtm.style.EditFilter.dtm')}</a></li>
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.instanceId+"/tshark"}>{t('page.dtm.style.EditFilter.instance')}</a></li>
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.instanceId+"/tshark/filter"}>{t('page.dtm.style.EditFilter.filters')}</a></li>
                       <li className="breadcrumb-item active" aria-current="page">{t('page.dtm.style.EditFilter.editFilter')}</li>
                   </ol>
               </nav>

               <div className="mt-3 mb-3 text-left">
                   {/*
                   <button className="btn btn-success">Add process</button>&nbsp;
                   */
                   }
                   {/*
                   <a href="/dtm/process" className="btn btn-success">Process management</a>&nbsp;
                   <a href="/dtm/filter" className="btn btn-success">Filter management</a>&nbsp;
                   */}
               </div>

               <div className="card">
                   <form name="filterForm" className="filterForm" onSubmit= {this.filterSubmit.bind(this)}>
                       <input name="id" type="hidden" value={this.state.fields["id"]}/>
                       <div className="card-body">
                           <div className="form-group">
                               <label htmlFor="name">{t('page.dtm.style.EditFilter.name')}</label>
                               <input name="name" type="text" className="form-control" placeholder={t('page.dtm.style.EditFilter.placeName')} value={this.state.fields["name"]} onChange={this.handleInputChange}/>
                               <small style={{color: "red"}}>{this.state.errors["name"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="description">{t('page.dtm.style.EditFilter.description')}</label>
                               <input name="description" className="form-control" type="text" placeholder={t('page.dtm.style.EditFilter.placeDesc')} onChange={this.handleInputChange} value={this.state.fields["description"]}/>
                               <small style={{color: "red"}}>{this.state.errors["description"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="command">{t('page.dtm.style.EditFilter.command')}</label>
                               <input name="command" type="text" className="form-control"  placeholder={t('page.dtm.style.EditFilter.placeCommand')} onChange={this.handleInputChange} value={this.state.fields["command"]}/>
                               <small style={{color: "red"}}>{this.state.errors["command"]}</small>
                           </div>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">{t('page.dtm.style.EditFilter.btnSave')}</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(EditFilterComponent);