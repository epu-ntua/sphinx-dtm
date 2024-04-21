import React from 'react';
import { withTranslation } from 'react-i18next';

class InstanceAndProtocolMetricComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            data:[],
        }
    }

    async componentDidMount() {

        document.title = "DTM - Statistics";

        const { id } = this.props.match.params;
        this.setState({ id: id, isLoading: false });

        var controller = this.state.server+'/sphinx/dtm/tshark/statistics';

        var getPackageStatistics = controller + '/getProtocolByInstanceStatistics/';
        var response = await fetch(getPackageStatistics);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

    }

    render(){
        const { t } = this.props;
        return(
           <div className={'mt-3'}>

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">Home</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/statistics">Statistics</a></li>
                       <li className="breadcrumb-item active" aria-current="page">DTM per instances and protocols</li>
                   </ol>
               </nav>

               <h4 className={"white"}>DTM per instances and protocols</h4>
               <table className="table table-striped table-hover table-dark">
                   <thead>
                   <tr>
                       <th>device</th>
                       <th>eth</th>
                       <th>tcp</th>
                       <th>udp</th>
                       <th>ip</th>
                       <th>ipv6</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       Object.keys(this.state.data).map(key =>
                           <tr key={key}>
                               <td>{key}</td>
                               <td>
                                   {this.state.data[key]["eth"]["packages"]}<span className={"smallTest"}>&nbsp;package</span>
                                   <br/>
                                   {this.state.data[key]["eth"]["bytes"]}<span className={"smallTest"}>&nbsp;bytes</span>
                               </td>

                               <td>
                                   {this.state.data[key]["tcp"]["packages"]}<span className={"smallTest"}>&nbsp;package</span>
                                   <br/>
                                   {this.state.data[key]["tcp"]["bytes"]}<span className={"smallTest"}>&nbsp;bytes</span>
                               </td>

                               <td>
                                   {this.state.data[key]["udp"]["packages"]}<span className={"smallTest"}>&nbsp;package</span>
                                   <br/>
                                   {this.state.data[key]["udp"]["bytes"]}<span className={"smallTest"}>&nbsp;bytes</span>
                               </td>

                               <td>
                                   {this.state.data[key]["ip"]["packages"]}<span className={"smallTest"}>&nbsp;package</span>
                                   <br/>
                                   {this.state.data[key]["ip"]["bytes"]}<span className={"smallTest"}>&nbsp;bytes</span>
                               </td>

                               <td>
                                   {this.state.data[key]["ipv6"]["packages"]}<span className={"smallTest"}>&nbsp;package</span>
                                   <br/>
                                   {this.state.data[key]["ipv6"]["bytes"]}<span className={"smallTest"}>&nbsp;bytes</span>
                               </td>
                           </tr>
                       )
                   }
                   </tbody>
               </table>

           </div>
        )
    }

}

export default withTranslation()(InstanceAndProtocolMetricComponent);