import React, { useState } from 'react';
import { forwardRef } from 'react';
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
import { getLegacyAngularInjector } from '@grafana/runtime';
import { SystemJS } from '@grafana/runtime';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import './AlertTable.css';
import 'tablesort.js';
import { createMuiTheme, FormControl, MenuItem, Select, TextField, ThemeProvider} from '@material-ui/core';

interface Props extends PanelProps<SimpleOptions> {}

class Suggestion {
  suggestion: any;
  id: any;
  alertSource: any; // id of the alert that raised a suggestion to be solved
  timestamp: any;
}

class Alert {
  id: string;
  DESCRIPTION: string;
  CLASSIFICATION: string;
  TIMESTAMP: string;
  LOCATION: string;
  INDICATION: string;
  TOOL: string;
  STATUS: string;
  ACTION: string;
  DETAILS: string;
  ALERTID: string;
}

export const SUGGESTIONSLIST: Suggestion[] = [];
export var appliedSuggestionsList: Suggestion[] = [];
export var isAdmin: Boolean = false;
export var userEmail: string = '';
export var statusSelect: boolean = true;
export var idUser: number = 0;
export var checkboxesDisplayState: string = 'block';
export var idURL: string = '';
export var grafanaBackendURL: string = '';
export var statusRef = React.createRef();
export var alerts: Array<{
  id: string;
  DESCRIPTION: string;
  CLASSIFICATION: string;
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
export var modalInfo: string = '';
export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = createMuiTheme({
    overrides: {
      MuiTypography: {
        h6: {
          color: 'black',
        },
      },
    },
  });
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  idURL = options.sphinxToolsUrls[20];
  grafanaBackendURL = options.sphinxToolsUrls[21];
  const styles = getStyles();
  const injector = getLegacyAngularInjector();
  let [columnsObject] = useState([
    {
      title: 'ID',
      field: 'id',
      filtering: false,
    },
    {
      title: 'Description',
      field: 'DESCRIPTION',
      render: (rowData: any) => (
        <p title={rowData.DESCRIPTION}>
          {rowData.DESCRIPTION.length > 20 ? rowData.DESCRIPTION.substring(0, 20) + '...' : rowData.DESCRIPTION}
        </p>
      ),
    },
    {
      title: 'Severity',
      field: 'CLASSIFICATION',
      lookup: { low: 'low', medium: 'medium', high: 'high' },
    },
    {
      title: 'Date and Time',
      field: 'TIMESTAMP',
      customSort: (a: any, b: any) => {
        return new Date(a.TIMESTAMP).getTime() / 1000 - new Date(b.TIMESTAMP).getTime() / 1000;
      },
      render: (rowData: any) => rowData.TIMESTAMP.replace('T', ' ').replace('Z', ''),
    },
    {
      title: 'Location',
      field: 'LOCATION',
      render: (rowData: any) => (rowData.LOCATION != null ? <p>{rowData.LOCATION}</p> : <p>-</p>),
    },
    {
      title: 'IPs',
      field: 'INDICATION',
      render: (rowData: any) => (
        <p title={rowData.INDICATION}>
          {rowData.INDICATION.length > 20 ? rowData.INDICATION.substring(0, 20) + '...' : rowData.INDICATION}
        </p>
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
      render: (rowData: any) =>
        IsJsonString(rowData.ACTION) ? (
          <form style={{ border: '0px' }}>
            <div id={'multiselect' + rowData.id}>
              <div id={'selectBox' + rowData.id} onClick={() => showCheckboxes(rowData.id)}>
                <select>
                  <option>Select a suggestion</option>
                </select>
                <div id={'overSelect' + rowData.id}></div>
              </div>
              {isOneSuggestionApplied(rowData.ACTION, rowData.ALERTID)
                ? setDisplayState('block')
                : setDisplayState('none')}
              <div id={'checkboxes' + rowData.id} style={{ display: checkboxesDisplayState }}>
                {JSON.parse(rowData.ACTION).map((el: any) =>
                  isSuggestionApplied(el.suggestion, rowData.ALERTID) ? (
                    isAdmin ? (
                      <label
                        className="actionsDropdownOption"
                        title={el.suggestion}
                        htmlFor={'alert' + rowData.id + 'suggestion' + el.id}
                      >
                        <a
                          id={'hrefalert' + rowData.id + 'suggestion' + el.id}
                          style={{ color: 'red', padding: '1px' }}
                          onClick={() => deleteSuggestion(rowData.id, el.id, rowData.ALERTID)}
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                        <input disabled type="checkbox" id={'alert' + rowData.id + 'suggestion' + el.id} />
                        {el.suggestion.substring(0, 20) + '...'}
                      </label>
                    ) : (
                      <label
                        className="actionsDropdownOption"
                        title={el.suggestion}
                        htmlFor={'alert' + rowData.id + 'suggestion' + el.id}
                      >
                        <input disabled type="checkbox" id={'alert' + rowData.id + 'suggestion' + el.id} />
                        {el.suggestion.substring(0, 20) + '...'}
                      </label>
                    )
                  ) : (
                    <label
                      className="actionsDropdownOption"
                      title={el.suggestion}
                      htmlFor={'alert' + rowData.id + 'suggestion' + el.id}
                    >
                      <a
                        id={'hrefalert' + rowData.id + 'suggestion' + el.id}
                        style={{ display: 'none', color: 'red', padding: '1px' }}
                        onClick={() => deleteSuggestion(rowData.id, el.id, rowData.ALERTID)}
                      >
                        <i className="fa fa-trash"></i>
                      </a>
                      <input type="checkbox" id={'alert' + rowData.id + 'suggestion' + el.id} />
                      {el.suggestion.substring(0, 20) + '...'}
                    </label>
                  )
                )}
                <label
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    backgroundColor: 'green',
                    color: 'white',
                    textAlign: 'center',
                  }}
                  onClick={() => applySuggestions(rowData.ALERTID, parseInt(rowData.id), rowData.ACTION)}
                >
                  Apply suggestions
                </label>
              </div>
            </div>
          </form>
        ) : (
          <p>-</p>
        ),
    },
    {
      title: 'Custom action',
      field: '',
      render: (rowData: any) => (
        <div style={{ display: 'inline-flex', width: '200px' }}>
          <TextField id={'customAction' + rowData.id} fullWidth size="small" label="Custom action taken" />
          <br />
          <Button
            style={{ marginBottom: '0px', border: '#00a79d', background: '#00a79d' }}
            onClick={() => applyCustomSuggestion(rowData.ALERTID, parseInt(rowData.id))}
          >
            Save
          </Button>
        </div>
      ),
    },
    {
      title: 'Details',
      field: 'DETAILS',
      render: (rowData: any) => (
        <div>
          <Button style={{ padding: '0px 6px' }} title="Show details" onClick={() => setModalInfo(rowData.DETAILS)}>
            Show details
          </Button>
        </div>
      ),
    },
    {
      title: 'Status',
      field: 'STATUS',
      lookup: { OPEN: 'OPEN', CLOSED: 'CLOSED', IGNORE: 'IGNORE', ACKNOWLEDGE: 'ACKNOWLEDGE', FALSE: 'FALSE' },
      render: (rowData: any) => (
        <FormControl fullWidth>
          <Select
            disabled={statusSelect}
            labelId="demo-simple-select-label"
            id={'status' + rowData.id}
            value={rowData.STATUS}
            label="Status"
          >
            <MenuItem value={'OPEN'} onClick={() => handleChange(rowData.ALERTID, rowData.id, rowData.STATUS, 'OPEN')}>
              OPEN
            </MenuItem>
            <MenuItem value={'CLOSED'} onClick={() => handleChange(rowData.ALERTID, rowData.id, rowData.STATUS, 'CLOSED')}>
              CLOSED
            </MenuItem>
            <MenuItem value={'IGNORE'} onClick={() => handleChange(rowData.ALERTID, rowData.id, rowData.STATUS, 'IGNORE')}>
              IGNORE
            </MenuItem>
            <MenuItem value={'ACKNOWLEDGE'} onClick={() => handleChange(rowData.ALERTID, rowData.id, rowData.STATUS, 'ACKNOWLEDGE')}>
              ACKNOWLEDGE
            </MenuItem>
            <MenuItem value={'FALSE'} onClick={() => handleChange(rowData.ALERTID, rowData.id, rowData.STATUS, 'FALSE')}>
              FALSE ALERT
            </MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      title: 'Alert identifier',
      field: 'ALERTID',
      hidden: true,
      export: true,
    },
  ]);

  function handleChange(ALERTID: string, ID: string, lastValue: string, newValue: string) {
    if (lastValue !== newValue) {
      if (confirm('Do you confirm the new status of the alert?')) {
        var selectID = 'status' + ID;
        var select = document.getElementById(selectID) as HTMLSelectElement;
        select.innerText = newValue;
        updateAlert(ALERTID, ID, newValue, lastValue);
      }
    }
  }

  const onModalClose = () => {
    setModalIsOpen(false);
  };

  function refreshPage() {
    let element: HTMLElement = document.getElementsByClassName(
      'btn btn--radius-right-0 navbar-button navbar-button--border-right-0'
    )[0] as HTMLElement;
    element.click();
  }

  // check if user is an Admin
  function checkAdmin() {
    fetch(grafanaBackendURL + '/api/user')
      .then(response => response.json())
      .then(result => {
        if (result.isGrafanaAdmin === true) {
          statusSelect = false;
        }
        isAdmin = result.isGrafanaAdmin;
        userEmail = result.email;
      });
  }

  // retrieve the suggestions already applied
  function getAppliedSuggestions() {
    appliedSuggestionsList = [];
    for (let index = 0; index < data.series[0].length; index++) {
      var tempSuggestion: Suggestion = new Suggestion();
      tempSuggestion.id = data.series[0].fields[2].values.get(index).toString();
      tempSuggestion.alertSource = data.series[0].fields[1].values.get(index).toString();
      tempSuggestion.suggestion = data.series[0].fields[3].values.get(index).toString();
      appliedSuggestionsList.push(tempSuggestion);
    }
  }

  // retrieve alerts
  function getAlerts() {
    alerts = [];
    for (let index = 0; index < data.series[1].length; index++) {
      var jsonData = JSON.parse(data.series[1].fields[0].values.get(index));
      var tempAlert: Alert = new Alert();
      tempAlert.id = jsonData.id;
      tempAlert.TOOL = jsonData.TOOL;
      tempAlert.TIMESTAMP = jsonData.TIMESTAMP;
      tempAlert.STATUS = jsonData.STATUS;
      tempAlert.LOCATION = jsonData.LOCATION;
      tempAlert.INDICATION = jsonData.INDICATION;
      tempAlert.DETAILS = jsonData.DETAILS;
      tempAlert.DESCRIPTION = jsonData.DESCRIPTION;
      tempAlert.CLASSIFICATION = jsonData.CLASSIFICATION;
      tempAlert.ALERTID = jsonData.ALERTID;
      tempAlert.ACTION = jsonData.ACTION;
      var suggestions;
      if (IsJsonString(jsonData.ACTION)) {
        suggestions = jsonData.ACTION;
        if (suggestions != null) {
          for (let i = 0; i < suggestions.length; i++) {
            var suggestion: Suggestion = new Suggestion();
            suggestion.id = suggestions[i].id;
            suggestion.suggestion = suggestions[i].suggestion;
            suggestion.alertSource = jsonData.ACTION;
            SUGGESTIONSLIST.push(suggestion);
          }
        }
      }
      alerts.push(tempAlert);
    }
  }

  // Display/close modals for details
  function setModalInfo(info: string) {
    modalInfo = info;
    setModalIsOpen(true);
  }

  // Display/close modals for details
  function setDisplayState(state: string) {
    checkboxesDisplayState = state;
  }

  // Display checkboxes (list of suggestions applied or not) on click
  function showCheckboxes(id: string) {
    var checkboxes = document.getElementById('checkboxes' + id);
    if (checkboxes.style.display == 'block') {
      checkboxes.style.display = 'none';
    } else {
      checkboxes.style.display = 'block';
    }
  }

  // Apply custom suggestion
  function applyCustomSuggestion(AlertSrc: string, id: number) {
    if (confirm('Do you confirm the applying of the custom suggestion?')) {
      var theURL = idURL + '/suggestion/create';

      var textFieldSuggestion = 'customAction' + id;
      var element = document.getElementById(textFieldSuggestion) as HTMLInputElement;
      var suggestionText = element.value;

      let time = new Date();
      let formattedTime = time.toISOString();

      var createSuggestionHeaders = new Headers();
      createSuggestionHeaders.append('Content-Type', 'application/json;charset=UTF-8');

      var rawSuggestionBody: JSON[] = [];
      const obj = JSON.parse(
        '{ "origin": "Grafana", "alertSrc": "' +
          AlertSrc +
          '", "dssAlert": "' +
          'custom' +
          '", "suggestion": "' +
          suggestionText +
          '", "timestamp": "' +
          formattedTime +
          '" }'
      );
      rawSuggestionBody.push(obj);

      var createSuggestionOptions = {
        method: 'POST',
        headers: createSuggestionHeaders,
        body: JSON.stringify(rawSuggestionBody),
      };

      fetch(theURL, createSuggestionOptions)
        .then(response => response.json())
        .then(result => {
          if (result.message === 'All suggestions were saved') {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-success', ['Custom suggestion added']);
              element.value = '';
            });
          } else {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-error', ['Suggestion could not be added']);
            });
          }
        });
    }
  }

  function declareFalseAlert(ALERTID: string){
    var theURL = idURL + '/suggestion/create';

    let time = new Date();
    let formattedTime = time.toISOString();

    var createSuggestionHeaders = new Headers();
    createSuggestionHeaders.append('Content-Type', 'application/json;charset=UTF-8');

    var rawSuggestionBody: JSON[] = [];
    const obj = JSON.parse(
      '{ "origin": "Grafana", "alertSrc": "' +
        ALERTID +
        '", "dssAlert": "' +
        'custom' +
        '", "suggestion": "' +
        'False alert' +
        '", "timestamp": "' +
        formattedTime +
        '" }'
    );
    rawSuggestionBody.push(obj);

    var createSuggestionOptions = {
      method: 'POST',
      headers: createSuggestionHeaders,
      body: JSON.stringify(rawSuggestionBody),
    };

    fetch(theURL, createSuggestionOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message === 'All suggestions were saved') {
          SystemJS.load('app/core/app_events').then((appEvents: any) => {
            appEvents.emit('alert-success', [' alert sent to DSS']);
          });
        } else {
          SystemJS.load('app/core/app_events').then((appEvents: any) => {
            appEvents.emit('alert-error', ['False alert could not be sent to DSS']);
          });
        }
      });
  }

  // Apply multiple suggestions at once
  function applySuggestions(AlertSrc: string, id: number, Action: string) {
    let suggestions: Suggestion[] = [];
    for (let index = 0; index < JSON.parse(Action).length; index++) {
      const actionProposed = JSON.parse(Action);
      let suggestion: Suggestion = new Suggestion();
      var checkboxTempId = 'alert' + id + 'suggestion' + actionProposed[index].id;
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
        var theURL = idURL + '/suggestion/create';

        var createSuggestionHeaders = new Headers();
        createSuggestionHeaders.append('Content-Type', 'application/json;charset=UTF-8');

        var rawSuggestionBody: JSON[] = [];
        for (let index = 0; index < suggestions.length; index++) {
          const element = suggestions[index];
          const obj = JSON.parse(
            '{ "origin": "Grafana", "alertSrc": "' +
              element.alertSource +
              '", "dssAlert": "' +
              element.id +
              '", "suggestion": "' +
              element.suggestion +
              '", "timestamp": "' +
              element.timestamp +
              '" }'
          );
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
            if (result.message === 'All suggestions were saved') {
              SystemJS.load('app/core/app_events').then((appEvents: any) => {
                appEvents.emit('alert-success', ['All suggestions were saved']);
              });
              for (let index = 0; index < suggestions.length; index++) {
                if (isAdmin) {
                  var hrefId = 'hrefalert' + id + 'suggestion' + suggestions[index].id;
                  var hrefElement = document.getElementById(hrefId) as HTMLInputElement;
                  hrefElement.style.display = 'block';
                }
                var checkboxId = 'alert' + id + 'suggestion' + suggestions[index].id;
                (document.getElementById(checkboxId) as HTMLInputElement).disabled = true;
              }
              updateData();
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
      var theURL = idURL + '/suggestion/delete';

      var createSuggestionHeaders = new Headers();
      createSuggestionHeaders.append('Content-Type', 'application/json;charset=UTF-8');

      var rawSuggestionBody = JSON.stringify({ origin: 'Grafana', alertSrc: alertSrc, dssAlert: id });

      var createSuggestionOptions = {
        method: 'POST',
        headers: createSuggestionHeaders,
        body: rawSuggestionBody,
      };

      fetch(theURL, createSuggestionOptions)
        .then(response => response.json())
        .then(result => {
          if (result.message === 'Suggestion deleted') {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-success', ['Suggestion deleted']);
            });
            if (isAdmin) {
              var hrefId = 'hrefalert' + rowid + 'suggestion' + id;
              var hrefElement = document.getElementById(hrefId) as HTMLInputElement;
              hrefElement.style.display = 'none';
            }
            var checkboxId = 'alert' + rowid + 'suggestion' + id;
            (document.getElementById(checkboxId) as HTMLInputElement).checked = false;
            (document.getElementById(checkboxId) as HTMLInputElement).disabled = false;
            updateData();
          } else {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-error', [result.message]);
            });
          }
          // window.location.reload();
          // ascundere buton stergere si enablare checkbox
          // filtrare
        });
    }
  }

  function updateData() {
    checkAdmin();
    getAppliedSuggestions();
    getAlerts();
    if(refreshPageCounter < 1){
      refreshPageCounter++;
      refreshPage();
    }
  }

  // Saves history status in PSQL
  function saveHistoryStatus(ALERTID: string, id: string, lastOption: string, newOption: string) {
    var theURL = idURL + '/status/create';

    var saveStatusHeaders = new Headers();
    saveStatusHeaders.append('Content-Type', 'application/json;charset=UTF-8');
    let time = new Date();
    let formattedTime = time.toISOString();

    var rawStatusBody = JSON.stringify({
      alertid: id,
      email: userEmail,
      lastValue: lastOption,
      updatedValue: newOption,
      timestamp: formattedTime,
    });

    var createStatusOptions = {
      method: 'POST',
      headers: saveStatusHeaders,
      body: rawStatusBody,
    };

    fetch(theURL, createStatusOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Status saved') {
          SystemJS.load('app/core/app_events').then((appEvents: any) => {
            appEvents.emit('alert-success', ['Status saved']);
            if (newOption === 'FALSE'){
              declareFalseAlert(ALERTID);
            }
            refreshPage();
          });
        } else {
          SystemJS.load('app/core/app_events').then((appEvents: any) => {
            appEvents.emit('alert-error', ['Status could not be saved']);
          });
        }
      });
  }

  // Sets the new Status in PSQL from OPEN to CLOSED, for example
  function updateAlert(ALERTID: string, rowID: string, status: string, lastOption: string) {
    var theURL = idURL + '/alert/update';

    var createSuggestionHeaders = new Headers();
    createSuggestionHeaders.append('Content-Type', 'application/json;charset=UTF-8');

    var rawSuggestionBody = JSON.stringify({ origin: 'Grafana', status: status, id: rowID });

    var createSuggestionOptions = {
      method: 'POST',
      headers: createSuggestionHeaders,
      body: rawSuggestionBody,
    };

    fetch(theURL, createSuggestionOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Alert updated!') {
          SystemJS.load('app/core/app_events').then((appEvents: any) => {
            appEvents.emit('alert-success', ['Alert status updated']);
            saveHistoryStatus(ALERTID, rowID, lastOption, status);
          });
        } else {
          SystemJS.load('app/core/app_events').then((appEvents: any) => {
            appEvents.emit('alert-error', ['Alert status could not be updated']);
          });
        }
      });
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
      <Modal title="Alert details" isOpen={modalIsOpen} onDismiss={onModalClose}>
        <pre style={{ whiteSpace: 'pre' }}>{IsJsonString(modalInfo)? JSON.stringify(JSON.parse(modalInfo), null, "\t"):modalInfo}</pre>
      </Modal>
      <ThemeProvider theme={theme}>
      <MaterialTable
        data={alerts}
        title="ALERTS"
        icons={tableIcons}
        columns={columnsObject}
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
          },
          body: {
            emptyDataSourceMessage: <p>No records to display. Refresh the dashboard.</p>,
          },
        }}
        actions={[
          {
            icon: LinkIcon,
            tooltip: 'Go to component\'s GUI',
            onClick: (event, rowData) => {
              let sphinxSmTicket = sessionStorage.getItem('sphinx_sm_ticket');
              if (sphinxSmTicket == null) {
                sphinxSmTicket = '';
              } else {
                switch (rowData["TOOL"]) {
                  case 'AE':
                    location.href=options.sphinxToolsUrls[0].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'AD':
                    location.href=options.sphinxToolsUrls[1].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'HP':
                    location.href=options.sphinxToolsUrls[2].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'BBTR':
                    location.href=options.sphinxToolsUrls[3].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'DTM':
                    location.href=options.sphinxToolsUrls[4].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'DSS':
                    location.href=options.sphinxToolsUrls[5].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'KB':
                    location.href=options.sphinxToolsUrls[6].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'RCRA':
                    location.href=options.sphinxToolsUrls[7].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'SIEM':
                    location.href=options.sphinxToolsUrls[8].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'VAAAS':
                    location.href=options.sphinxToolsUrls[9].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'ABS':
                    location.href=options.sphinxToolsUrls[10].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'MLID':
                    location.href=options.sphinxToolsUrls[11].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'HE':
                    location.href=options.sphinxToolsUrls[12].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'AP':
                    location.href=options.sphinxToolsUrls[13].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'FDCE':
                    location.href=options.sphinxToolsUrls[14].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'CST':
                    location.href=options.sphinxToolsUrls[15].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'S-API':
                    location.href=options.sphinxToolsUrls[16].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'SB':
                    location.href=options.sphinxToolsUrls[17].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'SM':
                    location.href=options.sphinxToolsUrls[18].replace('{ticket}', sphinxSmTicket);
                    break;
                  case 'CIP':
                    location.href=options.sphinxToolsUrls[19].replace('{ticket}', sphinxSmTicket);
                    break;
                }
              }
            },
          },
        ]}
      />
      </ThemeProvider>
    </div>
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

