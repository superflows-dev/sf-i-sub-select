/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query, property, queryAssignedElements } from 'lit/decorators.js';
import Util from './util';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
/**
 * SfISubSelect element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - select input label
 * @property name - name of the input
 * @property selectedId - id (primary key) to be preselected
 * @property selectedId - filter by the foreign key id
 * @property selectedValue - value of the selected item
 */
let SfISubSelect = class SfISubSelect extends LitElement {
    constructor() {
        super();
        this.selectedValue = () => {
            return this._SfInputSelect.value;
        };
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfRowError.style.display = 'flex';
            this._SfRowErrorMessage.innerHTML = msg;
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'flex';
            this._SfRowSuccessMessage.innerHTML = msg;
        };
        this.prepareXhr = async (data, url, loaderElement, authorization) => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
            }
            return await Util.callApi(url, data, authorization);
        };
        this.submitNew = () => {
        };
        this.renderList = (values) => {
            if (this.mode == "admin") {
                var innerHTML = '';
                innerHTML = '<table><tr><th>Id</th><th>Name</th><th>Action</th></tr>';
                for (var i = 0; i < values.length; i++) {
                    innerHTML += '<tr>';
                    innerHTML += '<td class="tcId">';
                    innerHTML += values[i].id;
                    innerHTML += '</td>';
                    innerHTML += '<td class="tcName">';
                    innerHTML += '<span id="text-' + values[i].id + '">' + values[i].name + '</span>';
                    innerHTML += '<input class="hide" id="input-' + values[i].id + '" type="text" value="' + values[i].name + '" />';
                    innerHTML += '</td>';
                    innerHTML += '<td class="tcActions">';
                    innerHTML += '<button id="edit-' + values[i].id + '">Edit</button>';
                    innerHTML += '<button id="cancel-' + values[i].id + '" class="hide">Cancel</button>';
                    innerHTML += '<button id="submit-' + values[i].id + '" class="hide">Submit</button>';
                    innerHTML += '<button id="delete-' + values[i].id + '">Delete</button>';
                    innerHTML += '<button id="canceld-' + values[i].id + '" class="hide">Cancel</button>';
                    innerHTML += '<button id="confirm-' + values[i].id + '" class="hide">Confirm Delete</button>';
                    innerHTML += '</td>';
                    innerHTML += '</tr>';
                }
                this._SfTableC.innerHTML = innerHTML;
                for (var i = 0; i < values.length; i++) {
                    this._SfTableC.querySelector('#edit-' + values[i].id + '').addEventListener('click', (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('edit-', '');
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#delete-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#text-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#cancel-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#submit-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#input-' + id + '').style.display = 'inline';
                    });
                    this._SfTableC.querySelector('#cancel-' + values[i].id + '').addEventListener('click', (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('cancel-', '');
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#delete-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#text-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#cancel-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#submit-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#input-' + id + '').style.display = 'none';
                    });
                    this._SfTableC.querySelector('#input-' + values[i].id + '').addEventListener('keyup', (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('input-', '');
                        const name = event.target.value;
                        if (Util.validateName(name)) {
                            this._SfTableC.querySelector('#submit-' + id + '').removeAttribute('disabled');
                        }
                        else {
                            this._SfTableC.querySelector('#submit-' + id + '').setAttribute('disabled', true);
                        }
                    });
                    this._SfTableC.querySelector('#confirm-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        this.clearMessages();
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('confirm-', '');
                        const selectedValue = document.querySelector('.input-parent-select').selectedValue();
                        const body = { "fk": selectedValue, "id": id };
                        const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                        const xhr = (await this.prepareXhr(body, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/delete", this._SfLoader, authorization));
                        this._SfLoader.innerHTML = '';
                        if (xhr.status == 200) {
                            this.setSuccess('Operation Successful!');
                            setTimeout(() => {
                                this.clearMessages();
                                this._SfNewC.querySelector('.input-new').value = "";
                                this.populateList();
                            }, 1000);
                        }
                        else {
                            const jsonRespose = JSON.parse(xhr.responseText);
                            this.setError(jsonRespose.error);
                        }
                    });
                    this._SfTableC.querySelector('#delete-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('delete-', '');
                        event.target.style.display = 'none';
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#confirm-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#canceld-' + id + '').style.display = 'inline';
                    });
                    this._SfTableC.querySelector('#canceld-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('canceld-', '');
                        event.target.style.display = 'none';
                        this._SfTableC.querySelector('#edit-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#delete-' + id + '').style.display = 'inline';
                        this._SfTableC.querySelector('#confirm-' + id + '').style.display = 'none';
                        this._SfTableC.querySelector('#canceld-' + id + '').style.display = 'none';
                    });
                    this._SfTableC.querySelector('#submit-' + values[i].id + '').addEventListener('click', async (event) => {
                        var _a;
                        this.clearMessages();
                        const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id.replace('submit-', '');
                        const selectedValue = document.querySelector('.input-parent-select').selectedValue();
                        const name = this._SfTableC.querySelector('#input-' + id + '').value;
                        const body = { "name": name, "fk": selectedValue, "id": id };
                        const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                        const xhr = (await this.prepareXhr(body, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/update", this._SfLoader, authorization));
                        this._SfLoader.innerHTML = '';
                        if (xhr.status == 200) {
                            this.setSuccess('Operation Successful!');
                            setTimeout(() => {
                                this.clearMessages();
                                this._SfNewC.querySelector('.input-new').value = "";
                                this.populateList();
                            }, 1000);
                        }
                        else {
                            const jsonRespose = JSON.parse(xhr.responseText);
                            this.setError(jsonRespose.error);
                        }
                    });
                }
            }
            else {
                var innerHTML = '';
                for (var i = 0; i < values.length; i++) {
                    if (this.selectedId != null && this.selectedId.length > 0) {
                        if (values[i].id == this.selectedId) {
                            innerHTML += '<option id="' + values[i].id + '" selected>' + values[i].name + '</option>';
                            continue;
                        }
                    }
                    innerHTML += '<option id="' + values[i].id + '">' + values[i].name + '</option>';
                }
                this._sfSelect.innerHTML = innerHTML;
                console.log('renderlist', innerHTML);
                this.dispatchMyEvent("renderComplete", {});
            }
        };
        this.populateList = async () => {
            console.log('pop list');
            const body = { "fk": this.mode == "admin" ? document.querySelector('.input-parent-select').selectedValue() : this.filterId };
            const xhr = (await this.prepareXhr(body, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, null));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                const values = jsonRespose.data.values;
                this.renderList(values);
            }
        };
        this.showNew = () => {
            this._SfNewC.querySelector('#button-new').setAttribute('disabled', true);
            this._SfNewC.querySelector('#button-view').removeAttribute('disabled');
            this._SfNewC.querySelector('.new-section').style.display = 'flex';
            this._SfNewC.querySelector('.view-section').style.display = 'none';
        };
        this.showView = () => {
            this._SfNewC.querySelector('#button-view').setAttribute('disabled', true);
            this._SfNewC.querySelector('#button-new').removeAttribute('disabled');
            this._SfNewC.querySelector('.view-section').style.display = 'flex';
            this._SfNewC.querySelector('.new-section').style.display = 'none';
        };
        this.dispatchMyEvent = (ev, args) => {
            const event = new CustomEvent(ev, { detail: args, bubbles: true, composed: true });
            this.dispatchEvent(event);
        };
        this.onChangeSelect = (ev) => {
            this.dispatchMyEvent("valueChanged", { newValue: ev.target.value });
        };
        this.initState = async () => {
            console.log('mode', this.mode);
            if (this.mode == "read") {
                this._sfSelect.setAttribute("disabled", true);
            }
        };
        this.initListeners = () => {
            if (this.mode == "admin") {
                this._SfNewC.querySelector('#button-new').addEventListener('click', () => {
                    this.showNew();
                });
                this._SfNewC.querySelector('#button-view').addEventListener('click', () => {
                    this.showView();
                    this.populateList();
                });
                this._SfNewC.querySelector('.input-new').addEventListener('keyup', () => {
                    const name = this._SfNewC.querySelector('.input-new').value;
                    if (Util.validateName(name)) {
                        this._SfNewC.querySelector('#button-submit-new').removeAttribute('disabled');
                    }
                    else {
                        this._SfNewC.querySelector('#button-submit-new').setAttribute('disabled', true);
                    }
                });
                this._SfNewC.querySelector('#button-submit-new').addEventListener('click', async () => {
                    this.clearMessages();
                    const selectedValue = document.querySelector('.input-parent-select').selectedValue();
                    const body = { "name": this._SfNewC.querySelector('.input-new').value, "fk": selectedValue };
                    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                    const xhr = (await this.prepareXhr(body, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/create", this._SfLoader, authorization));
                    this._SfLoader.innerHTML = '';
                    if (xhr.status == 200) {
                        this.setSuccess('Operation Successful!');
                        setTimeout(() => {
                            this.clearMessages();
                            this._SfNewC.querySelector('.input-new').value = "";
                        }, 1000);
                    }
                    else {
                        const jsonRespose = JSON.parse(xhr.responseText);
                        this.setError(jsonRespose.error);
                    }
                });
                this._sfSlottedFk[0].addEventListener('valueChanged', () => {
                    this.populateList();
                });
            }
        };
    }
    firstUpdated(_changedProperties) {
        this.initState();
        this.initListeners();
        if (this.mode != "admin") {
            this.populateList();
        }
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        if (this.mode == "admin") {
            return html `
        <div class="SfISubSelectCAdmin">
          <div class="d-flex justify-center">
            <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Admin</div>
          </div>
          <br />
          <div class="newC">
            <div class="d-flex justify-center">
              <div class="lb"></div>
              <div class="d-flex flex-col">
                
                
                <div class="d-flex justify-center">
                  <button id="button-new" class="button-action">New</button>
                  <button id="button-view" class="button-action">View</button>
                </div>
                <hr>
                <div class="input-select mb5"><slot name="fk"></slot></div>
                <div class="d-flex justify-center">
                  <div class="loader-element"></div>
                </div>
                <div class="d-flex justify-center">
                  <div class="div-row-error div-row-submit">
                      <div part="errormsg" class="div-row-error-message"></div>
                  </div>
                  <div class="div-row-success div-row-submit">
                    <div part="successmsg" class="div-row-success-message"></div>
                  </div>
                </div>
                <div class="d-flex flex-col new-section hide">
                  <input class="input-new mt5" type="text" placeholder="Name ..."/>
                  <button id="button-submit-new" class="mt10" disabled>Submit</button>
                </div>
              </div>
              <div class="rb"></div>
            </div>
            <br /><br />
            <div class="d-flex justify-center view-section hide">
              <div class="lb"></div>
              <div class="d-flex flex-col justify-center align-center">
                <div class="tableC">
                </div>
              </div>
              <div class="rb"></div>
            </div>

          </div>
          <br />
          
        
      `;
        }
        else {
            return html `
        <div class="SfISubSelectC">
          <label>${this.label}</label>
          <div>
            <select id="input-select" @change="${this.onChangeSelect}">
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      `;
        }
    }
};
SfISubSelect.styles = css `
    
    .SfISubSelectC {
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    .SfISubSelectCAdmin {
      padding: 10px 20px;
    }

    .SfISubSelectC label{
      padding-bottom: 5px;
    }

    .SfISubSelectC div{
      display: flex;
      align-items: center;
    }

    .SfISubSelectC > div > select{
      flex-grow: 1;
    }

    .loader-element {
      margin-left: 5px;
    }

    .link {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      font-size: 90%;
    }


    .lds-dual-ring {
      display: inline-block;
      width: 15px;
      height: 15px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 10px;
      height: 10px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .button-action {
      margin: 5px;
    }

    .div-row-error {
      display: none;
      align-items:center;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      border: dashed 1px red;
      width: 100%;
      text-align: center;
    }

    .div-row-success {
      display: none;
      align-items:center;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      border: dashed 1px green;
      width: 100%;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-end {
      justify-content: flex-end;
    }

    .justify-between {
      justify-content: space-between;
    }

    .align-center {
      align-items: center;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-end {
      justify-content: flex-end;
    }

    .mb5 {
      margin-bottom: 5px;
    }

    .mt5 {
      margin-top: 5px;
    }

    .mt10 {
      margin-top: 10px;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .badge {
      border: dashed 1px;
      padding-top: 1px;
      padding-bottom: 1px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 20px;
      margin-top: -20px;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    .tcId {
      min-width: 300px;
    }

    .tcName {
      min-width: 200px;
    }

    .tcActions {
      min-width: 150px;
      text-align: right;
    }

    .SfISubSelectCAdmin th {
      border-bottom: solid 1px black
    }

    .SfISubSelectCAdmin td {
      border-bottom: solid 1px gray
    }

    .tableC {
      overflow-x: auto;
    }

    @media (orientation: landscape) {

      .lb {
        width: 25%
      }
      .rb {
        width: 25%
      }

    }

  `;
