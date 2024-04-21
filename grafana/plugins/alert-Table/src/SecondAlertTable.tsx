import React from 'react';
import { forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import LinkIcon from '@material-ui/icons/Link';
import { ArrowDownward } from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
import { PanelProps } from '@grafana/data';
import { stylesFactory, Modal, Button } from '@grafana/ui';
import { getLegacyAngularInjector } from "@grafana/runtime";
import { SystemJS } from '@grafana/runtime';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import './AlertTable.css';
import 'tablesort.js';

interface Props extends PanelProps<SimpleOptions> { }

class Suggestion {
  suggestion: any;
  id: any;
  alertSource: any; // id of the alert that raised a suggestion to be solved
  timestamp: any;
}

export const SUGGESTIONSLIST: Suggestion[] = [];
export var appliedSuggestionsList: Suggestion[] = [];
export var isAdmin: Boolean = false;
export var checkboxesDisplayState: string = "block";
export var modalsStates: boolean[] = [];
export var idURL: string = "";
export var searchField: string = "";
export var filterFields: Array<string> = ["", "", "", "", "", "", "", ""];
export var alerts: Array<{
  id: string;
  DESCRIPTION: string;
  TIMESTAMP: string;
  LOCATION: string;
  INDICATION: string;
  TOOL: string;
  STATUS: string;
  ACTION: string;
  DETAILS: string;
  ALERTID: string;
}> = [];
export var refreshPageCounter: number = 0;

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  idURL = options.sphinxToolsUrls[20];
  const styles = getStyles();
  const injector = getLegacyAngularInjector();
  var timeRangeFrom: string = "";
  var timeRangeTo: string = "";
  var rawBodyRequest;
  var requestOptions;

  function refreshPage() {
    let element: HTMLElement = document.getElementsByClassName('btn btn--radius-right-0 navbar-button navbar-button--border-right-0')[0] as HTMLElement;
    element.click();
  }

  // first refreshing of page so that data can be retrieved
  if (refreshPageCounter === 0) {
    refreshPageCounter++;
    refreshPage();
  }

  // check if user is an Admin
  fetch("http://localhost:3000/api/users")
    .then(response => response.json())
    .then(result => {
      isAdmin = result[0].isAdmin;
    });

  // retrieve the suggestions already applied
  function getAppliedSuggestions() {
    appliedSuggestionsList = [];
    for (let index = 0; index < data.series[0].length; index++) {
      var tempSuggestion: Suggestion = new Suggestion();
      tempSuggestion.id = data.series.map(series => series.fields[2].values.get(index)).toString();
      tempSuggestion.alertSource = data.series.map(series => series.fields[1].values.get(index)).toString();
      tempSuggestion.suggestion = data.series.map(series => series.fields[3].values.get(index)).toString();
      appliedSuggestionsList.push(tempSuggestion);
    }
  }

  getAppliedSuggestions();

  // get time range for queries
  // @ts-ignore
  var dtFrom = new Date(data.timeRange.from._d);
  timeRangeFrom = dtFrom.toISOString();
  // @ts-ignore
  var dtTo = new Date(data.timeRange.to._d);
  timeRangeTo = dtTo.toISOString();

  var myHeaders = new Headers();
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("accept", "application/json, text/plain, */*");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("Sec-Fetch-Site", "same-origin");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Accept-Language", "en-US,en;q=0.9,ro;q=0.8");

  // Useful icons for Material Table (sort, search, pagination, export, links and further actions)
  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox />),
    Check: forwardRef((props, ref) => <Check />),
    Clear: forwardRef((props, ref) => <Clear />),
    Delete: forwardRef((props, ref) => <DeleteOutline />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight />),
    Edit: forwardRef((props, ref) => <Edit />),
    Export: forwardRef((props, ref) => <SaveAlt />),
    Filter: forwardRef((props, ref) => <FilterList />),
    FirstPage: forwardRef((props, ref) => <FirstPage />),
    LastPage: forwardRef((props, ref) => <LastPage />),
    NextPage: forwardRef((props, ref) => <ChevronRight />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
    ResetSearch: forwardRef((props, ref) => <Clear />),
    Search: forwardRef((props, ref) => <Search />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn />),
  };

  // Display/close modals for details
  const setModalState = (id: string, status: boolean) => {
    modalsStates[parseInt(id) - 1] = status;
    refreshPage();
  };

  // Display/close modals for details
  function setDisplayState(state: string) {
    checkboxesDisplayState = state;
  }

  // Display checkboxes (list of suggestions applied or not) on click
  function showCheckboxes(id: string) {
    var checkboxes = document.getElementById("checkboxes" + id);
    if (checkboxes.style.display == "block") {
      checkboxes.style.display = "none";
    } else {
      checkboxes.style.display = "block";
    }
  }

  // Apply multiple suggestions at once
  function applySuggestions(AlertSrc: string, id: number, Action: string) {
    let suggestions: Suggestion[] = [];
    for (let index = 0; index < JSON.parse(Action).length; index++) {
      const actionProposed = JSON.parse(Action);
      let suggestion: Suggestion = new Suggestion();
      var checkboxTempId = "alert" + id + "suggestion" + actionProposed[index].id;
      var element = document.getElementById(checkboxTempId) as HTMLInputElement;
      var isChecked = element.checked;
      var isDisabled = element.disabled;
      if (!isDisabled && isChecked) {
        let time = new Date();
        let formattedTime = time.toISOString();
        suggestion.id = actionProposed[index].id;
        suggestion.alertSource = AlertSrc;
        suggestion.suggestion = element.labels[0].title;
        suggestion.timestamp = formattedTime;
        suggestions.push(suggestion);
      }
    }
    if (suggestions.length > 0) {
      if (confirm('Do you confirm the applying of these suggestions?')) {

        var theURL = idURL + '/sphinx/id/suggestion/create';

        var createSuggestionHeaders = new Headers();
        createSuggestionHeaders.append("Content-Type", "application/json;charset=UTF-8");

        var rawSuggestionBody: JSON[] = [];
        for (let index = 0; index < suggestions.length; index++) {
          const element = suggestions[index];
          const obj = JSON.parse('{ "origin": "Grafana", "alertSrc": "' + element.alertSource + '", "dssAlert": "' + element.id + '", "suggestion": "' + element.suggestion + '", "timestamp": "' + element.timestamp + '" }');
          rawSuggestionBody.push(obj);
        }

        var createSuggestionOptions = {
          method: 'POST',
          headers: createSuggestionHeaders,
          body: JSON.stringify(rawSuggestionBody),
        };

        fetch(theURL, createSuggestionOptions)
          .then(response => response.json())
          .then(result => {
            if (result.message === "All suggestions were saved") {
              SystemJS.load('app/core/app_events').then((appEvents: any) => {
                appEvents.emit('alert-success', ["All suggestions were saved"]);
              });
              for (let index = 0; index < suggestions.length; index++) {
                if (isAdmin) {
                  var hrefId = "hrefalert" + id + "suggestion" + suggestions[index].id;
                  var hrefElement = document.getElementById(hrefId) as HTMLInputElement;
                  hrefElement.style.display = "block";
                }
                var checkboxId = "alert" + id + "suggestion" + suggestions[index].id;
                (document.getElementById(checkboxId) as HTMLInputElement).disabled = true;
              }
              getAppliedSuggestions();
              refreshTable();
              refreshPage();
            } else {
              SystemJS.load('app/core/app_events').then((appEvents: any) => {
                appEvents.emit('alert-error', [result.message]);
              });
            }
          });
      }
    }
  }

  // (ONLY ADMIN)
  // Delete one suggestion at a time 
  function deleteSuggestion(rowid: string, id: string, alertSrc: string) {
    if (confirm('Do you confirm the deleting of the suggestion?')) {

      var theURL = idURL + '/sphinx/id/suggestion/delete';

      var createSuggestionHeaders = new Headers();
      createSuggestionHeaders.append("Content-Type", "application/json;charset=UTF-8");

      var rawSuggestionBody = JSON.stringify({ origin: "Grafana", alertSrc: alertSrc, dssAlert: id });

      var createSuggestionOptions = {
        method: 'POST',
        headers: createSuggestionHeaders,
        body: rawSuggestionBody,
      };

      fetch(theURL, createSuggestionOptions)
        .then(response => response.json())
        .then(result => {
          if (result.message === "Suggestion deleted") {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-success', ['Suggestion deleted']);
            });
            if (isAdmin) {
              var hrefId = "hrefalert" + rowid + "suggestion" + id;
              var hrefElement = document.getElementById(hrefId) as HTMLInputElement;
              hrefElement.style.display = "none";
            }
            var checkboxId = "alert" + rowid + "suggestion" + id;
            (document.getElementById(checkboxId) as HTMLInputElement).checked = false;
            (document.getElementById(checkboxId) as HTMLInputElement).disabled = false;
            getAppliedSuggestions();
            refreshTable();
            refreshPage();
          } else {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-error', [result.message]);
            })
          }
          // window.location.reload();
          // ascundere buton stergere si enablare checkbox
          // filtrare
        });
    }
  }

  // Data retrieving
  function refreshTable() {
    let rawSQL;
    // searchField.length > 0 && searchField != "" ?
    //   rawSQL = "SELECT row_to_json(t) FROM (SELECT \"DESCRIPTION\", \"TIMESTAMP\", \"LOCATION\", \"INDICATION\", \"TOOL\", \"STATUS\", \"ACTION\", \"DETAILS\", id, \"ALERTID\"  FROM sphinx.\"kafka_ID_ALERTS\" WHERE (TO_TIMESTAMP(\"TIMESTAMP\", 'YYYY-MM-DDTHHH:MI:SS:MSZ') BETWEEN '" + timeRangeFrom + "' AND '" + timeRangeTo + "') AND (LOWER(\"DESCRIPTION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"TIMESTAMP\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"LOCATION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"INDICATION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"TOOL\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"STATUS\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"ACTION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"DETAILS\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(id::varchar(255)) LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"ALERTID\") LIKE '%" + searchField.toLowerCase() + "%' ) ORDER BY id Desc) t;"
    //   :
    //   rawSQL = " SELECT row_to_json(t) FROM (SELECT \"DESCRIPTION\", \"TIMESTAMP\", \"LOCATION\", \"INDICATION\", \"TOOL\", \"STATUS\", \"ACTION\", \"DETAILS\", id, \"ALERTID\"  FROM sphinx.\"kafka_ID_ALERTS\" WHERE TO_TIMESTAMP(\"TIMESTAMP\", 'YYYY-MM-DDTHHH:MI:SS:MSZ') BETWEEN '" + timeRangeFrom + "' AND '" + timeRangeTo + "' ORDER BY id Desc) t;"

    rawSQL = "SELECT row_to_json(t) FROM (SELECT \"DESCRIPTION\", \"TIMESTAMP\", \"LOCATION\", \"INDICATION\", \"TOOL\", \"STATUS\", \"ACTION\", \"DETAILS\", id, \"ALERTID\" FROM sphinx.\"kafka_ID_ALERTS\" WHERE (TO_TIMESTAMP(\"TIMESTAMP\", 'YYYY-MM-DDTHHH:MI:SS:MSZ') BETWEEN '" + timeRangeFrom + "' AND '" + timeRangeTo + "') AND ((LOWER(\"DESCRIPTION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"TIMESTAMP\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"LOCATION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"INDICATION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"TOOL\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"STATUS\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"ACTION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"DETAILS\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(id::varchar(255)) LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"ALERTID\") LIKE '%" + searchField.toLowerCase() + "%' ) AND (LOWER(\"DESCRIPTION\") LIKE '%" + filterFields[0].toLowerCase() + "%' AND LOWER(\"TIMESTAMP\") LIKE '%" + filterFields[1].toLowerCase() + "%' AND LOWER(\"LOCATION\") LIKE '%" + filterFields[2].toLowerCase() + "%' AND LOWER(\"INDICATION\") LIKE '%" + filterFields[3].toLowerCase() + "%' AND LOWER(\"TOOL\") LIKE '%" + filterFields[4].toLowerCase() + "%' AND LOWER(\"ACTION\") LIKE '%" + filterFields[5].toLowerCase() + "%' AND LOWER(\"DETAILS\") LIKE '%" + filterFields[6].toLowerCase() + "%' AND LOWER(\"STATUS\") LIKE '%" + filterFields[7].toLowerCase() + "%' ))ORDER BY id Desc) t;"
    // rawSQL = "SELECT row_to_json(t) FROM (SELECT \"DESCRIPTION\", \"TIMESTAMP\", \"LOCATION\", \"INDICATION\", \"TOOL\", \"STATUS\", \"ACTION\", \"DETAILS\", id, \"ALERTID\"  FROM sphinx.\"kafka_ID_ALERTS\" WHERE (TO_TIMESTAMP(\"TIMESTAMP\", 'YYYY-MM-DDTHHH:MI:SS:MSZ') BETWEEN '" + timeRangeFrom + "' AND '" + timeRangeTo + "') AND (LOWER(\"DESCRIPTION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"TIMESTAMP\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"LOCATION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"INDICATION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"TOOL\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"STATUS\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"ACTION\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"DETAILS\") LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(id::varchar(255)) LIKE '%" + searchField.toLowerCase() + "%' OR LOWER(\"ALERTID\") LIKE '%" + searchField.toLowerCase() + "%' ) ORDER BY id Desc) t;"

    rawBodyRequest = JSON.stringify({
      "from": (Date.parse(timeRangeFrom) / 1000).toString(),
      "to": (Date.parse(timeRangeTo) / 1000).toString(),
      "queries": [
        {
          "refId": "A",
          "intervalMs": 60000,
          "maxDataPoints": 1451,
          "datasourceId": 9,
          "rawSql": rawSQL,
          "format": "table"
        }
      ]
    })

    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: rawBodyRequest,
    };

    fetch('http://localhost:3000/api/tsdb/query', requestOptions)
      .then(response => response.json())
      .then(result => {
        alerts = [];
        var jsonData = result.results.A.tables[0].rows;
        for (let index = 0; index < jsonData.length; index++) {
          var suggestions;
          if (IsJsonString(JSON.parse(jsonData[index][0]).ACTION)) {
            suggestions = JSON.parse(JSON.parse(jsonData[index][0]).ACTION);
            for (let i = 0; i < suggestions.length; i++) {
              var suggestion: Suggestion = new Suggestion();
              suggestion.id = suggestions[i].id;
              suggestion.suggestion = suggestions[i].suggestion;
              suggestion.alertSource = JSON.parse(jsonData[index][0]).ALERTID;
              SUGGESTIONSLIST.push(suggestion);
            }
          }
          modalsStates.push(false);
          alerts.push({
            id: JSON.parse(jsonData[index][0]).id,
            DESCRIPTION: JSON.parse(jsonData[index][0]).DESCRIPTION,
            TIMESTAMP: JSON.parse(jsonData[index][0]).TIMESTAMP,
            LOCATION: JSON.parse(jsonData[index][0]).LOCATION,
            INDICATION: JSON.parse(jsonData[index][0]).INDICATION,
            TOOL: JSON.parse(jsonData[index][0]).TOOL,
            ACTION: JSON.parse(jsonData[index][0]).ACTION,
            DETAILS: JSON.parse(jsonData[index][0]).DETAILS,
            STATUS: JSON.parse(jsonData[index][0]).STATUS,
            ALERTID: JSON.parse(jsonData[index][0]).ALERTID,
          });
        }
      })
    return alerts;
  }

  function updateData() {
    getAppliedSuggestions();
    refreshTable();
  }

  function refreshFilters(filters: any) {
    filterFields = ["", "", "", "", "", "", "", ""];
    for (let index = 0; index < filters.length; index++) {
      const element = filters[index];
      switch (element.column.field) {
        case 'DESCRIPTION':
          filterFields[0] = element.value;
          break;
        case 'TIMESTAMP':
          filterFields[1] = element.value;
          break;
        case 'LOCATION':
          filterFields[2] = element.value;
          break;
        case 'INDICATION':
          filterFields[3] = element.value;
          break;
        case 'TOOL':
          filterFields[4] = element.value;
          break;
        case 'ACTION':
          filterFields[5] = element.value;
          break;
        case 'DETAILS':
          filterFields[6] = element.value;
          break;
        case 'STATUS':
          filterFields[7] = element.value;
          break;
        default:
          break;
      }
    }
  }

  // When refresh button is clicked, data is retrieved
  injector.get('$rootScope').$on('refresh', updateData());

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >

      <MaterialTable
        onSearchChange={(e) => {
          searchField = e;
          updateData();
        }}
        onFilterChange={(filters) => {
          refreshFilters(filters);
          updateData();
        }}
        title="ALERTS"
        icons={tableIcons}
        columns={[
          {
            title: 'ID',
            field: 'id',
            filtering: false,
          },
          {
            title: 'Description',
            field: 'DESCRIPTION',
            render: rowData => (
              <p title={rowData.DESCRIPTION}>{
                rowData.DESCRIPTION.length > 20 ? rowData.DESCRIPTION.substring(0, 20) + "..." : rowData.DESCRIPTION
              }</p>
            ),
          },
          {
            title: 'Date and Time',
            field: 'TIMESTAMP',
            customSort: (a, b) => { return new Date(a.TIMESTAMP).getTime() / 1000 - new Date(b.TIMESTAMP).getTime() / 1000 },
            render: rowData => (
              rowData.TIMESTAMP.replace('T', ' ').replace('Z', '')
            ),
          },
          {
            title: 'Location',
            field: 'LOCATION',
          },
          {
            title: 'IPs',
            field: 'INDICATION',
            render: rowData => (
              <p title={rowData.INDICATION}>{
                rowData.INDICATION.length > 20 ? rowData.INDICATION.substring(0, 20) + "..." : rowData.INDICATION
              }</p>
            ),
          },
          {
            title: 'SPHINX TOOL',
            field: 'TOOL',
          },
          {
            title: 'Action proposed',
            field: 'ACTION',
            export: false,
            render: rowData => (
              IsJsonString(rowData.ACTION) ?
                <form style={{ border: "0px" }}>
                  <div id={"multiselect" + rowData.id}>
                    <div id={"selectBox" + rowData.id} onClick={() => showCheckboxes(rowData.id)}>
                      <select>
                        <option>Select a suggestion</option>
                      </select>
                      <div id={"overSelect" + rowData.id}></div>
                    </div>
                    {isOneSuggestionApplied(rowData.ACTION, rowData.ALERTID) ?
                      setDisplayState("block")
                      :
                      setDisplayState("none")
                    }
                    <div id={"checkboxes" + rowData.id} style={{ display: checkboxesDisplayState }}>
                      {
                        JSON.parse(rowData.ACTION).map((el: any) =>
                          isSuggestionApplied(el.suggestion, rowData.ALERTID) ?
                            isAdmin ?
                              <label className="actionsDropdownOption" title={el.suggestion} htmlFor={"alert" + rowData.id + "suggestion" + el.id} >
                                <a id={"hrefalert" + rowData.id + "suggestion" + el.id} style={{ color: "red", padding: "1px" }} onClick={() => deleteSuggestion(rowData.id, el.id, rowData.ALERTID)}><i className="fa fa-trash"></i></a>
                                <input disabled type="checkbox" id={"alert" + rowData.id + "suggestion" + el.id} />{el.suggestion.substring(0, 20) + "..."}</label>
                              :
                              <label className="actionsDropdownOption" title={el.suggestion} htmlFor={"alert" + rowData.id + "suggestion" + el.id} >
                                <input disabled type="checkbox" id={"alert" + rowData.id + "suggestion" + el.id} />{el.suggestion.substring(0, 20) + "..."}</label>
                            :
                            <label className="actionsDropdownOption" title={el.suggestion} htmlFor={"alert" + rowData.id + "suggestion" + el.id} >
                              <a id={"hrefalert" + rowData.id + "suggestion" + el.id} style={{ display: "none", color: "red", padding: "1px" }} onClick={() => deleteSuggestion(rowData.id, el.id, rowData.ALERTID)}><i className="fa fa-trash"></i></a>
                              <input type="checkbox" id={"alert" + rowData.id + "suggestion" + el.id} />{el.suggestion.substring(0, 20) + "..."}</label>
                        )
                      }
                      <label style={{ cursor: "pointer", width: "100%", backgroundColor: "green", color: "white", textAlign: "center" }} onClick={() => applySuggestions(rowData.ALERTID, parseInt(rowData.id), rowData.ACTION)}>Apply suggestions</label>
                    </div>
                  </div>
                </form>
                :
                <p>-</p>
            ),
          },
          {
            title: 'Details',
            field: 'DETAILS',
            render: rowData => (
              <div>
                <Button style={{ padding: '0px 6px' }} title="Show details" onClick={() => setModalState(rowData.id, true)}>Show details</Button>
                <Modal className={"myModal" + rowData.id} title="Alert details" isOpen={modalsStates[parseInt(rowData.id) - 1]} onDismiss={() => setModalState(rowData.id, false)}>
                  <pre style={{ whiteSpace: 'pre' }}>{rowData.DETAILS}</pre>
                </Modal>
              </div>
            ),
          },
          {
            title: 'Status',
            field: 'STATUS',
            render: rowData => (
              rowData.STATUS === "OPEN" ?
                <select id={"status" + rowData.id} onChange={() => checkSelectedOption(parseInt(rowData.id), 'OPEN', data)}>
                  <option value="OPEN" selected title="If the alert is in the progress of being resolved or no steps have been taken yet.">
                    OPEN
                  </option>
                  <option value="CLOSED" title="If the alert was solved or it is not available anymore.">CLOSED</option>
                  <option value="IGNORE" title="Ignored if the alert is not important for the user.">IGNORE</option>
                  <option value="ACKNOWLEDGE" title="If the alert was acknowledged by an user already.">ACKNOWLEDGE</option>
                </select>
                :
                rowData.STATUS === "CLOSED" ?
                  <select id={"status" + rowData.id} onChange={() => checkSelectedOption(parseInt(rowData.id), 'CLOSED', data)}>
                    <option value="OPEN" title="If the alert is in the progress of being resolved or no steps have been taken yet.">OPEN</option>
                    <option value="CLOSED" selected title="If the alert was solved or it is not available anymore.">
                      CLOSED
                    </option>
                    <option value="IGNORE" title="Ignored if the alert is not important for the user.">IGNORE</option>
                    <option value="ACKNOWLEDGE" title="If the alert was acknowledged by an user already.">ACKNOWLEDGE</option>
                  </select>
                  :
                  rowData.STATUS === "IGNORE" ?
                    <select id={"status" + rowData.id} onChange={() => checkSelectedOption(parseInt(rowData.id), 'IGNORE', data)}>
                      <option value="OPEN" title="If the alert is in the progress of being resolved or no steps have been taken yet.">OPEN</option>
                      <option value="CLOSED" title="If the alert was solved or it is not available anymore.">CLOSED</option>
                      <option value="IGNORE" selected title="Ignored if the alert is not important for the user.">
                        IGNORE
                      </option>
                      <option value="ACKNOWLEDGE" title="If the alert was acknowledged by an user already.">ACKNOWLEDGE</option>
                    </select>
                    :
                    <select id={"status" + rowData.id} onChange={() => checkSelectedOption(parseInt(rowData.id), 'ACKNOWLEDGE', data)}>
                      <option value="OPEN" title="If the alert is in the progress of being resolved or no steps have been taken yet.">OPEN</option>
                      <option value="CLOSED" title="If the alert was solved or it is not available anymore.">CLOSED</option>
                      <option value="IGNORE" title="Ignored if the alert is not important for the user.">IGNORE</option>
                      <option value="ACKNOWLEDGE" selected title="If the alert was acknowledged by an user already.">
                        ACKNOWLEDGE
                      </option>
                    </select>
            ),
          },
          {
            title: 'Alert identifier',
            field: 'ALERTID',
            hidden: true,
            export: true,
          },
        ]}
        data={refreshTable()}
        options={{
          minBodyHeight: 660,
          maxBodyHeight: 660,
          paginationPosition: 'bottom',
          exportButton: true,
          selectionProps: (rowData: { tool: string }) => ({
            disabled: rowData.tool === 'DTM',
            color: 'primary',
          }),
          sorting: true,
          filtering: true,
        }}
        localization={{
          header: {
            actions: 'Link',
          }
        }}
        actions={
          [
            {
              icon: LinkIcon,
              tooltip: 'Go to panel',
              onClick: (event, rowData) => {
                const history = useHistory();
                let sphinxSmTicket = sessionStorage.getItem('sphinx_sm_ticket');
                if (sphinxSmTicket == null) {
                  sphinxSmTicket = '';
                  history.push('#');
                }

                else {
                  // @ts-ignore
                  switch (rowData['TOOL']) {
                    case 'AE':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'AD':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'HP':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'BBTR':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'DTM':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'DSS':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'KB':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'RCRA':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'SIEM':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'VAAAS':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'ABS':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'MLID':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'HE':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'AP':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'FDCE':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'CST':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'S-API':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'SB':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'SM':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    case 'CIP':
                      history.push(options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket));
                      break;
                    default:
                      history.push('#');
                      break;
                  }
                }
              }
            }
          ]}
      />
    </div >
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
      `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
      `,
  };
});

