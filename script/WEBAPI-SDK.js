﻿
// Original: Sdk.WebAPIPreview.js, part of the Microsoft Dynamics CRM SDK code samples.

"use strict";
var Sdk = window.Sdk || { __namespace: true };
Sdk.WebAPI = Sdk.WebAPI || { __namespace: true };

(function () {
    this.create = function (entitySetName, entity, successCallback, errorCallback, callerId) {
        /// <summary>Create a new entity</summary>
        /// <param name="entitySetName" type="String">The name of the entity set for the entity you want to create.</param>
        /// <param name="entity" type="Object">An object with the properties for the entity you want to create.</param>       
        /// <param name="successCallback" type="Function">The function to call when the entity is created. The Uri of the created entity is passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(entitySetName)) {
            throw new Error("Sdk.WebAPI.create entitySetName parameter must be a string.");
        }
        if (isNullOrUndefined(entity)) {
            throw new Error("Sdk.WebAPI.create entity parameter must not be null or undefined.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.create successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.create errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.create callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("POST", encodeURI(getWebAPIPath() + entitySetName), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback(this.getResponseHeader("OData-EntityId"));
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send(JSON.stringify(entity));

    };
    this.retrieve = function (uri, properties, navigationproperties, successCallback, errorCallback, includeFormattedValues, eTag, unmodifiedCallback, callerId) {
        /// <summary>Retrieve an entity</summary>
        /// <param name="uri" type="String">The Uri for the entity you want to retrieve</param>
        /// <param name="properties" type="Array">An array of strings representing the entity properties you want to retrieve.</param>
        /// <param name="navigationproperties" type="String">An array of strings representing the navigation properties and any system query options you want to retrieve.</param>
        /// <param name="successCallback" type="Function">The function to call when the entity is retrieved. The entity data will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="includeFormattedValues" type="Boolean" optional="true">Whether you want to return formatted values.</param>
        /// <param name="eTag" type="String" optional="true">When provided and the entity has not been modified since the eTag value was retrieved, the unmodifiedCallback will be called.</param>
        /// <param name="unmodifiedCallback" type="Function" optional="true">The function to call when the entity has not been modified since last retrieved based on the eTag value. No entity data will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(uri)) {
            throw new Error("Sdk.WebAPI.retrieve uri parameter must be a string.");
        }
        if (!isStringArrayOrNull(properties)) {
            throw new Error("Sdk.WebAPI.retrieve properties parameter must be an array of strings or null.");
        }
        if (!isStringArrayOrNull(navigationproperties)) {
            throw new Error("Sdk.WebAPI.retrieve navigationproperties parameter must be an array of strings or null.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.retrieve successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.retrieve errorCallback parameter must be a function or null.");
        }
        if (!isBooleanOrNullOrUndefined(includeFormattedValues)) {
            throw new Error("Sdk.WebAPI.retrieve includeFormattedValues parameter must be a boolean, null, or undefined.");
        }
        if (!isStringOrNullOrUndefined(eTag)) {
            throw new Error("Sdk.WebAPI.retrieve eTag parameter must be a string, null or undefined.");
        }
        if (!isFunctionOrNullOrUndefined(unmodifiedCallback)) {
            throw new Error("Sdk.WebAPI.retrieve unmodifiedCallback parameter must be a function, null or undefined.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.retrieve callerId parameter must be a string null or undefined.");
        }

        var url = getWebAPIPath() + uri;

        if (properties || navigationproperties) {
            url += "?";
        }
        if (properties) {
            url += "$select=" + properties.join();
        }
        if (navigationproperties) {
            if (properties) {
                url += "&$expand=" + navigationproperties.join();
            }
            else {
                url += "$expand=" + navigationproperties.join();
            }

        }

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        if (eTag) {
            req.setRequestHeader("If-None-Match", eTag);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        if (includeFormattedValues) {
            req.setRequestHeader("Prefer", "odata.include-annotations=\"mscrm.formattedvalue\"");
        }

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                switch (this.status) {
                    case 200:
                        if (successCallback)
                            successCallback(JSON.parse(this.response, dateReviver));
                        break;
                    case 304: //Not modified
                        if (isFunction(unmodifiedCallback))
                            unmodifiedCallback();
                        break;
                    default:
                        if (errorCallback)
                            errorCallback(Sdk.WebAPI.errorHandler(this));
                        break;
                }
            }
        };
        req.send();

    }
    this.retrievePropertyValue = function (uri, propertyName, successCallback, errorCallback, callerId) {
        /// <summary>Retrieve the value of an entity property</summary>
        /// <param name="uri" type="String">The Uri for the entity with the property you want to retrieve</param>
        /// <param name="propertyName" type="String">A string representing the entity property you want to retrieve.</param>
        /// <param name="successCallback" type="Function">The function to call when the entity is retrieved. The property value will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(uri)) {
            throw new Error("Sdk.WebAPI.retrieveProperty uri parameter must be a string.");
        }
        if (!isString(propertyName)) {
            throw new Error("Sdk.WebAPI.retrieveProperty propertyName parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.retrieveProperty successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.retrieveProperty errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.retrieveProperty callerId parameter must be a string or null.");
        }

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(uri + "/" + propertyName), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                switch (this.status) {
                    case 200:
                        if (successCallback)
                            successCallback(JSON.parse(this.response, dateReviver).value);
                        break;
                    case 204:
                        if (successCallback)
                            successCallback(null);
                        break;
                    default:
                        if (errorCallback)
                            errorCallback(Sdk.WebAPI.errorHandler(this));
                        break;
                }
            }
        };
        req.send();

    }
    this.update = function (uri, updatedEntity, successCallback, errorCallback, callerId) {
        /// <summary>Update an entity</summary>
        /// <param name="uri" type="String">The Uri for the entity you want to update</param>
        /// <param name="updatedEntity" type="Object">An object that contains updated properties for the entity.</param>
        /// <param name="successCallback" type="Function">The function to call when the entity is updated.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(uri)) {
            throw new Error("Sdk.WebAPI.update uri parameter must be a string.");
        }
        if (isNullOrUndefined(updatedEntity)) {
            throw new Error("Sdk.WebAPI.update updatedEntity parameter must not be null or undefined.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.update successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.update errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.update callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("PATCH", encodeURI(uri), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send(JSON.stringify(updatedEntity));

    }
    this.updatePropertyValue = function (uri, propertyName, value, successCallback, errorCallback, callerId) {
        /// <summary>Update an entity property</summary>
        /// <param name="uri" type="String">The Uri for the entity with the property you want to update</param>
        /// <param name="updatedEntity" type="Object">An object that contains updated properties for the entity.</param>
        /// <param name="successCallback" type="Function">The function to call when the entity property value is updated. The property value will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(uri)) {
            throw new Error("Sdk.WebAPI.updateProperty uri parameter must be a string.");
        }
        if (!isString(propertyName)) {
            throw new Error("Sdk.WebAPI.updateProperty propertyName parameter must be a string.");
        }
        if (isNullOrUndefined(value)) {
            throw new Error("Sdk.WebAPI.updateProperty value parameter must not be null or undefined.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.updateProperty successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.updateProperty errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.updateProperty callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("PUT", encodeURI(uri + "/" + propertyName), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        var updateObject = {};
        updateObject.value = value;
        req.send(JSON.stringify(updateObject));

    }
    this.upsert = function (uri, entity, preventCreate, preventUpdate, successCallback, errorCallback, callerId) {
        /// <summary>Upsert an entity</summary>
        /// <param name="uri" type="String">The Uri for the entity you want to create or update</param>
        /// <param name="entity" type="Object">An object that contains updated properties for the entity.</param>
        /// <param name="preventCreate" type="Boolean">Whether you want to prevent creating a new entity.</param>
        /// <param name="preventUpdate" type="Boolean">Whether you want to prevent updating an existing entity.</param>
        /// <param name="successCallback" type="Function">The function to call when the operation is performed</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(uri)) {
            throw new Error("Sdk.WebAPI.upsert uri parameter must be a string.");
        }
        if (isNullOrUndefined(entity)) {
            throw new Error("Sdk.WebAPI.upsert updatedEntity parameter must not be null or undefined.");
        }
        if (!isBooleanOrNull(preventCreate)) {
            throw new Error("Sdk.WebAPI.upsert preventCreate parameter must be boolean or null.");
        }
        if (!isBooleanOrNull(preventUpdate)) {
            throw new Error("Sdk.WebAPI.upsert preventUpdate parameter must be boolean or null.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.upsert successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.upsert errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.upsert callerId parameter must be a string or null.");
        }
        if (!(preventCreate && preventUpdate)) {
            var req = new XMLHttpRequest();
            req.open("PATCH", encodeURI(uri), true);
            req.setRequestHeader("Accept", "application/json");
            if (callerId) {
                req.setRequestHeader("MSCRMCallerID", callerId);
            }
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            if (preventCreate) {
                req.setRequestHeader("If-Match", "*");
            }
            if (preventUpdate) {
                req.setRequestHeader("If-None-Match", "*");
            }
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState == 4 /* complete */) {
                    req.onreadystatechange = null;
                    switch (this.status) {
                        case 204:
                            if (successCallback)
                                successCallback(this.getResponseHeader("OData-EntityId"));
                            break;
                        case 412:
                            if (preventUpdate) {
                                if (successCallback)
                                    successCallback(); //Update prevented
                            }
                            else {
                                if (errorCallback)
                                    errorCallback(Sdk.WebAPI.errorHandler(this));
                            }
                            break;
                        case 404:
                            if (preventCreate) {
                                if (successCallback)
                                    successCallback(); //Create prevented
                            }
                            else {
                                if (errorCallback)
                                    errorCallback(Sdk.WebAPI.errorHandler(this));
                            }
                            break;
                        default:
                            if (errorCallback)
                                errorCallback(Sdk.WebAPI.errorHandler(this));
                            break;

                    }
                }
            };
            req.send(JSON.stringify(entity));
        }
        else {
            console.log("Sdk.WebAPI.upsert performed no action because both preventCreate and preventUpdate parameters were true.");
        }
    }
    //delete is a JavaScript keyword and should not be used as a method name
    this.del = function (uri, successCallback, errorCallback, callerId) {
        /// <summary>Delete an entity</summary>
        /// <param name="uri" type="String">The Uri for the entity you want to delete</param>        
        /// <param name="successCallback" type="Function">The function to call when the entity is deleted.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(uri)) {
            throw new Error("Sdk.WebAPI.del uri parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.del successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.del errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.del callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("DELETE", encodeURI(uri), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.deletePropertyValue = function (uri, propertyName, successCallback, errorCallback, callerId) {
        /// <summary>Delete an entity property value</summary>
        /// <param name="uri" type="String">The Uri for the entity you want to update</param>
        /// <param name="propertyName" type="String">The name of the property value you want to delete</param>        
        /// <param name="successCallback" type="Function">The function to call when the entity property is deleted.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(uri)) {
            throw new Error("Sdk.WebAPI.deletePropertyValue uri parameter must be a string.");
        }
        if (!isString(propertyName)) {
            throw new Error("Sdk.WebAPI.deletePropertyValue propertyName parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.deletePropertyValue successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.deletePropertyValue errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.deletePropertyValue callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("DELETE", encodeURI(uri + "/" + propertyName), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.associate = function (parentUri, navigationPropertyName, childUri, successCallback, errorCallback, callerId) {
        /// <summary>Associate an entity</summary>
        /// <param name="parentUri" type="String">The Uri for the entity you want to associate another entity to.</param>
        /// <param name="navigationPropertyName" type="String">The name of the navigation property you want to use to associate the entities.</param>
        /// <param name="childUri" type="String">The Uri for the entity you want to associate with the parent entity.</param>        
        /// <param name="successCallback" type="Function">The function to call when the entities are associated.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(parentUri)) {
            throw new Error("Sdk.WebAPI.associate parentUri parameter must be a string.");
        }
        if (!isString(navigationPropertyName)) {
            throw new Error("Sdk.WebAPI.associate navigationPropertyName parameter must be a string.");
        }
        if (!isString(childUri)) {
            throw new Error("Sdk.WebAPI.associate childUri parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.associate successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.associate errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.associate callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("POST", encodeURI(parentUri + "/" + navigationPropertyName + "/$ref"), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        var rel = {};
        rel["@odata.id"] = childUri;
        req.send(JSON.stringify(rel))
    }
    this.disassociate = function (parentUri, navigationPropertyName, childUri, successCallback, errorCallback, callerId) {
        /// <summary>Disassociate an entity</summary>
        /// <param name="parentUri" type="String">The Uri for the parent entity.</param>
        /// <param name="navigationPropertyName" type="String">The name of the collection navigation property you want to use to disassociate the entities.</param>
        /// <param name="childUri" type="String">The Uri for the entity you want to disassociate with the parent entity.</param>
        /// <param name="successCallback" type="Function">The function to call when the entities are disassociated.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(parentUri)) {
            throw new Error("Sdk.WebAPI.disassociate parentUri parameter must be a string.");
        }
        if (!isString(navigationPropertyName)) {
            throw new Error("Sdk.WebAPI.disassociate navigationPropertyName parameter must be a string.");
        }
        if (!isString(childUri)) {
            throw new Error("Sdk.WebAPI.disassociate childUri parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.disassociate successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.disassociate errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.disassociate callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("DELETE", encodeURI(parentUri + "/" + navigationPropertyName + "/$ref?$id=" + childUri), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };

        req.send()
    }
    this.removeReference = function (entityUri, navigationPropertyName, successCallback, errorCallback, callerId) {
        /// <summary>Remove the value of a single-valued navigation property</summary>
        /// <param name="entityUri" type="String">The Uri for the entity.</param>
        /// <param name="navigationPropertyName" type="String">The name of the navigation property you want to use to disassociate the entities.</param>            
        /// <param name="successCallback" type="Function">The function to call when the entities are disassociated.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(entityUri)) {
            throw new Error("Sdk.WebAPI.removeReference entityUri parameter must be a string.");
        }
        if (!isString(navigationPropertyName)) {
            throw new Error("Sdk.WebAPI.removeReference navigationPropertyName parameter must be a string.");
        }

        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.removeReference successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.removeReference errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.removeReference callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("DELETE", encodeURI(entityUri + "/" + navigationPropertyName + "/$ref"), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };

        req.send()
    }
    this.addReference = function (entityUri, navigationPropertyName, referencedEntityUri, successCallback, errorCallback, callerId) {
        /// <summary>Set the value of a single-valued navigation property</summary>
        /// <param name="entityUri" type="String">The Uri for the entity.</param>
        /// <param name="navigationPropertyName" type="String">The name of the navigation property you want to use to associate the entities.</param>     
        /// <param name="referencedEntityUri" type="String">The Uri for the entity you want to associate with the child entity.</param>
        /// <param name="successCallback" type="Function">The function to call when the entities are disassociated.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(entityUri)) {
            throw new Error("Sdk.WebAPI.addReference entityUri parameter must be a string.");
        }
        if (!isString(navigationPropertyName)) {
            throw new Error("Sdk.WebAPI.addReference navigationPropertyName parameter must be a string.");
        }
        if (!isString(referencedEntityUri)) {
            throw new Error("Sdk.WebAPI.addReference referencedEntityUri parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.addReference successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.addReference errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.addReference callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        req.open("PUT", encodeURI(entityUri + "/" + navigationPropertyName + "/$ref?", true));
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    if (successCallback)
                        successCallback();
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };

        var rel = {};
        rel["@odata.id"] = referencedEntityUri;
        req.send(JSON.stringify(rel))
    }
    this.invokeBoundFunction = function (entitySetName, functionName, successCallback, errorCallback, callerId) {
        /// <summary>Invoke a bound function</summary>
        /// <param name="entitySetName" type="String">The logical collection name for the entity that the function is bound to.</param>
        /// <param name="functionName" type="String">The name of the bound function you want to invoke</param>        
        /// <param name="successCallback" type="Function">The function to call when the function is invoked. The results of the bound function will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (isNullOrUndefined(entitySetName)) {
            throw new Error("Sdk.WebAPI.invokeBoundFunction entitySetName parameter must not be null or undefined.");
        }
        if (isNullOrUndefined(functionName)) {
            throw new Error("Sdk.WebAPI.invokeBoundFunction functionName parameter must not be null or undefined.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.invokeBoundFunction successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.invokeBoundFunction errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.invokeBoundFunction callerId parameter must be a string or null.");
        }
        var UriPath = getWebAPIPath() + entitySetName + "/" + functionName + "()";


        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(UriPath), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response, dateReviver).value);
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();

    }
    this.invokeUnboundFunction = function (functionName, parameters, successCallback, errorCallback, callerId) {
        /// <summary>Invoke an unbound function</summary>
        /// <param name="functionName" type="String">The name of the unbound function you want to invoke</param>
        /// <param name="parameters" type="Array">An array of strings representing the parameters to pass to the unbound function</param>
        /// <param name="successCallback" type="Function">The function to call when the function is invoked. The results of the unbound function will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (isNullOrUndefined(functionName)) {
            throw new Error("Sdk.WebAPI.invokeUnboundFunction functionName parameter must not be null or undefined.");
        }
        if (!isStringArrayOrNull(parameters)) {
            throw new Error("Sdk.WebAPI.retrieve parameters parameter must be an array of strings or null.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.invokeUnboundFunction successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.invokeUnboundFunction errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.invokeUnboundFunction callerId parameter must be a string or null.");
        }
        var UriPath = getWebAPIPath() + functionName;
        var parameterNames = [];
        var parameterAliasValues = [];
        var parameterNumber = 1;
        if (parameters) {
            parameters.forEach(function (param) {
                var keyValue = param.split("=");
                var name = keyValue[0];
                var value = keyValue[1];
                parameterNames.push(name + "=" + "@p" + parameterNumber.toString());
                parameterAliasValues.push("@p" + parameterNumber.toString() + "=" + value)


                parameterNumber++;
            });
            UriPath = UriPath + "(" + parameterNames.join(",") + ")?" + parameterAliasValues.join("&");
        }
        else {
            UriPath = UriPath + "()";
        }

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(UriPath), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response, dateReviver));
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.invokeUnboundAction = function (actionName, parameterObj, successCallback, errorCallback, callerId) {
        /// <summary>Invoke an unbound action</summary>
        /// <param name="actionName" type="String">The name of the unbound action you want to invoke.</param>
        /// <param name="parameterObj" type="Object">An object that defines parameters expected by the action</param>        
        /// <param name="successCallback" type="Function">The function to call when the action is invoked. The results of the action will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(actionName)) {
            throw new Error("Sdk.WebAPI.invokeUnboundAction actionName parameter must be a string.");
        }
        if (isUndefined(parameterObj)) {
            throw new Error("Sdk.WebAPI.invokeUnboundAction parameterObj parameter must not be undefined.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.invokeUnboundAction successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.invokeUnboundAction errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.invokeUnboundAction callerId parameter must be a string or null.");
        }

        /*
         Invoke Action with custom parameters
         Action name new_TestAction
    var parameterObj = { 
        "Description": "Test description", 
        "Subject": "Invoking from Web API" 
    };
    actionName = "accounts(DE57510E-59A3-E511-80E4-3863BB35AD90)/Microsoft.Dynamics.CRM.new_TestAction"; 
         */

        var req = new XMLHttpRequest();
        req.open("POST", encodeURI(getWebAPIPath() + actionName), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200 || this.status == 201 || this.status == 204) {
                    if (successCallback)
                        switch (this.status) {
                            case 200:
                                //When the Action returns a value
                                successCallback(JSON.parse(this.response, dateReviver));
                                break;
                            case 201:
                            case 204:
                                //When the Action does not return a value
                                successCallback();
                                break;
                            default:
                                //Should not happen
                                break;
                        }

                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        if (parameterObj) {
            req.send(JSON.stringify(parameterObj));
        }
        else {
            req.send();
        }


    }
    this.queryEntitySet = function (entitySetName, query, includeFormattedValues, maxPageSize, successCallback, errorCallback, callerId) {
        /// <summary>Retrieve multiple entities</summary>
        /// <param name="entitySetName" type="String">The logical collection name for the type of entity you want to retrieve.</param>
        /// <param name="query" type="String">The system query parameters you want to apply.</param> 
        /// <param name="includeFormattedValues" type="Boolean">Whether you want to have formatted values included in the results</param> 
        /// <param name="maxPageSize" type="Number">A number that limits the number of entities to be retrieved in the query.</param> 
        /// <param name="successCallback" type="Function">The function to call when the entities are returned. The results of the query will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(entitySetName)) {
            throw new Error("Sdk.WebAPI.queryEntitySet entitySetName parameter must be a string.");
        }
        if (!isStringOrNull(query)) {
            throw new Error("Sdk.WebAPI.queryEntitySet query parameter must be a string or null.");
        }
        if (!isBooleanOrNull(includeFormattedValues)) {
            throw new Error("Sdk.WebAPI.queryEntitySet includeFormattedValues parameter must be a boolean or null.");
        }
        if (!isNumberOrNull(maxPageSize)) {
            throw new Error("Sdk.WebAPI.queryEntitySet maxPageSize parameter must be a number or null.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.queryEntitySet successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.queryEntitySet errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.queryEntitySet callerId parameter must be a string or null.");
        }

        var url = getWebAPIPath() + entitySetName;
        if (!isNull(query)) {
            url = url + "?" + query;
        }

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        if (includeFormattedValues && maxPageSize) {
            req.setRequestHeader("Prefer", "odata.include-annotations=\"mscrm.formattedvalue\",odata.maxpagesize=" + maxPageSize);
        }
        else {
            if (includeFormattedValues) {
                req.setRequestHeader("Prefer", "odata.include-annotations=\"mscrm.formattedvalue\"");
            }

            if (maxPageSize) {
                req.setRequestHeader("Prefer", "odata.maxpagesize=" + maxPageSize);
            }
        }

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response, dateReviver));
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();

    }
    this.getNextPage = function (query, includeFormattedValues, maxPageSize, successCallback, errorCallback, callerId) {
        /// <summary>Return the next page of a retrieve multiple query when there are additional pages.</summary>
        /// <param name="query" type="String">The value of the @odata.nextLink property for the results of a queryEntitySet query when there are more pages.</param>
        /// <param name="includeFormattedValues" type="Boolean">Whether you want to have formatted values included in the results</param> 
        /// <param name="maxPageSize" type="Number">A number that limits the number of entities to be retrieved in the query.</param> 
        /// <param name="successCallback" type="Function">The function to call when the entities are returned. The results of the query will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isStringOrNull(query)) {
            throw new Error("Sdk.WebAPI.getNextPage query parameter must be a string or null.");
        }
        if (!isBooleanOrNull(includeFormattedValues)) {
            throw new Error("Sdk.WebAPI.getNextPage includeFormattedValues parameter must be a boolean or null.");
        }
        if (!isNumberOrNull(maxPageSize)) {
            throw new Error("Sdk.WebAPI.getNextPage maxPageSize parameter must be a number or null.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.getNextPage successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.getNextPage errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.getNextPage callerId parameter must be a string or null.");
        }
        var req = new XMLHttpRequest();
        //Not encoding the URI because it came from the system
        req.open("GET", query, true);
        req.setRequestHeader("Accept", "application/json");
        if (callerId) {
            req.setRequestHeader("MSCRMCallerID", callerId);
        }
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        if (includeFormattedValues) {
            req.setRequestHeader("Prefer", "odata.include-annotations=\"mscrm.formattedvalue\"");
        }

        if (maxPageSize) {
            req.setRequestHeader("Prefer", "odata.maxpagesize=" + maxPageSize);
        }

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response, dateReviver));
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.executeBatch = function (payload, batchId, successCallback, errorCallback, callerId) {
        /// <summary>Execute several operations at once</summary>
        /// <param name="payload" type="String">A string describing the operations to perform in the batch</param>  
        /// <param name="batchId" type="String">A string containing the Id used for the batch</param>   
        /// <param name="successCallback" type="Function">The function to call when the actions are completed. The results of the operation will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        /// <param name="callerId" type="String" optional="true">The systemuserid value of the user to impersonate</param>
        if (!isString(payload)) {
            throw new Error("Sdk.WebAPI.executeBatch payload parameter must be a string.");
        }
        if (!isString(batchId)) {
            throw new Error("Sdk.WebAPI.executeBatch batchId parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.executeBatch successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.executeBatch errorCallback parameter must be a function or null.");
        }
        if (!isAcceptableCallerId(callerId)) {
            throw new Error("Sdk.WebAPI.executeBatch callerId parameter must be a string or null.");
        }



        var req = new XMLHttpRequest();
        req.open("POST", encodeURI(getWebAPIPath() + "$batch"), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "multipart/mixed;boundary=batch_" + batchId);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback) {
                        successCallback(this.response);
                    }
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };

        req.send(payload);
    }
    this.getEntityList = function (successCallback, errorCallback) {
        /// <summary>Retrieve an array of entities available from the service</summary>
        /// <param name="successCallback" type="Function">The function to call when the results are returned. The results of the operation will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.getEntityList successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.getEntityList errorCallback parameter must be a function or null.");
        }

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(getWebAPIPath()), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response).value);
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();

    }

    //============================== Begin New Functions
    // uri
    // getWebAPIPath() + accounts(DE57510E-59A3-E511-80E4-3863BB35AD90)

    this.getEntityCount = function (entitySetName, successCallback, errorCallback, onlyActive) {
        if (!isString(entitySetName)) {
            throw new Error("Sdk.WebAPI.queryEntitySet entitySetName parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.queryEntitySet successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.queryEntitySet errorCallback parameter must be a function or null.");
        }

        var url = getWebAPIPath() + entitySetName + '?' + ((onlyActive) ? '$filter=statecode eq 0&' : '') + '$count';
        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response));
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.getUserSetttings = function (UserId, successCallback, errorCallback) {
        var prop = ["dateformatstring",
                         "dateseparator",
                         "timeformatstring",
                         "timeseparator",
                         "uilanguageid",
                         "defaultcountrycode",
                         "currencysymbol",
                         "numberseparator",
                         "decimalsymbol",
                         "currencydecimalprecision",
                         "numbergroupformat",
                         "currencyformatcode",
                         "negativeformatcode",
                         "negativecurrencyformatcode"];

        var url = getWebAPIPath() + 'usersettingscollection?$select=' + prop.join() + '&$filter=systemuserid eq ' + UserId;

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                switch (this.status) {
                    case 200:
                        if (successCallback)
                            successCallback(JSON.parse(this.response).value);
                        break;
                    default:
                        if (errorCallback)
                            errorCallback(Sdk.WebAPI.errorHandler(this));
                        break;
                }
            }
        };
        req.send();
    }
    this.GetEntityAttributes = function (SchemaName, successCallback, errorCallback) {
        if (!isString(SchemaName)) {
            throw new Error("Sdk.WebAPI.GetEntityAttributes entitySetName parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.GetEntityAttributes successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.GetEntityAttributes errorCallback parameter must be a function or null.");
        }

        // Get Entity metadata specific values (DisplayName,...)
        //var url = getWebAPIPath() + "EntityDefinitions?$select=DisplayName&$filter=SchemaName eq '" + SchemaName + "'";
        // Gets all entity metadata without Attributes and relationships collections
        //var url = getWebAPIPath() + "EntityDefinitions?$filter=SchemaName eq '" + SchemaName + "'";

        // SchemaName 'Account, LogicalName 'account', LogicalCollectionName 'accounts'
        // PrimaryIdAttribute 'accountid', PrimaryNameAttribute 'name'
        var url = getWebAPIPath() + "EntityDefinitions?$select=SchemaName,PrimaryIdAttribute,PrimaryNameAttribute,LogicalCollectionName"
            + "&$filter=SchemaName eq '" + SchemaName + "'&$expand=Attributes"
            + "($filter=(AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Picklist' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'String' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Memo' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Lookup' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Boolean' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Datetime' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Integer' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Double' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Decimal' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Money' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Customer' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Owner' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'State' or"
            + " AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Status')"
            + " and AttributeOf eq null" +
            // Excluded
            " and (LogicalName ne 'createdonbehalfby' and"
            + " LogicalName ne 'exchangerate' and"
            + " LogicalName ne 'importsequencenumber' and"
            + " LogicalName ne 'modifiedonbehalfby' and"
            + " LogicalName ne 'overriddencreatedon' and"
            + " LogicalName ne 'owningbusinessunit' and"
            + " LogicalName ne 'owningteam' and"
            + " LogicalName ne 'owninguser' and"
            + " LogicalName ne 'timezoneruleversionnumber' and"
            + " LogicalName ne 'utcconversiontimezonecode' and"
            + " LogicalName ne 'versionnumber'))";

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response).value);
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.getManyToOneRelationships = function (SchemaName, successCallback, errorCallback) {
        if (!isString(SchemaName)) {
            throw new Error("Sdk.WebAPI.getManyToOneRelationships entitySetName parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.getManyToOneRelationships successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.getManyToOneRelationships errorCallback parameter must be a function or null.");
        }

        // Gets all N:1 relationships
        // Can not use RelationshipDefinitions
        // The properties available when querying RelationshipDefinitions entity set are limited to those in the RelationshipMetadataBase EntityType.
        // OneToManyRelationshipMetadata and ManyToManyRelationshipMetadata
         var url = getWebAPIPath() + "EntityDefinitions?$select=SchemaName&$filter=SchemaName eq '" + SchemaName + "'&$expand=ManyToOneRelationships";

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response).value);
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.getOneToManyRelationships = function (SchemaName, referencingEntity, successCallback, errorCallback) {
        if (!isString(SchemaName)) {
            throw new Error("Sdk.WebAPI.getOneToManyRelationships entitySetName parameter must be a string.");
        }
        if (!isStringOrNullOrUndefined(referencingEntity)) {
            throw new Error("Sdk.WebAPI.getOneToManyRelationships referencingEntity parameter must be a string, null or undefined.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.getOneToManyRelationships successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.getOneToManyRelationships errorCallback parameter must be a function or null.");
        }

        var url = getWebAPIPath() + "RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata?$select=ReferencingAttribute,ReferencedAttribute&$filter=ReferencedEntity eq '" + SchemaName.toLowerCase() + "' and ReferencingEntity eq '" + referencingEntity + "'";

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    if (successCallback)
                        successCallback(JSON.parse(this.response).value);
                }
                else {
                    if (errorCallback)
                        errorCallback(Sdk.WebAPI.errorHandler(this));
                }
            }
        };
        req.send();
    }
    this.getFetchXml = function (entitySetName, fetchXml, successCallback, errorCallback) {
        if (isNullOrUndefined(entitySetName)) {
            throw new Error("Sdk.WebAPI.getFetchXml entitySetName parameter must not be null or undefined.");
        }
        if (!isString(fetchXml)) {
            throw new Error("Sdk.WebAPI.getFetchXml fetchXml parameter must be a string.");
        }
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.getFetchXml successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.getFetchXml errorCallback parameter must be a function or null.");
        }

        fetchXml = fetchXml.replace(/\"/g, "'");

        var url = getWebAPIPath() + entitySetName + "?fetchXml=" + encodeURI(fetchXml);

        var req = new XMLHttpRequest();
        req.open("GET", encodeURI(url), true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                switch (this.status) {
                    case 200:
                        if (successCallback)
                            successCallback(JSON.parse(this.response).value);
                        break;
                    default:
                        if (errorCallback)
                            errorCallback(Sdk.WebAPI.errorHandler(this));
                        break;
                }
            }
        };
        req.send();

    }
    this.versionNumber = function (successCallback, errorCallback) {
        /// <summary>Retrieve an array of entities available from the service</summary>
        /// <param name="successCallback" type="Function">The function to call when the results are returned. The results of the operation will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.getEntityList successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.getEntityList errorCallback parameter must be a function or null.");
        }

        Sdk.WebAPI.invokeUnboundFunction("RetrieveVersion", //functionName
         null, //parameters
         successCallback,  //successCallback
         errorCallback); //errorCallback
        /*
function VersionFunctionSuccess(VersionResponse) {
	console.log("VersionFunctionSuccess function starting.");
	console.log("version number " + VersionResponse.Version);
}
function VersionFunctionFail(error) {
 console.log(error.message);
}
         */
    }
    this.whoAmIFunction = function (successCallback, errorCallback) {
        /// <summary>Retrieve an array of entities available from the service</summary>
        /// <param name="successCallback" type="Function">The function to call when the results are returned. The results of the operation will be passed to this function.</param>
        /// <param name="errorCallback" type="Function">The function to call when there is an error. The error will be passed to this function.</param>
        if (!isFunctionOrNull(successCallback)) {
            throw new Error("Sdk.WebAPI.getEntityList successCallback parameter must be a function or null.");
        }
        if (!isFunctionOrNull(errorCallback)) {
            throw new Error("Sdk.WebAPI.getEntityList errorCallback parameter must be a function or null.");
        }

        Sdk.WebAPI.invokeUnboundFunction("WhoAmI", //functionName
         null, //parameters
         successCallback,  //successCallback
         errorCallback); //errorCallback
        /*
function WhoAmIFunctionSuccess(WhoAmIResponse) {
 UserId = WhoAmIResponse.UserId;
 console.log("BusinessUnitId: " + WhoAmIResponse.BusinessUnitId);
 console.log("OrganizationId: " + WhoAmIResponse.OrganizationId);
}
         */
    }

    //============================== End New Functions

    //A helper for generating a unique changelist value for execute batch
    this.getRandomId = function () {
        /// <summary>Generates a random set of 10 characters to use when defining a changelist with Sdk.WebAPI.executeBatch</summary>
        return getId();
    }

    //Internal supporting functions
    function dateReviver(key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
            }
        }
        return value;
    };
    function getContext() {
        var oContext;
        if (typeof window.GetGlobalContext != "undefined") {
            oContext = window.GetGlobalContext();
        }
        else if (typeof GetGlobalContext != "undefined") {
            oContext = GetGlobalContext();
        }
        else {
            if (typeof Xrm != "undefined") {
                oContext = Xrm.Page.context;
            }
            else if (typeof window.parent.Xrm != "undefined") {
                oContext = window.parent.Xrm.Page.context;
            }
            else {
                throw new Error("Context is not available.");
            }
        }
        return oContext;
    }
    function getClientUrl() {
        return getContext().getClientUrl();
    }
    function getWebAPIPath() {
        return getClientUrl() + "/api/data/v8.0/";
    }
    function getId(idLength) {
        if (isNullOrUndefined(idLength))
            idLength = 10;
        if (isNumber(idLength)) {
            if (idLength > 30) {
                throw new Error("Length must be less than 30.");
            }
        }
        else {
            throw new Error("Length must be a number.");
        }

        var returnValue = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < idLength; i++)
            returnValue += characters.charAt(Math.floor(Math.random() * characters.length));

        return returnValue;
    }

    //Internal validation functions
    function isFunctionOrNullOrUndefined(obj) {
        if (isNullOrUndefined(obj)) {
            return true;
        }
        if (isFunction(obj)) {
            return true;
        }
        return false;
    }
    function isFunctionOrNull(obj) {
        if (isNull(obj))
        { return true; }
        if (isFunction(obj))
        { return true; }
        return false;
    }
    function isFunction(obj) {
        if (typeof obj === "function") {
            return true;
        }
        return false;
    }
    function isString(obj) {
        if (typeof obj === "string") {
            return true;
        }
        return false;

    }
    function isNumberOrNull(obj) {
        if (isNull(obj))
        { return true; }
        if (isNumber(obj))
        { return true; }
        return false;
    }
    function isNumber(obj) {
        if (typeof obj === "number") {
            return true;
        }
        return false;

    }
    function isNull(obj) {
        if (obj === null)
        { return true; }
        return false;
    }
    function isStringOrNullOrUndefined(obj) {
        if (isStringOrNull(obj))
        { return true; }
        if (isUndefined(obj))
        { return true; }
        return false;
    }
    function isStringOrNull(obj) {
        if (isNull(obj))
        { return true; }
        if (isString(obj))
        { return true; }
        return false;
    }
    function isStringArrayOrNull(obj) {
        if (isNull(obj)) {
            return true;
        }
        return isStringArray(obj)
    }
    function isStringArray(obj) {
        if (isArray(obj)) {
            obj.forEach(function (item) {
                if (!isString(item)) {
                    return false;
                }
            });
            return true;
        }
        return false;
    }
    function isAcceptableCallerId(obj) {
        if (isString(obj))
            return true;
        if (isNullOrUndefined(obj)) {
            obj = false;
            return true;
        }
        return false;
    }
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    function isBooleanOrNullOrUndefined(obj) {
        if (isBooleanOrNull(obj)) {
            return true;
        }
        if (isUndefined(obj)) {
            return true;
        }
        return false;
    }
    function isBooleanOrNull(obj) {
        if (isNull(obj))
        { return true; }
        if (isBoolean(obj))
        { return true; }
        return false;
    }
    function isBoolean(obj) {
        if (typeof obj === "boolean") {
            return true;
        }
        return false;
    }
    function isNullOrUndefined(obj) {
        if (isNull(obj) || isUndefined(obj)) {
            return true;
        }
        return false;
    }
    function isUndefined(obj) {
        if (typeof obj === "undefined") {
            return true;
        }
        return false;
    }


    // This function is called when an error callback parses the JSON response
    // It is a public function because the error callback occurs within the onreadystatechange 
    // event handler and an internal function would not be in scope.
    this.errorHandler = function (resp) {
        switch (resp.status) {
            case 503:
                return new Error(resp.statusText + " Status Code:" + resp.status + " The Web API Preview is not enabled.");
                break;
            default:
                return new Error("Status Code:" + resp.status + " " + parseError(resp));
                break;
        }
    }
    // During the web API preview some errors will have an error property or a Message Property.
    // This function parses the message from either
    function parseError(resp) {
        var errorObj = JSON.parse(resp.response);
        if (!isNullOrUndefined(errorObj.error)) {
            return errorObj.error.message;
        }
        if (!isNullOrUndefined(errorObj.Message)) {
            return errorObj.Message;
        }
        return "Unexpected Error";

    }

}).call(Sdk.WebAPI);


/*
Macros for
var isObject = function (elem) {
  return getType(elem) === 'Object';
};

 * Sample calls
axis.isArray([]); // true
axis.isObject({}); // true
axis.isString(''); // true
axis.isDate(new Date()); // true
axis.isRegExp(/test/i); // true
axis.isFunction(function () {}); // true
axis.isBoolean(true); // true
axis.isNumber(1); // true
axis.isNull(null); // true
axis.isUndefined(); // true
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.axis = factory();
    }
})(this, function () {
    'use strict';
    var exports = {};
    var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
    var type = function () {
        return Object.prototype.toString.call(this).slice(8, -1);
    };

    for (var i = types.length; i--;) {
        exports['is' + types[i]] = (function (self) {
            return function (elem) {
                return type.call(elem) === self;
            };
        })(types[i]);
    }

    return exports;
});
