import React from 'react';
import { withTranslation } from 'react-i18next';

class MetricsComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            id:"",
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM - Statistics";
        const { id } = this.props.match.params;

        this.setState({ id: id, isLoading: false });

        var getStatisticsUrl = this.state.server+'/sphinx/dtm/statistics';
        var response = await fetch(getStatisticsUrl);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">Home</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item"><a href="./dtm/statistics">Statistics</a></li>
                   </ol>
               </nav>

               <table className="table table-striped table-hover table-dark">
                   <thead>
                       <tr>
                           <th>#</th>
                           <th>Name</th>
                       </tr>
                   </thead>
                   <tbody>
                        {this.state.data.map((d, index) =>
                            <tr key={"t_"+index}>
                                <td>{index+1}</td>
                                <td>
                                    <a className="link" href={"./dtm/statistics/"+d.code}>{t('page.statistics.'+d.code)}
                                        &nbsp;<span className="badge badge-info">{d.tool}</span>
                                    </a>
                                </td>
                            </tr>
                        )}
                   </tbody>
               </table>

           </div>
        )
    }

}

export default withTranslation()(MetricsComponent);