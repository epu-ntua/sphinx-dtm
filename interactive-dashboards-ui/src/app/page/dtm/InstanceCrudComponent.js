import React from 'react';
import { withTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

class InstanceCrudComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            fields: {
                id:"",
                url:"",
                name:"",
                key:"",
                description:"",
                isMaster:false,
                hasTshark:false,
                hasSuricata:false
            },
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({id: id});

        if (id){

            document.title = "DTM - Edit instance";

            const { id } = this.props.match.params;

            var getInstanceUrl = this.state.server+'/sphinx/dtm/instance/'+id;
            var response = await fetch(getInstanceUrl);
            const body = await response.json();
            this.setState({ fields: body, isLoading: false });
        }else{
            document.title = "DTM - Add instance";
        }

    }

    saveInstance(){

        let data = {
            id:this.state.fields.id,
            url: this.state.fields.url,
            name: this.state.fields.name,
            key: this.state.fields.key,
            description: this.state.fields.description,
            isMaster:this.state.fields.isMaster,
            hasTshark:this.state.fields.hasTshark,
            hasSuricata:this.state.fields.hasSuricata
        };

        let url = this.state.server+'/sphinx/dtm/instance/save';
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
                if (data.status==500){
                    toast.error('the operation could not be performed successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else{
                    window.location = "./dtm/instances";
                }

            })
            .catch(error => console.log(error));
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Url
        if (!fields["url"]) {
            formIsValid = false;
            errors["url"] = "Cannot be empty";
        }

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        //Key
        if (!fields["key"]) {
            formIsValid = false;
            errors["key"] = "Cannot be empty";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleInputChange(event) {
        let fields = this.state.fields;

        const target = event.target;
        const value = target.name === 'isMaster' || target.name === 'hasTshark'  || target.name === 'hasSuricata' ? target.checked : target.value;
        //const value = target.value;
        const name = target.name;

        fields[name] = value;

        this.setState({fields});

    }

    instanceSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
            this.saveInstance();
        }
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">{t('page.dtm.style.AddInstance.home')}</a></li>
                       <li className="breadcrumb-item active"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item active"><a href="./dtm/instances">Instances</a></li>
                       <li className="breadcrumb-item active" aria-current="page">{t('page.dtm.style.AddInstance.add')}</li>
                   </ol>
               </nav>

               <div className="card">
                   <form name="instanceForm" className="instanceForm" onSubmit= {this.instanceSubmit.bind(this)}>
                       <input name="id" type="hidden" value={this.state.fields["id"]}/>
                       <div className="card-body">
                           <fieldset className="scheduler-border">
                               <legend className="scheduler-border">Details</legend>
                               <div className="form-group">
                                   <label htmlFor="url">{t('page.dtm.style.AddInstance.url')}</label>
                                   <input name="url" type="text" className="form-control" placeholder={t('page.dtm.style.AddInstance.url')} value={this.state.fields["url"]} onChange={this.handleInputChange}/>
                                   <small style={{color: "red"}}>{this.state.errors["url"]}</small>
                               </div>
                               <div className="form-group">
                                   <label htmlFor="name">{t('page.dtm.style.AddInstance.name')}</label>
                                   <input name="name" type="text" className="form-control" placeholder={t('page.dtm.style.AddInstance.name')} value={this.state.fields["name"]} onChange={this.handleInputChange}/>
                                   <small style={{color: "red"}}>{this.state.errors["name"]}</small>
                               </div>
                               <div className="form-group">
                                   <label htmlFor="description">{t('page.dtm.style.AddInstance.description')}</label>
                                   <input name="description" className="form-control" type="text" placeholder={t('page.dtm.style.AddInstance.description')} onChange={this.handleInputChange} value={this.state.fields["description"]}/>
                                   <small style={{color: "red"}}>{this.state.errors["description"]}</small>
                               </div>
                               <div className="form-group">
                                   <label htmlFor="key">{t('page.dtm.style.AddInstance.Key')}</label>
                                   <input disabled={this.state.id?"disabled":""} name="key" type="text" className="form-control"  placeholder={t('page.dtm.style.AddInstance.Key')} onChange={this.handleInputChange} value={this.state.fields["key"]}/>
                                   <small style={{color: "red"}}>{this.state.errors["key"]}</small>
                               </div>
                               <div className="form-check">
                                   <input type="checkbox" className="form-check-input" id="isMaster" name="isMaster"  checked={this.state.fields["isMaster"]} onChange={this.handleInputChange}/>
                                   <label className="form-check-label" htmlFor="isMaster">Master</label>
                               </div>
                           </fieldset>

                           <fieldset className="scheduler-border">
                               <legend className="scheduler-border">Tools</legend>
                               <div className="form-check form-check-inline">
                                   <input type="checkbox" className="form-check-input" name="hasTshark" id="hasTshark" checked={this.state.fields["hasTshark"]} onChange={this.handleInputChange}/>
                                   <label className="form-check-label" htmlFor="hasTshark">Tshark</label>
                               </div>

                               <div className="form-check form-check-inline">
                                   <input type="checkbox" className="form-check-input" name="hasSuricata" id="hasSuricata" checked={this.state.fields["hasSuricata"]} onChange={this.handleInputChange}/>
                                   <label className="form-check-label" htmlFor="hasSuricata">Suricata</label>
                               </div>

                           </fieldset>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">Save</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(InstanceCrudComponent);