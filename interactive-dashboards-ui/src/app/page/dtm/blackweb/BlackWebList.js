import React from 'react';
import { withTranslation } from 'react-i18next';

import { faSpinner, faSpin } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {faChartBar} from "@fortawesome/free-solid-svg-icons/index";

class BlackWebList extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            file:"",
            id:"",
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            app: "/sphinx/dtm/",
            data:[],
            category:"",
            errors: {},
            loadingImport: false
        }

    }

    async componentDidMount() {
        document.title = "DTM - BlackWeb";

        const { id } = this.props.match.params;
        this.setState({ id: id, isLoading: false });

        var getBlackWebUrl = this.state.server + this.state.app + 'blackweb/list/'+id;
        var response = await fetch(getBlackWebUrl);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

        var getBlackWebCategoryUrl = this.state.server + this.state.app + 'blackwebcategory/'+id;
        var response = await fetch(getBlackWebCategoryUrl);
        const body2 = await response.json();
        this.setState({category:body2, isLoading: false });
    }

    delete(d){
        this.doAction(d,this.state.server + this.state.app + 'blackweb/delete/'+d.id);
    }

    doAction(d, url){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                window.location = "./dtm/custom-rules/blackweb/list/"+this.state.id;
            })
            .catch(()=>{
                window.location = "./dtm/custom-rules/blackweb/list/"+this.state.id;
            });
    }

    onFileChange = (event) => {
        event.preventDefault();

        this.setState({loadingImport:true});

        let data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', event.target.files[0].name);

        fetch(this.state.server + this.state.app + 'blackweb/upload/'+this.state.id, {
            method: 'POST',
            body: data
        }).then(response => {
            window.location = "./dtm/custom-rules/blackweb/list/"+this.state.id;
        }).catch(err => {

        });
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
                            {t('page.ad.style.blackWebList.blackWebList')}&nbsp;<b>{this.state.category.name}</b>
                            &nbsp;{t('page.ad.style.blackWebList.category')}</li>
                    </ol>
                </nav>

                <div className="mt-3 mb-3 text-left">
                    <a href={"./dtm/custom-rules/blackweb/"+this.state.category.id+"/crud"} className="btn btn-primary">Add domain</a>&nbsp;

                    {
                        this.state.loadingImport?
                            (
                                <span className="btn btn-info">
                                    <FontAwesomeIcon icon={faSpinner} spin/> &nbsp;
                                    {t('page.ad.style.blackWebList.btnImportFile')}
                                </span>
                            )
                            :
                            (
                                <span>
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        <div className="btn btn-info">{t('page.ad.style.blackWebList.btnImportFile')}</div>
                                    </label>
                                    <input onChange={this.onFileChange} id="file-upload" type="file"/>
                                </span>
                            )
                    }
                </div>

                <table className="table table-striped table-hover table-dark">
                    <thead>
                    <tr>
                        <th>{t('page.ad.style.blackWebList.domain')}</th>
                        {/*  <th>category</th> */}
                        <th>{t('page.ad.style.blackWebList.actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(d =>
                        <tr>
                            <td>{d.domain}</td>
                            {/*  <td>{d.category.name}</td> */}
                            <td className="text-center">
                                    <span>
                                        <a href={"./dtm/custom-rules/blackweb/"+this.state.category.id+"/crud/"+d.id} type="button" className="btn btn-primary">{t('page.ad.style.blackWebList.btnEdit')}</a>&nbsp;
                                        <button onClick={() => this.delete(d)} type="button" className="btn btn-danger">{t('page.ad.style.blackWebList.btnDelete')}</button>&nbsp;
                                    </span>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </table>

            </div>
        )
    }

}

export default withTranslation()(BlackWebList);