// Checks the new value selected
// function checkSelectedOption(rowID: number, lastOption: string, data: any) {
//   if (confirm('Do you confirm the new status of the alert?')) {
//     var selectID = 'status' + rowID;
//     var select = document.getElementById(selectID) as HTMLSelectElement;
//     var currentOption = select.options[select.selectedIndex].innerHTML.toString();
//     var ID = rowID.toString();
//     updateAlert(ID, currentOption, lastOption);
//   }
// }

function IsJsonString(str: string) {
  if (str === null) {
    return false;
  } else {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
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
  });
  return result;
}

// function differentAlerts(tempAlerts: any, alerts: any) {
//   if (tempAlerts.length != alerts.length) return true;
//   else {
//     for (let index = 0; index < alerts.length; index++) {
//       const alert = alerts[index];
//       const tempAlert = alerts[index];
//       if (
//         alert.id != tempAlert.id ||
//         alert.DESCRIPTION != tempAlert.DESCRIPTION ||
//         alert.TIMESTAMP != tempAlert.TIMESTAMP ||
//         alert.LOCATION != tempAlert.LOCATION ||
//         alert.INDICATION != tempAlert.INDICATION ||
//         alert.TOOL != tempAlert.TOOL ||
//         alert.STATUS != tempAlert.STATUS ||
//         alert.ACTION != tempAlert.ACTION ||
//         alert.DETAILS != tempAlert.DETAILS ||
//         alert.ALERTID != tempAlert.ALERTID
//       ) {
//         return true;
//       }
//     }
//     return false;
//   }
// }
