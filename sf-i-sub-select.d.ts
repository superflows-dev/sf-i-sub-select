/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
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
export declare class SfISubSelect extends LitElement {
    apiId: string;
    label: string;
    name: string;
    mode: string;
    selectedId: string;
    filterId: string;
    selectedValue: () => any;
    static styles: import("lit").CSSResult;
    _sfSelect: any;
    _SfLoader: any;
    _SfTableC: any;
    _SfNewC: any;
    _SfInputNew: any;
    _SfInputSelect: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _sfSlottedFk: any;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    submitNew: () => void;
    renderList: (values: Array<any>) => void;
    populateList: () => Promise<void>;
    showNew: () => void;
    showView: () => void;
    dispatchMyEvent: (ev: string, args?: any) => void;
    onChangeSelect: (ev: any) => void;
    initState: () => Promise<void>;
    initListeners: () => void;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-sub-select': SfISubSelect;
    }
}
//# sourceMappingURL=sf-i-sub-select.d.ts.map