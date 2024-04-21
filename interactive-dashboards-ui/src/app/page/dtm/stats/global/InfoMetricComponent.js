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

        var controller = this.state.server+'/sphinx/dtm/suricata/statistics';

        var getDecoderStatistics = controller + '/getDecoderPerInstanceStatistics/';
        var response = await fetch(getDecoderStatistics);
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
                       <li className="breadcrumb-item active" aria-current="page">Data traffic information</li>
                   </ol>
               </nav>

               <h4 className={"white"}>Data traffic information</h4>

               {
                   Object.keys(this.state.data).map(key =>
                       <div key={key}>

                           <div className="card-header table-title" id="heading-device1">
                               <a data-toggle="collapse"
                                  data-target="#collapse-device1" aria-expanded="true"
                                  aria-controls="collapse-device1">

                                   <div>{key}</div>

                               </a>
                           </div>

                           <table className="table table-striped table-hover table-dark">
                               <tbody>
                                   {Object.keys(this.state.data[key]).map(prop =>
                                       <tr key={key}>
                                           <td>{prop}</td>
                                           <td>
                                               {this.state.data[key][prop]}
                                           </td>
                                       </tr>
                                   )}
                               </tbody>
                           </table>

                       </div>
                   )
               }


           </div>
        )
    }

}

export default withTranslation()(InstanceAndProtocolMetricComponent);