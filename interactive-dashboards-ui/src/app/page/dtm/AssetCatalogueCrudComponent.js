import React from 'react';
import { withTranslation } from 'react-i18next';

class AssetCatalogueCrudComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            fields: {
                id:"",
                name:"",
                physicalAddress:"",
                description:""
            },
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        document.title = "DTM - Asset Catalogue";

        const { id } = this.props.match.params;
        const { physicalAddress } = this.props.match.params;

        if (id) {
            var getAssetCatalogueUrl = this.state.server + '/sphinx/dtm/assetcatalogue/' + id;
            var response = await fetch(getAssetCatalogueUrl);
            const body = await response.json();
            this.setState({fields: body, isLoading: false});
        }else{
            let fields = this.state.fields;
            fields["physicalAddress"] = physicalAddress;
            this.setState({"fields":fields});
        }
    }

    save(){

        let data = {
            id:this.state.fields.id,
            name: this.state.fields.name,
            physicalAddress: this.state.fields.physicalAddress,
            description: this.state.fields.description
        };

        let url = this.state.server+'/sphinx/dtm/assetcatalogue/save';
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
                window.location = "./dtm/asset-discovery";
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

        //physicalAddress
        if (!fields["physicalAddress"]) {
            formIsValid = false;
            errors["physicalAddress"] = "Cannot be empty";
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
                       <li className="breadcrumb-item active" aria-current="page">Asset discovery</li>
                       <li className="breadcrumb-item active" aria-current="page">Edit</li>
                   </ol>
               </nav>

               <div className="card">
                   <form name="assetCatalogueForm" className="assetCatalogueForm" onSubmit= {this.filterSubmit.bind(this)}>
                       <input name="id" type="hidden" value={this.state.fields["id"]}/>
                       <div className="card-body">
                           <div className="form-group">
                               <label htmlFor="name">{t('page.ad.style.EditAssetCatalogue.phAddress')}</label>
                               <input readOnly={"readOnly"} name="physicalAddress" type="text" className="form-control" placeholder={t('page.ad.style.EditAssetCatalogue.placeAddress')} value={this.state.fields["physicalAddress"]} onChange={this.handleInputChange}/>
                               <small style={{color: "red"}}>{this.state.errors["physicalAddress"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="name">{t('page.ad.style.EditAssetCatalogue.name')}</label>
                               <input name="name" type="text" className="form-control"  placeholder={t('page.ad.style.EditAssetCatalogue.placeName')} onChange={this.handleInputChange} value={this.state.fields["name"]}/>
                               <small style={{color: "red"}}>{this.state.errors["name"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="description">{t('page.ad.style.EditAssetCatalogue.Description')}</label>
                               <input name="description" className="form-control" type="text" placeholder={t('page.ad.style.EditAssetCatalogue.placeDesc')} onChange={this.handleInputChange} value={this.state.fields["description"]}/>
                               <small style={{color: "red"}}>{this.state.errors["description"]}</small>
                           </div>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">{t('page.ad.style.EditAssetCatalogue.btnSave')}</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(AssetCatalogueCrudComponent);