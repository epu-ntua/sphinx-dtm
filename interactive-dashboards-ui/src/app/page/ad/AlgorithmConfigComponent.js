import React from 'react';
import { withTranslation } from 'react-i18next';
import $ from "jquery";

class AlgorithmConfigComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_AD_API_URL,
            data:[],
            dataParamHttp:[],
            dataParamDns:[],
            dataDns:[],
            dataHttp:[],
            dataSflow:[],
            dataSflowProperties:[],

            dataDisable:[],
            dataGeneral:[],
            dataGeneralAlert:[],
            dataReputation:[],
        }
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        document.title = "AD";

        var getAlgorithm = this.state.server+'/sphinx/ad/config/all';
        var response = await fetch(getAlgorithm);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

        var getSflowDisable = this.state.server+'/sphinx/ad/config/algorithmList';
        var responseSlow = await fetch(getSflowDisable);
        const bodySflow = await responseSlow.json();
        this.setState({ dataSflow: bodySflow, isLoading: false });

        var getSflowProperties = this.state.server+'/sphinx/ad/config/algorithmProperties';
        var responseSflowProperties= await fetch(getSflowProperties);
        const bodySflowProperties = await responseSflowProperties.json();
        this.setState({ dataSflowProperties: bodySflowProperties, isLoading: false });

        var getParamDnsKmeans = this.state.server+'/sphinx/ad/config/all/ad.parameter.algorithm.kmeans.dns.';
        var responseParamDns = await fetch(getParamDnsKmeans);
        const bodyParamDns = await responseParamDns.json();
        this.setState({ dataParamDns: bodyParamDns, isLoading: false });

        var getParamHttoKmeans = this.state.server+'/sphinx/ad/config/all/ad.parameter.algorithm.kmeans.http.';
        var responseParamHttp = await fetch(getParamHttoKmeans);
        const bodyParamHttp = await responseParamHttp.json();
        this.setState({ dataParamHttp: bodyParamHttp, isLoading: false });

        var getDnsKmeans = this.state.server+'/sphinx/ad/config/all/ad.algorithm.kmeans.dns.';
        var responseDns = await fetch(getDnsKmeans);
        const bodyDns = await responseDns.json();
        this.setState({ dataDns: bodyDns, isLoading: false });

        var getHttpKmeans = this.state.server+'/sphinx/ad/config/all/ad.algorithm.kmeans.http.';
        var responseHttp = await fetch(getHttpKmeans);
        const bodyHttp = await responseHttp.json();
        this.setState({ dataHttp: bodyHttp, isLoading: false });

        var getGeneral = this.state.server+'/sphinx/ad/config/all/general';
        var responseGenereral= await fetch(getGeneral);
        const bodyGeneral = await responseGenereral.json();
        this.setState({ dataGeneral: bodyGeneral, isLoading: false });

        var getAlert = this.state.server+'/sphinx/ad/config/all/ad.adml.sflow.alert.max';
        var responseAlert= await fetch(getAlert);
        const bodyAlert = await responseAlert.json();
        this.setState({ dataGeneralAlert: bodyAlert, isLoading: false });

        var getReputation = this.state.server+'/sphinx/ad/config/all/reputation';
        var responseReputation= await fetch(getReputation);
        const bodyReputation = await responseReputation.json();
        this.setState({ dataReputation: bodyReputation, isLoading: false });

    }

    isActive(t){
        var t = "#"+t;
        var tab = window.location.hash;
        if (tab==null || tab=="" || tab == undefined){
            if (t=="#algorithms"){
                return " show active";
            }else{
                return "";
            }
        }
        if (t===tab){
            return " show active";
        }
        return "";
    }

    activateTab(tab){
        $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    }

    handleNumericChange = (evt) => {
        const rx_live = /^[0-9\b]+$/;
        if (evt.target.value === '' || rx_live.test(evt.target.value)){
            this.handleInputChange(evt)
        }
    };

    handleListNumericChange(evt) {
        var validNumber = new RegExp(/^(\d\,?)*$/);
        if (validNumber.test(evt.target.value)) {
            this.handleInputChange(evt);
        }
    };

    handleInputChange(event) {
        const target = event.target;

        var value = '';
        if (target.name === 'booleanValue'){
            value = target.checked;
        }else{
            value = target.value;
        }

        let data = null;
        const codeDnsParam = target.getAttribute('dataparamdns-code');
        const codeHttpParam = target.getAttribute('dataparamhttp-code');
        const codeDns = target.getAttribute('datadns-code');
        const codeHttp = target.getAttribute('datahttp-code');
        const codeSflow = target.getAttribute('datasflow-code');
        const codeGeneral = target.getAttribute('datageneral-code');
        const codeAlert = target.getAttribute('dataalert-code');
        const codeReputation = target.getAttribute('datareputation-code');

        const codeAlg = target.getAttribute('dataalg-code');

        if(codeAlg !== null ){
            data = this.state.dataSflowProperties;
            data[codeAlg]['value'] = value+'';
            this.save(this.state.dataSflowProperties[codeAlg]);
        }

        if(codeDnsParam !== null){
            data = this.state.dataParamDns;
            data[codeDnsParam]['value'] = value+'';
        }
        if(codeDns !== null){
            data = this.state.dataDns;
            data[codeDns]['value'] = value+'';
            this.save(this.state.dataDns[codeDns]);
        }
        if(codeHttpParam !== null){
            data = this.state.dataParamHttp;
            data[codeHttpParam]['value'] = value+'';
        }
        if(codeHttp !== null){
            data = this.state.dataHttp;
            data[codeHttp]['value'] = value+'';
            this.save(this.state.dataHttp[codeHttp]);
        }

        if(codeGeneral !== null){
            data = this.state.dataGeneral;
            data[codeGeneral]['value'] = value+'';
            this.save(this.state.dataGeneral[codeGeneral]);
        }
        if(codeSflow !== null){
            data = this.state.dataSflow;
            data[codeSflow]['value'] = value+'';
            this.save(this.state.dataSflow[codeSflow]);
        }
        if(codeAlert !== null){
            data = this.state.dataGeneralAlert;
            data[codeAlert]['value'] = value+'';
            this.save(this.state.dataGeneralAlert[codeAlert]);
        }
        if(codeReputation !== null){
            data = this.state.dataReputation;
            data[codeReputation]['value'] = value+'';
            this.save(this.state.dataReputation[codeReputation]);
        }
        this.setState({data});
    }

    save(config){
        let url = this.state.server+'/sphinx/ad/config/save';
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

    showInfo(code){

        if ($('#'+code+'-Content').length==0){
            $('#sflow-info').hide();
        }else{
            $('#sflow-info').show();
            $('.algorithmInfo').hide();
            $('#'+code+'-Content').show();
        }
    }

    update() {
        let data = this.state.dataReputation;
        let url = this.state.server+'/sphinx/ad/update/reputation';
        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {console.log(data);})
            .catch(error => console.log(error));
    }

    render(){
        const { t } = this.props;

        return(
        <div className="container mt-3">

            <nav aria-label="breadcrumb breadcrumb-dark">
                <ol className="breadcrumb breadcrumb-dark">
                    <li className="breadcrumb-item"><a href="./">{t('page.ad.style.adComponent.home')}</a></li>
                    <li className="breadcrumb-item"><a href="./ad">{t('page.ad.style.adComponent.ad')}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{t("page.ad.algorithmConfigComponent.algorithmsTab.algorithms")}</li>
                </ol>
            </nav>

            <ul className="nav nav-tabs" id="algorithmsTab" role="tablist">
                <li className="nav-item">
                    <a className={"nav-link " + this.isActive('algorithms')} id="algorithms-tab" data-toggle="tab" href="#algorithms" role="tab"
                       aria-controls="algorithms" aria-selected="true">{t("page.ad.algorithmConfigComponent.algorithmsTab.algorithms")}</a>
                </li>

                <li className="nav-item">
                    <a className={"nav-link " + this.isActive('general')} id="general-tab" data-toggle="tab" href="#general" role="tab"
                       aria-controls="general" aria-selected="true">{t("page.ad.algorithmConfigComponent.algorithmsTab.sflow.general.tab")}</a>
                </li>

                {
                    Object.keys(this.state.dataSflow).map((code,index) =>
                        <li className="nav-item">
                            <a className={"nav-link " + this.isActive(code)} id={code+"-tab"} data-toggle="tab" href={"#"+code} role="tab"  onClick={() => {this.showInfo(code)}}
                               aria-controls={code} aria-selected="true">{t(code)}</a>
                        </li>
                    )
                }

            </ul>

            <div className="tab-content" id="myTabContent">
                <div className={"tab-pane fade show " + this.isActive('algorithms')} id="algorithms" role="tabpanel" aria-labelledby="algorithms-tab">
                    <br/>
                    <table className="table table-hover table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('page.ad.algorithmConfigComponent.algorithmsTab.algorithm')}</th>
                            <th scope="col">{t('page.ad.algorithmConfigComponent.algorithmsTab.disable')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(this.state.dataSflow).map((code,index) =>
                                <tr>
                                    <td className={"small align-middle"}>{index+1}</td>
                                    <td className={"align-middle"}>
                                        <a className={"link"} onClick={() => {this.activateTab(code)}}>{t(code)}</a>
                                    </td>
                                    <td className={""}>
                                        {
                                            <div className="form-check sphinx-check">
                                                <input type="checkbox" datasflow-code={code} className="form-check-input" name="booleanValue"
                                                       checked={ this.state.dataSflow[code]['value']=='false'?false:true }
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

                <div className={"tab-pane fade show " + this.isActive('kmeans_dns')} id="kmeans_dns" role="tabpanel" aria-labelledby="kmeans_dns-tab">
                    <br/>
                    <div className="card-header table-title" id="heading-top">
                        <a>
                            {t('page.ad.algorithmConfigComponent.algorithmsTab.parameters')}
                        </a>
                    </div>
                    <table className="table table-striped table-hover table-dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.name')}</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.value')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(this.state.dataParamDns).map((code,index)=>(
                                <tr key={"t_"+index}>
                                    <td className={"small align-middle"}>{index+1}</td>
                                    <td className={"align-middle"}>
                                        {t(code)}
                                    </td>
                                    <td className={""}>
                                        {
                                            <div className="form-group form-control-sm">
                                                <input type="number" dataparamdns-code={code} className="form-control" name="value"
                                                       value={ this.state.dataParamDns[code]['value']}
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                        <div className={"text-left pl-2 defaultValue"}>

                                            <span className={this.state.dataParamDns[code]['defaultValue'] == this.state.dataParamDns[code]['value']?'no-diff':'diff'}>
                                               {t('page.ad.algorithmConfigComponent.algorithmsTab.defaultValue')}
                                                :&nbsp;
                                                <strong>{this.state.dataParamDns[code]['defaultValue']}</strong>
                                            </span>

                                        </div>
                                    </td>
                                    <td className={"small align-middle"}>
                                        <button onClick={() => this.save(this.state.dataParamDns[code])} type="button" className="btn btn-success">save</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <div className="card-header table-title" id="heading-dns">
                        <a>
                            {t('page.ad.algorithmConfigComponent.algorithmsTab.features')}
                        </a>
                    </div>
                    <table className="table table-striped table-hover table-dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.name')}</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.value')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(this.state.dataDns).map((code,index)=>(
                                <tr key={"t_"+index}>
                                    <td className={"small align-middle"}>{index+1}</td>
                                    <td className={"align-middle"}>
                                        {this.state.dataDns[code]['name']}
                                    </td>
                                    <td className={""}>
                                        {
                                            <div className="form-check sphinx-check">
                                                <input type="checkbox" datadns-code={code} className="form-check-input" name="booleanValue"
                                                       checked={ this.state.dataDns[code]['value']=='false'?false:true }
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <div className={"tab-pane fade " + this.isActive('kmeans_http')} id="kmeans_http" role="tabpanel" aria-labelledby="kmeans_http-tab">
                    <br/>
                    <div className="card-header table-title" id="heading-top">
                        <a>
                            {t('page.ad.algorithmConfigComponent.algorithmsTab.parameters')}
                        </a>
                    </div>
                    <table className="table table-striped table-hover table-dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.name')}</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.value')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(this.state.dataParamHttp).map((code,index)=>(
                                <tr key={"t_"+index}>
                                    <td className={"small align-middle"}>{index+1}</td>
                                    <td className={"align-middle"}>
                                        {t(code)}
                                    </td>
                                    <td className={""}>
                                        {
                                            <div className="form-group form-control-sm">
                                                <input type="number" dataparamhttp-code={code} className="form-control" name="value"
                                                       value={ this.state.dataParamHttp[code]['value']}
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                        <div className={"text-left pl-2 defaultValue"}>

                                            <span className={this.state.dataParamHttp[code]['defaultValue'] == this.state.dataParamHttp[code]['value']?'no-diff':'diff'}>
                                               {t('page.ad.algorithmConfigComponent.algorithmsTab.defaultValue')}
                                                :&nbsp;
                                                <strong>{this.state.dataParamHttp[code]['defaultValue']}</strong>
                                            </span>

                                        </div>
                                    </td>
                                    <td className={"small align-middle"}>
                                        <button onClick={() => this.save(this.state.dataParamHttp[code])} type="button" className="btn btn-success">save</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <div className="card-header table-title" id="heading-dns">
                        <a>
                            {t('page.ad.algorithmConfigComponent.algorithmsTab.features')}
                        </a>
                    </div>
                    <table className="table table-striped table-hover table-dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.name')}</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.value')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(this.state.dataHttp).map((code,index)=>(
                                <tr key={"t_"+index}>
                                    <td className={"small align-middle"}>{index+1}</td>
                                    <td className={"align-middle"}>
                                        {this.state.dataHttp[code]['name']}
                                    </td>
                                    <td className={""}>
                                        {
                                            <div className="form-check sphinx-check">
                                                <input type="checkbox" datahttp-code={code} className="form-check-input" name="booleanValue"
                                                       checked={ this.state.dataHttp[code]['value']=='false'?false:true }
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <div className={"tab-pane fade" + this.isActive('general')} id="general" role="tabpanel" aria-labelledby="general-tab">
                    {/*<div className="card-footer text-muted text-right">*/}
                        {/*<button onClick={this.update} type="submit" className="btn btn-primary">Update</button>*/}
                    {/*</div>*/}
                    <div className="card-header table-title" id="heading-top">
                        <a>
                            {t('page.ad.algorithmConfigComponent.algorithmsTab.parameters')}
                        </a>
                    </div>
                    <table className="table table-striped table-hover table-dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.name')}</th>
                            <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.value')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(this.state.dataGeneral).map((code,index) =>
                                <tr>
                                    <td scope="row">
                                        <span className={"small align-middle"}>{index + 1}</span>
                                    </td>
                                    <td className={"align-middle"}>{t(code)}</td>
                                    <td className={""}>
                                        {
                                            this.state.dataGeneral[code]['type'] == "LIST" &&
                                            <div className="form-group form-control-sm">
                                                <input type="text" datageneral-code={code} className="form-control" name="value"
                                                       value={this.state.dataGeneral[code]['value']}
                                                       onChange={this.handleListNumericChange.bind(this)}/>
                                            </div>
                                        }
                                        {
                                            this.state.dataGeneral[code]['type'] == "INT" &&
                                            <div className="form-group form-control-sm">
                                                <input type="text" datageneral-code={code} className="form-control" name="value"
                                                       value={this.state.dataGeneral[code]['value']}
                                                       onChange={this.handleListNumericChange.bind(this)}/>
                                            </div>
                                        }
                                        {
                                            this.state.dataGeneral[code]['type'] == "LONG" &&
                                            <div className="form-group form-control-sm">
                                                <input type="text" datageneral-code={code} className="form-control" name="value"
                                                       value={this.state.dataGeneral[code]['value']}
                                                       onChange={this.handleListNumericChange.bind(this)}/>
                                            </div>
                                        }
                                        {
                                            this.state.dataGeneral[code]['type'] == "TEXT" &&
                                            <div className="form-group form-control-sm">
                                                <input type="text" datageneral-code={code} className="form-control" name="value"
                                                       value={ this.state.dataGeneral[code]['value']}
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                        <div className={"text-left pl-2 defaultValue"}>

                                            <span className={this.state.dataGeneral[code]['defaultValue'] == this.state.dataGeneral[code]['value']?'no-diff':'diff'}>
                                               {t('page.ad.algorithmConfigComponent.algorithmsTab.defaultValue')}
                                                :&nbsp;
                                                <strong>{this.state.dataGeneral[code]['defaultValue']}</strong>
                                            </span>

                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        {
                            Object.keys(this.state.dataReputation).map((code,index) =>
                                <tr>
                                    <td scope="row">
                                        <span className={"small align-middle"}>{Object.keys(this.state.dataGeneral).length + index+1}</span>
                                    </td>
                                    <td className={"align-middle"}>{t(code)}</td>
                                    <td className={""}>
                                        {
                                            this.state.dataReputation[code]['type'] == "LIST" &&
                                            <div className="form-group form-control-sm">
                                                <input type="text" datareputation-code={code} className="form-control" name="value"
                                                       value={this.state.dataReputation[code]['value']}
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                        {
                                            this.state.dataReputation[code]['type'] == "TEXT" &&
                                            <div className="form-group form-control-sm">
                                                <input type="text" datareputation-code={code} className="form-control" name="value"
                                                       value={ this.state.dataReputation[code]['value']}
                                                       onChange={this.handleInputChange.bind(this)}/>
                                            </div>
                                        }
                                        <div className={"text-left pl-2 defaultValue"}>

                                            <span className={this.state.dataReputation[code]['defaultValue'] == this.state.dataReputation[code]['value']?'no-diff':'diff'}>
                                               {t('page.ad.algorithmConfigComponent.algorithmsTab.defaultValue')}
                                                :&nbsp;
                                                <strong>{this.state.dataReputation[code]['defaultValue']}</strong>
                                            </span>

                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

                {
                    Object.keys(this.state.dataSflow).map((codeAlg,index) =>
                        <div className={"tab-pane fade " + this.isActive(codeAlg)} id={codeAlg} role="tabpanel" aria-labelledby={codeAlg+"-tab"}>
                            <br/>
                            <div className="card-header table-title" id="heading-top">
                                <a>
                                    {t('page.ad.algorithmConfigComponent.algorithmsTab.parameters')}
                                </a>
                            </div>
                            <table className="table table-striped table-hover table-dark">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.name')}</th>
                                    <th>{t('page.ad.algorithmConfigComponent.algorithmsTab.value')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Object.keys(this.state.dataSflowProperties).filter((code,index)=>code.startsWith("ad.adml.sflow."+codeAlg.split("_")[1])).map((code,index) =>
                                            <tr>
                                                <td scope="row">
                                                    <span className={"small align-middle"}>{index + 1}</span>
                                                </td>
                                                <td className={"align-middle"}>{t(code)}</td>
                                                <td className={""}>
                                                    {
                                                        (this.state.dataSflowProperties[code]['type'] == "LONG" || this.state.dataSflowProperties[code]['type'] == "INT") &&
                                                        <div className="form-group form-control-sm">
                                                            <input type="text" dataalg-code={code} className="form-control"
                                                                   name="value"
                                                                   value={this.state.dataSflowProperties[code]['value']}
                                                                   pattern="[0-9]*"
                                                                   onChange={this.handleNumericChange.bind(this)}/>
                                                        </div>
                                                    }
                                                    {
                                                        this.state.dataSflowProperties[code]['type'] == "LIST" &&
                                                        <div className="form-group form-control-sm">
                                                            <input type="text" dataalg-code={code} className="form-control"
                                                                   name="value"
                                                                   value={this.state.dataSflowProperties[code]['value']}
                                                                   onChange={this.handleListNumericChange.bind(this)}/>
                                                        </div>
                                                    }
                                                    {
                                                        this.state.dataSflowProperties[code]['type'] == "TEXT" &&
                                                        <div className="form-group form-control-sm">
                                                            <input type="text" dataalg-code={code} className="form-control" name="value"
                                                                   value={ this.state.dataSflowProperties[code]['value']}
                                                                   onChange={this.handleInputChange.bind(this)}/>
                                                        </div>
                                                    }
                                                    {
                                                        this.state.dataSflowProperties[code]['type'] == "BOOLEAN" &&
                                                        <div className="form-check sphinx-check">
                                                            <input type="checkbox" dataalg-code={code} className="form-check-input" name="booleanValue"
                                                                   checked={ this.state.dataSflowProperties[code]['value']=='false'?false:true }
                                                                   onChange={this.handleInputChange.bind(this)}/>
                                                        </div>
                                                    }
                                                    <div className={"text-left pl-2 defaultValue"}>

                                                        <span className={this.state.dataSflowProperties[code]['defaultValue'] == this.state.dataSflowProperties[code]['value']?'no-diff':'diff'}>
                                                           {t('page.ad.algorithmConfigComponent.algorithmsTab.defaultValue')}
                                                            :&nbsp;
                                                            <strong>{this.state.dataSflowProperties[code]['defaultValue']}</strong>
                                                        </span>

                                                    </div>
                                                </td>
                                            </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>)
                }
            </div>

            <div className="accordion text-justify hidden" id="sflow-info">
                <div className="card">
                    <div className="card-header" id="sflow-heading">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                    data-target="#sflow-infoContent" aria-expanded="true" aria-controls="sflow-infoContent">
                                Information
                            </button>
                        </h2>
                    </div>

                    <div id="sflow-infoContent" className="collapse show" aria-labelledby="sflow-heading"
                         data-parent="#sflow-info">

                        <div className="card-body algorithmInfo" id="sflow_BotNet-Content">

                            <strong>C&C BotNets</strong>, for example, alerts you if:
                            <ul>
                                <li>the source port is larger than 1023</li>
                                <li>the number of packages is higher than the Min Packets Per Flow parameter (default is 20)</li>
                                <li>the source ip is not among the excluded IPs (Excluded IPs parameter)</li>
                                <li>the destination ip is not among the excluded IPs (Excluded IPs parameter)</li>
                                <li>the destination ip is found in the list of IPs that are found at a certain URL (set via the URL parameter; by default this URL is: https://rules.emergingthreats.net/blockrules/emerging-botcc.rules)</li>
                            </ul>
                            The C&C BotNets Algorithm uses a blacklist to identifies and alert communications between a protected network host and an Internet Command & Control Server in a BotNet.<br/>
                            The hosts informed in alerts are probably infected with a malware.

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_vPortScan-Content">

                            <strong>Vertical PortScan</strong> is described as a single IP being scanned for multiple ports. An alert is throws if (main conditions):
                            <ul>
                                <li>the source port is larger than 1023</li>
                                <li>the destination port is less than the Max Port Number parameter (default is 1024)</li>
                                <li>few packets per flow (the number of packages is less than 5)</li>
                                <li>the destination ip is not among the excluded IPs (Excluded IPs parameter)</li>
                                <li>the source ip is not among the excluded IPs (Excluded IPs parameter)</li>
                                <li>number of ports on a pair (source ip, destination ip) larger than the The Min Ports parameter (default is 3)</li>
                            </ul>

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_hPortScan-Content">

                            <strong>Horizontal PortScan</strong> is described as scan against a group of IPs for a single port.
                            An alert is throws if (main conditions):
                            <ul>
                                <li>avoid common ports (the destination port does not have to be on the Exclude Alien Ports list )</li>
                                <li>the destination port does not have to be on the Exclude My Ports list</li>
                                <li>few packets per flow (the number of packages is less than 5)</li>
                                <li>number of flow on a pair (source ip, destination port) larger than the Min Flows parameter (default is 100)</li>
                                <li>the destination ip is not among the excluded IPs (Excluded IPs parameter)</li>
                                <li>the source ip is not among the excluded IPs (Excluded IPs parameter)</li>
                            </ul>

                            These alerts refer to horizontal port scans performed by <b>internal</b> hosts.
                            These scans may indicate:
                            <ul>
                                <li>policy violations</li>
                                <li>malware activities</li>
                            </ul>

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_ICMPTunnel-Content">

                            <strong>ICMP Tunnel</strong> algorithm identifies and alerts tunneling over ICMP.
                            Tunnels are used to bypass security policies aiming to:
                            <ul>
                                <li>Leak data</li>
                                <li>Anonimization</li>
                                <li>Establish unauthorized conections</li>
                                <li>Access C&C in BotNets</li>
                            </ul>

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_dnsTunnel-Content">

                            <strong>DNS Tunnel</strong> algorithm identifies and alerts tunneling over DNS.
                            Tunnels are used to bypass security policies aiming to:
                            <ul>
                                <li>Leak data</li>
                                <li>Anonimization</li>
                                <li>Establish unauthorized conections</li>
                                <li>Access C&C in BotNets</li>
                            </ul>

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_mediaStreaming-Content">

                            <strong>Media streaming client</strong> algorithm identifies and generates alerts for media streaming consumers. It might:
                            <ul>
                                <li>violates the corporate’s Internet use policy</li>
                            </ul>

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_abusedSMTP-Content">

                            <strong>Abused SMTP Server</strong> algorithm  identifies and alerts possibly compromised accounts being used to send spams through e-mail servers.

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_UDPAmplifier-Content">

                            <strong>UDP amplifier (DDoS)</strong> algorithm throws alerts refer to internal hosts being used to perform a DDoS by the use of amplification attacks

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_p2p-Content">

                            <strong>P2P communication</strong> algorithm identifies and generates alerts for P2P communications. It might:
                            <ul>
                                <li>violates the corporate’s Internet use policy</li>
                            </ul>

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_alien-Content">

                            <strong>Alien accessing too much hosts</strong> algorithm throws alerts refer to Internet hosts accessing a large number of hosts in the protected network.
                            In general identifies external horizontal portscans.

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_SMTPTalkers-Content">

                            <strong>SMTP talker</strong> algorithm throws alerts that means that the host is sending e-mail messages and should not be. Probably it can be sending spams. E-mail servers are not considered. This method will also avoid hosts that sent e-mails previously.

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_atypicalAlienPorts-Content">

                            <strong>Atypical alien TCP port used</strong><br/>
                            For each host in the protected network, AD keeps information about TCP ports accessed by these hosts.

                            If for two AD cycles a host in this network access an atypical TCP port at an Internet host, it generates an alert. There are some exceptions to reduce false positives.

                        </div>

                        <div className="card-body algorithmInfo" id="sflow_atypicalPorts-Content">

                            <strong>Atypical TCP port used</strong><br/>
                            This event refers to new services been used in the network. For each host in the network, AD keeps information about the accessed (and open in these hosts) TCP ports. AD generates alerts whenever there are sFlows pointing out access to new ports on these hosts.

                            It may be a backdoor or an unauthorized access!
                        </div>


                        <div className="card-body algorithmInfo" id="sflow_atypicalPairs-Content">

                            <strong>Atypical number of pairs in the period</strong><br/>

                            AD monitors the number of distinct pairs each host use to communicate in the period of 6 hours. An alert is send if a host communicates with an atypical number of pairs.

                            The event may refer to an abused host or a malware activity.
                        </div>

                        <div className="card-body algorithmInfo" id="sflow_atypicalData-Content">

                            <strong>Atypical amount of data transfered</strong><br/>
                            AD monitors the amount of data sent by each host in the protected network. An alert is send if a host sends an atypical amount of data.

                            There are some procedures to identify large Internet providers and discard them to avoid false positives.

                            The event may be refer to a data leak or an abused host.

                        </div>

                    </div>


                </div>

            </div>

        </div>
        )
    }

}

export default withTranslation()(AlgorithmConfigComponent);