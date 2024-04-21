import React from 'react';
import { withTranslation } from 'react-i18next';

class BlackWebCrud extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server:window._env_.REACT_APP_SPHINX_DTM_API_URL,
            app: "/sphinx/dtm/",
            categoryList:[],
            fields: {
                id:"",
                domain:"",
                category:""
            },
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        document.title = "DTM - Edit BlackWeb";

        const { id } = this.props.match.params;
        const { categoryId } = this.props.match.params;

        this.setState({categoryId:categoryId});

        if (id){
            var getBlackWebCUrl = this.state.server + this.state.app + '/blackweb/'+id;
            var response = await fetch(getBlackWebCUrl);
            const body = await response.json();
            this.setState({ fields: body, isLoading: false });
        }else{
            var getBlackWebCategoryUrl = this.state.server + this.state.app + '/blackwebcategory/'+categoryId;
            var response = await fetch(getBlackWebCategoryUrl);
            const body2 = await response.json();
            this.setState({ fields:{category:body2}, isLoading: false });

            /*
            var getBlackWebCategoryUrl = this.state.server+'/sphinx/ad/blackwebcategory/list';
            var response = await fetch(getBlackWebCategoryUrl);
            const body2 = await response.json();
            this.setState({ categoryList: body2, isLoading: false });
            */
        }



    }

    save(){

        let data = {
            id:this.state.fields.id,
            domain: this.state.fields.domain,
            category: this.state.fields.category
        };

        let url = this.state.server + this.state.app + 'blackweb/save';
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
                window.location = "./dtm/custom-rules/blackweb/list/"+this.state.categoryId;
                console.log(data)}
            )
            .catch(error => console.log(error));
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //domain
        if (!fields["domain"]) {
            formIsValid = false;
            errors["domain"] = "Cannot be empty";
        }

        //Category
        if (!fields["category"]) {
            formIsValid = false;
            errors["category"] = "Cannot be empty";
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

    submit(e){
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


                       <li className="breadcrumb-item"><a href={"./dtm/custom-rules/blackweb/list/"+this.state.categoryId}>Blackweb list</a></li>
                       <li className="breadcrumb-item active" aria-current="page">
                           {(this.state.fields.id)? 'Edit' : 'Add'}
                           {t('page.ad.style.blackWebCrud.blackWeb')}
                       </li>
                   </ol>
               </nav>

               <div className="card">
                   <form name="blackWebCategoryForm" className="blackWebCategoryForm" onSubmit= {this.submit.bind(this)}>
                       <input name="id" type="hidden" value={this.state.fields["id"]}/>
                       <div className="card-body">
                           <div className="form-group">
                               <label htmlFor="domain">{t('page.ad.style.blackWebCrud.domain')}</label>
                               <input name="domain" type="text" className="form-control"  placeholder={t('page.ad.style.blackWebCrud.placeDomain')} onChange={this.handleInputChange} value={this.state.fields["domain"]}/>
                               <small style={{color: "red"}}>{this.state.errors["domain"]}</small>
                           </div>
                           <div className="form-group">
                               <label htmlFor="category">{t('page.ad.style.blackWebCrud.Category')}</label>

                               <input name="category" type="text" className="form-control"  placeholder={t('page.ad.style.blackWebCrud.placeCategory')} readOnly value={this.state.fields.category.name}/>

                               {/*
                               <select name="category" className="form-control" placeholder="Category"  value={this.state.fields["category"]} onChange={this.handleInputChange}>
                                   <option value="">Select a category...</option>
                                   {this.state.categoryList.map(d =>
                                       <option value={d.name}>{d.name}</option>
                                   )}
                               </select>
                               */}

                               <small style={{color: "red"}}>{this.state.errors["category"]}</small>
                           </div>
                       </div>
                       <div className="card-footer text-muted text-right">
                           <button type="submit" className="btn btn-primary">{t('page.ad.style.blackWebCrud.btnSave')}</button>
                       </div>
                   </form>
               </div>

           </div>
        )
    }

}

export default withTranslation()(BlackWebCrud);