__decorate([
    property()
], SfISubSelect.prototype, "apiId", void 0);
__decorate([
    property()
], SfISubSelect.prototype, "label", void 0);
__decorate([
    property()
], SfISubSelect.prototype, "name", void 0);
__decorate([
    property()
], SfISubSelect.prototype, "mode", void 0);
__decorate([
    property()
], SfISubSelect.prototype, "selectedId", void 0);
__decorate([
    property()
], SfISubSelect.prototype, "filterId", void 0);
__decorate([
    property()
], SfISubSelect.prototype, "selectedValue", void 0);
__decorate([
    query('.SfISubSelectC select')
], SfISubSelect.prototype, "_sfSelect", void 0);
__decorate([
    query('.loader-element')
], SfISubSelect.prototype, "_SfLoader", void 0);
__decorate([
    query('.tableC')
], SfISubSelect.prototype, "_SfTableC", void 0);
__decorate([
    query('.newC')
], SfISubSelect.prototype, "_SfNewC", void 0);
__decorate([
    query('.input-new')
], SfISubSelect.prototype, "_SfInputNew", void 0);
__decorate([
    query('.input-select')
], SfISubSelect.prototype, "_SfInputSelect", void 0);
__decorate([
    query('.div-row-error')
], SfISubSelect.prototype, "_SfRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfISubSelect.prototype, "_SfRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfISubSelect.prototype, "_SfRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfISubSelect.prototype, "_SfRowSuccessMessage", void 0);
__decorate([
    queryAssignedElements({ slot: 'fk' })
], SfISubSelect.prototype, "_sfSlottedFk", void 0);
SfISubSelect = __decorate([
    customElement('sf-i-sub-select')
], SfISubSelect);
export { SfISubSelect };
//# sourceMappingURL=sf-i-sub-select.js.map