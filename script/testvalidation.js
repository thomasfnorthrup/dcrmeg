
// testvalidation

function Log(s, a) {
    if (typeof console != "undefined" && typeof console.debug != "undefined") {
        if (a) {
            console.log(s, a);
        } else {
            console.log(s);
        }
    }
}

// Add the FormOnloadHandler function to form (where grid is to be displayed) onload using form editor
function FormOnloadHandler(context) {
    window.parent.ValidateDCrmEgGrid = ValidateDCrmEgGrid;
    window.parent.DCrmEgGridSaving = DCrmEgGridSaving;
    window.parent.DCrmEgGridDeleting = DCrmEgGridDeleting;

    window.parent.DCrmEgGridBeforeCreateNewRecord = DCrmEgGridBeforeCreateNewRecord;
    window.parent.DCrmEgGridCreateNewRecord = DCrmEgGridCreateNewRecord;
    window.parent.DCrmEgGridOnload = DCrmEgGridOnload;
}


function ValidateDCrmEgGrid(param, field) {
    var allow = true;

    Log("FieldSchemaName [" + field.FieldSchemaName + "] FieldLabel [" + field.FieldLabel + "] ParentEntitySchemaName [" + field.ParentEntitySchemaName + "] ParentEntityLabel [" + field.ParentEntityLabel + "]");
    Log("Record Guid [" + param.RecordGuid + "]");
    switch (param.EditorType) {
        // Text
        case 0:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Whole Number
        case 1:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Date Picker
        case 2:
            Log("Date - NewDate [" + param.NewValue + "] OriginalDate [" + param.OriginalValue + "]");
            break;

        // Checkbox (two option)
        case 3:
            Log("Checkbox (TwoOption) - NewText [" + param.NewValue + "] OriginalText [" + param.OriginalValue + "] isChecked [" + param.IsChecked + "]");
            break;

        // OptionSet
        case 4:
            Log("OptionSet - NewLabel [" + param.NewLabel + "] NewValue [" + param.NewValue + "] OriginalLabel [" + param.OriginalLabel + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Memo (Description)
        case 5:
            Log("Memo (description) - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Lookup (single)
        case 6:
            Log("Lookup - NewLabel [" + param.NewLabel + "] NewGuid [" + param.NewGuid + "[ NewLogicalName [" + param.NewLogicalName + "] OriginalLabel [" + param.OriginalLabel + "] OriginalGuid [" + param.OriginalGuid + "] OriginalLogicalName [" + param.OriginalLogicalName + "]");
            break;

        // Decimal / Float
        case 7:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Currency
        case 8:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Date Time Picker
        case 9:
            Log("DateTime - NewDateTime [" + param.NewValue + "] OriginalDateTime [" + param.OriginalValue + "]");
            break;

        default:
            break;
    }

    return allow;
}

function DCrmEgGridSaving(data, entityinfo) {
    var allow = true;
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]");

    var item;
    for (var i = 0; i < data.length; i++) {
        item = data[i];

        switch (item.InternalEditorType) {
            // Text
            case 0:
                // Whole Number
            case 1:
                // Date Picker
            case 2:
                // Memo (Description)
            case 5:
                // Decimal / Float
            case 7:
                // Currency
            case 8:
                // Date Time Picker
            case 9:
                Log("Record Guid [" + item.RecGuid +
                    "] ValueToSave [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "] Format [" + item.InternalEditorFormat + "]");
                // Format: url, email, phone, ...
                break;

                // Checkbox (two option)
            case 3:
                Log("Record Guid [" + item.RecGuid +
                    "] ValueToSave [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "]  [" + item.CheckAttribute + "]");
                break;

                // OptionSet
            case 4:
                Log("Record Guid [" + item.RecGuid +
                    "] OptionSetLabel [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "] OptionSetValue [" + item.OptionSetValue + "]");
                break;

                // Lookup (single)
            case 6:
                Log("Record Guid [" + item.RecGuid +
                    "] LookupText [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "] LookupLogicalName [" + item.LookupLogicalName +
                    "] LookupGuid [" + item.LookupId + "]");
                break;

            default:
                break;
        }
    }

    return allow;
}

function DCrmEgGridDeleting(data, entityinfo) {
    var allow = true;
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]");

    for (var i = 0; i < data.length; i++) {
        Log("Record Guid [" + data[i] + "]");
    }

    return allow;
}

function DCrmEgGridBeforeCreateNewRecord(newRecStruct, entityinfo) {
    var allow = true;
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]");

    Log("New Record Struct", newRecStruct);

    return allow;
}

function DCrmEgGridCreateNewRecord(data, entityinfo) {
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]");

    Log("Record Guid [" + data.NewRecordGuid + "]");
}

function DCrmEgGridOnload(data, entityinfo) {
    Log("Onload - ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]");

    //data.Option.readonly = (data.Option.text == "Web");

    Log("Option set - text [" + data.Option.text + "] value [" + data.Option.value + "] ReadOnly [" + data.Option.readonly + "]");
}