import React from 'react';
import { withTranslation } from 'react-i18next';

class PortCatalogueCrud extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            port:"",
            fields: {
                id:"",
                port:"",
                endPortInterval:"",
                name:"",
                description:""
            },
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {

        document.title = "AD - Port Catalogue";

        const {port} = this.props.match.params;
        this.setState({port: port});

        const {id} = this.props.match.params;
        this.setState({id: id});

        if (id) {
            var getPortCatalogueUrl = this.state.server+'/sphinx/dtm/portcatalogue/'+id;
            var response = await fetch(getPortCatalogueUrl);
            const body = await response.json();
            if (body && body["endPortInterval"]==null){
                body["endPortInterval"]="";
            }
            this.setState({ fields: body, isLoading: false });
        }else{
            let fields = this.state.fields;
            fields["port"] = port;
            this.setState({"fields":fields});
        }
    }

    save(){

        let data = {
            id:this.state.fields.id,
            name: this.state.fields.name,
            port: this.state.fields.port,
            endPortInterval: this.state.fields.endPortInterval,
            description: this.state.fields.description
        };

        let url = this.state.server+'/sphinx/dtm/portcatalogue/save';
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
            .then(data => {console.log(data);  window.location = "./dtm/custom-rules#portdiscovery";})
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

        //port
        if (!fields["port"]) {
            formIsValid = false;
            errors["port"] = "Cannot be empty";
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

    portCatalogueSubmit(e){
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
                       <li className="breadcrumb-item"><a href="./">Home</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/custom-rules">Custom rules</a></li>
                       <li className="breadcrumb-item active" aria-current="page">Port catalogue</li>
                   </ol>
               </nav>

               <div className="card">
                   <form name="portCatalogueForm" className="portCatalogueForm" onSubmit= {this.portCatalogueSubmit.bind(this)}>
                       <input name="id" type="hidden" value={this.state.fields["id"]}/>
                       <div className="card-body">
                           <div className={"row"}>
                               <div className="form-group col">
                                   <label htmlFor="port">{t('page.ad.style.PortCatalog.portField')}</label>
                                   <input name="port" type="text" className="form-control" placeholder={t('page.ad.style.PortCatalog.placePort')} value={this.state.fields["port"]} onChange={this.handleInputChange}/>
                                   <small style={{color: "red"}}>{this.state.errors["port"]}</small>
                               </div>

                               <div className="form-group col">
                                   <label htmlFor="endPortInterval">{t('page.ad.style.PortCatalog.endPort')}</label>
                                   <input name="endPortInterval" type="text" className="form-control" placeholder={t('page.ad.style.PortCatalog.placeEndPort')} value={this.state.fields["endPortInterval"]} onChange={this.handleInputChange}/>
                                   <small style={{color: "red"}}>{this.state.errors["endPortInterval"]}</small>
                               </div>
                           </div>
                           <div className="form-group">
                               <label htmlFor="name">{t('page.ad.style.PortCatalog.name')}</label>
                               <input name="name" type="text" className="form-control"  placeholder={t('page.ad.style.PortCatalog.placeName')} onChange={this.handleInputChange} value={this.state.fields["name"]}/>
                               <small style={{color: "red"}}>{this.state.errors["name"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="description">{t('page.ad.style.PortCatalog.description')}</label>
                               <input name="description" className="form-control" type="text" placeholder={t('page.ad.style.PortCatalog.placeDescription')} onChange={this.handleInputChange} value={this.state.fields["description"]}/>
                               <small style={{color: "red"}}>{this.state.errors["description"]}</small>
                           </div>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">{t('page.ad.style.PortCatalog.btnSave')}</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(PortCatalogueCrud);