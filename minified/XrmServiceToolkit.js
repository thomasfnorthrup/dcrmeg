/**
* MSCRM 2015, 2013, 2011 Web Service Toolkit for JavaScript
* @author Jaimie Ji
* @author David Berry
* @current version : 2.2.1

* Credits:
*   The idea of this library was inspired by Daniel Cai's CrmWebServiceToolkit.
*   The idea of BusinessEntity was inspired by Daniel Cai && Ascentium CrmService JavaScript Library.
*   The REST Endpoint functions were inspired by MSCRM 2011 SDK JavaScript code and various resources from CRM websites and forums. Some of them were just copies with minor modification.
*   The Soap functions were inspired by Daniel Cai && Jamie Miley && Paul Way && Customer Effective.
*   Additional thanks to all contributors of MSCRM and i have learned a lot from you all.
* Date: February, 2012
*
* Special Thanks:
*   JetBrains ReSharper Open License
* Date: July, 2012
*
* What's new:
**********************************************************************************************************
*   Version: 1.1
*   Date: April, 2012
*       Dependency: JSON2
*       New Function - XrmServiceToolkit.Soap.Assign
*       New Function - XrmServiceToolkit.Soap.GrantAccess
*       New Function - XrmServiceToolkit.Soap.ModifyAccess
*       New Function - XrmServiceToolkit.Soap.GrantAccess
*       New Function - XrmServiceToolkit.Soap.RetrievePrincipalAccess
**********************************************************************************************************
*   Version: 1.2
*   Date: April, 2012
*       Dependency: JSON2
*       New Fix - Fix soaps functions to create/update/retrieve activities with Party List fields.
**********************************************************************************************************
*   Version: 1.3
*   Date: July, 2012
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       New Feature: cross browser support. jQuery Integration.
*       New Extension: A new category of functions to extend some functions:
*          1. JQueryXrmDependentOptionSet: Create Configurable Dependent Option Set to utilize CRM 2011 web resource.
*          2. JQueryXrmFieldTooltip: Create configurable tooltip for fields on CRM 2011 form
*          3. JQueryXrmCustomFilterView: Create configurable ability to add custom filter view to crm 2011 lookup field on the form
*          4. JQueryXrmFormatNotesControl: Format the notes control to allow insert, allow edit
**********************************************************************************************************
*   Version: 1.3.1
*   Date: November, 2012
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       New Feature - A change of logic to increase performance when returning large number of records
*       New Function - XrmServiceToolkit.Soap.QueryAll: Return all available records by query options (>5k+)
*       New Fix - XrmServiceToolkit.Rest.RetrieveMultiple not returning records more than 50
*       New Fix - XrmServiceToolkit.Soap.Business error when referring number fields like (int, double, float)     
*       New Fix - XrmServiceToolkit.Soap not handling error message properly
**********************************************************************************************************
*   Version: 1.3.2
*   Date: January, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)  
*       New Fix - XrmServiceToolkit.Soap cross browser support to initialize soap service
**********************************************************************************************************
*   Version: 1.4.0 
*   Date: January, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)  
*       Feature: Add Cross Browser Support for RU12
*       Tested Platform: IE9, IE10, Chrome Version 24.0.1312.56 m, Firefox 18.0.1
**********************************************************************************************************
*   Version: 1.4.1
*   Date: April, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)  
*       Tested Platform: IE9, IE10, Chrome Version 26.0.1410.64 m, Firefox 20.0.1
*       Feature: Add Cross Browser Support for RU12, RU13
*       New Fix - XrmServiceToolkit.Common.AddNotification method updated for RU12, RU13, still compatible for RU11 below
*       New Fix - XrmServiceToolkit.Soap.Fetch method did not format linked record correctly
*       New Fix - XrmServiceToolkit.Soap.Retrieve method did not return partylist data for activity
*       New Fix - Added manual conversion from String to Date conversion for cross browser
*       New Fix - getServerUrl method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
*       New Function - getServerUrl private method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
*       New Function - XrmServiceToolkit.Soap.RetrieveAllEntitiesMetadata method is a method to return all metadata for all entities by the specified entity filters
*       New Function - XrmServiceToolkit.Soap.RetrieveEntityMetadata method is a method to return the metadata for a certain entity by the specified entity filters
*       New Function - XrmServiceToolkit.Soap.RetrieveAttributeMetadata method is a method to return the metadata for a certain entity's attribute
**********************************************************************************************************
*   Version: 1.4.2 (beta)
*   Date: May, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       Tested Platform: IE10
*       New Fix - XrmServiceToolkit.Soap.Fetch now takes an additional parameter, 'fetchAll', that when set to true will retrieve all pages of results
*       New Behaviour - XrmServiceToolkit.Soap.Fetch works best when providing a FetchXML string starting with the "entity" node, because of the way paging works;
*           It will still function with the traditional "fetch" node to start, but then the XML has to be parsed to select just the "entity" node, which adds some overhead.
*       New Behaviour - XrmServiceToolkit fetch and queryall methods use a unified model, and some redundant code has been removed.  This allows better paging operations.
*
**********************************************************************************************************
*   Version: 2.0.0 (beta)
*   Date: October, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE10, latest Chrome, latest FireFox
*    Changes:
*       New Behaviour - XrmServiceTookit.Soap.Fetch parameters change to work with asynchronous callback compared to 1.4.2 beta: XrmServiceToolkit.Soap.Fetch(fetchXml, fetchAll, callback)
*       New Behaviour - XrmServiceTookit.Soap.AddNotification is working with CRM 2013 using the out-of-box functionality. Still support CRM 2011
*       New Fix - XrmServiceToolkit.Common.GetObjectCodeType is now using metadata retrieval as a supported method
*       New Fix - The included jQuery has a line changed at the bottom <window.jQuery = jQuery;> $ is removed to work with CRM 2013 form
*   Beta Release for CRM 2013
**********************************************************************************************************
*   Version: 2.0.1 (beta)
*   Date: April, 2014
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
*    Changes:
*       New Behaviour - XrmServiceTookit.Soap.Fetch method will allow 'page' and 'count' parameter to limit the returned records.
*       New Fix - XrmServiceToolkit.Soap.Fetch fix an error when passing difference formats of Fetch XML with/without '<fetch>..' statements
*       New Fix - XrmServiceToolkit.Extension methods error when retrieving web resources
*   Beta Release for CRM 2013
**********************************************************************************************************
*   Version: 2.1
*   Date: September, 2014
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
*    Changes:
*       Performance Refactor
*       New Fix - XrmServiceToolkit.Common.DisableAllControlsInTab to support CRM2013 changes
*   Beta Release for CRM 2013
**********************************************************************************************************
*   Version: 2.2
*   Date: April, 2015
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
*    Changes:
*       CRM 2015 release
*       New Fix - Error Handling
*       New Fix - XrmServiceToolkit.Soap.Fetch aggregate fix
*       New Fix - XrmServiceToolkit.Soap.Fetch distinct support
*       New Fix - Aliased Values Handling
*   Stable Release for CRM 2013, CRM 2015
**********************************************************************************************************
*   Version: 2.2.1
*   Date: May, 2015
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
*    Changes:
*       CRM 2015 7.1 release
*       New Fix - Added logic for EntityReference in SOAP for 7.1 changes
*   Beta Release for CRM 2015 online Update 1
**********************************************************************************************************
*/
XrmServiceToolkit = function () { }; XrmServiceToolkit.Common = function () {
var alertMessage = function (message) { (window.parent.Xrm.Utility !== undefined && window.parent.Xrm.Utility.alertDialog !== undefined) ? window.parent.Xrm.Utility.alertDialog(message) : alert(message); }; var guidsAreEqual = function (guid1, guid2) {
var isEqual; if (guid1 === null || guid2 === null || guid1 === undefined || guid2 === undefined) { isEqual = false; }
else { isEqual = guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase(); }
return isEqual;
}; var enableField = function (fieldName) { window.parent.Xrm.Page.getControl(fieldName).setDisabled(false); }; var disableField = function (fieldName) { window.parent.Xrm.Page.getControl(fieldName).setDisabled(true); }; var showField = function (fieldName) { window.parent.Xrm.Page.getControl(fieldName).setVisible(true); }; var hideField = function (fieldName) { window.parent.Xrm.Page.getControl(fieldName).setVisible(false); }; var updateRequirementLevel = function (fieldName, levelName) { window.parent.Xrm.Page.getAttribute(fieldName).setRequiredLevel(levelName); }; var showError = function (error) { alertMessage(error.message); }; var getObjectTypeCode = function (entityName) { try { var entityMetaData = XrmServiceToolkit.Soap.RetrieveEntityMetadata("Entity", entityName, false); if (entityMetaData && entityMetaData.length === 1) { return entityMetaData[0].ObjectTypeCode; } else { return null; } } catch (e) { showError(e.message); return null; } }; var addNotification = function (message, level, uniqueId) {
if (window.parent.Xrm.Page.ui.setFormNotification !== undefined) {
if (!!uniqueId) {
window.parent.Xrm.Page.ui.clearFormNotification(uniqueId); if (level === 1) { window.parent.Xrm.Page.ui.setFormNotification(message, "ERROR", uniqueId); }
if (level === 2) { window.parent.Xrm.Page.ui.setFormNotification(message, "INFO", uniqueId); }
if (level === 3) { window.parent.Xrm.Page.ui.setFormNotification(message, "WARNING", uniqueId); }
} else {
var tempUniqueId = "formNotification00"; window.parent.Xrm.Page.ui.clearFormNotification(tempUniqueId); if (level === 1) { window.parent.Xrm.Page.ui.setFormNotification(message, "ERROR", tempUniqueId); }
if (level === 2) { window.parent.Xrm.Page.ui.setFormNotification(message, "INFO", tempUniqueId); }
if (level === 3) { window.parent.Xrm.Page.ui.setFormNotification(message, "WARNING", tempUniqueId); }
}
}
else {
var notificationsArea = document.getElementById('crmNotifications'); if (notificationsArea === null || notificationsArea === undefined) { alertMessage('Cannot find the notification area'); return; }
if (typeof notificationsArea.AddNotification !== "undefined" && typeof notificationsArea.control.AddNotification !== "undefined") { alertMessage('Add Notification is no longer supported'); return; }
if (level === 1) { if (typeof notificationsArea.AddNotification !== "undefined") { notificationsArea.AddNotification('mep1', 1, 'source', message); } else if (typeof notificationsArea.control.AddNotification !== "undefined") { notificationsArea.control.AddNotification('mep1', 1, 'source', message); } }
if (level === 2) { if (typeof notificationsArea.AddNotification !== "undefined") { notificationsArea.AddNotification('mep3', 3, 'source', message); } else if (typeof notificationsArea.control.AddNotification !== "undefined") { notificationsArea.control.AddNotification('mep3', 3, 'source', message); } }
if (level === 3) { if (typeof notificationsArea.AddNotification !== "undefined") { notificationsArea.AddNotification('mep2', 2, 'source', message); } else if (typeof notificationsArea.control.AddNotification !== "undefined") { notificationsArea.control.AddNotification('mep2', 2, 'source', message); } }
if (message === "") { if (typeof notificationsArea.SetNotifications !== "undefined") { notificationsArea.SetNotifications(null, null); } else if (typeof notificationsArea.control.SetNotifications !== "undefined") { notificationsArea.control.SetNotifications(null, null); } else { alertMessage('Set Notification is no longer supported'); } }
}
}; var addControlNotification = function (attributeName, message) { if (window.parent.Xrm.Page.getControl(attributeName).setNotification !== undefined) { window.parent.Xrm.Page.getControl(attributeName).setNotification(message); } }; var calculateDaysBetween = function (datetime1, datetime2) { var oneDay = 1000 * 60 * 60 * 24; var date1Ms = datetime1.getTime(); var date2Ms = datetime2.getTime(); var differenceMs = Math.abs(date1Ms - date2Ms); return Math.round(differenceMs / oneDay); }; var disableAllControlsInTab = function (tabControlNo) { var tabControl = window.parent.Xrm.Page.ui.tabs.get(tabControlNo); if (tabControl != null) { window.parent.Xrm.Page.ui.controls.forEach(function (control) { if (control.getParent() !== null && control.getParent().getParent() != null && control.getParent().getParent() === tabControl && control.getControlType() !== "subgrid") { control.setDisabled(true); } }); } }; var disableAllControlsInSection = function (sectionLabel) { var tabs = window.parent.Xrm.Page.ui.tabs; for (var i = 0, tablength = tabs.getLength() ; i < tablength; i++) { var tab = tabs.get(i); var sections = tab.sections; for (var j = 0, sectionlength = sections.getLength() ; j < sectionlength; j++) { var section = sections.get(j); if (section.getLabel().toLowerCase() === sectionLabel.toLowerCase()) { window.parent.Xrm.Page.ui.controls.forEach(function (control) { if (control.getParent() !== null && control.getParent().getLabel() === sectionLabel && control.getControlType() !== "subgrid") { control.setDisabled(true); } }); break; } } } }; return { EnableField: enableField, DisableField: disableField, ShowField: showField, HideField: hideField, UpdateRequiredLevel: updateRequirementLevel, GetObjectTypeCode: getObjectTypeCode, CalculateDaysBetween: calculateDaysBetween, AddNotification: addNotification, AddControlNotification: addControlNotification, ShowError: showError, GuidsAreEqual: guidsAreEqual, DisableAllControlsInTab: disableAllControlsInTab, DisableAllControlsInSection: disableAllControlsInSection };
}(); XrmServiceToolkit.Rest = function () {
var alertMessage = function (message) { (window.parent.Xrm.Utility !== undefined && window.parent.Xrm.Utility.alertDialog !== undefined) ? window.parent.Xrm.Utility.alertDialog(message) : alert(message); }; var htmlEncode = function (s) {
if (s === null || s === "" || s === undefined) return s; for (var count = 0, buffer = "", hEncode = "", cnt = 0, slength = s.length; cnt < slength; cnt++) {
var c = s.charCodeAt(cnt); if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95)
buffer += String.fromCharCode(c); else buffer += "&#" + c + ";"; if (++count === 500) { hEncode += buffer; buffer = ""; count = 0; }
}
if (buffer.length) hEncode += buffer; return hEncode;
}; var innerSurrogateAmpersandWorkaround = function (s) {
var buffer = ''; var c0; for (var cnt = 0, slength = s.length; cnt < slength; cnt++) {
c0 = s.charCodeAt(cnt); if (c0 >= 55296 && c0 <= 57343)
if (cnt + 1 < s.length) {
var c1 = s.charCodeAt(cnt + 1); if (c1 >= 56320 && c1 <= 57343) { buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++; }
else
buffer += String.fromCharCode(c0);
}
else buffer += String.fromCharCode(c0); else buffer += String.fromCharCode(c0);
}
s = buffer; buffer = ""; for (cnt = 0, slength = s.length; cnt < slength; cnt++) {
c0 = s.charCodeAt(cnt); if (c0 >= 55296 && c0 <= 57343)
buffer += String.fromCharCode(65533); else buffer += String.fromCharCode(c0);
}
s = buffer; s = htmlEncode(s); s = s.replace(/CRMEntityReferenceOpen/g, "&#x"); s = s.replace(/CRMEntityReferenceClose/g, ";"); return s;
}; var crmXmlEncode = function (s) { if ('undefined' === typeof s || 'unknown' === typeof s || null === s) return s; else if (typeof s != "string") s = s.toString(); return innerSurrogateAmpersandWorkaround(s); }; var crmXmlDecode = function (s) { if (typeof s != "string") s = s.toString(); return s; }; var context = function () {
var oContext; if (typeof window.GetGlobalContext != "undefined") { oContext = window.GetGlobalContext(); }
else if (typeof GetGlobalContext != "undefined") { oContext = GetGlobalContext(); }
else {
if (typeof Xrm != "undefined") { oContext = Xrm.Page.context; }
else if (typeof window.parent.Xrm != "undefined") { oContext = window.parent.Xrm.Page.context; }
else { throw new Error("Context is not available."); }
}
return oContext;
}; var getClientUrl = function () {
var serverUrl = typeof context().getClientUrl !== "undefined" ? context().getClientUrl() : context().getServerUrl(); if (serverUrl.match(/\/$/)) { serverUrl = serverUrl.substring(0, serverUrl.length - 1); }
return serverUrl;
}; var oDataPath = function () { return getClientUrl() + "/XRMServices/2011/OrganizationData.svc/"; }; var errorHandler = function (req) {
throw new Error("Error : " +
req.status + ": " +
req.statusText + ": " +
JSON.parse(req.responseText).error.message.value);
}; var dateReviver = function (key, value) {
var a; if (typeof value === 'string') { a = /Date\(([-+]?\d+)\)/.exec(value); if (a) { return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10)); } }
return value;
}; var parameterCheck = function (parameter, message) { if ((typeof parameter === "undefined") || parameter === null) { throw new Error(message); } }; var stringParameterCheck = function (parameter, message) { if (typeof parameter != "string") { throw new Error(message); } }; var callbackParameterCheck = function (callbackParameter, message) { if (typeof callbackParameter != "function") { throw new Error(message); } }; var booleanParameterCheck = function (parameter, message) { if (typeof parameter != "boolean") { throw new Error(message); } }; var getXhr = function () {
if (XMLHttpRequest) { return new XMLHttpRequest(); }
try { return new ActiveXObject('MSXML2.XMLHTTP.6.0'); } catch (e) { try { return new ActiveXObject('MSXML2.XMLHTTP.3.0'); } catch (e) { alertMessage('This browser is not AJAX enabled.'); return null; } }
}; var createRecord = function (object, type, successCallback, errorCallback, async) {
parameterCheck(object, "XrmServiceToolkit.REST.createRecord requires the object parameter."); stringParameterCheck(type, "XrmServiceToolkit.REST.createRecord requires the type parameter is a string."); callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.createRecord requires the successCallback is a function."); callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.createRecord requires the errorCallback is a function."); booleanParameterCheck(async, "XrmServiceToolkit.REST.createRecord requires the async is a boolean."); var req = getXhr(); req.open("POST", oDataPath() + type, async); req.setRequestHeader("Accept", "application/json"); req.setRequestHeader("Content-Type", "application/json; charset=utf-8"); if (async) {
req.onreadystatechange = function () {
if (this.readyState === 4) {
req.onreadystatechange = null; if (req.status === 201) { successCallback(JSON.parse(req.responseText, dateReviver).d); }
else { errorCallback(errorHandler(req)); }
}
}; req.send(JSON.stringify(object));
} else {
req.send(JSON.stringify(object)); if (req.status === 201) { successCallback(JSON.parse(req.responseText, dateReviver).d); }
else { errorCallback(errorHandler(req)); }
}
}; var retrieveRecord = function (id, type, select, expand, successCallback, errorCallback, async) {
stringParameterCheck(id, "XrmServiceToolkit.REST.retrieveRecord requires the id parameter is a string."); stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveRecord requires the type parameter is a string."); if (select != null)
stringParameterCheck(select, "XrmServiceToolkit.REST.retrieveRecord requires the select parameter is a string."); if (expand != null)
stringParameterCheck(expand, "XrmServiceToolkit.REST.retrieveRecord requires the expand parameter is a string."); callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveRecord requires the successCallback parameter is a function."); callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveRecord requires the errorCallback parameter is a function."); booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveRecord requires the async parameter is a boolean."); var systemQueryOptions = ""; if (select != null || expand != null) {
systemQueryOptions = "?"; if (select != null) {
var selectString = "$select=" + select; if (expand != null) { selectString = selectString + "," + expand; }
systemQueryOptions = systemQueryOptions + selectString;
}
if (expand != null) { systemQueryOptions = systemQueryOptions + "&$expand=" + expand; }
}
var req = getXhr(); req.open("GET", oDataPath() + type + "(guid'" + id + "')" + systemQueryOptions, async); req.setRequestHeader("Accept", "application/json"); req.setRequestHeader("Content-Type", "application/json; charset=utf-8"); if (async) {
req.onreadystatechange = function () {
if (req.readyState === 4) {
if (req.status === 200) { successCallback(JSON.parse(req.responseText, dateReviver).d); }
else { errorCallback(errorHandler(req)); }
}
}; req.send();
} else {
req.send(); if (req.status === 200) { successCallback(JSON.parse(req.responseText, dateReviver).d); }
else { errorCallback(errorHandler(req)); }
}
}; var updateRecord = function (id, object, type, successCallback, errorCallback, async) {
stringParameterCheck(id, "XrmServiceToolkit.REST.updateRecord requires the id parameter."); parameterCheck(object, "XrmServiceToolkit.REST.updateRecord requires the object parameter."); stringParameterCheck(type, "XrmServiceToolkit.REST.updateRecord requires the type parameter."); callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.updateRecord requires the successCallback is a function."); callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.updateRecord requires the errorCallback is a function."); booleanParameterCheck(async, "XrmServiceToolkit.REST.updateRecord requires the async parameter is a boolean."); var req = getXhr(); req.open("POST", oDataPath() + type + "(guid'" + id + "')", async); req.setRequestHeader("Accept", "application/json"); req.setRequestHeader("Content-Type", "application/json; charset=utf-8"); req.setRequestHeader("X-HTTP-Method", "MERGE"); if (async) {
req.onreadystatechange = function () {
if (req.readyState === 4) {
if (req.status === 204 || req.status === 1223) { successCallback(); }
else { errorCallback(errorHandler(req)); }
}
}; req.send(JSON.stringify(object));
} else {
req.send(JSON.stringify(object)); if (req.status === 204 || req.status === 1223) { successCallback(); }
else { errorCallback(errorHandler(req)); }
}
}; var deleteRecord = function (id, type, successCallback, errorCallback, async) {
stringParameterCheck(id, "XrmServiceToolkit.REST.deleteRecord requires the id parameter."); stringParameterCheck(type, "XrmServiceToolkit.REST.deleteRecord requires the type parameter."); callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.deleteRecord requires the successCallback is a function."); callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.deleteRecord requires the errorCallback is a function."); booleanParameterCheck(async, "XrmServiceToolkit.REST.deleteRecord requires the async parameter is a boolean."); var req = getXhr(); req.open("POST", oDataPath() + type + "(guid'" + id + "')", async); req.setRequestHeader("Accept", "application/json"); req.setRequestHeader("Content-Type", "application/json; charset=utf-8"); req.setRequestHeader("X-HTTP-Method", "DELETE"); if (async) {
req.onreadystatechange = function () {
if (req.readyState === 4) {
if (req.status === 204 || req.status === 1223) { successCallback(); }
else { errorCallback(errorHandler(req)); }
}
}; req.send();
} else {
req.send(); if (req.status === 204 || req.status === 1223) { successCallback(); }
else { errorCallback(errorHandler(req)); }
}
}; var retrieveMultipleRecords = function (type, options, successCallback, errorCallback, onComplete, async) {
stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the type parameter is a string."); if (options != null)
stringParameterCheck(options, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the options parameter is a string."); callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the successCallback parameter is a function."); callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the errorCallback parameter is a function."); callbackParameterCheck(onComplete, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the OnComplete parameter is a function."); booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the async parameter is a boolean."); var optionsString = ''; if (options != null) {
if (options.charAt(0) !== "?") { optionsString = "?" + options; }
else { optionsString = options; }
}
var req = getXhr(); req.open("GET", oDataPath() + type + optionsString, async); req.setRequestHeader("Accept", "application/json"); req.setRequestHeader("Content-Type", "application/json; charset=utf-8"); if (async) {
req.onreadystatechange = function () {
if (req.readyState === 4) {
if (req.status === 200) { var returned = JSON.parse(req.responseText, dateReviver).d; successCallback(returned.results); if (returned.__next == null) { onComplete(); } else { var queryOptions = returned.__next.substring((oDataPath() + type).length); retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, onComplete, async); } }
else { errorCallback(errorHandler(req)); }
}
}; req.send();
} else {
req.send(); if (req.status === 200) { var returned = JSON.parse(req.responseText, dateReviver).d; successCallback(returned.results); if (returned.__next == null) { onComplete(); } else { var queryOptions = returned.__next.substring((oDataPath() + type).length); retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, onComplete, async); } }
else { errorCallback(errorHandler(req)); }
}
}; var performRequest = function (settings) {
parameterCheck(settings, "The value passed to the performRequest function settings parameter is null or undefined."); var request = getXhr(); request.open(settings.type, settings.url, settings.async); request.setRequestHeader("Accept", "application/json"); if (settings.action != null) { request.setRequestHeader("X-HTTP-Method", settings.action); }
request.setRequestHeader("Content-Type", "application/json; charset=utf-8"); if (settings.async) {
request.onreadystatechange = function () {
if (request.readyState === 4) {
if (request.status === 204 || request.status === 1223 || request.status === 201) { settings.success(request); }
else {
if (settings.error) { settings.error(errorHandler(request)); }
else { errorHandler(request); }
}
}
}; if (typeof settings.data === "undefined") { request.send(); }
else { request.send(settings.data); }
} else {
if (typeof settings.data === "undefined") { request.send(); }
else { request.send(settings.data); }
if (request.status === 204 || request.status === 1223 || request.status === 201) { settings.success(request); }
else {
if (settings.error) { settings.error(errorHandler(request)); }
else { errorHandler(request); }
}
}
}; var associateRecord = function (entityid1, odataSetName1, entityid2, odataSetName2, relationship, successCallback, errorCallback, async) { parameterCheck(entityid1, "XrmServiceToolkit.REST.associateRecord requires the entityid1 parameter."); parameterCheck(odataSetName1, "XrmServiceToolkit.REST.associateRecord requires the odataSetName1 parameter."); parameterCheck(entityid2, "XrmServiceToolkit.REST.associateRecord requires the entityid2 parameter."); parameterCheck(odataSetName2, "XrmServiceToolkit.REST.associateRecord requires the odataSetName2 parameter."); parameterCheck(relationship, "XrmServiceToolkit.REST.associateRecord requires the relationship parameter."); callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.associateRecord requires the successCallback is a function."); callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.associateRecord requires the errorCallback is a function."); booleanParameterCheck(async, "XrmServiceToolkit.REST.associateRecord requires the async parameter is a boolean"); var entity2 = {}; entity2.uri = oDataPath() + "/" + odataSetName2 + "(guid'" + entityid2 + "')"; var jsonEntity = window.JSON.stringify(entity2); performRequest({ type: "POST", url: oDataPath() + "/" + odataSetName1 + "(guid'" + entityid1 + "')/$links/" + relationship, data: jsonEntity, success: successCallback, error: errorCallback, async: async }); }; var disassociateRecord = function (entityid1, odataSetName, entityid2, relationship, successCallback, errorCallback, async) { parameterCheck(entityid1, "XrmServiceToolkit.REST.disassociateRecord requires the entityid1 parameter."); parameterCheck(odataSetName, "XrmServiceToolkit.REST.disassociateRecord requires the odataSetName parameter."); parameterCheck(entityid2, "XrmServiceToolkit.REST.disassociateRecord requires the entityid2 parameter."); parameterCheck(relationship, "XrmServiceToolkit.REST.disassociateRecord requires the relationship parameter."); callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.disassociateRecord requires the successCallback is a function."); callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.disassociateRecord requires the errorCallback is a function."); booleanParameterCheck(async, "XrmServiceToolkit.REST.disassociateRecord requires the async parameter is a boolean."); var url = oDataPath() + "/" + odataSetName + "(guid'" + entityid1 + "')/$links/" + relationship + "(guid'" + entityid2 + "')"; performRequest({ url: url, type: "POST", action: "DELETE", error: errorCallback, success: successCallback, async: async }); }; return { Create: createRecord, Retrieve: retrieveRecord, Update: updateRecord, Delete: deleteRecord, RetrieveMultiple: retrieveMultipleRecords, Associate: associateRecord, Disassociate: disassociateRecord };
}(); XrmServiceToolkit.Soap = function () {
var alertMessage = function (message) { (window.parent.Xrm.Utility !== undefined && window.parent.Xrm.Utility.alertDialog !== undefined) ? window.parent.Xrm.Utility.alertDialog(message) : alert(message); }; var htmlEncode = function (s) {
if (s === null || s === "" || s === undefined) return s; for (var count = 0, buffer = "", hEncode = "", cnt = 0, sLength = s.length; cnt < sLength; cnt++) {
var c = s.charCodeAt(cnt); if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95)
buffer += String.fromCharCode(c); else buffer += "&#" + c + ";"; if (++count === 500) { hEncode += buffer; buffer = ""; count = 0; }
}
if (buffer.length) hEncode += buffer; return hEncode;
}; var innerSurrogateAmpersandWorkaround = function (s) {
var buffer = ''; var c0; var cnt; var cntlength; for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
c0 = s.charCodeAt(cnt); if (c0 >= 55296 && c0 <= 57343)
if (cnt + 1 < s.length) {
var c1 = s.charCodeAt(cnt + 1); if (c1 >= 56320 && c1 <= 57343) { buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++; }
else
buffer += String.fromCharCode(c0);
}
else buffer += String.fromCharCode(c0); else buffer += String.fromCharCode(c0);
}
s = buffer; buffer = ""; for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
c0 = s.charCodeAt(cnt); if (c0 >= 55296 && c0 <= 57343)
buffer += String.fromCharCode(65533); else buffer += String.fromCharCode(c0);
}
s = buffer; s = htmlEncode(s); s = s.replace(/CRMEntityReferenceOpen/g, "&#x"); s = s.replace(/CRMEntityReferenceClose/g, ";"); return s;
}; var crmXmlEncode = function (s) { if ('undefined' === typeof s || 'unknown' === typeof s || null === s) return s; else if (typeof s != "string") s = s.toString(); return innerSurrogateAmpersandWorkaround(s); }; var crmXmlDecode = function (s) { if (typeof s != "string") s = s.toString(); return s; }; var padNumber = function (s, len) {
len = len || 2; s = '' + s; while (s.length < len) { s = "0" + s; }
return s;
}; var encodeDate = function (dateTime) {
return dateTime.getFullYear() + "-" +
padNumber(dateTime.getMonth() + 1) + "-" +
padNumber(dateTime.getDate()) + "T" +
padNumber(dateTime.getHours()) + ":" +
padNumber(dateTime.getMinutes()) + ":" +
padNumber(dateTime.getSeconds());
}; var encodeValue = function (value) {
if (typeof value == typeof "" && value.slice(0, 1) === "{" && value.slice(-1) === "}") { value = value.slice(1, -1); }
return (typeof value === "object" && value.getTime) ? encodeDate(value) : crmXmlEncode(value);
}; var context = function () {
var oContext; if (typeof window.GetGlobalContext != "undefined") { oContext = window.GetGlobalContext(); }
else if (typeof GetGlobalContext != "undefined") { oContext = GetGlobalContext(); }
else {
if (typeof Xrm != "undefined") { oContext = Xrm.Page.context; }
else if (typeof window.parent.Xrm != "undefined") { oContext = window.parent.Xrm.Page.context; }
else { throw new Error("Context is not available."); }
}
return oContext;
}; var getClientUrl = function () {
var serverUrl = typeof context().getClientUrl != 'undefined' ? context().getClientUrl() : context().getServerUrl(); if (serverUrl.match(/\/$/)) { serverUrl = serverUrl.substring(0, serverUrl.length - 1); }
return serverUrl;
}; var orgServicePath = function () { return getClientUrl() + "/XRMServices/2011/Organization.svc/web"; }; var dateReviver = function (key, value) {
var a; if (typeof value === 'string') { a = /Date\(([-+]?\d+)\)/.exec(value); if (a) { return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10)); } }
return value;
}; var xrmValue = function (sType, sValue) { this.type = sType; this.value = sValue; }; var xrmEntityReference = function (gId, sLogicalName, sName) { this.id = gId; this.logicalName = sLogicalName; this.name = sName; this.type = 'EntityReference'; }; var xrmEntityCollection = function (items) { this.value = items; this.type = 'EntityCollection'; }; var xrmOptionSetValue = function (iValue, sFormattedValue) { this.value = iValue; this.formattedValue = sFormattedValue; this.type = 'OptionSetValue'; }; var businessEntity = function (logicalName, id) { this.id = (!id) ? "00000000-0000-0000-0000-000000000000" : id; this.logicalName = logicalName; this.attributes = new Object(); }; var stringToDate = function (s) { var b = s.split(/\D/); return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5])); }; var nsResolver = function (prefix) { var ns = { "s": "http://schemas.xmlsoap.org/soap/envelope/", "a": "http://schemas.microsoft.com/xrm/2011/Contracts", "i": "http://www.w3.org/2001/XMLSchema-instance", "b": "http://schemas.datacontract.org/2004/07/System.Collections.Generic", "c": "http://schemas.microsoft.com/xrm/2011/Metadata", "ser": "http://schemas.microsoft.com/xrm/2011/Contracts/Services" }; return ns[prefix] || null; }; var isNodeNull = function (node) {
if (node == null)
{ return true; }
if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value === "true"))
{ return true; }
return false;
}; var selectNodes = function (node, xPathExpression) {
if (typeof (node.selectNodes) != "undefined") { return node.selectNodes(xPathExpression); }
else {
var output = []; var xPathResults = node.evaluate(xPathExpression, node, nsResolver, XPathResult.ANY_TYPE, null); var result = xPathResults.iterateNext(); while (result) { output.push(result); result = xPathResults.iterateNext(); }
return output;
}
}; var selectSingleNode = function (node, xpathExpr) {
if (typeof (node.selectSingleNode) != "undefined") { return node.selectSingleNode(xpathExpr); }
else { var xpe = new XPathEvaluator(); var results = xpe.evaluate(xpathExpr, node, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null); return results.singleNodeValue; }
}; var selectSingleNodeText = function (node, xpathExpr) {
var x = selectSingleNode(node, xpathExpr); if (isNodeNull(x))
{ return null; }
if (typeof (x.text) != "undefined") { return x.text; }
else { return x.textContent; }
}; var getNodeText = function (node) {
if (typeof (node.text) != "undefined") { return node.text; }
else { return node.textContent; }
}; var setSelectionNamespaces = function (doc) { var namespaces = ["xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'", "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'", "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'", "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'", "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'", "xmlns:ser='http://schemas.microsoft.com/xrm/2011/Contracts/Services'"]; doc.setProperty("SelectionNamespaces", namespaces.join(" ")); }; var xmlParser = function (txt) {
var xmlDoc = null; try { xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); xmlDoc.async = false; xmlDoc.loadXML(txt); } catch (e) { if (window.DOMParser) { var parser = new DOMParser(); xmlDoc = parser.parseFromString(txt, "text/xml"); } else { alertMessage("Cannot convert the XML string to a cross-browser XML object."); } }
return xmlDoc;
}; var xmlToString = function (responseXml) {
var xmlString = ''; try {
if (responseXml != null) {
if (typeof XMLSerializer !== "undefined" && typeof responseXml.xml === "undefined") { xmlString = (new XMLSerializer()).serializeToString(responseXml); } else {
if (typeof responseXml.xml !== "undefined") { xmlString = responseXml.xml; }
else if (typeof responseXml[0].xml !== "undefined") { xmlString = responseXml[0].xml; }
}
}
} catch (e) { alertMessage("Cannot convert the XML to a string."); }
return xmlString;
}; businessEntity.prototype = {
serialize: function () {
var xml = ["<b:value i:type='a:Entity'>"]; xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">'); var attributes = this.attributes; for (var attributeName in attributes) {
if (attributes.hasOwnProperty(attributeName)) {
var attribute = attributes[attributeName]; xml.push("<a:KeyValuePairOfstringanyType>"); xml.push("<b:key>", attributeName, "</b:key>"); if (attribute === null || attribute.value === null) { xml.push("<b:value i:nil='true' />"); } else {
var sType = (!attribute.type) ? typeof attribute : crmXmlEncode(attribute.type); var value; var encodedValue; var id; var encodedId; var logicalName; var encodedLogicalName; switch (sType) {
case "OptionSetValue": value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute; encodedValue = encodeValue(value); xml.push("<b:value i:type='a:OptionSetValue'>"); xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>"); break; case "EntityCollection": xml.push("<b:value i:type='a:EntityCollection'>"); xml.push("<a:Entities>"); value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute; var collections = isArray(value) ? value : [value]; for (var i = 0, collectionLengh = collections.length; i < collectionLengh; i++) {
var item = collections[i]; id = (item.hasOwnProperty("id")) ? item["id"] : item; encodedId = encodeValue(id); logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item; encodedLogicalName = encodeValue(logicalName); xml.push("<a:Entity>"); xml.push("<a:Attributes>"); xml.push("<a:KeyValuePairOfstringanyType>"); xml.push("<b:key>partyid</b:key>"); xml.push("<b:value i:type='a:EntityReference'>"); xml.push("<a:Id>", encodedId, "</a:Id>"); if (window.parent.Xrm.Utility.openQuickCreate !== undefined) { xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />"); }
xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>"); xml.push("<a:Name i:nil='true' />"); if (window.parent.Xrm.Utility.openQuickCreate !== undefined) { xml.push("<a:RowVersion i:nil='true' />"); }
xml.push("</b:value>"); xml.push("</a:KeyValuePairOfstringanyType>"); xml.push("</a:Attributes>"); xml.push("<a:EntityState i:nil='true' />"); xml.push("<a:FormattedValues />"); xml.push("<a:Id>00000000-0000-0000-0000-000000000000</a:Id>"); xml.push("<a:LogicalName>activityparty</a:LogicalName>"); xml.push("<a:RelatedEntities />"); xml.push("</a:Entity>");
}
xml.push("</a:Entities>"); xml.push("<a:EntityName i:nil='true' />"); xml.push("<a:MinActiveRowVersion i:nil='true' />"); xml.push("<a:MoreRecords>false</a:MoreRecords>"); xml.push("<a:PagingCookie i:nil='true' />"); xml.push("<a:TotalRecordCount>0</a:TotalRecordCount>"); xml.push("<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>"); xml.push("</b:value>"); break; case "EntityReference": id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute; encodedId = encodeValue(id); logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute; encodedLogicalName = encodeValue(logicalName); xml.push("<b:value i:type='a:EntityReference'>"); xml.push("<a:Id>", encodedId, "</a:Id>"); if (window.parent.Xrm.Utility.openQuickCreate !== undefined) { xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />"); }
xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>"); xml.push("<a:Name i:nil='true' />"); if (window.parent.Xrm.Utility.openQuickCreate !== undefined) { xml.push("<a:RowVersion i:nil='true' />"); }
xml.push("</b:value>"); break; case "Money": value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute; encodedValue = encodeValue(value); xml.push("<b:value i:type='a:Money'>"); xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>"); break; case "guid": value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute; encodedValue = encodeValue(value); xml.push("<b:value i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>"); xml.push(encodedValue, "</b:value>"); break; case "number": value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute; encodedValue = encodeValue(value); var oType = (parseInt(encodedValue) === encodedValue) ? "c:int" : "c:decimal"; xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>"); xml.push(encodedValue, '</b:value>'); break; default: value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute; encodedValue = encodeValue(value); sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType; xml.push("<b:value i:type='c:", sType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>", encodedValue, "</b:value>"); break;
}
}
xml.push("</a:KeyValuePairOfstringanyType>");
}
}
xml.push("</a:Attributes><a:EntityState i:nil='true' />"); xml.push("<a:FormattedValues xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />"); xml.push("<a:Id>", encodeValue(this.id), "</a:Id>"); xml.push("<a:LogicalName>", this.logicalName, "</a:LogicalName>"); xml.push("<a:RelatedEntities xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />"); xml.push("</b:value>"); return xml.join("");
}, deserialize: function (resultNode) {
var obj = new Object(); var resultNodes = resultNode.childNodes; for (var j = 0, lenj = resultNodes.length; j < lenj; j++) {
var sKey; var parentNode = resultNodes[j]; switch (parentNode.nodeName) {
case "a:Attributes": var attr = parentNode; for (var k = 0, lenk = attr.childNodes.length; k < lenk; k++) {
var tempParentNode = attr.childNodes[k]; var tempParentNodeChildNodes = tempParentNode.childNodes; sKey = getNodeText(tempParentNodeChildNodes[0]); var tempNode = tempParentNodeChildNodes[1]; var sType = tempNode.attributes.getNamedItem("i:type").value; if (sType.replace('c:', '').replace('a:', '') === "AliasedValue") { var subNode = tempNode.childNodes[2]; sType = subNode.attributes.getNamedItem("i:type").value; tempNode = subNode; }
var entRef; var entCv; switch (sType) {
case "a:OptionSetValue": var entOsv = new xrmOptionSetValue(); entOsv.type = sType.replace('a:', ''); entOsv.value = parseInt(getNodeText(tempNode)); obj[sKey] = entOsv; break; case "a:EntityReference": entRef = new xrmEntityReference(); entRef.type = sType.replace('a:', ''); var oChildNodes = tempNode.childNodes; for (var i = 0, leni = oChildNodes.length; i < leni; i++) { var entityReferenceNode = oChildNodes[i]; switch (entityReferenceNode.nodeName) { case "a:Id": entRef.id = getNodeText(entityReferenceNode); break; case "a:LogicalName": entRef.logicalName = getNodeText(entityReferenceNode); break; case "a:Name": entRef.name = getNodeText(entityReferenceNode); break; } }
obj[sKey] = entRef; break; case "a:EntityCollection": entRef = new xrmEntityCollection(); entRef.type = sType.replace('a:', ''); var items = []; var partyNodes = tempNode.childNodes; for (var y = 0, leny = partyNodes[0].childNodes.length; y < leny; y++) {
var itemNodes = tempParentNode.childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes; for (var z = 0, lenz = itemNodes.length; z < lenz; z++) {
    var itemNodeChildNodes = itemNodes[z].childNodes; var nodeText = getNodeText(itemNodeChildNodes[0]); if (nodeText === "partyid") {
        var itemRef = new xrmEntityReference(); var partyListNodes = itemNodeChildNodes[1].childNodes; for (var pi = 0, lenpi = partyListNodes.length; pi < lenpi; pi++) { var partyReferenceNode = partyListNodes[i]; switch (partyReferenceNode.nodeName) { case "a:Id": itemRef.id = getNodeText(partyReferenceNode); break; case "a:LogicalName": itemRef.logicalName = getNodeText(partyReferenceNode); break; case "a:Name": itemRef.name = getNodeText(partyReferenceNode); break; } }
        items[y] = itemRef;
    }
}
}
entRef.value = items; obj[sKey] = entRef; break; case "a:Money": entCv = new xrmValue(); entCv.type = sType.replace('a:', ''); entCv.value = parseFloat(getNodeText(tempNode)); obj[sKey] = entCv; break; default: entCv = new xrmValue(); entCv.type = sType.replace('c:', '').replace('a:', ''); if (entCv.type === "int") { entCv.value = parseInt(getNodeText(tempNode)); }
else if (entCv.type === "decimal" || entCv.type === "double") { entCv.value = parseFloat(getNodeText(tempNode)); }
else if (entCv.type === "dateTime") { entCv.value = stringToDate(getNodeText(tempNode)); }
else if (entCv.type === "boolean") { entCv.value = (getNodeText(tempNode) === 'false') ? false : true; }
else { entCv.value = getNodeText(tempNode); }
    obj[sKey] = entCv; break;
}
}
this.attributes = obj; break; case "a:Id": this.id = getNodeText(parentNode); break; case "a:LogicalName": this.logicalName = getNodeText(parentNode); break; case "a:FormattedValues": var foVal = parentNode; for (var o = 0, leno = foVal.childNodes.length; o < leno; o++) { var foNode = foVal.childNodes[o]; sKey = getNodeText(foNode.childNodes[0]); this.attributes[sKey].formattedValue = getNodeText(foNode.childNodes[1]); if (isNaN(this.attributes[sKey].value) && this.attributes[sKey].type === "dateTime") { this.attributes[sKey].value = new Date(this.attributes[sKey].formattedValue); } }
break;
}
}
}
}; var getError = function (async, resp, internalCallback) {
if (resp.status === 12029)
{ throw new Error("The attempt to connect to the server failed."); }
if (resp.status === 12007)
{ throw new Error("The server name could not be resolved."); }
var faultXml = resp.responseXML; var errorMessage = "Unknown (unable to parse the fault)"; if (faultXml !== null && typeof faultXml == "object") {
var faultstring = null; var errorCode = null; var bodyNode = faultXml.firstChild.firstChild; for (var i = 0; i < bodyNode.childNodes.length; i++) {
var node = bodyNode.childNodes[i]; if ("s:Fault" === node.nodeName) {
for (var j = 0; j < node.childNodes.length; j++) {
var testNode = node.childNodes[j]; if ("faultstring" === testNode.nodeName) { faultstring = getNodeText(testNode); }
if ("detail" === testNode.nodeName) { for (var k = 0; k < testNode.childNodes.length; k++) { var orgServiceFault = testNode.childNodes[k]; if ("OrganizationServiceFault" === orgServiceFault.nodeName) { for (var l = 0; l < orgServiceFault.childNodes.length; l++) { var errorCodeNode = orgServiceFault.childNodes[l]; if ("ErrorCode" === errorCodeNode.nodeName) { errorCode = getNodeText(errorCodeNode); break; } } } } }
}
break;
}
}
}
if (errorCode != null && faultstring != null) { errorMessage = "Error Code:" + errorCode + " Message: " + faultstring; }
else { if (faultstring != null) { errorMessage = faultstring; } }
if (async) { return errorMessage; } else { throw new Error(errorMessage); }
}; var doRequest = function (soapBody, requestType, async, internalCallback) {
async = async || false; var soapXml = ["<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>", "<soap:Body>", "<", requestType, " xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>", soapBody, "</", requestType, ">", "</soap:Body>", "</soap:Envelope>"].join(""); var req = new XMLHttpRequest(); req.open("POST", orgServicePath(), async); req.setRequestHeader("Accept", "application/xml, text/xml, */*"); req.setRequestHeader("Content-Type", "text/xml; charset=utf-8"); req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/" + requestType); try { req.responseType = 'msxml-document'; } catch (e) { }
if (async) {
req.onreadystatechange = function () {
if (req.readyState === 4) {
req.onreadystatechange = null; if (req.status === 200) {
var doc = req.responseXML; try { setSelectionNamespaces(doc); } catch (e) { }
internalCallback(doc, null);
}
else { internalCallback(null, getError(true, req)); }
}
}; req.send(soapXml);
}
else {
req.send(soapXml); if (req.status === 200) {
var doc = req.responseXML; try { setSelectionNamespaces(doc); } catch (e) { }
var result = doc; return !!internalCallback ? internalCallback(result) : result;
} else { getError(false, req); }
}
}; var sCreate = function (be, callback) {
var request = be.serialize(); var async = !!callback; var mBody = ["<request i:type='a:CreateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Target</b:key>", request, "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>Create</a:RequestName>", "</request>"].join(""); return doRequest(mBody, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//b:value"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var sUpdate = function (be, callback) {
var request = be.serialize(); var async = !!callback; var mBody = ["<request i:type='a:UpdateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Target</b:key>", request, "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>Update</a:RequestName>", "</request>"].join(""); return doRequest(mBody, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//a:Results"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var sDelete = function (entityName, id, callback) {
var request = ["<request i:type='a:DeleteRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'><a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'><a:KeyValuePairOfstringanyType><b:key>Target</b:key><b:value i:type='a:EntityReference'><a:Id>", id, "</a:Id><a:LogicalName>", entityName, "</a:LogicalName><a:Name i:nil='true' /></b:value></a:KeyValuePairOfstringanyType></a:Parameters><a:RequestId i:nil='true' /><a:RequestName>Delete</a:RequestName></request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//a:Results"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var execute = function (request, callback) {
var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
if (!async)
return resultXml; else
callback(resultXml);
});
}; var fetchMore = function (fetchCoreXml, pageNumber, pageCookie, fetchResults) {
var moreFetchXml = ["<fetch mapping='logical' page='" + pageNumber + "' count='5000' paging-cookie='" + pageCookie + "'>", fetchCoreXml.replace(/\"/g, "'"), "</fetch>"].join(""); var moreMsgBody = ["<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Query</b:key>", "<b:value i:type='a:FetchExpression'>", "<a:Query>", crmXmlEncode(moreFetchXml), "</a:Query>", "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true'/>", "<a:RequestName>RetrieveMultiple</a:RequestName>", "</request>"].join(""); return doRequest(moreMsgBody, "Execute", false, function (moreResultXml) {
var newFetchResult = selectSingleNode(moreResultXml, "//a:Entities"); var newMoreRecords = (selectSingleNodeText(moreResultXml, "//a:MoreRecords") === "true"); for (var iii = 0, nLength = newFetchResult.childNodes.length; iii < nLength; iii++) { var entity = new businessEntity(); entity.deserialize(newFetchResult.childNodes[iii]); fetchResults.push(entity); }
if (newMoreRecords) {
pageNumber += 1; var temp = selectSingleNodeText(moreResultXml, "//a:PagingCookie"); var newPageCookie = ""; if ((temp != undefined) && (temp != null) && (temp != "undefined")) { newPageCookie = temp.replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');; }
fetchMore(fetchCoreXml, pageNumber, newPageCookie, fetchResults);
} else { return fetchResults; }
});
}; var fetch = function (fetchCore, fetchAll, callback, errorCallback) {
var fetchXml = fetchCore.replace(/\"/g, "'"); var request = ["<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Query</b:key>", "<b:value i:type='a:FetchExpression'>", "<a:Query>", crmXmlEncode(fetchXml), "</a:Query>", "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true'/>", "<a:RequestName>RetrieveMultiple</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml, errorMessage) {
if ((resultXml == null) && (errorMessage != null) && (async)) {
if (errorCallback) { errorCallback(errorMessage); } else { throw new Error(errorMessage); }
return null;
}
var fetchResult = selectSingleNode(resultXml, "//a:Entities"); var moreRecords = (selectSingleNodeText(resultXml, "//a:MoreRecords") === "true"); var fetchResults = []; if (fetchResult != null) {
for (var ii = 0, olength = fetchResult.childNodes.length; ii < olength; ii++) { var entity = new businessEntity(); entity.deserialize(fetchResult.childNodes[ii]); fetchResults.push(entity); }
var pageCookie = ""; if (moreRecords) { var temp = selectSingleNodeText(resultXml, "//a:PagingCookie"); if ((temp != undefined) && (temp != null) && (temp != "undefined")) { pageCookie = temp.replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;'); } }
if (!async) { return fetchResults; } else { callback(fetchResults, moreRecords, pageCookie); }
}
});
}; var retrieve = function (entityName, id, columnSet, callback) {
var attributes = ""; var query = ""; if (columnSet != null) {
for (var i = 0, ilength = columnSet.length; i < ilength; i++) { attributes += "<c:string>" + columnSet[i] + "</c:string>"; }
query = "<a:AllColumns>false</a:AllColumns>" + "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
attributes + "</a:Columns>";
}
else { query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />"; }
var msgBody = ["<request i:type='a:RetrieveRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Target</b:key>", "<b:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(id), "</a:Id>", "<a:LogicalName>", entityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>ColumnSet</b:key>", "<b:value i:type='a:ColumnSet'>", query, "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>Retrieve</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(msgBody, "Execute", !!callback, function (resultXml) {
var retrieveResult = selectSingleNode(resultXml, "//b:value"); var entity = new businessEntity(); entity.deserialize(retrieveResult); if (!async)
return entity; else
callback(entity);
});
}; var retrieveMultiple = function (query, callback) {
var request = ["<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Query</b:key>", "<b:value i:type='a:QueryExpression'>", query, "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true'/>", "<a:RequestName>RetrieveMultiple</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var resultNodes = selectSingleNode(resultXml, "//a:Entities"); var retriveMultipleResults = []; for (var i = 0, ilength = resultNodes.childNodes.length; i < ilength; i++) { var entity = new businessEntity(); entity.deserialize(resultNodes.childNodes[i]); retriveMultipleResults[i] = entity; }
if (!async)
return retriveMultipleResults; else
callback(retriveMultipleResults);
});
}; var joinArray = function (prefix, array, suffix) {
var output = []; for (var i = 0, ilength = array.length; i < ilength; i++) { if (array[i] !== "" && array[i] != undefined) { output.push(prefix, array[i], suffix); } }
return output.join("");
}; var joinConditionPair = function (attributes, values) {
var output = []; for (var i = 0, ilength = attributes.length; i < ilength; i++) {
if (attributes[i] !== "") {
var value1 = values[i]; if (typeof value1 == typeof []) {
output.push("<condition attribute='", attributes[i], "' operator='in' >"); for (var valueIndex in value1) { if (value1.hasOwnProperty(valueIndex)) { var value = encodeValue(value1[valueIndex]); output.push("<value>" + value + "</value>"); } }
output.push("</condition>");
}
else if (typeof value1 == typeof "") { output.push("<condition attribute='", attributes[i], "' operator='eq' value='", encodeValue(value1), "' />"); }
}
}
return output.join("");
}; var isArray = function (input) { return input.constructor.toString().indexOf("Array") !== -1; }; var queryByAttribute = function (queryOptions, callback) { var entityName = queryOptions.entityName; var attributes = queryOptions.attributes; var values = queryOptions.values; var columnSet = queryOptions.columnSet; var orderBy = queryOptions.orderBy || ''; attributes = isArray(attributes) ? attributes : [attributes]; values = isArray(values) ? values : [values]; orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy]; columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet]; var xml = ["<entity name='", entityName, "'>", joinArray("<attribute name='", columnSet, "' />"), joinArray("<order attribute='", orderBy, "' />"), "<filter>", joinConditionPair(attributes, values), "</filter>", "</entity>"].join(""); return fetch(xml, false, callback); }; var queryAll = function (queryOptions, callback) { var entityName = queryOptions.entityName; var attributes = queryOptions.attributes; var values = queryOptions.values; var columnSet = queryOptions.columnSet; var orderBy = queryOptions.orderBy || ''; attributes = isArray(attributes) ? attributes : [attributes]; values = isArray(values) ? values : [values]; orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy]; columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet]; var fetchCore = ["<entity name='", entityName, "'>", joinArray("<attribute name='", columnSet, "' />"), joinArray("<order attribute='", orderBy, "' />"), "<filter>", joinConditionPair(attributes, values), "</filter>", "</entity>"].join(""); var async = !!callback; return fetch(fetchCore, true, async); }; var setState = function (entityName, id, stateCode, statusCode, callback) {
var request = ["<request i:type='b:SetStateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<c:key>EntityMoniker</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(id), "</a:Id>", "<a:LogicalName>", entityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<c:key>State</c:key>", "<c:value i:type='a:OptionSetValue'>", "<a:Value>", stateCode.toString(), "</a:Value>", "</c:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<c:key>Status</c:key>", "<c:value i:type='a:OptionSetValue'>", "<a:Value>", statusCode.toString(), "</a:Value>", "</c:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>SetState</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var associate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
var relatedEntities = relatedBusinessEntities; relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities]; var output = []; for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) { if (relatedEntities[i].id !== "") { output.push("<a:EntityReference>", "<a:Id>", relatedEntities[i].id, "</a:Id>", "<a:LogicalName>", relatedEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</a:EntityReference>"); } }
var relatedXml = output.join(""); var request = ["<request i:type='a:AssociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Target</b:key>", "<b:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(targetId), "</a:Id>", "<a:LogicalName>", targetEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>Relationship</b:key>", "<b:value i:type='a:Relationship'>", "<a:PrimaryEntityRole>Referenced</a:PrimaryEntityRole>", "<a:SchemaName>", relationshipName, "</a:SchemaName>", "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>RelatedEntities</b:key>", "<b:value i:type='a:EntityReferenceCollection'>", relatedXml, "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>Associate</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var disassociate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
var relatedEntities = relatedBusinessEntities; relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities]; var output = []; for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) { if (relatedEntities[i].id !== "") { output.push("<a:EntityReference>", "<a:Id>", relatedEntities[i].id, "</a:Id>", "<a:LogicalName>", relatedEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</a:EntityReference>"); } }
var relatedXml = output.join(""); var request = ["<request i:type='a:DisassociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<b:key>Target</b:key>", "<b:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(targetId), "</a:Id>", "<a:LogicalName>", targetEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>Relationship</b:key>", "<b:value i:type='a:Relationship'>", "<a:PrimaryEntityRole i:nil='true' />", "<a:SchemaName>", relationshipName, "</a:SchemaName>", "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>RelatedEntities</b:key>", "<b:value i:type='a:EntityReferenceCollection'>", relatedXml, "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>Disassociate</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var getCurrentUserId = function () { var request = ["<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />", "<a:RequestId i:nil='true' />", "<a:RequestName>WhoAmI</a:RequestName>", "</request>"].join(""); var xmlDoc = doRequest(request, "Execute"); return getNodeText(selectNodes(xmlDoc, "//b:value")[0]); }; var getCurrentUserBusinessUnitId = function () { var request = ["<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />", "<a:RequestId i:nil='true' />", "<a:RequestName>WhoAmI</a:RequestName>", "</request>"].join(""); var xmlDoc = doRequest(request, "Execute"); return getNodeText(selectNodes(xmlDoc, "//b:value")[1]); }; var getCurrentUserRoles = function () {
var xml = ["<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>", "<entity name='role'>", "<attribute name='name' />", "<attribute name='businessunitid' />", "<attribute name='roleid' />", "<order attribute='name' descending='false' />" + "<link-entity name='systemuserroles' from='roleid' to='roleid' visible='false' intersect='true'>", "<link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='aa'>", "<filter type='and'>", "<condition attribute='systemuserid' operator='eq-userid' />", "</filter>", "</link-entity>", "</link-entity>", "</entity>", "</fetch>"].join(""); var fetchResult = fetch(xml); var roles = []; if (fetchResult !== null && typeof fetchResult != 'undefined') { for (var i = 0, ilength = fetchResult.length; i < ilength; i++) { roles[i] = fetchResult[i].attributes["name"].value; } }
return roles;
}; var isCurrentUserInRole = function () {
var roles = getCurrentUserRoles(); for (var i = 0, ilength = roles.length; i < ilength; i++) { for (var j = 0, jlength = arguments.length; j < jlength; j++) { if (roles[i] === arguments[j]) { return true; } } }
return false;
}; var assign = function (targetEntityName, targetId, assigneeEntityName, assigneeId, callback) {
var request = ["<request i:type='b:AssignRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<c:key>Target</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(targetId), "</a:Id>", "<a:LogicalName>", targetEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<c:key>Assignee</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(assigneeId), "</a:Id>", "<a:LogicalName>", assigneeEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>Assign</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var grantAccess = function (accessOptions, callback) {
var targetEntityName = accessOptions.targetEntityName; var targetEntityId = accessOptions.targetEntityId; var principalEntityName = accessOptions.principalEntityName; var principalEntityId = accessOptions.principalEntityId; var accessRights = accessOptions.accessRights; accessRights = isArray(accessRights) ? accessRights : [accessRights]; var accessRightString = ""; for (var i = 0, ilength = accessRights.length; i < ilength; i++) { accessRightString += encodeValue(accessRights[i]) + " "; }
var request = ["<request i:type='b:GrantAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<c:key>Target</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(targetEntityId), "</a:Id>", "<a:LogicalName>", targetEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<c:key>PrincipalAccess</c:key>", "<c:value i:type='b:PrincipalAccess'>", "<b:AccessMask>", accessRightString, "</b:AccessMask>", "<b:Principal>", "<a:Id>", encodeValue(principalEntityId), "</a:Id>", "<a:LogicalName>", principalEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</b:Principal>", "</c:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>GrantAccess</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var modifyAccess = function (accessOptions, callback) {
var targetEntityName = accessOptions.targetEntityName; var targetEntityId = accessOptions.targetEntityId; var principalEntityName = accessOptions.principalEntityName; var principalEntityId = accessOptions.principalEntityId; var accessRights = accessOptions.accessRights; accessRights = isArray(accessRights) ? accessRights : [accessRights]; var accessRightString = ""; for (var i = 0, ilength = accessRights.length; i < ilength; i++) { accessRightString += encodeValue(accessRights[i]) + " "; }
var request = ["<request i:type='b:ModifyAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<c:key>Target</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(targetEntityId), "</a:Id>", "<a:LogicalName>", targetEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<c:key>PrincipalAccess</c:key>", "<c:value i:type='b:PrincipalAccess'>", "<b:AccessMask>", accessRightString, "</b:AccessMask>", "<b:Principal>", "<a:Id>", encodeValue(principalEntityId), "</a:Id>", "<a:LogicalName>", principalEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</b:Principal>", "</c:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>ModifyAccess</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var revokeAccess = function (accessOptions, callback) {
var targetEntityName = accessOptions.targetEntityName; var targetEntityId = accessOptions.targetEntityId; var revokeeEntityName = accessOptions.revokeeEntityName; var revokeeEntityId = accessOptions.revokeeEntityId; var request = ["<request i:type='b:RevokeAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<c:key>Target</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(targetEntityId), "</a:Id>", "<a:LogicalName>", targetEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<c:key>Revokee</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(revokeeEntityId), "</a:Id>", "<a:LogicalName>", revokeeEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>RevokeAccess</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult"); var result = crmXmlDecode(responseText); if (!async)
return result; else
callback(result);
});
}; var retrievePrincipalAccess = function (accessOptions, callback) {
var targetEntityName = accessOptions.targetEntityName; var targetEntityId = accessOptions.targetEntityId; var principalEntityName = accessOptions.principalEntityName; var principalEntityId = accessOptions.principalEntityId; var request = ["<request i:type='b:RetrievePrincipalAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>", "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>", "<a:KeyValuePairOfstringanyType>", "<c:key>Target</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(targetEntityId), "</a:Id>", "<a:LogicalName>", targetEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<c:key>Principal</c:key>", "<c:value i:type='a:EntityReference'>", "<a:Id>", encodeValue(principalEntityId), "</a:Id>", "<a:LogicalName>", principalEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</c:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil='true' />", "<a:RequestName>RetrievePrincipalAccess</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var result = selectSingleNodeText(resultXml, "//b:value"); if (!async)
return result; else
callback(result);
});
}; var arrayElements = ["Attributes", "ManyToManyRelationships", "ManyToOneRelationships", "OneToManyRelationships", "Privileges", "LocalizedLabels", "Options", "Targets"]; var isMetadataArray = function (elementName) {
for (var i = 0, ilength = arrayElements.length; i < ilength; i++) { if (elementName === arrayElements[i]) { return true; } }
return false;
}; var getNodeName = function (node) {
if (typeof (node.baseName) != "undefined") { return node.baseName; }
else { return node.localName; }
}; var objectifyNode = function (node) {
if (node.attributes != null && node.attributes.length === 1) { if (node.attributes.getNamedItem("i:nil") != null && node.attributes.getNamedItem("i:nil").nodeValue === "true") { return null; } }
if ((node.firstChild != null) && (node.firstChild.nodeType === 3)) {
var nodeName = getNodeName(node); switch (nodeName) {
case "ActivityTypeMask": case "ObjectTypeCode": case "ColumnNumber": case "DefaultFormValue": case "MaxValue": case "MinValue": case "MaxLength": case "Order": case "Precision": case "PrecisionSource": case "LanguageCode": return parseInt(node.firstChild.nodeValue, 10); case "AutoRouteToOwnerQueue": case "CanBeChanged": case "CanTriggerWorkflow": case "IsActivity": case "IsActivityParty": case "IsAvailableOffline": case "IsChildEntity": case "IsCustomEntity": case "IsCustomOptionSet": case "IsDocumentManagementEnabled": case "IsEnabledForCharts": case "IsGlobal": case "IsImportable": case "IsIntersect": case "IsManaged": case "IsReadingPaneEnabled": case "IsValidForAdvancedFind": case "CanBeSecuredForCreate": case "CanBeSecuredForRead": case "CanBeSecuredForUpdate": case "IsCustomAttribute": case "IsPrimaryId": case "IsPrimaryName": case "IsSecured": case "IsValidForCreate": case "IsValidForRead": case "IsValidForUpdate": case "IsCustomRelationship": case "CanBeBasic": case "CanBeDeep": case "CanBeGlobal": case "CanBeLocal": return (node.firstChild.nodeValue === "true") ? true : false; case "Value": if ((node.firstChild.nodeValue === "true") || (node.firstChild.nodeValue === "false")) { return (node.firstChild.nodeValue === "true") ? true : false; }
if ((node.firstChild.nodeValue === "ApplicationRequired") || (node.firstChild.nodeValue === "None") || (node.firstChild.nodeValue === "Recommended") || (node.firstChild.nodeValue === "SystemRequired")) { return node.firstChild.nodeValue; }
else { return parseInt(node.firstChild.nodeValue, 10); }
break; default: return node.firstChild.nodeValue;
}
}
if (isMetadataArray(getNodeName(node))) {
var arrayValue = []; for (var iii = 0, tempLength = node.childNodes.length; iii < tempLength; iii++) {
var objectTypeName; if ((node.childNodes[iii].attributes != null) && (node.childNodes[iii].attributes.getNamedItem("i:type") != null)) { objectTypeName = node.childNodes[iii].attributes.getNamedItem("i:type").nodeValue.split(":")[1]; }
else { objectTypeName = getNodeName(node.childNodes[iii]); }
var b = objectifyNode(node.childNodes[iii]); b._type = objectTypeName; arrayValue.push(b);
}
return arrayValue;
}
if (node.childNodes.length === 0) { return null; }
var c = {}; if (node.attributes.getNamedItem("i:type") != null) { c._type = node.attributes.getNamedItem("i:type").nodeValue.split(":")[1]; }
for (var i = 0, ilength = node.childNodes.length; i < ilength; i++) {
if (node.childNodes[i].nodeType === 3) { c[getNodeName(node.childNodes[i])] = node.childNodes[i].nodeValue; }
else { c[getNodeName(node.childNodes[i])] = objectifyNode(node.childNodes[i]); }
}
return c;
}; var retrieveAllEntitiesMetadata = function (entityFilters, retrieveIfPublished, callback) {
entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters]; var entityFiltersString = ""; for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) { entityFiltersString += encodeValue(entityFilters[iii]) + " "; }
var request = ["<request i:type=\"a:RetrieveAllEntitiesRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">", "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">", "<a:KeyValuePairOfstringanyType>", "<b:key>EntityFilters</b:key>", "<b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">" + encodeValue(entityFiltersString) + "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>RetrieveAsIfPublished</b:key>", "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">" + encodeValue(retrieveIfPublished.toString()) + "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil=\"true\" />", "<a:RequestName>RetrieveAllEntities</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var response = selectNodes(resultXml, "//c:EntityMetadata"); var results = []; for (var i = 0, ilength = response.length; i < ilength; i++) { var a = objectifyNode(response[i]); a._type = "EntityMetadata"; results.push(a); }
if (!async)
return results; else
callback(results);
});
}; var retrieveEntityMetadata = function (entityFilters, logicalName, retrieveIfPublished, callback, errorCallback) {
retrieveIfPublished = false; entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters]; var entityFiltersString = ""; for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) { entityFiltersString += encodeValue(entityFilters[iii]) + " "; }
var request = ["<request i:type=\"a:RetrieveEntityRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">", "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">", "<a:KeyValuePairOfstringanyType>", "<b:key>EntityFilters</b:key>", "<b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">", encodeValue(entityFiltersString), "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>MetadataId</b:key>", "<b:value i:type=\"c:guid\"  xmlns:c=\"http://schemas.microsoft.com/2003/10/Serialization/\">", encodeValue("00000000-0000-0000-0000-000000000000"), "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>RetrieveAsIfPublished</b:key>", "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(retrieveIfPublished.toString()), "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>LogicalName</b:key>", "<b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(logicalName), "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil=\"true\" />", "<a:RequestName>RetrieveEntity</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml, errorMessage) {
if ((resultXml == null) && (errorMessage != null) && (async)) {
if (errorCallback) { errorCallback(errorMessage); } else { throw new Error(errorMessage); }
return null;
}
var response = selectNodes(resultXml, "//b:value"); var results = []; for (var i = 0, ilength = response.length; i < ilength; i++) { var a = objectifyNode(response[i]); a._type = "EntityMetadata"; results.push(a); }
if (!async)
return results; else
callback(results);
});
}; var retrieveAttributeMetadata = function (entityLogicalName, attributeLogicalName, retrieveIfPublished, callback) {
var request = ["<request i:type=\"a:RetrieveAttributeRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">", "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">", "<a:KeyValuePairOfstringanyType>", "<b:key>EntityLogicalName</b:key>", "<b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(entityLogicalName), "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>MetadataId</b:key>", "<b:value i:type=\"ser:guid\"  xmlns:ser=\"http://schemas.microsoft.com/2003/10/Serialization/\">", encodeValue("00000000-0000-0000-0000-000000000000"), "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>RetrieveAsIfPublished</b:key>", "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(retrieveIfPublished.toString()), "</b:value>", "</a:KeyValuePairOfstringanyType>", "<a:KeyValuePairOfstringanyType>", "<b:key>LogicalName</b:key>", "<b:value i:type=\"c:string\"   xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(attributeLogicalName), "</b:value>", "</a:KeyValuePairOfstringanyType>", "</a:Parameters>", "<a:RequestId i:nil=\"true\" />", "<a:RequestName>RetrieveAttribute</a:RequestName>", "</request>"].join(""); var async = !!callback; return doRequest(request, "Execute", async, function (resultXml) {
var response = selectNodes(resultXml, "//b:value"); var results = []; for (var i = 0, ilength = response.length; i < ilength; i++) { var a = objectifyNode(response[i]); results.push(a); }
if (!async)
return results; else
callback(results);
});
}; return { BusinessEntity: businessEntity, Execute: execute, Fetch: fetch, Retrieve: retrieve, RetrieveMultiple: retrieveMultiple, Create: sCreate, Update: sUpdate, Delete: sDelete, QueryByAttribute: queryByAttribute, QueryAll: queryAll, SetState: setState, Associate: associate, Disassociate: disassociate, Assign: assign, RetrievePrincipalAccess: retrievePrincipalAccess, GrantAccess: grantAccess, ModifyAccess: modifyAccess, RevokeAccess: revokeAccess, GetCurrentUserId: getCurrentUserId, GetCurrentUserBusinessUnitId: getCurrentUserBusinessUnitId, GetCurrentUserRoles: getCurrentUserRoles, IsCurrentUserRole: isCurrentUserInRole, RetrieveAllEntitiesMetadata: retrieveAllEntitiesMetadata, RetrieveEntityMetadata: retrieveEntityMetadata, RetrieveAttributeMetadata: retrieveAttributeMetadata };
}();