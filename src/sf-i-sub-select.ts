/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, query, property, queryAssignedElements} from 'lit/decorators.js';
import Util from './util';
import {SfISelect} from 'sf-i-select';
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
 * @property filterId - filter by the foreign key id
 * @property selectedValue - value of the selected item
 * @property repopulate - repopulate the list
 */
@customElement('sf-i-sub-select')
export class SfISubSelect extends LitElement {

  @property()
  apiId!: string;

  @property()
  label!: string;

  @property()
  name!: string;

  @property()
  mode!: string;

  @property()
  flow!: string;

  @property()
  selectedId: string[] = [];

  @property()
  filterId!: string;

  @property()
  removedValues: string[] = [];

  @property()
  selectedTextPhrase: string = "";

  selectedIndex = () => {

    let index = 0;

    const len = this._SfInputSelect.options.length;
    for (var i = 0; i < len; i++) {
      const opt = this._SfInputSelect.options[i];
      if (opt.selected && opt.value != "noselect") {
        index = i;
      }
    }

    return index;

  }

  selectedValues = () => {

    const values = [];

    const len = this._SfInputSelect.options.length;
    for (var i = 0; i < len; i++) {
      const opt = this._SfInputSelect.options[i];
      if (opt.selected && opt.value != "noselect") {
        values.push(opt.value);
      }
    }

    return values;
  }

  selectedTexts = () => {

    const values = [];

    const len = this._SfInputSelect.options.length;
    for (var i = 0; i < len; i++) {
      const opt = this._SfInputSelect.options[i];
      if (opt.selected && opt.value != "noselect") {
        values.push(this._SfInputSelect.options[i].text)
      }
    }

    return values;

  }

