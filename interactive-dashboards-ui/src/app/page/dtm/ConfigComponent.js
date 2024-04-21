import React from 'react';
import { withTranslation } from 'react-i18next';

class ConfigComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            data:[]
        }
    }

    async componentDidMount() {
        document.title = "DTM - Configuration";

        var getAlertUrl = this.state.server+'/sphinx/dtm/config/all';
        var response = await fetch(getAlertUrl);
        const body = await response.json();
        this.setState({ data: body, isLoading: false });
    }

    handleInputChange(event) {

        const target = event.target;

        var value = '';
        if (target.name === 'booleanValue'){
            value = target.checked;
        }else{
            value = target.value;
        }

        const code = target.getAttribute('data-code');
        let data = this.state.data;
        data[code]['value'] = value+'';

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
            // mode: "cors",
            body: JSON.stringify(config)
        })
            .then(response => response.json())
            .then(data => {console.log(data);})
            .catch(error => console.log(error));
    }

    render(){
        const { t } = this.props;
        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">Home</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item active" aria-current="page">Configuration</li>
                   </ol>
               </nav>

               <table className="table table-striped table-hover table-dark">
                   <thead>
                       <tr>
                           <th>#</th>
                           <th>name</th>
                           <th>value</th>
                           <th>action</th>
                       </tr>
                   </thead>
                   <tbody>
                        {
                            Object.keys(this.state.data).map((code,index)=>(
                                <tr key={"t_"+index}>
                                    <td className={"small align-middle"}>{index+1}</td>
                                    <td className={"align-middle"}>{this.state.data[code]['name']}</td>
                                    <td className={""}>
                                        {
                                            this.state.data[code]['type']=='BOOLEAN'?
                                                <div className="form-check sphinx-check">
                                                    <input type="checkbox" data-code={code} className="form-check-input" name="booleanValue"
                                                           checked={ this.state.data[code]['value']=='false'?false:true }
                                                           onChange={this.handleInputChange.bind(this)}/>
                                                </div>
                                                : // this.state.data[code]['type']=='TEXT'
                                                <div className="form-group form-control-sm">
                                                    <input type="text" data-code={code} className="form-control" name="value"
                                                           value={ this.state.data[code]['value']}
                                                           onChange={this.handleInputChange.bind(this)}/>
                                                </div>

                                        }
                                    </td>
                                    <td className={"small align-middle"}>
                                        <button onClick={() => this.save(this.state.data[code])} type="button" className="btn btn-success">save</button>
                                    </td>
                                </tr>
                            ))
                        }

                   </tbody>
               </table>

           </div>
        )
    }

}

export default withTranslation()(ConfigComponent);