import React from 'react';
import { withTranslation } from 'react-i18next';

class SimulationComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_AD_API_URL,
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "AD - Simulation";

        var getAlgorithmSimulationList = this.state.server+'/sphinx/ad/simulation/getAlgorithmSimulationList';
        var response = await fetch(getAlgorithmSimulationList);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });

    }

    simulate(d){
        this.doAction(d,this.state.server+'/sphinx/ad/simulation/execute/'+d.code.split(".")[0]);
    }


    doAction(d, url){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                alert(data.message)
            })
            .catch(()=>{

            });
    }

    isActive(t){
        var t = "#"+t;
        var tab = window.location.hash;
        if (tab==null || tab=="" || tab == undefined){
            if (t=="#simulation"){
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

    render(){
        var dtf = new Intl.DateTimeFormat('en-US',
            {   year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false});
        const { t } = this.props;
        return(
            <div className="container mt-3">

                <nav aria-label="breadcrumb breadcrumb-dark">
                    <ol className="breadcrumb breadcrumb-dark">
                        <li className="breadcrumb-item"><a href="./">Home</a></li>
                        <li className="breadcrumb-item"><a href="./ad">Anomaly Detection (AD)</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Simulation</li>
                    </ol>
                </nav>


               <ul className="nav nav-tabs" id="adSimulationTab" role="tablist">
                   <li className="nav-item">
                       <a className={"nav-link " + this.isActive('simulation')} id="simulation-tab" data-toggle="tab" href="#simulation" role="tab"
                          aria-controls="simulation" aria-selected="true">Simulation</a>
                   </li>
               </ul>

               <div className="tab-content" id="myTabContent">
                   <div className={"tab-pane fade show " + this.isActive('simulation')} id="simulation" role="tabpanel" aria-labelledby="simulation-tab">

                       <table className="table table-hover table-dark">
                           <thead>
                           <tr>
                               <th scope="col">#</th>
                               <th scope="col">Filename CSV</th>
                               <th scope="col">Simulate</th>
                           </tr>
                           </thead>
                           <tbody>
                           {this.state.data.map((d,index) =>
                               <tr>
                                   <th scope="row">{index+1}</th>
                                   <td>{d.name}</td>
                                   <td>
                                       <span>
                                           <button onClick={() => this.simulate(d)} type="button" className="btn btn-secondary">Simulate</button>&nbsp;
                                        </span>
                                   </td>
                               </tr>
                           )}
                           </tbody>
                       </table>
                   </div>

               </div>

            </div>
        )
    }

}

export default withTranslation()(SimulationComponent);