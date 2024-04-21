import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { Button, Label, Modal, stylesFactory } from '@grafana/ui';
import { AppEvents } from '@grafana/data';
import { SystemJS } from '@grafana/runtime';
import './Navbar.css';
import './../node_modules/bootstrap/dist/js/bootstrap.js';
import 'jquery';

interface Props extends PanelProps<SimpleOptions> {}

class Contact {
  name: any;
  email: any;
  phone: any;
}

export var contactList: Contact[] = [];
export var isAdmin: Boolean = false;
export var idURL: string = '';
export var grafanaBackendURL: string = '';
export var userManual: string = '';
export var userManualIcon: string = '';
export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  idURL = options.urlList[0];
  grafanaBackendURL = options.urlList[1];
  userManual = options.urlList[2];
  userManualIcon = options.urlList[3];
  
  // check if user is an Admin
  fetch(grafanaBackendURL + '/api/user')
    .then(response => response.json())
    .then(result => {
      isAdmin = result.isGrafanaAdmin;
    });

  const onModalClose = () => {
    setModalIsOpen(false);
  };

  const onSecondModalClose = () => {
    setSecondModalIsOpen(false);
  };

  var totalNumberOfAlerts = data.series[0].fields[0].values.get(0);
  var numberOfUnresolvedAlerts = data.series[1].fields[0].values.get(0);

  // Gets contacts from database
  function getList() {
    contactList = [];

    fetch(idURL + '/email/show-contacts')
      .then(response => response.json())
      .then(result => {
        for (let index = 0; index < result.length; index++) {
          var contact: Contact = new Contact();
          contact.name = result[index].name;
          contact.email = result[index].email;
          contact.phone = result[index].phone;
          contactList.push(contact);
        }
        setSecondModalIsOpen(true);
      });
  }

  function deleteContact(email: string) {
    if (confirm('Do you confirm the deletion of the contact?')) {
      var deleteContactHeaders = new Headers();
      deleteContactHeaders.append('Content-Type', 'application/json;charset=UTF-8');

      var contactBody = JSON.stringify({ email: email });

      var deleteContactOptions = {
        method: 'POST',
        headers: deleteContactHeaders,
        body: contactBody,
      };

      fetch(idURL + '/email/delete', deleteContactOptions)
        .then(response => response.json())
        .then(result => {
          if (result.message === 'E-mail succesfully deleted.') {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-success', ['Contact succesfully deleted']);
              getList();
            });
          } else {
            SystemJS.load('app/core/app_events').then((appEvents: any) => {
              appEvents.emit('alert-error', ['Contact could not be deleted']);
            });
          }
        });
    }
  }

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
      <div>
        <Modal title="Add new contact" isOpen={modalIsOpen} onDismiss={onModalClose}>
          <div>
            <table style={{ width: '100%' }}>
              <tr style={{ paddingBottom: '14px' }}>
                <td style={{ width: '30%' }}>First and last name</td>
                <td>
                  <input
                    id="modalNameInput"
                    style={{ backgroundColor: '#141619', width: '100%', borderBottom: '1px solid white' }}
                  />
                </td>
              </tr>
              <tr style={{ paddingBottom: '14px' }}>
                <td style={{ width: '30%' }}>E-mail address</td>
                <td>
                  <input
                    id="modalEmailInput"
                    style={{ backgroundColor: '#141619', width: '100%', borderBottom: '1px solid white' }}
                  />
                </td>
              </tr>
              <tr style={{ paddingBottom: '14px' }}>
                <td style={{ width: '30%' }}>Phone number</td>
                <td>
                  <input
                    id="modalNumberInput"
                    style={{ backgroundColor: '#141619', width: '100%', borderBottom: '1px solid white' }}
                  />
                </td>
              </tr>
            </table>
            <br />
            <button className="block" onClick={() => addContact()}>
              Add contact
            </button>
          </div>
        </Modal>
      </div>

      <div>
        <Modal title="Contact list" isOpen={secondModalIsOpen} onDismiss={onSecondModalClose}>
          <div>
            <div>
              {contactList.map(el => (
                <p>
                  <b>Name:</b> {el.name} <br /> <b>E-mail:</b> {el.email} <br /> <b>Phone:</b> {el.phone}
                  <br/>
                  {isAdmin ? (
                    <a
                      id={'contact' + el.email}
                      style={{ color: 'red', padding: '1px' }}
                      onClick={() => deleteContact(el.email)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  ) : (
                    <p></p>
                  )}
                  <hr />
                </p>
              ))}
            </div>
          </div>
        </Modal>
      </div>

      <div style={{ padding: '20px' }}>
        <div id="menuElementidtotal" style={{ cursor: 'pointer', width: '20%', float: 'left', padding: '20px' }}>
          <div style={{ color: 'white', textAlign: 'center' }}>
            Total alerts{' '}
            <span style={{ borderRadius: '20px', backgroundColor: 'red', minWidth: '10px', color: 'white' }}>
              {totalNumberOfAlerts}
            </span>
          </div>
        </div>

        <div
          id="menuElementidalerts"
          style={{
            borderLeft: '1px solid black',
            cursor: 'pointer',
            width: '20%',
            float: 'left',
            padding: '20px',
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>
            Unsolved alerts{' '}
            <span style={{ borderRadius: '20px', backgroundColor: 'red', minWidth: '10px', color: 'white' }}>
              {numberOfUnresolvedAlerts}
            </span>
          </div>
        </div>

        <div
          id="menuElementidbutton"
          onClick={() => setModalIsOpen(true)}
          style={{
            cursor: 'pointer',
            borderLeft: '1px solid black',
            width: '20%',
            float: 'left',
            padding: '20px',
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>Add contact</div>
        </div>
        <div
          id="menuElementidbutton"
          onClick={() => getList()}
          style={{
            cursor: 'pointer',
            borderLeft: '1px solid black',
            width: '20%',
            float: 'left',
            padding: '20px',
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>Contact list</div>
        </div>
        <div
          id="menuElementidbutton"
          style={{
            cursor: 'pointer',
            borderLeft: '1px solid black',
            width: '20%',
            float: 'left',
            padding: '20px',
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>
            <a href={userManual} target="_blank">
            <img className="valign" src={userManualIcon} width="24px" height="19px" /> User manual</a>
          </div>
        </div>
      </div>
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
      padding: 10px;R
    `,
  };
});

// Sets the new Status in PSQL from OPEN to CLOSED, for example
function addContact() {
  var modalNameInput = document.getElementById('modalNameInput') as HTMLInputElement;
  var fullName = modalNameInput.value;

  var modalEmailInput = document.getElementById('modalEmailInput') as HTMLInputElement;
  var email = modalEmailInput.value;

  var modalNumberInput = document.getElementById('modalNumberInput') as HTMLInputElement;
  var phone = modalNumberInput.value;

  if (email === undefined || fullName === undefined) {
    SystemJS.load('app/core/app_events').then((appEvents: any) => {
      appEvents.emit('alert-error', ['Name and email must be provided']);
    });
    return;
  }
  if (/^[a-zA-Z]+ $/.test(fullName)) {
    SystemJS.load('app/core/app_events').then((appEvents: any) => {
      appEvents.emit('alert-error', ['Names must contain letters and a space between them']);
    });
    return;
  }
  if (fullName.indexOf(' ') === -1) {
    SystemJS.load('app/core/app_events').then((appEvents: any) => {
      appEvents.emit('alert-error', ['Names must contain spaces between them']);
    });
    return;
  }
  if (!/^\d+$/.test(phone)) {
    SystemJS.load('app/core/app_events').then((appEvents: any) => {
      appEvents.emit('alert-error', ['Phone number must contain digits only']);
    });
    return;
  }

  var createContactHeaders = new Headers();
  createContactHeaders.append('Content-Type', 'application/json;charset=UTF-8');

  var contactBody = JSON.stringify({ origin: 'Grafana', name: fullName, email: email, phone: phone });

  var createContactOptions = {
    method: 'POST',
    headers: createContactHeaders,
    body: contactBody,
  };

  fetch(idURL + '/email/create', createContactOptions)
    .then(response => response.json())
    .then(result => {
      if (result.message === 'E-mail succesfully added.') {
        SystemJS.load('app/core/app_events').then((appEvents: any) => {
          appEvents.emit('alert-success', ['Contact succesfully added.']);
          modalNameInput.value = '';
          modalEmailInput.value = '';
          modalNumberInput.value = '';
        });
      } else {
        SystemJS.load('app/core/app_events').then((appEvents: any) => {
          appEvents.emit('alert-error', ['Contact could not be added']);
        });
      }
    });
}
