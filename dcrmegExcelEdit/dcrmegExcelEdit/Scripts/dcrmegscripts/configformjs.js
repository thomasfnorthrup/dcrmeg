
/* CRM form onload and onsave events*/

function ConfigFormOnloadHandler(context) {
    Xrm.Page.getAttribute('statecode').addOnChange(statecodeOnChange);

    window.parent.OnFormSaveFunctionCallback = OnFormSaveFunctionCallback;
    window.parent.ParentFormSaving = undefined;
}

function ConfigFormOnSaveHandler(context) {
    if (window.parent.ParentFormSaving) {
        var cancel = window.parent.ParentFormSaving(context);
        if (cancel) {
            context.getEventArgs().preventDefault();
        }
    }
}

function statecodeOnChange(e) {
    refreshWebResource('WebResource_configformhtml');
}

function refreshWebResource(webResourceName) {
    var webResource = Xrm.Page.ui.controls.get(webResourceName);
    webResource.setSrc(webResource.getSrc());
}

/*
Begin Callbacks from web resource
*/

function OnFormSaveFunctionCallback(callback) {
    window.parent.ParentFormSaving = callback;
}

/*
End Callbacks from web resource
*/

