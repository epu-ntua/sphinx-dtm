import React from 'react';
import { withTranslation } from 'react-i18next';

class BlackWebCategoryCrud extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            app: "/sphinx/dtm/",
            fields: {
                id:"",
                name:"",
                description:""
            },
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        document.title = "DTM - Edit BlackWeb Category";

        const { id } = this.props.match.params;

        if (id){
            var getBlackWebCategoryUrl = this.state.server + this.state.app + 'blackwebcategory/'+id;
            var response = await fetch(getBlackWebCategoryUrl);
            const body = await response.json();
            this.setState({ fields: body, isLoading: false });
        }

    }

    save(){

        let data = {
            id:this.state.fields.id,
            name: this.state.fields.name,
            description: this.state.fields.description
        };

        let url = this.state.server + this.state.app + '/blackwebcategory/save';
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
                window.location = "./dtm/custom-rules#blackweb";
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
                       <li className="breadcrumb-item"><a href="./dtm/custom-rules">Custom rules</a></li>
                       <li className="breadcrumb-item active" aria-current="page">
                           {(this.state.fields.id)?'Edit':'Add'}
                           BlackWeb Category
                       </li>
                   </ol>
               </nav>

               <div className="card">
                   <form name="blackWebCategoryForm" className="blackWebCategoryForm" onSubmit= {this.filterSubmit.bind(this)}>
                       <input name="id" type="hidden" value={this.state.fields["id"]}/>
                       <div className="card-body">
                           <div className="form-group">
                               <label htmlFor="name">{t('page.ad.style.BlackWebCategory.name')}</label>
                               <input name="name" type="text" className="form-control"  placeholder={t('page.ad.style.BlackWebCategory.placeName')} onChange={this.handleInputChange} value={this.state.fields["name"]}/>
                               <small style={{color: "red"}}>{this.state.errors["name"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="description">{t('page.ad.style.BlackWebCategory.Description')}</label>
                               <input name="description" className="form-control" type="text" placeholder={t('page.ad.style.BlackWebCategory.placeDesc')} onChange={this.handleInputChange} value={this.state.fields["description"]}/>
                               <small style={{color: "red"}}>{this.state.errors["description"]}</small>
                           </div>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">save</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(BlackWebCategoryCrud);