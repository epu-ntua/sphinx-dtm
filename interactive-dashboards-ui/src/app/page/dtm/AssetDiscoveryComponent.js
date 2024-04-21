import React from 'react';
import {withTranslation} from 'react-i18next';
import $ from "jquery";

class AssetDiscoveryComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            dataAssetCatalogue: [],
            dataAssetDiscovery: [],
            dataConfig:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM - Asset discovery";

        var getAssetCataloguesAlertList = this.state.server + '/sphinx/dtm/assetcatalogue/getAssetCatalogueList';
        var response = await fetch(getAssetCataloguesAlertList);
        const bodyAc = await response.json();
       // this.setState({dataAssetCatalogue: bodyAc, isLoading: false});
        this.addAssetCatalog(bodyAc);

        var getAssetDiscoveryAlertList = this.state.server + '/sphinx/dtm/assetcatalogue/getAssetDiscoveryAlerts';
        var response = await fetch(getAssetDiscoveryAlertList);
        const bodyAda = await response.json();
        this.setState({dataAssetDiscovery: bodyAda, isLoading: false});

        var getConfig = this.state.server+'/sphinx/dtm/config/all/dtm.assetDiscovery.';
        var responseConfig= await fetch(getConfig);
        const bodyConfig = await responseConfig.json();
        this.setState({ dataConfig: bodyConfig, isLoading: false });

    }

    addAssetCatalog(b){
        var res  = b.map(a => a.typeId);
        for (var i = 0; i < res.length ; i++)
        {
            if(res[i] == 1){
                return this.setState({dataAssetCatalogue:b, isLoading: false});
                window.location.reload(true);
            }
        }
    }

    deleteAssetCatalog(d) {
        this.doAction(d, this.state.server + '/sphinx/dtm/assetcatalogue/delete/' + d.id);
    }

    doAction(d, url, returnUrl) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (returnUrl) {
                    window.location = "./dtm/asset-discovery";
                    window.location.reload(false);
                } else {
                    window.location.reload(false);
                }
            })
            .catch(() => {

            });
    }

    date(timestamp) {
        return timestamp.substr(0, timestamp.indexOf(".")).replace("T", " ");
    }

    formatDate(timestamp) {
        return timestamp.replace("/","-");
    }

    handleInputChange(event) {
        const target = event.target;

        var value = '';
        if (target.name === 'booleanValue'){
            value = target.checked;
        }else{
            value = target.value;
        }

        let data = null;

        const codeConfig = target.getAttribute('dataConfig-code');

        if(codeConfig !== null){
            data = this.state.dataConfig;
            if (data[codeConfig]['type']=='PERIOD'){

                var um = $( "#"+codeConfig.replaceAll(".","\\.")+"\\.period").val();
                var val = $( "#"+codeConfig.replaceAll(".","\\.")+"\\.value").val();

                if (val==null || val=='' || val.trim()==''){
                    data[codeConfig]['value'] =  val +' '+um;
                    this.setState({data});
                    return;
                }
                data[codeConfig]['value'] = val + ' '+um;
            }else {
                data[codeConfig]['value'] = value + '';
            }
            this.save(this.state.dataConfig[codeConfig]);
        }

        this.setState({data});
    }

    save(config){
        let url = this.state.server+'/sphinx/dtm/config/save';
        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config)
        })
            .then(response => response.json())
            .then(data => {console.log(data);})
            .catch(error => console.log(error));
    }

    handleListNumericChange(evt) {
        var validNumber = new RegExp(/^(\d\,?)*$/);
        if (validNumber.test(evt.target.value)) {
            this.handleInputChange(evt);
        }
    };

    isActive(t) {
        var t = "#" + t;
        var tab = window.location.hash;
        if (tab == null || tab == "" || tab == undefined) {
            if (t == "#asset-discovery-main") {
                return " show active";
            } else {
                return "";
            }
        }
        if (t === tab) {
            return " show active";
        }
        return "";
    }

    render() {
        var dtf = new Intl.DateTimeFormat('en-US',
            {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false
            });
        const {t} = this.props;
        return (
            <div className="container mt-3">

                <nav aria-label="breadcrumb breadcrumb-dark">
                    <ol className="breadcrumb breadcrumb-dark">
                        <li className="breadcrumb-item"><a href="../../../../../../../Users/danielaco/Desktop">Home</a></li>
                        <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Asset discovery</li>
                    </ol>
                </nav>

                <ul className="nav nav-tabs" id="assetDiscoveryTab" role="tablist">
                    <li className="nav-item">
                        <a className={"nav-link " + this.isActive('asset-discovery-main')} id="asset-discovery-main-tab"
                           data-toggle="tab" href="#asset-discovery-main" role="tab"
                           aria-controls="asset-discovery-main"
                           aria-selected="true">{t("page.dtm.assetDiscoveryComponent.assetDiscoveryTab.assetDiscoveryMain")}</a>
                    </li>

                    <li className="nav-item">
                        <a className={"nav-link " + this.isActive('asset-discovery-config')}
                           id="asset-discovery-config-tab" data-toggle="tab" href="#asset-discovery-config" role="tab"
                           aria-controls="asset-discovery-config"
                           aria-selected="true">{t("page.dtm.assetDiscoveryComponent.assetDiscoveryTab.assetDiscoveryConfig")}</a>
                    </li>

                </ul>

                <div className="tab-content" id="myTabContent">

                    <div className={"tab-pane fade show " + this.isActive('asset-discovery-main')} id="asset-discovery-main" role="tabpanel"
                         aria-labelledby="asset-discovery-main-tab">

                        <div id="accordion">

                            <div className="card border-0">
                                <div className="card-header table-title" id="heading1">
                                    <a data-toggle="collapse"
                                       data-target="#collapse1" aria-expanded="true"
                                       aria-controls="collapse1">
                                        {t('page.dtm.assetDiscoveryComponent.assetDiscovery')}
                                    </a>
                                </div>

                                <div id="collapse1" className="collapse show" aria-labelledby="heading1"
                                     data-parent="#accordion">
                                    <div className="card-body p-0 m-0">
                                        <table className="table table-hover table-dark mb-0">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetDiscovery.physicalAdr')}</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetDiscovery.date')}</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetDiscovery.actions')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.dataAssetDiscovery.length === 0 ? (
                                                <tr align="center">
                                                    <td colSpan="6">No Device Found</td>
                                                </tr>
                                            ) : (
                                            this.state.dataAssetDiscovery.map((d, index) =>
                                                d.idAlert != null ? (
                                                <tr key={"dad_" + index}>
                                                <td scope="row">{index + 1}</td>
                                                <td scope="row">{d.physicalAddress}</td>
                                                <td scope="row">{d.lastTouchDate}</td>
                                                <td>
                                                <a href={"./dtm/assetcatalogue/add/" + d.physicalAddress}
                                                type="button"
                                                className="btn btn-success">{t('page.dtm.assetDiscoveryComponent.btnAdd')}</a>
                                                </td>
                                                </tr>
                                                ) : " "

                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="card border-0">
                                <div className="card-header table-title" id="heading2">
                                    <a data-toggle="collapse"
                                       data-target="#collapse2" aria-expanded="true"
                                       aria-controls="collapse2">
                                        {t('page.dtm.assetDiscoveryComponent.assetCatalogue')}
                                    </a>
                                </div>

                                <div id="collapse2" className="collapse show" aria-labelledby="heading2"
                                     data-parent="#accordion">
                                    <div className="card-body p-0 m-0">

                                        <table className="table table-hover table-dark mb-0">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetCatalogue.physicalAdr')}</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetCatalogue.name')}</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetCatalogue.description')}</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetDiscovery.date')}</th>
                                                <th>{t('page.dtm.assetDiscoveryComponent.assetCatalogue.action')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.dataAssetCatalogue.map((d, index) =>
                                                d.idAlert == null ? (
                                                <tr key={"dac_" + index}>
                                                    <td scope="row">{index}</td>
                                                    <td scope="row">{d.physicalAddress}</td>
                                                    <td scope="row">{d.name}</td>
                                                    <td scope="row">{d.description}</td>
                                                    <td scope="row">{d.lastTouchDate}</td>
                                                    <td>
                                                        <a href={"./dtm/assetcatalogue/edit/" + d.id} type="button"
                                                           className="btn btn-success">{t('page.dtm.assetDiscoveryComponent.edit')}</a> &nbsp;
                                                        <button onClick={() => this.deleteAssetCatalog(d)} type="button"
                                                                className="btn btn-danger">{t('page.dtm.assetDiscoveryComponent.delete')}</button>
                                                        &nbsp;
                                                    </td>
                                                </tr>
                                                ) : ''
                                                )}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={"tab-pane fade show " + this.isActive('asset-discovery-config')} id="asset-discovery-config" role="tabpanel"
                         aria-labelledby="asset-discovery-config-tab">


                        <div className="card-header table-title" id="heading-top">
                            <a>
                                {t('page.dtm.assetDiscoveryComponent.assetDiscoveryTab.assetDiscoveryConfig.parameters')}
                            </a>
                        </div>
                        <table className="table table-striped table-hover table-dark">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('page.dtm.assetDiscoveryComponent.assetDiscoveryTab.assetDiscoveryConfig.name')}</th>
                                <th>{t('page.dtm.assetDiscoveryComponent.assetDiscoveryTab.assetDiscoveryConfig.value')}</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                Object.keys(this.state.dataConfig).map((code,index) =>
                                    <tr>
                                        <td scope="row">
                                            <span className={"small align-middle"}>{index + 1}</span>
                                        </td>
                                        <td className={"align-middle"}>{t(code)}</td>
                                        <td className={""}>
                                            {
                                                this.state.dataConfig[code]['type'] == "LIST" &&
                                                <div className="form-group form-control-sm">
                                                    <input type="text" dataconfig-code={code} className="form-control" name="value"
                                                           value={this.state.dataConfig[code]['value']}
                                                           onChange={this.handleListNumericChange.bind(this)}/>
                                                </div>
                                            }
                                            {
                                                this.state.dataConfig[code]['type'] == "INT" &&
                                                <div className="form-group form-control-sm">
                                                    <input type="text" dataconfig-code={code} className="form-control" name="value"
                                                           value={this.state.dataConfig[code]['value']}
                                                           onChange={this.handleListNumericChange.bind(this)}/>
                                                </div>
                                            }
                                            {
                                                this.state.dataConfig[code]['type'] == "LONG" &&
                                                <div className="form-group form-control-sm">
                                                    <input type="text" dataconfig-code={code} className="form-control" name="value"
                                                           value={this.state.dataConfig[code]['value']}
                                                           onChange={this.handleListNumericChange.bind(this)}/>
                                                </div>
                                            }
                                            {
                                                this.state.dataConfig[code]['type'] == "TEXT" &&
                                                <div className="form-group form-control-sm">
                                                    <input type="text" dataconfig-code={code} className="form-control" name="value"
                                                           value={ this.state.dataConfig[code]['value']}
                                                           onChange={this.handleInputChange.bind(this)}/>
                                                </div>
                                            }
                                            {
                                                this.state.dataConfig[code]['type'] == "PERIOD" &&
                                                <div className="form-row">

                                                    <div className="form-group form-control-sm col-md-4">
                                                        <input type="text" dataconfig-code={code} className="form-control" id={code+".value"}
                                                               value={this.state.dataConfig[code]['value']?this.state.dataConfig[code]['value'].split(" ")[0]:""}
                                                               onChange={this.handleInputChange.bind(this)}/>
                                                    </div>

                                                    <div className="form-group form-control-sm col-md-4">
                                                        <select dataconfig-code={code} className="form-control" id={code+".period"}
                                                                value={this.state.dataConfig[code]['value']?this.state.dataConfig[code]['value'].split(" ")[1]?this.state.dataConfig[code]['value'].split(" ")[1]:"d":"d"}
                                                                onChange={this.handleInputChange.bind(this)}>
                                                            <option value={"m"}>minutes</option>
                                                            <option value={"h"}>hours</option>
                                                            <option value={"d"}>days</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            }
                                            <div className={"text-left pl-2 defaultValue"}>

                                            <span className={this.state.dataConfig[code]['defaultValue'] == this.state.dataConfig[code]['value']?'no-diff':'diff'}>
                                               {t('page.dtm.assetDiscoveryComponent.assetDiscoveryTab.assetDiscoveryConfig.defaultValue')}
                                                :&nbsp;
                                                <strong>{this.state.dataConfig[code]['defaultValue']}</strong>
                                            </span>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            }

                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        )
    }

}

export default withTranslation()(AssetDiscoveryComponent);