// Sets the new Status in PSQL from OPEN to CLOSED, for example
function updateAlert(rowID: string, status: string) {
  var theURL = idURL + '/sphinx/id/alert/update';

  var createSuggestionHeaders = new Headers();
  createSuggestionHeaders.append("Content-Type", "application/json;charset=UTF-8");

  var rawSuggestionBody = JSON.stringify({ origin: "Grafana", status: status, id: rowID });

  var createSuggestionOptions = {
    method: 'POST',
    headers: createSuggestionHeaders,
    body: rawSuggestionBody,
  };

  fetch(theURL, createSuggestionOptions)
    .then(response => response.json())
    .then(result => {
      if (result.message === "Alert updated!") {
        SystemJS.load('app/core/app_events').then((appEvents: any) => {
          appEvents.emit('alert-success', ["Alert status updated"]);
        });
      } else {
        SystemJS.load('app/core/app_events').then((appEvents: any) => {
          appEvents.emit('alert-error', ["Alert status could not be updated"]);
        });
      }
    });
}


// Checks the new value selected
function checkSelectedOption(rowID: number, lastOption: string, data: any) {
  if (confirm('Do you confirm the new status of the alert?')) {
    var selectID = 'status' + rowID;
    var select = document.getElementById(selectID) as HTMLSelectElement;
    var currentOption = select.options[select.selectedIndex].innerHTML.toString();
    var ID = rowID.toString();
    updateAlert(ID, currentOption);
  }
}

function IsJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function isSuggestionApplied(suggestion: string, alertSrc: string) {
  for (let index = 0; index < appliedSuggestionsList.length; index++) {
    const element = appliedSuggestionsList[index];
    if (alertSrc === element.alertSource && suggestion === element.suggestion) {
      return true;
    }
  }

  return false;
}

function isOneSuggestionApplied(action: string, alertSrc: string) {
  let result: Boolean = false;
  JSON.parse(action).map((el: any) => {
    for (let index = 0; index < appliedSuggestionsList.length; index++) {
      const element = appliedSuggestionsList[index];
      if (alertSrc === element.alertSource && el.suggestion === element.suggestion) {
        result = true;
        return true;
      }
    }
    return false;
  }
  );
  return result;
}
