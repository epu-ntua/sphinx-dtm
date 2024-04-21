import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index.es";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import React from 'react';
import base64 from 'react-native-base64';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

class GrafanaComponent extends React.Component {

    submit = (idToDelete, iconToDelete, email) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this e-mail?',               // Message dialog
            buttons: [
                {
                    label: 'Cancel'
                },
                {
                    label: "Yes",
                    onClick: () => { this.deleteEmail(email); setTimeout(function () { if (document.getElementById("deleted").innerHTML == 'true') { document.getElementById(idToDelete).style.display = 'none'; document.getElementById(iconToDelete).style.display = 'none'; } else { alert("Error") } }, 500); }
                }
            ]
        });
    };

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            displayListElement: true,
            serverGrafana: window._env_.REACT_APP_SPHINX_GRAFANA_API_URL,
            server: window._env_.REACT_APP_SPHINX_AD_API_URL,
			emailURL: window._env_.REACT_APP_SPHINX_ID_EMAIL_API_URL,
            exportURL: "",
            exportContent: "-",
            importContentResult: "-",
            emailListContent: "-",
            loadingImport: false,
            emails: this.getEmailList()
        }
        this.addEmail = this.addEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
        this.getEmailList = this.getEmailList.bind(this);
        this.assignEmailList = this.assignEmailList.bind(this);
    }

    async componentDidMount() {
        document.title = "Sphinx Components";
        // admin:admin@
        //const exportURL = this.state.server.replace("http://","http://") + "/api/datasources";
        const exportURL = this.state.server + "/sphinx/ad/grafana/config/api/datasources";
        this.setState({ exportURL: exportURL });
    }

    syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    showDatasource() {
        this.doAction(this.state.exportURL);
    }

    exportDatasource = () => {
        fetch(this.state.exportURL + "/export")
            .then(response => {
                let filename = "data-source_" + new Date().getTime();
                const contentDisposition = response.headers.get('Content-Disposition');
                if (contentDisposition != null) {
                    filename = contentDisposition.split('filename=')[1];
                }

                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
            });
    }

    doAction(url) {
        const token = base64.encode("admin" + ":" + "admin");
        fetch(url, {
            //    mode: 'no-cors',
            method: 'GET',
            //       withCredentials: true,
            //     credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                //          'Authorization': 'Basic ' + token
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                var str = JSON.stringify(data, undefined, 4);
                var html = this.syntaxHighlight(str);
                this.setState({ exportContent: html });
            })
            .catch((error) => {
                this.setState({ exportContent: '<b>Error!</b>' });
            });
    }

    isActive(t) {
        var t = "#" + t;
        var tab = window.location.hash;
        if (tab == null || tab == "" || tab == undefined) {
            if (t == "#exportdatasources") {
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

    onFileChange = (event) => {
        event.preventDefault();

        this.setState({ loadingImport: true });

        let data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', event.target.files[0].name);

        fetch(this.state.server + '/sphinx/ad/grafana/config/api/datasources', {
            method: 'POST',
            body: data
        })
            .then((res) => {
                return res.text();
            }).then(response => {
                //  window.location = "/grafana/config#importdatasources";|
                this.setState({ importContentResult: response });
                this.setState({ loadingImport: false });
            }).catch(err => {
                //  window.location = "/grafana/config#importdatasources";
                this.setState({ importContentResult: "error" });
                this.setState({ loadingImport: false });
            });
    }

    getEmailList() {
        var xhr = new XMLHttpRequest();
        var theUrl = this.state.emailURL + "/sphinx/id/email/show-emails";
        xhr.open('GET', theUrl, false);
        xhr.send(null);
        console.log(xhr.responseText.replace("[", "").replace("]", "").replaceAll("\"", "").split(","));
        this.setState(prevState => {
            return {
                emails: xhr.responseText.replace("[", "").replace("]", "").replaceAll("\"", "").split(",")
            }
        })
        if (xhr.responseText == [""]) {
           return ["None"];
        }
        else {
            return xhr.responseText.replace("[", "").replace("]", "").replaceAll("\"", "").split(",");
        }
    }

    addEmail(email) {
        var xhr = new XMLHttpRequest();
        var theUrl = this.state.emailURL + "/sphinx/id/email/add-email";
        xhr.open('POST', theUrl, true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({ "email": email }));
        setTimeout(this.assignEmailList, 500);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.responseText == 'true') {
                    NotificationManager.success('E-mail added sucessfully', 'E-mail');
                }
                else {
                    NotificationManager.error('Error in adding E-mail', 'E-mail');
                }
            }
        }
    }

    deleteEmail(email) {
        console.log(email);
        var xhr = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = this.state.emailURL + "/sphinx/id/email/delete-email";
        xhr.open("POST", theUrl);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.responseText == 'true') {
                    NotificationManager.success('E-mail deleted', 'E-mail');
                    document.getElementById("deleted").innerHTML = 'true';
                }
                else {
                    NotificationManager.error('Error in deleting E-mail', 'E-mail');
                    document.getElementById("deleted").innerHTML = 'false';
                }
            }
        }
        document.getElementById("exampleInputEmail1").value = "";
        xhr.send(JSON.stringify({ "email": email }));
    }

    validateEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            document.getElementById("exampleInputEmail1").value = "";
            this.addEmail(email);
        }
        else {
            NotificationManager.warning("You have entered an invalid email address!")
        }
        this.getEmailList();
    }

    assignEmailList() {
        var emailList = this.getEmailList();
        return emailList;
    }

    timeout_init() {
        setTimeout('assignEmailList()', 2000);
    }

    render() {
        return (
            <div className="container mt-3 grafana-config">
                <NotificationContainer />
                <ul className="nav nav-tabs" id="grafanaConfigTab" role="tablist">
                    <li className="nav-item">
                        <a className={"nav-link " + this.isActive('exportdatasources')} id="exportdatasources-tab" data-toggle="tab" href="#exportdatasources" role="tab"
                            aria-controls="exportdatasources" aria-selected="true">Export Datasources</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + this.isActive('importdatasources')} id="importdatasources-tab" data-toggle="tab" href="#importdatasources" role="tab"
                            aria-controls="importdatasources" aria-selected="false">Import Datasources</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + this.isActive('emails')} id="emails-tab" data-toggle="tab" href="#email" role="tab"
                            aria-controls="email" aria-selected="false">E-mail list alerts</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className={"tab-pane fade show " + this.isActive('exportdatasources')} id="exportdatasources" role="tabpanel" aria-labelledby="exportdatasources-tab">


                        <div className="card  text-white bg-dark mb-3">
                            {/* <div className="card-header">Grafana: <b>{this.state.serverGrafana}</b></div> */}
                            <div className="card-body">
                                {/*
                               <div className="form-group mr-2">
                                      <div className="label">Action: {this.state.exportURL}</div>
                               </div>
                                */}
                                <div className={"row container"}>
                                    <button onClick={() => this.showDatasource()} type="button" className="btn btn-info">Show</button> &nbsp;
                                    <button onClick={() => this.exportDatasource()} className="btn btn-info">Export</button>&nbsp;
                               </div>
                                <pre dangerouslySetInnerHTML={{ __html: this.state.exportContent }} id="exportContent" className="alert alert-warning mt-3">

                                </pre>

                            </div>
                        </div>
                    </div>
                    <div className={"tab-pane fade " + this.isActive('importdatasources')} id="importdatasources" role="tabpanel" aria-labelledby="importdatasources-tab">

                        <div className="card  text-white bg-dark mb-3">
                            {/* <div className="card-header">Grafana: <b>{this.state.serverGrafana}</b></div> */}
                            <div className="card-body">

                                {
                                    this.state.loadingImport ?
                                        (
                                            <span className="btn btn-info">
                                                <FontAwesomeIcon icon={faSpinner} spin /> &nbsp;
                                               Import datasources
                                            </span>
                                        )
                                        :
                                        (
                                            <span>
                                                <label htmlFor="file-upload" className="custom-file-upload">
                                                    <div className="btn btn-info">Import file</div>
                                                </label>
                                                <input onChange={this.onFileChange} id="file-upload" type="file" />
                                            </span>
                                        )
                                }

                                <pre dangerouslySetInnerHTML={{ __html: this.state.importContentResult }} id="importContent" className="alert alert-warning mt-3">

                                </pre>

                            </div>
                        </div>

                    </div>
                    <div className={"tab-pane fade " + this.isActive('emails')} id="email" role="tabpanel" aria-labelledby="emails-tab">

                        <div className="card  text-white bg-dark mb-3">
                            {/* <div className="card-header">Grafana: <b>{this.state.serverGrafana}</b></div> */}
                            <div className="card-body">
                                {this.state.loadingImport ?
                                    (
                                        <span className="btn btn-info">
                                            <FontAwesomeIcon icon={faSpinner} spin /> &nbsp;
												Add e-mail
                                        </span>
                                    ) :
                                    (
                                        <div>
                                            <button type="button" onClick={() => this.assignEmailList()} className="btn btn-success" >Refresh</button> &nbsp;
                                            {/* <button onClick={() => this.validateEmail(document.getElementById('exampleInputEmail1').value)} className="btn btn-info">Add e-mail</button>&nbsp; */}
                                            {/* <button onClick={() => this.deleteEmail(document.getElementById('exampleInputEmail1').value)} className="btn btn-danger">Delete e-mail</button>&nbsp; */}
                                            <br />
                                            <br />
                                            <div id="bodd" style={{ display: "flex", width: "100%" }}>
                                                <input style={{ width: "88%" }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Add e-mail" /> &nbsp;
                                                <button style={{ width: "12%" }} onClick={() => this.validateEmail(document.getElementById('exampleInputEmail1').value)} className="btn btn-info">Add e-mail</button>&nbsp;
                                            </div>
                                        </div>
                                    )
                                }
                                <div style={{ backgroundColor: "white" }} id="emailListContent" className="alert alert-warning mt-3">
                                    <List dense>
                                        {this.state.emails[0] != "None" && this.state.emails[0] !=  "" ?
                                            this.state.emails.map((value) => {
                                                const labelId = `checkbox-list-secondary-label-${value}`;
                                                return (
                                                    <ListItem id={labelId + "text"} key={value} button style={{ borderBottom: "1px solid black", fontWeight: "bold", color: "black" }}>
                                                        <ListItemText id={labelId} primary={`${value}`} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton onClick={() => this.submit(labelId + "text", labelId + "del", value)} edge="end" aria-label="delete" style={{ color: "red" }}>
                                                                <DeleteIcon id={labelId + "del"} />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            })
                                            : null
                                        }
                                    </List>
                                    <p id="deleted" style={{ display: "none" }}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GrafanaComponent;