import React from 'react';
import { withTranslation } from 'react-i18next';

class ProtocolAndInterfaceMetricComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            status: "Status: -",
            fields: "-",
            dataUserStatistics:[],
            data:[],
            dataIPv4:[],
            dataIPv6:[],
            dataTCP:[],
            dataUDP:[],
            id:""
        }
    }

    async componentDidMount() {

        document.title = "DTM - Statistics";

        const { id } = this.props.match.params;
        this.setState({ id: id, isLoading: false });

        var controller = this.state.server+'/sphinx/dtm/tshark/metric';

        var getPackageStatistics = controller + '/getPackageEthernetStatistics/'+id;
        var response = await fetch(getPackageStatistics);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

        var getPackageStatistics = controller + '/getPackageIPv4Statistics/'+id;
        var response = await fetch(getPackageStatistics);
        const body2 = await response.json();
        this.setState({ dataIPv4: body2, isLoading: false });

        var getPackageStatistics = controller + '/getPackageIPv6Statistics/'+id;
        var response = await fetch(getPackageStatistics);
        const body3 = await response.json();
        this.setState({ dataIPv6: body3, isLoading: false });

        var getPackageStatistics = controller + '/getPackageTCPStatistics/'+id;
        var response = await fetch(getPackageStatistics);
        const body4 = await response.json();
        this.setState({ dataTCP: body4, isLoading: false });

        var getPackageStatistics = controller + '/getPackageUDPStatistics/'+id;
        var response = await fetch(getPackageStatistics);
        const body5 = await response.json();
        this.setState({ dataUDP: body5, isLoading: false });

        var getUsernameStatistics = controller + '/getUsernameStatistics/'+id;
        var response7 = await fetch(getUsernameStatistics);
        const body7 = await response7.json();
        this.setState({ dataUserStatistics: body7, isLoading: false });

    }

    render(){
        const { t } = this.props;
        return(
           <div className={'mt-3'}>

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">Home</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/instances">Instances</a></li>
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.id+"/metrics"}>Instance metrics</a></li>
                       <li className="breadcrumb-item active" aria-current="page">DTM per protocols and interfaces</li>
                   </ol>
               </nav>

               <ul className="nav nav-tabs" id="adStatTab" role="tablist">
                   <li className="nav-item">
                       <a className="nav-link active" id="eth-tab" data-toggle="tab" href="#eth" role="tab"
                          aria-controls="eth" aria-selected="true">Ethernet</a>
                   </li>
                   <li className="nav-item">
                       <a className="nav-link" id="ipv4-tab" data-toggle="tab" href="#ipv4" role="tab"
                          aria-controls="ipv4" aria-selected="false">IPv4</a>
                   </li>
                   <li className="nav-item">
                       <a className="nav-link" id="ipv6-tab" data-toggle="tab" href="#ipv6" role="tab"
                          aria-controls="ipv6" aria-selected="false">IPv6</a>
                   </li>

                   <li className="nav-item">
                       <a className="nav-link" id="tcp-tab" data-toggle="tab" href="#tcp" role="tab"
                          aria-controls="tcp" aria-selected="false">TCP</a>
                   </li>

                   <li className="nav-item">
                       <a className="nav-link" id="udp-tab" data-toggle="tab" href="#udp" role="tab"
                          aria-controls="udp" aria-selected="false">UDP</a>
                   </li>

               </ul>

               <div className="tab-content" id="myTabContent">
                   <div className="tab-pane fade show active" id="eth" role="tabpanel" aria-labelledby="eth-tab">

                       <div className="accordion" id="accordionStatEth">

                           {
                               Object.keys(this.state.data).map((interfaceName,key)=>(
                                   <div className="card"  key={key}>

                                       <div className="card-header interfaceTable" id={'heading_'+key}>
                                           <div className="btn btn-link btn-block text-left interfaceName" type="button"
                                                   data-toggle="collapse" data-target={'#collapse'+key} aria-expanded="true"
                                                   aria-controls={'collapse'+key}>
                                               <span className="p-2">{interfaceName}</span>
                                               <span className="badge badge-info badge-pill">{Object.keys(this.state.data[interfaceName]).length}</span>
                                           </div>
                                       </div>

                                       <div id={'collapse'+key} className="collapse" aria-labelledby={'heading_'+key}
                                            data-parent="#accordionStatEth">
                                           <div className="card-body">

                                               <table className="table table-striped table-hover table-dark">
                                                   <thead>
                                                   <tr>
                                                       <th>source</th>
                                                       <th>packages</th>
                                                       <th>bytes</th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   {
                                                       Object.keys(this.state.data[interfaceName]).map((source, key2) => (
                                                           <tr  key={key2}>
                                                               <td>{source}</td>
                                                               <td>{this.state.data[interfaceName][source]['packages']}</td>
                                                               <td>{this.state.data[interfaceName][source]['bytes']}</td>
                                                           </tr>
                                                       ))
                                                   }
                                                   </tbody>
                                               </table>
                                           </div>
                                       </div>

                                   </div>
                               ))
                           }

                       </div>

                   </div>
                   <div className="tab-pane fade" id="ipv4" role="tabpanel" aria-labelledby="ipv4-tab">

                       <div className="accordion" id="accordionStatIPv4">

                           {
                               Object.keys(this.state.dataIPv4).map((interfaceName,key)=>(
                                   <div className="card" key={key}>

                                       <div className="card-header interfaceTable" id={'ipv4_heading_'+key}>
                                           <div className="btn btn-link btn-block text-left interfaceName" type="button"
                                                   data-toggle="collapse" data-target={'#ipv4_collapse'+key} aria-expanded="true"
                                                   aria-controls={'ipv4_collapse'+key}>
                                               <span className="p-2">{interfaceName}</span>
                                               <span className="badge badge-info badge-pill">{Object.keys(this.state.dataIPv4[interfaceName]).length}</span>
                                           </div>
                                       </div>

                                       <div id={'ipv4_collapse'+key} className="collapse" aria-labelledby={'ipv4_heading_'+key}
                                            data-parent="#accordionStatIPv4">
                                           <div className="card-body">

                                               <table className="table table-striped table-hover table-dark">
                                                   <thead>
                                                   <tr>
                                                       <th>source</th>
                                                       <th>packages</th>
                                                       <th>bytes</th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   {
                                                       Object.keys(this.state.dataIPv4[interfaceName]).map((source, key2) => (
                                                           <tr key={key2}>
                                                               <td>{source}</td>
                                                               <td>{this.state.dataIPv4[interfaceName][source]['packages']}</td>
                                                               <td>{this.state.dataIPv4[interfaceName][source]['bytes']}</td>
                                                           </tr>
                                                       ))
                                                   }
                                                   </tbody>
                                               </table>
                                           </div>
                                       </div>

                                   </div>
                               ))
                           }

                       </div>

                   </div>

                   <div className="tab-pane fade" id="ipv6" role="tabpanel" aria-labelledby="ipv6-tab">

                       <div className="accordion" id="accordionStatIPv6">

                           {
                               Object.keys(this.state.dataIPv6).map((interfaceName,key)=>(
                                   <div className="card" key={key}>

                                       <div className="card-header interfaceTable" id={'ipv6_heading_'+key}>
                                           <div className="btn btn-link btn-block text-left interfaceName" type="button"
                                                   data-toggle="collapse" data-target={'#ipv6_collapse'+key} aria-expanded="true"
                                                   aria-controls={'ipv6_collapse'+key}>
                                               <span className="p-2">{interfaceName}</span>
                                               <span className="badge badge-info badge-pill">{Object.keys(this.state.dataIPv6[interfaceName]).length}</span>
                                           </div>
                                       </div>

                                       <div id={'ipv6_collapse'+key} className="collapse" aria-labelledby={'ipv6_heading_'+key}
                                            data-parent="#accordionStatIPv6">
                                           <div className="card-body">

                                               <table className="table table-striped table-hover table-dark">
                                                   <thead>
                                                   <tr>
                                                       <th>source</th>
                                                       <th>packages</th>
                                                       <th>bytes</th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   {
                                                       Object.keys(this.state.dataIPv6[interfaceName]).map((source, key2) => (
                                                           <tr key={key2}>
                                                               <td>{source}</td>
                                                               <td>{this.state.dataIPv6[interfaceName][source]['packages']}</td>
                                                               <td>{this.state.dataIPv6[interfaceName][source]['bytes']}</td>
                                                           </tr>
                                                       ))
                                                   }
                                                   </tbody>
                                               </table>
                                           </div>
                                       </div>

                                   </div>
                               ))
                           }

                       </div>

                   </div>

                   <div className="tab-pane fade" id="tcp" role="tabpanel" aria-labelledby="tcp-tab">

                       <div className="accordion" id="accordionStatTCP">

                           {
                               Object.keys(this.state.dataTCP).map((interfaceName,key)=>(
                                   <div className="card" key={key}>

                                       <div className="card-header interfaceTable" id={'tcp_heading_'+key}>
                                           <div className="btn btn-link btn-block text-left interfaceName" type="button"
                                                   data-toggle="collapse" data-target={'#tcp_collapse'+key} aria-expanded="true"
                                                   aria-controls={'tcp_collapse'+key}>
                                               <span className="p-2">{interfaceName}</span>
                                               <span className="badge badge-info badge-pill">{Object.keys(this.state.dataTCP[interfaceName]).length}</span>
                                           </div>
                                       </div>

                                       <div id={'tcp_collapse'+key} className="collapse" aria-labelledby={'tcp_heading_'+key}
                                            data-parent="#accordionStatTCP">
                                           <div className="card-body">

                                               <table className="table table-striped table-hover table-dark">
                                                   <thead>
                                                   <tr>
                                                       <th>source</th>
                                                       {/* <th>port</th> */}
                                                       <th>packages</th>
                                                       <th>bytes</th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   {
                                                       Object.keys(this.state.dataTCP[interfaceName]).map((source, key2) => (
                                                           <tr key={key2}>
                                                               <td>{source}</td>
                                                               {/*  <td>{source.split(":")[0]}</td>
                                                               <td>{source.split(":")[1]}</td>> */}
                                                               <td>{this.state.dataTCP[interfaceName][source]['packages']}</td>
                                                               <td>{this.state.dataTCP[interfaceName][source]['bytes']}</td>
                                                           </tr>
                                                       ))
                                                   }
                                                   </tbody>
                                               </table>
                                           </div>
                                       </div>

                                   </div>
                               ))
                           }

                       </div>

                   </div>

                   <div className="tab-pane fade" id="udp" role="tabpanel" aria-labelledby="udp-tab">

                       <div className="accordion" id="accordionStatUDP">

                           {
                               Object.keys(this.state.dataUDP).map((interfaceName,key)=>(
                                   <div className="card" key={key}>

                                       <div className="card-header interfaceTable" id={'udp_heading_'+key}>
                                           <div className="btn btn-link btn-block text-left interfaceName" type="button"
                                                   data-toggle="collapse" data-target={'#udp_collapse'+key} aria-expanded="true"
                                                   aria-controls={'udp_collapse'+key}>
                                               <span className="p-2">{interfaceName}</span>
                                               <span className="badge badge-info badge-pill">{Object.keys(this.state.dataUDP[interfaceName]).length}</span>
                                           </div>
                                       </div>

                                       <div id={'udp_collapse'+key} className="collapse" aria-labelledby={'udp_heading_'+key}
                                            data-parent="#accordionStatUDP">
                                           <div className="card-body">

                                               <table className="table table-striped table-hover table-dark">
                                                   <thead>
                                                   <tr>
                                                       <th>source</th>
                                                       {/* <th>port</th>*/}
                                                       <th>packages</th>
                                                       <th>bytes</th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   {
                                                       Object.keys(this.state.dataUDP[interfaceName]).map((source, key2) => (
                                                           <tr key={key2}>
                                                               <td>{source}</td>
                                                               {/* <td>{source.split(":")[0]}</td>
                                                               <td>{source.split(":")[1]}</td>*/}
                                                               <td>{this.state.dataUDP[interfaceName][source]['packages']}</td>
                                                               <td>{this.state.dataUDP[interfaceName][source]['bytes']}</td>
                                                           </tr>
                                                       ))
                                                   }
                                                   </tbody>
                                               </table>
                                           </div>
                                       </div>

                                   </div>
                               ))
                           }

                       </div>

                   </div>
               </div>

               <br/>
               <h5 className={"hidden"}>Username statistics</h5>
               <table className="table table-striped table-hover table-dark hidden">
                   <thead>
                   <tr>
                       <th>username</th>
                       <th>traffic</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       Object.keys(this.state.dataUserStatistics).map(key =>
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{this.state.dataUserStatistics[key]}</td>
                            </tr>
                       )
                   }
                   </tbody>
               </table>

           </div>
        )
    }

}

export default withTranslation()(ProtocolAndInterfaceMetricComponent);