  static override styles = css`
    
    .SfISubSelectC {
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

    .table-action-button {
      margin-left: 15px;
    }

    .link {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      font-size: 90%;
    }


    .loader-element {
    }

    .lds-dual-ring {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 15px;
      height: 15px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 15px;
      height: 15px;
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
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
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
      border-bottom: solid 1px #aaa
    }

    .SfISubSelectCAdmin td {
      border-bottom: solid 1px #aaa
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

  @query('.SfISubSelectC select')
  _sfSelect: any;

  @query('.loader-element')
  _SfLoader: any;

  @query('.tableC')
  _SfTableC: any;

  @query('.newC')
  _SfNewC: any;

  @query('.input-new')
  _SfInputNew: any;

  @query('.input-select')
  _SfInputSelect: any;

  @query('.div-row-error')
  _SfRowError: any;

  @query('.div-row-error-message')
  _SfRowErrorMessage: any;

  @query('.div-row-success')
  _SfRowSuccess: any;

  @query('.div-row-success-message')
  _SfRowSuccessMessage: any;

  @queryAssignedElements({slot: 'fk'})
  _sfSlottedFk: any;

  clearMessages = () => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setError = (msg: string) => {
    this._SfRowError.style.display = 'flex';
    this._SfRowErrorMessage.innerHTML = msg;
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'flex';
    this._SfRowSuccessMessage.innerHTML = msg;
  }

  clearSelection = () => {
    this._SfInputSelect.value = 'noselect';
  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  
  submitNew = () => {

  }

  fetchList = async () => {

    const retVals = [];
    var retString = "";

    console.log('pop list');
    const body = {"fk": this.filterId};
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      const values = jsonRespose.data.values;
      console.log('values', values);
      for(var i = 0; i < values.length; i++) {

        if(this.selectedId != null && this.selectedId.length > 0) {
          if(this.selectedId.includes(values[i].id)) {
            retVals.push(values[i].name)
            continue;
          } 
        }
      }
    }

    for(var i = 0; i < retVals.length; i++) {
      retString += retVals[i];
      if(i < retVals.length - 1) {
        retString += '; ';
      }
    }

    return retString;

  }

  renderList = (values: Array<any>) => {

    if(this.mode == "admin") {

      var innerHTML = '';

      innerHTML = '<table><tr><th part="td-head">Id</th><th part="td-head">Name</th><th part="td-head">Action</th></tr>'

      for(var i = 0; i < values.length; i++) {

        innerHTML += '<tr>';
        innerHTML += '<td part="td-body" class="tcId">';
        innerHTML += values[i].id;
        innerHTML += '</td>';
        innerHTML += '<td part="td-body" class="tcName">';
        innerHTML += '<span id="text-'+values[i].id+'">' + values[i].name + '</span>';
        innerHTML += '<input part="input" class="hide" id="input-'+values[i].id+'" type="text" value="'+values[i].name+'" />';
        innerHTML += '</td>';
        innerHTML += '<td part="td-action" class="tcActions">';
        innerHTML += '<button part="button" class="table-action-button" id="edit-'+values[i].id+'">Edit</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="cancel-'+values[i].id+'" >Cancel</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="submit-'+values[i].id+'" >Submit</button>';
        innerHTML += '<button part="button" class="table-action-button" id="delete-'+values[i].id+'">Delete</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="canceld-'+values[i].id+'" >Cancel</button>';
        innerHTML += '<button part="button" class="table-action-button hide" id="confirm-'+values[i].id+'" >Confirm Delete</button>';
        innerHTML += '</td>';
        innerHTML += '</tr>';

      }

      this._SfTableC.innerHTML = innerHTML;

      for(var i = 0; i < values.length; i++) {
        this._SfTableC.querySelector('#edit-'+values[i].id+'').addEventListener('click', (event: any)=> {
          const id = event.target?.id.replace('edit-', '');
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#delete-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#text-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#cancel-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#submit-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#input-'+id+'').style.display = 'inline';
        })
        this._SfTableC.querySelector('#cancel-'+values[i].id+'').addEventListener('click', (event: any)=> {
          const id = event.target?.id.replace('cancel-', '');
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#delete-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#text-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#cancel-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#submit-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#input-'+id+'').style.display = 'none';
        })
        this._SfTableC.querySelector('#input-'+values[i].id+'').addEventListener('keyup', (event: any)=> {
          const id = event.target?.id.replace('input-', '');
          const name = event.target.value;
          if(Util.validateName(name)) {
            this._SfTableC.querySelector('#submit-'+id+'').removeAttribute('disabled');
          } else {
            this._SfTableC.querySelector('#submit-'+id+'').setAttribute('disabled', true);
          }
        });
        this._SfTableC.querySelector('#confirm-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          this.clearMessages();
          const id = event.target?.id.replace('confirm-', '');
          const selectedValue = (document.querySelector('.input-parent-select') as SfISelect).selectedValues()[0];
          const body = {"fk": selectedValue, "id": id};
          const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
          const xhr : any = (await this.prepareXhr(body, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/delete", this._SfLoader, authorization)) as any;
          this._SfLoader.innerHTML = '';
          if(xhr.status == 200) {
            this.setSuccess('Operation Successful!');
            setTimeout(() => {
              this.clearMessages();
              this._SfNewC.querySelector('.input-new').value = "";
              this.populateList();
            }, 1000);
            
          } else {
            const jsonRespose = JSON.parse(xhr.responseText);
            this.setError(jsonRespose.error);
            setTimeout(() => {
              this.clearMessages();
            }, 5000);
          }
        });
        this._SfTableC.querySelector('#delete-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          const id = event.target?.id.replace('delete-', '');
          event.target.style.display = 'none';
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#confirm-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#canceld-'+id+'').style.display = 'inline';
          
        });
        this._SfTableC.querySelector('#canceld-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          const id = event.target?.id.replace('canceld-', '');
          event.target.style.display = 'none';
          this._SfTableC.querySelector('#edit-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#delete-'+id+'').style.display = 'inline';
          this._SfTableC.querySelector('#confirm-'+id+'').style.display = 'none';
          this._SfTableC.querySelector('#canceld-'+id+'').style.display = 'none';
          
        });
        this._SfTableC.querySelector('#submit-'+values[i].id+'').addEventListener('click', async (event: any)=> {
          this.clearMessages();

          const id = event.target?.id.replace('submit-', '');
          const selectedValue = (document.querySelector('.input-parent-select') as SfISelect).selectedValues()[0];
          const name = this._SfTableC.querySelector('#input-'+id+'').value;

          const body = {"name": name, "fk": selectedValue, "id": id};
          const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
          const xhr : any = (await this.prepareXhr(body, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/update", this._SfLoader, authorization)) as any;
          this._SfLoader.innerHTML = '';
          if(xhr.status == 200) {
            this.setSuccess('Operation Successful!');
            setTimeout(() => {
              this.clearMessages();
              this._SfNewC.querySelector('.input-new').value = "";
              this.populateList();
            }, 1000);
            
          } else {
            const jsonRespose = JSON.parse(xhr.responseText);
            this.setError(jsonRespose.error);
            setTimeout(() => {
              this.clearMessages();
            }, 5000);
          }
        });
      }

    } else {

      var innerHTML = '';

      innerHTML += '<option value="noselect" '+ ((this.selectedId == null || this.selectedId.length === 0) ? 'selected' : '') +' disabled hidden>Select</option>'

      for(var i = 0; i < values.length; i++) {
        
        if(this.removedValues.includes(values[i].id)) continue;

        if(this.selectedId != null && this.selectedId.length > 0) {
          if(this.selectedId.includes(values[i].id)) {
            innerHTML += '<option value="'+values[i].id+'" selected>'+values[i].name+'</option>'
            this.dispatchMyEvent("valueChanged", {newValue: values[i].id, newText: values[i].name})
            continue;
          } else {
            innerHTML += '<option value="'+values[i].id+'">'+values[i].name+'</option>';  
          }
        } else {
          innerHTML += '<option value="'+values[i].id+'">'+values[i].name+'</option>';
        }
        // if(i === 0) {
        //   innerHTML += '<option value="'+values[i].id+'" selected>'+values[i].name+'</option>'
        //   this.dispatchMyEvent("valueChanged", {newValue: values[i].id, newText: values[i].name})
        // } else {
        //   
        // }

      }

      this._sfSelect.innerHTML = innerHTML;
      console.log('renderlist', innerHTML);
      this.dispatchMyEvent("renderComplete", {});
    }

  }

  populateList = async () => {

    console.log('pop list');
    const body = {"fk": this.mode == "admin" ? (document.querySelector('.input-parent-select') as SfISelect).selectedValues()[0] : this.filterId};
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      const values = jsonRespose.data.values;
      console.log('values', values);
      this.renderList(values)
    }
  }

  showNew = () => {
    this._SfNewC.querySelector('#button-new').setAttribute('disabled', true);
    this._SfNewC.querySelector('#button-view').removeAttribute('disabled');
    this._SfNewC.querySelector('.new-section').style.display = 'flex';
    this._SfNewC.querySelector('.view-section').style.display = 'none';
  }

  showView = () => {
    this._SfNewC.querySelector('#button-view').setAttribute('disabled', true);
    this._SfNewC.querySelector('#button-new').removeAttribute('disabled');
    this._SfNewC.querySelector('.view-section').style.display = 'flex';
    this._SfNewC.querySelector('.new-section').style.display = 'none';
  }

  removeItemByValue = (value: string) => {

    if(!this.removedValues.includes(value)) {
      this.removedValues.push(value);
    }

  }

  dispatchMyEvent = (ev: string, args?: any) => {

    console.log('dispatching event', ev);
    const event = new CustomEvent(ev, {detail: args, bubbles: true, composed: true});
    this.dispatchEvent(event);

  }

  onChangeSelect = (ev: any) => {
    this.dispatchMyEvent("valueChanged", {newValue: ev.target.value, newText: ev.target.options[ev.target.selectedIndex].text});
  }

  initState = async () => {

    console.log('mode', this.mode);

    if(this.flow == "read") {
      this._sfSelect.setAttribute("disabled", true);
    } else {
      this._sfSelect?.removeAttribute("disabled");
    }

  }

  initListeners = () => {

    if(this.mode == "admin") {

      this._SfNewC.querySelector('#button-new').addEventListener('click', ()=> {
        this.showNew();
      })


      this._SfNewC.querySelector('#button-view').addEventListener('click', ()=> {
        this.showView();
        this.populateList();
      })

      this._SfNewC.querySelector('.input-new').addEventListener('keyup', ()=> {
        const name = this._SfNewC.querySelector('.input-new').value;
        if(Util.validateName(name)) {
          this._SfNewC.querySelector('#button-submit-new').removeAttribute('disabled');
        } else {
          this._SfNewC.querySelector('#button-submit-new').setAttribute('disabled', true);
        }
      });

      this._SfNewC.querySelector('#button-submit-new').addEventListener('click', async ()=> {

        this.clearMessages();
        const selectedValue = (document.querySelector('.input-parent-select') as SfISelect).selectedValues()[0];
        
        const body = {"name": this._SfNewC.querySelector('.input-new').value, "fk": selectedValue};
        const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        const xhr : any = (await this.prepareXhr(body, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/create", this._SfLoader, authorization)) as any;
        this._SfLoader.innerHTML = '';
        if(xhr.status == 200) {
          this.setSuccess('Operation Successful!');
          setTimeout(() => {
            this.clearMessages();
            this._SfNewC.querySelector('.input-new').value = "";
          }, 1000);
          
        } else {
          const jsonRespose = JSON.parse(xhr.responseText);
          this.setError(jsonRespose.error);
          setTimeout(() => {
            this.clearMessages();
          }, 5000);
        }
        
      });

      this._sfSlottedFk[0].addEventListener('valueChanged', () => {
        this.populateList();
      })

    }


  }

  loadMode = async () => {

    if(this.mode == "text") {
      this.selectedTextPhrase = await this.fetchList();
    } else {

      this.initState();
      this.initListeners(); 
      if(this.mode != "admin") {
        this.populateList();
      }
    }
  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.loadMode();
  }
  
  override connectedCallback() {
    super.connectedCallback()
  }
  
  override render() {

    if(this.mode == "admin") {

      return html`
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
                  <button part="button" id="button-new" class="button-action">New</button>
                  <button part="button" id="button-view" class="button-action">View</button>
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
                  <input part="input" class="input-new mt5" type="text" placeholder="Name ..."/>
                  <button part="button" id="button-submit-new" class="mt10" disabled>Submit</button>
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

    } else if(this.mode == "text") {

      return html`
        <div class="SfISelectC">
          <div>${this.selectedTextPhrase}<div class="loader-element"></div></div>
        </div>
      `;
      
    } else if(this.mode == "multi") {

      return html`
        <div class="SfISelectC">
          <label part="input-label">${this.label}</label>
          <div>
            <select part="input-select-multi" id="input-select" @change="${this.onChangeSelect}" multiple>
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      `;
      
    } else {

      return html`
        <div class="SfISubSelectC">
          <label part="input-label">${this.label}</label>
          <div>
            <select part="input-select" class="input-select" @change="${this.onChangeSelect}">
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      `;
    }

  }

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-sub-select': SfISubSelect;
  }
}
