import React from 'react';
import { withTranslation } from 'react-i18next';
import {Card, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStepBackward, faFastBackward, faStepForward, faFastForward,} from "@fortawesome/free-solid-svg-icons";

class AlertComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            server: window._env_.REACT_APP_SPHINX_DTM_API_URL,
            app: "/sphinx/dtm/",
            data:[],
            totalPage:'',
            totalElements:'',
            pageNo: '',
            alerts:[],
            currentPage: 0,
            alertPerPage: 5,
        }
        this.changePage = this.changePage.bind(this);
    }

    async componentDidMount() {

        document.title = "DTM - Alerts";

        this.findAllAlert();

       this.findAlertPerPage(this.state.currentPage);

    }

    async findAllAlert(){

        var getPagination = this.state.server+'/sphinx/dtm/alert/all/DTM';
        var responsePagination = await fetch(getPagination);
        const bodyPagination = await responsePagination.json();
        if(bodyPagination.totalPages > 0){
            this.setState({ totalPage: bodyPagination.totalPages -1, isLoading: false });
        }else{
            this.setState({ totalPage: bodyPagination.totalPages, isLoading: false });
        }
        this.setState({ totalItems: bodyPagination.totalElements, isLoading: false });
        this.setState({ pageNo: bodyPagination.number, isLoading: false });
        this.setState({ pageSize: bodyPagination.size, isLoading: false });
    }

    async findAlertPerPage(page){

        var getAlertUrl =  this.state.server+`/sphinx/dtm/alert/all/DTM?pageNo=${page}&pageSize=${this.state.alertPerPage}`;
        var response =  await fetch(getAlertUrl);
        const body = await response.json();
        const results = body.content;
        this.setState({ alerts:results });

        console.log("in fetch")
        console.log(this.state.currentPage);
    }


    date(timestamp){
        return timestamp.substr(0, timestamp.indexOf(".")).replace("T"," ");
    }

    severity(d){
        const className = "badge" ;
        if(d !== null){
            if (d=='Minor' || d=='3'){
                return className + " badge-success "
            }
            if (d=='Major' || d=='2'){
                return className + " badge-warning "
            }
            if (d=='Critical' || d=='1'){
                return className + " badge-danger "
            }
            return className + " badge-warning "
        }

    }

    severityName(d){
        console.log( this.state.totalPage);
        if ( d=='3'){
            return 'Minor'
        }
        if (d=='2'){
            return 'Major'
        }
        if (d=='1'){
            return 'Critical'
        }
        return "-";
    }

    delete(){
        this.doAction(this.state.server + this.state.app + 'alert/clearAll/');
    }

    countStyle(count){
        if (count==1){
            return "badge";
        }
        if (count==2){
            return "badge alertCount1";
        }
        if (count>2 && count<=5){
            return "badge alertCount2";
        }
        if (count>5 && count<=10){
            return "badge alertCount5";
        }
        if (count>10 && count<=100){
            return "badge alertCount10";
        }
        if (count>100){
            return "badge alertCount100";
        }
    }

    doAction( url){
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                window.location = "./dtm/alerts";
            })
            .catch(()=>{
                window.location = "./dtm/alerts";
            });
    }

    changePage = (event) => {
            const target = event.target;

            var value  =  target.value;

            if (target.value === ''){
                value = 0;
            }else if(target.value > this.state.totalPage){
                value = 0;
            }
            else{
                value = target.value;
            }

            this.setState({
                [event.target.name]: parseInt(value)
            });

        this.findAlertPerPage(value);

        };

    handleListNumericChange(evt) {
        var validNumber = new RegExp(/^(\d\,?)*$/);
        if (validNumber.test(evt.target.value)) {
            this.changePage(evt);
        }
    };

    firstPage = () => {
        if (this.state.currentPage > 0) {
            this.setState({
                currentPage: 0
            }, () => {
                this.findAlertPerPage(this.state.currentPage);
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 0) {
            this.setState({
                currentPage: this.state.currentPage - 1
            }, () => {
                this.findAlertPerPage(this.state.currentPage);
            });
        }

    };

    lastPage = () => {
        this.setState({
            currentPage: this.state.totalPage
        }, () => {
            this.findAlertPerPage(this.state.currentPage);
        });
    };

    nextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        }, () => {
            this.findAlertPerPage(this.state.currentPage);
        });
    };

    render(){
        const { t } = this.props;
        const { currentPage, alerts, totalPage } = this.state;

        const pageNum ={
            width: "45px",
            border: "1px solid #17a2b8",
            color: "#17a2b8",
            textAlign: "center",
            fontWeight: "bold"
        }

        return(
           <div className="container">

               <nav aria-label="breadcrumb breadcrumb-dark">
                   <ol className="breadcrumb breadcrumb-dark">
                       <li className="breadcrumb-item"><a href="./">Home</a></li>
                       <li className="breadcrumb-item"><a href="./dtm">Data traffic monitoring (DTM)</a></li>
                       <li className="breadcrumb-item active" aria-current="page">Alerts</li>
                   </ol>
               </nav>

               <div className="mt-3 mb-3 text-left">
                   <a href="./dtm/alerts" type="button" className="btn btn-success">Refresh</a>&nbsp;
                   <button onClick={() => this.delete()} type="button" className="btn btn-danger">Remove all</button>&nbsp;
               </div>

               <Card className={"border border-dark bg-dark text-white"}>
                   <Card.Header className={"fontHeader"} align={"left"}  >
                       Alerts List
                   </Card.Header>
                   <Card.Body>
                       {alerts.length > 0 ? (
                       <table className="table table-striped table-hover table-dark">
                           <thead>
                               <tr>
                                   {/*<th>#</th>*/}
                                   <th>no</th>
                                   <th>date</th>
                                   <th>host</th>
                                   <th>protocol / source / destination</th>
                                   <th>signature</th>
                                   <th>category</th>
                                   <th>severity</th>
                               </tr>
                           </thead>
                           <tbody>
                           {alerts.length === 0 ? (
                                   <tr align="center">
                                       <td colSpan="6">No Alerts Available</td>
                                   </tr>
                               ) : (
                                   Object.keys(alerts).map((d, index) =>
                                           <tr key={"t_"+index}>
                                               {/*<td className={"small"}>{index+1}</td>*/}
                                               <td className={"small"}>
                                            <span className={this.countStyle(alerts[d]['count'])}>
                                                {alerts[d]['count']}
                                            </span>
                                               </td>
                                               <td className={"small"}>{alerts[d]['timestamp']}</td>
                                               <td className={"small"}>{alerts[d]['host']}</td>
                                               <td className={"small"}>
                                                   {alerts[d]['protocol']!=null?alerts[d]['protocol']:''} {alerts[d]['protocol']!=null?<br/>:''}
                                                   {alerts[d]['srcIp']} {(alerts[d]['srcPort'])?":"+alerts[d]['srcPort']:' '}<br/>
                                                   {alerts[d]['destIp']} {(alerts[d]['destPort'])?":"+alerts[d]['destPort']:' '}
                                               </td>
                                               <td>{alerts[d]['signature']}</td>
                                               <td>{alerts[d]['category']}</td>
                                               <td>
                                                   {alerts[d]['signatureSeverity'] &&
                                                   <span className={this.severity(alerts[d]['signatureSeverity'][0])}>
                                                    {alerts[d]['signatureSeverity'][0]}
                                                </span>
                                                   }
                                                   {!alerts[d]['signatureSeverity'] &&
                                                   <span className={this.severity(alerts[d]['severity'])}>
                                                    {this.severityName(alerts[d]['severity'])}
                                                </span>
                                                   }
                                               </td>
                                           </tr>
                                   )
                                   )}
                           </tbody>
                       </table>
                       ) : null}
                   </Card.Body>
                   <Card.Footer hidden={this.state.totalPage === '' }>
                       <div style={{"float": "left"}}>
                           Showing Page {currentPage} of {totalPage}
                       </div>
                       <div style={{"float": "right"}}>
                           <InputGroup>
                               <InputGroup.Prepend>
                                   <Button type="button" variant="outline-info" disabled={currentPage === 0 ? true : false} onClick={this.firstPage}>
                                       <FontAwesomeIcon icon={faFastBackward} /> First
                                   </Button>
                                   <Button type="button" variant="outline-info" disabled={currentPage === 0 ? true : false} onClick={this.prevPage}>
                                       <FontAwesomeIcon icon={faStepBackward} /> Prev
                                   </Button>
                               </InputGroup.Prepend>
                               <input type="text"  disabled={alerts.length === 0 ? true : false} className={"page-num bg-dark"} name="currentPage" value={currentPage} onChange={this.handleListNumericChange.bind(this)}/>
                               <InputGroup.Append>
                                   <Button type="button" variant="outline-info" disabled={currentPage === totalPage ? true : false} onClick={this.nextPage}>
                                       <FontAwesomeIcon icon={faStepForward} /> Next
                                   </Button>
                                   <Button type="button" variant="outline-info" disabled={currentPage === totalPage  ? true : false} onClick={this.lastPage} >
                                       <FontAwesomeIcon icon={faFastForward} /> Last
                                   </Button>
                               </InputGroup.Append>
                           </InputGroup>
                       </div>
                   </Card.Footer>
               </Card>

           </div>

        )
    }

}

export default withTranslation()(AlertComponent);