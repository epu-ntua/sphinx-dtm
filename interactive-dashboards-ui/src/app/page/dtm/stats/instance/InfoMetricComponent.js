import React from 'react';
import { withTranslation } from 'react-i18next';

class InfoMetricComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            data:[],
            id:""
        }
    }

    async componentDidMount() {

        document.title = "DTM - Statistics";

        const { id } = this.props.match.params;
        this.setState({ id: id, isLoading: false });

        var controller = this.state.server+'/sphinx/dtm/suricata/metric';

        var getDecoderStatistics = controller + '/getDecoderStatistics/'+id;
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
                       <li className="breadcrumb-item"><a href="./dtm/instances">Instances</a></li>
                       <li className="breadcrumb-item"><a href={"./dtm/instance/"+this.state.id+"/metrics"}>Instance metrics</a></li>
                       <li className="breadcrumb-item active" aria-current="page">data traffic information</li>
                   </ol>
               </nav>

               <h4 className={"white"}>DTM information</h4>
               <table className="table table-striped table-hover table-dark">
                   <tbody>
                   {
                       Object.keys(this.state.data).map(key =>
                           <tr key={key}>
                               <td>{key}</td>
                               <td>
                                   {this.state.data[key]}
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

export default withTranslation()(InfoMetricComponent);