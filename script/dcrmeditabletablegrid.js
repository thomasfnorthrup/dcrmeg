
String.prototype.capitalizeFirstLetter = function () {
        return (this.length > 0) ? this.charAt(0).toUpperCase() + this.slice(1) : '';
    };

String.prototype.contains = function (str, exactMatch) {
        exactMatch = exactMatch || false;
        return (!exactMatch) ? (this.indexOf(str) != -1) : (this.toLowerCase().indexOf(str.toLowerCase()) != -1);
    };

String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };

String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };

Array.prototype.ExactMatchExists = function (str) {
        for (var i = 0; i < this.length; i++) {
            if (str == this[i]) {
                return true;
            }
        }
        return false;
    };

Array.prototype.MatchExists = function (str) {
    for (var i = 0; i < this.length; i++) {
        if (str == this[i]) {
            return i;
        }
    }
    return -1;
};

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

Array.prototype.DeleteItem = function (index) {
    this.splice(index, 1);
};

(function ($) {
    $.extend(true, window, {
        "DCrmEditableGrid": {
            "Globals": {
                "xrmPage": undefined,
                "LoggedInUserID": undefined,
                "Translation_Labels": {},
                "CrmFieldTypes": {
                    LookupType: "lookup",
                    CustomerType: 'customer',
                    OwnerType: 'owner',
                    BooleanType: "boolean",
                    OptionSetType: "picklist",
                    DateTimeType: "datetime",
                    TextType: "string",
                    MemoType: "memo",
                    IntegerType: "integer",
                    DoubleType: "double",
                    DecimalType: "decimal",
                    MoneyType: "money",
                    State: 'state', // Status statecode
                    Status: 'status' // Status Reason statuscode
                },
                "_SEPERATOR": '||',
                "_OuterSeperator": '[]',
                "_pSeperator": '%%',
                "ParentFieldsFormType": 2,
                "FormIsReadOnly": false,
                "ParentEntityName": undefined,
                "ParentEntityId": undefined,
                "TargetOutputEncSeed": '5CD566B7B6D04BE19572',
                "userDatetimeSettings": undefined,
                "userCurrencySettings": undefined,
                "DataAttr": {
                    YES: "1",
                    NO: "0",
                    Row: {
                        InternalIndex: "data-row-internalindex",
                        SubGrid: {
                            ChildGridOpen: "data-row-subgrid-childopen",
                            Id: "data-row-subgrid-id",
                            Row: {
                                Id: "data-row-subgrid-row-id"
                            }
                        },
                        Group: {
                            InternalColIndex: ""
                        }
                    },
                    Header: {
                        SchemaName: "data-header-schemaname",
                        EditorType: "data-header-editortype",
                        ReadOnly: "data-header-readonly",
                        ReadOnlyEditorType: "data-header-readonly-editortype",
                        DefaultValueForCreate: "data-header-createdefault",
                        Precision: "data-header-precision",
                        PrecisionSource: "data-header-precisionsource",
                        DataSorterType: "data-header-datasortertype",
                        Required: "data-header-required",
                        CheckedText: "data-header-checktext",
                        UncheckedText: "data-header-unchecktext"
                    },
                    Cell: {
                        RecordGuid: "data-record-guid",
                        Format: "data-field-format",
                        OriginalAttrValue: "data-original-attrvalue",
                        ChangedAttrValue: "data-field-changed-attrvalue",
                        FooterCell: "data-field-footercell",
                        Lookup: {
                            Guid: "data-lookup-guid",
                            LogicalName: "data-lookup-logicalname",
                            OriginalLogicalName: "data-lookup-original-logicalname",
                            EntityName: "data-lookup-entityname"
                        },
                        Optionset: {
                            SelectedValue: "data-optionset-selected-value"
                        }
                    }
                },
                "DefaultCountry": "ca",
                "DCrmEGConfiguration": [],
                "EntityStates": [],
                "ToolTipAttrName": "title",
                // Excel - Pre-defined strings to build a minimal XLSX file
                "excelStrings":  {
                    "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\
                    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\
	                    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>\
                    </Relationships>',
                    "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\
                    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\
	                    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>\
                    </Relationships>',
                    "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\
                    <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\
	                    <Default Extension="xml" ContentType="application/xml"/>\
	                    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\
	                    <Default Extension="jpeg" ContentType="image/jpeg"/>\
	                    <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>\
	                    <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>\
                    </Types>',
                    "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\
                    <workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\
	                    <fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>\
	                    <workbookPr showInkAnnotation="0" autoCompressPictures="0"/>\
	                    <bookViews>\
		                    <workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>\
	                    </bookViews>\
	                    <sheets>\
		                    <sheet name="Sheet1" sheetId="1" r:id="rId1"/>\
	                    </sheets>\
                    </workbook>',
                    "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\
                    <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">\
	                    <sheetData>\
		                    __DATA__\
	                    </sheetData>\
                    </worksheet>'
                },
                "Debug": false,
                "RecordOperations": {
                    Create: 0,
                    Update: 1,
                    Delete: 2,
                    Fetch: 3
                },
                "DefaultGridOptions": {
                    cssHeader: "header",
                    cssAsc: "headerSortUp",
                    cssDesc: "headerSortDown",
                    sortInitialOrder: "asc",
                    rowSelectedCss: 'rowselected',
                    OpenRecordIcon: "dcrmeg_openrec",
                    ExpandRecordIcon: "dcrmeg_addnew",
                    CollapsedRecordIcon: "dcrmeg_minus16",
                    selectorHeaders: 'thead th',
                    selectorBodyRows: 'tbody tr'
                },
                "UnsavedChangesMsg": "There are unsaved changes.\n\nClick Cancel to save changes\n\nClick Ok to continue without saving?",
                "DefaultBackgroundColor": '#FFF',
                "DefaultTextColor": '#000',
                "CustomOptionsetSelect2Ids": 100
            }
        }
    });

    $.extend(true, window, {
        "DCrmEditableGrid": {
            "Editors": {
                "Text": 0,
                "Numeric": 1,
                "DatePicker": 2,
                "Checkbox": 3,
                "OptionSet": 4,
                "Description": 5,
                "Lookup": 6,
                "Decimal": 7,
                "Currency": 8,
                "DateTimePicker": 9,
                "Status": 10,
                "None": 11,
                "Double": 12
            }
        }
    });

    $.extend(true, window, {
        "DCrmEditableGrid": {
            "Keys": {
                "KEY0": 48,
                "KEY9": 57,
                "_KEY0": 96,
                "_KEY9": 105,
                "CTRLKEY": 17,
                "DEL": 46,
                "ENTER": 13,
                "ESC": 27,
                "BACKSPACE": 8,
                "ARROWLEFT": 37,
                "ARROWUP": 38,
                "ARROWRIGHT": 39,
                "ARROWDOWN": 40,
                "TAB": 9,
                "HYPHON": 45
            }
        }
    });

    $.extend(true, window, {
        "DCrmEditableGrid": {
            "Helper": {
                "Movement": function (element, keycode) {
                    if (keycode === DCrmEditableGrid.Keys.ARROWRIGHT) {
                        return element.next('td');
                    } else if (keycode === DCrmEditableGrid.Keys.ARROWLEFT) {
                        return element.prev('td');
                    } else if (keycode === DCrmEditableGrid.Keys.ARROWUP) {
                        return element.parent().prev().children().eq(element.index());
                    } else if (keycode === DCrmEditableGrid.Keys.ARROWDOWN) {
                        return element.parent().next().children().eq(element.index());
                    }
                    return [];
                },
                "GenerateUUID": function () {
                    var d = new Date().getTime();
                    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
                    });
                    return uuid;
                },
                "GenerateRandomLetters": function (len) {
                    var text = '';
                    var thislen = len || 10;
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                    for (var i = 0; i < thislen; i++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return text;
                },
                "CopyTextToClipboard": function (text) {
                    // Works on Chrome + IE. No FF support!
                    if ((!text) && (text.length > 0)) {
                        //LogIt("Nothing to copy to clipboard.");
                        return;
                    }
                    var textArea = document.createElement("textarea");
                    // Place in top-left corner of screen regardless of scroll position.
                    textArea.style.position = 'fixed';
                    textArea.style.top = 0;
                    textArea.style.left = 0;
                    // Ensure it has a small width and height. Setting to 1px / 1em
                    // doesn't work as this gives a negative w/h on some browsers.
                    textArea.style.width = '2em';
                    textArea.style.height = '2em';
                    // We don't need padding, reducing the size if it does flash render.
                    textArea.style.padding = 0;
                    // Clean up any borders.
                    textArea.style.border = 'none';
                    textArea.style.outline = 'none';
                    textArea.style.boxShadow = 'none';
                    // Avoid flash of white box if rendered for any reason.
                    textArea.style.background = 'transparent';
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        var successful = document.execCommand('copy');
                        var msg = successful ? 'successful' : 'unsuccessful';
                        //LogIt('Copying text command was ' + msg);
                    } catch (err) {
                        LogEx('Exception: unable to copy the value to clipboard');
                    }
                    document.body.removeChild(textArea);
                },
                "AddCurrencyFormat": function (value, Precision, cursymbol) {
                    var currencySymbol = cursymbol || _thisGlobals.userCurrencySettings.CurrencySymbol;
                    var fval = value + '';
                    fval = fval.replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.');
                    var num = parseFloat(fval);
                    var isNegative = false;
                    if ((!isNaN(num)) && (num < 0)) {
                        isNegative = true;
                    }
                    if ((Precision == undefined) || (Precision == 'undefined')) {
                        Precision = _thisGlobals.userCurrencySettings.CurrencyDecimalPrecision;
                    }
                    fval = num.toFixed(Precision) + "";
                    fval = fval.replace('.', _thisGlobals.userCurrencySettings.DecimalSymbol);
                    var tmp = fval.split(_thisGlobals.userCurrencySettings.DecimalSymbol);
                    fval = tmp[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + _thisGlobals.userCurrencySettings.NumberSeparator) + _thisGlobals.userCurrencySettings.DecimalSymbol + tmp[1];
                    if (isNegative) {
                        switch (_thisGlobals.userCurrencySettings.NegativeCurrencyFormatCode) {
                            case 1:
                                fval = '-' + currencySymbol + fval.replace('-', "");
                                break;
                            case 0:
                                fval += '(' + currencySymbol + fval.replace('-', "") + ')';
                                break;
                            case 2:
                                fval = currencySymbol + '-' + fval.replace('-', "");
                                break;
                            case 3:
                                fval = currencySymbol + fval + '-';
                                break;
                            case 4:
                                fval = '(' + fval.replace('-', "") + currencySymbol + ')';
                                break;
                            case 5:
                                fval += '-' + fval.replace('-', "") + currencySymbol;
                                break;
                            case 6:
                                fval = fval.replace('-', "") + '-' + currencySymbol;
                                break;
                            case 7:
                                fval = fval.replace('-', "") + currencySymbol + '-';
                                break;
                            case 8:
                                fval = '-' + fval.replace('-', "") + ' ' + currencySymbol;
                                break;
                            case 9:
                                fval += '-' + currencySymbol + ' ' + fval.replace('-', "") + ')';
                                break;
                            case 10:
                                fval = fval.replace('-', "") + ' ' + currencySymbol + '-';
                                break;
                            case 11:
                                fval = currencySymbol + ' ' + fval.replace('-', "") + '-';
                                break;
                            case 12:
                                fval = currencySymbol + ' -' + fval.replace('-', "");
                                break;
                            case 13:
                                fval += fval.replace('-', "") + '- ' + currencySymbol;
                                break;
                            case 14:
                                fval = '(' + currencySymbol + ' ' + fval.replace('-', "") + ')';
                                break;
                            case 15:
                                fval = '(' + fval.replace('-', "") + currencySymbol + ')';
                                break;
                            default:
                                fval = currencySymbol + fval;
                                break;
                        }
                    } else {
                        switch (_thisGlobals.userCurrencySettings.CurrencyFormatCode) {
                            case 0:
                                fval = currencySymbol + fval;
                                break;
                            case 1:
                                fval += currencySymbol;
                                break;
                            case 2:
                                fval = currencySymbol + ' ' + fval;
                                break;
                            case 3:
                                fval = fval + ' ' + currencySymbol;
                                break;
                            default:
                                fval = currencySymbol + fval;
                                break;
                        }
                    }
                    return fval;
                },
                "AddDecimalFormat": function (value, Precision) {
                    var fval = value + '';
                    fval = fval.replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.');
                    var num = parseFloat(fval);
                    var isNegative = false;
                    if ((!isNaN(num)) && (num < 0)) {
                        isNegative = true;
                    }
                    if ((Precision == undefined) || (Precision == 'undefined')) {
                        Precision = _thisGlobals.userCurrencySettings.CurrencyDecimalPrecision;
                    }
                    fval = num.toFixed(Precision) + "";
                    fval = fval.replace('.', _thisGlobals.userCurrencySettings.DecimalSymbol);
                    var tmp = fval.split(_thisGlobals.userCurrencySettings.DecimalSymbol);
                    fval = tmp[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + _thisGlobals.userCurrencySettings.NumberSeparator) + _thisGlobals.userCurrencySettings.DecimalSymbol + tmp[1];
                    if (isNegative) {
                        switch (_thisGlobals.userCurrencySettings.NegativeNumberFormatCode) {
                            case 0:
                                fval = '(' + fval.replace('-', "") + ')';
                                break;
                            case 1:
                                // Already has -
                                break;
                            case 2:
                                fval = '- ' + fval.replace('-', "");
                                break;
                            case 3:
                                fval = fval.replace('-', "") + '-';
                                break;
                            case 4:
                                fval = fval.replace('-', "") + ' -';
                                break;
                            default:
                                break;
                        }
                    }
                    return fval;
                },
                "AddIntegerFormat": function (value) {
                    var fval = value + '';
                    var num = parseInt(fval);
                    var isNegative = false;
                    if ((!isNaN(num)) && (num < 0)) {
                        isNegative = true;
                    }
                    fval = fval.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + _thisGlobals.userCurrencySettings.NumberSeparator);
                    if (isNegative) {
                        switch (_thisGlobals.userCurrencySettings.NegativeNumberFormatCode) {
                            case 0:
                                fval = '(' + fval.replace('-', "") + ')';
                                break;
                            case 1:
                                // Already has -
                                break;
                            case 2:
                                fval = '- ' + fval.replace('-', "");
                                break;
                            case 3:
                                fval = fval.replace('-', "") + '-';
                                break;
                            case 4:
                                fval = fval.replace('-', "") + ' -';
                                break;
                            default:
                                break;
                        }
                    }
                    return fval;
                },
                "RemoveNumericFormat": function (txt) {
                    var isNegative = (txt.contains('-') || txt.contains('('));
                    // /[\$,()-]/g
                    var p = txt.replace(_thisGlobals.userCurrencySettings.RemoveCurrenyFormatRegEx, "");
                    var arr = p.trim().split("");
                    p = '';
                    for (var i = 0; i < arr.length; i++) {
                        if ((arr[i].length > 0) && ($.isNumeric(arr[i]) || (arr[i] == _thisGlobals.userCurrencySettings.DecimalSymbol))) {
                            p += arr[i];
                        }
                    }
                    return ((isNegative) ? '-' : "") + p;
                },
                "IsValidEmail": function (value) {
                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
                },
                "IsValidUrl": function (value) {
                    return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(value);
                },
                "IsvalidPhoneNumber": function (value) {
                    // get rid of none digits
                    // +1 21 234 234 5657
                    if (($.isNumeric(value)) || (value.contains('-') || value.contains('('))) {
                        var txt = value.replace(/[^0-9]/g, '');
                        if (txt.trim().length == 0) {
                            return false;
                        }
                        //LogIt("Phone " + txt);
                        return (($.isNumeric(txt)) && (txt.length >= 7));
                    } else {
                        return false;
                    }
                },
                "FormatPhoneNumber": function (value) {
                    var txt = value.replace(/[^0-9]/g, '');
                    // If the number has a valid length, format the number.
                    switch (txt.length) {
                        case "4105551212".length:
                            return "(" + txt.substr(0, 3) + ") " + txt.substr(3, 3) + "-" + txt.substr(6, 4);
                            //return txt.substr(0, 3) + "-" + txt.substr(3, 3) + "-" + txt.substr(6, 4);
                            break;
                        case "5551212".length:
                            return txt.substr(0, 3) + "-" + txt.substr(3, 4);
                            break;
                    }
                    return value;
                },
                "WaitDialog": function (show) {
                    if (show) {
                        $('#dcrmegProcessingDialog').show();
                    } else {
                        $('#dcrmegProcessingDialog').hide();
                    }
                },
                "SetActiveCellText": function ($cell, txt) {
                    var span = $cell.find('span.fieldcelltext');
                    if ((span) && (span.length)) {
                        span.text(txt);
                        span.attr(DCrmEditableGrid.Globals.ToolTipAttrName, txt);
                        span.parent().attr(DCrmEditableGrid.Globals.ToolTipAttrName, txt);
                    }
                },
                "GetActiveCellText": function ($cell) {
                    var span = $cell.find('span.fieldcelltext');
                    if ((span) && (span.length)) {
                        return span.text();
                    }
                    return '';
                },
                "GetHeaderCellText": function ($cell) {
                    var span = $cell.find('span.headertitle');
                    if ((span) && (span.length)) {
                        return span.text();
                    }
                    return '';
                },
                "SetHeaderCellText": function ($cell, txt) {
                    var span = $cell.find('span.headertitle');
                    if ((span) && (span.length)) {
                        span.text(txt);
                        span.attr(DCrmEditableGrid.Globals.ToolTipAttrName, txt);
                        span.parent().attr(DCrmEditableGrid.Globals.ToolTipAttrName, txt);
                    }
                },
                "GetFooterCellText": function ($cell) {
                    var span = $cell.find('span.footercelltext');
                    if ((span) && (span.length)) {
                        return span.text();
                    }
                    return '';
                },
                "SetFooterCellText": function ($cell, txt) {
                    var span = $cell.find('span.footercelltext');
                    if ((span) && (span.length)) {
                        span.text(txt);
                        span.attr(DCrmEditableGrid.Globals.ToolTipAttrName, txt);
                        span.parent().attr(DCrmEditableGrid.Globals.ToolTipAttrName, txt);
                    }
                },
                "SelectAllRows": function (id, checked) {
                    var dcrmeg = FindGridConfigByGridID(id); //FindDCrmEGConfigurationBySchema(schemaname);
                    var manager = dcrmeg.ThisGrid;
                    var tableRows = dcrmeg.ThisGrid.GetBodyRows();
                    if (checked) {
                        var totalRows = tableRows.length;
                        for (var i = 0; i < totalRows; ++i) {
                            var $row = $(tableRows[i]);
                            $row.addClass(DCrmEditableGrid.Globals.DefaultGridOptions.rowSelectedCss);
                            $row.find('input:first').prop('checked', true);
                            manager.activeOptions.selectedRows[manager.activeOptions.selectedRows.length] = tableRows[i];
                        }
                    } else {
                        // de select all rows
                        for (var i = manager.activeOptions.selectedRows.length - 1; i >= 0; i--) {
                            var $row = $(manager.activeOptions.selectedRows[i]);
                            $row.removeClass(DCrmEditableGrid.Globals.DefaultGridOptions.rowSelectedCss);
                            $row.find('input:first').prop('checked', false);
                        }
                        manager.activeOptions.selectedRows = [];
                    }
                },
                "FormatSortingOrder": function (v) {
                    if (typeof (v) != "Number") {
                        return (v.toLowerCase() == "desc") ? 1 : 0;
                    } else {
                        return (v == 1) ? 1 : 0;
                    }
                },
                "AddCurlyBrace": function (str) {
                    if (str.startsWith('{')) {
                        return str;
                    }
                    return '{' + str + '}';
                },
                "RemoveCurlyBraces": function (str) {
                    return str.replace('{', '').replace('}', '');
                },
                "GetUserLocalizedLabel": function (lbl, defaultVal) {
                    if ((lbl.UserLocalizedLabel) && (lbl.UserLocalizedLabel.Label)) {
                        return lbl.UserLocalizedLabel.Label;
                    } else {
                        if ((lbl.LocalizedLabels) && (lbl.LocalizedLabels.length > 0)) {
                            return lbl.LocalizedLabels[0].Label;
                        } else {
                            return (defaultVal) ? defaultVal : '';
                        }
                    }
                },
                "IsNullOrUndefined": function (val) {
                    return ((val == undefined) || (val == null) || (val == 'undefined') || (val == 'null'));
                }
            }
        }
    });
})(jQuery);


var _thisGlobals = DCrmEditableGrid.Globals;
var _thisHelpers = DCrmEditableGrid.Helper;

_thisGlobals.xrmPage = window.parent.Xrm.Page;
_thisGlobals.LoggedInUserID = _thisGlobals.xrmPage.context.getUserId();

function DisplayCrmAlertDialog(msg) {
    window.parent.Xrm.Utility.alertDialog(msg);
}

function LogIt(s, o) {
    if ( (_thisGlobals.Debug) && (typeof console != "undefined") && (typeof console.debug != "undefined")) {
        console.log(s, o);
    }
}

function LogEx(s,o) {
    if (typeof console != "undefined" && typeof console.debug != "undefined") {
        console.error(s, o);
    }
}

Date.parseDate = function (input, format) {
    format = format || _thisGlobals.userDatetimeSettings.DateFormat;

    if ((input == undefined) || (input == "undefined") || (input.trim().length == 0)) {
        return new Date();
    }

    var arr = input.trim().split(" ");
    var d = arr[0].trim().split(_thisGlobals.userDatetimeSettings.DateSeparator);
    var t = undefined;

    if (format.contains(_thisGlobals.userDatetimeSettings.TimeFormat)) {
        t = arr[1].trim().split(_thisGlobals.userDatetimeSettings.TimeSeparator);
    }
    // dd/MM/yyyy
    // M/dd/yyyy
    // yyyy/dd/M
    var dformat = format.toLowerCase().split(_thisGlobals.userDatetimeSettings.DateSeparator);
    d[0] = d[0].trim();
    d[1] = d[1].trim();
    d[2] = d[2].trim();

    var year = '';
    var month = '';
    var day = '';

    if (dformat[0].startsWith('y')) {
        year = d[0];
    } else if (dformat[1].startsWith('y')) {
        year = d[1];
    } else if (dformat[2].startsWith('y')) {
        year = d[2];
    }

    if (dformat[0].startsWith('m')) {
        month = d[0];
    } else if (dformat[1].startsWith('m')) {
        month = d[1];
    } else if (dformat[2].startsWith('m')) {
        month = d[2];
    }

    if (dformat[0].startsWith('d')) {
        day = d[0];
    } else if (dformat[1].startsWith('d')) {
        day = d[1];
    } else if (dformat[2].startsWith('d')) {
        day = d[2];
    }

    var val;
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    // Month is zero based
    if (t) {
        val = new Date(year, month - 1, day, t[0].trim(), t[1].trim());
    } else {
        val = new Date(year, month - 1, day);
    }

    return val;
};

Date.prototype.dateFormat = function (mask) {
    var t = new XDate(this).toString(mask);
    return t;
};

$.fn.DCrmEditableGrid = function () {
    return this;
};

$.fn.DCrmEditableGrid.TextBox = function (table, editorsArrayi, requiredErrorContainer, inputFormatErrorContainer) {
    'use strict';

    var $editor = $('<input id="' + _thisHelpers.GenerateUUID() + '" type=text />').addClass('TextEditors').hide().appendTo(table.parent());
    if (editorsArrayi.editor != DCrmEditableGrid.Editors.Text) {
        $editor.addClass('NumericTextbox');
    }
    $editor.EditorType = editorsArrayi.editor;
    var active;
    var validator = editorsArrayi.validator;
    var required = editorsArrayi.RequireValue;
    var $errorcontainer = requiredErrorContainer;
    var $inputformaterror = inputFormatErrorContainer;
    var UrlRegEx = new RegExp("^(http|https|ftp|ftps|mailto)://", "i");
    $editor.PossibleMove = undefined;
    $editor.CurrencySymbol = undefined;
    var TabCalled = true;
    var EditorValueChanged = false;

    var CrmFieldInfo = {
        FieldSchemaName: editorsArrayi.FieldSchemaName,
        FieldLabel: editorsArrayi.FieldLabel,
        ParentEntitySchemaName: editorsArrayi.ParentEntitySchemaname,
        ParentEntityLabel: editorsArrayi.ParentEntityName
    }

    $editor.theUpdater = undefined;
    $editor.RefreshOnSave = false;

    var inputFormat = editorsArrayi.Format;
    if (inputFormat == 'A') {
        inputFormat = undefined;
    } else {
        inputFormat = inputFormat.toLowerCase();
    }

    $editor.EditorFormat = inputFormat;

    var MaxLength = undefined;
    if (editorsArrayi.MaxLength != 'A') {
        MaxLength = parseInt(editorsArrayi.MaxLength);
        if (isNaN(MaxLength)) {
            MaxLength = undefined;
        } else {
            $editor.attr('maxlength', MaxLength);
        }
    }

    var MaxValue = undefined;
    if (editorsArrayi.MaxValue != 'A') {
        MaxValue = parseFloat(editorsArrayi.MaxValue);
    }
    var MinValue = undefined;
    if (editorsArrayi.MinValue != 'A') {
        MinValue = parseFloat(editorsArrayi.MinValue);
    } else {
        MinValue = parseFloat('0.00');
    }

    $editor.Precision = undefined;
    $editor.PrecisionSource = undefined;
    $editor.PricinPrecision = undefined;

    var PrecisionCallback = function (result) {
        if ((result) && (result.length > 0)) {
            if (result[0].Precision) {
                $editor.PrecisionSource = result[0].PrecisionSource;
                if ($editor.PrecisionSource == 1) {
                    // Pricing Currency - default 2
                    $editor.Precision = $editor.PricinPrecision;
                    var $theaders = table.find('thead:first').find('tr:first').find('th');
                    $($theaders[$editor.ColumnIndex])
                        .attr(_thisGlobals.DataAttr.Header.Precision, $editor.Precision)
                        .attr(_thisGlobals.DataAttr.Header.PrecisionSource, $editor.PrecisionSource);
                }
            }
        }
    };

    if (editorsArrayi.Precision) {
        if (editorsArrayi.Precision.FieldPrecision != 'A') {
            $editor.Precision = parseInt(editorsArrayi.Precision.FieldPrecision);
        } else {
            $editor.Precision = editorsArrayi.Precision.UserPrecision; // default
        }
        $editor.PrecisionSource = editorsArrayi.Precision.PrecisionSource;
        XrmServiceToolkit.Soap.RetrieveAttributeMetadata(
            editorsArrayi.Precision.EntitySchemaName,
            editorsArrayi.Precision.FieldSchemaName, true, PrecisionCallback);
        $editor.ColumnIndex = editorsArrayi.Precision.HeaderIndex;
        $editor.PricinPrecision = editorsArrayi.Precision.PricinPrecision;
    }

    var setupInvalidFormat = function (txt) {
        var etop = active.offset().top - ($inputformaterror.height() + 8);
        var eleft = active.offset().left;
        $inputformaterror.text(txt).css("left", eleft).css("top", etop).width(active.width() - 20).show();
        $editor.focus();
    };

    var setActiveText = function () {
        active = table.activeCell;
        if ((active === undefined) || (active.length === 0)) {
            return true;
        }

        var text = $editor.val();
        var activetext = _thisHelpers.GetActiveCellText(active);
        var originalVal = activetext;
        var ValidationResult = true;
        var textUpdated = true;

        if ((required) && ((text === undefined) || (text === null) || (text.trim().length == 0))) {
            var etop = active.offset().top - ($errorcontainer.height() + 8);
            var eleft = active.offset().left;
            $errorcontainer.css("left", eleft).css("top", etop).width(active.width() - 20).show();
            $editor.focus();
            return false;
        }

        if (($editor.EditorType == DCrmEditableGrid.Editors.Currency) ||
            ($editor.EditorType == DCrmEditableGrid.Editors.Decimal) ||
            ($editor.EditorType == DCrmEditableGrid.Editors.Double) ||
            ($editor.EditorType == DCrmEditableGrid.Editors.Numeric) ) {
            activetext = _thisHelpers.RemoveNumericFormat(activetext);
            //LogIt("Parsing   [" + parseFloat(activetext) + "]");
        }

        if (activetext === text) {
            return true;
        }

        if (text.length > 0) {
            if ($editor.EditorType == DCrmEditableGrid.Editors.Text) {
                if (inputFormat) {
                    if (inputFormat == 'url') {
                        if (!_thisHelpers.IsValidUrl(text)) {
                            setupInvalidFormat(_thisGlobals.Translation_Labels.IncorrectFormat);
                            return false;
                        }
                    } else if (inputFormat == 'email') {
                        if (!_thisHelpers.IsValidEmail(text)) {
                            setupInvalidFormat(_thisGlobals.Translation_Labels.IncorrectFormat);
                            return false;
                        }
                    }
                    //else if (inputFormat == 'phone') {
                    //    if (!_thisHelpers.IsvalidPhoneNumber(text)) {
                    //        setupInvalidFormat('Invalid format.');
                    //        return false;
                    //    }
                    //}
                }

                //if (MaxLength) {
                //    if ((!isNaN(MaxLength)) && (text.length > MaxLength)) {
                //        setupInvalidFormat('Max length ' + MaxLength);
                //        return false;
                //    }
                //}
            } else {
                if (MaxValue) {
                    var p = parseFloat(text);
                    if ((!isNaN(p)) && (!isNaN(MaxValue)) && (p > MaxValue)) {
                        setupInvalidFormat(_thisGlobals.Translation_Labels.MaxValue + ' ' + MaxValue);
                        return false;
                    }
                }

                var p = parseFloat(text);
                if ((!isNaN(p)) && (!isNaN(MinValue)) && (p < MinValue)) {
                    setupInvalidFormat(_thisGlobals.Translation_Labels.MinValue + ' ' + MinValue);
                    return false;
                }
            }

            if (validator != undefined) {

                var orgNoFormat = _thisHelpers.GetActiveCellText(active);
                if ($editor.EditorType != DCrmEditableGrid.Editors.Text) {
                    orgNoFormat = _thisHelpers.RemoveNumericFormat(orgNoFormat);
                    orgNoFormat = parseFloat(orgNoFormat.replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.'));
                }

                var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                var param = { RecordGuid: guid, EditorType: $editor.EditorType, OriginalValue: orgNoFormat, NewValue: text };

                ValidationResult = validator(param, CrmFieldInfo);

                if (ValidationResult === true) {
                    if ($editor.EditorType == DCrmEditableGrid.Editors.Currency) {
                        // adds , seperator and if needed .00
                        text = _thisHelpers.AddCurrencyFormat(text, $editor.Precision, $editor.CurrencySymbol);

                    } else if (($editor.EditorType == DCrmEditableGrid.Editors.Decimal) || ($editor.EditorType == DCrmEditableGrid.Editors.Double)) {
                        text = _thisHelpers.AddDecimalFormat(text, $editor.Precision);

                    } else if ($editor.EditorType == DCrmEditableGrid.Editors.Numeric) {
                        text = _thisHelpers.AddIntegerFormat(text);

                    } else if ($editor.EditorType == DCrmEditableGrid.Editors.Text) {

                        if (inputFormat == 'url') {
                            if (!(UrlRegEx.test(text))) {
                                text = 'http://' + text;
                            }
                        }
                        //else if (inputFormat == 'phone') {
                        //    text = _thisHelpers.FormatPhoneNumber(text);
                        //}

                    }
                    //active.text(text);
                    _thisHelpers.SetActiveCellText(active, text);
                } else {
                    textUpdated = false;
                }
            } else {
                if ($editor.EditorType == DCrmEditableGrid.Editors.Currency) {
                    // adds , seperator and if needed .00
                    text = _thisHelpers.AddCurrencyFormat(text, $editor.Precision, $editor.CurrencySymbol);

                } else if (($editor.EditorType == DCrmEditableGrid.Editors.Decimal) || ($editor.EditorType == DCrmEditableGrid.Editors.Double)) {
                    text = _thisHelpers.AddDecimalFormat(text, $editor.Precision);

                } else if ($editor.EditorType == DCrmEditableGrid.Editors.Numeric) {
                    text = _thisHelpers.AddIntegerFormat(text);

                } else if ($editor.EditorType == DCrmEditableGrid.Editors.Text) {
                    if (inputFormat == 'url') {
                        if (!(UrlRegEx.test(text))) {
                            text = 'http://' + text;
                        }
                    }
                    //else if (inputFormat == 'phone') {
                    //    text = _thisHelpers.FormatPhoneNumber(text);
                    //}

                }
                _thisHelpers.SetActiveCellText(active, text);
            }
        } else {

            if (validator != undefined) {
                var orgNoFormat = _thisHelpers.GetActiveCellText(active);
                if ($editor.EditorType != DCrmEditableGrid.Editors.Text) {
                    orgNoFormat = _thisHelpers.RemoveNumericFormat(orgNoFormat);
                    orgNoFormat = parseFloat(orgNoFormat.replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.'));
                }

                var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                var param = { RecordGuid: guid, EditorType: $editor.EditorType, OriginalValue: orgNoFormat, NewValue: "" };

                ValidationResult = validator(param, CrmFieldInfo);

                if (ValidationResult === true) {
                    _thisHelpers.SetActiveCellText(active, text);
                    textUpdated = true;
                } else {
                    textUpdated = false;
                }
            } else {
                _thisHelpers.SetActiveCellText(active, text);
                textUpdated = true;
            }
        }

        if (textUpdated) {
            // update TableManager cache
            $editor.theUpdater(active, originalVal);
            return true;
        }
        return false;
    };

    var HideError = function () {
        if ($errorcontainer.is(':visible')) {
            $errorcontainer.hide();
        }
        if ($inputformaterror.is(':visible')) {
            $inputformaterror.hide();
        } 
    };

    $editor.CloseEditor = function () {
        if ($editor.is(':visible')) {
            $editor.hide();
        }
        if ($inputformaterror.is(':visible')) {
            $inputformaterror.hide();
        }
    };

    $editor.on('blur', function (e) {
        if ((!TabCalled) || (!EditorValueChanged)) {
            setActiveText();
            if ((!$errorcontainer.is(':visible')) && !($inputformaterror.is(':visible'))) {
                active = table.activeCell;
                $editor.hide();
                if ((active) && (active.length)) {
                    active.focus();
                }
            }
        }
        TabCalled = true;
        EditorValueChanged = false;
        e.stopPropagation();
        return false;

    }).on('keypress', function (e) {

        e.stopPropagation();
        if ($editor.EditorType != DCrmEditableGrid.Editors.Text) {
            var tkey = e.which || e.keycode;            
            var prevente = false;
            var curPos = this.selectionStart;

            if ((tkey === _thisGlobals.userCurrencySettings.CurrencySymbolCharCode) ||
                (tkey === _thisGlobals.userCurrencySettings.NumberSeparatorCharCode)) {
                prevente = true;

            } else if (tkey === _thisGlobals.userCurrencySettings.DecimalSymbolCharCode) { // . only allow one instance for none numeric
                if ($editor.EditorType == DCrmEditableGrid.Editors.Numeric) {
                    prevente = true;
                } else if (($editor.EditorType == DCrmEditableGrid.Editors.Decimal) ||
                    ($editor.EditorType == DCrmEditableGrid.Editors.Double) ||
                    ($editor.EditorType == DCrmEditableGrid.Editors.Currency)) {
                    var dot = $editor.val();
                    if ((dot.length > 0) && (dot.contains(_thisGlobals.userCurrencySettings.DecimalSymbol))) {
                        prevente = true;
                    }
                }

            } else if (tkey === DCrmEditableGrid.Keys.HYPHON) {
                var dot = $editor.val();
                if ((curPos != 0) || (dot.contains('-'))) {
                    prevente = true;
                }
            } else if (tkey >= DCrmEditableGrid.Keys.KEY0 && tkey <= DCrmEditableGrid.Keys.KEY9) {

            } else if (e.shiftKey || (tkey < DCrmEditableGrid.Keys.KEY0 || tkey > DCrmEditableGrid.Keys.KEY9)) {
                if ((tkey != DCrmEditableGrid.Keys.BACKSPACE) && (tkey != DCrmEditableGrid.Keys.DEL)) {
                    prevente = true;
                }
            }

            if (prevente) {
                e.preventDefault();
                return false;
            }
        }
    }).on('keydown', function (e) {
        var tkey = e.which || e.keycode;
        var prevent = false;
        TabCalled = false;
        EditorValueChanged = true;
        HideError();
        e.stopPropagation();

        if (tkey === DCrmEditableGrid.Keys.ENTER) {
            TabCalled = true;
            setActiveText();
            if ((!$errorcontainer.is(':visible')) || (!$inputformaterror.is(':visible'))) {
                $editor.hide();
                active = table.activeCell;
                if ((active) && (active.length)) {
                    active.focus();
                }
            }
            prevent = true;

        } else if (tkey === DCrmEditableGrid.Keys.ESC) {
            setTimeout(HideError, 10);
            active = table.activeCell;
            $editor.hide();
            if ((active) && (active.length)) {
                active.focus();
            }
            prevent = true;

        } else if (tkey === DCrmEditableGrid.Keys.TAB) {
            TabCalled = true;
            prevent = true;
            setActiveText();
            if ((!$errorcontainer.is(':visible')) || (!$inputformaterror.is(':visible'))) {
                $editor.hide();
                active = table.activeCell;
                if ((active) && (active.length)) {
                    var possibleMove = _thisHelpers.Movement(active, DCrmEditableGrid.Keys.ARROWRIGHT);
                    if ((possibleMove) && (possibleMove.length) && (possibleMove.length > 0)) {
                        $editor.PossibleMove = possibleMove;
                        setTimeout(function () {
                            $editor.PossibleMove.focus();
                            $editor.PossibleMove.trigger("click");
                        }, 50);
                    } else {
                        active.focus();
                    }
                }
            }
        }

        if (prevent) {
            e.preventDefault();
            return false;
        }
    }).on('paste', function (e) {
        setTimeout(HideError, 10);
        $editor.attr('data-item-inputeditor-value', $editor.val());
        EditorValueChanged = true;

        //break the callstack to let the event finish  $87,7659.87   $98,98.765.98
        setTimeout(function () { 
            if ($editor.EditorType != DCrmEditableGrid.Editors.Text) {
                var val = $editor.val().trim(); //read the value of the input field 
                val = _thisHelpers.RemoveNumericFormat(val);
                
                var org = $editor.attr('data-item-inputeditor-value');
                // Is it numeric
                if ($.isNumeric(val)) {
                    if ($editor.EditorType == DCrmEditableGrid.Editors.Numeric) {
                        var index = val.indexOf(_thisGlobals.userCurrencySettings.DecimalSymbol);
                        if (index != -1) {
                            try {
                                val = val.substr(0, val.length - index);
                            } catch (e) {
                                $editor.val(org);
                                return;
                            }
                        }
                    }
                    $editor.val(val);
                } else {
                    $editor.val(org);
                }
            }
        }, 2);

    });

    $editor.DestroyEditor = function () {
        $editor.off('blur').off('keypress').off('keydown').off('paste');
        $editor.remove();
    };

    return $editor;
};

$.fn.DCrmEditableGrid.DatePicker = function (table, editorsArrayi, requiredErrorContainer, minutestep) {
    'use strict';

    // 6/13/2014 10:51 AM
    var DatePickerDateFormat = _thisGlobals.userDatetimeSettings.DateFormat;

    var CrmFieldInfo = {
        FieldSchemaName: editorsArrayi.FieldSchemaName,
        FieldLabel: editorsArrayi.FieldLabel,
        ParentEntitySchemaName: editorsArrayi.ParentEntitySchemaname,
        ParentEntityLabel: editorsArrayi.ParentEntityName
    }
    var divid = _thisHelpers.GenerateUUID();
    var inputid = _thisHelpers.GenerateUUID();

    var $editor = $("<div style=\"position:absolute;display:none;\" id=\"" + divid + "\" ><input id=\"" + inputid + "\" type=text  readonly=\"readonly\" style=\"position:absolute;border:none;\" /></div>").appendTo(table.parent());
    $editor.EditorType = editorsArrayi.editor;
    var hasTime = ($editor.EditorType == DCrmEditableGrid.Editors.DateTimePicker);
    if (hasTime) {
        DatePickerDateFormat += ' ' + _thisGlobals.userDatetimeSettings.TimeFormat;
    }
    var active, OriginalValue;
    var HasChanged = false;
    var validator = editorsArrayi.validator;
    var required = editorsArrayi.RequireValue;
    var $errorcontainer = requiredErrorContainer;

    $editor.theUpdater = undefined;
    $editor.RefreshOnSave = false;

    $editor.SetInternals = function (curText) {
        $('#' + inputid).width($('#' + divid).width()).height($('#' + divid).height());
        $('#' + inputid).val(curText.trim()).focus();
    };

    $editor.CloseEditor = function () {
        if ($editor.is(':visible')) {
            $editor.hide();
            $("#" + inputid).datetimepicker('hide');
        }
    };

    var HideInput = function () {
        if ($errorcontainer.is(':visible')) {
            $errorcontainer.hide();
        }
        if ($editor.is(':visible')) {
            $editor.hide();
        }
    };

    $("#" + inputid).datetimepicker({
        timepicker: hasTime,
        format: DatePickerDateFormat,
        formatDate: _thisGlobals.userDatetimeSettings.DateFormat,
        formatTime: _thisGlobals.userDatetimeSettings.TimeFormat,
        step: minutestep,
        onShow: function (dp, $input) {
            OriginalValue = undefined;
            active = table.activeCell;
            if ((active === undefined) || (active.length === 0)) {
                return;
            }

            OriginalValue = _thisHelpers.GetActiveCellText(active);
        },
        onChangeDateTime: function (dp, $input) {
            HasChanged = ($input.val() != OriginalValue);
        },
        onClose: function (dp, $input) {
            if ($editor.is(':visible')) {
                active = table.activeCell;
                if ((active === undefined) || (active.length === 0)) {
                    return;
                }

                if (HasChanged == false) {
                    HideInput();
                    active.focus();
                    return true;
                }

                var dvalue = $input.val();
                var originalVal = OriginalValue;

                if (dvalue.trim().length == 0) {
                    var txt = _thisHelpers.GetActiveCellText(active);
                    if (required) {
                        var etop = active.offset().top - ($errorcontainer.height() + 8);
                        var eleft = active.offset().left;
                        $errorcontainer.css("left", eleft).css("top", etop).width(active.width() - 20).show();
                        $input.val(txt);
                        $input.focus();
                        return;
                    } else if (txt.length > 0) {
                        _thisHelpers.SetActiveCellText(active, '');
                        $editor.theUpdater(active, originalVal);
                    }
                }

                try {
                    var text = dp.dateFormat(DatePickerDateFormat);

                    if (text == OriginalValue) {
                        HideInput();
                        active.focus();
                        return;
                    }

                    OriginalValue = OriginalValue || '';

                    var ValidationResult = true;
                    var textUpdated = true;
                    if (validator != undefined) {
                        var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                        var param = { RecordGuid: guid, EditorType: $editor.EditorType, OriginalValue: OriginalValue, NewValue: text };

                        ValidationResult = validator(param, CrmFieldInfo);
                        if (ValidationResult === true) {
                            _thisHelpers.SetActiveCellText(active, text);
                        } else {
                            textUpdated = false;
                        }
                    } else {
                        _thisHelpers.SetActiveCellText(active, text);
                    }

                    if (textUpdated) {
                        $editor.theUpdater(active, originalVal);
                    }
                } catch (e) {
                    LogEx("Datetime Picker Exception\r\n" + e.message);
                }

                HideInput();
                active.focus();
            }
        }
    });

    $editor.DestroyEditor = function () {
        $("#" + inputid).datetimepicker('destroy');
        $editor.empty();
        $editor.remove();
    };

    return $editor;
};

$.fn.DCrmEditableGrid.CheckBox = function (table, editorsArrayi) {
    'use strict';

    var Div_ID = _thisHelpers.GenerateUUID();
    var Input_ID = _thisHelpers.GenerateUUID();
    var Label_ID = _thisHelpers.GenerateUUID();
    
    var active;
    var validator = editorsArrayi.validator;
    var headerIDToSet = '#' + editorsArrayi.HeaderIdToUpdate;
    var CrmFieldInfo = {
        FieldSchemaName: editorsArrayi.FieldSchemaName,
        FieldLabel: editorsArrayi.FieldLabel,
        ParentEntitySchemaName: editorsArrayi.ParentEntitySchemaname,
        ParentEntityLabel: editorsArrayi.ParentEntityName
    }

    var $editor = $('<div></div>')
        .attr('id', Div_ID)
        .addClass('GridCheckboxContainer')
        .hide().appendTo(table.parent());
    $editor.theUpdater = undefined;
    $editor.RefreshOnSave = false;

    $editor.EditorType = editorsArrayi.editor;
    $editor.CheckedLabel = editorsArrayi.CheckText;
    $editor.UncheckedLabel = editorsArrayi.UncheckedText;
    $editor.PossibleMove = undefined;
    $editor.optionsData = [{ text: $editor.CheckedLabel, value: '1' }, { text: $editor.UncheckedLabel, value: '0' }];
    //<option value="0" title="Allow">Allow</option><option value="1" title="Do Not Allow">Do Not Allow</option>

    var $input = $('<input type="checkbox" />')
        .attr('id', Input_ID)
        .addClass('cmn-toggle cmn-toggle-yes-no')
        .appendTo($editor);
    var $CheckboxLabel = $('<label></label>')
        .attr('id', Label_ID)
        .attr('for', Input_ID)
        .attr('data-on', $editor.CheckedLabel)
        .attr('data-off', $editor.UncheckedLabel)
        .appendTo($editor);

    $editor.SetInternals = function (curText) {
        var initVal = (curText == $editor.CheckedLabel) ? true : false;
        $input.prop('checked', initVal);
        $CheckboxLabel.width($editor.width() - 3).height($editor.height() - 4);
        $editor.show().focus();

        $(window.document).off('mousedown').off('keydown').on('mousedown', function (e) {
            if (e.target) {
                var ctlid = $(e.target).attr('id');
                if ((ctlid == Input_ID) || (ctlid == Label_ID) || (ctlid == Div_ID)) {
                    return false;
                } else {
                    $(window.document).off('keydown').off('mousedown');
                    $editor.hide();
                    $(e.target).focus();
                }
            }
        })
        .on('keydown', function (e) {
            console.log("Handling IE 10-11 specific! Does not fire in Chrome, FF, ...");
            var tkey = e.which || e.keycode;
            var prevent = false;
            var isTabKeydown = false;
            if (tkey === DCrmEditableGrid.Keys.ESC) {
                prevent = true;
                $editor.hide();
                active = table.activeCell;
                if ((active) && (active.length)) {
                    active.focus();
                }              
            }
            if (tkey == DCrmEditableGrid.Keys.TAB) {
                isTabKeydown = true;
                tkey = DCrmEditableGrid.Keys.ARROWRIGHT;
            }
            if ((tkey >= DCrmEditableGrid.Keys.ARROWLEFT) && (tkey <= DCrmEditableGrid.Keys.ARROWDOWN)) { // Arrow keys
                $editor.hide();
                prevent = true;
                active = table.activeCell;
                if ((active) && (active.length)) {
                    var possibleMove = _thisHelpers.Movement(active, tkey);
                    if ((possibleMove) && (possibleMove.length) && (possibleMove.length > 0)) {
                        $editor.PossibleMove = possibleMove;
                        $editor.PossibleMove.focus();

                        if (isTabKeydown) {
                            setTimeout(function () {
                                $editor.PossibleMove.trigger("click");
                            }, 50);
                        }
                    } else {
                        active.focus();
                    }
                }
            } else if (tkey == 32) {
                prevent = true;
                $input.trigger("click");
            }

            if (prevent) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    };

    $editor.CloseEditor = function () {
        if ($editor.is(':visible')) {
            $(window.document).off('keydown').off('mousedown');
            $editor.hide();
        }
    };

    $editor.IsVisible = function () {
        return $editor.is(':visible');
    };

    $editor.SimulateClick = function () {
        $input.trigger("click");
    };

    $editor.SetWidthAndLocation = function (data) {
        $editor.offset({ 'left': data.left, 'top': data.top }).width(data.width + 1);
        $CheckboxLabel.width($editor.width() - 3).height($editor.height() - 4);
    };

    $input.on('click', function (e) {
        active = table.activeCell;
        if ((active === undefined) || (active.length === 0)) {
            //LogEx('CheckBox: Unable to find active cell.');
            return;
        }

        var text = $input.is(':checked') ? $editor.CheckedLabel : $editor.UncheckedLabel;
        var activecelltext = _thisHelpers.GetActiveCellText(active);
        var originalVal = activecelltext;

        if (activecelltext === text) {
            return true;
        }

        var ValidationResult = true;
        var textUpdated = true;
        if (validator != undefined) {
            var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
            var param = { RecordGuid: guid, EditorType: $editor.EditorType, OriginalValue: activecelltext, NewValue: text, IsChecked: ($input.is(':checked') ? true : false) };

            ValidationResult = validator(param, CrmFieldInfo);
            if (ValidationResult === true) {
                _thisHelpers.SetActiveCellText(active, text);
            } else {
                textUpdated = false;
            }
        } else {
            _thisHelpers.SetActiveCellText(active, text);
        }

        if (textUpdated) {
            $editor.theUpdater(active, originalVal);
        } else {
            $input.prop("checked", !$input.prop('checked'));
        }
    });

    $editor.DestroyEditor = function () {
        $input.off('click').off('keydown');
        $editor.empty();
        $editor.remove();
    };

    function GetBooleanLabelsCallback(optionset) {
        if ((optionset) && (optionset.length > 0)) {
            $editor.CheckedLabel = _thisHelpers.GetUserLocalizedLabel(optionset[0].OptionSet.TrueOption.Label);
            $editor.UncheckedLabel = _thisHelpers.GetUserLocalizedLabel(optionset[0].OptionSet.FalseOption.Label);

            $editor.optionsData[0].text = $editor.CheckedLabel;
            $editor.optionsData[1].text = $editor.UncheckedLabel;

            $(headerIDToSet).attr(_thisGlobals.DataAttr.Header.CheckedText, $editor.CheckedLabel)
                .attr(_thisGlobals.DataAttr.Header.UncheckedText, $editor.UncheckedLabel);

            $CheckboxLabel.attr('data-on', $editor.CheckedLabel).attr('data-off', $editor.UncheckedLabel);
        }
    };

    XrmServiceToolkit.Soap.RetrieveAttributeMetadata(editorsArrayi.ParentEntitySchemaname, editorsArrayi.FieldSchemaName, true, GetBooleanLabelsCallback);

    return $editor;
};

$.fn.DCrmEditableGrid.SetEntityState = function (entityState, RecId, statusValue, statusReasonValue, refreshButtonId) {
    'use strict';

    var tmpId = _thisHelpers.GenerateUUID();
    var $editor = $('<div class="DescriptionBox statusBoxControl" style="height:100px;"></div>')
        .attr('id', tmpId)
        .hide()
        .appendTo('body');

    var $statusDiv = $('<div class="statusBoxControl"></div>')
        .attr('id', _thisHelpers.GenerateUUID())
        .appendTo($editor);

    tmpId = _thisHelpers.GenerateUUID();
    $('<label class="statusBoxControl" style="margin-right:5px;width:80px;display:inline-block;font-weight:bold;"></label>')
        .attr('id', _thisHelpers.GenerateUUID())
        .text('Status')
        .attr('for', tmpId)
        .appendTo($statusDiv);
    var $statusSelect = $('<select class="statusBoxControl" style="width: 100px;"></select>')
        .attr('id', tmpId)
        .on('change', function (e) {
            $statusReasonSelect.empty();
            var selected = $(this).find(":selected");
            var val = selected.val();
            var initial = undefined;
            for (var i = 0; i < entityState.StatusReason.length; i++) {
                if (entityState.StatusReason[i].state == val) {
                    if (initial == undefined) {
                        initial = entityState.StatusReason[i].value;
                    }
                    $statusReasonSelect.append($('<option>', {
                        value: entityState.StatusReason[i].value,
                        text: entityState.StatusReason[i].text
                    }));
                }
            }
            $statusReasonSelect.val(initial);
        })
        .appendTo($statusDiv);
    for (var i = 0; i < entityState.Status.length; i++) {
        $statusSelect.append($('<option>', {
            value: entityState.Status[i].value,
            text: entityState.Status[i].text
        }));
    }
    $statusSelect.val(statusValue);

    var $statusReasonDiv = $('<div class="statusBoxControl" style="margin-top:5px;"></div>')
        .attr('id', _thisHelpers.GenerateUUID())
        .appendTo($editor);

    tmpId = _thisHelpers.GenerateUUID();
    $('<label class="statusBoxControl" style="margin-right:5px;width:80px;display:inline-block;font-weight:bold;"></label>')
        .attr('id', _thisHelpers.GenerateUUID())
        .text('Status Reason')
        .attr('for', tmpId)
        .appendTo($statusReasonDiv);
    var $statusReasonSelect = $('<select class="statusBoxControl" style="width: 100px;"></select>')
        .attr('id', tmpId)
        //.append('<option value="-1"></option>')
        .appendTo($statusReasonDiv);

    for (var i = 0; i < entityState.StatusReason.length; i++) {
        if (entityState.StatusReason[i].state == statusValue) {
            $statusReasonSelect.append($('<option>', {
                value: entityState.StatusReason[i].value,
                text: entityState.StatusReason[i].text
            }));
        }
    }
    $statusReasonSelect.val(statusReasonValue);

    var $removeRecDiv = $('<div class="statusBoxControl" style="margin-top:5px;"></div>')
    .attr('id', _thisHelpers.GenerateUUID())
    .appendTo($editor);

    tmpId = _thisHelpers.GenerateUUID();
    var $chkRefresh = $('<input class="statusBoxControl" type="checkbox" checked="checked" />')
        .attr('id', tmpId)
        .appendTo($removeRecDiv);
    $('<label class="statusBoxControl" style="margin-left:5px;display:inline-block;font-weight:bold;"></label>')
        .attr('id', _thisHelpers.GenerateUUID())
        .text('Refresh grid after setting state')
        .attr('for', tmpId)
        .appendTo($removeRecDiv);

    var $btndiv = $('<div class="flyout-ButtonContainer statusBoxControl" style="height:20px;padding-top:5px;"></div>')
        .attr('id', _thisHelpers.GenerateUUID())
        .appendTo($editor);


    var btnOk = $('<button class="statusBoxControl"></button>')
    .attr('id', _thisHelpers.GenerateUUID())
    .text(_thisGlobals.Translation_Labels.Ok)
    .on('click', function (e) {
        e.stopPropagation();

        var selStatus = $statusSelect.find(":selected");
        var selStatusReason = $statusReasonSelect.find(":selected");

        var reason = parseInt(selStatusReason.val());
        if (reason == -1) {
            reason = null;
        }

        try {
            var result = XrmServiceToolkit.Soap.SetState(
            entityState.SchemaName,
            RecId,
            parseInt(selStatus.val()),
            reason);
            if ($chkRefresh.is(':checked')) {
                setTimeout(function () {
                    $('#' + refreshButtonId).trigger('click');
                }, 100);
            }
        } catch (e) {
            LogEx("Exception - Unable to setState\r\n" + e.message);
        }

        $editor.DestroyEditor();
    })
    .appendTo($btndiv);


    var btnCancel = $('<button class="statusBoxControl"></button>')
        .attr('id', _thisHelpers.GenerateUUID())
        .text(_thisGlobals.Translation_Labels.Cancel)
        .on('click', function (e) {
            e.stopPropagation();
            $editor.DestroyEditor();
        })
        .appendTo($btndiv);

    $(window.document).off('mousedown').on('mousedown', function (e) {
        if (e.target) {
            var ctlid = $(e.target).hasClass('statusBoxControl');

            if (!ctlid) {
                if (e.target.tagName == 'OPTION') {
                    if ($(e.target).parent().hasClass('statusBoxControl')) {
                        return;
                    }
                }
                $editor.hide();
            }
        }
    });

    $editor.DestroyEditor = function () {
        $(window.document).off('mousedown');
        $editor.hide();
        btnOk.off('click');
        btnCancel.off('click');
        $editor.empty();
        $editor.remove();
    };

    return $editor;
};

$.fn.DCrmEditableGrid.EntityStatesBox = function (schemaName, editorsArrayi, table) {
    'use strict';

    var validator = editorsArrayi.validator;
    var active;
    var CrmFieldInfo = {
        FieldSchemaName: editorsArrayi.FieldSchemaName,
        FieldLabel: editorsArrayi.FieldLabel,
        ParentEntitySchemaName: editorsArrayi.ParentEntitySchemaname,
        ParentEntityLabel: editorsArrayi.ParentEntityName
    }

    var $editor = $('<div class="statusBox statusBoxControl"></div>')
        .attr('id', _thisHelpers.GenerateUUID())
        .hide()
        .appendTo(table.parent());

    $editor.EditorType = editorsArrayi.editor;
    $editor.IsStatusField = (editorsArrayi.FieldSchemaName == 'statecode') ? true : false;
    $editor.theUpdater = undefined;
    $editor.EntityStates = { SchemaName: schemaName, Status: [], StatusReason: [] };
    $editor.RefreshOnSave = false;
    $editor.RecId = null;
    $editor.PrimaryIdAttribute = null;

    function StateCodeCallback(optionset) {
        if (optionset.length > 0) {
            for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                $editor.EntityStates.Status.push(
                {
                    text: _thisHelpers.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label),
                    value: optionset[0].OptionSet.Options[i].Value
                });
            }
        }

        for (var i = 0; i < $editor.EntityStates.Status.length; i++) {
            $statusSelect.append($('<option>', {
                value: $editor.EntityStates.Status[i].value,
                text: $editor.EntityStates.Status[i].text
            }));
        }

        XrmServiceToolkit.Soap.RetrieveAttributeMetadata(schemaName, 'statuscode', true, StatusCodeCallback);
    };

    function StatusCodeCallback(optionset) {
        if (optionset.length > 0) {
            for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                $editor.EntityStates.StatusReason.push(
                {
                    text: _thisHelpers.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label),
                    value: optionset[0].OptionSet.Options[i].Value,
                    // in case of status reason, contains which state this option of status reason belongs to
                    state: optionset[0].OptionSet.Options[i].State,
                });
            }
        }
        _thisGlobals.EntityStates.push($editor.EntityStates);
    };

    XrmServiceToolkit.Soap.RetrieveAttributeMetadata(schemaName, 'statecode', true, StateCodeCallback);
    
    var $statusDiv = $('<div class="statusBoxControl"></div>')
        .attr('id', _thisHelpers.GenerateUUID())
        .appendTo($editor);

    var tmpId = _thisHelpers.GenerateUUID();
    $('<label class="statusBoxControl" style="margin-right:5px;width:80px;display:inline-block;font-weight:bold;"></label>')
        .attr('id', _thisHelpers.GenerateUUID())
        .text('Status')
        .attr('for', tmpId).appendTo($statusDiv);
    var $statusSelect = $('<select class="statusBoxControl" style="width: 100px;"></select>')
        .attr('id', tmpId)
        .on('change', function (e) {
            $statusReasonSelect.empty();
            var selected = $(this).find(":selected");
            var val = parseInt(selected.val());
            var initial = undefined;
            for (var i = 0; i < $editor.EntityStates.StatusReason.length; i++) {
                if ($editor.EntityStates.StatusReason[i].state == val) {
                    if (initial == undefined) {
                        initial = $editor.EntityStates.StatusReason[i].value;
                    }
                    $statusReasonSelect.append($('<option>', {
                        value: $editor.EntityStates.StatusReason[i].value,
                        text: $editor.EntityStates.StatusReason[i].text
                    }));
                }
            }
            $statusReasonSelect.val(initial);
        })
        .appendTo($statusDiv);

    var $statusReasonDiv = $('<div class="statusBoxControl" style="margin-top:5px;"></div>')
        .attr('id', _thisHelpers.GenerateUUID())
        .appendTo($editor);

    tmpId = _thisHelpers.GenerateUUID();
    $('<label class="statusBoxControl" style="margin-right:5px;width:80px;display:inline-block;font-weight:bold;"></label>')
        .attr('id', _thisHelpers.GenerateUUID())
        .text('Status Reason')
        .attr('for', tmpId).appendTo($statusReasonDiv);
    var $statusReasonSelect = $('<select class="statusBoxControl" style="width: 100px;"></select>')
        .attr('id', tmpId).appendTo($statusReasonDiv);

    var $btndiv = $('<div class="statusBox-ButtonContainer statusBoxControl"></div>')
        .attr('id', _thisHelpers.GenerateUUID())
        .appendTo($editor);

    var btnOk = $('<button class="statusBoxControl"></button>')
    .attr('id', _thisHelpers.GenerateUUID())
    .text(_thisGlobals.Translation_Labels.Ok)
    .on('click', function (e) {
        e.stopPropagation();

        var selStatus = $statusSelect.find(":selected");
        var selStatusReason = $statusReasonSelect.find(":selected");

        var selected = ($editor.IsStatusField) ? selStatus : selStatusReason;

        try {
            var reason = parseInt(selStatusReason.val());
            if (reason == -1) {
                reason = null;
            }
            var result = XrmServiceToolkit.Soap.SetState(
                $editor.EntityStates.SchemaName,
                $editor.RecId,
                parseInt(selStatus.val()),
                reason);

            $editor.hide();

            active = table.activeCell;
            if ((active) && (active.length)) {

                var ValidationResult = true;
                var updateValue = true;
                var originalVal = _thisHelpers.GetActiveCellText(active);

                if (validator != undefined) {
                    var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                    var param = {
                        RecordGuid: guid,
                        EditorType: $editor.EditorType,
                        OriginalLabel: originalVal,
                        OriginalValue: active.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue),
                        NewLabel: selected.text(),
                        NewValue: selected.val()
                    };

                    ValidationResult = validator(param, CrmFieldInfo);
                    if (ValidationResult !== true) {
                        updateValue = false;
                    }
                }

                if (updateValue) {
                    _thisHelpers.SetActiveCellText(active, selected.text());
                    active.attr(_thisGlobals.ToolTipAttrName, selected.text());
                    active.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, selected.val());
                    active.attr(_thisGlobals.DataAttr.Cell.ChangedAttrValue, selected.val());
                    $editor.theUpdater();
                }
                active.focus();
            }

        } catch (e) {
            LogEx("Exception - Unable to setState\r\n" + e.message);
        }
        $editor.hide();
    })
    .appendTo($btndiv);

    var btnCancel = $('<button class="statusBoxControl"></button>')
        .attr('id', _thisHelpers.GenerateUUID())
        .text(_thisGlobals.Translation_Labels.Cancel)
        .on('click', function (e) {
            e.stopPropagation();
            $editor.hide();
        })
        .appendTo($btndiv);

    $editor.DestroyEditor = function () {
        $(window.document).off('mousedown');
        $editor.hide();
        btnOk.off('click');
        btnCancel.off('click');
        $editor.empty();
        $editor.remove();
    };

    $editor.CloseEditor = function () {
        $editor.hide();
    };

    function EntityStatusCallback(result) {
        var status = result[0].attributes.statecode.value;
        // This colud be undefined as this field is optional
        var statusreason = (result[0].attributes.statuscode) ? result[0].attributes.statuscode.value : -1;

        $statusReasonSelect.empty(); //.append('<option value="-1"></option>');

        for (var i = 0; i < $editor.EntityStates.StatusReason.length; i++) {
            if ($editor.EntityStates.StatusReason[i].state == status) {
                $statusReasonSelect.append($('<option>', {
                    value: $editor.EntityStates.StatusReason[i].value,
                    text: $editor.EntityStates.StatusReason[i].text
                }));
            }
        }

        $statusSelect.val(status);
        $statusReasonSelect.val(statusreason);
        active = table.activeCell;
        $editor.css({ 'left': active.offset().left, 'top': active.offset().top }).show();

        $(window.document).off('mousedown').on('mousedown', function (e) {
            if (e.target) {
                var ctlid = $(e.target).hasClass('statusBoxControl');

                if (!ctlid) {
                    if (e.target.tagName == 'OPTION') {
                        if ($(e.target).parent().hasClass('statusBoxControl')) {
                            return;
                        }
                    }
                    $editor.hide();
                }
            }
        });
    };

    $editor.SetInternals = function (curVal, recGuid) {
        $editor.RecId = recGuid;
        var fetch =
            '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
              '<entity name="' + schemaName + '">' +
                '<attribute name="' + $editor.PrimaryIdAttribute + '" />' +
                '<attribute name="statuscode" />' +
                '<attribute name="statecode" />' +
                '<filter type="and">' +
                  '<condition attribute="' + $editor.PrimaryIdAttribute + '" operator="eq" uitype="' + schemaName +
                    '" value="' + _thisHelpers.AddCurlyBrace(recGuid) + '" />' +
                '</filter>' +
              '</entity>' +
            '</fetch>';
        XrmServiceToolkit.Soap.Fetch(fetch, false, EntityStatusCallback);
    };

    return $editor;
};

$.fn.DCrmEditableGrid.Description = function (table, editorsArrayi, requiredErrorContainer) {
    'use strict';

    var active;
    var validator = editorsArrayi.validator;
    var required = editorsArrayi.RequireValue;
    var $errorcontainer = requiredErrorContainer;
    var CrmFieldInfo = {
        FieldSchemaName: editorsArrayi.FieldSchemaName,
        FieldLabel: editorsArrayi.FieldLabel,
        ParentEntitySchemaName: editorsArrayi.ParentEntitySchemaname,
        ParentEntityLabel: editorsArrayi.ParentEntityName
    }

    var DivContainer_ID = _thisHelpers.GenerateUUID();
    var Textarea_ID = _thisHelpers.GenerateUUID();
    var BtnOk_ID = _thisHelpers.GenerateUUID();
    var BtnCancel_ID = _thisHelpers.GenerateUUID();
    var BtnDiv_ID = _thisHelpers.GenerateUUID();

    var $editor = $('<div class="DescriptionBox"></div>')
        .attr('id', DivContainer_ID)
        .hide()
        .appendTo('body');
    $editor.EditorType = editorsArrayi.editor;
    $editor.theUpdater = undefined;
    $editor.RefreshOnSave = false;

    var $input = $("<textarea rows=5>")
        .attr('id', Textarea_ID)
        .on('keydown', function (e) {
            var tkey = e.which || e.keycode;
            setTimeout(HideError, 10);
            if (tkey == DCrmEditableGrid.Keys.ESC) {
                HideError();
                $editor.hide();
                active = table.activeCell;
                if ((active) && (active.length)) {
                    active.focus();
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        })
        .appendTo($editor);

    var MaxLength = undefined;
    if (editorsArrayi.MaxLength != 'A') {
        MaxLength = parseInt(editorsArrayi.MaxLength);
        if (isNaN(MaxLength)) {
            MaxLength = undefined;
        } else {
            $input.attr('maxlength', MaxLength);
        }
    }

    var $btndiv = $('<div class="flyout-ButtonContainer"></div>')
        .attr('id', BtnDiv_ID)
        .appendTo($editor);

    var btnOk = $("<button></button>")
        .attr('id', BtnOk_ID)
        .text(_thisGlobals.Translation_Labels.Ok)
        .on('click', function (e) {
            active = table.activeCell;
            if ((active === undefined) || (active.length === 0)) {
                //LogEx('Description: Unable to find active cell.');
                HideError();
                $editor.hide();
                return false;
            }

            var text = $input.val();
            

            if ((required) && ((text === undefined) || (text === null) || (text.trim().length == 0))) {
                var etop = active.offset().top - ($errorcontainer.height() + 8);
                var eleft = active.offset().left;
                $errorcontainer.css("left", eleft).css("top", etop).width(active.width() - 20).show();
                return false;
            }

            var activecelltext = _thisHelpers.GetActiveCellText(active);
            var originalVal = activecelltext;

            if (activecelltext === text) {
                HideError();
                $editor.hide();
                active.focus();
                return false;
            }

            var ValidationResult = true;
            var textUpdated = true;
            if (validator != undefined) {
                var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                var param = { RecordGuid: guid, EditorType: $editor.EditorType, OriginalValue: activecelltext, NewValue: text };

                ValidationResult = validator(param, CrmFieldInfo);
                if (ValidationResult === true) {
                    //active.text(text);
                    _thisHelpers.SetActiveCellText(active, text);
                } else {
                    textUpdated = false;
                }
            } else {
                //active.text(text);
                _thisHelpers.SetActiveCellText(active, text);
            }

            if (textUpdated) {
                $editor.theUpdater(active, originalVal);
                HideError();
                $editor.hide();
                active.focus();
            }
        })
        .appendTo($btndiv);

    var btnCancel = $("<button></button>")
        .attr('id', BtnCancel_ID)
        .text(_thisGlobals.Translation_Labels.Cancel)
        .on('click', function (e) {
            $editor.hide();
            HideError();
            active = table.activeCell;
            if ((active) && (active.length)) {
                active.focus()
            }
        })
        .appendTo($btndiv);

    $editor.SetInternals = function (curText) {
        $input.val(curText.trim()).focus();
        $input.focus();

        $(window.document).off('mousedown').on('mousedown', function (e) {
            if (e.target) {
                var ctlid = $(e.target).attr('id');
                if ((ctlid == DivContainer_ID) ||
                    (ctlid == Textarea_ID) ||
                    (ctlid == BtnDiv_ID) ||
                    (ctlid == BtnOk_ID) ||
                    (ctlid == BtnCancel_ID)) {
                } else {
                    $(window.document).off('mousedown');
                    HideError();
                    $editor.hide();
                    $(e.target).focus();
                }
            }
        });
    };

    var HideError = function () {
        if ($errorcontainer.is(':visible')) {
            $errorcontainer.hide();
        }
    };

    $editor.CloseEditor = function () {
        $editor.hide();
    };

    $editor.DestroyEditor = function () {
        btnOk.off('click');
        btnCancel.off('click');
        $input.off('keydown');
        $editor.empty();
        $editor.remove();
    };

    return $editor;
};

$.fn.DCrmEditableGrid.OptionSet = function (table, editorsArrayi, requiredErrorContainer) {
    'use strict';

    var active;
    var validator = editorsArrayi.validator;
    var required = editorsArrayi.RequireValue;
    var $errorcontainer = requiredErrorContainer;
    var CrmFieldInfo = {
        FieldSchemaName: editorsArrayi.FieldSchemaName,
        FieldLabel: editorsArrayi.FieldLabel,
        ParentEntitySchemaName: editorsArrayi.ParentEntitySchemaname,
        ParentEntityLabel: editorsArrayi.ParentEntityName
    }

    var elemId = _thisHelpers.GenerateUUID();
    var $editor = $("<select class='OptionsetEditor' tabIndex='0'></select>")
        .attr('id', elemId)
    .on('blur', function (e) {
        HideError();
        $editor.hide();
    })
    .on('change', function (e) {
        console.log(e);

        HideError();

        var selected = $editor.find(":selected");

        $editor.hide();

        active = table.activeCell;
        if ((active) && (active.length)) {

            var ValidationResult = true;
            var updateValue = true;
            var originalVal = _thisHelpers.GetActiveCellText(active);

            if (validator != undefined) {
                var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                var param = {
                    RecordGuid: guid,
                    EditorType: $editor.EditorType,
                    OriginalLabel: originalVal,
                    OriginalValue: active.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue),
                    NewLabel: selected.text(),
                    NewValue: selected.val()
                };

                ValidationResult = validator(param, CrmFieldInfo);
                if (ValidationResult !== true) {
                    updateValue = false;
                }
            }

            if (updateValue) {
                _thisHelpers.SetActiveCellText(active, selected.text());
                active.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, selected.val());
                active.attr(_thisGlobals.DataAttr.Cell.ChangedAttrValue, selected.val());
                $editor.theUpdater(active, originalVal, 'op');
            }
            active.focus();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    })
    .on('keydown', function (e) {
        var tkey = e.which || e.keycode;
        var prevent = false;
        if (tkey === DCrmEditableGrid.Keys.ESC) {
            HideError();
            $editor.hide();
            active = table.activeCell;
            if ((active) && (active.length)) {
                active.focus();
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        if (tkey == DCrmEditableGrid.Keys.TAB) {
            tkey = DCrmEditableGrid.Keys.ARROWRIGHT;
        }
        if ((tkey == DCrmEditableGrid.Keys.ARROWLEFT) && (tkey == DCrmEditableGrid.Keys.ARROWRIGHT)) { // Arrow keys
            prevent = true;
            $editor.hide();
            active = table.activeCell;
            if ((active) && (active.length)) {
                var possibleMove = _thisHelpers.Movement(active, tkey);
                if ((possibleMove) && (possibleMove.length) && (possibleMove.length > 0)) {
                    $editor.PossibleMove = possibleMove;
                    setTimeout(function () {
                        $editor.PossibleMove.focus();
                        $editor.PossibleMove.trigger("click");
                    }, 50);
                } else {
                    active.focus();
                }
            }
        }

        //console.log("prevent [" + prevent + "] tkey [" + tkey + "]");

        if (prevent) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    })
    .css('position', 'absolute').hide()
    .appendTo(table.parent());

    $editor.optionsData = editorsArrayi.OptionSetData;
    $editor.EditorType = editorsArrayi.editor;
    $editor.theUpdater = undefined;
    $editor.RefreshOnSave = false;
    $editor.EditorId = elemId;
    $editor.PossibleMove = undefined;

    $editor.SetInternals = function (curText) {
        $.each($editor.optionsData, function (i, item) {
            if (item.text == curText) {
                $editor.val(item.value);
            }
        });
        $editor.focus();
        var select = $editor[0];
        select.size = 6;
    };

    var HideError = function () {
        if ($errorcontainer.is(':visible')) {
            $errorcontainer.hide();
        }
    };

    $editor.CloseEditor = function () {
        if ($editor.is(':visible')) {
            $editor.hide();
        }
    };

    $editor.DestroyEditor = function () {
        $editor.off('blur').off('change').off('keydown');
        $editor.remove();
    };

    function GetOptionsetData(optionset) {
        if ((optionset) && (optionset.length > 0)) {
            var callbackData = { Option: undefined };

            for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                //console.log("LocalizedLabels[0] [" + optionset[0].OptionSet.Options[i].Label.LocalizedLabels[0].Label + "]");

                $editor.optionsData.push(
                {
                    text: _thisHelpers.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label),
                    value: optionset[0].OptionSet.Options[i].Value,
                    // in case of status reason, contains which state this option of status reason belongs to
                    // state: optionset[0].OptionSet.Options[i].State,
                    readonly: false
                });
                if (window.parent.DCrmEgGridOnload) {
                    callbackData.Option = $editor.optionsData[i];
                    window.parent.DCrmEgGridOnload(callbackData, CrmFieldInfo);
                }
            }

            $.each($editor.optionsData, function (i, item) {
                if (item.readonly) {
                    $editor.append($('<option disabled="true" value="' + item.value + '">' + item.text + '</option>'));
                } else {
                    $editor.append($('<option>', {
                        value: item.value,
                        text: item.text
                    }));
                }
            });

        }
    };

    XrmServiceToolkit.Soap.RetrieveAttributeMetadata(editorsArrayi.ParentEntitySchemaname, editorsArrayi.FieldSchemaName, true, GetOptionsetData);

    return $editor;
};

$.fn.DCrmEditableGrid.Lookup = function (table, editorsArrayi, requiredErrorContainer, inputFormatErrorContainer) {
    'use strict';

    var active;
    var LookupDataInitialized = false;
    var validator = editorsArrayi.validator;
    var required = editorsArrayi.RequireValue;
    var $errorcontainer = requiredErrorContainer;
    var $inputformaterror = inputFormatErrorContainer;
    var CrmFieldInfo = {
        FieldSchemaName: editorsArrayi.FieldSchemaName,
        FieldLabel: editorsArrayi.FieldLabel,
        ParentEntitySchemaName: editorsArrayi.ParentEntitySchemaname,
        ParentEntityLabel: editorsArrayi.ParentEntityName
    }

    /*
    LookupData
        LookupId: "", (576dfa60-6456-e511-80c0-080027c01cb9)
        LookupLogicalName: "", (incident, owner, customer, lead)
        LookupName: "", (Average order shipment time (sample))
        LookupTargetEntity: "account,contact"
        DefaultView: 576dfa60-6456-e511-80c0-080027c01cb9
        DefaultViewFetchXml: null
        DefaultViewObjectTypeCode: "112"

        TargetEntities:
        [
            {
                Target: '', account
                PrimaryIdAttribute: '', accountid
                PrimaryNameAttribute: '', name
                ObjectTypeCode: '', 1
                LocalizedLabel: '' Account
            }
        ]

    */

    var $editor = $('<div class="LookupContainer"></div>').hide().appendTo(table.parent());
    $editor.EditorType = editorsArrayi.editor;
    $editor.theUpdater = undefined;
    $editor.RefreshOnSave = false;
    $editor.HasLookupInitialized = false;
    $editor.LookupData = editorsArrayi.LookupData;

    // How many menus we display
    var dropdownMenuSize = ($editor.LookupData.TargetEntities.length == 1) ? 5 : 3;

    var Input_ID = _thisHelpers.GenerateUUID();
    var $input = $('<input class="LookupInput" type="text" />').attr('id', Input_ID).appendTo($editor);

    var Img_ID = _thisHelpers.GenerateUUID();
    var $img = $('<button class="LookupSearchBtn"></button>')
        .attr('id', Img_ID)
        .on('click', function (e) {
            e.stopPropagation();

            if (!$editor.HasLookupInitialized) {
                $editor.HasLookupInitialized = true;
                FetchAndPopulate();
            }

            HideError();
            var coordinates = GetMenuCoordinates();
            $menu.css({ 'left': coordinates.left, 'top': coordinates.top }).show();
        })
        .appendTo($editor);
    var $menu = $('<ul class="lookupDropDown"><div class="gutterLine"></div></ul>')
        .hide()
        .css({ 'left': 25, 'top': 0 })
        .appendTo(table.parent());

    function GetMenuCoordinates() {
        return { left: $editor.offset().left, top: ($editor.offset().top + $editor.height()) };
    }

    function InitializaLookupData() {
        LookupDataInitialized = true;
        for (var i = 0; i < $editor.LookupData.TargetEntities.length; i++) {
            var helper = new LookupDataHelper($editor.LookupData.TargetEntities[i]);
        }
    }

    function DoesAttributeExists(entityname, attrname) {
        try {
            var attr = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(entityname, attrname, true);
        } catch (e) {
            LogIt("Attribute " + attrname + " does not exist in " + entityname);
            return false;
        }
        return ((attr) && (attr.length) && (attr.length > 0));
    }

    function FetchtargetEntity(i) {
        if ($editor.LookupData.TargetEntities.length == 0) {
            return [];
        }

        if (DoesAttributeExists($editor.LookupData.TargetEntities[i].Target, $editor.LookupData.TargetEntities[i].PrimaryIdAttribute)) {
            var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" page="1" count="' + dropdownMenuSize + '">' +
              '<entity name="' + $editor.LookupData.TargetEntities[i].Target + '">' +
                '<attribute name="' + $editor.LookupData.TargetEntities[i].PrimaryIdAttribute + '" />' +
                '<attribute name="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" />' +
                '<order attribute="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" descending="false" />' +
                //'<filter type="and">' +
                //  '<condition attribute="statecode" operator="eq" value="0" />' +
                //'</filter>' +
              '</entity>' +
            '</fetch>';
            return XrmServiceToolkit.Soap.Fetch(fetch);
        }

        return '';
    }

    function FetchtargetEntityPartial(searchfor, i) {
        if ($editor.LookupData.TargetEntities.length == 0) {
            return [];
        }
        searchfor = searchfor.replace('&', '&amp;').replace('<', "&lt;").replace('>', "&gt;");
        LogIt("FetchtargetEntityPartial " + searchfor);
        var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" page="1" count="' + dropdownMenuSize + '">' +
          '<entity name="' + $editor.LookupData.TargetEntities[i].Target + '">' +
            '<attribute name="' + $editor.LookupData.TargetEntities[i].PrimaryIdAttribute + '" />' +
            '<attribute name="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" />' +
            '<order attribute="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" descending="false" />' +
            '<filter type="and">' +
              //'<condition attribute="statecode" operator="eq" value="0" />' +
               '<condition attribute="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" operator="like" value="%' + searchfor + '%" />' +
            '</filter>' +
          '</entity>' +
        '</fetch>';
        return XrmServiceToolkit.Soap.Fetch(fetch);
    }

    function FetchtargetEntityExact(searchfor, i) {
        if ($editor.LookupData.TargetEntities.length == 0) {
            return [];
        }
        searchfor = searchfor.replace('&', '&amp;').replace('<', "&lt;").replace('>', "&gt;");
        LogIt("FetchtargetEntityExact " + searchfor);
        var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" page="1" count="' + dropdownMenuSize + '">' +
          '<entity name="' + $editor.LookupData.TargetEntities[i].Target + '">' +
            '<attribute name="' + $editor.LookupData.TargetEntities[i].PrimaryIdAttribute + '" />' +
            '<attribute name="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" />' +
            '<order attribute="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" descending="false" />' +
            '<filter type="and">' +
              //'<condition attribute="statecode" operator="eq" value="0" />' +
               '<condition attribute="' + $editor.LookupData.TargetEntities[i].PrimaryNameAttribute + '" operator="eq" value="' + searchfor + '" />' +
            '</filter>' +
          '</entity>' +
        '</fetch>';
        return XrmServiceToolkit.Soap.Fetch(fetch);
    }

    function FetchAndValidateExcat(text) {
        for (var i = 0; i < $editor.LookupData.TargetEntities.length; i++) {
            var result = FetchtargetEntityExact(text, i);
            if (result.length == 1) {
                $input.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, result[0].attributes[$editor.LookupData.TargetEntities[i].PrimaryIdAttribute].value);
                $input.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupData.TargetEntities[i].Target);
                return true;
            }
        }
        return false;
    }

    function FetchAndPopulatePartial(text) {
        $menu.find('li').remove();
        var haveAnyRec = 0;
        for (var i = 0; i < $editor.LookupData.TargetEntities.length; i++) {
            $('<li>' + $editor.LookupData.TargetEntities[i].LocalizedLabel + '</li>').addClass('header').appendTo($menu);
            haveAnyRec += PopulateDropDown(FetchtargetEntityPartial(text, i), i);
        }
        AddMenuTail();
        return haveAnyRec;
    }

    function FetchAndPopulate() {
        $menu.find('li').remove();
        var haveAnyRec = 0;

        for (var i = 0; i < $editor.LookupData.TargetEntities.length; i++) {
            $('<li>' + $editor.LookupData.TargetEntities[i].LocalizedLabel + '</li>').addClass('header').appendTo($menu);
            haveAnyRec += PopulateDropDown(FetchtargetEntity(i), i);
        }
        AddMenuTail();
        return haveAnyRec;
    }

    function AddMenuTail() {
        // Add a sep and "Lookup more records" as a last menu item 
        // Way unsupported
        $('<li></li>').addClass('divider').appendTo($menu);
        var $row = $('<li></li>').appendTo($menu);
        var $href = $('<a href="#" class="LookupLink"></a>')
            .click(function (e) {
                //var url = "/_controls/lookup/lookupsingle.aspx?objecttypes=1,2";
                // /_controls/lookup/lookupinfo.aspx?LookupStyle=multi&objecttypes=
                var otc = '';
                for (var i = 0; i < $editor.LookupData.TargetEntities.length; i++) {
                    if (i > 0) {
                        otc += ',' + $editor.LookupData.TargetEntities[i].ObjectTypeCode;
                    } else {
                        otc += $editor.LookupData.TargetEntities[i].ObjectTypeCode;
                    }
                }
                var url = "/_controls/lookup/lookupinfo.aspx?LookupStyle=single" + "&objecttypes=" + otc + ($editor.LookupData.DefaultView ? '&DefaultViewId=' + $editor.LookupData.DefaultView + '&DefaultType=' + $editor.LookupData.DefaultViewObjectTypeCode : '');

                /*
                Query String Parameters for Customer (account, contact)
AllowFilterOff:0
DefaultType:1
DefaultViewId:{A9AF0AB8-861D-4CFA-92A5-C6281FED7FAB}
DisableQuickFind:0
DisableViewPicker:0
IsInlineMultiLookup:0
LookupStyle:single
ShowNewButton:1
ShowPropButton:1
browse:false
currentObjectType:112
currentid:{5B6DFA60-6456-E511-80C0-080027C01CB9}
dType:1
mrsh:false
objecttypes:1,2

Request URL:http://localhost/Demo/_controls/lookup/lookupinfo.aspx?AllowFilterOff=0&DefaultType=1&DefaultViewId=%7bA9AF0AB8-861D-4CFA-92A5-C6281FED7FAB%7d&DisableQuickFind=0&DisableViewPicker=0&IsInlineMultiLookup=0&LookupStyle=single&ShowNewButton=1&ShowPropButton=1&browse=false&currentObjectType=112&currentid=%7b5B6DFA60-6456-E511-80C0-080027C01CB9%7d&dType=1&mrsh=false&objecttypes=1%2c2
                */

                //Dialog Options would be set here
                var DialogOptions = new window.parent.Xrm.DialogOptions();
                DialogOptions.width = 700;
                DialogOptions.height = 700;
                window.parent.Xrm.Internal.openDialog(
                    window.parent.Mscrm.CrmUri.create(url).toString(),
                    DialogOptions, null, null, CallbackFunction);
                $menu.hide();
                return false;
            })
            .appendTo($row);
        var $span = $('<span class="LookupLinkSpan"></span>')
            .text(_thisGlobals.Translation_Labels.LookupMoreRecords)
            .addClass('itemTitle')
            .appendTo($href);
    }

    //Call back function for the Lookup
    function CallbackFunction(returnValue) {
        if ((returnValue) && (returnValue.items) && (returnValue.items[0].id) && (returnValue.items[0].name)) {
            //LogIt("name " + returnValue.items[0].name + " GUID " + returnValue.items[0].id); // Includes {}
            $editor.LookupData.LookupName = returnValue.items[0].name;
            $editor.LookupData.LookupId = returnValue.items[0].id.replace('{', '').replace('}', '');
            // returnValue.items[0].type "112"
            $editor.LookupData.LookupLogicalName = returnValue.items[0].typename // 'incident" LogicalName

            active = table.activeCell;
            if ((active === undefined) || (active.length === 0)) {
                $input.val($editor.LookupData.LookupName).attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, $editor.LookupData.LookupId);
                $menu.hide();
                $input.focus();
                return false;
            }

            var originalVal = _thisHelpers.GetActiveCellText(active);

            if (InvokeValidator(
                $editor.LookupData.LookupName,
                $editor.LookupData.LookupId,
                $editor.LookupData.LookupLogicalName,
                originalVal,
                active.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid),
                active.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName))) {
                _thisHelpers.SetActiveCellText(active, $editor.LookupData.LookupName);
                active.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, $editor.LookupData.LookupId);
                active.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupData.LookupLogicalName);
                $editor.theUpdater(active, originalVal, 'lo');
                $editor.hide();
                $menu.hide();
                active.focus();
                return false;
            } else {
                $menu.hide();
                //$bg.hide();
                $input.focus();
                return false;
            }
        }
    }

    function PopulateDropDown(list, dataIndex) {
        var listlen = dropdownMenuSize;
        if (list.length < dropdownMenuSize) {
            listlen = list.length;
        }

        if (listlen == 0) {
            return listlen;
        }
        var $row, $href, $span, icon;

        for (var i = 0; i < listlen; i++) {
            if (!list[i].attributes[$editor.LookupData.TargetEntities[dataIndex].PrimaryNameAttribute]) {
                continue;
            }
            var $row = $('<li></li>').appendTo($menu);
            var $href = $('<a href="#" class="LookupLink"></a>')
                .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, list[i].attributes[$editor.LookupData.TargetEntities[dataIndex].PrimaryIdAttribute].value)
                .attr(_thisGlobals.DataAttr.Cell.Lookup.EntityName, list[i].attributes[$editor.LookupData.TargetEntities[dataIndex].PrimaryNameAttribute].value)
                .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupData.TargetEntities[dataIndex].Target)
                .on('click', function (e) {
                    HideError();
                    $editor.LookupData.LookupId = $(this).attr(_thisGlobals.DataAttr.Cell.Lookup.Guid);
                    $editor.LookupData.LookupName = $(this).attr(_thisGlobals.DataAttr.Cell.Lookup.EntityName);
                    $editor.LookupData.LookupLogicalName = $(this).attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName);

                    active = table.activeCell;
                    if ((active === undefined) || (active.length === 0)) {
                        $input.val($editor.LookupData.LookupName).attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, $editor.LookupData.LookupId).attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupData.LookupLogicalName);
                        $menu.hide();
                        $input.focus();
                        return false;
                    }

                    var originalVal = _thisHelpers.GetActiveCellText(active);
                    if (InvokeValidator(
                        $editor.LookupData.LookupName,
                        $editor.LookupData.LookupId,
                        $editor.LookupData.LookupLogicalName,
                        originalVal,
                        active.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid),
                        active.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName))) {
                        _thisHelpers.SetActiveCellText(active, $editor.LookupData.LookupName);
                        active.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, $editor.LookupData.LookupId);
                        active.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupData.LookupLogicalName);
                        $editor.theUpdater(active, originalVal, 'lo');
                        $editor.hide();
                        $menu.hide();
                        active.focus();
                        return false;
                    } else {
                        $menu.hide();
                        $input.focus();
                        return false;
                    }

                })
                .appendTo($row);
            var $span = $('<span class="LookupLinkSpan"></span>')
                .text(list[i].attributes[$editor.LookupData.TargetEntities[dataIndex].PrimaryNameAttribute].value)
                .addClass('itemTitle')
                .appendTo($href);

            //var icon = $('<img>');
            //icon.attr('src', 'dcrmeg_record');
            //icon.insertBefore($row.find('.itemTitle'));
        }

        return listlen;
    }

    // Sort the data for searching
    function compare(a, b) {
        if (a.Name < b.Name)
            return -1;
        if (a.Name > b.Name)
            return 1;
        return 0;
    }

    function compareids(a, b) {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    }

    $input.on('keydown', function (e) {
        var tkey = e.which || e.keycode;
        HideError();

        if (tkey === DCrmEditableGrid.Keys.ENTER) {

            setTimeout(HideError, 10);
            active = table.activeCell;
            if ((active === undefined) || (active.length === 0)) {
                $editor.hide();
                $menu.hide();
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            var originalVal = _thisHelpers.GetActiveCellText(active);
            var orgGuid = active.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid);
            var orgLogicalName = active.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName);
            var text = $input.val();

            if (text.trim().length == 0) {

                if (required) {
                    var etop = active.offset().top - ($errorcontainer.height() + 8);
                    var eleft = active.offset().left;
                    $errorcontainer.css("left", eleft).css("top", etop).width(active.width() - 20).show();
                    $input.focus().select();
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                _thisHelpers.SetActiveCellText(active, text);
                active.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, "");
                $editor.theUpdater(active, originalVal, 'lo');
                $editor.hide();
                $menu.hide();
                active.focus();
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (!FetchAndValidateExcat(text)) {
                // Not valid entity reference
                setTimeout(function () { setupInvalidFormat(_thisGlobals.Translation_Labels.NotaValidEntry); }, 10);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (originalVal === text) {
                $editor.hide();
                $menu.hide();
                //$bg.hide();
                active.focus();
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            var guid = $input.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid);
            var newLogicalName = $input.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName);
            if (InvokeValidator(text, guid, newLogicalName, originalVal, orgGuid, orgLogicalName)) {
                // update TableManager cache
                $editor.theUpdater(active, originalVal, 'lo');
                $editor.hide();
                $menu.hide();
                //$bg.hide();
                active.focus();
            }

            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        if (tkey === DCrmEditableGrid.Keys.ESC) {
            setTimeout(HideError, 10);
            $editor.hide();
            $menu.hide();
            //$bg.hide();
            active = table.activeCell;
            if ((active) && (active.length)) {
                active.focus();
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        if (tkey === DCrmEditableGrid.Keys.TAB) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

    }).on('cut paste', function (e) {
        setTimeout(HideError, 10);
        setTimeout(function () {
            var val = $input.val();
            if (val.trim().length > 0) {
                val = val.toLowerCase();
                //LogIt("Cut Paste input value " + val);
                if (FetchAndPopulatePartial(val) > 0) {
                    var coordinates = GetMenuCoordinates();
                    $menu.css({ 'left': coordinates.left, 'top': coordinates.top }).show();
                } else {
                    $menu.hide();
                }
            }
        }, 5);
    }).on('keyup', function (e) {
        var text = $input.val();
        //LogIt("Key up text " + text);
        if (text.trim().length > 0) {
            if (FetchAndPopulatePartial(text) > 0) {
                var coordinates = GetMenuCoordinates();
                $menu.css({ 'left': coordinates.left, 'top': coordinates.top }).show();
            } else {
                $menu.hide();
            }
        } else {
            if (FetchAndPopulate() > 0) {
                var coordinates = GetMenuCoordinates();
                $menu.css({ 'left': coordinates.left, 'top': coordinates.top }).show();
            } else {
                $menu.hide();
            }
        }
    });

    $editor.SetWidthAndLocation = function (data) {
        $editor.offset({ 'left': data.left, 'top': data.top }).width(data.width + 1);
        $input.width($editor.width() - 30);
    };

    $editor.SetInternals = function (curText, Guid, LogicalName) {
        if (!LookupDataInitialized) {
            InitializaLookupData();
        }

        $editor.show();
        $input
            .width($editor.width() - 30)
            .height($editor.height())
            .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, Guid)
            .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, LogicalName)
            .val(curText)
            .focus()
            .select();

        $editor.LookupData.LookupName = curText;
        $editor.LookupData.LookupId = Guid;
        $editor.LookupData.LookupLogicalName = LogicalName;

        $(window.document).off('mousedown').on('mousedown', function (e) {
            if (e.target) {
                var ctlid = $(e.target).attr('id');

                if ((ctlid == Input_ID) || (ctlid == Img_ID) || ($(e.target).hasClass('LookupLinkSpan'))) {
                } else {
                    $(window.document).off('mousedown');
                    $editor.CloseEditor();
                    $(e.target).focus();
                }
            }
        });
    };

    var InvokeValidator = function (newText, newGuid, newLogicalName, OrgText, OrgGuid, OrgLogicalName) {
        var ValidationResult = true;
        var textUpdated = true;
        if (validator != undefined) {
            var guid = active.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
            var param = {
                RecordGuid: guid,
                EditorType: $editor.EditorType,
                OriginalLabel: OrgText,
                OriginalGuid: OrgGuid,
                OriginalLogicalName: OrgLogicalName,
                NewLabel: newText,
                NewGuid: newGuid,
                NewLogicalName: newLogicalName
            };

            textUpdated = validator(param, CrmFieldInfo);
        }

        if (textUpdated) {
            //active.text(newText);
            _thisHelpers.SetActiveCellText(active, newText);
            active.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, newGuid);
            active.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, newLogicalName);
            active.attr(_thisGlobals.DataAttr.Cell.ChangedAttrValue, newGuid);
        }

        return textUpdated;
    };

    var HideError = function () {
        if ($errorcontainer.is(':visible')) {
            $errorcontainer.hide();
        }
        if ($inputformaterror.is(':visible')) {
            $inputformaterror.hide();
        }
    };

    var setupInvalidFormat = function (txt) {
        var etop = active.offset().top - ($inputformaterror.height() + 8);
        var eleft = active.offset().left;
        $inputformaterror.text(txt).css("left", eleft).css("top", etop).width(active.width() - 20).show();
        $input.focus();
    }

    $editor.CloseEditor = function () {
        if ($editor.is(':visible')) {
            $editor.hide();
            $menu.hide();
        }
    };

    $editor.DestroyEditor = function () {
        $editor.off('keydown').off('cut').off('paste').off('keyup');
        var tt = $menu.find('a');
        if ((tt) && (tt.length)) {
            tt.off('click');
        }
        $menu.remove();
        $editor.remove();
    };

    InitializaLookupData();

    return $editor;
};

var LookupDataHelper = (function () {
    function LookupDataHelper(lookupDataToUpdate) {
        var self = this;

        self.lookupData = lookupDataToUpdate;
        self.Callback = function (result) {
            if ((result) && (result.length === 1)) {
                self.lookupData.ObjectTypeCode = result[0].ObjectTypeCode;
                self.lookupData.LocalizedLabel = _thisHelpers.GetUserLocalizedLabel(result[0].DisplayName, result[0].LogicalName);
                self.lookupData.PrimaryNameAttribute = result[0].PrimaryNameAttribute;
                self.lookupData.PrimaryIdAttribute = result[0].PrimaryIdAttribute;
            }
        }

        XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Entity'], lookupDataToUpdate.Target, true, self.Callback);
    }

    return LookupDataHelper;
})();

$.fn.DCrmEditableGrid.FilterLookup = function (parentdiv) {
    'use strict';
    parentdiv = parentdiv || $('#fieldfilter_lookupinput');

    var $editor = $('<div style="display:inline-block;border:none;"></div>').appendTo(parentdiv);
    $editor.HasLookupInitialized = false;

    $editor.LookupCtrData = {};
    var dropdownMenuSize = 5;

    var Input_ID = _thisHelpers.GenerateUUID();
    $editor.$input = $('<input style="width:160px;border: solid 1px lightgray;" type="text" />').attr('id', Input_ID).appendTo($editor);

    var Img_ID = _thisHelpers.GenerateUUID();
    var $img = $('<button class="LookupSearchBtn"></button>')
        .attr('id', Img_ID)
        .on('click', function (e) {
            e.stopPropagation();

            if (!$editor.HasLookupInitialized) {
                $editor.HasLookupInitialized = true;
                FetchAndPopulate();
            }

            var top = parentdiv.offset().top + parentdiv.height();
            $menu.css({ 'left': parentdiv.offset().left, 'top': top }).show();
        })
        .appendTo($editor);

    //var EntityFieldsContainer_ID = _thisHelpers.GenerateUUID();
    //var $EntityFieldsContainer = $('<div style="border:0;margin:5px 0 0 0;padding:0 0 5px 0;font-weight:bold;">Click to filter using link entity fields</div>')
    //    .attr('id', EntityFieldsContainer_ID).appendTo($editor)
    //    .on('click', function (e) {
    //        e.stopPropagation();
    //        $FieldsSelect.toggle();
    //    });
    //var FieldsSelect_ID = _thisHelpers.GenerateUUID();
    //var $FieldsSelect = $('<table class="fixed_headers"><thead><tr><th></th><th>Name</th><th>Schema</th><th>Type</th></tr></thead><tbody></tbody></table>')
    //    .appendTo($EntityFieldsContainer).hide();

    var $menu = $('<ul class="lookupDropDown"><div class="gutterLine"></div></ul>')
        .hide()
        .css({ 'left': 25, 'top': 0 })
        .appendTo('body');

    function InitializaLookupData() {
        for (var i = 0; i < $editor.LookupCtrData.TargetEntities.length; i++) {
            var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Entity'], $editor.LookupCtrData.TargetEntities[i].Target, true);
            if ((result) && (result.length === 1)) {
                $editor.LookupCtrData.ObjectTypeCodes[i] = result[0].ObjectTypeCode;
                $editor.LookupCtrData.LocalizedLabels[i] = _thisHelpers.GetUserLocalizedLabel(result[0].DisplayName, result[0].LogicalName);
                $editor.LookupCtrData.PrimaryNameAttributes[i] = result[0].PrimaryNameAttribute;
                $editor.LookupCtrData.PrimaryIdAttributes[i] = result[0].PrimaryIdAttribute;
            }
        }
        /*
        if ($editor.LookupCtrData.TargetEntities.length == 1) {
            var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Attributes'], $editor.LookupCtrData.TargetEntities[0].Target, true);
            if ((result) && (result.length > 0)) {
                try {

                    var AllFieldsMetadata = [];
                    var fieldexclusion = ['createdonbehalfby', 'exchangerate', 'importsequencenumber', 'modifiedonbehalfby', 'overriddencreatedon', 'owningbusinessunit', 'owningteam', 'owninguser', 'timezoneruleversionnumber', 'utcconversiontimezonecode', 'versionnumber'];
                    // 
                    var attrTypeExclusion = ["lookup", "customer", "owner", "state", "status", "boolean", "picklist", "datetime", "string", "memo", "integer", "double", "decimal", "money"];

                    var schName = '';
                    var attrType = '';
                    var lbl = '';

                    for (index = 0, j = result[0].Attributes.length; index < j; index++) {
                        ent = result[0].Attributes[index];

                        if (ent.AttributeOf == null) {
                            schName = ent.SchemaName.toLowerCase();
                            attrType = ent.AttributeType.toLowerCase();

                            if ((fieldexclusion.ExactMatchExists(schName) == false) && (attrTypeExclusion.ExactMatchExists(attrType) == true)) {
                                lbl = _thisHelpers.GetUserLocalizedLabel(ent.DisplayName, ent.SchemaName);

                                AllFieldsMetadata.push({
                                    SchemaName: schName,
                                    Name: lbl,
                                    AttrType: attrType,
                                    LookupTargetEntity: ((ent.Targets) && (ent.Targets.length)) ? ent.Targets.join(',').toLowerCase() : null
                                });
                            }
                        }
                    }

                    if (AllFieldsMetadata.length > 0) {
                        AllFieldsMetadata.sort(function (a, b) {
                            var alabel = (a.Name);
                            var blabel = (b.Name);
                            if (alabel < blabel)
                            { return -1 }
                            if (alabel > blabel)
                            { return 1 }
                            return 0;
                        });

                        var fbody = $FieldsSelect.find('tbody');
                        fbody.empty();
                        //btnclass += ' checklistbuttoncondition';
                        for (var i = 0; i < AllFieldsMetadata.length; i++) {
                            var trbody = $('<tr></tr>');
                            var $ftd = $('<td></td>');
                            var fdata = "{'Name':'" + AllFieldsMetadata[i].Name +
                                "','Schema':'" + AllFieldsMetadata[i].SchemaName +
                                "','AttrType':'" + AllFieldsMetadata[i].AttrType + "'}";

                            var $fbtn = $('<button data-fieldinfo="' + fdata + '" class="fieldoptionsettingbutton"></button>')
                                .attr(_thisGlobals.ToolTipAttrName, 'Filter')
                                .on('click', function (e) {
                                    e.stopPropagation();
                                    var _thisbtn = $(this);

                                    var d = _thisbtn.attr('data-fieldinfo');
                                    var o = JSON.parse(d.replace(/'/g, '"'));
                                    o.TargetEntities = $(this).attr('data-lookuptarget-entities');
                                    console.log("object", o);

                                    var cont = GetFilterContainer(o.AttrType);
                                    // clone div
                                    var cloneddiv = $(cont.div).clone();
                                    var clonedivid = _thisHelpers.GenerateUUID()
                                    cloneddiv.attr('id', clonedivid).removeClass('hidefilters').addClass('linkedentityfilters');
                                    var select = cloneddiv.find('select:first')
                                    select.attr('id', _thisHelpers.GenerateUUID());
                                    var lbl = cloneddiv.find('label:first');
                                    lbl.attr('id', _thisHelpers.GenerateUUID()).attr('for', select.attr('id'));

                                    var filterinput = $(cont.input).clone().attr('id', _thisHelpers.GenerateUUID())
                                        .appendTo(cloneddiv).removeClass('hidefilters');

                                    // For dates, need to add a datepicker
                                    // for optionsets and booleans, need to add a select2 style
                                    // wire events to store the information as usual
                                    // read this info in the fieldfilter_btnok event

                                    // Buttons
                                    var btncontainer = $('<div class="linkedentityfiltersbtncontainer"></div>').appendTo(cloneddiv);
                                    $('<button>OK</button>').appendTo(btncontainer).on('click', function (e) {
                                        e.stopPropagation();
                                        $(this).parent().parent().remove();
                                    });
                                    $('<button>Cancel</button>').appendTo(btncontainer).on('click', function (e) {
                                        e.stopPropagation();
                                        $(this).parent().parent().remove();
                                    });
                                    $('<button>Del</button>').appendTo(btncontainer).on('click', function (e) {
                                        e.stopPropagation();
                                        $(this).parent().parent().remove();
                                    });

                                    $('#fieldfilter_btncancel').attr('data-linkentity-filterid', clonedivid);
                                    $('#fieldfilter_btnok').attr('data-linkentity-filterid', clonedivid);

                                    cloneddiv
                                        .appendTo('body')
                                        .css({ 'z-index': 10009, 'left': _thisbtn.offset().left, 'top': _thisbtn.offset().top })
                                        .width(200).height(80)
                                        .show();
                                })
                                .appendTo($ftd);
                            if (AllFieldsMetadata[i].LookupTargetEntity) {
                                $fbtn.attr('data-lookuptarget-entities', AllFieldsMetadata[i].LookupTargetEntity);
                            }
                            $ftd.appendTo(trbody);
                            $('<td>' + AllFieldsMetadata[i].Name + '</td>').attr(_thisGlobals.ToolTipAttrName, AllFieldsMetadata[i].Name).appendTo(trbody);
                            $('<td>' + AllFieldsMetadata[i].SchemaName + '</td>').attr(_thisGlobals.ToolTipAttrName, AllFieldsMetadata[i].SchemaName).appendTo(trbody);
                            $('<td>' + AllFieldsMetadata[i].AttrType + '</td>').attr(_thisGlobals.ToolTipAttrName, AllFieldsMetadata[i].AttrType).appendTo(trbody);

                            trbody.appendTo(fbody);
                       }
                       $EntityFieldsContainer.show();
                    }

                } catch (e) {
                    LogEx("unable to retreive entity metadata\r\n" + e.message);
                }
            }
        } else {
            $FieldsSelect.find('tbody').empty();
            $EntityFieldsContainer.hide();
        }
*/
    };

    $editor.ResetFilterLookup = function (lookupTargetEntities, curText, Guid, LogicalName) {
        $editor.HasLookupInitialized = false;
        /*
        LookupData
            LookupId: "", (576dfa60-6456-e511-80c0-080027c01cb9)
            LookupLogicalName: "", (incident, owner, customer, lead)
            LookupName: "", (Average order shipment time (sample))
    
            TargetEntities:
            [
                {
                    Target: '', account
                    PrimaryIdAttribute: '', accountid
                    PrimaryNameAttribute: '', name
                    ObjectTypeCode: '', 1
                    LocalizedLabel: '' Account
                }
            ]
    
        */

        var earr = lookupTargetEntities.split(',');
        $editor.LookupCtrData = {
            LookupId: Guid,
            LookupLogicalName: LogicalName,
            LookupName: curText,
			
            PrimaryIdAttributes: [],
            PrimaryNameAttributes: [],
            ObjectTypeCodes: [],
            LocalizedLabels: [],
			
            EntityTargets: earr,
            EntityTargetsOriginal: lookupTargetEntities,

            TargetEntities: []
        };
        
        for (var earrindex = 0; earrindex < earr.length; earrindex++) {
            $editor.LookupCtrData.TargetEntities.push({
                Target: earr[earrindex],
                PrimaryIdAttribute: null,
                PrimaryNameAttribute: null,
                ObjectTypeCode: null,
                LocalizedLabel: null
            });
        }

        if ($editor.LookupCtrData.TargetEntities.length > 1) {
            dropdownMenuSize = 3;
        }

        $menu.find('li').remove();

        InitializaLookupData();

        if (Guid) {
            $editor.$input.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, Guid);
        }

        $editor.$input
            .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, LogicalName)
            .val(curText)
            .focus();

        $(window.document).off('mousedown').on('mousedown', function (e) {
            if (e.target) {
                var ctlid = $(e.target).attr('id');

                if ((ctlid == Input_ID) || (ctlid == Img_ID)
                    || ($(e.target).hasClass('LookupLinkSpan'))) {
                } else {
                    $menu.hide();
                }
            }
        });

    };

    function DoesAttributeExists(entityname, attrname) {
        try {
            var attr = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(entityname, attrname, true);
        } catch (e) {
            LogIt("Attribute " + attrname + " does not exist in " + entityname);
            return false;
        }
        return ((attr) && (attr.length) && (attr.length > 0));
    };

    function FetchtargetEntity(i) {
        if ($editor.LookupCtrData.EntityTargets[i].length == 0) {
            return [];
        }

        //if (DoesAttributeExists($editor.LookupCtrData.EntityTargets[i], $editor.LookupCtrData.PrimaryIdAttributes[i])) {
            var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" page="1" count="' + dropdownMenuSize + '">' +
              '<entity name="' + $editor.LookupCtrData.EntityTargets[i] + '">' +
                '<attribute name="' + $editor.LookupCtrData.PrimaryIdAttributes[i] + '" />' +
                '<attribute name="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" />' +
                '<order attribute="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" descending="false" />' +
                //'<filter type="and">' +
                //  '<condition attribute="statecode" operator="eq" value="0" />' +
                //'</filter>' +
              '</entity>' +
            '</fetch>';
            return XrmServiceToolkit.Soap.Fetch(fetch);
        //}

        return '';
    };

    function FetchtargetEntityPartial(searchfor, i) {
        if ($editor.LookupCtrData.EntityTargets[i].length == 0) {
            return [];
        }
        searchfor = searchfor.replace('&', '&amp;').replace('<', "&lt;").replace('>', "&gt;");
        LogIt("FetchtargetEntityPartial " + searchfor);
        var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" page="1" count="' + dropdownMenuSize + '">' +
          '<entity name="' + $editor.LookupCtrData.EntityTargets[i] + '">' +
            '<attribute name="' + $editor.LookupCtrData.PrimaryIdAttributes[i] + '" />' +
            '<attribute name="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" />' +
            '<order attribute="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" descending="false" />' +
            '<filter type="and">' +
               '<condition attribute="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" operator="like" value="%' + searchfor + '%" />' +
            '</filter>' +
          '</entity>' +
        '</fetch>';
        return XrmServiceToolkit.Soap.Fetch(fetch);
    };

    function FetchtargetEntityExact(searchfor, i) {
        if ($editor.LookupCtrData.EntityTargets[i].length == 0) {
            return [];
        }
        searchfor = searchfor.replace('&', '&amp;').replace('<', "&lt;").replace('>', "&gt;");
        LogIt("FetchtargetEntityExact " + searchfor);
        var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" page="1" count="' + dropdownMenuSize + '">' +
          '<entity name="' + $editor.LookupCtrData.EntityTargets[i] + '">' +
            '<attribute name="' + $editor.LookupCtrData.PrimaryIdAttributes[i] + '" />' +
            '<attribute name="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" />' +
            '<order attribute="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" descending="false" />' +
            '<filter type="and">' +
               '<condition attribute="' + $editor.LookupCtrData.PrimaryNameAttributes[i] + '" operator="eq" value="' + searchfor + '" />' +
            '</filter>' +
          '</entity>' +
        '</fetch>';
        return XrmServiceToolkit.Soap.Fetch(fetch);
    };

    function FetchAndValidateExcat(text) {
        for (var i = 0; i < $editor.LookupCtrData.EntityTargets.length; i++) {
            var result = FetchtargetEntityExact(text, i);
            if (result.length == 1) {
                $editor.$input
                    .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, result[0].attributes[$editor.LookupCtrData.PrimaryIdAttributes[i]].value)
                    .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupCtrData.EntityTargets[i]);
                return true;
            }
        }
        return false;
    };

    function FetchAndPopulatePartial(text) {
        $menu.find('li').remove();
        var haveAnyRec = 0;
        for (var i = 0; i < $editor.LookupCtrData.EntityTargets.length; i++) {
            $('<li>' + $editor.LookupCtrData.EntityTargets[i].capitalizeFirstLetter() + '</li>').addClass('header').appendTo($menu);
            haveAnyRec += PopulateDropDown(FetchtargetEntityPartial(text, i), i);
        }
        AddMenuTail();
        return haveAnyRec;
    };

    function FetchAndPopulate() {
        $menu.find('li').remove();
        var haveAnyRec = 0;

        for (var i = 0; i < $editor.LookupCtrData.EntityTargets.length; i++) {
            // $editor.LookupCtrData.LocalizedLabels
            $('<li>' + $editor.LookupCtrData.LocalizedLabels[i] + '</li>').addClass('header').appendTo($menu);
            //$('<li>' + $editor.LookupCtrData.EntityTargets[i].capitalizeFirstLetter() + '</li>').addClass('header').appendTo($menu);
            haveAnyRec += PopulateDropDown(FetchtargetEntity(i), i);
        }
        AddMenuTail();
        return haveAnyRec;
    };

    function AddMenuTail() {
        // Add a sep and "Lookup more records" as a last menu item 
        // Way unsupported
        $('<li></li>').addClass('divider').appendTo($menu);
        var $row = $('<li></li>').appendTo($menu);
        var $href = $('<a href="#" class="LookupLink"></a>')
            .click(function (e) {
                //var url = "/_controls/lookup/lookupsingle.aspx?objecttypes=1,2";
                // /_controls/lookup/lookupinfo.aspx?LookupStyle=multi&objecttypes=
                // /_controls/lookup/lookupsingle.aspx?objecttypes=
                var url = "/_controls/lookup/lookupinfo.aspx?LookupStyle=multi&objecttypes=" + $editor.LookupCtrData.ObjectTypeCodes.join(',');
                /*
                Query String Parameters for Customer (account, contact)
AllowFilterOff:0
DefaultType:1
DefaultViewId:{A9AF0AB8-861D-4CFA-92A5-C6281FED7FAB}
DisableQuickFind:0
DisableViewPicker:0
IsInlineMultiLookup:0
LookupStyle:single
ShowNewButton:1
ShowPropButton:1
browse:false
currentObjectType:112
currentid:{5B6DFA60-6456-E511-80C0-080027C01CB9}
dType:1
mrsh:false
objecttypes:1,2

Request URL:http://localhost/Demo/_controls/lookup/lookupinfo.aspx?AllowFilterOff=0&DefaultType=1&DefaultViewId=%7bA9AF0AB8-861D-4CFA-92A5-C6281FED7FAB%7d&DisableQuickFind=0&DisableViewPicker=0&IsInlineMultiLookup=0&LookupStyle=single&ShowNewButton=1&ShowPropButton=1&browse=false&currentObjectType=112&currentid=%7b5B6DFA60-6456-E511-80C0-080027C01CB9%7d&dType=1&mrsh=false&objecttypes=1%2c2
                */

                //Dialog Options would be set here
                var DialogOptions = new window.parent.Xrm.DialogOptions();
                DialogOptions.width = 500;
                DialogOptions.height = 700;
                window.parent.Xrm.Internal.openDialog(
                    window.parent.Mscrm.CrmUri.create(url).toString(),
                    DialogOptions, null, null, CallbackFunction);
                $menu.hide();
                return false;
            })
            .appendTo($row);
        var $span = $('<span class="LookupLinkSpan"></span>')
            .text(_thisGlobals.Translation_Labels.LookupMoreRecords)
            .addClass('itemTitle')
            .appendTo($href);
    };

    //Call back function for the Lookup
    function CallbackFunction(returnValue) {
        if ((returnValue) && (returnValue.items) && (returnValue.items[0].id) && (returnValue.items[0].name)) {

            for (var i = 0; i < returnValue.items.length; i++) {
                if (i > 0) {
                    //LogIt("name " + returnValue.items[0].name + " GUID " + returnValue.items[0].id); // Includes {}
                    $editor.LookupCtrData.LookupName += ';' + returnValue.items[i].name;
                    $editor.LookupCtrData.LookupId += ';' + returnValue.items[i].id.replace('{', '').replace('}', '');
                    // returnValue.items[0].type "112"
                    $editor.LookupCtrData.LookupLogicalName += ';' + returnValue.items[i].typename // 'incident" LogicalName
                } else {
                    $editor.LookupCtrData.LookupName = returnValue.items[i].name;
                    $editor.LookupCtrData.LookupId = returnValue.items[i].id.replace('{', '').replace('}', '');
                    $editor.LookupCtrData.LookupLogicalName = returnValue.items[i].typename // 'incident" LogicalName
                }
            }
            $editor.$input.val($editor.LookupCtrData.LookupName)
                .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, $editor.LookupCtrData.LookupId)
                .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupCtrData.LookupLogicalName);
            $menu.hide();
            return false;
        }
    };

    function PopulateDropDown(list, dataIndex) {
        var listlen = dropdownMenuSize;
        if (list.length < dropdownMenuSize) {
            listlen = list.length;
        }

        if (listlen == 0) {
            return listlen;
        }
        var $row, $href, $span, icon;

        for (var i = 0; i < listlen; i++) {
            if (!list[i].attributes[$editor.LookupCtrData.PrimaryNameAttributes[dataIndex]]) {
                continue;
            }
            var $row = $('<li></li>').appendTo($menu);
            var $href = $('<a href="#" class="LookupLink"></a>')
                .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, list[i].attributes[$editor.LookupCtrData.PrimaryIdAttributes[dataIndex]].value)
                .attr(_thisGlobals.DataAttr.Cell.Lookup.EntityName, list[i].attributes[$editor.LookupCtrData.PrimaryNameAttributes[dataIndex]].value)
                .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupCtrData.EntityTargets[dataIndex])
                .on('click', function (e) {
                    $editor.LookupCtrData.LookupId = $(this).attr(_thisGlobals.DataAttr.Cell.Lookup.Guid);
                    $editor.LookupCtrData.LookupName = $(this).attr(_thisGlobals.DataAttr.Cell.Lookup.EntityName);
                    $editor.LookupCtrData.LookupLogicalName = $(this).attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName);
                    $menu.hide();

                    $editor.$input.val($editor.LookupCtrData.LookupName)
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, $editor.LookupCtrData.LookupId)
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, $editor.LookupCtrData.LookupLogicalName)
                    .focus();
                    return false;
                })
                .appendTo($row);

            var $span = $('<span class="LookupLinkSpan"></span>')
                .text(list[i].attributes[$editor.LookupCtrData.PrimaryNameAttributes[dataIndex]].value)
                .addClass('itemTitle')
                .appendTo($href);
        }

        return listlen;
    };

    // Sort the data for searching
    function compare(a, b) {
        if (a.Name < b.Name)
            return -1;
        if (a.Name > b.Name)
            return 1;
        return 0;
    };

    function compareids(a, b) {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    };

    $editor.$input.on('keydown', function (e) {
        var tkey = e.which || e.keycode;

        if ((tkey === DCrmEditableGrid.Keys.ENTER) ||
            (tkey === DCrmEditableGrid.Keys.ESC) ||
            (tkey === DCrmEditableGrid.Keys.TAB)) {
            $menu.hide();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

    }).on('cut paste', function (e) {
        setTimeout(function () {
            var val = $editor.$input.val();
            if (val.trim().length > 0) {
                val = val.toLowerCase();
                //LogIt("Cut Paste input value " + val);
                if (FetchAndPopulatePartial(val) > 0) {
                    var top = parentdiv.offset().top + parentdiv.height();
                    $menu.css({ 'left': parentdiv.offset().left, 'top': top }).show();
                } else {
                    $menu.hide();
                }
            }
        }, 5);
    }).on('keyup', function (e) {
        var text = $editor.$input.val();
        //LogIt("Key up text " + text);
        if (text.trim().length > 0) {
            if (FetchAndPopulatePartial(text) > 0) {
                var top = parentdiv.offset().top + parentdiv.height();
                $menu.css({ 'left': parentdiv.offset().left, 'top': top }).show();
            } else {
                $menu.hide();
            }
        } else {
            if (FetchAndPopulate() > 0) {
                var top = parentdiv.offset().top + parentdiv.height();
                $menu.css({ 'left': parentdiv.offset().left, 'top': top }).show();
            } else {
                $menu.hide();
            }
        }
    });

    $editor.CloseEditor = function () {
        if ($editor.is(':visible')) {
            $editor.hide();
            $menu.hide();
        }
    };

    $editor.DestroyEditor = function () {
        $editor.off('keydown').off('cut').off('paste').off('keyup');
        var tt = $menu.find('a');
        if ((tt) && (tt.length)) {
            tt.off('click');
        }
        $menu.remove();
        $editor.remove();
    };

    return $editor;
};

var CrmEditableGrid = (function () {
    
    function CrmEditableGrid($table, options) {
        var self = this;
        var defaults = {
            selectedRows: [],
            DirtyCells: [],
            SortList: [],
            AggregateCellIndex: -1,
            AggregateCellOp: null,
            CancelSelection: true
        };

        // Jquery object $('#xxxx')
        // self.MainTable.parent() or self.MainTable[0].thead
        self.mainTable = $table;
        self.mainTableRaw = $table[0];
        self.activeOptions = $.extend({}, defaults, options);
        
        self.errorcontainer = $("#" + self.activeOptions.RequiredErrorContainer);
        self.inputFormatErrorContainer = $('#' + self.activeOptions.InputFormatErrorContainer);

        self.activeCell = undefined;
        self.contextMenuTarget = undefined;
        self.SelectedRecordGuid = undefined;
        self.HighlightedRow = undefined;
        self.GridConfiguration = FindGridConfigByGridID(self.activeOptions.ConfigID);

        self.GetParentPrimaryNameAttributeValueCallback = function (result) {
            if (result && result.length > 0) {
                self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue = result[0].attributes[self.activeOptions.ParentChildLookupInfo.PrimaryNameAttribute].value;
            }
            //console.log("self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue [" + self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue + "]");

            // Find the filter, if exists, update it
            var filter = self.GridConfiguration.GetInlineFilterBySchemaName(self.activeOptions.ParentChildLookupInfo.LookupSchemaName);
            if (filter) {
                filter.Value = self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue;
            }
        };
        self.GetParentPrimaryAttributesCallback = function (entityMetaData) {
            if (entityMetaData && entityMetaData.length === 1) {
                self.activeOptions.ParentChildLookupInfo.PrimaryIdAttribute = entityMetaData[0].PrimaryIdAttribute;
                self.activeOptions.ParentChildLookupInfo.PrimaryNameAttribute = entityMetaData[0].PrimaryNameAttribute;
            }

            // Need to get the primarAttributeName value for related lookup
            var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
              '<entity name="' + self.activeOptions.ParentChildLookupInfo.ParentSchemaName + '">' +
                  '<attribute name="' + self.activeOptions.ParentChildLookupInfo.PrimaryNameAttribute + '" />' +
                  '<filter type="and">' +
                    '<condition attribute="' +
                        self.activeOptions.ParentChildLookupInfo.PrimaryIdAttribute + '" operator="eq" value="' +
                        _thisHelpers.AddCurlyBrace(self.activeOptions.ParentChildLookupInfo.Guid) + '" />' +
                  '</filter>' +
              '</entity>' +
          '</fetch>';
            XrmServiceToolkit.Soap.Fetch(fetch, false, self.GetParentPrimaryNameAttributeValueCallback);
        };
        // Get the parent primary id and name attribute names for related lookups, if related
        if (self.activeOptions.ParentChildLookupInfo.Related) {
            XrmServiceToolkit.Soap.RetrieveEntityMetadata("Entity",
                self.activeOptions.ParentChildLookupInfo.ParentSchemaName, true, self.GetParentPrimaryAttributesCallback);
        }

        self.GridEditors = CreateEditors(self.activeOptions.columneditors,
            self.mainTable, self.errorcontainer,
            self.inputFormatErrorContainer,
            self.activeOptions.ParentEntityInfo.ParentEntitySchemaname,
            self.activeOptions.DateTimeMinuteStep);
        
        self.showEditor = function (e) {
            self.mainTable.activeCell = undefined;
            self.activeCell = undefined;
            self.activeCell = self.mainTable.find('td:focus');
            self.mainTable.activeCell = self.activeCell;

            if ((self.activeCell) && (self.activeCell.length)
                && (self.activeCell[0].cellIndex > 0)
                && (self.activeCell.attr(_thisGlobals.DataAttr.Cell.FooterCell) != _thisGlobals.DataAttr.NO)
                && (self.activeCell.attr('data-user-disabledfield') != _thisGlobals.DataAttr.YES)) {

                var $theader = self.GetHeaderCells();
                if ($($theader[self.activeCell[0].cellIndex]).attr(_thisGlobals.DataAttr.Header.ReadOnly) == _thisGlobals.DataAttr.YES) {
                    return;
                }

                if (self.activeCell.hasClass('IsDirty')) {
                    $('#' + self.activeOptions.GridContainerIds.UndoChanges).removeClass('GreyImage');
                } else {
                    $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                }

                var curEditor = self.GridEditors[self.activeCell[0].cellIndex];
                if (curEditor === null) {
                    self.mainTable.activeCell = undefined;
                    return;
                }

                var curText = _thisHelpers.GetActiveCellText(self.activeCell);

                if ((curEditor.EditorType == DCrmEditableGrid.Editors.Text) ||
                    (curEditor.EditorType == DCrmEditableGrid.Editors.Numeric) ||
                    (curEditor.EditorType == DCrmEditableGrid.Editors.Decimal) ||
                    (curEditor.EditorType == DCrmEditableGrid.Editors.Double) ||
                    (curEditor.EditorType == DCrmEditableGrid.Editors.Currency)) {

                    if ((curEditor.EditorType == DCrmEditableGrid.Editors.Currency) ||
                        (curEditor.EditorType == DCrmEditableGrid.Editors.Decimal) ||
                        (curEditor.EditorType == DCrmEditableGrid.Editors.Double) ||
                        (curEditor.EditorType == DCrmEditableGrid.Editors.Numeric)) {
                        curText = _thisHelpers.RemoveNumericFormat(curText);
                    }

                    curEditor.val(curText)
                        .css({ 'left': self.activeCell.offset().left, 'top': self.activeCell.offset().top })
                        .width(self.activeCell.width() - 5)
                        .height(self.activeCell.height() - 2)
                        .show()
                        .focus()
                        .select();

                } else if ((curEditor.EditorType == DCrmEditableGrid.Editors.DatePicker) ||
                    (curEditor.EditorType == DCrmEditableGrid.Editors.DateTimePicker)) {
                    curEditor.show()
                        .offset(self.activeCell.offset())
                        .width(self.activeCell.width())
                        .height(self.activeCell.height())
                        .SetInternals(curText);
                } else if (curEditor.EditorType == DCrmEditableGrid.Editors.Description) {
                    var left = self.activeCell.offset().left, top = self.activeCell.offset().top + 5;
                    if (top + curEditor.height() >= $(window).height()) {
                        top -= curEditor.height();
                    }
                    if (left + curEditor.width() >= $(window).width()) {
                        left -= curEditor.width();
                    }

                    curEditor
                        .show()
                        .css({ 'left': left, 'top': top })
                        .SetInternals(curText);
                } else if (curEditor.EditorType == DCrmEditableGrid.Editors.Checkbox) {
                    if (self.activeOptions.BooleanEditorBehavoir == "20") {
                        curEditor
                            .css('left', self.activeCell.offset().left)
                            .css('top', self.activeCell.offset().top)
                            .width(self.activeCell.width() + 1)
                            .height(self.activeCell.outerHeight() - 1)
                            .SetInternals(curText);
                    } else {
                        var updatedText = (curEditor.CheckedLabel == curText) ? curEditor.UncheckedLabel : curEditor.CheckedLabel;
                        _thisHelpers.SetActiveCellText(self.activeCell, updatedText);
                        self.updateCell(self.activeCell, curText);
                    }

                } else if (curEditor.EditorType == DCrmEditableGrid.Editors.OptionSet) {
                    curEditor
                        .css('left', self.activeCell.offset().left)
                        .css('top', self.activeCell.offset().top + 1)
                        .width(self.activeCell.width() - 1)
                        .show();
                    curEditor.SetInternals(curText);
                } else if (curEditor.EditorType == DCrmEditableGrid.Editors.Lookup) {
                    curEditor
                        //.show()
                        .css('left', self.activeCell.offset().left)
                        .css('top', self.activeCell.offset().top + 1)
                        .width(self.activeCell.width())
                        .height(self.activeCell.height() - 2)
                        .SetInternals(curText, self.activeCell.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid), self.activeCell.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName));
                } else if (curEditor.EditorType == DCrmEditableGrid.Editors.Status) {
                    curEditor
                        .SetInternals(curText, self.activeCell.parent().attr(_thisGlobals.DataAttr.Cell.RecordGuid));
                }
            }
            else {
                self.activeCell = undefined;
                self.mainTable.activeCell = undefined;
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                HideError(self);
                for (var i = 0; i < self.GridEditors.length; i++) {
                    if (self.GridEditors[i] != null) {
                        self.GridEditors[i].CloseEditor();
                    }
                }
            }
            return true;
        }

        SetupButtons(self);

        self.mainTable
            .on('click', function (e) {
                if ((e.target) && ((e.target.tagName == 'TD') || (e.target.tagName == 'SPAN'))) {

                    e.stopPropagation();

                    self.activeCell = undefined;
                    if (e.target.tagName == 'TD') {
                        self.activeCell = $(e.target);
                    } else if ($(e.target).parent()[0].tagName == 'TD') {
                        self.activeCell = $(e.target).parent();
                    }

                    if ((self.activeCell == undefined) ||
                        (self.activeCell.attr(_thisGlobals.DataAttr.Cell.FooterCell) == _thisGlobals.DataAttr.NO) ||
                        (self.activeCell.parent().attr(_thisGlobals.DataAttr.Row.SubGrid.Id))) {

                        $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                        self.activeCell = undefined;
                        return;
                    }

                    if (self.activeCell[0].cellIndex > 0) {
                        self.mainTable.focus();
                        self.activeCell.focus();
                        if (self.activeCell.hasClass('IsDirty')) {
                            $('#' + self.activeOptions.GridContainerIds.UndoChanges).removeClass('GreyImage');
                        } else {
                            $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                        }
                        self.showEditor();
                    } else {
                        $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                        self.activeCell = undefined;
                    }

                } else {
                    $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                    self.activeCell = undefined;
                }
            })
            .on('contextmenu', function (e) {
                if ((e.target) && ((e.target.tagName == 'TD') || (e.target.tagName == 'TH') || (e.target.tagName == 'SPAN'))) {
                    e.stopPropagation();
                    if (e.target.tagName == 'TH') {
                        self.contextMenuTarget = undefined;
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    } else if (e.target.tagName == 'TD') {
                        self.contextMenuTarget = $(e.target);
                    } else if ($(e.target).parent()[0].tagName == 'TD') {
                        self.contextMenuTarget = $(e.target).parent();
                    } else {
                        self.contextMenuTarget = undefined;
                        e.preventDefault();
                        return false;
                    }

                    if (self.contextMenuTarget.parent().attr(_thisGlobals.DataAttr.Row.SubGrid.Id)) {
                        self.contextMenuTarget = undefined;
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    
                    var $bg = $('<div></div>')
                      .addClass('InvisibleFrame')
                      .appendTo('body')
                      .on('contextmenu click', function () {
                          $bg.remove();
                          menu.remove();
                          // If click or right click anywhere else on page: remove clean up.
                          if (self.contextMenuTarget) {
                              self.contextMenuTarget.focus();
                              self.contextMenuTarget = undefined;
                          }
                          return false;
                      }).show();

                    var menu = $('<ul class="contextMenuPlugin"><div class="gutterLine"></div></ul>').appendTo('body');
                    var contextMenuTargetText = _thisHelpers.GetActiveCellText(self.contextMenuTarget).trim();
                    var $theadcells = self.mainTable.find('thead:first').find('tr:first').find('th');
                    var index = self.contextMenuTarget[0].cellIndex;
                    var isrequiered = $($theadcells[index]).attr(_thisGlobals.DataAttr.Header.Required);
                    var haveanymenu = false;

                    if (self.contextMenuTarget.hasClass('tfooterdummy')) {
                        contextMenuTargetText = _thisHelpers.GetFooterCellText(self.contextMenuTarget).trim();
                    } else {
                        contextMenuTargetText = _thisHelpers.GetActiveCellText(self.contextMenuTarget).trim();
                    }

                    //var ctxCallback = {
                    //    DisplayContextMenu: true,
                    //    RecordGuid: self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.RecordGuid),
                    //    RecordSchemaName: self.activeOptions.ParentEntityInfo.ParentEntitySchemaname,
                    //    FieldSchemanName: '',
                    //    FieldIsRequiered: ((isrequiered == _thisGlobals.DataAttr.NO) ? false : true),
                    //    FieldIsDisabled: ((self.contextMenuTarget.attr('data-user-disabledfield') != _thisGlobals.DataAttr.YES) ? false : true),
                    //    FieldType: '',
                    //    FieldValue: '',
                    //    FieldFormattedValue: contextMenuTargetText,
                    //    FieldFormat: self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Format),
                    //    IsFooterCellToDisplayAggregates: self.contextMenuTarget.hasClass('tfooterdummy'),
                    //    LookupLogicalName: self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName),
                    //    LookupGuid: self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid),
                    //    AdditionalMenuItems: [] // {CtxLabel: '', CtxCallback: null, CtxCallbackData: null}
                    //};

                    if (contextMenuTargetText.length > 0) {
                        haveanymenu = true;
                        $('<li><a href="#" class="contextMenuLink" id="CopytoClipboardCtxMenuItem"><span class="itemTitle">' + _thisGlobals.Translation_Labels.CopyValueToClipboard + '</span></a></li>').appendTo(menu);
                    }

                    if ((!self.activeOptions.ParentFormIsReadOnly) && 
                        (self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.FooterCell) != _thisGlobals.DataAttr.NO)) {
                        if (haveanymenu) {
                            $('<li class="divider"></li>').appendTo(menu);
                        }
                        haveanymenu = true;
                        $('<li><a href="#" class="contextMenuLink" id="OpenRecordCtxMenuItem"><span class="itemTitle">' + _thisGlobals.Translation_Labels.OpenRecordInNewWindow + '</span></a></li>').appendTo(menu);
                        // If we have status field, display a menu to set record status
                        if ((self.activeOptions.HasStatusField) &&
                            (self.activeOptions.DisplaySetRecordState)){
                            $('<li class="divider"></li>').appendTo(menu);
                            $('<li><a href="#" class="contextMenuLink" id="SetRecordStatus"><span class="itemTitle">' + _thisGlobals.Translation_Labels.SetRecordStatus + '</span></a></li>').appendTo(menu);
                        }
                    }
                    
                    if ((contextMenuTargetText.length > 0) &&
                        (self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid)) &&
                        (self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid).trim().length > 0)) {
                        if (haveanymenu) {
                            $('<li class="divider"></li>').appendTo(menu);
                        }
                        haveanymenu = true;
                        $('<li><a href="#" class="contextMenuLink" id="OpenLookupRecordCtxMenuItem"><span class="itemTitle">' + _thisGlobals.Translation_Labels.OpenLookupInNewWindow + '</span></a></li>').appendTo(menu);
                    }

                    if ((!self.activeOptions.ParentFormIsReadOnly) &&
                        (isrequiered == _thisGlobals.DataAttr.NO) &&
                        (contextMenuTargetText.length > 0) &&
                        (self.contextMenuTarget.attr('data-user-disabledfield') != _thisGlobals.DataAttr.YES)) {
                        var ed = parseInt($($theadcells[index]).attr(_thisGlobals.DataAttr.Header.EditorType));

                        if ((ed == DCrmEditableGrid.Editors.DatePicker) || (ed == DCrmEditableGrid.Editors.DateTimePicker)) {
                            haveanymenu = true;
                            $('<li class="divider"></li>').appendTo(menu);
                            $('<li><a href="#" class="contextMenuLink" id="ClearValueCtxMenuItem"><span class="itemTitle">' + _thisGlobals.Translation_Labels.ClearValue + '</span></a></li>').appendTo(menu);
                        }
                    }

                    if ((contextMenuTargetText.length > 0) && 
                        (self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Format) == 'url')) {
                        if (haveanymenu) {
                            $('<li class="divider"></li>').appendTo(menu);
                        }
                        haveanymenu = true;
                        $('<li><a href="#" class="contextMenuLink" id="OpenUrlInNewWindowCtxMenuItem"><span class="itemTitle">' + _thisGlobals.Translation_Labels.OpenUrlInNewWindow + '</span></a></li>').appendTo(menu);
                    }

                    if ((!self.activeOptions.ParentFormIsReadOnly) && (self.activeOptions.DisplayCloneRecord) &&
                        (self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.FooterCell) != _thisGlobals.DataAttr.NO)) {
                        if (haveanymenu) {
                            $('<li class="divider"></li>').appendTo(menu);
                        }
                        haveanymenu = true;
                        $('<li><a href="#" class="contextMenuLink" id="CloneRecordCtxMenuItem"><span class="itemTitle">' + _thisGlobals.Translation_Labels.CloneRecord + '</span></a></li>').appendTo(menu);

                    }

                    if (!haveanymenu) {
                        $bg.remove();
                        menu.remove();
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    // TODO
                    // Add callback to extend the context menu
                    // opportunity,... products
                    /*
                    Make this an option in the configuration
For Lookups it would be nice if there was a configuration to show the editor as a dropdown directly, 
similar to the optionset/picklist editor. This would make editing a lot faster for small and relatively static lookups - e.g. 
list of translated languages
                     */

                    menu.find('a').click(function (e) {
                        var id = $(this).attr('id');
                        if (id == 'CopytoClipboardCtxMenuItem') {
                            if (self.contextMenuTarget) {
                                if (self.contextMenuTarget.hasClass('tfooterdummy')) {
                                    _thisHelpers.CopyTextToClipboard(_thisHelpers.GetFooterCellText(self.contextMenuTarget));
                                } else {
                                    _thisHelpers.CopyTextToClipboard(_thisHelpers.GetActiveCellText(self.contextMenuTarget));
                                }
                            }
                        } else if (id == 'OpenRecordCtxMenuItem') {
                            if (self.contextMenuTarget) {
                                openEntityRecord(self.activeOptions.ParentEntityInfo.ParentEntitySchemaname, self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.RecordGuid));
                            }
                        } else if (id == 'OpenLookupRecordCtxMenuItem') {
                            openEntityRecord(self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName), self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid));
                        } else if (id == 'ClearValueCtxMenuItem') {
                            if (self.contextMenuTarget) {

                                try {
                                    var index = (self.contextMenuTarget)[0].cellIndex;
                                    var validator = self.activeOptions.columneditors[index - 1].validator;

                                    if (validator) {
                                        var $theadcells = self.mainTable.find('thead:first').find('tr:first').find('th');

                                        var param = {
                                            EditorType: parseInt($($theadcells[index]).attr(_thisGlobals.DataAttr.Header.EditorType)),
                                            OriginalValue: _thisHelpers.GetActiveCellText(self.contextMenuTarget),
                                            NewValue: ''
                                        };


                                        var CrmFieldInfo = {
                                            FieldSchemaName: self.activeOptions.columneditors[index - 1].FieldSchemaName,
                                            FieldLabel: self.activeOptions.columneditors[index - 1].FieldLabel,
                                            ParentEntitySchemaName: self.activeOptions.columneditors[index - 1].ParentEntitySchemaname,
                                            ParentEntityLabel: self.activeOptions.columneditors[index - 1].ParentEntityName
                                        }
                                        if (validator(param, CrmFieldInfo)) {
                                            _thisHelpers.SetActiveCellText(self.contextMenuTarget, '');
                                            self.updateCell(self.contextMenuTarget);
                                        }
                                    }
                                } catch (e) {

                                }
                            }
                        } else if (id == 'OpenUrlInNewWindowCtxMenuItem') {
                            window.open(_thisHelpers.GetActiveCellText(self.contextMenuTarget), '_blank');
                        } else if (id == 'SetRecordStatus') {
                            $bg.remove();
                            menu.remove();
                            if (self.contextMenuTarget) {
                                setTimeout(DisplayRecordState, 100,
                                    self.activeOptions.ParentEntityInfo.ParentEntitySchemaname,
                                    self.activeOptions.ParentEntityInfo.PrimaryIdAttribute,
                                    self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.RecordGuid),
                                    self.activeOptions.GridContainerIds.RefreshGrid);
                                self.contextMenuTarget = undefined;
                            }
                            return false;
                        } else if (id == 'CloneRecordCtxMenuItem') {
                            if (self.contextMenuTarget) {
                                CloneRecord(self);
                            }
                        }

                        $bg.remove();
                        menu.remove();
                        if (self.contextMenuTarget) {
                            if (self.contextMenuTarget.attr(_thisGlobals.DataAttr.Cell.FooterCell) != _thisGlobals.DataAttr.NO) {
                                self.activeCell = self.contextMenuTarget;
                                self.contextMenuTarget.focus();
                            }
                            self.contextMenuTarget = undefined;
                        }
                        return false;
                    });

                    menu.show();

                    var left = e.pageX + 5, top = e.pageY;
                    if (top + menu.height() >= $(window).height()) {
                        top -= menu.height();
                    }
                    if (left + menu.width() >= $(window).width()) {
                        left -= menu.width();
                    }
                    menu.css({ zIndex: 100006, left: left, top: top })
                        .on('contextmenu', function () {
                            if (self.contextMenuTarget) {
                                self.contextMenuTarget.focus();
                                self.contextMenuTarget = undefined;
                            }
                            return false;
                        });

                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            })
            .on('keydown' ,function (e) {
                var tkey = e.which || e.keycode;
                var prevent = false;
                var isTabkeydown = false;

                if (tkey == DCrmEditableGrid.Keys.TAB) {
                    isTabkeydown = true;
                    tkey = DCrmEditableGrid.Keys.ARROWRIGHT;
                }

                if ((tkey >= DCrmEditableGrid.Keys.ARROWLEFT) && (tkey <= DCrmEditableGrid.Keys.ARROWDOWN)) {

                    //if (tkey == DCrmEditableGrid.Keys.ARROWDOWN) {
                    //    console.log("Arrow Down ");
                    //}


                    var checkboxWasvisible = false;
                    for (var i = 0; i < self.GridEditors.length; i++) {
                        if ((self.GridEditors[i] != null) && (self.GridEditors[i].EditorType == DCrmEditableGrid.Editors.Checkbox)) {
                            if (self.GridEditors[i].IsVisible()) {
                                self.GridEditors[i].CloseEditor();
                                checkboxWasvisible = true;
                                break;
                            }
                        }
                    }

                    var possibleMove = _thisHelpers.Movement($(e.target), tkey);
                    if ((possibleMove) && (possibleMove.length) && (possibleMove.length > 0)) {

                        //if (tkey == DCrmEditableGrid.Keys.ARROWDOWN) {
                        //    console.log("Cell index " + possibleMove[0].cellIndex + "  Footer " + possibleMove.attr(_thisGlobals.DataAttr.Cell.FooterCell));
                        //}

                        self.mainTable.focus();
                        possibleMove.focus();
                        if ((possibleMove[0].cellIndex > 0) &&
                            (possibleMove.attr(_thisGlobals.DataAttr.Cell.FooterCell) != _thisGlobals.DataAttr.NO)) {

                            self.activeCell = possibleMove;
                            if (self.activeCell.hasClass('IsDirty')) {
                                $('#' + self.activeOptions.GridContainerIds.UndoChanges).removeClass('GreyImage');
                            } else {
                                $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                            }

                            if (isTabkeydown) {
                                self.showEditor();
                            }
                            //if ((checkboxWasvisible) && (isTabkeydown)) {
                            //    self.showEditor();
                            //}

                        } else {
                            $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                            //self.activeCell = undefined;
                        }
                        prevent = true;
                    } else {
                        // Remove distinct and replace it with create new record using down arrow
                        //console.log("Prevent " + prevent);
                        prevent = true;
                    }
                } else if (tkey == DCrmEditableGrid.Keys.ENTER) {
                    self.activeCell = self.mainTable.find('td:focus');
                    prevent = ((self.activeCell) && (self.activeCell.length) && (self.activeCell[0].cellIndex > 0) && (self.activeCell.attr(_thisGlobals.DataAttr.Cell.FooterCell) != _thisGlobals.DataAttr.NO));
                    if (prevent) {
                        self.activeCell.focus();
                        self.showEditor();
                    } else {
                        self.activeCell = undefined;
                    }
                } else if (tkey == DCrmEditableGrid.Keys.ESC) {
                    for (var i = 0; i < self.GridEditors.length; i++) {
                        if ((self.GridEditors[i] != null) && (self.GridEditors[i].EditorType == DCrmEditableGrid.Editors.Checkbox)) {
                            if (self.GridEditors[i].IsVisible) {
                                self.GridEditors[i].CloseEditor();
                                if (self.activeCell) {
                                    self.activeCell.focus();
                                }
                                break;
                            }
                        }
                    }
                }
                else if (tkey == 32) {
                    for (var i = 0; i < self.GridEditors.length; i++) {
                        if ((self.GridEditors[i] != null) && (self.GridEditors[i].EditorType == DCrmEditableGrid.Editors.Checkbox)) {
                            if (self.GridEditors[i].IsVisible) {
                                prevent = true;
                                self.GridEditors[i].SimulateClick();
                                break;
                            }
                        }
                    }
                }

                e.stopPropagation();
                if (prevent) {
                    e.preventDefault();
                    return false;
                }
            });

        // ensure events are fired for tds
        self.mainTable.find('td').prop('tabindex', 1);

        self.GetBodyRows = function () {
            return self.mainTable.find(_thisGlobals.DefaultGridOptions.selectorBodyRows);
        };
        self.GetHeaderCells = function () {
            return self.mainTable.find(_thisGlobals.DefaultGridOptions.selectorHeaders);
        };

        self.HideEditors = function () {
            for (var i = 0; i < self.GridEditors.length; i++) {
                if (self.GridEditors[i] != null) {
                    self.GridEditors[i].CloseEditor();
                }
            }
        };

        self.clearTableBody = function () {
            //$(table.tBodies[0]).empty();
            if (/Trident\/[4-9]/.test(navigator.userAgent)) {
                function empty() {
                    while (this.firstChild)
                        this.removeChild(this.firstChild);
                }
                empty.apply(self.mainTable[0].tBodies[0]);
            } else {
                self.mainTable[0].tBodies[0].innerHTML = "";
            }
        };

        self.ResetColResizerHeight = function () {
            try {
                if (self.ColumnResizer) {
                    self.ColumnResizer.UpdatecolResizable();
                }
            } catch (e) {
                LogEx("Resizer Exception: " + e.message);
            }
        }
        self.ResetRowHighlighting = function () {
            SetupRowHighlighting(self);
        }

        self.UndoChangesEnabled = function (e, enable) {
            if (enable) {
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).removeClass('GreyImage');
            } else {
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
            }
        }
        self.SaveUndoCancelEnable = function (enable) {
            if (enable) {
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).removeClass('GreyImage');
                $('#' + self.activeOptions.GridContainerIds.SaveChanges).removeClass('GreyImage');
                $('#' + self.activeOptions.GridContainerIds.CancelAllChanges).removeClass('GreyImage');
            } else {
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                $('#' + self.activeOptions.GridContainerIds.SaveChanges).addClass('GreyImage');
                $('#' + self.activeOptions.GridContainerIds.CancelAllChanges).addClass('GreyImage');
            }
        }

        self.RebuildCache = function () {
            buildCache(self);
        };
        self.RebuildCache();

        self.updateCell = function (cell, originalVal, param) {
            if ((originalVal == undefined) || (originalVal == 'undefined')) {
                originalVal = '';
            }

            // Mark the cell as dirty
            cell.removeClass('fieldvaluesaved').addClass('IsDirty fieldvaluechanged');
            var original = null, changed = null, orgLogicalName = null, newLogicalName = null;

            if (param == 'op') {
                original = cell.attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue);
                changed = cell.attr(_thisGlobals.DataAttr.Cell.ChangedAttrValue);
            } else if (param == 'lo') {
                original = cell.attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue);
                changed = cell.attr(_thisGlobals.DataAttr.Cell.ChangedAttrValue);

                orgLogicalName = cell.attr(_thisGlobals.DataAttr.Cell.Lookup.OriginalLogicalName);
                newLogicalName = cell.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName);
            }

            var cellid = cell.attr("id");
            if ((cellid === undefined) || (cellid === null) || (cellid == '')) {
                cellid = _thisHelpers.GenerateUUID();
                cell.attr("id", cellid);
            }

            var foundcell = false;
            var activecelltext = _thisHelpers.GetActiveCellText(cell);

            $.each(self.activeOptions.DirtyCells, function (i, item) {
                if (item.id == cellid) {
                    foundcell = true;
                    if (item.CurrentUndoIndex == (item.Changes.length - 1)) {
                        item.Changes.push(activecelltext);
                        if (changed) {
                            item.AdditionalAttr.push(changed);
                        }
                        if (orgLogicalName) {
                            item.AdditionalAttr.push(orgLogicalName);
                        }
                        if (newLogicalName) {
                            item.AdditionalAttr.push(newLogicalName);
                        }

                    } else {
                        item.Changes.splice(item.CurrentUndoIndex + 1, 0, activecelltext);
                        if (changed) {
                            item.AdditionalAttr.splice(item.CurrentUndoIndex + 1, 0, changed);
                        }
                        if (orgLogicalName) {
                            item.AdditionalAttr.splice(item.CurrentUndoIndex + 1, 0, orgLogicalName);
                        }
                        if (newLogicalName) {
                            item.AdditionalAttr.splice(item.CurrentUndoIndex + 1, 0, newLogicalName);
                        }
                    }
                    item.CurrentUndoIndex++;
                    return;
                }
            });

            if (!foundcell) {
                var rec = {
                    id: cellid,
                    CurrentUndoIndex: 1,
                    originalContent: originalVal,
                    TargetCell: cell
                };

                rec.Changes = new Array();
                rec.AdditionalAttr = new Array();

                rec.Changes.push(rec.originalContent);
                if (original) {
                    rec.AdditionalAttr.push(original);
                }
                if (orgLogicalName) {
                    rec.AdditionalAttr.push(orgLogicalName);
                }

                rec.Changes.push(activecelltext);
                if (changed) {
                    rec.AdditionalAttr.push(changed);
                }
                if (newLogicalName) {
                    rec.AdditionalAttr.push(newLogicalName);
                }

                self.activeOptions.DirtyCells.push(rec);
            }

            // adjust the undo and save btn
            self.SaveUndoCancelEnable(true);

            // Reset tooltip text
            cell.attr(_thisGlobals.ToolTipAttrName, activecelltext);
            self.UpdateCellDone();
        };

        self.SetHeadersCss = function ($headers, list, css) {
            $headers.find('.headertitle').removeClass(css[0]).removeClass(css[1]);

            var h = [];
            $headers.each(function (offset) {
                var colIndex = this.column || this.cellIndex;
                h[colIndex] = $(this);
            });

            var l = list.length;
            for (var i = 0; i < l; i++) {
                h[list[i][0]].find('.headertitle').addClass(css[list[i][1]]);
            }
        };

        self.RecordCountCallback = function (result) {
            if ((result) && (result.length) && (result.length > 0)) {
                self.activeOptions.TotalRecordsCount = result[0].attributes["count"].value;
                $('#' + self.activeOptions.GridContainerIds.TotalRecords).text(_thisGlobals.Translation_Labels.TotalRecords
                    + ' ' + self.activeOptions.TotalRecordsCount);
            }
            XrmServiceToolkit.Soap.Fetch(self.GridConfiguration.GetFetchXml(), false, self.RepopulateGridCallback);
        };

        self.SaveGridChanges = function (refreshGrid) {
            var dirty = self.activeOptions.DirtyCells;
            if (dirty.length > 0) {
                _thisHelpers.WaitDialog(true);

                var toSave = [];

                var $theadcells = self.mainTable.find('thead:first').find('tr:first').find('th'); // th:not(:first-child)

                $.each(dirty, function (index, item) {
                    var $cell = item.TargetCell;
                    var cellindex = item.TargetCell[0].cellIndex;
                    var activecelltext = _thisHelpers.GetActiveCellText($cell);
                    var internalEditor = parseInt($($theadcells[cellindex]).attr(_thisGlobals.DataAttr.Header.EditorType));
                    if ((internalEditor == DCrmEditableGrid.Editors.Currency) ||
                        (internalEditor == DCrmEditableGrid.Editors.Double) ||
                        (internalEditor == DCrmEditableGrid.Editors.Decimal)) {
                        if (activecelltext.length > 0) {
                            activecelltext = parseFloat(_thisHelpers.RemoveNumericFormat(activecelltext).replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.'));
                        }
                    }

                    // Store in a temp struc
                    toSave.push({
                        RecGuid: $cell.attr(_thisGlobals.DataAttr.Cell.RecordGuid),
                        RowIndex: $cell.parent().attr(_thisGlobals.DataAttr.Row.InternalIndex),
                        ValueToSave: activecelltext,
                        FieldSchemaName: $($theadcells[cellindex]).attr(_thisGlobals.DataAttr.Header.SchemaName),
                        InternalEditorType: internalEditor,
                        InternalEditorFormat: self.GridEditors[cellindex].EditorFormat,

                        OptionSetValue: $cell.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue),
                        CheckAttribute: (self.GridEditors[cellindex].CheckedLabel == activecelltext) ? true : false,
                        LookupLogicalName: $cell.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName),
                        LookupId: $cell.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid),
                        TargetCell: $cell
                    });

                    $cell.removeClass('IsDirty fieldvaluechanged').addClass('fieldvaluesaved');
                });

                if (window.parent.DCrmEgGridSaving) {
                    if (!window.parent.DCrmEgGridSaving(toSave, self.activeOptions.ParentEntityInfo)) {
                        _thisHelpers.WaitDialog();
                        LogIt("Save Cancelled by User");
                        return;
                    }
                }

                self.activeOptions.DirtyCells = [];
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                $('#' + self.activeOptions.GridContainerIds.SaveChanges).addClass('GreyImage');
                $('#' + self.activeOptions.GridContainerIds.CancelAllChanges).addClass('GreyImage');

                try {
                    UpdateCrmField(toSave, self);

                    var formatOptions = self.GridConfiguration.GetFormattingOptions();
                    for (var i = 0; i < toSave.length; i++) {
                        toSave[i].TargetCell.css("background-color", "").css("color", "");

                        var headerformatOptions = formatOptions.GetHeader(toSave[i].FieldSchemaName);
                        var cellformatOptions = formatOptions.GetField(toSave[i].FieldSchemaName);

                        if ((headerformatOptions) && (headerformatOptions.ApplyToColumn)) {
                            if ((headerformatOptions.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != headerformatOptions.BackgroundColor)) {
                                toSave[i].TargetCell.css("background-color", headerformatOptions.BackgroundColor);
                            }
                            if ((headerformatOptions.TextColor) && (_thisGlobals.DefaultBackgroundColor != headerformatOptions.TextColor)) {
                                toSave[i].TargetCell.css("color", headerformatOptions.TextColor);
                            }
                            if (headerformatOptions.FontCss) {
                                DeccoupleCss(headerformatOptions.FontCss, toSave[i].TargetCell);
                            }
                        }
                        if (cellformatOptions) {
                            var valToExamin = { Value: toSave[i].ValueToSave };
                            if (toSave[i].InternalEditorType == DCrmEditableGrid.Editors.Numeric) {
                                if (valToExamin.Value.length > 0) {
                                    valToExamin.Value = parseInt(_thisHelpers.RemoveNumericFormat(valToExamin.Value));
                                }
                            }
                            if (toSave[i].InternalEditorType == DCrmEditableGrid.Editors.OptionSet) {
                                valToExamin.Value = parseInt(toSave[i].OptionSetValue);
                            }
                            if (toSave[i].InternalEditorType == DCrmEditableGrid.Editors.Checkbox) {
                                valToExamin.Value = toSave[i].CheckAttribute;
                            }
                            if (toSave[i].InternalEditorType == DCrmEditableGrid.Editors.Lookup) {
                                valToExamin.LookupGuid = toSave[i].LookupId;
                            }

                            if ((cellformatOptions.Condition) && (ConditionIsTrue(cellformatOptions.Condition, null, valToExamin))) {
                                if ((cellformatOptions.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != cellformatOptions.BackgroundColor)) {
                                    toSave[i].TargetCell.css("background-color", cellformatOptions.BackgroundColor);
                                }
                                if ((cellformatOptions.TextColor) && (_thisGlobals.DefaultBackgroundColor != cellformatOptions.TextColor)) {
                                    toSave[i].TargetCell.css("color", cellformatOptions.TextColor);
                                }
                                if (cellformatOptions.FontCss) {
                                    DeccoupleCss(cellformatOptions.FontCss, toSave[i].TargetCell);
                                }
                            } else if (cellformatOptions.FontCss) {
                                DeccoupleCss(cellformatOptions.FontCss, toSave[i].TargetCell, true);
                            }
                        }
                    }
                } catch (ex) {
                    LogEx("Exception saving " + ex.message);
                }

                _thisHelpers.WaitDialog();

                if ((self.activeOptions.RefreshAfterSave) && (refreshGrid)) {
                    self.RefreshGridRows();
                }
            }
        };

        self.CheckForDirtyCells = function () {
            if (self.activeOptions.DirtyCells.length > 0) {
                if (confirm(_thisGlobals.UnsavedChangesMsg) == false) {
                    setTimeout(function () {
                        self.SaveGridChanges();
                    }, 100);
                    return false;
                }
            }
            return true;
        };

        self.RefreshGridRows = function () {

            if (self.CheckForDirtyCells() == false) {
                return false;
            }

            _thisHelpers.WaitDialog(true);

            self.SaveUndoCancelEnable(false);
            self.clearTableBody();
            self.activeOptions.Page = 1;
            self.activeOptions.PagingCookies = [];
            self.activeOptions.PagingCookie = null;
            self.activeOptions.selectedRows = [];
            self.activeOptions.DirtyCells = [];

            GetEntityCount(self.GridConfiguration.DistinctValues,
                self.activeOptions.ParentEntityInfo.ParentEntitySchemaname, self.activeOptions.ParentEntityInfo.PrimaryIdAttribute,
                self.GridConfiguration.GetFetchXmlFilters(), self.RecordCountCallback);
        };

        self.mainTable.find(_thisGlobals.DefaultGridOptions.selectorHeaders).on("click", function (e) {
            var totalRows = (self.mainTableRaw.tBodies[0] && self.mainTableRaw.tBodies[0].rows.length) || 0;

            var colIndex = this.column || this.cellIndex;

            if (colIndex == 0) {
                self.UndoChangesEnabled(false);
                return false;
            }

            var parentrow = $(this).parent();
            if ((parentrow) && (parentrow.length)) {
                if (parentrow[0].rowIndex == 0) {
                    self.UndoChangesEnabled(false);
                }
            }

            var $filterImg = $(e.target);
            var isFilterbtn = $filterImg.hasClass('recfilter');
            var isFilterbtnSet = $filterImg.hasClass('recfilterset');
            var filterImgId = $filterImg.attr('id');

            // hide all editors
            self.HideEditors();

            // Filter
            if (isFilterbtn || isFilterbtnSet) {

                var _thisheader = $(this);
                var headerSchemaName = _thisheader.attr(_thisGlobals.DataAttr.Header.SchemaName);
                var _thisFilterContent = $('#fieldfilter_content');
                var edType = _thisFilterContent.attr(_thisGlobals.DataAttr.Header.EditorType);
                var filterUi = null;
                $('#fieldfilter_extrainput').val('').addClass('hidefilters');
                _thisGlobals.Select2Option.empty();
                var $optContainer = $('#fieldfilter_optionscontainer');
                $optContainer.addClass('hidefilters');
                $('#fieldfilter_calendarinput').css('display', 'none');

                // Unhook the last select
                if (edType) {
                    filterUi = GetFilterUIStruc(parseInt(edType));
                    if (filterUi.ShowDate) {
                        var dtPicker = $('#fieldfilter_inputcontainer').find('.xdsoft_datetimepicker');
                        dtPicker.addClass('hidefilters');
                    } else {
                        if (filterUi.ShowSelectBtn) {
                            //$optContainer.removeClass('hidefilters');
                        } else {
                            $(filterUi.input).addClass('hidefilters').val('');
                        }
                    }
                    $(filterUi.div).addClass('hidefilters');
                }

                edType = _thisheader.attr(_thisGlobals.DataAttr.Header.EditorType);
                // is read only
                if (edType == DCrmEditableGrid.Editors.None) {
                    edType = _thisheader.attr(_thisGlobals.DataAttr.Header.ReadOnlyEditorType);
                }
                filterUi = GetFilterUIStruc(parseInt(edType));

                // hide remove filter btn
                if (isFilterbtnSet) {
                    $('#fieldfilter_btnremovefilter').removeClass('hidefilters');
                } else {
                    $('#fieldfilter_btnremovefilter').addClass('hidefilters');
                }
                //Do we have this filter
                var savedOperator = null;
                var savedValue = '';
                var savedFetchOp = null;
                var savedFetchValue = null;
                var savedLookupGuid = null;
                var savedLookupUiType = null;

                var savedFilter = self.GridConfiguration.GetInlineFilterBySchemaName(headerSchemaName);
                if (savedFilter) {
                    savedValue = savedFilter.Value;
                    savedOperator = savedFilter.Operator;
                    savedFetchOp = savedFilter.FetchOp;
                    savedFetchValue = savedFilter.FetchValue;
                    savedLookupGuid = savedFilter.LookupGuid;
                    savedLookupUiType = savedFilter.LookupUiType;
                }
                var realOperator = ((savedOperator != null) ? savedOperator : filterUi.SelectedOptionValue);

                // Wire select for filters
                $(filterUi.id)
                    .on('change', function (e) {
                        e.stopPropagation();
                        var selected = $(this).find(":selected");
                        var selectId = $(this).attr('id');
                        var content = $('#fieldfilter_content');
                        var selVal = selected.val();

                        content.attr('data-selected-filter', selVal);
                        if (selected.attr('data-fetchop')) {
                            content.attr('data-fetchop', selected.attr('data-fetchop'));
                        } else {
                            content.removeAttr('data-fetchop');
                        }

                        if (selected.attr('data-fetchval')) {
                            content.attr('data-fetchval', selected.attr('data-fetchval'));
                        } else {
                            content.removeAttr('data-fetchval');
                        }

                        if (selectId == 'fieldfilter_datetimeconditions') {
                            var dtPicker = $('#fieldfilter_inputcontainer').find('.xdsoft_datetimepicker');
                            if ((selVal == 'on') || (selVal == 'on-or-after') || (selVal == 'on-or-before')) {
                                dtPicker.removeClass('hidefilters');
                                $('#fieldfilter_extrainput').addClass('hidefilters');
                                $('#fieldfilter_calendarinput').css('display', 'block');

                            } else if ((selVal.startsWith('last-x')) || (selVal.startsWith('next-x')) || (selVal == 'olderthan-x-months')) {
                                dtPicker.addClass('hidefilters');
                                $('#fieldfilter_extrainput').removeClass('hidefilters').val('1');
                                $('#fieldfilter_calendarinput').css('display', 'none');
                            } else {
                                dtPicker.addClass('hidefilters');
                                $('#fieldfilter_extrainput').addClass('hidefilters');
                                $('#fieldfilter_calendarinput').css('display', 'none');
                            }

                        } else if (selectId == 'fieldfilter_optionsetconditions') {
                            if (selected.attr('data-fetchval')) {
                                $optContainer.addClass('hidefilters');
                                $('#fieldfilter_extrainput').removeClass('hidefilters').focus();

                            } else {
                                $('#fieldfilter_extrainput').addClass('hidefilters');
                                if ((selVal == 'null') || (selVal == 'not-null')) {
                                    $optContainer.addClass('hidefilters');
                                } else {
                                    $optContainer.removeClass('hidefilters');
                                }
                            }

                        } else if (selectId == 'fieldfilter_stringconditions') {
                            if ((selVal == 'null') || (selVal == 'not-null')) {
                                $('#fieldfilter_stringinput').addClass('hidefilters');
                            } else {
                                $('#fieldfilter_stringinput').removeClass('hidefilters');
                            }
                        }
                    })
                    .val(realOperator);
                // Show select
                $(filterUi.div).removeClass('hidefilters');

                if (filterUi.ShowDate) {
                    var dtPicker = $('#fieldfilter_inputcontainer').find('.xdsoft_datetimepicker');

                    // realOperator [on-or-after]  [2007-12-21]
                    //console.log("realOperator [" + realOperator + "]  [" + savedValue + "]");

                    if ((realOperator == 'on') || (realOperator == 'on-or-after') || (realOperator == 'on-or-before')) {

                        $(filterUi.input).val(savedValue);
                        $('#fieldfilter_calendarinput').datetimepicker('destroy');
                        $("#fieldfilter_calendarinput").datetimepicker({
                            timepicker: false,
                            inline: true,
                            format: _thisGlobals.userDatetimeSettings.DateFormat,
                            formatDate: _thisGlobals.userDatetimeSettings.DateFormat,
                            formatTime: _thisGlobals.userDatetimeSettings.TimeFormat
                        });
                        $('#fieldfilter_calendarinput').css('display', 'block');

                    } else if (realOperator.startsWith('next-x') || realOperator.startsWith('last-x') || realOperator == 'olderthan-x-months') {
                        dtPicker.addClass('hidefilters');
                        $('#fieldfilter_extrainput').removeClass('hidefilters').val(savedValue);

                    } else {
                        dtPicker.addClass('hidefilters');
                    }

                } else {
                    if (filterUi.ShowSelectBtn) {
                        // $editor.EntityStates = { SchemaName: schemaName, Status: [], StatusReason: [] };
                        var optionsData = self.GridEditors[colIndex];
                        var odata = null;
                        if (headerSchemaName == 'statecode') {
                            odata = optionsData.EntityStates.Status;
                        } else if (headerSchemaName == 'statuscode') {
                            odata = optionsData.EntityStates.StatusReason;
                        } else {
                            odata = optionsData.optionsData;
                        }

                        $.each(odata, function (i, item) {
                            if (item.text.length > 0) {
                                _thisGlobals.Select2Option.append($('<option>', {
                                    id: item.value,
                                    text: item.text
                                }));
                            }
                        });

                        if (savedFetchValue != null) {
                            $('#fieldfilter_extrainput').removeClass('hidefilters').val(savedValue);
                        } else if ((realOperator != 'null') && (realOperator != 'not-null')) {
                            $optContainer.removeClass('hidefilters');
                            if ((savedValue) && (savedValue.length > 0)) {
                                if (savedValue.contains(';')) {
                                    var selNames = savedValue.split(';');
                                    var finalVal = '';
                                    for (var i = 0; i < selNames.length; i++) {
                                        if (i > 0) {
                                            finalVal += ';';
                                        }
                                        finalVal += _thisGlobals.Select2Option.find('option[id = ' + selNames[i] + ']').prop('selected', true).text();
                                    }
                                    //$('#fieldfilter_extrainput').val(finalVal);
                                } else {
                                    _thisGlobals.Select2Option.find('option[id = ' + savedValue + ']').prop('selected', true).trigger('change');
                                }
                            } else {
                                _thisGlobals.Select2Option.find('option:eq(0)').prop('selected', true);
                            }
                        }

                    } else if (filterUi.ShowLookupBtn) {
                        var filterTargetEntities = _thisheader.attr("data-lookuptarget-entities");
                        _thisFilterContent.attr("data-uitypes", filterTargetEntities);

                        _thisGlobals.FilterLookupCtr.ResetFilterLookup(
                            filterTargetEntities,
                            savedValue,
                            savedLookupGuid,
                            headerSchemaName);
                        
                        $(filterUi.input).removeClass('hidefilters');
                    } else {
                        if ((realOperator == 'null') || (realOperator == 'not-null')) {
                            $(filterUi.input).addClass('hidefilters');
                        } else {
                            $(filterUi.input).removeClass('hidefilters').val(savedValue);
                        }
                    }
                }

                if (savedFetchValue) {
                    _thisFilterContent.attr('data-fetchval', savedFetchValue);
                } else {
                    _thisFilterContent.removeAttr('data-fetchval');
                }

                _thisFilterContent
                    .attr(_thisGlobals.DataAttr.Header.EditorType, edType)
                    .attr(_thisGlobals.DataAttr.Header.SchemaName, self.activeOptions.ParentEntityInfo.ParentEntitySchemaname)
                    .attr('data-table-configid', self.activeOptions.ConfigID)
                    .attr('data-field-schemaname', headerSchemaName)
                    .attr('data-col-index', colIndex)
                    .attr('data-fetchop', ((savedFetchOp) ? savedFetchOp : filterUi.FetchOp))
                    .attr('data-filterimg-id', filterImgId)
                    .attr('data-input-id', filterUi.input)
                    .attr('data-selected-filter', realOperator)
                    .css({ left: _thisheader.offset().left, top: (_thisheader.offset().top + _thisheader.outerHeight()) })
                    .show();
                return false;
            }

            // Sorting
            if (totalRows > 0) {
                _thisHelpers.WaitDialog(true);

                // get current column sort order
                if (this.InitialSortOrder) {
                    this.order = (this.order == 1) ? 0 : 1;
                    this.InitialSortOrder = undefined;
                } else {
                    this.order = this.count++ % 2;
                }

                var tableHeaders = self.GetHeaderCells();
                if (self.activeOptions.SortList.length > 0) {
                    var s = self.activeOptions.SortList[0];
                    if (s[0] != colIndex) {
                        tableHeaders[s[0]].order = 0;
                        tableHeaders[s[0]].count = 0;
                    }
                }
                self.activeOptions.SortList = [];
                self.activeOptions.SortList.push([colIndex, this.order]);

                var schemaName = $(this).attr(_thisGlobals.DataAttr.Header.SchemaName);
                self.GridConfiguration.GetFetchXmlSorted(schemaName, this.order);

                var sortCSS = [_thisGlobals.DefaultGridOptions.cssAsc, _thisGlobals.DefaultGridOptions.cssDesc];
                self.SetHeadersCss(tableHeaders,self.activeOptions.SortList, sortCSS);

                self.RefreshGridRows();

                // stop normal event by returning false
                return false;
            }
        }).on('mousedown', function () {
            if (self.activeOptions.CancelSelection) {
                this.onselectstart = function () {
                    return false
                };
                return false;
            }
        }).on('mouseover', function (e) {
            var $tmp = $(e.target);
            tname = $tmp.parent()[0].tagName;

            if ((e.target.tagName == 'SPAN') || (e.target.tagName == 'BUTTON') || (e.target.tagName == 'IMG') || (e.target.tagName == 'INPUT')) {
                if (tname == 'TH') {
                    self.HighlightedRow = $tmp.parent();
                }
            } else if (e.target.tagName == 'TH') {
                self.HighlightedRow = $tmp;
            }
            if (self.HighlightedRow) {
                self.HighlightedRow.addClass('rowheaderhovercolor');
            }
        }).on('mouseleave', function (e) {
            if (self.HighlightedRow) {
                self.HighlightedRow.removeClass('rowheaderhovercolor');
                self.HighlightedRow = undefined;
            }
        });

        self.HeaderOnDragHandler = function (e) {
            var columns = $(e.currentTarget).find("th");
            // Resize any active inline editor
            if ((columns) && (self.activeCell) && (self.activeCell.length)) {
                var column = $(columns[self.activeCell[0].cellIndex]);
                var curEditor = self.GridEditors[self.activeCell[0].cellIndex];

                if (curEditor.is(':visible')) {
                    if ((curEditor.EditorType == DCrmEditableGrid.Editors.Text) ||
                        (curEditor.EditorType == DCrmEditableGrid.Editors.Numeric) ||
                        (curEditor.EditorType == DCrmEditableGrid.Editors.Decimal) ||
                        (curEditor.EditorType == DCrmEditableGrid.Editors.Double) ||
                        (curEditor.EditorType == DCrmEditableGrid.Editors.Currency)) {
                        curEditor.offset({ top: curEditor.offset().top, left: column.offset().left }).width(column.width() - 5);

                    } else if (curEditor.EditorType == DCrmEditableGrid.Editors.Checkbox) {
                        curEditor.SetWidthAndLocation({ top: curEditor.offset().top, left: column.offset().left, width: column.width() });

                    } else if (curEditor.EditorType == DCrmEditableGrid.Editors.Lookup) {
                        curEditor.SetWidthAndLocation({ top: curEditor.offset().top, left: column.offset().left, width: column.width() });

                    } else if (curEditor.EditorType == DCrmEditableGrid.Editors.OptionSet) {
                        curEditor.css({ left: column.offset().left, top: curEditor.offset().top })
                            .width(column.width() - 1);

                    } else {
                        curEditor.offset({ top: curEditor.offset().top, left: column.offset().left });
                    }
                }
                if (self.errorcontainer.is(':visible')) {
                    var etop = curEditor.offset().top - (self.errorcontainer.height() + 8);
                    self.errorcontainer.css("left", column.offset().left).css("top", etop).width(curEditor.width() - 20);
                }
                if (self.inputFormatErrorContainer.is(':visible')) {
                    var etop = curEditor.offset().top - (self.inputFormatErrorContainer.height() + 8);
                    self.inputFormatErrorContainer.css("left", column.offset().left).css("top", etop).width(curEditor.width() - 20);
                }
            }
        };

        self.UpdateCellDone = function () {
            _thisHelpers.WaitDialog();
            if (self.activeOptions.AutoSaveChanges) {
                self.SaveGridChanges(true);
            }
        }

        self.CurrencySymbolCallback = function (result) {
            if ((result) && (result.length > 0)) {
                if (result[0].attributes['currencysymbol'])
                    self.activeOptions.EntityCurrencySymbol = (result[0].attributes['currencysymbol']) ?
                        result[0].attributes['currencysymbol'].value : _thisGlobals.userCurrencySettings.DecimalSymbol;

                if (result[0].attributes['currencyprecision']) {
                    self.activeOptions.EntityCurrencyPrecision = result[0].attributes['currencyprecision'].value;
                }

                for (var i = 0; i < self.GridEditors.length; i++) {
                    if (self.GridEditors[i] != null) {
                        if  (self.GridEditors[i].EditorType == DCrmEditableGrid.Editors.Currency){
                            self.GridEditors[i].CurrencySymbol = self.activeOptions.EntityCurrencySymbol;
                            if (self.GridEditors[i].PrecisionSource == 2) {
                                self.GridEditors[i].Precision = self.activeOptions.EntityCurrencyPrecision;

                                var $theaders = self.mainTable.find('thead:first').find('tr:first').find('th');
                                $($theaders[i])
                                    .attr(_thisGlobals.DataAttr.Header.Precision, self.GridEditors[i].Precision)
                                    .attr(_thisGlobals.DataAttr.Header.PrecisionSource, "2");
                            }
                        }
                        if (((self.GridEditors[i].EditorType == DCrmEditableGrid.Editors.Decimal) || (self.GridEditors[i].EditorType == DCrmEditableGrid.Editors.Double)) &&
                            (self.GridEditors[i].PrecisionSource == 2)) {
                            self.GridEditors[i].Precision = self.activeOptions.EntityCurrencyPrecision;
                            var $theaders = self.mainTable.find('thead:first').find('tr:first').find('th');
                            $($theaders[i])
                                .attr(_thisGlobals.DataAttr.Header.Precision, self.GridEditors[i].Precision)
                                .attr(_thisGlobals.DataAttr.Header.PrecisionSource, "2");
                        }
                    }
                }
            }
        }

        self.UpdatePageDisplay = function () {
            if (self.activeOptions.TotalRecordsCount > 0) {
                if (self.activeOptions.TotalRecordsCount > self.activeOptions.PagerSize) {
                    var totalPages = Math.ceil(self.activeOptions.TotalRecordsCount / self.activeOptions.PagerSize);
                    $('#' + self.activeOptions.GridContainerIds.PagerLabel).text(_thisGlobals.Translation_Labels.PageSize + " " + self.activeOptions.Page + "/" + totalPages);
                } else {
                    $('#' + self.activeOptions.GridContainerIds.PagerLabel).text("Page 1");
                }
            } else {
                $('#' + self.activeOptions.GridContainerIds.PagerLabel).text("Page 1");
            }
        };

        self.UpdatePagerButtons = function (containerIds) {
                $('#' + self.activeOptions.GridContainerIds.PagerButtonFirst).attr("disabled","disabled");
                $('#' + self.activeOptions.GridContainerIds.PagerButtonPrev).attr("disabled", "disabled");
                $('#' + self.activeOptions.GridContainerIds.PagerButtonNext).hide();


            if (self.activeOptions.TotalRecordsCount > self.activeOptions.PagerSize) {
                $('#' + self.activeOptions.GridContainerIds.PagerButtonFirst).removeAttr("disabled");
                $('#' + self.activeOptions.GridContainerIds.PagerButtonPrev).removeAttr("disabled");
                // Last page
                if ((self.activeOptions.HasMoreRecords)) {
                    $('#' + self.activeOptions.GridContainerIds.PagerButtonNext).show();
                }
            }

        };

        self.RepopulateGridCallback = function (fieldsresult, hasMoreRecords, pagingCookie) {

            self.activeOptions.HasMoreRecords = hasMoreRecords;
            self.activeOptions.PagingCookie = pagingCookie;
            if (self.activeOptions.PagingCookie == null) {
                self.activeOptions.PagingCookies.push(pagingCookie);
            }
            var refreshTrs = [];

            if ((fieldsresult) && (fieldsresult.length) && (fieldsresult.length > 0)) {

                var SelectedFields = self.GridConfiguration.SelectedFields;

                // Add data
                var $tbody = $('#' + self.activeOptions.GridContainerIds.Table).find('tbody:first');
                var fval = '';
                var tmpLcase = '';
                var selectedOptionsetValue = undefined;
                var ceditors = undefined;

                var extraRowHeight = '';
                try {
                    if (_thisGlobals.xrmPage.context.client.getClient() == "Mobile") {
                        extraRowHeight = ' style="height:30px;"';
                    }
                } catch (e) {

                }

                var formatOptions = self.GridConfiguration.GetFormattingOptions();
                var even = true;

                for (var i = 0; i < fieldsresult.length; i++) {
                    var item = fieldsresult[i];

                    $tr = $('<tr' + extraRowHeight + '></tr>').attr(_thisGlobals.DataAttr.Cell.RecordGuid, item.id).appendTo($tbody);

                    even = (i % 2 == 0);
                    if ((!even) && (formatOptions.EvenRows)) {
                        $tr.css('background-color', formatOptions.EvenRows);
                    } else if ((even) && (formatOptions.OddRows)) {
                        $tr.css('background-color', formatOptions.OddRows);
                    }

                    var callbackRowData = { RecordGuid: item.id, Fields: [], RowIndex: i };

                    for (var iinner = 0; iinner < SelectedFields.length; iinner++) {
                        var inneritem = SelectedFields[iinner];
                        var inneritemSchemaName = inneritem.SchemaName.toLowerCase();
                        tmpLcase = inneritem.AttrType.toLowerCase();
                        fval = '';
                        selectedOptionsetValue = undefined;
                        ceditors = self.activeOptions.columneditors[iinner];

                        var callbackField = {};
                        callbackField.ReadOnly = false;
                        callbackField.SchemaName = inneritemSchemaName;
                        callbackField.FieldType = tmpLcase;
                        callbackField.FieldIndex = iinner;
                        callbackField.BackgroundColor = null;
                        callbackField.ForgroundColor = null;

                        if ((tmpLcase == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.State) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.Status) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.BooleanType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.MoneyType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.DecimalType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.DoubleType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.IntegerType)) {

                            if (item.attributes[inneritemSchemaName]) {
                                fval = item.attributes[inneritemSchemaName].formattedValue;
                                callbackField.Value = item.attributes[inneritemSchemaName].value;

                                if ((tmpLcase == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                                    (tmpLcase == _thisGlobals.CrmFieldTypes.State) ||
                                    (tmpLcase == _thisGlobals.CrmFieldTypes.Status)) {
                                    selectedOptionsetValue = item.attributes[inneritemSchemaName].value;

                                    callbackField.Value = selectedOptionsetValue;
                                }
                            }
                        } else if ((tmpLcase == _thisGlobals.CrmFieldTypes.LookupType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.CustomerType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.OwnerType)) {

                            if (item.attributes[inneritemSchemaName]) {
                                fval = item.attributes[inneritemSchemaName].name || '';
                                ceditors.LookupData.LookupId = item.attributes[inneritemSchemaName].id || '';
                                ceditors.LookupData.LookupLogicalName = item.attributes[inneritemSchemaName].logicalName;
                                ceditors.LookupData.LookupName = fval;

                                callbackField.LookupGuid = ceditors.LookupData.LookupId;
                                callbackField.LookupLogicalName = ceditors.LookupData.LookupLogicalName;
                                callbackField.LookupName = fval;
                                callbackField.Value = fval;
                            }

                        } else if ((tmpLcase == _thisGlobals.CrmFieldTypes.TextType) || (tmpLcase == _thisGlobals.CrmFieldTypes.MemoType)) {
                            if (item.attributes[inneritemSchemaName]) {
                                fval = item.attributes[inneritemSchemaName].value;

                                callbackField.Value = fval;
                                callbackField.Format = ceditors.Format;

                                if (((ceditors.Format == 'Text') || (ceditors.Format == 'Phone'))
                                    && (_thisHelpers.IsvalidPhoneNumber(fval + ''))) {
                                    ceditors.Format = "Phone";
                                }
                            }
                        } else if (tmpLcase == _thisGlobals.CrmFieldTypes.DateTimeType) {
                            if (item.attributes[inneritemSchemaName]) {
                                fval = item.attributes[inneritemSchemaName].formattedValue;

                                callbackField.Value = fval;
                            }
                        }
                        if (fval.length > 0) {
                            callbackField.FormattedValue = fval;
                        }
                        var $thistr = $('<td tabindex="1"></td>')
                            .attr(_thisGlobals.ToolTipAttrName, fval)
                            .attr(_thisGlobals.DataAttr.Cell.RecordGuid, item.id)
                            .html('<span class="fieldcelltext" ' + _thisGlobals.ToolTipAttrName + '="' + fval + '">' + fval + '</span>')
                            .appendTo($tr);

                        var headerformatOptions = formatOptions.GetHeader(inneritemSchemaName);
                        var cellformatOptions = formatOptions.GetField(inneritemSchemaName);
                        if ((headerformatOptions) && (headerformatOptions.ApplyToColumn)) {
                            // BackgroundColor: null, TextColor: null, FontCss: null, ApplyToColumn: false };
                            if ((headerformatOptions.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != headerformatOptions.BackgroundColor)) {
                                $thistr.css("background-color", headerformatOptions.BackgroundColor);
                            }
                            if ((headerformatOptions.TextColor) && (_thisGlobals.DefaultBackgroundColor != headerformatOptions.TextColor)) {
                                $thistr.css("color", headerformatOptions.TextColor);
                            }
                            if (headerformatOptions.FontCss) {
                                DeccoupleCss(headerformatOptions.FontCss, $thistr);
                            }
                        }
                        if (cellformatOptions) {
                            // BackgroundColor: null, TextColor: null, FontCss: null, Condition: {Operator: null, Value: null, Guid: null} };
                            if ((cellformatOptions.Condition) && (ConditionIsTrue(cellformatOptions.Condition, tmpLcase, callbackField))) {
                                if ((cellformatOptions.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != cellformatOptions.BackgroundColor)) {
                                    $thistr.css("background-color", cellformatOptions.BackgroundColor);
                                }
                                if ((cellformatOptions.TextColor) && (_thisGlobals.DefaultBackgroundColor != cellformatOptions.TextColor)) {
                                    $thistr.css("color", cellformatOptions.TextColor);
                                }
                                if (cellformatOptions.FontCss) {
                                    DeccoupleCss(cellformatOptions.FontCss, $thistr);
                                }
                            }
                        }


                        if ((tmpLcase == _thisGlobals.CrmFieldTypes.TextType) && (ceditors.Format)) {
                            $thistr.attr(_thisGlobals.DataAttr.Cell.Format, ceditors.Format.toLowerCase());
                        }

                        if (ceditors.LookupData) {
                            $thistr
                                .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, ceditors.LookupData.LookupId)
                                .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, ceditors.LookupData.LookupLogicalName)
                                .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, ceditors.LookupData.LookupId)
                            .attr(_thisGlobals.DataAttr.Cell.Lookup.OriginalLogicalName, ceditors.LookupData.LookupLogicalName);

                        } else if ((tmpLcase == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                                    (tmpLcase == _thisGlobals.CrmFieldTypes.State) ||
                                    (tmpLcase == _thisGlobals.CrmFieldTypes.Status)) {
                            $thistr
                                .attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, selectedOptionsetValue + '')
                                .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, selectedOptionsetValue + '');
                        }

                        if ((tmpLcase == _thisGlobals.CrmFieldTypes.MoneyType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.DecimalType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.DoubleType) ||
                            (tmpLcase == _thisGlobals.CrmFieldTypes.IntegerType)) {
                                $thistr.addClass("NumericTextbox");
                        }

                        callbackRowData.Fields.push(callbackField);
                    }

                    FireGridRowOnload($tr, callbackRowData, self.activeOptions.ParentEntityInfo);
                    refreshTrs.push($tr);
                }

                if (self.activeOptions.TotalRecordsCount <= self.activeOptions.PagerSize) {
                    $('#' + self.activeOptions.GridContainerIds.Pager).hide();
                } else {
                    $('#' + self.activeOptions.GridContainerIds.Pager).show();
                }

            } else {
                $('#' + self.activeOptions.GridContainerIds.TotalRecords).text(_thisGlobals.Translation_Labels.TotalRecords + ' 0');
                $('#' + self.activeOptions.GridContainerIds.Pager).hide();
            }

            if (refreshTrs.length == 0) {
                _thisHelpers.WaitDialog();
                return;
            }

            SetupRowHighlighting(self);
            self.RebuildCache();
            self.UpdatePageDisplay();
            self.UpdatePagerButtons();

            _thisHelpers.WaitDialog();
        };

        self.DeleteSelectedRows = function (rowstoDel) {
            var counter = 0;
            // 0,1,2,3
            rowstoDel.sort(function (a, b) { return a - b });

            var tableRows = self.GetBodyRows();

            $.each(rowstoDel, function (index, item) {
                // Find any dirty cells and adjust DirtyCells array
                var targetcells = $(tableRows[item]).find('td.IsDirty');
                if ((targetcells) && (targetcells.length)) {

                    $.each(targetcells, function (i, cell) {
                        var cellid = $(cell).attr('id');
                        var foundcell = [];
                        $.each(self.activeOptions.DirtyCells, function (i, item) {
                            if (item.id == cellid) {
                                foundcell.push(i);
                                return;
                            }
                        });
                        var counter1 = 0;
                        $.each(foundcell, function (i, val) {
                            val -= counter1;
                            counter1++;
                            self.activeOptions.DirtyCells.splice(val, 1);
                        });
                    });

                    if (self.activeOptions.DirtyCells.length == 0) {
                        // Replace this with 
                        self.SaveUndoCancelEnable(false);
                    } else {
                        self.UndoChangesEnabled(false);
                    }
                }

                item -= counter;
                counter++;

                $(tableRows[item]).remove();
                tableRows.splice(item, 1);
            });

            // Reset all rows realIndex attr
            if (tableRows.length > 0) {
                for (var i = 0; i < tableRows.length; i++) {
                    $(tableRows[i]).attr(_thisGlobals.DataAttr.Row.InternalIndex, i);
                }
            } else {
                self.mainTable.find('tbody:first').empty();
            }

            self.activeOptions.selectedRows = [];
        };

        if ((self.activeOptions.DisplayFieldsSum) && (self.activeOptions.HaveNumericFields.HaveNumeric)) {
            self.AggregateCallback = function (result) {
                if ((result) && (result.length) && (result.length > 0)) {
                    if (result[0].attributes['fetch_aggregate']) {
                        var aggreagtecell = self.mainTable.find("tfoot:last").find("tr:first").find("td")[self.activeOptions.AggregateCellIndex];
                        _thisHelpers.SetFooterCellText($(aggreagtecell),
                            self.activeOptions.AggregateCellOp.toUpperCase() + " " + result[0].attributes['fetch_aggregate'].formattedValue);
                    }
                }
            };
        } else {
            // remove footer all together
            self.mainTable.find('tfoot').empty().remove();
        }

        self.mainTable.find("tfoot tr").find(".aggregate").on("click", function (e) {
            e.stopPropagation();
            var $this = $(this).parent();

            var menu = $('<ul class="contextMenuPlugin"><div class="gutterLine"></div></ul>')
                .attr(_thisGlobals.DataAttr.Header.SchemaName, $this.attr(_thisGlobals.DataAttr.Header.SchemaName))
                .attr("data-aggrefate-cellindex", $this[0].cellIndex)
                .appendTo('body');

            var $bg = $('<div></div>')
              .addClass('InvisibleFrame')
              .appendTo('body')
              .on('contextmenu click', function (e) {
                  e.stopPropagation();
                  $bg.remove();
                  menu.remove();
                  return false;
              }).show();

            var $row = $('<li><a href="#" class="contextMenuLink" id="aggreagetavg"><span class="itemTitle">AVG</span></a></li>').appendTo(menu);
            $row = $('<li><a href="#" class="contextMenuLink" id="aggreagetmin"><span class="itemTitle">MIN</span></a></li>').appendTo(menu);
            $row = $('<li><a href="#" class="contextMenuLink" id="aggreagetmax"><span class="itemTitle">MAX</span></a></li>').appendTo(menu);
            $row = $('<li><a href="#" class="contextMenuLink" id="aggreagetsum"><span class="itemTitle">SUM</span></a></li>').appendTo(menu);

            menu.find('a').click(function (e) {
                var $a = $(this);

                var id = $a.attr('id');
                var schemaname = $a.parent().parent().attr(_thisGlobals.DataAttr.Header.SchemaName);
                self.activeOptions.AggregateCellIndex = parseInt($a.parent().parent().attr("data-aggrefate-cellindex"));
                var op = "sum";

                if (id == 'aggreagetavg') {
                    op = "avg";
                } else if (id == 'aggreagetmin') {
                    op = "min";
                } else if (id == 'aggreagetmax') {
                    op = "max";
                }
                self.activeOptions.AggregateCellOp = op;

                var s = self.GridConfiguration.GetFetchXmlFilters();
                var aggregatefetch = "<fetch distinct='false' mapping='logical' aggregate='true'>" +
                                "<entity name='" + self.activeOptions.ParentEntityInfo.ParentEntitySchemaname + "'>" +
                                   "<attribute name='" + schemaname + "' alias='fetch_aggregate' aggregate='" + op + "' />";

                if (s.length > 0) {
                    aggregatefetch += s;
                }
                aggregatefetch += "</entity>" +
                            "</fetch>";

                $bg.remove();
                menu.remove();
                e.stopPropagation();

                XrmServiceToolkit.Soap.Fetch(aggregatefetch, false, self.AggregateCallback);

                return false;
            });

            menu.show();

            $this = $(this);
            menu.css({ zIndex: 100006, left: $this.offset().left, top: ($this.offset().top + $this.outerHeight() + 2) })
                .on('contextmenu', function () {
                    e.stopPropagation();
                    return false;
                });
        });

        for (var i = 0; i < self.GridEditors.length; i++) {
            if (self.GridEditors[i] != null) {
                self.GridEditors[i].RefreshOnSave = self.activeOptions.RefreshAfterSave;
                if (self.GridEditors[i].EditorType != DCrmEditableGrid.Editors.Status) {
                    self.GridEditors[i].theUpdater = self.updateCell;
                } else {
                    self.GridEditors[i].theUpdater = self.RefreshGridRows;
                    self.GridEditors[i].PrimaryIdAttribute = self.activeOptions.ParentEntityInfo.PrimaryIdAttribute;
                }
            }
        }

        self.UpdatePageDisplay();
        self.UpdatePagerButtons();

        if ((self.activeOptions.EntityCurrencyid) && (self.activeOptions.HaveNumericFields.HavePrecision)) {
            XrmServiceToolkit.Soap.Fetch(GetCurrencyFetch(self.activeOptions.EntityCurrencyid), false, self.CurrencySymbolCallback);
        }

        $(window).on('resize', function () {
            if ((self.activeCell) && (self.activeCell.length)) {
                var curEditor = self.GridEditors[self.activeCell[0].cellIndex];

                if ((curEditor != null) && (curEditor.is(':visible'))) {
                    curEditor.offset(self.activeCell.offset())
                    .width(self.activeCell.width())
                    .height(self.activeCell.height());
                }
            }
        });

        self.DestroyGrid = function () {
            self.mainTable.off('click').off('contextmenu').off('keydown');
            self.mainTable.find(_thisGlobals.DefaultGridOptions.selectorHeaders).off('click').off('mousedown').off('mouseover').off('mouseleave');
            self.mainTable.find(_thisGlobals.DefaultGridOptions.selectorBodyRows).off('mouseover').off('mouseleave');

            if (self.ColumnResizer) {
                self.ColumnResizer.destroy();
                self.ColumnResizer = null;
            }
        }

        SetupRowHighlighting(self);
        self.ColumnResizer = new colResizable({
            ParentControlClass: self,
            onDrag: self.HeaderOnDragHandler
        });
    }

    // Instance

    function openEntityRecord(enityLogicalName, guid) {
        var randomnumber = 100000000 + Math.floor(Math.random() * 900000000);

        var baseUrl = window.parent.Xrm.Page.context.getClientUrl();
        if (!baseUrl.endsWith('/')) {
            baseUrl += "/";
        }

        /*
http://localhost/Demo/main.aspx?etc=112&extraqs=?_CreateFromId=%7b5B6DFA60-6456-E511-80C0-080027C01CB9%7d&_CreateFromType=112&histKey=21597565&id={5B6DFA60-6456-E511-80C0-080027C01CB9}&newWindow=true&pagetype=entityrecord&sitemappath=CS|CS|nav_cases#204924143
        */
        var url = baseUrl + "main.aspx?etn=" + enityLogicalName + "&extraqs=&histKey=" + randomnumber +
            "&id=" + _thisHelpers.AddCurlyBrace(guid) + "&newWindow=true&pagetype=entityrecord";
        window.open(url, "", "status=0,resizable=1,width=1000px,height=800px");

    }

    function CreateEditors(editorsArray, parent, requiredContainer, inputFormatErrorContainer, parentEntitySchemaname, datetimeeditorstep) {
        var alleditors = [];
        alleditors[0] = null;
        var index = 0;
        for (var i = 0; i < editorsArray.length; i++) {
            index++;
            switch (editorsArray[i].editor) {
                case DCrmEditableGrid.Editors.Text:
                case DCrmEditableGrid.Editors.Numeric:
                case DCrmEditableGrid.Editors.Decimal:
                case DCrmEditableGrid.Editors.Double:
                case DCrmEditableGrid.Editors.Currency:
                    alleditors[index] = new $.fn.DCrmEditableGrid.TextBox(parent, editorsArray[i], requiredContainer, inputFormatErrorContainer);
                    break;
                case DCrmEditableGrid.Editors.DatePicker:
                case DCrmEditableGrid.Editors.DateTimePicker:
                    alleditors[index] = new $.fn.DCrmEditableGrid.DatePicker(parent, editorsArray[i], requiredContainer, datetimeeditorstep);
                    break;
                case DCrmEditableGrid.Editors.Checkbox:
                    alleditors[index] = new $.fn.DCrmEditableGrid.CheckBox(parent, editorsArray[i], requiredContainer);
                    break;
                case DCrmEditableGrid.Editors.Description:
                    alleditors[index] = new $.fn.DCrmEditableGrid.Description(parent, editorsArray[i], requiredContainer);
                    break;
                case DCrmEditableGrid.Editors.OptionSet:
                    alleditors[index] = new $.fn.DCrmEditableGrid.OptionSet(parent, editorsArray[i], requiredContainer);
                    break;
                case DCrmEditableGrid.Editors.Lookup:
                    alleditors[index] = new $.fn.DCrmEditableGrid.Lookup(parent, editorsArray[i], requiredContainer, inputFormatErrorContainer);
                    break;
                case DCrmEditableGrid.Editors.Status:
                    alleditors[index] = new $.fn.DCrmEditableGrid.EntityStatesBox(parentEntitySchemaname, editorsArray[i], parent);
                    break;
                default:
                    alleditors[index] = null;
                    break;
            }
        }
        return alleditors;
    }

    function SetupButtons (who) {
        var self = who;

        $('#' + self.activeOptions.GridContainerIds.RefreshGrid).click(function (e) {
            e.stopPropagation();
            self.RefreshGridRows();
        });

        $('#' + self.activeOptions.GridContainerIds.ClearAllFilters).click(function (e) {
            e.stopPropagation();
            self.GridConfiguration.ClearInlineFilters();
            var filterHeaders = self.GetHeaderCells();
            filterHeaders.find('span.recfilterset').removeClass('recfilterset').addClass('recfilternotset');
            self.RefreshGridRows();
        });

        $('#' + self.activeOptions.GridContainerIds.AutoSave).click(function (e) {
            e.stopPropagation();
            self.activeOptions.AutoSaveChanges = $(this).is(':checked');
            if (self.activeOptions.AutoSaveChanges) {
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).hide();
                $('#' + self.activeOptions.GridContainerIds.CancelAllChanges).hide();
                $('#' + self.activeOptions.GridContainerIds.SaveChanges).hide();
            } else {
                $('#' + self.activeOptions.GridContainerIds.UndoChanges).show();
                $('#' + self.activeOptions.GridContainerIds.CancelAllChanges).show();
                $('#' + self.activeOptions.GridContainerIds.SaveChanges).show();
            }
        });

        $('#' + self.activeOptions.GridContainerIds.UndoChanges).click(function (e) {

            if ($(this).hasClass('GreyImage')) {
                LogIt("Undo is disabled");
                return;
            }

            if ((self.activeCell) && (self.activeCell.length)) {
                var rows = self.activeOptions.DirtyCells;
                var item;

                if (rows.length == 0) {
                    return;
                }

                for (var i = 0; i < rows.length; i++) {
                    item = rows[i];
                    if (self.activeCell.attr('id') == item.id) {

                        item.CurrentUndoIndex--;
                        if (item.CurrentUndoIndex < 0) {
                            item.CurrentUndoIndex = (item.Changes.length - 1);
                        }
                        var tochagneto = item.Changes[item.CurrentUndoIndex];

                        if (item.originalContent == tochagneto) {

                            item.TargetCell.removeClass('IsDirty fieldvaluechanged');
                            $('#' + self.activeOptions.GridContainerIds.UndoChanges).addClass('GreyImage');
                            if (rows.length == 1) {
                                $('#' + self.activeOptions.GridContainerIds.SaveChanges).addClass('GreyImage');
                                $('#' + self.activeOptions.GridContainerIds.CancelAllChanges).addClass('GreyImage');
                                self.activeOptions.DirtyCells = [];
                            } else {
                                self.activeOptions.DirtyCells.splice(i, 1);
                            }
                        }

                        _thisHelpers.SetActiveCellText(item.TargetCell, tochagneto);

                        if (item.AdditionalAttr.length > 0) {
                            var tmp = item.AdditionalAttr[0];
                            if (tmp) {
                                var cellindex = item.TargetCell[0].cellIndex;
                                var $theadcells = self.mainTable.find('thead:first').find('tr:first').find('th');
                                var ed = parseInt($($theadcells[cellindex]).attr(_thisGlobals.DataAttr.Header.EditorType));

                                if (ed == DCrmEditableGrid.Editors.OptionSet) {
                                    item.TargetCell.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, tmp);
                                } else if (ed == DCrmEditableGrid.Editors.Lookup) {
                                    item.TargetCell.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, tmp);
                                    item.TargetCell.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, item.AdditionalAttr[1]);
                                }
                            }
                        }

                        self.activeCell.attr(_thisGlobals.ToolTipAttrName, tochagneto);
                        self.activeCell.focus();
                        return false;
                    }
                }
            }
        }).addClass('GreyImage');

        $('#' + self.activeOptions.GridContainerIds.CancelAllChanges).click(function (e) {

            if ($(this).hasClass('GreyImage')) {
                LogIt("Undo all is disabled");
                return;
            }
            var rows = self.activeOptions.DirtyCells;
            var $cell;
            for (var i = 0; i < rows.length; i++) {
                $cell = rows[i].TargetCell;
                _thisHelpers.SetActiveCellText($cell, rows[i].originalContent);
                $cell.removeClass('IsDirty fieldvaluechanged');

                if ((rows[i].AdditionalAttr) && (rows[i].AdditionalAttr.length) && (rows[i].AdditionalAttr.length > 0)) {
                    var tmp = rows[i].AdditionalAttr[0];
                    if (tmp) {
                        var cellindex = rows[i].TargetCell[0].cellIndex;
                        var $theadcells = self.mainTable.find('thead:first').find('tr:first').find('th');
                        var ed = parseInt($($theadcells[cellindex]).attr(_thisGlobals.DataAttr.Header.EditorType));

                        if (ed == DCrmEditableGrid.Editors.OptionSet) {
                            $cell.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, tmp);
                        } else if (ed == DCrmEditableGrid.Editors.Lookup) {
                            $cell.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, tmp);
                            $cell.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, rows[i].AdditionalAttr[1]);
                        }
                    }
                }
                $cell.attr(_thisGlobals.ToolTipAttrName, rows[i].originalContent);
            };
            self.activeOptions.DirtyCells = [];
            self.SaveUndoCancelEnable(false);

        }).addClass('GreyImage');

        $('#' + self.activeOptions.GridContainerIds.SaveChanges).click(function (e) {
            e.stopPropagation();

            if (($(this).hasClass('GreyImage')) && (!self.activeOptions.AutoSaveChanges)) {
                LogIt("Save is disabled");
                return false;
            }

            self.SaveGridChanges(true);

        }).addClass('GreyImage');

        $('#' + self.activeOptions.GridContainerIds.ExportToExcel).click(function (e) {
            e.stopPropagation();

            if (self.activeOptions.TotalRecordsCount == 0) {
                return false;
            }

            var menu = $('<ul class="contextMenuPlugin"><div class="gutterLine"></div></ul>').appendTo('body');
            var $bg = $('<div></div>')
              .addClass('InvisibleFrame')
              .appendTo('body')
              .on('contextmenu click', function (e) {
                  e.stopPropagation();
                  $bg.remove();
                  menu.remove();
                  return false;
              }).show();

            var $row = $('<li><a href="#" class="contextMenuLink" id="ExportGridToExcel"><span class="itemTitle">Excel</span></a></li>').appendTo(menu);
            var icon = $('<img>');
            icon.attr('src', 'dcrmeg_excel');
            icon.insertBefore($row.find('.itemTitle'));

            $row = $('<li><a href="#" class="contextMenuLink" id="ExportGridToCSV"><span class="itemTitle">CSV</span></a></li>').appendTo(menu);
            icon = $('<img>');
            icon.attr('src', 'dcrmeg_csv16');
            icon.insertBefore($row.find('.itemTitle'));

            $row = $('<li><a href="#" class="contextMenuLink" id="ExportGridToPdf"><span class="itemTitle">PDF</span></a></li>').appendTo(menu);
            icon = $('<img>');
            icon.attr('src', 'dcrmeg_pdf16');
            icon.insertBefore($row.find('.itemTitle'));

            menu.find('a').click(function (e) {
                var id = $(this).attr('id');
                var msg = undefined;

                if (id == 'ExportGridToExcel') {
                    try {
                        SaveGridAsExcel(self);
                    } catch (e) {
                        msg = e.message;
                    }
                } else if (id == 'ExportGridToCSV') {
                    try {
                        SaveGridAsCsv(self);
                    } catch (e) {
                        msg = e.message;
                    }
                } else if (id == 'ExportGridToPdf') {
                    try {
                        SaveGridAsPdf(self);
                    } catch (e) {
                        msg = e.message;
                    }
                }

                $bg.remove();
                menu.remove();
                e.stopPropagation();
                if (msg) {
                    DisplayCrmAlertDialog("Unable to export due to exception:\r" + msg);
                }
                return false;
            });

            menu.show();

            $this = $(this);
            menu.css({ zIndex: 100006, left: $this.offset().left, top: ($this.offset().top + $this.outerHeight() + 2) })
                .on('contextmenu', function () {
                    e.stopPropagation();
                    return false;
                });
        });

        $('#' + self.activeOptions.GridContainerIds.AddNewRec).click(function (e) {

            e.stopPropagation();
            var msg = undefined;

            // 10 inline, 20 new window, 30 show menu
            if (self.GridConfiguration.MSProductGrid) {
                // Dispaly a different menu
                if (self.GridConfiguration.MSProductGridHelperc && self.GridConfiguration.MSProductGridHelperc.GetPriceList()) {
                    var $bg = $('<div></div>')
                      .addClass('InvisibleFrame')
                      .appendTo('body')
                      .on('contextmenu click', function () {
                          $bg.remove();
                          menu.remove();
                          return false;
                      }).show();

                    var menu = $('<ul class="contextMenuPlugin"><div class="gutterLine"></div></ul>').appendTo('body');
                    $('<li><a href="#" class="contextMenuLink" id="getexistingproducts"><span class="itemTitle">Existing Products</span></a></li>').appendTo(menu);
                    $('<li><a href="#" class="contextMenuLink" id="newinlineproduct"><span class="itemTitle">Write-in Product</span></a></li>').appendTo(menu);
                    menu.find('a').click(function (e) {
                        var id = $(this).attr('id');
                        var msg = undefined;

                        if (id == 'getexistingproducts') {
                            self.GridConfiguration.MSProductGridHelperc.DisplayExistingProducts();
                        } else if (id == 'newinlineproduct') {

                        }

                        $bg.remove();
                        menu.remove();
                        e.stopPropagation();
                        if (msg) {
                            DisplayCrmAlertDialog("Unable to proceed due to exception:\r" + msg);
                        }
                        return false;
                    });

                    menu.show();

                    $this = $(this);
                    menu.css({ zIndex: 100006, left: $this.offset().left, top: ($this.offset().top + $this.outerHeight() + 2) })
                        .on('contextmenu', function () {
                            e.stopPropagation();
                            return false;
                        });

                } else {
                    self.GridConfiguration.MSProductGridHelperc.DisplayNativePricelistSelect();
                }
            } else if (self.activeOptions.NewBtnBehavoir == "30") {
                DisplayNewButtonMenu(who, $(this));
            } else if (self.activeOptions.NewBtnBehavoir == "20") {
                try {
                    window.parent.Xrm.Utility.openEntityForm(self.activeOptions.ParentEntityInfo.ParentEntitySchemaname);
                } catch (e) {
                    msg = e.message;
                }
            } else if (self.activeOptions.NewBtnBehavoir == "10") {
                msg = CreateInlineRecord(who);
            }

            if (msg) {
                DisplayCrmAlertDialog(_thisGlobals.Translation_Labels.CreateNewError + "\r" + msg);
            }

            return false;
        });

        $('#' + self.activeOptions.GridContainerIds.DeleteRec).click(function (e) {

            var selRows = self.activeOptions.selectedRows;
            if (selRows.length == 0) {
                return;
            }
            var toDel = [];
            var toDelGuids = [];
            var toCheckForSubgrid = [];
            var $row = undefined;
            var confirmMsg = '';

            for (var i = 0; i < selRows.length; i++) {
                $row = $(selRows[i]);
                
                var dirtycells = $row.find('td.IsDirty');
                if ((dirtycells) && (dirtycells.length)) {
                    confirmMsg = _thisGlobals.Translation_Labels.DeleteUnsavedConfirmation.replace('%S%', _thisHelpers.GetActiveCellText($(dirtycells[0])));
                    if (confirm(confirmMsg) == true) {
                        toDel.push(parseInt($row.attr(_thisGlobals.DataAttr.Row.InternalIndex)));
                        toDelGuids.push($row.attr(_thisGlobals.DataAttr.Cell.RecordGuid));
                        toCheckForSubgrid.push($row);
                    } else {
                        continue;
                    }
                } else {
                    toDel.push(parseInt($row.attr(_thisGlobals.DataAttr.Row.InternalIndex)));
                    toDelGuids.push($row.attr(_thisGlobals.DataAttr.Cell.RecordGuid));
                    toCheckForSubgrid.push($row);
                }
                
            };

            confirmMsg = _thisGlobals.Translation_Labels.DeleteConfirmation.replace('%S%', toDelGuids.length + '');
            if ((toDelGuids.length > 0) && (confirm(confirmMsg) == true)) {

                if (window.parent.DCrmEgGridDeleting) {
                    if (!window.parent.DCrmEgGridDeleting(toDelGuids, self.activeOptions.ParentEntityInfo)) {
                        LogIt("Deleting cancelled by user");
                        //DisplayCrmAlertDialog("Delete operation cancelled by javascript callback.");
                        return;
                    }
                }

                _thisHelpers.WaitDialog(true);

                var finalToDel = [];
                var finalToCheck = [];

                var haveErrors = '';

                for (var i = 0; i < toDelGuids.length; i++) {
                    try {
                        XrmServiceToolkit.Soap.Delete(self.activeOptions.ParentEntityInfo.ParentEntitySchemaname, toDelGuids[i]);
                        finalToDel.push(toDel[i]);
                        finalToCheck.push(toCheckForSubgrid[i]);
                    } catch (e) {
                        LogEx("Exception: Deleting Record " + e.message);
                        haveErrors += e.message;
                    } 
                }
                _thisHelpers.WaitDialog();

                if (finalToDel.length > 0) {

                    // Delete subgrids for this row if any exists
                    try {
                        for (var i = 0; i < finalToCheck.length; i++) {
                            var rowid = finalToCheck[i].attr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id);
                            if (rowid) {
                                if (finalToCheck[i][0].DSubGridRow) {
                                    LogIt("Deleting subgrids before deleting row");
                                    var subgridid = finalToCheck[i][0].DSubGridRow.attr(_thisGlobals.DataAttr.Row.SubGrid.Id);
                                    finalToCheck[i][0].DSubGridRow = undefined;

                                    if (self.activeOptions.HasChildGrids) {
                                        self.SelectedRecordGuid = finalToCheck[i].attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                                        ParentGridSelectedRecord(self, subgridid, true);
                                    }
                                }

                                $('#' + rowid).empty().remove();
                                finalToCheck[i].removeAttr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id);
                            }
                        }
                    } catch (e) {
                        LogEx("Exception: deleting subgrids " + e.message);
                    }

                    self.DeleteSelectedRows(finalToDel);
                    self.ResetColResizerHeight();

                    self.activeOptions.TotalRecordsCount = self.activeOptions.TotalRecordsCount - finalToDel.length;

                    $('#' + self.activeOptions.GridContainerIds.TotalRecords)
                        .text(_thisGlobals.Translation_Labels.TotalRecords + ' ' + self.activeOptions.TotalRecordsCount);

                    if (self.activeOptions.TotalRecordsCount <= self.activeOptions.PagerSize) {
                        $('#' + self.activeOptions.GridContainerIds.Pager).hide();
                    }
                }

                if (haveErrors.length > 0) {
                    DisplayCrmAlertDialog(_thisGlobals.Translation_Labels.DeletionError + "\r" + haveErrors);
                }
            }
        });

        $('#' + self.activeOptions.GridContainerIds.PagerButtonFirst).click(function (e) {
            e.stopPropagation();
            if (self.activeOptions.Page > 1) {

                if (self.CheckForDirtyCells() == false) {
                    return false;
                }

                self.RefreshGridRows();
            }
        });

        $('#' + self.activeOptions.GridContainerIds.PagerButtonPrev).click(function (e) {
            e.stopPropagation();
            if (self.activeOptions.Page > 1) {

                if (self.CheckForDirtyCells() == false) {
                    return false;
                }

                self.SaveUndoCancelEnable(false);
                self.clearTableBody();

                self.activeOptions.Page--;
                XrmServiceToolkit.Soap.Fetch(
                    self.GridConfiguration.GetFetchXml(self.activeOptions.Page,
                        self.activeOptions.PagingCookies[self.activeOptions.Page - 1]), false, self.RepopulateGridCallback);
            }

        });

        $('#' + self.activeOptions.GridContainerIds.PagerButtonNext).click(function (e) {
            e.stopPropagation();
            
            if (self.activeOptions.HasMoreRecords) {

                if (self.CheckForDirtyCells() == false) {
                    return false;
                }

                self.SaveUndoCancelEnable(false);
                self.clearTableBody();

                if (self.activeOptions.PagingCookies.length == self.activeOptions.Page.length) {
                    self.activeOptions.PagingCookie = null;
                } else {
                    self.activeOptions.PagingCookie = "a";
                }

                self.activeOptions.Page++;
                XrmServiceToolkit.Soap.Fetch(
                    self.GridConfiguration.GetFetchXml(self.activeOptions.Page,
                        self.activeOptions.PagingCookies[self.activeOptions.Page - 1]), false, self.RepopulateGridCallback);
            }

        });

        $('#' + self.activeOptions.GridContainerIds.CloneRecord).click(function (e) {
            e.stopPropagation();

            var selRows = self.activeOptions.selectedRows;
            if (selRows.length == 0) {
                return false;
            }
            var lastone = selRows.length - 1;
            for (var i = 0; i < selRows.length; i++) {
                CloneRecord(self, $(selRows[i]).clone(), ((lastone == i) ? true : false));
            }
        });

        $('#' + self.activeOptions.GridContainerIds.SearchGridBox).on('change', function (e) {
            e.stopPropagation();
            return;
            try {
                var rows = $(this).val().split("\n");
                $(this).val('');

                for (var i = 0; i < rows.length; i++) {
                    if ((rows[i]) && (rows[i].trim().length > 0)) {
                        // number and order of the cells must match the number of fields and their order

                        // Grid Fields
                        // Name      Price      Somedate   Description    Revenue   FieldA         FieldB         FieldC

                        // Excel Cells
                        // John      5.6        6/23/2016  (empty cell)   3405.65   (empty cell)   (empty cell)   (empty cell)

                        // Ensue that decimal, float, and money types use "." character as decimal separator
                        // We use parseInt and parseFloat to parse the numbers
                        // 55,55 => would return 55
                        // 55.55 => would return 55.55

                        // Limitations:
                        // This functionality works only with the following data types.
                        // Text, Description, Date, Datetime, Integer, Decimal, Float, and Money
                        // Optionset, Boolean, and Lookup fields require further modifications to the CreateInlineRecord logic

                        var cells = rows[i].split("\t");

                        /* Uncomment for debug messages
                        console.log("\r\nRow [" + i + "] = " + rows[i] + "\r\nCells:\r\n");
                        for (var ii = 0; ii < cells.length; ii++) {
                            if ((cells[ii]) && (cells[ii].length == 0)) {
                                cells[ii] = null;
                            }
                            console.log("cell [" + ii + "] = " + cells[ii]);
                        }
                        */

                        var msg = CreateInlineRecord(self, cells, (((i+1) == rows.length) ? true : null));
                        if (msg) {
                            DisplayCrmAlertDialog(_thisGlobals.Translation_Labels.CreateNewError + "\r" + msg);
                            Break;
                        }
                    }
                }

            } catch (ex) {
                DisplayCrmAlertDialog(_thisGlobals.Translation_Labels.CreateNewError + "\r" + ex.message);
            }
        });
    }

    function SetupRowHighlighting(who) {
        var self = who;

        self.mainTable.find(_thisGlobals.DefaultGridOptions.selectorBodyRows).off('mouseover').off('mouseleave')
            .on('mouseover', function (e) {
                var $tmp = $(e.target);
                tname = $tmp.parent()[0].tagName;

                if ((e.target.tagName == 'SPAN') || (e.target.tagName == 'BUTTON') || (e.target.tagName == 'IMG') || (e.target.tagName == 'INPUT')) {
                    if (tname == 'TD') {
                        self.HighlightedRow = $tmp.parent().parent();
                    }
                } else if (e.target.tagName == 'TD') {
                    self.HighlightedRow = $tmp.parent();
                }
                if (self.HighlightedRow) {
                    if (self.HighlightedRow.attr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id)) {
                    } else {
                        self.HighlightedRow.addClass('rowheaderhovercolor');
                    }
                }
        })
            .on('mouseleave', function (e) {
                if (self.HighlightedRow) {
                    self.HighlightedRow.removeClass('rowheaderhovercolor');
                    self.HighlightedRow = undefined;
                }
        });
    }

    function UpdateCrmField(toSave, who) {
        //Update Entity
        var updateEntity = undefined;
        $.each(toSave, function (i, field) {

            if (updateEntity) {
                if (updateEntity.id != field.RecGuid) {
                    try {
                        var updateResponse = XrmServiceToolkit.Soap.Update(updateEntity);
                    } catch (e) {
                        LogEx("Exception: " + e.message);
                    }
                    updateEntity = new XrmServiceToolkit.Soap.BusinessEntity(who.activeOptions.ParentEntityInfo.ParentEntitySchemaname, field.RecGuid);
                }
            } else {
                updateEntity = new XrmServiceToolkit.Soap.BusinessEntity(who.activeOptions.ParentEntityInfo.ParentEntitySchemaname, field.RecGuid);
            }
 
            // If value to save is empty, we need to pass null to empty the contents of the crm field
            var val = null;
            var tmp = null;

            if (field.InternalEditorType == DCrmEditableGrid.Editors.Text) {
                if (field.ValueToSave.length > 0) {
                    //if ((field.InternalEditorFormat) && (field.InternalEditorFormat.toLowerCase() == 'phone')) {
                    //    // remove formatting
                    //    val = field.ValueToSave.replace(/[()-]/g, "").replace(" ", "");
                    //} else {
                    //    val = field.ValueToSave;
                    //}
                    val = field.ValueToSave;
                }

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.Numeric) {
                if (field.ValueToSave === 0) {
                    tmp = field.ValueToSave;
                } else if ((field.ValueToSave != undefined) &&
                    (field.ValueToSave != null) && (field.ValueToSave != 'undefined') &&
                    (field.ValueToSave != 'null') && (field.ValueToSave != '')) {
                    tmp = parseInt(_thisHelpers.RemoveNumericFormat(field.ValueToSave));
                }
                val = { value: tmp, type: "int" };

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.DatePicker) {
                if (field.ValueToSave.length > 0) {
                    val = Date.parseDate(field.ValueToSave);
                }

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.Checkbox) {
                val = { value: field.CheckAttribute, type: "boolean" };

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.OptionSet) {
                if ((field.ValueToSave.trim().length == 0) || (field.OptionSetValue == '-1')) {
                    val = { value: tmp, type: 'OptionSetValue' };
                } else {
                    val = { value: parseInt(field.OptionSetValue), type: 'OptionSetValue' };
                }

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.Description) {
                if (field.ValueToSave.length > 0) {
                    val = field.ValueToSave;
                }

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.Lookup) {
                if ((field.LookupId) && (field.LookupId.length > 0)) {
                    val = { id: field.LookupId, logicalName: field.LookupLogicalName, type: 'EntityReference' };
                } else {
                    val = { value: tmp, type: 'EntityReference' };
                }

                if (field.FieldSchemaName == 'ownerid') {
                    // Set the owner
                    try {
                        var res = XrmServiceToolkit.Soap.Assign(who.activeOptions.ParentEntityInfo.ParentEntitySchemaname, field.RecGuid, field.LookupLogicalName, field.LookupId);
                    } catch (e) {
                        LogEx("Exception: Setting owner " + e.message);
                    }
                    return;
                }

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.Decimal) {
                if (field.ValueToSave === 0) {
                    tmp = field.ValueToSave;
                } else if ((field.ValueToSave != undefined) && (field.ValueToSave != null)
                    && (field.ValueToSave != 'undefined')
                    && (field.ValueToSave != 'null') && (field.ValueToSave != '')) {
                    tmp = field.ValueToSave;
                }
                val = { value: tmp, type: "decimal" };
            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.Double) {
                if (field.ValueToSave === 0) {
                    tmp = field.ValueToSave;
                } else if ((field.ValueToSave != undefined) && (field.ValueToSave != null)
                    && (field.ValueToSave != 'undefined')
                    && (field.ValueToSave != 'null') && (field.ValueToSave != '')) {
                    tmp = field.ValueToSave;
                }
                val = { value: tmp, type: "double" };
            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.Currency) {
                if (field.ValueToSave === 0) {
                    tmp = field.ValueToSave;
                } else if ((field.ValueToSave != undefined) && (field.ValueToSave != null)
                    && (field.ValueToSave != 'undefined') &&
                    (field.ValueToSave != 'null') && (field.ValueToSave != '')) {
                    tmp = field.ValueToSave;
                }
                val = { value: tmp, type: "Money" };

            } else if (field.InternalEditorType == DCrmEditableGrid.Editors.DateTimePicker) {
                if (field.ValueToSave.length > 0) {
                    tmp = Date.parseDate(field.ValueToSave, _thisGlobals.userDatetimeSettings.DateTimeFormat);
                }
                val = { value: tmp, type: "dateTime" };
            }

            updateEntity.attributes[field.FieldSchemaName] = val;
        });

        if (updateEntity) {
            try {
                var updateResponse = XrmServiceToolkit.Soap.Update(updateEntity);
            } catch (e) {
                LogEx("Exception: " + e.message);
            }
        }

    }

    function HideError(who) {
        var self = who;

        if (self.errorcontainer.is(':visible')) {
            self.errorcontainer.hide();
        }
        if (self.inputFormatErrorContainer.is(':visible')) {
            self.inputFormatErrorContainer.hide();
        }

        return true;
    }

    function GetEntityCount(distict, schemaName, primaryidattr, filters, callback) {
        var distinctRecs = (distict ? ' distinct="true"' : '');
        var fetchXml =
            '<fetch mapping="logical" aggregate="true">' +
                '<entity name="' + schemaName + '">' +
                     '<attribute name="' + primaryidattr + '" aggregate="countcolumn" alias="count"' + distinctRecs + '/>';
        if (filters.length > 0) {
            fetchXml += filters;
        }
        fetchXml += "</entity>" +
            "</fetch>";

        XrmServiceToolkit.Soap.Fetch(fetchXml, true, callback);
    }

    function buildCache(who) {
        var table = who.mainTableRaw;

        var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
            totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0;

        if (totalRows == 0) {
            return;
        }

        // First td for selection is added after
        totalCells++;

        var $tmpCell = null;
        var $chk = null;
        var $openRec = null;
        var gridOptions = who.activeOptions;

        for (var i = 0; i < totalRows; ++i) {

            var c = $(table.tBodies[0].rows[i]);

            $tmpCell = $('<td style="text-align:center"></td>');
            if ((!gridOptions.ParentFormIsReadOnly) &&
                ((gridOptions.UserCanDelete) || (gridOptions.DisplayCloneRecordButton))) {
                // Select row checkbox
                $chk = $("<input type='checkbox' />")
                    .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.SelectRecord)
                    .click(function (e) {
                        var row = $(this).parent().parent();

                        if ((row) && (row.length)) {

                            if ($(this).is(':checked')) {
                                // add to selected rows
                                gridOptions.selectedRows[gridOptions.selectedRows.length] = row[0];
                                $(row[0]).addClass(_thisGlobals.DefaultGridOptions.rowSelectedCss);
                            } else {
                                $(row[0]).removeClass(_thisGlobals.DefaultGridOptions.rowSelectedCss);
                                // remove from selected rows
                                for (var i = gridOptions.selectedRows.length - 1; i >= 0; i--) {
                                    if ($(gridOptions.selectedRows[i]).attr(_thisGlobals.DataAttr.Row.InternalIndex) === $(row[0]).attr(_thisGlobals.DataAttr.Row.InternalIndex)) {
                                        gridOptions.selectedRows.splice(i, 1);
                                        break;
                                    }
                                }
                            }
                        }
                        e.stopPropagation();
                    }).appendTo($tmpCell);
            }
            if (gridOptions.HasChildGrids) {
                $openRec = $('<img></img>')
                    .attr('src', _thisGlobals.DefaultGridOptions.ExpandRecordIcon)
                    .addClass('firstColOpenImg')
                    .attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO)
                    .click(function (e) {
                        e.stopPropagation();
                        $this = $(this);
                        var $parentrow = $this.parent().parent();

                        if ($this.attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen) == _thisGlobals.DataAttr.NO) {
                            $this.attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.YES);
                            $this.attr('src', _thisGlobals.DefaultGridOptions.CollapsedRecordIcon);

                            var subgridid = _thisHelpers.GenerateUUID();
                            var subgridrowid = _thisHelpers.GenerateUUID();
                            // Call parent passing only the subgrid div id
                            var tableHeaders = who.GetHeaderCells();
                            var $tr = $('<tr><td colspan="' + tableHeaders.length + '"></td></tr>')
                                .attr('id', subgridrowid)
                                .attr(_thisGlobals.DataAttr.Row.SubGrid.Id, subgridid)
                                .insertAfter($this.parent().parent());

                            $parentrow.attr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id, subgridrowid);
                            $parentrow[0].DSubGridRow = $tr;

                            $gridParentDiv = $('<div></div>')
                                .attr('id', subgridid)
                                .addClass('subgridparentdiv')
                                .appendTo($tr.find('td:first'));

                            $parentrow.addClass('bgSelectedSubGridRow');

                            who.SelectedRecordGuid = $parentrow.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                            _thisHelpers.WaitDialog(true);
                            ParentGridSelectedRecord(who, $gridParentDiv);

                        } else {
                            $this.attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO);
                            $this.attr('src', _thisGlobals.DefaultGridOptions.ExpandRecordIcon);
                            $parentrow.removeClass('bgSelectedSubGridRow');

                            var rowid = $parentrow.attr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id);
                            if (rowid) {
                                if ($parentrow[0].DSubGridRow) {
                                    var subgridid = $parentrow[0].DSubGridRow.attr(_thisGlobals.DataAttr.Row.SubGrid.Id);
                                    $parentrow[0].DSubGridRow = undefined;

                                    who.SelectedRecordGuid = $parentrow.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                                    ParentGridSelectedRecord(who, subgridid, true);
                                }

                                $('#' + rowid).empty().remove();
                                $parentrow.removeAttr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id);
                            }
                        }

                    }).appendTo($tmpCell);
            } else {
                $openRec = $('<img></img>')
                    .attr('src', _thisGlobals.DefaultGridOptions.OpenRecordIcon)
                    .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.OpenRecord)
                    .attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO)
                    .click(function (e) {
                        e.stopPropagation();

                        var $parentrow = $(this).parent().parent();
                        if (($parentrow) && ($parentrow.length > 0)) {
                            if (gridOptions.OpenRecordBehavoir == '10') {
                                window.parent.Xrm.Utility.openEntityForm(gridOptions.ParentEntityInfo.ParentEntitySchemaname,
                                    $($parentrow).attr(_thisGlobals.DataAttr.Cell.RecordGuid));
                            } else {
                                openEntityRecord(gridOptions.ParentEntityInfo.ParentEntitySchemaname,
                                    $($parentrow).attr(_thisGlobals.DataAttr.Cell.RecordGuid));
                            }
                        }
                    }).appendTo($tmpCell);
            }

            $("td:first", c).before($tmpCell);
            $(c[0]).attr(_thisGlobals.DataAttr.Row.InternalIndex, i);
        };
    }

    // return the instance
    return CrmEditableGrid;
})();

var colResizable = (function () {

    function colResizable(options) {
        var self = this;
        var defaults = {

            //attributes:
            draggingClass: 'JCLRgripDrag',	//css-class used when a grip is being dragged (for visual feedback purposes)
            gripInnerHtml: '',				//if it is required to use a custom grip it can be done using some custom HTML				
            liveDrag: true,				//enables table-layout updating while dragging	
            fixed: true,                    //table width does not change if columns are resized
            minWidth: 15, 					//minimum width value in pixels allowed for a column 
            headerOnly: false,				//specifies that the size of the the column resizing anchors will be bounded to the size of the first row 
            hoverCursor: "e-resize",  		//cursor to be used on grip hover
            dragCursor: "e-resize",  		//cursor to be used while dragging
            postbackSafe: false, 			//when it is enabled, table layout can persist after postback or page refresh. It requires browsers with sessionStorage support (it can be emulated with sessionStorage.js). 
            flush: false, 					//when postbakSafe is enabled, and it is required to prevent layout restoration after postback, 'flush' will remove its associated layout data 
            marginLeft: null,				//in case the table contains any margins, colResizable needs to know the values used, e.g. "10%", "15em", "5px" ...
            marginRight: null, 				//in case the table contains any margins, colResizable needs to know the values used, e.g. "10%", "15em", "5px" ...
            disable: false,					//disables all the enhancements performed in a previously colResized table	
            partialRefresh: false,			//can be used in combination with postbackSafe when the table is inside of an updatePanel
            firstColumnResizable: false,

            //events:
            onDrag: null, 					//callback function to be fired during the column resizing process if liveDrag is enabled
            onResize: null					//callback function fired when the dragging process is over
        }

        self.doc = $(document); 		//window object
        self.head = $("head");			//head object
        self.drag = null;			//reference to the current grip that is being dragged
        //self.count = 0;				//internal count to create unique IDs when needed.

        //common strings for packing
        self.ID = "id";
        self.PX = "px";
        self.SIGNATURE = "JColResizer";
        self.FLEX = "JCLRFlex";

        //short-cuts
        //self.I = parseInt;
        //self.M = Math;
        self.IE = /Trident\/[4-9]/.test(navigator.userAgent); // navigator.userAgent.indexOf('Trident/4.0')>0
        self.SessionStrage;
        try { self.SessionStrage = sessionStorage; } catch (e) { }	//Firefox crashes when executed as local file system

        self.options = $.extend(defaults, options);

        self.UpdatecolResizable = function () {
            //LogIt("UpdatecolResizable Called");
            self.syncGrips(self.options.ParentControlClass.mainTable);
        };

        /**
         * Function to allow column resizing for table objects. It is the starting point to apply the plugin.
         * @param {DOM node} tb - reference to the DOM table object to be enhanced
         * @param {Object} options	- some customization values
         */

        var tmpTable = self.options.ParentControlClass.mainTable;										//the table object is wrapped

        var id = tmpTable.id = tmpTable.attr(self.ID) || self.SIGNATURE + _thisHelpers.GenerateRandomLetters(10);	//its id is obtained, if null new one is generated		
        tmpTable.p = self.options.postbackSafe; 							//short-cut to detect postback safe 		
        if (!tmpTable.is("table") && !self.options.partialRefresh) return; 		//if the object is not a table or if it was already processed then it is ignored.
        tmpTable.addClass(self.SIGNATURE).attr(self.ID, id).before('<div class="JCLRgrips"/>');	//the grips container object is added. Signature class forces table rendering in fixed-layout mode to prevent column's min-width

        tmpTable.g = []; tmpTable.c = []; tmpTable.w = tmpTable.width(); tmpTable.gc = tmpTable.prev(); tmpTable.f = self.options.fixed;	//tmpTable.c and tmpTable.g are arrays of columns and grips respectively				
        if (self.options.marginLeft) tmpTable.gc.css("marginLeft", self.options.marginLeft);  	//if the table contains margins, it must be specified
        if (self.options.marginRight) tmpTable.gc.css("marginRight", self.options.marginRight);  	//since there is no (direct) way to obtain margin values in its original units (%, em, ...)

        tmpTable.cs = parseInt(self.IE ? tmpTable[0].cellSpacing || tmpTable[0].currentStyle.borderSpacing : tmpTable.css('border-spacing')) || 2;	//table cellspacing (not even jQuery is fully cross-browser)
        tmpTable.b = parseInt(self.IE ? [0].border || tmpTable[0].currentStyle.borderLeftWidth : tmpTable.css('border-left-width')) || 1;	//outer border width (again cross-browser issues)

        /**
         * This function allows to remove any enhancements performed by this plugin on a previously processed table.
         * @param {jQuery ref} t - table object
         */
        self.destroy = function () {
            //var id = t.attr(self.ID), t = tables[id];		//its table object is found
            //if (!t || !t.is("table")) return;			//if none, then it wasn't processed	 
            self.options.ParentControlClass.mainTable.removeClass(self.SIGNATURE + " " + self.FLEX).gc.remove();	//class and grips are removed
        };


        /**
         * Function to create all the grips associated with the table given by parameters 
         * @param {jQuery ref} t - table object
         */
        self.createGrips = function (t) {
            var th = t.find(">thead>tr>th,>thead>tr>td");	//if table headers are specified in its semantically correct tag, are obtained
            if (!th.length) th = t.find(">tbody>tr:first>th,>tr:first>th,>tbody>tr:first>td, >tr:first>td");	 //but headers can also be included in different ways
            //th = th.filter(":visible");					//filter invisible columns
            t.cg = t.find("col"); 						//a table can also contain a colgroup with col elements		
            t.ln = th.length;							//table length is stored	
            if (t.p && self.SessionStrage && self.SessionStrage[t.id]) self.memento(t, th);		//if 'postbackSafe' is enabled and there is data for the current table, its coloumn layout is restored
            th.each(function (i) {						//iterate through the table column headers	
                var c = $(this); 						//jquery wrap for the current column			
                var g = $(t.gc.append('<div class="JCLRgrip"></div>')[0].lastChild); //add the visual node to be used as grip
                g.append(self.options.gripInnerHtml).append('<div class="' + self.SIGNATURE + '"></div>');
                if (i == t.ln - 1) {
                    g.addClass("JCLRLastGrip");
                    if (t.f) g.html("");
                }

                if (i > 0) {
                    g.bind('touchstart mousedown', self.onGripMouseDown); //bind the mousedown event to start dragging 
                } else if ((i == 0) && (self.options.firstColumnResizable)) {
                    g.bind('touchstart mousedown', self.onGripMouseDown);
                } else {
                    g.html("");
                }

                g.t = t; g.i = i; g.c = c; 		//some values are stored in the grip's node data
                c.w = c.width();

                t.g.push(g); t.c.push(c);						//the current grip and column are added to its table object
                c.width(c.w).removeAttr("width");				//the width of the column is converted into pixel-based measurements
                g.data(self.SIGNATURE, { i: i, t: t.attr(self.ID), last: i == t.ln - 1 });	 //grip index and its table name are stored in the HTML 												
            });
            t.cg.removeAttr("width");	//remove the width attribute from elements in the colgroup 
            self.syncGrips(t); 				//the grips are positioned according to the current table layout			
            //there is a small problem, some cells in the table could contain dimension values interfering with the 
            //width value set by this plugin. Those values are removed
            t.find('td, th').not(th).not('table th, table td').each(function () {
                $(this).removeAttr('width');	//the width attribute is removed from all table cells which are not nested in other tables and dont belong to the header
            });
            if (!self.FLEX) {
                t.removeAttr('width').addClass(self.FLEX); //if not fixed, let the table grow as needed
            }
        };


        /**
         * Function to allow the persistence of columns dimensions after a browser postback. It is based in
         * the HTML5 sessionStorage object, which can be emulated for older browsers using sessionstorage.js
         * @param {jQuery ref} t - table object
         * @param {jQuery ref} th - reference to the first row elements (only set in deserialization)
         */
        self.memento = function (t, th) {
            var w, m = 0, i = 0, aux = [], tw;
            if (th) {										//in deserialization mode (after a postback)
                t.cg.removeAttr("width");
                if (self.options.flush) { self.SessionStrage[t.id] = ""; return; } 	//if flush is activated, stored data is removed
                w = self.SessionStrage[t.id].split(";");					//column widths is obtained
                tw = w[t.ln + 1];
                if (!t.f && tw) t.width(tw);			//it not fixed and table width data available its size is restored
                for (; i < t.ln; i++) {						//for each column
                    aux.push(100 * w[i] / w[t.ln] + "%"); 	//width is stored in an array since it will be required again a couple of lines ahead
                    th.eq(i).css("width", aux[i]); 	//each column width in % is restored
                }
                for (i = 0; i < t.ln; i++)
                    t.cg.eq(i).css("width", aux[i]);	//this code is required in order to create an inline CSS rule with higher precedence than an existing CSS class in the "col" elements
            } else {							//in serialization mode (after resizing a column)
                self.SessionStrage[t.id] = "";				//clean up previous data
                for (; i < t.c.length; i++) {	//iterate through columns
                    w = t.c[i].width();		//width is obtained
                    self.SessionStrage[t.id] += w + ";";		//width is appended to the sessionStorage object using ID as key
                    m += w;					//carriage is updated to obtain the full size used by columns
                }
                self.SessionStrage[t.id] += m;							//the last item of the serialized string is the table's active area (width), 
                //to be able to obtain % width value of each columns while deserializing
                if (!self.FLEX) self.SessionStrage[t.id] += ";" + t.width(); 	//if not fixed, table width is stored
            }
        };


        /**
         * Function that places each grip in the correct position according to the current table layout	 
         * @param {jQuery ref} t - table object
         */
        self.syncGrips = function (t) {
            t.gc.width(t.w);			//the grip's container width is updated				
            for (var i = 0; i < t.ln; i++) {	//for each column
                var c = t.c[i];
                t.g[i].css({			//height and position of the grip is updated according to the table layout
                    left: c.offset().left - t.offset().left + c.outerWidth(false) + t.cs / 2 + self.PX,
                    height: self.options.headerOnly ? t.c[0].outerHeight(false) : t.outerHeight(false)
                });
            }
        };


        /**
        * This function updates column's width according to the horizontal position increment of the grip being
        * dragged. The function can be called while dragging if liveDragging is enabled and also from the onGripDragOver
        * event handler to synchronize grip's position with their related columns.
        * @param {jQuery ref} t - table object
        * @param {number} i - index of the grip being dragged
        * @param {bool} isOver - to identify when the function is being called from the onGripDragOver event	
        */
        self.syncCols = function (t, i, isOver) {
            var inc = self.drag.x - self.drag.l, c = t.c[i], c2 = t.c[i + 1];
            var w = c.w + inc; var w2 = c2.w - inc;	//their new width is obtained					
            c.width(w + self.PX);
            t.cg.eq(i).width(w + self.PX);
            if (t.f) { //if fixed mode
                c2.width(w2 + self.PX);
                t.cg.eq(i + 1).width(w2 + self.PX);
            }
            if (isOver) {
                c.w = w;
                c2.w = t.f ? w2 : c2.w;
            }
        };


        /**
        * This function updates all columns width according to its real width. It must be taken into account that the 
        * sum of all columns can exceed the table width in some cases (if fixed is set to false and table has some kind 
        * of max-width).
        * @param {jQuery ref} t - table object	
        */
        self.applyBounds = function (t) {
            var w = $.map(t.c, function (c) {			//obtain real widths
                return c.width();
            });
            t.width(t.width()).removeClass(self.FLEX);	//prevent table width changes
            $.each(t.c, function (i, c) {
                c.width(w[i]).w = w[i];				//set column widths applying bounds (table's max-width)
            });
            t.addClass(self.FLEX);						//allow table width changes
        };


        /**
         * Event handler used while dragging a grip. It checks if the next grip's position is valid and updates it. 
         * @param {event} e - mousemove event binded to the window object
         */
        self.onGripDrag = function (e) {
            if (!self.drag) return;
            var t = self.drag.t;		//table object reference 
            var oe = e.originalEvent.touches;
            var ox = oe ? oe[0].pageX : e.pageX;    //original position (touch or mouse)
            var x = ox - self.drag.ox + self.drag.l;	        //next position according to horizontal mouse position increment
            var mw = self.options.minWidth, i = self.drag.i;	//cell's min width
            var l = t.cs * 1.5 + mw + t.b;
            var last = i == t.ln - 1;                 			//check if it is the last column's grip (usually hidden)
            var min = i ? t.g[i - 1].position().left + t.cs + mw : l;	//min position according to the contiguous cells
            var max = t.f ? 	//fixed mode?
                i == t.ln - 1 ?
                    t.w - l :
                    t.g[i + 1].position().left - t.cs - mw :
                Infinity; 								//max position according to the contiguous cells 
            x = Math.max(min, Math.min(max, x));				//apply bounding		
            self.drag.x = x; self.drag.css("left", x + self.PX); 	//apply position increment	
            if (last) {									//if it is the last grip
                var c = t.c[self.drag.i];					//width of the last column is obtained
                self.drag.w = c.w + x - self.drag.l;
            }
            if (self.options.liveDrag) { 			//if liveDrag is enabled
                if (last) {
                    c.width(self.drag.w);
                    t.w = t.width();
                } else {
                    self.syncCols(t, i); 			//columns are synchronized
                }
                self.syncGrips(t);
                var cb = self.options.onDrag;							//check if there is an onDrag callback
                if (cb) { e.currentTarget = t[0]; cb(e); }		//if any, it is fired			
            }
            return false; 	//prevent text selection while dragging				
        };


        /**
         * Event handler fired when the dragging is over, updating table layout
         */
        self.onGripDragOver = function (e) {

            self.doc.unbind('touchend.' + self.SIGNATURE + ' mouseup.' + self.SIGNATURE).unbind('touchmove.' + self.SIGNATURE + ' mousemove.' + self.SIGNATURE);
            $("head :last-child").remove(); 				//remove the dragging cursor style	
            if (!self.drag) return;
            self.drag.removeClass(self.options.draggingClass);		//remove the grip's dragging css-class
            var t = self.drag.t;
            var cb = self.options.onResize; 	    //get some values	
            var i = self.drag.i;                 //column index
            var last = i == t.ln - 1;         //check if it is the last column's grip (usually hidden)
            var c = t.g[i].c;               //the column being dragged
            if (last) {
                c.width(self.drag.w);
                c.w = self.drag.w;
            } else {
                self.syncCols(t, i, true);	//the columns are updated
            }
            if (!self.FLEX) self.applyBounds(t);	//if not fixed mode, then apply bounds to obtain real width values
            self.syncGrips(t);				//the grips are updated
            if (cb) { e.currentTarget = t[0]; cb(e); }	//if there is a callback function, it is fired
            if (t.p && self.SessionStrage) self.memento(t); 						//if postbackSafe is enabled and there is sessionStorage support, the new layout is serialized and stored
            self.drag = null;									//since the grip's dragging is over									
        };


        /**
         * Event handler fired when the grip's dragging is about to start. Its main goal is to set up events 
         * and store some values used while dragging.
         * @param {event} e - grip's mousedown event
         */
        self.onGripMouseDown = function (e) {
            var o = $(this).data(self.SIGNATURE);			//retrieve grip's data
            var t = self.options.ParentControlClass.mainTable, g = t.g[o.i];			//shortcuts for the table and grip objects
            var oe = e.originalEvent.touches;           //touch or mouse event?
            g.ox = oe ? oe[0].pageX : e.pageX;            //the initial position is kept
            g.l = g.position().left;
            self.doc.bind('touchmove.' + self.SIGNATURE + ' mousemove.' + self.SIGNATURE, self.onGripDrag).bind('touchend.' + self.SIGNATURE + ' mouseup.' + self.SIGNATURE, self.onGripDragOver);	//mousemove and mouseup events are bound
            self.head.append("<style type='text/css'>*{cursor:" + self.options.dragCursor + "!important}</style>"); 	//change the mouse cursor
            g.addClass(self.options.draggingClass); 	//add the dragging class (to allow some visual feedback)				
            self.drag = g;							//the current grip is stored as the current dragging object
            if (t.c[o.i].l) for (var i = 0, c; i < t.ln; i++) { c = t.c[i]; c.l = false; c.w = c.width(); } 	//if the colum is locked (after browser resize), then c.w must be updated		
            return false; 	//prevent text selection
        };


        /**
         * Event handler fired when the browser is resized. The main purpose of this function is to update
         * table layout according to the browser's size synchronizing related grips 
         */
        self.onResize = function () {
            var t = self.options.ParentControlClass.mainTable, i, mw = 0;
            t.removeClass(self.SIGNATURE);						//firefox doesn't like layout-fixed in some cases
            if (t.f && t.w != t.width()) {					//if the the table's width has changed and it is in fixed mode
                t.w = t.width();							//its new value is kept the active cells area is obtained
                for (i = 0; i < t.ln; i++) mw += t.c[i].w;
                //cell rendering is not as trivial as it might seem, and it is slightly different for
                //each browser. In the beginning i had a big switch for each browser, but since the code
                //was extremely ugly now I use a different approach with several re-flows. This works 
                //pretty well but it's a bit slower. For now, lets keep things simple...   
                for (i = 0; i < t.ln; i++) t.c[i].css("width", Math.round(1000 * t.c[i].w / mw) / 10 + "%").l = true;
                //c.l locks the column, telling us that its c.w is outdated									
            }
            self.syncGrips(t.addClass(self.SIGNATURE));
        };

        //bind resize event, to update grips position 
        $(window).bind('resize.' + self.SIGNATURE, self.onResize);

        self.createGrips(tmpTable);		//grips are created

    }

    // return the instance
    return colResizable;
})();

function DisplayNewButtonMenu(self, $this) {
    var menu = $('<ul class="contextMenuPlugin"><div class="gutterLine"></div></ul>').appendTo('body');
    var $bg = $('<div></div>')
      .addClass('InvisibleFrame')
      .appendTo('body')
      .on('contextmenu click', function (e) {
          e.stopPropagation();
          $bg.remove();
          menu.remove();
          return false;
      }).show();

    var $row = $('<li><a href="#" class="contextMenuLink" id="newinline"><span class="itemTitle">Inline</span></a></li>').appendTo(menu);
    $row = $('<li><a href="#" class="contextMenuLink" id="newwindow"><span class="itemTitle">Window</span></a></li>').appendTo(menu);

    menu.find('a').click(function (e) {
        var id = $(this).attr('id');
        var msg = undefined;
        if (id == 'newinline') {
            msg = CreateInlineRecord(self);

        } else if (id == 'newwindow') {
            try {

                if (window.parent.DCrmEgGridBeforeCreateNewRecord) {
                    var allow = window.parent.DCrmEgGridBeforeCreateNewRecord(null, self.activeOptions.ParentEntityInfo);
                    if (!allow) {
                        $bg.remove();
                        menu.remove();
                        //DisplayCrmAlertDialog("Create operation cancelled by javascript callback.");
                        return false;
                    }
                }

                if (self.activeOptions.ParentChildLookupInfo.Related) {
                    if ((self.activeOptions.ParentChildLookupInfo.LookupSchemaName == 'regardingobjectid')) {
                        $bg.remove();
                        menu.remove();
                        DisplayCrmAlertDialog("Unable to set Regarding. Please use the create Inline menu.\r\nMSDN: You can't set the values for partylist or regarding lookups using openEntityForm.");
                        return false;
                    }

                    /*
 var parameters = {};
 parameters["parentcustomerid"] = "2878282E-94D6-E111-9B1D-00155D9D700B";
 parameters["parentcustomeridname"] = "Contoso";
 parameters["parentcustomeridtype"] = "account";

For simple lookups you must set the value and the text to display in the lookup. Use the suffix “name” with the name of the attribute to set the value for the text.
Don’t use any other arguments.
For customer and owner lookups you must set the value and the name in the same way you set them for simple lookups.
In addition you must use the suffix “type” to specify the type of entity.
Allowable values are account, contact, systemuser, and team.
You can’t set the values for partylist or regarding lookups.
                    */
                    var parameters = {};

                    parameters[self.activeOptions.ParentChildLookupInfo.LookupSchemaName] = self.activeOptions.ParentChildLookupInfo.Guid;
                    parameters[self.activeOptions.ParentChildLookupInfo.LookupSchemaName + "name"] = self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue;

                    var tmp = self.activeOptions.ParentChildLookupInfo.LookupSchemaName;

                    if (tmp.endsWith('customerid') || tmp.endsWith('ownerid')) {
                        parameters[self.activeOptions.ParentChildLookupInfo.LookupSchemaName + "type"] = self.activeOptions.ParentChildLookupInfo.ParentSchemaName;
                    }

                    window.parent.Xrm.Utility.openEntityForm(self.activeOptions.ParentEntityInfo.ParentEntitySchemaname, null, parameters);

                } else {
                    window.parent.Xrm.Utility.openEntityForm(self.activeOptions.ParentEntityInfo.ParentEntitySchemaname, null, null);
                }
            } catch (e) {
                msg = e.message;
            }
        }

        $bg.remove();
        menu.remove();
        
        if (msg) {
            DisplayCrmAlertDialog(_thisGlobals.Translation_Labels.CreateNewError + "\r" + msg);
        }
    });

    menu.show();
    menu.css({ zIndex: 100006, left: $this.offset().left, top: ($this.offset().top + $this.outerHeight() + 2) })
        .on('contextmenu', function () {
            e.stopPropagation();
            return false;
        });
}

function CloneRecord(self, rowToBeCloned, lastone) {
    var msg = undefined;
    try {
        var $cloneRow = (rowToBeCloned) ? rowToBeCloned : self.contextMenuTarget.parent().clone();
        var lastcloneRefresh = false;
        if ((lastone == undefined) || (lastone == true)) {
            lastcloneRefresh = true;
        }
        self.contextMenuTarget = undefined;
        var $theadcells = self.mainTable.find('thead th');
        var cells = $cloneRow[0].cells;
        var $cell = undefined;
        var val = undefined;
        var formattedVal = '';

        $cloneRow.removeAttr(_thisGlobals.DataAttr.Cell.RecordGuid).removeClass(_thisGlobals.DefaultGridOptions.rowSelectedCss);
        $cloneRow.find('td').each(function () {
            $(this).removeAttr('id');
        });

        var recSchema = self.activeOptions.ParentEntityInfo.ParentEntitySchemaname;
        var recNew = new XrmServiceToolkit.Soap.BusinessEntity(recSchema);
        var exclude = ['transactioncurrencyid', 'createdby', 'createdon', , 'modifiedby', 'modifiedon', 'ownerid'];

        if (self.activeOptions.ParentChildLookupInfo.Related) {
            recNew.attributes[self.activeOptions.ParentChildLookupInfo.LookupSchemaName] = {
                id: self.activeOptions.ParentChildLookupInfo.Guid,
                logicalName: self.activeOptions.ParentChildLookupInfo.ParentSchemaName,
                type: self.activeOptions.ParentChildLookupInfo.Type
            };
        }

        for (var i = 1; i < $theadcells.length; i++) {
            $cell = $(cells[i]);

            var $thcell = $($theadcells[i]);
            var ed = parseInt($thcell.attr(_thisGlobals.DataAttr.Header.EditorType));
            var schema = $thcell.attr(_thisGlobals.DataAttr.Header.SchemaName);
            formattedVal = '';
            val = undefined;

            if (ed == DCrmEditableGrid.Editors.None) {
                ed = parseInt($thcell.attr(_thisGlobals.DataAttr.Header.ReadOnlyEditorType));
            }

            if (!exclude.ExactMatchExists(schema)) {
                if ((ed == DCrmEditableGrid.Editors.Text) || (ed == DCrmEditableGrid.Editors.Description)) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        recNew.attributes[schema] = formattedVal;
                        val = formattedVal;
                    }

                } else if (ed == DCrmEditableGrid.Editors.Numeric) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        val = parseInt(_thisHelpers.RemoveNumericFormat(formattedVal));
                        recNew.attributes[schema] = { value: val, type: "int" };
                    }

                } else if (ed == DCrmEditableGrid.Editors.Decimal) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        val = parseFloat(_thisHelpers.RemoveNumericFormat(formattedVal).replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.'));
                        recNew.attributes[schema] = { value: val, type: "decimal" };
                    }
                } else if (ed == DCrmEditableGrid.Editors.Double) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        val = parseFloat(_thisHelpers.RemoveNumericFormat(formattedVal).replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.'));
                        recNew.attributes[schema] = { value: val, type: "double" };
                    }
                } else if (ed == DCrmEditableGrid.Editors.Currency) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        val = parseFloat(_thisHelpers.RemoveNumericFormat(formattedVal).replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.'));
                        recNew.attributes[schema] = { value: val, type: "Money" };
                    }
                } else if (ed == DCrmEditableGrid.Editors.DatePicker) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        val = Date.parseDate(formattedVal);
                        recNew.attributes[schema] = val;
                    }

                } else if (ed == DCrmEditableGrid.Editors.DateTimePicker) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        val = Date.parseDate(formattedVal);
                        recNew.attributes[schema] = { value: val, type: "dateTime" };
                    }

                } else if (ed == DCrmEditableGrid.Editors.Checkbox) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        val = (formattedVal == self.GridEditors[i].CheckedLabel) ? true : false;
                        recNew.attributes[schema] = { value: val, type: "boolean" };
                    }

                } else if (ed == DCrmEditableGrid.Editors.OptionSet) {

                    formattedVal = _thisHelpers.GetActiveCellText($cell);
                    if ((formattedVal) && (formattedVal.length > 0)) {
                        var optionsetVal = $cell.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue);
                        if (optionsetVal) {
                            val = parseInt(optionsetVal);
                        }
                        recNew.attributes[schema] = { value: val, type: "OptionSetValue" };
                    }

                } else if ((ed == DCrmEditableGrid.Editors.Lookup) || (ed == DCrmEditableGrid.Editors.CustomerType)) {
                    if (self.activeOptions.ParentChildLookupInfo.LookupSchemaName != schema) {
                        formattedVal = _thisHelpers.GetActiveCellText($cell);
                        if ((formattedVal) && (formattedVal.length > 0)) {
                            recNew.attributes[schema] = {
                                id: _thisHelpers.AddCurlyBrace($cell.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid)),
                                logicalName: $cell.attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName),
                                type: "EntityReference"
                            };
                        }
                    }
                }
            }

        }

        // JS callback
        if (window.parent.DCrmEgGridBeforeCreateNewRecord) {
            var allow = window.parent.DCrmEgGridBeforeCreateNewRecord(recNew, self.activeOptions.ParentEntityInfo);
            if (!allow) {
                _thisHelpers.WaitDialog();
                return;
            }
        }

        var newRecGuid = XrmServiceToolkit.Soap.Create(recNew);
        $cloneRow.attr(_thisGlobals.DataAttr.Cell.RecordGuid, newRecGuid)
            .attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO);

        for (var i = 0; i < $theadcells.length; i++) {
            if (i > 0) {
                $(cells[i]).attr(_thisGlobals.DataAttr.Cell.RecordGuid, newRecGuid);
            }
        }

        self.mainTable.find('tbody:first').append($cloneRow);

        var tableRows = self.GetBodyRows();
        for (var i = 0; i < tableRows.length; i++) {
            $(tableRows[i]).attr(_thisGlobals.DataAttr.Row.InternalIndex, i);
        }

        self.activeOptions.TotalRecordsCount++;
        $('#' + self.activeOptions.GridContainerIds.TotalRecords).text(_thisGlobals.Translation_Labels.TotalRecords + ' ' + self.activeOptions.TotalRecordsCount);

        if (self.activeOptions.TotalRecordsCount > self.activeOptions.PagerSize) {
            $('#' + self.activeOptions.GridContainerIds.Pager).show();
        }

        // JS callback
        if (window.parent.DCrmEgGridCreateNewRecord) {
            var callbackData = { NewRecordGuid: newRecGuid };
            window.parent.DCrmEgGridCreateNewRecord(callbackData, self.activeOptions.ParentEntityInfo);
        }
        if (lastcloneRefresh) {
            if (self.activeOptions.RefreshAfterCreate) {
                self.RefreshGridRows();
            } else {
                self.ResetRowHighlighting();
            }
        }
    } catch (e) {
        msg = e.message;
    }

    if (msg) {
        DisplayCrmAlertDialog("Unable to clone record due to exception:\r" + msg);
    }
}

function CreateInlineRecord(self, excelCells, lastRec) {
    var msg = undefined;

    var extraRowHeight = '';
    try {
        if (_thisGlobals.xrmPage.context.client.getClient() == "Mobile") {
            extraRowHeight = ' style="height:30px;"';
        }
    } catch (e) {

    }

    try {

        var $theadcells = self.mainTable.find('thead th');
        var $cloneRow = $('<tr' + extraRowHeight + '></tr>');
        var cells = undefined;
        var $cell = undefined;
        var tmpLookupStruc = { Index: -1 };

        for (var i = 0; i < $theadcells.length; i++) {
            if (i > 0) {
                $('<td tabindex="1"></td>')
                .html('<span class="fieldcelltext"></span>')
                .appendTo($cloneRow);
            } else {
                var $tmpCell = $('<td style="text-align:center"></td>').appendTo($cloneRow);

                if ((!self.activeOptions.ParentFormIsReadOnly)
                    && (self.activeOptions.UserCanDelete)
                    && (self.activeOptions.AllowDelete)) {
                    // Select row checkbox
                    $chk = $("<input type='checkbox' />")
                        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.SelectRecord)
                        .click(function (e) {
                            var row = $(this).parent().parent();

                            if ((row) && (row.length)) {

                                if ($(this).is(':checked')) {
                                    // add to selected rows
                                    self.activeOptions.selectedRows[self.activeOptions.selectedRows.length] = row[0];
                                    $(row[0]).addClass(_thisGlobals.DefaultGridOptions.rowSelectedCss);
                                } else {
                                    $(row[0]).removeClass(_thisGlobals.DefaultGridOptions.rowSelectedCss);
                                    // remove from selected rows
                                    for (var i = self.activeOptions.selectedRows.length - 1; i >= 0; i--) {
                                        if ($(self.activeOptions.selectedRows[i]).attr(_thisGlobals.DataAttr.Row.InternalIndex) === $(row[0]).attr(_thisGlobals.DataAttr.Row.InternalIndex)) {
                                            self.activeOptions.selectedRows.splice(i, 1);
                                            break;
                                        }
                                    }
                                }
                            }
                            e.stopPropagation();
                        }).appendTo($tmpCell);
                }

                if (self.activeOptions.HasChildGrids) {
                    $openRec = $('<img></img>')
                        .attr('src', _thisGlobals.DefaultGridOptions.ExpandRecordIcon)
                        .addClass('firstColOpenImg')
                        .attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO)
                        .click(function (e) {
                            e.stopPropagation();
                            $this = $(this);
                            var $parentrow = $this.parent().parent();

                            if ($this.attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen) == _thisGlobals.DataAttr.NO) {
                                $this.attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.YES);
                                $this.attr('src', _thisGlobals.DefaultGridOptions.CollapsedRecordIcon);

                                var subgridid = _thisHelpers.GenerateUUID();
                                var subgridrowid = _thisHelpers.GenerateUUID();
                                // Call parent passing only the subgrid div id
                                var $tr = $('<tr><td colspan="' + $theadcells.length + '"></td></tr>')
                                    .attr('id', subgridrowid)
                                    .attr(_thisGlobals.DataAttr.Row.SubGrid.Id, subgridid)
                                    .insertAfter($this.parent().parent());

                                $parentrow.attr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id, subgridrowid);
                                $parentrow[0].DSubGridRow = $tr;

                                $gridParentDiv = $('<div></div>')
                                    .attr('id', subgridid)
                                    .addClass('subgridparentdiv')
                                    .appendTo($tr.find('td:first'));

                                $parentrow.addClass('bgSelectedSubGridRow');

                                self.SelectedRecordGuid = $parentrow.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                                _thisHelpers.WaitDialog(true);
                                ParentGridSelectedRecord(self, $gridParentDiv);
                                self.ResetColResizerHeight();

                            } else {
                                $this.attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO);
                                $this.attr('src', _thisGlobals.DefaultGridOptions.ExpandRecordIcon);
                                $parentrow.removeClass('bgSelectedSubGridRow');

                                var rowid = $parentrow.attr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id);
                                if (rowid) {
                                    if ($parentrow[0].DSubGridRow) {
                                        var subgridid = $parentrow[0].DSubGridRow.attr(_thisGlobals.DataAttr.Row.SubGrid.Id);
                                        $parentrow[0].DSubGridRow = undefined;

                                        self.SelectedRecordGuid = $parentrow.attr(_thisGlobals.DataAttr.Cell.RecordGuid);
                                        ParentGridSelectedRecord(self, subgridid, true);
                                    }

                                    $('#' + rowid).empty().remove();
                                    $parentrow.removeAttr(_thisGlobals.DataAttr.Row.SubGrid.Row.Id);
                                    self.ResetColResizerHeight();
                                }
                            }

                        }).appendTo($tmpCell);
                } else {
                    $openRec = $('<img></img>')
                        .attr('src', _thisGlobals.DefaultGridOptions.OpenRecordIcon)
                        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.OpenRecord)
                        .attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO)
                        .click(function (e) {
                            e.stopPropagation();

                            var $parentrow = $(this).parent().parent();
                            if (($parentrow) && ($parentrow.length > 0)) {
                                window.parent.Xrm.Utility.openEntityForm(self.activeOptions.ParentEntityInfo.ParentEntitySchemaname,
                                    $($parentrow).attr(_thisGlobals.DataAttr.Cell.RecordGuid));
                            }
                        }).appendTo($tmpCell);
                }

            }
        }

        cells = $cloneRow[0].cells;

        var recSchema = self.activeOptions.ParentEntityInfo.ParentEntitySchemaname;

        var recNew = new XrmServiceToolkit.Soap.BusinessEntity(recSchema);
        var exclude = ['transactioncurrencyid', 'createdby', 'createdon', , 'modifiedby', 'modifiedon', 'ownerid'];

        if (self.activeOptions.ParentChildLookupInfo.Related) {
            recNew.attributes[self.activeOptions.ParentChildLookupInfo.LookupSchemaName] = {
                id: self.activeOptions.ParentChildLookupInfo.Guid,
                logicalName: self.activeOptions.ParentChildLookupInfo.ParentSchemaName,
                type: self.activeOptions.ParentChildLookupInfo.Type
            };
        }

        var val = undefined;
        var formattedVal = '';
        var callbackRowData = { RecordGuid: undefined, Fields: [], RowIndex: -1, InlineCreate: true };

        for (var i = 1; i < $theadcells.length; i++) {
            $cell = $(cells[i]);

            var $thcell = $($theadcells[i]);
            var ed = parseInt($thcell.attr(_thisGlobals.DataAttr.Header.EditorType));
            var schema = $thcell.attr(_thisGlobals.DataAttr.Header.SchemaName);
            var requier = ($thcell.attr(_thisGlobals.DataAttr.Header.Required) == _thisGlobals.DataAttr.YES) ? true : false;
            var defaultVal = null;

            if ((excelCells) && (excelCells[i - 1])) {
                defaultVal = excelCells[i - 1];
            } else {
                defaultVal = $thcell.attr(_thisGlobals.DataAttr.Header.DefaultValueForCreate);
            }

            formattedVal = '';
            val = undefined;

            var callbackField = {};
            callbackField.ReadOnly = false;
            callbackField.SchemaName = schema;
            callbackField.FieldType = $thcell.attr('data-crmfieldtype');
            callbackField.FieldIndex = i;
            callbackField.BackgroundColor = null;
            callbackField.ForgroundColor = null;
            callbackField.Value = undefined;
            callbackField.FormattedValue = undefined;

            if (ed == DCrmEditableGrid.Editors.None) {
                ed = parseInt($thcell.attr(_thisGlobals.DataAttr.Header.ReadOnlyEditorType));
            }

            if (!exclude.ExactMatchExists(schema)) {
                if ((ed == DCrmEditableGrid.Editors.Text) || (ed == DCrmEditableGrid.Editors.Description)) {
                    if (defaultVal) {
                        formattedVal = defaultVal;
                        recNew.attributes[schema] = formattedVal;
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    } else if (requier) {
                        formattedVal = _thisHelpers.GetHeaderCellText($thcell) + Math.floor((Math.random() * 1000) + 1);
                        
                        recNew.attributes[schema] = formattedVal;
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    }

                    val = formattedVal;
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;

                } else if (ed == DCrmEditableGrid.Editors.Numeric) {
                    if (defaultVal) {
                        val = parseInt(defaultVal);
                        recNew.attributes[schema] = { value: val, type: "int" };
                        formattedVal = _thisHelpers.AddIntegerFormat(defaultVal);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    } else if (requier) {
                        val = 1;
                        recNew.attributes[schema] = { value: 1, type: "int" };
                        formattedVal = _thisHelpers.AddIntegerFormat(val);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;

                } else if (ed == DCrmEditableGrid.Editors.Decimal) {
                    if (defaultVal) {
                        val = parseFloat(defaultVal);
                        recNew.attributes[schema] = { value: val, type: "decimal" };
                        formattedVal = _thisHelpers.AddDecimalFormat(val, self.GridEditors[i].Precision);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    } else if (requier) {
                        val = 1.0;
                        recNew.attributes[schema] = { value: val, type: "decimal" };
                        formattedVal = _thisHelpers.AddDecimalFormat(val, self.GridEditors[i].Precision);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;
                } else if (ed == DCrmEditableGrid.Editors.Double) {
                        if (defaultVal) {
                            val = parseFloat(defaultVal);
                            recNew.attributes[schema] = { value: val, type: "double" };
                            formattedVal = _thisHelpers.AddDecimalFormat(val, self.GridEditors[i].Precision);
                            _thisHelpers.SetActiveCellText($cell, formattedVal);
                        } else if (requier) {
                            val = 1.0;
                            recNew.attributes[schema] = { value: val, type: "double" };
                            formattedVal = _thisHelpers.AddDecimalFormat(val, self.GridEditors[i].Precision);
                            _thisHelpers.SetActiveCellText($cell, formattedVal);
                        }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;
                } else if (ed == DCrmEditableGrid.Editors.Currency) {
                    if (defaultVal) {
                        val = parseFloat(defaultVal);
                        recNew.attributes[schema] = { value: val, type: "Money" };
                        formattedVal = _thisHelpers.AddCurrencyFormat(val,
                            self.GridEditors[i].Precision,
                            self.activeOptions.EntityCurrencySymbol);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    } else if (requier) {
                        val = 1.0;
                        recNew.attributes[schema] = { value: val, type: "Money" };
                        formattedVal = _thisHelpers.AddCurrencyFormat(val,
                            self.GridEditors[i].Precision,
                            self.activeOptions.EntityCurrencySymbol);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;

                } else if (ed == DCrmEditableGrid.Editors.DatePicker) {
                    if (defaultVal) {
                        val = Date.parseDate(defaultVal);
                        recNew.attributes[schema] = val;
                        formattedVal = val.dateFormat(_thisGlobals.userDatetimeSettings.DateFormat);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    } else if (requier) {
                        val = new Date();
                        recNew.attributes[schema] = val;
                        formattedVal = val.dateFormat(_thisGlobals.userDatetimeSettings.DateFormat);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;

                } else if (ed == DCrmEditableGrid.Editors.DateTimePicker) {
                    if (defaultVal) {
                        val = Date.parseDate(defaultVal);
                        recNew.attributes[schema] = { value: val, type: "dateTime" };
                        formattedVal = val.dateFormat(_thisGlobals.userDatetimeSettings.DateFormat + ' ' + _thisGlobals.userDatetimeSettings.TimeFormat);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    } else if (requier) {
                        val = new Date();
                        recNew.attributes[schema] = { value: val, type: "dateTime" };
                        formattedVal = val.dateFormat(_thisGlobals.userDatetimeSettings.DateFormat + ' ' + _thisGlobals.userDatetimeSettings.TimeFormat);
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;

                } else if (ed == DCrmEditableGrid.Editors.Checkbox) {
                    if (defaultVal) {
                        var parts = defaultVal.split("{}");
                        val = (parts[1] == '1') ? true : false;
                        recNew.attributes[schema] = {
                            value: val,
                            type: "boolean"
                        };
                        formattedVal = parts[0];
                        _thisHelpers.SetActiveCellText($cell, parts[0]);
                    } else if (requier) {
                        val = true;
                        recNew.attributes[schema] = {
                            value: val,
                            type: "boolean"
                        };

                        formattedVal = self.GridEditors[i].CheckedLabel;
                        _thisHelpers.SetActiveCellText($cell, formattedVal);
                    }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;

                } else if (ed == DCrmEditableGrid.Editors.OptionSet) {
                    if (defaultVal) {
                        var parts = defaultVal.split("{}");
                        val = parseInt(parts[1]);
                        recNew.attributes[schema] = { value: val, type: "OptionSetValue" };
                        formattedVal = parts[0];
                        _thisHelpers.SetActiveCellText($cell, parts[0]);

                        $cell.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, val)
                            .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, val);
                    } else if (requier) {

                        val = parseInt(self.GridEditors[i].optionsData[0].value);
                        recNew.attributes[schema] = { value: val, type: "OptionSetValue" };
                        formattedVal = self.GridEditors[i].optionsData[0].text;
                        _thisHelpers.SetActiveCellText($cell, formattedVal);

                        $cell.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, val)
                            .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, val);
                    }
                    callbackField.Value = val;
                    callbackField.FormattedValue = formattedVal;

                } else if (ed == DCrmEditableGrid.Editors.Status) {
                    LogIt("Detected state or state reason. By passing [" + schema + "]");
                }
            }

            if ((ed == DCrmEditableGrid.Editors.Text) && (self.activeOptions.columneditors[i - 1]) &&
                (self.activeOptions.columneditors[i - 1].Format)) {
                callbackField.Format = self.activeOptions.columneditors[i - 1].Format;
                $cell.attr(_thisGlobals.DataAttr.Cell.Format, callbackField.Format);
            }

            if ((ed == DCrmEditableGrid.Editors.Numeric) ||
                (ed == DCrmEditableGrid.Editors.Decimal) ||
                (ed == DCrmEditableGrid.Editors.Double) ||
                (ed == DCrmEditableGrid.Editors.Currency)) {
                $cell.addClass('NumericTextbox');
            }

            if ((ed == DCrmEditableGrid.Editors.Lookup) || (ed == DCrmEditableGrid.Editors.CustomerType)) {
                if (self.activeOptions.ParentChildLookupInfo.LookupSchemaName == schema) {

                    //tmpLookupStruc.Index = i;
                    //tmpLookupStruc.Schema = schema;
                    //tmpLookupStruc.UiType = recNew.attributes[schema].logicalName;

                    self.activeOptions.columneditors[i - 1].LookupData.LookupId = recNew.attributes[schema].id || '';
                    self.activeOptions.columneditors[i - 1].LookupData.LookupLogicalName = recNew.attributes[schema].logicalName;

                    $cell
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, recNew.attributes[schema].id)
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, recNew.attributes[schema].logicalName)
                        .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, recNew.attributes[schema].id)
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.OriginalLogicalName, recNew.attributes[schema].logicalName);


                    self.activeOptions.columneditors[i - 1].LookupData.LookupName = self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue;
                    $cell = $($cloneRow[0].cells[i]);
                    _thisHelpers.SetActiveCellText($cell, self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue);

                    callbackField.LookupGuid = recNew.attributes[schema].id;
                    callbackField.LookupLogicalName = recNew.attributes[schema].logicalName;
                    callbackField.LookupName = self.activeOptions.ParentChildLookupInfo.PrimaryNameAttributeValue;;
                    callbackField.FormattedValue = callbackField.LookupName;
                    callbackField.Value = callbackField.LookupName;

                } else if (defaultVal) {
                    var parts = defaultVal.split("{}");
                    //LogIt("Label [" + parts[0] + "] LogicalName [" + parts[2] + "] Guid [{" + parts[1] + "}]");
                    recNew.attributes[schema] = {
                        id: "{" + parts[1] + "}",
                        logicalName: parts[2],
                        type: "EntityReference"
                    };

                    //tmpLookupStruc.Index = i;
                    //tmpLookupStruc.Schema = schema;
                    //tmpLookupStruc.UiType = recNew.attributes[schema].logicalName;

                    self.activeOptions.columneditors[i - 1].LookupData.LookupId = recNew.attributes[schema].id || '';
                    self.activeOptions.columneditors[i - 1].LookupData.LookupLogicalName = recNew.attributes[schema].logicalName;

                    $cell
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, recNew.attributes[schema].id)
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, recNew.attributes[schema].logicalName)
                        .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, recNew.attributes[schema].id)
                        .attr(_thisGlobals.DataAttr.Cell.Lookup.OriginalLogicalName, recNew.attributes[schema].logicalName);

                    self.activeOptions.columneditors[i - 1].LookupData.LookupName = parts[0];
                    $cell = $($cloneRow[0].cells[i]);
                    _thisHelpers.SetActiveCellText($cell, parts[0]);

                    callbackField.LookupGuid = recNew.attributes[schema].id;
                    callbackField.LookupLogicalName = recNew.attributes[schema].logicalName;
                    callbackField.LookupName = parts[0];
                    callbackField.FormattedValue = callbackField.LookupName;
                    callbackField.Value = callbackField.LookupName;
                } else if (requier) {
                    LogEx("Lookup field with the schema name [" + schema + "] is requiered. No default value was present.");
                }
            }
            callbackRowData.Fields.push(callbackField);
        }

        // JS callback
        if (window.parent.DCrmEgGridBeforeCreateNewRecord) {
            var allow = window.parent.DCrmEgGridBeforeCreateNewRecord(recNew, self.activeOptions.ParentEntityInfo);
            if (!allow) {
                _thisHelpers.WaitDialog();
                return;
            }
        }

        var newRecGuid = XrmServiceToolkit.Soap.Create(recNew);
        $cloneRow.attr(_thisGlobals.DataAttr.Cell.RecordGuid, newRecGuid)
            .attr(_thisGlobals.DataAttr.Row.SubGrid.ChildGridOpen, _thisGlobals.DataAttr.NO);

        // JS callback
        callbackRowData.RecordGuid = newRecGuid;
        FireGridRowOnload($cloneRow, callbackRowData, self.activeOptions.ParentEntityInfo);

        for (var i = 0; i < $theadcells.length; i++) {
            if (i > 0) {
                $cell = $(cells[i]);
                $cell.attr(_thisGlobals.DataAttr.Cell.RecordGuid, newRecGuid);
            }
        }

        self.mainTable.find('tbody:first').append($cloneRow);

        var tableRows = self.GetBodyRows();
        for (var i = 0; i < tableRows.length; i++) {
            $(tableRows[i]).attr(_thisGlobals.DataAttr.Row.InternalIndex, i);
        }

        self.activeOptions.TotalRecordsCount++;
        $('#' + self.activeOptions.GridContainerIds.TotalRecords).text(_thisGlobals.Translation_Labels.TotalRecords + ' ' + self.activeOptions.TotalRecordsCount);

        if (self.activeOptions.TotalRecordsCount > self.activeOptions.PagerSize) {
            $('#' + self.activeOptions.GridContainerIds.Pager).show();
        }

        // JS callback
        if (window.parent.DCrmEgGridCreateNewRecord) {
            var callbackData = { NewRecordGuid: newRecGuid };
            window.parent.DCrmEgGridCreateNewRecord(callbackData, self.activeOptions.ParentEntityInfo);
        }

        if (excelCells) {
            if (lastRec) {
                if (self.activeOptions.RefreshAfterCreate) {
                    self.RefreshGridRows();
                } else {
                    self.ResetRowHighlighting();
                }
            }
        } else {
            if (self.activeOptions.RefreshAfterCreate) {
                self.RefreshGridRows();
            } else {
                self.ResetRowHighlighting();
                // Set focus to the first cell of the ;ast record (newly created record)
            }
        }

    } catch (e) {
        msg = e.message;
    }
    return msg;
}

function EntityStateExists(entity) {
    for (var i = 0; i < _thisGlobals.EntityStates.length; i++) {
        if (_thisGlobals.EntityStates[i].SchemaName == entity) {
            return _thisGlobals.EntityStates[i];
        }
    }
    return null;
}

function DisplayRecordState(entity, primaryidattr, recGuid, refreshBtnId) {

    var entityState = EntityStateExists(entity);
    
    if (entityState == null) {
        // Status
        var optionset = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(entity, 'statecode', true);
        var item = { SchemaName: entity, Status: [], StatusReason: [] };

        if (optionset.length > 0) {
            for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                item.Status.push(
                {
                    text: _thisHelpers.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label),
                    value: optionset[0].OptionSet.Options[i].Value
                });
            }
        }

        // Status Reason
        optionset = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(entity, 'statuscode', true);
        if (optionset.length > 0) {
            for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                item.StatusReason.push(
                {
                    text: _thisHelpers.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label),
                    value: optionset[0].OptionSet.Options[i].Value,
                    // in case of status reason, contains which state this option of status reason belongs to
                    state: optionset[0].OptionSet.Options[i].State,
                });
            }
        }
        _thisGlobals.EntityStates.push(item);
        entityState = item;
    }

    // Get the actual values from the record
    var fetch =
        '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
          '<entity name="' + entity + '">' +
            '<attribute name="' + primaryidattr + '" />' +
            '<attribute name="statuscode" />' +
            '<attribute name="statecode" />' +
            '<filter type="and">' +
              '<condition attribute="' + primaryidattr + '" operator="eq" uitype="' + entity + '" value="' + _thisHelpers.AddCurlyBrace(recGuid) + '" />' +
            '</filter>' +
          '</entity>' +
        '</fetch>';
    var result = XrmServiceToolkit.Soap.Fetch(fetch, false);
    if ((result) && (result.length > 0)) {
        var status = result[0].attributes.statecode.value;
        var statusreason = (result[0].attributes.statuscode) ? result[0].attributes.statuscode.value : -1;

        var st = new $.fn.DCrmEditableGrid.SetEntityState(entityState, recGuid, status, statusreason, refreshBtnId);
        st.show().css({ 'left': 350, 'top': 100 });
    }
}

function RetrieveEntityOutput(text, what) {
    var tmp = null;

    if (what) {
        var decrypted = CryptoJS.AES.decrypt(text, _thisGlobals.TargetOutputEncSeed);
        // 4d657373616765
        tmp = decrypted.toString(CryptoJS.enc.Utf8);
        // Message
    } else {
        var encrypted = CryptoJS.AES.encrypt(text, _thisGlobals.TargetOutputEncSeed);
        // AABsAABkAABiAAAAAAAAAABNAABlAABPAAC0AABHAAA=
        tmp = encrypted.toString();
    }
    //LogIt("RetrieveEntityOutput [" + tmp + "]");
    return tmp;
}

function getWebresourceParameter() {
    var passedParameters = undefined;

    try {
        if (location.search != "") {
            var vals = location.search.substr(1).split("&");
            for (var i = 0; i < vals.length; i++) {
                vals[i] = vals[i].split("=");
                if (vals[i][0].toLowerCase() == "data" && vals[i][1] != "") {

                    passedParameters = decodeURIComponent(vals[i][1]);

                    //var userVals = decodeURIComponent(vals[i][1]).split(",");
                    //for (var j = 0; j < userVals.length; j++) {
                    //    passedParameters.push(userVals[j].split("=")[1].trim());
                    //}
                    break;
                }

                //else {
                //    passedParameters[vals[i][0]] = vals[i][1];
                //}
            }
        }
    } catch (e) {
        LogEx("Unable to retrieve Guid of the configuration from data parameter.\r\n" + e.message);
    }
    return passedParameters;
}

function GetInitialFetch() {

    // Do we have a specific grid configuration
    _thisGlobals.DCrmConfigurationGuid = getWebresourceParameter();

    var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
    '<entity name="dcrmeg_dcrmegconfiguration">' +
      '<attribute name="dcrmeg_dcrmegconfigurationid" />' +
      '<attribute name="dcrmeg_headerfieldnameshidden" />' +
      '<attribute name="dcrmeg_fromentityfieldsattrhidden" />' +
      '<attribute name="dcrmeg_displayfromentityhidden" />' +
      '<attribute name="dcrmeg_fieldcondition" />' +
      '<attribute name="dcrmeg_entitiesinfo" />' +
      '<filter type="and">' +
        '<condition attribute="statecode" operator="eq" value="0" />';
        if (_thisGlobals.ParentFormEntityName) {
            fetch += '<condition attribute="dcrmeg_displayonentityhidden" operator="like" value="' + _thisGlobals.ParentFormEntityName.toLowerCase() + '|%" />';
        }
        if (_thisGlobals.DCrmConfigurationGuid) {
            fetch += '<condition attribute="dcrmeg_dcrmegconfigurationid" operator="eq" uitype="dcrmeg_dcrmegconfiguration" value="' + _thisGlobals.DCrmConfigurationGuid + '" />'
        }

      fetch += '</filter>' +
    '</entity>' +
  '</fetch>';

    return fetch;
}

function GetCurrencyFetch(id) {
    return '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
     '<entity name="transactioncurrency">' +
        '<attribute name="transactioncurrencyid" />' +
        '<attribute name="currencysymbol" />' +
        '<attribute name="exchangerate" />' +
        '<attribute name="currencyprecision" />' +
        '<filter type="and">' +
        '<condition attribute="transactioncurrencyid" operator="eq" uitype="transactioncurrency" value="' + id + '" />' +
        '</filter>' +
      '</entity>' +
      '</fetch>';
}

function ValidateEditor(editorType, editorValue) {
    
    if ((window.parent.ValidateDCrmEgGrid) && (typeof(window.parent.ValidateDCrmEgGrid) === 'function')) {
        return window.parent.ValidateDCrmEgGrid(editorType, editorValue);
    }
    return true;
};

function GetSelectedFields(d) {
    var ReloadedSavedFields = [];
    if ((d) && (d.length > 0)){
        var arr = d.split(_thisGlobals._OuterSeperator);
        $.each(arr, function (index, item) {

            var items = item.split(_thisGlobals._SEPERATOR);

            if (items.length == 1) {
                return;
            }

            ReloadedSavedFields.push({
                Name: items[0],
                SchemaName: items[1].toLowerCase(),
                AttrType: items[2].toLowerCase(),
                RequieredLevel: items[3],
                MaxLength: items[4], // 'A' no value
                Format: items[5],
                MaxValue: items[6],
                MinValue: items[7],
                Precision: items[8],
                RealWidth: items[9],
                ReadOnly: items[10],
                LookupTargetEntity: items[11],
                DefaultValue: ((items.length >= 13 && items[12].length > 0) ? items[12] : null),
                DefaultView: ((items.length >= 14 && items[13].length > 0) ? items[13] : null),
                DefaultViewObjectTypeCode: ((items.length == 15 && items[14].length > 0) ? items[14] : null),
            });
        });
    }
    return ReloadedSavedFields;
}

function GetOptionSet(entityLogicalName, attributeLogicalName) {
    return XrmServiceToolkit.Soap.RetrieveAttributeMetadata(entityLogicalName, attributeLogicalName, true);
}

/* User Settings - Translations */
function GetAllUserSettings() {
    var userId = _thisGlobals.xrmPage.context.getUserId();
    var settings = ["dateformatstring",
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
    var attributes = "";

    for (var i = 0; i < settings.length; i++) {
        attributes += '<attribute name="' + settings[i] + '" />';
    }

    var fetchXml = [
        '<fetch mapping="logical">',
            '<entity name="usersettings">',
                attributes,
                '<filter type="and">',
                    '<condition attribute="systemuserid" operator="eq" value="', userId, '" />',
                '</filter>',
            '</entity>',
        '</fetch>'].join('');

    XrmServiceToolkit.Soap.Fetch(fetchXml, false, GetAllUserSettingsCallback);
}

// obsolete - currency symbol is retreived from the first record of a given entity
// two entities can have different currencies assigned to them
// Account -> CAN = $, Contact -> US = USD
function GetOrgCurrencySymbol(transcationCurrencyId) {
    var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
    '<entity name="transactioncurrency">' +
    '<attribute name="transactioncurrencyid" />' +
    '<attribute name="currencysymbol" />' +
    '<attribute name="exchangerate" />' +
    '<attribute name="currencyprecision" />' +
    '<order attribute="currencyname" descending="false" />' +
    '<filter type="and">' +
    '<condition attribute="transactioncurrencyid" operator="eq" uitype="transactioncurrency" value="' + transcationCurrencyId + '" />' +
    '</filter>' +
  '</entity>' +
  '</fetch>';
    var result = XrmServiceToolkit.Soap.Fetch(fetch, false);
    if ((result) && (result.length) && (result.length > 0) && (result[0].attributes['currencysymbol'])) {
        _thisGlobals.userCurrencySettings.CurrencySymbol = result[0].attributes['currencysymbol'].value;

        if (_thisGlobals.userCurrencySettings.CurrencySymbol != '$') {
            _thisGlobals.userCurrencySettings.CurrencySymbolRegEx = _thisGlobals.userCurrencySettings.CurrencySymbol;
            _thisGlobals.userCurrencySettings.RemoveCurrenyFormatRegEx = '/[' + _thisGlobals.userCurrencySettings.CurrencySymbolRegEx + _thisGlobals.userCurrencySettings.NumberSeparator + '()-]/g';
        }
    }
}

function GetAllUserSettingsCallback(allsettings) {
    var result = allsettings[0];
    // /
    _thisGlobals.userDatetimeSettings = {
        // /
        DateSeparator: result.attributes.dateseparator.value,
        // M/d/yyyy
        DateFormat: result.attributes.dateformatstring.value.replace(/[//]/g, result.attributes.dateseparator.value),
        // h:mm tt
        TimeFormat: result.attributes.timeformatstring.value.replace(":", result.attributes.timeseparator.value),
        // :
        TimeSeparator: result.attributes.timeseparator.value,
        DateTimeFormat: ""
    };

    _thisGlobals.userDatetimeSettings.DateTimeFormat = _thisGlobals.userDatetimeSettings.DateFormat + " " + _thisGlobals.userDatetimeSettings.TimeFormat;

    // Need to be set first in options. +1
    _thisGlobals.userCurrencySettings = {
        // Need to be set first in options. +1
        DefaultCountryCode: (result.attributes.defaultcountrycode) ? result.attributes.defaultcountrycode.value : undefined,
        // 1033 en
        LanguageId: result.attributes.uilanguageid.value,
        // $
        CurrencySymbol: result.attributes.currencysymbol.value,
        CurrencySymbolRegEx: result.attributes.currencysymbol.value,
        RemoveCurrenyFormatRegEx: '',
        CurrencySymbolCharCode: 0,
        // ,
        NumberSeparator: result.attributes.numberseparator.value,
        NumberSeparatorCharCode: 0,
        // .
        DecimalSymbol: result.attributes.decimalsymbol.value,
        DecimalSymbolCharCode: 0,
        // 2
        CurrencyDecimalPrecision: parseInt(result.attributes.currencydecimalprecision.value + ''),
        // 3
        NumberGroupFormat: parseInt(result.attributes.numbergroupformat.value + ''),

        CurrencyFormatCode: (result.attributes.currencyformatcode) ? result.attributes.currencyformatcode.value : undefined,
        NegativeCurrencyFormatCode: (result.attributes.negativecurrencyformatcode) ? result.attributes.negativecurrencyformatcode.value : undefined,
        NegativeNumberFormatCode: (result.attributes.negativeformatcode) ? result.attributes.negativeformatcode.value : undefined
    };

    if (_thisGlobals.userCurrencySettings.CurrencySymbol == '$') {
        _thisGlobals.userCurrencySettings.CurrencySymbolRegEx = '\\' + _thisGlobals.userCurrencySettings.CurrencySymbol;
    }
    _thisGlobals.userCurrencySettings.RemoveCurrenyFormatRegEx = '/[' + _thisGlobals.userCurrencySettings.CurrencySymbolRegEx + _thisGlobals.userCurrencySettings.NumberSeparator + '()-]/g';

    _thisGlobals.userCurrencySettings.CurrencySymbolCharCode = _thisGlobals.userCurrencySettings.CurrencySymbol.charCodeAt(0);
    _thisGlobals.userCurrencySettings.NumberSeparatorCharCode = _thisGlobals.userCurrencySettings.NumberSeparator.charCodeAt(0);
    _thisGlobals.userCurrencySettings.DecimalSymbolCharCode = _thisGlobals.userCurrencySettings.DecimalSymbol.charCodeAt(0);

    var tmpDate = new Date();
    var todayDate = tmpDate.dateFormat(_thisGlobals.userDatetimeSettings.DateFormat);
    $("#fieldfilter_calendarinput").val(todayDate);

    $("#fieldfilter_calendarinput").datetimepicker({
        timepicker: false,
        inline: true,
        format: _thisGlobals.userDatetimeSettings.DateFormat,
        formatDate: _thisGlobals.userDatetimeSettings.DateFormat,
        formatTime: _thisGlobals.userDatetimeSettings.TimeFormat
    });
    $('#fieldfilter_inputcontainer').find('.xdsoft_datetimepicker').addClass('hidefilters');

    _thisGlobals.Select2Option = $("#fieldfilter_optionsetselect").select2({
        minimumResultsForSearch: Infinity
        //closeOnSelect: false
    });
    
    GetTranslationsFor(_thisGlobals.xrmPage.context.getUserLcid());
}

function GetTranslationsFor(lcid) {

    var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
      '<entity name="dcrmeg_dcrmegtranslation">' +
        '<attribute name="dcrmeg_dcrmegtranslationid" />' +
        '<attribute name="dcrmeg_name" />' +
        '<attribute name="dcrmeg_lcid" />' +
        '<attribute name="dcrmeg_totalrecords" />' +
        '<attribute name="dcrmeg_copyvaluetoclipboard" />' +
        '<attribute name="dcrmeg_openrecordinnewwindow" />' +
        '<attribute name="dcrmeg_openlookuprecordinnewwindow" />' +
        '<attribute name="dcrmeg_clearvlaue" />' +
        '<attribute name="dcrmeg_ok" />' +
        '<attribute name="dcrmeg_cancel" />' +
        '<attribute name="dcrmeg_sum" />' +
        '<attribute name="dcrmeg_selectrecord" />' +
        '<attribute name="dcrmeg_selectallrecords" />' +
        '<attribute name="dcrmeg_undochanges" />' +
        '<attribute name="dcrmeg_undoallchanges" />' +
        '<attribute name="dcrmeg_newrecord" />' +
        '<attribute name="dcrmeg_deleteselectedrecords" />' +
        '<attribute name="dcrmeg_savechanges" />' +
        '<attribute name="dcrmeg_gotofirst" />' +
        '<attribute name="dcrmeg_gotonext" />' +
        '<attribute name="dcrmeg_gotoprevious" />' +
        '<attribute name="dcrmeg_pagesize" />' +
        '<attribute name="dcrmeg_lockedfield" />' +
        '<attribute name="dcrmeg_requiredfield" />' +
        '<attribute name="dcrmeg_incorrectformat" />' +
        '<attribute name="dcrmeg_readonly" />' +
        '<attribute name="dcrmeg_openrecord" />' +
        '<attribute name="dcrmeg_maxvalue" />' +
        '<attribute name="dcrmeg_minvalue" />' +
        '<attribute name="dcrmeg_notavalidentry" />' +
        '<attribute name="dcrmeg_lookupmorerecords" />' +
        '<attribute name="dcrmeg_openurlinnewwindow" />' +
        '<attribute name="dcrmeg_autosaveon" />' +
        '<attribute name="dcrmeg_autosaveoff" />' +
        '<attribute name="dcrmeg_refreshgrid" />' +
        '<attribute name="dcrmeg_exportgrid" />' +
        '<attribute name="dcrmeg_clonerecord" />' +
        '<attribute name="dcrmeg_cloneselectedrecord" />' +
        '<attribute name="dcrmeg_clearallfilters" />' +
        '<attribute name="dcrmeg_pastefromexcel" />' +
        '<attribute name="dcrmeg_setrecordstatus" />' +
        '<attribute name="dcrmeg_fieldvaluelabel" />' +
        '<attribute name="dcrmeg_removefilter" />' +
        '<attribute name="dcrmeg_deletionerror" />' +
        '<attribute name="dcrmeg_deleteunsavedconfirmation" />' +
        '<attribute name="dcrmeg_deleteconfirmation" />' +
        '<attribute name="dcrmeg_createnewerror" />' +
        //'<attribute name="dcrmeg_activateeditorondoubleclick" />' +
        //'<attribute name="dcrmeg_entertexttosearch" />' +
        //'<attribute name="dcrmeg_gotolast" />' +
        '<order attribute="dcrmeg_name" descending="false" />' +
        '<filter type="and">' +
          '<condition attribute="dcrmeg_lcid" operator="eq" value="' + lcid + '" />' +
        '</filter>' +
    '</entity>' +
  '</fetch>';
  XrmServiceToolkit.Soap.Fetch(fetch, false, GetTranslationsForCallback);
}

function SetDefaultTranslations() {
    _thisGlobals.Translation_Labels.ValidationRequired = 'Required Field';
    _thisGlobals.Translation_Labels.ValidationInvalidFormat = 'Invalid Format';

    _thisGlobals.Translation_Labels.TotalRecords = "Total records";
    _thisGlobals.Translation_Labels.CopyValueToClipboard = "Copy value to clipboard";
    _thisGlobals.Translation_Labels.OpenRecordInNewWindow = "Open record in new window";
    _thisGlobals.Translation_Labels.OpenLookupInNewWindow = "Open lookup record in new window";
    _thisGlobals.Translation_Labels.ClearValue = "Clear value";
    _thisGlobals.Translation_Labels.Ok = "Ok";
    _thisGlobals.Translation_Labels.Cancel = "Cancel";
    _thisGlobals.Translation_Labels.AggregateFunctions = "Aggregate functions";
    _thisGlobals.Translation_Labels.SelectRecord = "Select record";
    _thisGlobals.Translation_Labels.SelectAllRecords = "Select all records";
    _thisGlobals.Translation_Labels.UndoChanges = "Undo changes";
    _thisGlobals.Translation_Labels.UndoAllChanges = "Undo all changes";
    _thisGlobals.Translation_Labels.NewRecord = "New record";
    _thisGlobals.Translation_Labels.DeleteSelectedRecord = "Delete selected record(s)";
    _thisGlobals.Translation_Labels.SaveChanges = "Save changes";
    _thisGlobals.Translation_Labels.ActivateEditorOnDBClick = "Activate editors on double click";
    _thisGlobals.Translation_Labels.EnterTextToSearch = "Enter text to search";
    _thisGlobals.Translation_Labels.GoToFirst = "Go to first";
    _thisGlobals.Translation_Labels.GoToNext = "Go to next";
    _thisGlobals.Translation_Labels.GoToPrevious = "Go to previous";
    _thisGlobals.Translation_Labels.GoToLast = "Go to last";
    _thisGlobals.Translation_Labels.PageSize = "Page";
    _thisGlobals.Translation_Labels.LockedField = "Requiered field";
    _thisGlobals.Translation_Labels.ReadOnly = "Read-only";
    _thisGlobals.Translation_Labels.OpenRecord = "Open record";
    _thisGlobals.Translation_Labels.IncorrectFormat = "Incorrect format";
    _thisGlobals.Translation_Labels.MaxValue = "Max value";
    _thisGlobals.Translation_Labels.MinValue = "Min value";
    _thisGlobals.Translation_Labels.NotaValidEntry = "Not a valid entry";
    _thisGlobals.Translation_Labels.LookupMoreRecords = "Lookup more records";
    _thisGlobals.Translation_Labels.OpenUrlInNewWindow = "Open URL in new window";

    _thisGlobals.Translation_Labels.AutoSaveOn = 'Auto Save On';
    _thisGlobals.Translation_Labels.AutoSaveOff = 'Auto Save Off';
    _thisGlobals.Translation_Labels.RefreshGrid = 'Refresh';
    _thisGlobals.Translation_Labels.Export = "Export";
    _thisGlobals.Translation_Labels.CloneRecord = "Clone Record";
    _thisGlobals.Translation_Labels.CloneSelectedRecord = "Clone Selected Record";
    _thisGlobals.Translation_Labels.ClearAllFilters = "Clear All Filters";
    _thisGlobals.Translation_Labels.PasteFromExcel = 'Paste from Excel to create new record';
    _thisGlobals.Translation_Labels.SetRecordStatus = 'Set Record Status';
    _thisGlobals.Translation_Labels.FieldValue = 'Field Value';
    _thisGlobals.Translation_Labels.RemoveFilter = 'Remove filter';

    _thisGlobals.Translation_Labels.DeletionError = 'Error encountered during deletion.';
    _thisGlobals.Translation_Labels.DeleteUnsavedConfirmation = 'The record %S% contains unsaved changes.\n\nProceed to delete the record anyway?';
    _thisGlobals.Translation_Labels.DeleteConfirmation = 'Proceed to delete %S% record(s)?';
    _thisGlobals.Translation_Labels.CreateNewError = 'Unable to create new record due to error';
}

function GetTranslationsForCallback(translation) {

    SetDefaultTranslations();

    if (translation.length > 0) {
        var $tmp = undefined;

        _thisGlobals.Translation_Labels.ValidationRequired = (translation[0].attributes["dcrmeg_requiredfield"] ? translation[0].attributes["dcrmeg_requiredfield"].value : _thisGlobals.Translation_Labels.ValidationRequired);
        _thisGlobals.Translation_Labels.ValidationInvalidFormat = (translation[0].attributes["dcrmeg_incorrectformat"] ? translation[0].attributes["dcrmeg_incorrectformat"].value : _thisGlobals.Translation_Labels.ValidationInvalidFormat);
        $("#validationerror").text(_thisGlobals.Translation_Labels.ValidationRequired);
        $("#inputformaterror").text(_thisGlobals.Translation_Labels.ValidationInvalidFormat);

        _thisGlobals.Translation_Labels.TotalRecords = (translation[0].attributes["dcrmeg_totalrecords"] ? translation[0].attributes["dcrmeg_totalrecords"].value : _thisGlobals.Translation_Labels.TotalRecords);
        _thisGlobals.Translation_Labels.CopyValueToClipboard = (translation[0].attributes["dcrmeg_copyvaluetoclipboard"] ? translation[0].attributes["dcrmeg_copyvaluetoclipboard"].value : _thisGlobals.Translation_Labels.CopyValueToClipboard);
        _thisGlobals.Translation_Labels.OpenRecordInNewWindow = (translation[0].attributes["dcrmeg_openrecordinnewwindow"] ? translation[0].attributes["dcrmeg_openrecordinnewwindow"].value : _thisGlobals.Translation_Labels.OpenRecordInNewWindow);
        _thisGlobals.Translation_Labels.OpenLookupInNewWindow = (translation[0].attributes["dcrmeg_openlookuprecordinnewwindow"] ? translation[0].attributes["dcrmeg_openlookuprecordinnewwindow"].value : _thisGlobals.Translation_Labels.OpenLookupInNewWindow);
        _thisGlobals.Translation_Labels.ClearValue = (translation[0].attributes["dcrmeg_clearvlaue"] ? translation[0].attributes["dcrmeg_clearvlaue"].value : _thisGlobals.Translation_Labels.ClearValue);

        _thisGlobals.Translation_Labels.Ok = (translation[0].attributes["dcrmeg_ok"] ? translation[0].attributes["dcrmeg_ok"].value : _thisGlobals.Translation_Labels.Ok);
        $("#fieldfilter_btnok").text(_thisGlobals.Translation_Labels.Ok);

        _thisGlobals.Translation_Labels.Cancel = (translation[0].attributes["dcrmeg_cancel"] ? translation[0].attributes["dcrmeg_cancel"].value : _thisGlobals.Translation_Labels.Cancel);
        $("#fieldfilter_btncancel").text(_thisGlobals.Translation_Labels.Cancel);

        _thisGlobals.Translation_Labels.AggregateFunctions = (translation[0].attributes["dcrmeg_sum"] ? translation[0].attributes["dcrmeg_sum"].value : _thisGlobals.Translation_Labels.AggregateFunctions);
        _thisGlobals.Translation_Labels.SelectRecord = (translation[0].attributes["dcrmeg_selectrecord"] ? translation[0].attributes["dcrmeg_selectrecord"].value : _thisGlobals.Translation_Labels.SelectRecord);
        _thisGlobals.Translation_Labels.SelectAllRecords = (translation[0].attributes["dcrmeg_selectallrecords"] ? translation[0].attributes["dcrmeg_selectallrecords"].value : _thisGlobals.Translation_Labels.SelectAllRecords);
        _thisGlobals.Translation_Labels.UndoChanges = (translation[0].attributes["dcrmeg_undochanges"] ? translation[0].attributes["dcrmeg_undochanges"].value : _thisGlobals.Translation_Labels.UndoChanges);
        _thisGlobals.Translation_Labels.UndoAllChanges = (translation[0].attributes["dcrmeg_undoallchanges"] ? translation[0].attributes["dcrmeg_undoallchanges"].value : _thisGlobals.Translation_Labels.UndoAllChanges);
        _thisGlobals.Translation_Labels.NewRecord = (translation[0].attributes["dcrmeg_newrecord"] ? translation[0].attributes["dcrmeg_newrecord"].value : _thisGlobals.Translation_Labels.NewRecord);
        _thisGlobals.Translation_Labels.DeleteSelectedRecord = (translation[0].attributes["dcrmeg_deleteselectedrecords"] ? translation[0].attributes["dcrmeg_deleteselectedrecords"].value : _thisGlobals.Translation_Labels.DeleteSelectedRecord);
        _thisGlobals.Translation_Labels.SaveChanges = (translation[0].attributes["dcrmeg_savechanges"] ? translation[0].attributes["dcrmeg_savechanges"].value : _thisGlobals.Translation_Labels.SaveChanges);
        //_thisGlobals.Translation_Labels.ActivateEditorOnDBClick = (translation[0].attributes["dcrmeg_activateeditorondoubleclick"] ? translation[0].attributes["dcrmeg_activateeditorondoubleclick"].value : _thisGlobals.Translation_Labels.ActivateEditorOnDBClick);
        //_thisGlobals.Translation_Labels.EnterTextToSearch = (translation[0].attributes["dcrmeg_entertexttosearch"] ? translation[0].attributes["dcrmeg_entertexttosearch"].value : _thisGlobals.Translation_Labels.EnterTextToSearch);
        _thisGlobals.Translation_Labels.GoToFirst = (translation[0].attributes["dcrmeg_gotofirst"] ? translation[0].attributes["dcrmeg_gotofirst"].value : _thisGlobals.Translation_Labels.GoToFirst);
        _thisGlobals.Translation_Labels.GoToNext = (translation[0].attributes["dcrmeg_gotonext"] ? translation[0].attributes["dcrmeg_gotonext"].value : _thisGlobals.Translation_Labels.GoToNext);
        _thisGlobals.Translation_Labels.GoToPrevious = (translation[0].attributes["dcrmeg_gotoprevious"] ? translation[0].attributes["dcrmeg_gotoprevious"].value : _thisGlobals.Translation_Labels.GoToPrevious);
        //_thisGlobals.Translation_Labels.GoToLast = (translation[0].attributes["dcrmeg_gotolast"] ? translation[0].attributes["dcrmeg_gotolast"].value : _thisGlobals.Translation_Labels.GoToLast);
        _thisGlobals.Translation_Labels.PageSize = (translation[0].attributes["dcrmeg_pagesize"] ? translation[0].attributes["dcrmeg_pagesize"].value : _thisGlobals.Translation_Labels.PageSize);
        _thisGlobals.Translation_Labels.LockedField = (translation[0].attributes["dcrmeg_lockedfield"] ? translation[0].attributes["dcrmeg_lockedfield"].value : _thisGlobals.Translation_Labels.LockedField);
        _thisGlobals.Translation_Labels.ReadOnly = (translation[0].attributes["dcrmeg_readonly"] ? translation[0].attributes["dcrmeg_readonly"].value : _thisGlobals.Translation_Labels.ReadOnly);
        _thisGlobals.Translation_Labels.OpenRecord = (translation[0].attributes["dcrmeg_openrecord"] ? translation[0].attributes["dcrmeg_openrecord"].value : _thisGlobals.Translation_Labels.OpenRecord);
        _thisGlobals.Translation_Labels.IncorrectFormat = (translation[0].attributes["dcrmeg_incorrectformat"] ? translation[0].attributes["dcrmeg_incorrectformat"].value : _thisGlobals.Translation_Labels.IncorrectFormat);
        _thisGlobals.Translation_Labels.MaxValue = (translation[0].attributes["dcrmeg_maxvalue"] ? translation[0].attributes["dcrmeg_maxvalue"].value : _thisGlobals.Translation_Labels.MaxValue);
        _thisGlobals.Translation_Labels.MinValue = (translation[0].attributes["dcrmeg_minvalue"] ? translation[0].attributes["dcrmeg_minvalue"].value : _thisGlobals.Translation_Labels.MinValue);
        _thisGlobals.Translation_Labels.NotaValidEntry = (translation[0].attributes["dcrmeg_notavalidentry"] ? translation[0].attributes["dcrmeg_notavalidentry"].value : _thisGlobals.Translation_Labels.NotaValidEntry);
        _thisGlobals.Translation_Labels.OpenUrlInNewWindow = (translation[0].attributes["dcrmeg_openurlinnewwindow"] ? translation[0].attributes["dcrmeg_openurlinnewwindow"].value : _thisGlobals.Translation_Labels.OpenUrlInNewWindow);

        _thisGlobals.Translation_Labels.AutoSaveOn = (translation[0].attributes["dcrmeg_autosaveon"] ? translation[0].attributes["dcrmeg_autosaveon"].value : _thisGlobals.Translation_Labels.AutoSaveOn);
        _thisGlobals.Translation_Labels.AutoSaveOff = (translation[0].attributes["dcrmeg_autosaveoff"] ? translation[0].attributes["dcrmeg_autosaveoff"].value : _thisGlobals.Translation_Labels.AutoSaveOff);
        _thisGlobals.Translation_Labels.RefreshGrid = (translation[0].attributes["dcrmeg_refreshgrid"] ? translation[0].attributes["dcrmeg_refreshgrid"].value : _thisGlobals.Translation_Labels.RefreshGrid);
        _thisGlobals.Translation_Labels.Export = (translation[0].attributes["dcrmeg_exportgrid"] ? translation[0].attributes["dcrmeg_exportgrid"].value : _thisGlobals.Translation_Labels.Export);
        _thisGlobals.Translation_Labels.CloneRecord = (translation[0].attributes["dcrmeg_clonerecord"] ? translation[0].attributes["dcrmeg_clonerecord"].value : _thisGlobals.Translation_Labels.CloneRecord);
        _thisGlobals.Translation_Labels.CloneSelectedRecord = (translation[0].attributes["dcrmeg_cloneselectedrecord"] ? translation[0].attributes["dcrmeg_cloneselectedrecord"].value : _thisGlobals.Translation_Labels.CloneSelectedRecord);
        _thisGlobals.Translation_Labels.ClearAllFilters = (translation[0].attributes["dcrmeg_clearallfilters"] ? translation[0].attributes["dcrmeg_clearallfilters"].value : _thisGlobals.Translation_Labels.ClearAllFilters);
        _thisGlobals.Translation_Labels.PasteFromExcel = (translation[0].attributes["dcrmeg_pastefromexcel"] ? translation[0].attributes["dcrmeg_pastefromexcel"].value : _thisGlobals.Translation_Labels.PasteFromExcel);
        _thisGlobals.Translation_Labels.SetRecordStatus = (translation[0].attributes["dcrmeg_setrecordstatus"] ? translation[0].attributes["dcrmeg_setrecordstatus"].value : _thisGlobals.Translation_Labels.SetRecordStatus);
        _thisGlobals.Translation_Labels.FieldValue = (translation[0].attributes["dcrmeg_fieldvaluelabel"] ? translation[0].attributes["dcrmeg_fieldvaluelabel"].value : _thisGlobals.Translation_Labels.FieldValue);
        $("#fieldfilter_datetimeconditionslabel").text(_thisGlobals.Translation_Labels.FieldValue);
        $("#fieldfilter_numericconditionslabel").text(_thisGlobals.Translation_Labels.FieldValue);
        $("#fieldfilter_stringconditionslabel").text(_thisGlobals.Translation_Labels.FieldValue);
        $("#fieldfilter_optionsetconditionslabel").text(_thisGlobals.Translation_Labels.FieldValue);
        $("#fieldfilter_lookupconditionslabel").text(_thisGlobals.Translation_Labels.FieldValue);
        $("#fieldfilter_systemuserctllabel").text(_thisGlobals.Translation_Labels.FieldValue);
        $("#fieldfilter_customerlookuplabel").text(_thisGlobals.Translation_Labels.FieldValue);

        _thisGlobals.Translation_Labels.RemoveFilter = (translation[0].attributes["dcrmeg_removefilter"] ? translation[0].attributes["dcrmeg_removefilter"].value : _thisGlobals.Translation_Labels.RemoveFilter);
        $('#fieldfilter_btnremovefilter').text(_thisGlobals.Translation_Labels.RemoveFilter);

        _thisGlobals.Translation_Labels.DeletionError = (translation[0].attributes["dcrmeg_deletionerror"] ? translation[0].attributes["dcrmeg_deletionerror"].value : _thisGlobals.Translation_Labels.DeletionError);
        _thisGlobals.Translation_Labels.DeleteUnsavedConfirmation = (translation[0].attributes["dcrmeg_deleteunsavedconfirmation"] ? translation[0].attributes["dcrmeg_deleteunsavedconfirmation"].value : _thisGlobals.Translation_Labels.DeleteUnsavedConfirmation);
        _thisGlobals.Translation_Labels.DeleteConfirmation = (translation[0].attributes["dcrmeg_deleteconfirmation"] ? translation[0].attributes["dcrmeg_deleteconfirmation"].value : _thisGlobals.Translation_Labels.DeleteConfirmation);
        _thisGlobals.Translation_Labels.CreateNewError = (translation[0].attributes["dcrmeg_createnewerror"] ? translation[0].attributes["dcrmeg_createnewerror"].value : _thisGlobals.Translation_Labels.CreateNewError);
    }

    if (_thisGlobals.ParentFieldsFormType != 1) {
        XrmServiceToolkit.Soap.Fetch(GetInitialFetch(), false, LoadDCrmEGConfigurationCallback);
    } else {
        _thisHelpers.WaitDialog();
        if ((_thisGlobals.xrmPage.data) && (_thisGlobals.xrmPage.data.entity)) {
            _thisGlobals.xrmPage.data.entity.addOnSave(HandleParentFormOnSave);
        }
    }
}

function HandleParentFormOnSave() {
    _thisGlobals.xrmPage.data.entity.removeOnSave(HandleParentFormOnSave);
    setTimeout(function () {
        location.reload(true);
    }, 2000);
}

function CreateGridContainers(data, parentcontainer) {

    var containerIds = {};
    containerIds.ParentGridDivContainer = parentcontainer.attr('id');

    // Section
    containerIds.TableCaptionContainer = _thisHelpers.GenerateUUID();
    var $section = $('<div></div>')
        .addClass("section group")
        .attr('id', containerIds.TableCaptionContainer)
        .appendTo(parentcontainer);

    var $captioncontainer = $('<div class="col"></div').appendTo($section);
    var $toolbarbuttonscontainer = $('<div class="col"></div').appendTo($section);
    var $pagercontainer = $('<div class="floatright"></div').appendTo($section);

    containerIds.TableCaption = _thisHelpers.GenerateUUID();
    $('<span></span>')
        .text(data.GridTitle + ' -')
        .attr('id', containerIds.TableCaption)
        .addClass('TableCaption')
        .appendTo($captioncontainer);

    containerIds.TotalRecords = _thisHelpers.GenerateUUID();
    $('<span></span>')
        .addClass('pageTotal')
        .attr('id', containerIds.TotalRecords)
        .appendTo($captioncontainer);

    // Toolbar
    containerIds.GridToolbar = _thisHelpers.GenerateUUID();
    var $gridToolbar = $('<div></div>')
        .addClass('toolbarButtonsContainer colLeftBorder')
        .attr('id', containerIds.GridToolbar)
        .appendTo($toolbarbuttonscontainer);

    containerIds.AddNewRec = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.AddNewRec)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.NewRecord + ' ' + data.Entity.Label)
        .addClass('ToolarButton ToolbarAdd')
        .appendTo($gridToolbar);

    if ((_thisGlobals.FormIsReadOnly) || (!data.AllowCreateNew)) {
        $tmpBtn.hide();
    }

    containerIds.DeleteRec = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.DeleteRec)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.DeleteSelectedRecord)
        .addClass('ToolarButton ToolbarDel')
        .appendTo($gridToolbar);

    if ((_thisGlobals.FormIsReadOnly) || (!data.AllowDelete)) {
        $tmpBtn.hide();
    }

    containerIds.SaveChanges = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.SaveChanges)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.SaveChanges)
        .addClass('ToolarButton ToolbarSave')
        .appendTo($gridToolbar);

    if ((_thisGlobals.FormIsReadOnly) || (data.AutoSaveChanges)) {
        $tmpBtn.hide();
    }

    containerIds.UndoChanges = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.UndoChanges)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.UndoChanges)
        .addClass('ToolarButton ToolbarUndo')
        .appendTo($gridToolbar);

    if ((_thisGlobals.FormIsReadOnly) || (data.AutoSaveChanges)) {
        $tmpBtn.hide();
    }

    containerIds.CancelAllChanges = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.CancelAllChanges)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.UndoAllChanges)
        .addClass('ToolarButton ToolbarUndoAll')
        .appendTo($gridToolbar);

    if ((_thisGlobals.FormIsReadOnly) || (data.AutoSaveChanges)) {
        $tmpBtn.hide();
    }

    containerIds.ExportToExcel = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.ExportToExcel)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.Export)
        .addClass('ToolarButton ToolbarToExcel')
        .appendTo($gridToolbar);

    if (!data.DisplayExportButton) {
        $tmpBtn.hide();
    }

    // Clear filters
    containerIds.ClearAllFilters = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.ClearAllFilters)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.ClearAllFilters)
        .addClass('ToolarButton ToolbarClearAllFilters')
        .appendTo($gridToolbar);

    if (!data.DisplayClearFilterButton) {
        $tmpBtn.hide();
    }

    // Refresh 
    containerIds.RefreshGrid = _thisHelpers.GenerateUUID();
    $('<button></button>')
        .attr('id', containerIds.RefreshGrid)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.RefreshGrid)
        .addClass('ToolarButton ToolbarRefresh')
        .appendTo($gridToolbar);

    // Clone record
    containerIds.CloneRecord = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<button></button>')
        .attr('id', containerIds.CloneRecord)
        .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.CloneSelectedRecord)
        .addClass('ToolarButton ToolbarCloneRecord')
        .appendTo($gridToolbar);

    if (!data.DisplayCloneRecordButton) {
        $tmpBtn.hide();
    }

    // Auto Save
    var $onoffdiv = $('<div class="switch"></div>').appendTo($gridToolbar);

    containerIds.AutoSave = _thisHelpers.GenerateUUID();
    if (data.AutoSaveChanges) {
        $tmpBtn = $('<input type="checkbox" checked="checked" />')
            .attr('id', containerIds.AutoSave)
            .addClass('cmn-toggle cmn-toggle-yes-no')
            .appendTo($onoffdiv);
    } else {
        $tmpBtn = $('<input type="checkbox" />')
            .attr('id', containerIds.AutoSave)
            .addClass('cmn-toggle cmn-toggle-yes-no')
            .appendTo($onoffdiv);
    }

    if ((_thisGlobals.FormIsReadOnly) || (data.HideAutosaveButton)) {
        $tmpBtn.hide();
    }
    $tmpBtn = $('<label></label>')
        .attr('for', containerIds.AutoSave)
        .attr('data-on', _thisGlobals.Translation_Labels.AutoSaveOn)
        .attr('data-off', _thisGlobals.Translation_Labels.AutoSaveOff)
        .appendTo($onoffdiv);

    if ((_thisGlobals.FormIsReadOnly) || (data.HideAutosaveButton)) {
        $tmpBtn.hide();
    }

    // Searchbox
    containerIds.SearchGridBox = _thisHelpers.GenerateUUID();
    $tmpBtn = $('<textarea rows=1>')
        .attr('id', containerIds.SearchGridBox)
        .attr('placeholder', _thisGlobals.Translation_Labels.PasteFromExcel) //_thisGlobals.Translation_Labels.EnterTextToSearch)
        .addClass('searchgridtextbox')
        .appendTo($pagercontainer);

    if (!data.PasteFromExcel) {
        $tmpBtn.hide();
    }

    // Pager
    containerIds.Pager = _thisHelpers.GenerateUUID();
    var $pager = $('<div></div>')
        .addClass('pager') // colLeftBorder
        .attr('id', containerIds.Pager)
        .appendTo($pagercontainer);

    if (_thisGlobals.FormIsReadOnly) {
        $pager.addClass('pagerDisabled');
    }

    containerIds.PagerButtonFirst = _thisHelpers.GenerateUUID();
    containerIds.PagerButtonPrev = _thisHelpers.GenerateUUID();
    containerIds.PagerLabel = _thisHelpers.GenerateUUID();
    containerIds.PagerButtonNext = _thisHelpers.GenerateUUID();

    $('<button></button>').attr('id', containerIds.PagerButtonFirst).attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.GoToFirst).addClass('PagerButton ToolbarGoToFirst')
        .appendTo($pager);
    $('<button></button>').attr('id', containerIds.PagerButtonPrev).attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.GoToPrevious).addClass('PagerButton ToolbarGoToPrev')
        .appendTo($pager);
    $('<span></span>').attr('id', containerIds.PagerLabel).addClass('pagedisplay').appendTo($pager);
    $('<button></button>').attr('id', containerIds.PagerButtonNext).attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.GoToNext).addClass('PagerButton ToolbarGoToNext')
        .appendTo($pager);

    // Table - using configuration id as table id
    containerIds.Table = data.ConfigID; // _thisHelpers.GenerateUUID();
    var $Grid = $('<table class="pure-table tablesorter"><thead><tr></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>')
        .attr('id', containerIds.Table)
        .attr('data-item-schema', data.Entity.SchemaName)
        .attr('data-item-entityname', data.Entity.Label)
        .appendTo(parentcontainer);

    return containerIds;
}

/* User Privilages */
function RetrieveUserPrivileges(_PrivilegeName) {
    try {
        var _RequestMain = "";
        _RequestMain += "      <request i:type=\"b:RetrieveUserPrivilegesRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">";
        _RequestMain += "        <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">";
        _RequestMain += "          <a:KeyValuePairOfstringanyType>";
        _RequestMain += "            <c:key>UserId</c:key>";
        _RequestMain += "            <c:value i:type=\"d:guid\" xmlns:d=\"http://schemas.microsoft.com/2003/10/Serialization/\">" + _thisGlobals.LoggedInUserID + "</c:value>";
        _RequestMain += "          </a:KeyValuePairOfstringanyType>";
        _RequestMain += "        </a:Parameters>";
        _RequestMain += "        <a:RequestId i:nil=\"true\" />";
        _RequestMain += "        <a:RequestName>RetrieveUserPrivileges</a:RequestName>";
        _RequestMain += "      </request>";

        // Get privilegeid based on Name
        var d = fncLookupValueFromEntity("privilege", "name", _PrivilegeName, "", "", "privilegeid");
        var flag = false;
        if (d != null) {

            var _RestultXml = XrmServiceToolkit.Soap.Execute(_RequestMain);

            if ($(_RestultXml).find("b\\:RolePrivilege").length > 0) {
                d = d.toLowerCase();

                $(_RestultXml).find("b\\:RolePrivilege").each(function () {
                    //inner loop
                    $(this).find("b\\:PrivilegeId").each(function () {

                        var _PrivilegeId = $(this).text();

                        if (_PrivilegeId.toString().toLowerCase() == d) {
                            flag = true;
                            //LogIt("privilage " + _PrivilegeName + " TRUE - Privilage ID " + _PrivilegeId.toString());
                        }
                    });
                });
            }
            else if ($(_RestultXml).find("RolePrivilege").length > 0) {
                d = d.toLowerCase();

                $(_RestultXml).find("RolePrivilege").each(function () {
                    //inner loop
                    $(this).find("PrivilegeId").each(function () {

                        var _PrivilegeId = $(this).text();

                        if (_PrivilegeId.toString().toLowerCase() == d) {
                            flag = true;
                            //LogIt("privilage " + _PrivilegeName + " TRUE - Privilage ID " + _PrivilegeId.toString());
                        }

                    });
                });
            }
        } else {
            flag = true;
        }
        return flag;
    }
    catch (ex) {
        LogIt("Exception retreiving privilages" + ex.message);
    }

}

function fncLookupValueFromEntity(a, b, c, d, e, g) {
    var m = "";
    "" != d && (m = "<condition attribute='" + d + "' value='" + e + "' operator='eq'/>");
    var fetchXml = "<fetch distinct='false' mapping='logical' output-format='xml-platform' version='1.0'>" +
                      "<entity name='" + a + "'>" +
                      "<attribute name='" + g + "'/>" +
                      "<filter type='and'>" +
                      "<condition attribute='" + b + "' value='" + c + "' operator='eq'/>" + m +
                      "</filter></entity></fetch>";

    a = XrmServiceToolkit.Soap.Fetch(fetchXml);

    if (a.length > 0) {
        if (a[0].attributes[g] != null) {
            return a[0].attributes[g].value;
        }
    }
    return null
}

/* Starting point */
function InitializeSetupRoutines() {

    if (window.frameElement) {
        $(window.frameElement).css('width', '100%');
    }

    xrmPage = window.parent.Xrm.Page;

    if (_thisGlobals.xrmPage.ui) {
        _thisGlobals.ParentFieldsFormType = _thisGlobals.xrmPage.ui.getFormType();
        _thisGlobals.FormIsReadOnly = ((_thisGlobals.ParentFieldsFormType == 3) || (_thisGlobals.ParentFieldsFormType == 4));
    }
    if ((_thisGlobals.xrmPage.data) && (_thisGlobals.xrmPage.data.entity)) {
        _thisGlobals.ParentFormEntityName = _thisGlobals.xrmPage.data.entity.getEntityName();
        _thisGlobals.ParentFormEntityId = _thisGlobals.xrmPage.data.entity.getId(); // Includes {}
        _thisGlobals.ParentPrimaryAttributeValue = _thisGlobals.xrmPage.data.entity.getPrimaryAttributeValue();
    }

    $('#fieldfilter_btncancel').on("click", function (e) {
        e.stopPropagation();
        var linkentityfilter = $(this).attr('data-linkentity-filterid');
        if (linkentityfilter) {
            $('#' + linkentityfilter).remove();
            $(this).removeAttr('data-linkentity-filterid');
        }
        $('#fieldfilter_content').hide();
        return false;
    });

    $('#fieldfilter_btnremovefilter').on("click", function (e) {
        e.stopPropagation();
        var parentdiv = $('#fieldfilter_content');
        var parentSchema = parentdiv.attr(_thisGlobals.DataAttr.Header.SchemaName);
        var configid = parentdiv.attr('data-table-configid');
        var schema = parentdiv.attr('data-field-schemaname');
        var config = FindGridConfigByGridID(configid);

        config.ClearInlineFilters(schema);
        var tmpDate = new Date();
        var todayDate = tmpDate.dateFormat(_thisGlobals.userDatetimeSettings.DateFormat);
        $("#fieldfilter_calendarinput").val(todayDate);
        //$('#fieldfilter_calendarinput').datetimepicker('reset');

        var filterImgId = parentdiv.attr('data-filterimg-id');
        $('#' + filterImgId).removeClass('recfilterset').addClass('recfilternotset');
        parentdiv.hide();

        config.ThisGrid.RefreshGridRows();
        return false;
    });

    $('#fieldfilter_btnok').on("click", function (e) {
        e.stopPropagation();

        var linkentityfilter = $(this).attr('data-linkentity-filterid');
        if (linkentityfilter) {
            $('#' + linkentityfilter).remove();
            $(this).removeAttr('data-linkentity-filterid');
        }

        var parentdiv = $('#fieldfilter_content');
        var parentSchema = parentdiv.attr(_thisGlobals.DataAttr.Header.SchemaName);
        var configid = parentdiv.attr('data-table-configid');
        var schema = parentdiv.attr('data-field-schemaname');
        var ed = parseInt(parentdiv.attr(_thisGlobals.DataAttr.Header.EditorType));

        var colIndex = parentdiv.attr('data-col-index');
        var filterImgId = parentdiv.attr('data-filterimg-id');

        var fetchOP = parentdiv.attr('data-fetchop');
        var fetchValue = parentdiv.attr('data-fetchval');
        var filter = parentdiv.attr('data-selected-filter');
        var inputVal = $(parentdiv.attr('data-input-id')).val();

        var uiTypes = parentdiv.attr('data-uitypes');
        var config = FindGridConfigByGridID(configid);

        var lookupGuid = null;
        if (ed == DCrmEditableGrid.Editors.Lookup) {
            inputVal = _thisGlobals.FilterLookupCtr.$input.val();
            lookupGuid = _thisGlobals.FilterLookupCtr.LookupCtrData.LookupId;
            uiTypes = _thisGlobals.FilterLookupCtr.LookupCtrData.LookupLogicalName;
        }

        if ((ed == DCrmEditableGrid.Editors.OptionSet) ||
            (ed == DCrmEditableGrid.Editors.Checkbox) ||
            (ed == DCrmEditableGrid.Editors.Status)) {
            inputVal = _thisGlobals.Select2Option.find('option:selected');
        }

        if ((ed == DCrmEditableGrid.Editors.DatePicker) || (ed == DCrmEditableGrid.Editors.DateTimePicker)) {
            if (!$('#fieldfilter_extrainput').hasClass('hidefilters')) {
                inputVal = $('#fieldfilter_extrainput').val();

                if (!$.isNumeric(inputVal)) {
                    DisplayCrmAlertDialog("You must provide a number.");
                    return false;
                }
            } else {
                if ((inputVal == undefined) || (inputVal == 'undefined') || (inputVal.length == 0)) {
                    var tmpDate = new Date();
                    inputVal = tmpDate.dateFormat(_thisGlobals.userDatetimeSettings.DateFormat);
                }
            }
        }

        if ((ed == DCrmEditableGrid.Editors.Currency) ||
            (ed == DCrmEditableGrid.Editors.Numeric) ||
            (ed == DCrmEditableGrid.Editors.Decimal) ||
            (ed == DCrmEditableGrid.Editors.Double)) {
            if (((inputVal != undefined) && (inputVal != 'undefined') && (inputVal.length > 0)) &&
                (!$.isNumeric(inputVal.replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.')))) {
                DisplayCrmAlertDialog("You must provide a number.");
                return false;
            }
        }

        var tmpValue = null;

        var condition = '<condition attribute="' + schema + '" operator="';

        if ((fetchValue != undefined) && (fetchValue != 'undefined')) {
            if ((ed == DCrmEditableGrid.Editors.OptionSet) ||
                (ed == DCrmEditableGrid.Editors.Checkbox)) {
                inputVal = $('#fieldfilter_extrainput').val();
                condition = '<condition attribute="' + schema + 'name" operator="';
            }
            if (ed == DCrmEditableGrid.Editors.Lookup) {
                condition = '<condition attribute="' + schema + 'name" operator="';
            }
            tmpValue = fetchValue.replace('{0}', inputVal);
        } else {
            tmpValue = inputVal;
        }

        if (((fetchValue != undefined) && (fetchValue != 'undefined')) ||
            ((filter == 'eq') || (filter == 'ne')) ||
            ((filter.startsWith('next-x') || filter.startsWith('last-x') || filter == 'olderthan-x-months'))) {
            if ((inputVal == undefined) || (inputVal == 'undefined') || (inputVal.length == 0)) {
                DisplayCrmAlertDialog("You must provide a value.");
                return false;
            }
        }

        $('#' + filterImgId).removeClass('recfilternotset').addClass('recfilterset');

        /*
schema [parentaccountid] ed [6] filter [eq] inputVal [AccountName-1011] colIndex [8] 
filterImgId [0ec44661-b381-4b95-903e-96c194c176d2] fetchOP [eq] fetchValue [undefined] 
uiTypes [account] lookupGuid [50bd5541-3133-e611-80e5-08002738aa19]
         */

        if ((filter == 'null') || (filter == 'not-null') || (filter == 'eq') ||
            ((fetchOP == undefined) || (fetchOP == 'undefined'))) {
            condition += filter + '"';
        } else {
            condition += fetchOP + '"';
        }

        if ((filter != 'null') && (filter != 'not-null')) {

            if (ed == DCrmEditableGrid.Editors.Lookup) {
                if (tmpValue.contains(';')) {
                    var arrNames = tmpValue.split(';');
                    var arrUitypes = uiTypes.split(';');
                    var arrGuids = lookupGuid.split(';');
                    // Multi value
                    condition = '<condition attribute="' + schema + '" operator="' + ((fetchOP == 'eq') ? 'in' : 'not-in') + '">';
                    for (var i = 0; i < arrNames.length; i++) {
                        condition += '<value uiname="' + arrNames[i] + '" uitype="' + arrUitypes[i] + '">'
                            + _thisHelpers.AddCurlyBrace(arrGuids[i]) + '</value>';
                    }
                    condition += '</condition>';
                } else {
                    if ((lookupGuid != undefined) && (lookupGuid != 'undefined')) {
                        condition += ' uitype="' + uiTypes + '" value="' + _thisHelpers.AddCurlyBrace(lookupGuid) + '"';
                    } else {
                        condition += ' uitype="' + uiTypes + '" value="' + tmpValue + '"';
                    }
                }
            } else if ((ed == DCrmEditableGrid.Editors.OptionSet) ||
                (ed == DCrmEditableGrid.Editors.Checkbox) ||
                (ed == DCrmEditableGrid.Editors.Status)) {
                // (Object.prototype.toString.call(tmpValue) == '[object String]')
                if (Object.prototype.toString.call(tmpValue) == '[object Object]') {
                    if (tmpValue.length > 1) {
                        inputVal = '';
                        condition = '<condition attribute="' + schema + '" operator="' + ((fetchOP == 'eq') ? 'in' : 'not-in') + '">';
                        for (var i = 0; i < tmpValue.length; i++) {
                            var op = $(tmpValue[i]).attr('id');
                            inputVal += ((i > 0) ? ';' : '') + op;
                            condition += '<value>' + op + '</value>';
                        }
                        condition += '</condition>';
                    } else {
                        inputVal = $(tmpValue[0]).attr('id');
                        condition += ' value="' + inputVal + '"';
                    }
                } else {
                    condition += ' value="' + tmpValue + '"';
                }
            } else if ((ed == DCrmEditableGrid.Editors.DatePicker) || (ed == DCrmEditableGrid.Editors.DateTimePicker)) {
                condition += ' value="' + FixDatesForFetch(tmpValue) + '"';

            } else if ((ed == DCrmEditableGrid.Editors.Currency) ||
                        (ed == DCrmEditableGrid.Editors.Numeric) ||
                        (ed == DCrmEditableGrid.Editors.Decimal) ||
                        (ed == DCrmEditableGrid.Editors.Double)) {
                inputVal = tmpValue.replace(_thisGlobals.userCurrencySettings.DecimalSymbol, '.');
                condition += ' value="' + inputVal + '"';

            } else if ((tmpValue) && (tmpValue.length > 0)) {
                condition += ' value="' + tmpValue + '"';
            }
        } else if ((ed == DCrmEditableGrid.Editors.OptionSet) ||
            (ed == DCrmEditableGrid.Editors.Checkbox) || (ed == DCrmEditableGrid.Editors.Status)) {
            inputVal = null;
        }

        condition += ' />';

        config.SetFetchXmlFiltered(schema, condition, filter, inputVal,
            ((fetchOP) ? fetchOP : null), ((fetchValue) ? fetchValue : null), lookupGuid, uiTypes);

        parentdiv.hide();
        config.ThisGrid.RefreshGridRows();
        return false;
    });

    _thisGlobals.FilterLookupCtr = new $.fn.DCrmEditableGrid.FilterLookup();

    _thisHelpers.WaitDialog(true);
    GetAllUserSettings();
}

/*
Save Grid as Excel/CSV/PDF
*/

var _saveAs = (function (view) {
    // IE <10 is explicitly unsupported
    if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function () {
		    return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function (node) {
		    var event = doc.createEvent("MouseEvents");
		    event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
		    node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function (ex) {
		    (view.setImmediate || view.setTimeout)(function () {
		        throw ex;
		    }, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
		// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
		// for the reasoning behind the timeout and revocation flow
		, arbitrary_revoke_timeout = 500 // in ms
		, revoke = function (file) {
		    var revoker = function () {
		        if (typeof file === "string") { // file is an object URL
		            get_URL().revokeObjectURL(file);
		        } else { // file is a File
		            file.remove();
		        }
		    };
		    if (view.chrome) {
		        revoker();
		    } else {
		        setTimeout(revoker, arbitrary_revoke_timeout);
		    }
		}
		, dispatch = function (filesaver, event_types, event) {
		    event_types = [].concat(event_types);
		    var i = event_types.length;
		    while (i--) {
		        var listener = filesaver["on" + event_types[i]];
		        if (typeof listener === "function") {
		            try {
		                listener.call(filesaver, event || filesaver);
		            } catch (ex) {
		                throw_outside(ex);
		            }
		        }
		    }
		}
		, auto_bom = function (blob) {
		    // prepend BOM for UTF-8 XML and text/* types (including HTML)
		    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
		        return new Blob(["\ufeff", blob], { type: blob.type });
		    }
		    return blob;
		}
		, FileSaver = function (blob, name) {
		    blob = auto_bom(blob);
		    // First try a.download, then web filesystem, then object URLs
		    var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, dispatch_all = function () {
				    dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function () {
				    // don't create more object URLs than needed
				    if (blob_changed || !object_url) {
				        object_url = get_URL().createObjectURL(blob);
				    }
				    if (target_view) {
				        target_view.location.href = object_url;
				    } else {
				        var new_tab = view.open(object_url, "_blank");
				        if (new_tab === undefined && typeof safari !== "undefined") {
				            //Apple do not allow window.open, see http://bit.ly/1kZffRI
				            view.location.href = object_url;
				        }
				    }
				    filesaver.readyState = filesaver.DONE;
				    dispatch_all();
				    revoke(object_url);
				}
				, abortable = function (func) {
				    return function () {
				        if (filesaver.readyState !== filesaver.DONE) {
				            return func.apply(this, arguments);
				        }
				    };
				}
				, create_if_not_found = { create: true, exclusive: false }
				, slice
		    ;
		    filesaver.readyState = filesaver.INIT;
		    if (!name) {
		        name = "download";
		    }
		    if (can_use_save_link) {
		        object_url = get_URL().createObjectURL(blob);
		        save_link.href = object_url;
		        save_link.download = name;
		        click(save_link);
		        filesaver.readyState = filesaver.DONE;
		        dispatch_all();
		        revoke(object_url);
		        return;
		    }
		    // Object and web filesystem URLs have a problem saving in Google Chrome when
		    // viewed in a tab, so I force save with application/octet-stream
		    // http://code.google.com/p/chromium/issues/detail?id=91158
		    // Update: Google errantly closed 91158, I submitted it again:
		    // https://code.google.com/p/chromium/issues/detail?id=389642
		    if (view.chrome && type && type !== force_saveable_type) {
		        slice = blob.slice || blob.webkitSlice;
		        blob = slice.call(blob, 0, blob.size, force_saveable_type);
		        blob_changed = true;
		    }
		    // Since I can't be sure that the guessed media type will trigger a download
		    // in WebKit, I append .download to the filename.
		    // https://bugs.webkit.org/show_bug.cgi?id=65440
		    if (webkit_req_fs && name !== "download") {
		        name += ".download";
		    }
		    if (type === force_saveable_type || webkit_req_fs) {
		        target_view = view;
		    }
		    if (!req_fs) {
		        fs_error();
		        return;
		    }
		    fs_min_size += blob.size;
		    req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
		        fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
		            var save = function () {
		                dir.getFile(name, create_if_not_found, abortable(function (file) {
		                    file.createWriter(abortable(function (writer) {
		                        writer.onwriteend = function (event) {
		                            target_view.location.href = file.toURL();
		                            filesaver.readyState = filesaver.DONE;
		                            dispatch(filesaver, "writeend", event);
		                            revoke(file);
		                        };
		                        writer.onerror = function () {
		                            var error = writer.error;
		                            if (error.code !== error.ABORT_ERR) {
		                                fs_error();
		                            }
		                        };
		                        "writestart progress write abort".split(" ").forEach(function (event) {
		                            writer["on" + event] = filesaver["on" + event];
		                        });
		                        writer.write(blob);
		                        filesaver.abort = function () {
		                            writer.abort();
		                            filesaver.readyState = filesaver.DONE;
		                        };
		                        filesaver.readyState = filesaver.WRITING;
		                    }), fs_error);
		                }), fs_error);
		            };
		            dir.getFile(name, { create: false }, abortable(function (file) {
		                // delete file if it already exists
		                file.remove();
		                save();
		            }), abortable(function (ex) {
		                if (ex.code === ex.NOT_FOUND_ERR) {
		                    save();
		                } else {
		                    fs_error();
		                }
		            }));
		        }), fs_error);
		    }), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function (blob, name) {
		    return new FileSaver(blob, name);
		}
    ;
    // IE 10+ (native saveAs)
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (blob, name) {
            return navigator.msSaveOrOpenBlob(auto_bom(blob), name);
        };
    }

    FS_proto.abort = function () {
        var filesaver = this;
        filesaver.readyState = filesaver.DONE;
        dispatch(filesaver, "abort");
    };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

    return saveAs;
}(window));

var _title = function (config) {
    var title = config.title;

    return title.indexOf('*') !== -1 ?
		title.replace('*', $('title').text()) :
		title;
};

var _filename = function (config, incExtension) {
    // Backwards compatibility
    var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined ?
		config.title :
		config.filename;

    if (filename.indexOf('*') !== -1) {
        filename = filename.replace('*', $('title').text());
    }

    // Strip characters which the OS will object to
    filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");

    return incExtension === undefined || incExtension === true ?
		filename + config.extension :
		filename;
};

var _newLine = function (config) {
    return config.newline ?
		config.newline :
		navigator.userAgent.match(/Windows/) ?
			'\r\n' :
			'\n';
};

var _isSafari = function () {
    return navigator.userAgent.indexOf('Safari') !== -1 &&
		navigator.userAgent.indexOf('Chrome') === -1 &&
		navigator.userAgent.indexOf('Opera') === -1;
};

var _exportData = function (dt, config) {
    var newLine = _newLine(config);
    var data = dt;
    var boundary = config.fieldBoundary;
    var separator = config.fieldSeparator;
    var reBoundary = new RegExp(boundary, 'g');
    var escapeChar = config.escapeChar !== undefined ?
		config.escapeChar :
		'\\';
    var join = function (a) {
        var s = '';

        // If there is a field boundary, then we might need to escape it in
        // the source data
        for (var i = 0, ien = a.length ; i < ien ; i++) {
            if (i > 0) {
                s += separator;
            }

            s += boundary ?
				boundary + ('' + a[i]).replace(reBoundary, escapeChar + boundary) + boundary :
				a[i];
        }

        return s;
    };

    var header = config.header ? join(data.header) + newLine : '';
    var footer = config.footer ? newLine + join(data.footer) : '';
    var body = [];

    for (var i = 0, ien = data.body.length ; i < ien ; i++) {
        body.push(join(data.body[i]));
    }

    return {
        str: header + body.join(newLine) + footer,
        rows: body.length
    };
};

var addRow = function (row, isHeader) {
    var cells = [];
    var tmpVal = '';

    for (var i = 1, ien = row.length ; i < ien ; i++) {
        if (row[i] === null || row[i] === undefined) {
            tmpVal = '';
        } else {
            tmpVal = (isHeader) ? _thisHelpers.GetHeaderCellText($(row[i])) : _thisHelpers.GetActiveCellText($(row[i]));
        }

        if (tmpVal.length > 0) {
            // trim and strip new line
            tmpVal = tmpVal.replace( /^\s+|\s+$/g, '' ).replace(/\n/g, ' ');
        }

        // Don't match numbers with leading zeros or a negative anywhere
        // but the start
        cells.push(typeof tmpVal === 'number' || (tmpVal.match && tmpVal.match(/^-?[0-9\.]+$/) && tmpVal.charAt(0) !== '0') ?
            '<c t="n"><v>' + tmpVal + '</v></c>' :
            '<c t="inlineStr"><is><t>' + (
                !tmpVal.replace ?
                tmpVal :
                tmpVal
                    .replace(/&(?!amp;)/g, '&amp;')
                    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')) + // remove control characters
            '</t></is></c>'                                    // they are not valid in XML
        );
    }

    return '<row>' + cells.join('') + '</row>';
};

function SaveGridAsExcel(who) {
    var isAvailable = window.FileReader !== undefined && window.JSZip !== undefined && !_isSafari();
    LogIt("isAvailable " + isAvailable);
    var headers = who.mainTable.find('thead').find('tr:first').find('th');
    var rows = who.GetBodyRows();

    if (rows.length == 0) {
        return;
    }

    var xml = addRow(headers, true);
    for (var i = 0, ien = rows.length ; i < ien ; i++) {
        xml += addRow($(rows[i]).find('td'));
    }

    var zip = new window.JSZip();
    var _rels = zip.folder("_rels");
    var xl = zip.folder("xl");
    var xl_rels = zip.folder("xl/_rels");
    var xl_worksheets = zip.folder("xl/worksheets");

    zip.file('[Content_Types].xml', _thisGlobals.excelStrings['[Content_Types].xml']);
    _rels.file('.rels', _thisGlobals.excelStrings['_rels/.rels']);
    xl.file('workbook.xml', _thisGlobals.excelStrings['xl/workbook.xml']);
    xl_rels.file('workbook.xml.rels', _thisGlobals.excelStrings['xl/_rels/workbook.xml.rels']);
    xl_worksheets.file('sheet1.xml', _thisGlobals.excelStrings['xl/worksheets/sheet1.xml'].replace('__DATA__', xml));

    _saveAs(
        zip.generate({ type: "blob" }),
        'Exported Grid.xlsx'
    );
}

function SaveGridAsCsv(who) {
    var isAvailable = window.FileReader !== undefined && window.Blob;
    LogIt("isAvailable " + isAvailable);

    var data = {};
    data.header = [];
    data.body = [];

    var headers = who.mainTable.find('thead').find('tr:first').find('th');
    var rows = who.GetBodyRows();
    if (rows.length == 0) {
        return;
    }

    var columns = headers.length;
    for (var i = 1, ien = headers.length ; i < ien ; i++) {
        data.header.push(_thisHelpers.GetHeaderCellText($(headers[i])));
    }

    var tmp = [];
    var tmpVal = '';

    for (var i = 0, ien = rows.length ; i < ien ; i++) {
        var row = $(rows[i]).find('td');
        
        for (var j = 1; j < row.length; j++) {
            tmpVal = _thisHelpers.GetActiveCellText($(row[j]));
            if (tmpVal.length > 0) {
                tmpVal = tmpVal.replace(/^\s+|\s+$/g, '').replace(/\n/g, ' ');
            }
            tmp.push(tmpVal);
        }
        data.body[i] = tmp
        tmp = [];
    }

    var config = {
        filename: '*',
        extension: '.csv',
        fieldSeparator: ',',
        fieldBoundary: '"',
        escapeChar: '"',
        charset: null,
        header: true,
        footer: false
    };

    var newLine = _newLine(config);
    var output = _exportData(data, config).str;
    var charset = document.characterSet || document.charset;

    if (charset !== false) {
        if (!charset) {
            charset = document.characterSet || document.charset;
        }

        if (charset) {
            charset = ';charset=' + charset;
        }
    }
    else {
        charset = '';
    }

    _saveAs(
        new Blob([output], { type: 'text/csv' + charset }),
        'Exported Grid.csv'
    );
}

function SaveGridAsPdf(who) {
    var isAvailable = window.FileReader !== undefined && window.pdfMake;
    LogIt("isAvailable " + isAvailable);

    var data = {};
    data.header = [];
    data.body = [];

    var headers = who.mainTable.find('thead').find('tr:first').find('th');
    var rows = who.GetBodyRows();
    if (rows.length == 0) {
        return;
    }

    var columns = headers.length;
    for (var i = 1, ien = headers.length ; i < ien ; i++) {
        data.header.push(_thisHelpers.GetHeaderCellText($(headers[i])));
    }

    var tmp = [];
    var tmpVal = '';

    for (var i = 0, ien = rows.length ; i < ien ; i++) {
        var row = $(rows[i]).find('td');

        for (var j = 1; j < row.length; j++) {
            tmpVal = _thisHelpers.GetActiveCellText($(row[j]));
            if (tmpVal.length > 0) {
                tmpVal = tmpVal.replace(/^\s+|\s+$/g, '').replace(/\n/g, ' ');
            }
            tmp.push(tmpVal);
        }
        data.body[i] = tmp
        tmp = [];
    }

    var config = {
        title: '*',
        filename: '*',
        extension: '.pdf',
        orientation: 'portrait',
        pageSize: 'A4',
        header: true,
        footer: false,
        message: null,
        customize: null,
        download: 'download'
    }

    var newLine = _newLine(config);
    var rows = [];

    if (config.header) {
        rows.push($.map(data.header, function (d) {
            return {
                text: typeof d === 'string' ? d : d + '',
                style: 'tableHeader'
            };
        }));
    }

    for (var i = 0, ien = data.body.length ; i < ien ; i++) {
        rows.push($.map(data.body[i], function (d) {
            return {
                text: typeof d === 'string' ? d : d + '',
                style: i % 2 ? 'tableBodyEven' : 'tableBodyOdd'
            };
        }));
    }

    if (config.footer) {
        rows.push($.map(data.footer, function (d) {
            return {
                text: typeof d === 'string' ? d : d + '',
                style: 'tableFooter'
            };
        }));
    }

    var doc = {
        pageSize: config.pageSize,
        pageOrientation: config.orientation,
        content: [
            {
                table: {
                    headerRows: 1,
                    body: rows
                },
                layout: 'noBorders'
            }
        ],
        styles: {
            tableHeader: {
                bold: true,
                fontSize: 11,
                color: 'white',
                fillColor: '#2d4154',
                alignment: 'center'
            },
            tableBodyEven: {},
            tableBodyOdd: {
                fillColor: '#f3f3f3'
            },
            tableFooter: {
                bold: true,
                fontSize: 11,
                color: 'white',
                fillColor: '#2d4154'
            },
            title: {
                alignment: 'center',
                fontSize: 15
            },
            message: {}
        },
        defaultStyle: {
            fontSize: 10
        }
    };

    if (config.message) {
        doc.content.unshift({
            text: config.message,
            style: 'message',
            margin: [0, 0, 0, 12]
        });
    }

    if (config.title) {
        doc.content.unshift({
            text: _title(config, false),
            style: 'title',
            margin: [0, 0, 0, 12]
        });
    }

    if (config.customize) {
        config.customize(doc);
    }

    var pdf = window.pdfMake.createPdf(doc);

    if (config.download === 'open' && !_isSafari()) {
        pdf.open();
    }
    else {
        pdf.getBuffer(function (buffer) {
            var blob = new Blob([buffer], { type: 'application/pdf' });

            _saveAs(blob, 'Exported Grid.pdf');
        });
    }
}

/* Grid Configuration class, loading, ... */

var MSProductGridHelper = (function () {
    function MSProductGridHelper(schemaname, config) {
        var self = this;

        self.PriceList = { name: null, id: null, entityType: null };
        // 1083, 1091, 1085. 1089
        // ['opportunityproduct', 'invoicedetail', 'quotedetail', 'salesorderdetail']
        self.SchemaName = schemaname;
        self.GridConfig = config;

        self.CallbackErrorHandler = function (errorMsg) {
            //DisplayCrmAlertDialog(self.DataLoadErrorMessage + errorMsg);
            console.error("Exception " + errorMsg);
        };

        self.GetProductsForPriceListCallback = function (result) {
            if ((result) && (result.length) && (result.length > 0)) {

                var prodtable = $('#products_table');
                var tablebody = prodtable.find('tbody:first');
                tablebody.empty();

                var tr, td, prodStruct, itemIcon = undefined;

                // Name productnumber defaultuomscheduleid defaultuomid     productid
                for (var i = 0; i < result.length; i++) {
                    prodStruct = result[i].attributes['productstructure'].value + '';
                    itemIcon = 'dcrmeg_product';
                    if (prodStruct == '3') {
                        itemIcon = 'dcrmeg_productbundle';
                    }
                    tr = $('<tr></tr>').appendTo(tablebody);
                    $('<td><input type="checkbox" data-product-id="' + result[i].attributes['productid'].value
                        + '" data-product-structure="' + prodStruct + '" /></td>').appendTo(tr);
                    $('<td><img src="' + itemIcon + '" /><span>' + result[i].attributes['name'].value + '</span></td>')
                        .attr(_thisGlobals.ToolTipAttrName, result[i].attributes['name'].value)
                        .appendTo(tr);
                    $('<td>' + result[i].attributes['defaultuomid'].name + '</td>')
                        .attr(_thisGlobals.ToolTipAttrName, result[i].attributes['defaultuomid'].name)
                        .appendTo(tr);
                    $('<td>' + result[i].attributes['defaultuomscheduleid'].name + '</td>')
                        .attr(_thisGlobals.ToolTipAttrName, result[i].attributes['defaultuomscheduleid'].name)
                        .appendTo(tr);
                }
                $('#products_flyoutOverlay').show('slow');
            } else {
                DisplayCrmAlertDialog("No existing products found matching pricelist [" + self.PriceList.name + "]");
            }
        };

        self.DisplayExistingProducts = function () {
            GetProductsForPriceList(self.PriceList.id, self.GetProductsForPriceListCallback, self.CallbackErrorHandler);
        };

        self.GetPriceList = function () {
            var t = _thisGlobals.xrmPage.data.entity.attributes.get('pricelevelid').getValue();
            if (t) {
                self.PriceList.name = t[0].name;
                self.PriceList.id = t[0].id;
                console.log("Pricelist [" + t[0].id + "] name [" + t[0].name + "]");
                return true;
            }
            return false;
        };

        self.DisplayNativePricelistSelectCallback = function (result) {
            // Get a selected value and create a new record
            if ((result) && (result.items) && (result.items[0].id) && (result.items[0].name)) {
                try {
                    var object = new Array();
                    object[0] = self.PriceList;
                    object[0].id = result.items[0].id;
                    object[0].name = result.items[0].name;
                    object[0].entityType = result.items[0].typename;
                    _thisGlobals.xrmPage.getAttribute('pricelevelid').setValue(object);

                    _thisGlobals.xrmPage.data.setFormDirty(true);
                    console.log("Pricelist id [" + self.PriceList.id + "] name [" + self.PriceList.name + "] type [" + self.PriceList.typename + "]");
                } catch (e) {
                    LogEx('Unable to set the price list.\r\n' + e.message, pl);
                    return false;
                }
            }
        };

        self.DisplayNativePricelistSelect = function () {
            var url = "/_controls/lookup/lookupsingle.aspx?objecttypes=1022";
            DisplayNativeDialog(url, self.DisplayNativePricelistSelectCallback);
        };

        self.Initialize = function () {

            $('#products_selectall').on('click', function (e) {
                e.stopPropagation();
                $('#products_table').find('input').prop("checked", $(this).is(':checked'));
            });

            $('#products_btnok').on('click', function (e) {
                e.stopPropagation();

                var selected = $('#products_table').find('input[type="checkbox"]:checked');
                if ((selected) && (selected.length)) {
                    for (var i = 0; i < selected.length; i++) {
                        console.log($(selected[i]).attr('data-product-id'));
                        // add product
                        // if bundle (family) 3, get the associated products and add them as well
                        // ensure that there are no duplicate products that exists in the bundle gets added twice
                    }
                }

                $('#products_flyoutOverlay').hide();
            });

            $('#products_btncancel').on('click', function (e) {
                e.stopPropagation();
                $('#products_flyoutOverlay').hide();
            });
        };
        self.Initialize();
    }

    function DisplayNativeDialog(url, callback) {
        var DialogOptions = new window.parent.Xrm.DialogOptions();
        DialogOptions.width = 500;
        DialogOptions.height = 700;
        window.parent.Xrm.Internal.openDialog(
            window.parent.Mscrm.CrmUri.create(url).toString(),
            DialogOptions, null, null, callback);
    }

    function GetObjectTypeCode(schemaname) {
        var otc = -1;
        switch (schemaname) {
            case "opportunityproduct":
                otc = '1083';
                break;
            case "invoicedetail":
                otc = '1091';
                break;
            case "quotedetail":
                otc = '1085';
                break;
            case "salesorderdetail":
                otc = '1089';
                break;
            default:
        }
        return otc;
    }
    // Product ID, Product, Unit, PriceList
    function GetProductsForPriceList(id, callback, errorCallback) {
        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
          '<entity name="product">' +
            '<attribute name="name" />' + // Name and Product ID are identical
            '<attribute name="productid" />' +
            '<attribute name="productnumber" />' + // Product ID 
            '<attribute name="description" />' +
            '<attribute name="productstructure" />' + // Option set 1 product, 3 product bundle
            '<attribute name="defaultuomscheduleid" />' + //default unit
            '<attribute name="standardcost" />' +
            '<attribute name="quantityonhand" />' +
            '<attribute name="defaultuomid" />' + // default unit group
            '<attribute name="currentcost" />' +
            '<order attribute="productnumber" descending="false" />' +
            '<filter type="and">' +
              '<condition attribute="statecode" operator="eq" value="0" />' +
              '<condition attribute="productstructure" operator="in">' +
                '<value>1</value>' +
                '<value>3</value>' +
              '</condition>' +
              '<condition attribute="pricelevelid" operator="eq" uitype="pricelevel" value="' + _thisHelpers.AddCurlyBrace(id) + '" />' +
            '</filter>' +
          '</entity>' +
          '</fetch>';
        XrmServiceToolkit.Soap.Fetch(fetchXml, false, callback, errorCallback);
    }

    function GetProductsFromProductBundle(id) {
        // If a product bundle is selected then get the assoiated products
        /*
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
<entity name="productassociation">
<attribute name="productid" />
<attribute name="associatedproduct" />
<attribute name="quantity" />
<attribute name="productisrequired" />
<attribute name="uomid" />
<attribute name="productassociationid" />
<order attribute="productid" descending="false" />
<filter type="and">
  <condition attribute="productid" operator="eq" uitype="product" value="' + _thisHelpers.AddCurlyBrace(id) + '" />
</filter>
</entity>
</fetch>
         */
    }

    // dcrmeg_product
    // dcrmeg_productfamily
    // dcrmeg_productbundle
    // dcrmeg_writeinproduct
    // dcrmeg_tabsectionright
    // dcrmeg_tabsectiondown

    //self.DisplayNativeProductSelectCallback = function () {
    //    if ((result) && (result.items) && (result.items[0].id) && (result.items[0].name)) {
    //        // go through each product and product family selected
    //    }
    //};

    //self.DisplayNativeProductSelect = function () {
    //    var url = "/_controls/lookup/lookupinfo.aspx?LookupStyle=multi&objecttypes=1024";
    //    DisplayNativeDialog(url, self.DisplayNativeProductSelectCallback);
    //};

    return MSProductGridHelper;
})();

var FormattingOptions = (function () {
    function FormattingOptions(entityschemaname) {
        var self = this;

        self.EntitySchemaName = entityschemaname;
        self.Headers = []; //{ SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, ApplyToColumn: false };
        self.Fields = []; // { SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, Condition: {Operator: null, Value: null, Guid: null} };

        self.EvenRows = null;
        self.OddRows = null;

        self.GetHeader = function (schemaname) {
            return InternalGet(self.Headers, schemaname);
        }
        self.GetField = function (schemaname) {
            return InternalGet(self.Fields, schemaname);
        }
    }

    function InternalGet(arr, schemaname) {
        if (arr.length == 0) {
            return null;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].SchemaName == schemaname) {
                return arr[i];
                break;
            }
        }
    }

    return FormattingOptions;
})();

var DCrmEGConfigurationManager = (function () {

    function DCrmEGConfigurationManager(data) {
        var self = this;
        self.ConfigID = data.ConfigID;

        self.Entity = {
            SchemaName: data.schemaName,
            Label: data.label,

            RelatedToDisplayOnEntity: (data.related) ? true : false,
            RelatedToDisplayOnLookupSchemaName: (data.related) ? data.related : undefined,

            RelatedToParentLI: data.RelatedToParentLI,
            ParentSchemaName: (data.ParentSchemaName) ? data.ParentSchemaName : undefined,
            RelatedToParentLILookupSchemaName: (data.RelatedToParentLILookupSchemaName) ? data.RelatedToParentLILookupSchemaName : undefined
        };

        // Query the following given current page recordid
        self.MSProductGrid = false;
        // 1083, 1091, 1085. 1089
        // ['opportunityproduct', 'invoicedetail', 'quotedetail', 'salesorderdetail']

        //if ((['opportunityproduct', 'invoicedetail', 'quotedetail', 'salesorderdetail'].MatchExists(data.schemaName) != -1) &&
        //    (['opportunity', 'quote', 'salesorder', 'invoice'].MatchExists(_thisGlobals.ParentFormEntityName) != -1)) {
        //    self.MSProductGrid = true;
        //    self.MSProductGridHelperc = new MSProductGridHelper(data.schemaName, self);
        //}

        self.GridTitle = ((data.GridTitle) && (data.GridTitle.length) && (data.GridTitle.length > 0)) ? data.GridTitle : data.label;
        self.DisplayClearFilterButton = ((data.DisplayClearFilterButton) && (data.DisplayClearFilterButton == 'false')) ? false : true;
        self.DisplayHeaderFilter = ((data.DisplayHeaderFilter) && (data.DisplayHeaderFilter == 'false')) ? false : true;
        self.DisplayExportButton = ((data.DisplayExportButton) && (data.DisplayExportButton == 'false')) ? false : true;
        self.DisplaySetRecordState = ((data.DisplaySetRecordState) && (data.DisplaySetRecordState == 'false')) ? false : true;
        self.DisplayCloneRecord = ((data.DisplayCloneRecord) && (data.DisplayCloneRecord == 'false')) ? false : true;
        self.DisplayCloneRecordButton = ((data.DisplayCloneRecordButton) && (data.DisplayCloneRecordButton == 'false')) ? false : true;
        self.OpenRecordBehavoir = ((data.OpenRecordBehavoir) && (data.OpenRecordBehavoir != 'undefined')) ? data.OpenRecordBehavoir : "10";
        self.PasteFromExcel = ((data.PasteFromExcel) && (data.PasteFromExcel == 'true')) ? true : false;

        self.HasStatusField = (data.HasStatusField) ? data.HasStatusField : undefined;
        self.DisplaySum = ((data.DisplaySum) && (data.DisplaySum == 'false')) ? false : true;
        self.RecordsPerPage = (data.RecordsPerPage) ? data.RecordsPerPage : '5';
        self.AutoSaveChanges = ((data.AutoSaveChanges) && (data.AutoSaveChanges == 'false')) ? false : true;
        self.AllowCreateNew = ((data.AllowCreateNew) && (data.AllowCreateNew == 'false')) ? false : true;
        self.AllowDelete = ((data.AllowDelete) && (data.AllowDelete == 'false')) ? false : true;
        self.DistinctValues = ((data.DistinctValues) && (data.DistinctValues) == 'true') ? true : false;

        self.RefreshAfterCreate = ((data.RefreshAfterCreate) && (data.RefreshAfterCreate == 'false')) ? false : true;
        self.RefreshAfterSave = ((data.RefreshAfterSave) && (data.RefreshAfterSave == 'true')) ? true : false;
        self.SortOrder = ((data.SortOrder) && (data.SortOrder != 'undefined')) ? data.SortOrder : undefined;
        self.NewBtnBehavoir = ((data.NewBtnBehavoir) && (data.NewBtnBehavoir != 'undefined')) ? data.NewBtnBehavoir : "30";
        self.BooleanEditorBehavoir = ((data.BooleanEditorBehavoir) && (data.BooleanEditorBehavoir != 'undefined')) ? data.BooleanEditorBehavoir : "20";
        self.HideAutosaveButton = ((data.HideAutosaveButton) && (data.HideAutosaveButton == 'true')) ? true : false;
        self.DateTimeMinuteStep = ((data.DateTimeMinuteStep) && (data.DateTimeMinuteStep != 'undefined')) ? parseInt(data.DateTimeMinuteStep) : 5;

        self.SelectedFields = undefined;
        self.Conditions = undefined;
        self.ChildConfigurations = [];
        self.ThisGrid = undefined;
        self.ParentDivContainer = undefined;
        self.Formattings = undefined;
        self.GetFormattingOptions = function () {
            if (self.Formattings) {
                return self.Formattings;
            }
            self.Formattings = new FormattingOptions(self.Entity.SchemaName);
            return self.Formattings;
        }

        self.GridFetchXml = undefined;
        /*
    var EntityFetchParts = {
        Head: '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" count="' + data.RecordsPerPage + '" page="%P%">',
        Entity: '<entity name="' + data.Entity.SchemaName + '">',
        Fields: [],
        Sort: [],
        FilterHead: '<filter type="and">',
        Filters: [],
        InlineFilters:[{Schema: null, Filter: null, Operator: null, Value: null, FecthOp: null, FetchValue: null, LookupGuid: null, LookupUiType}],
        FilterTail: '</filter>',
        Tail: '</entity></fetch>',
        LinkEntities: [],
        //{
        //LinkEntityHeadData: {Schema: null, From: null, To: null, Alias: null},
        //LinkEntityFields:[] ,
        //LinkEntityFilters: [{Schema: null, Filter: null, Operator: null, Value: null, FecthOp: null, FetchValue: null, LookupGuid: null, LookupUiType}]
        // }
        LinkEntityHead: '<link-entity name="%n%" from="%f%" to="%t%" alias="%a%">',
        LinkEntityTail: '</link-entity>'
    };

Hasmore records [true] cookie [<cookie page="1"><name last="AccountName-100" first="A. Datum Corporation (sample)" /><accountid last="{ED216E2F-3133-E611-80E5-08002738AA19}" first="{0EE339A4-1528-E611-80DD-08002738AA19}" /></cookie>]
Hasmore records [true] cookie [&lt;cookie page=&quot;1&quot;&gt;&lt;name last=&quot;AccountName-100&quot; first=&quot;A. Datum Corporation (sample)&quot; /&gt;&lt;accountid last=&quot;{ED216E2F-3133-E611-80E5-08002738AA19}&quot; first=&quot;{0EE339A4-1528-E611-80DD-08002738AA19}&quot; /&gt;&lt;/cookie&gt;]

<fetch version="1.0" count="5" no-lock="true" page="2" paging-cookie="&lt;cookie page=&quot;1&quot;&gt;&lt;name last=&quot;AccountName-100&quot; first=&quot;A. Datum Corporation (sample)&quot; /&gt;&lt;accountid last=&quot;{ED216E2F-3133-E611-80E5-08002738AA19}&quot; first=&quot;{0EE339A4-1528-E611-80DD-08002738AA19}&quot; /&gt;&lt;/cookie&gt;" >
  <entity name="account" >
    <attribute name="paymenttermscode" />
    <attribute name="creditlimit" />
    <attribute name="name" />
    <attribute name="donotemail" />
    <attribute name="preferredappointmentdaycode" />
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
      <condition attribute="ownerid" operator="eq" uitype="systemuser" value="{F8E03372-1328-E611-80DD-08002738AA19}" />
      <condition attribute="parentaccountid" operator="eq" uitype="account" value="{FEE239A4-1528-E611-80DD-08002738AA19}" />
      <condition attribute="preferredappointmentdaycode" operator="not-null" />
      <condition attribute="createdon" operator="last-x-days" value="5" />
    </filter>
    <order attribute="name" />

    '<link-entity name="incident" from="customerid" to="accountid" alias="aa">' +
	'<attribute name="CCCname" />' +
      '<filter type="and">' +
        '<condition attribute="primarycontactidname" operator="like" value="fjghg%" />' +
      '</filter>' +
    '</link-entity>' +

  </entity>
</fetch>

        */
        self.GetFetchXml = function (page, pagingCookie) {
            var fetch = '';
            var additional = null;
            page = page || "1";

            if (self.GridFetchXml) {

                if (window.parent.DCrmEgGridOnBeforeFetchRecords) {
                    additional = window.parent.DCrmEgGridOnBeforeFetchRecords({ ParentEntityLabel: self.Entity.Label, ParentEntitySchemaName: self.Entity.SchemaName });
                }

                if (pagingCookie) {
                    fetch += self.GridFetchXml.HeadForPaging.replace("%P%", page + "").replace("%PC%", pagingCookie)
                        + self.GridFetchXml.Entity
                        + self.GridFetchXml.Fields.join('');
                } else {
                    fetch += self.GridFetchXml.Head.replace("%P%", page + "")
                        + self.GridFetchXml.Entity
                        + self.GridFetchXml.Fields.join('');
                }

                if (self.GridFetchXml.Sort.length > 0) {
                    fetch += self.GridFetchXml.Sort.join('');
                }

                if (self.GridFetchXml.Filters.length > 0) {
                    fetch += self.GridFetchXml.FilterHead;
                    fetch += self.GridFetchXml.Filters.join('');

                    if (self.GridFetchXml.InlineFilters.length > 0) {
                        fetch += self.GridFetchXml.InlineFilters.map(function (elem) {
                            return elem.Filter;
                        }).join('');
                    }

                    if ((additional) && (additional.Condition)) {
                        fetch += additional.Condition;
                    }
                    fetch += self.GridFetchXml.FilterTail;

                } else if (self.GridFetchXml.InlineFilters.length > 0) {
                    fetch += self.GridFetchXml.FilterHead;
                    fetch += self.GridFetchXml.InlineFilters.map(function (elem) {
                        return elem.Filter;
                    }).join('');

                    if ((additional) && (additional.Condition)) {
                        fetch += additional.Condition;
                    }
                    fetch += self.GridFetchXml.FilterTail;

                } else if ((additional) && (additional.Condition)) {
                    fetch += self.GridFetchXml.FilterHead;
                    fetch += additional.Condition;
                    fetch += self.GridFetchXml.FilterTail;
                }

                if (self.GridFetchXml.LinkEntities.length > 0) {
                    for (var i = 0; i < self.GridFetchXml.LinkEntities.length; i++) {
                        var le = self.GridFetchXml.LinkEntities[i];

                        //[{Schema: null, Filter: null, Operator: null, Value: null, FecthOp: null, FetchValue: null, LookupGuid: null, LookupUiType}]
                        fetch += self.GridFetchXml.LinkEntityHead
                            .replace('%n%', le.LinkEntityHeadData.Schema)
                            .replace('%f%', le.LinkEntityHeadData.From)
                            .replace('%t%', le.LinkEntityHeadData.To)
                            .replace('%a%', le.LinkEntityHeadData.Alias);

                        if (le.LinkEntityFields.length > 0) {
                            for (var ii = 0; ii < le.LinkEntityFields.length; ii++) {
                                fetch += '<attribute name="' + le.LinkEntityFields[ii]  + '" />';
                            }
                        }
                        if (le.LinkEntityFilters.length > 0) {
                            fetch += self.GridFetchXml.FilterHead;
                            fetch += le.LinkEntityFilters.map(function (elem) {
                                return elem.Filter;
                            }).join('');
                            fetch += self.GridFetchXml.FilterTail;
                        }
                    }
                    fetch += self.GridFetchXml.LinkEntityTail;
                }


                if ((additional) && (additional.LinkEntity)) {
                    fetch += additional.LinkEntity;
                }

                fetch += self.GridFetchXml.Tail;
            }

            return fetch;
        };

        // 0 asc, 1 desc
        self.GetFetchXmlSorted = function (attr, order) {
            self.GridFetchXml.Sort = [];
            self.GridFetchXml.Sort.push('<order attribute="' + attr + '" descending="' + ((order == 0) ? 'false' : 'true') + '" />');
        };

        self.SetFetchXmlFiltered = function (schemaname, condition, operator, value, fetchop, fetchvalue, lookupguid, lookupuitype) {

            if (self.GridFetchXml.InlineFilters.length > 0) {
                for (var i = 0; i < self.GridFetchXml.InlineFilters.length; i++) {
                    if (self.GridFetchXml.InlineFilters[i].Schema == schemaname) {
                        self.GridFetchXml.InlineFilters[i].Filter = condition;
                        self.GridFetchXml.InlineFilters[i].Operator = operator;
                        self.GridFetchXml.InlineFilters[i].Value = value;
                        self.GridFetchXml.InlineFilters[i].FecthOp = fetchop;
                        self.GridFetchXml.InlineFilters[i].FetchValue = fetchvalue;
                        self.GridFetchXml.InlineFilters[i].LookupGuid = lookupguid;
                        self.GridFetchXml.InlineFilters[i].LookupUiType = lookupuitype;
                        return;
                    }
                }
            }

            self.GridFetchXml.InlineFilters.push({
                Schema: schemaname,
                Filter: condition,
                Operator: operator,
                Value: value,
                FecthOp: fetchop,
                FetchValue: fetchvalue,
                LookupGuid: lookupguid,
                LookupUiType: lookupuitype
            });
        };

        self.SetLinkEntityFiltered = function (linkentityschema, linkentityfrom, linkentityto,
            fields, // array of fields schema names or null
            schemaname, condition, operator, value, fetchop, fetchvalue, lookupguid, lookupuitype) {

            var found = -1;
            if (self.GridFetchXml.LinkEntities.length > 0) {
                for (var i = 0; i < self.GridFetchXml.LinkEntities.length; i++) {
                    if (self.GridFetchXml.LinkEntities[i].LinkEntityHeadData.Schema == linkentityschema) {

                        if (self.GridFetchXml.LinkEntities[i].LinkEntityFilters.length > 0) {
                            for (var ii = 0; ii < self.GridFetchXml.LinkEntities[i].LinkEntityFilters.length; ii++) {
                                if (self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].Schema == schemaname) {
                                    found = ii;
                                    self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].Filter = condition;
                                    self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].Operator = operator;
                                    self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].Value = value;
                                    self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].FecthOp = fetchop;
                                    self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].FetchValue = fetchvalue;
                                    self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].LookupGuid = lookupguid;
                                    self.GridFetchXml.LinkEntities[i].LinkEntityFilters[ii].LookupUiType = lookupuitype;
                                    return;
                                }
                            }
                        }

                        self.GridFetchXml.LinkEntities[i].LinkEntityFilters.push({
                            Schema: schemaname,
                            Filter: condition,
                            Operator: operator,
                            Value: value,
                            FecthOp: fetchop,
                            FetchValue: fetchvalue,
                            LookupGuid: lookupguid,
                            LookupUiType: lookupuitype
                        });
                        return;
                    }
                }
            }

            if(fields == null) {
                fields = [];
            }
            var tmpLink = {
                LinkEntityHeadData: {
                    Schema: linkentityschema,
                    From: linkentityfrom,
                    To: linkentityto,
                    Alias: _thisHelpers.GenerateUUID()
                },
                // Array of fields schema names
                LinkEntityFields: fields,
                LinkEntityFilters: []
            };

            tmpLink.LinkEntityFilters.push({
                Schema: schemaname,
                Filter: condition,
                Operator: operator,
                Value: value,
                FecthOp: fetchop,
                FetchValue: fetchvalue,
                LookupGuid: lookupguid,
                LookupUiType: lookupuitype
            });

            self.GridFetchXml.LinkEntities.push(tmpLink);
        };

        self.GetFetchXmlFilters = function () {
            var fetch = '';
            var additional = null;

            if (self.GridFetchXml) {

                if (window.parent.DCrmEgGridOnBeforeFetchRecords) {
                    additional = window.parent.DCrmEgGridOnBeforeFetchRecords({ ParentEntityLabel: self.Entity.Label, ParentEntitySchemaName: self.Entity.SchemaName });
                }

                if (self.GridFetchXml.Filters.length > 0) {
                    fetch += self.GridFetchXml.FilterHead;
                    fetch += self.GridFetchXml.Filters.join('');

                    if (self.GridFetchXml.InlineFilters.length > 0) {
                        fetch += self.GridFetchXml.InlineFilters.map(function (elem) {
                            return elem.Filter;
                        }).join('');
                    }

                    if ((additional) && (additional.Condition)) {
                        fetch += additional.Condition;
                    }

                    fetch += self.GridFetchXml.FilterTail;
                } else if (self.GridFetchXml.InlineFilters.length > 0) {
                    fetch += self.GridFetchXml.FilterHead;
                    fetch += self.GridFetchXml.InlineFilters.map(function (elem) {
                        return elem.Filter;
                    }).join('');

                    if ((additional) && (additional.Condition)) {
                        fetch += additional.Condition;
                    }

                    fetch += self.GridFetchXml.FilterTail;
                } else if ((additional) && (additional.Condition)) {
                    fetch += self.GridFetchXml.FilterHead;
                    fetch += additional.Condition;
                    fetch += self.GridFetchXml.FilterTail;
                }

                if (self.GridFetchXml.LinkEntities.length > 0) {
                    for (var i = 0; i < self.GridFetchXml.LinkEntities.length; i++) {
                        var le = self.GridFetchXml.LinkEntities[i];

                        //[{Schema: null, Filter: null, Operator: null, Value: null, FecthOp: null, FetchValue: null, LookupGuid: null, LookupUiType}]
                        fetch += self.GridFetchXml.LinkEntityHead
                            .replace('%n%', le.LinkEntityHeadData.Schema)
                            .replace('%f%', le.LinkEntityHeadData.From)
                            .replace('%t%', le.LinkEntityHeadData.To)
                            .replace('%a%', le.LinkEntityHeadData.Alias);

                        if (le.LinkEntityFields.length > 0) {
                            for (var ii = 0; ii < le.LinkEntityFields.length; ii++) {
                                fetch += '<attribute name="' + le.LinkEntityFields[ii] + '" />';
                            }
                        }
                        if (le.LinkEntityFilters.length > 0) {
                            fetch += self.GridFetchXml.FilterHead;
                            fetch += le.LinkEntityFilters.map(function (elem) {
                                return elem.Filter;
                            }).join('');
                            fetch += self.GridFetchXml.FilterTail;
                        }
                    }
                    fetch += self.GridFetchXml.LinkEntityTail;
                }

                if ((additional) && (additional.LinkEntity)) {
                    fetch += additional.LinkEntity;
                }

            }
            return fetch;
        };

        self.ClearInlineFilters = function (schemaname) {
            if (self.GridFetchXml.InlineFilters.length == 0) {
                return;
            }

            if (schemaname) {
                var found = -1;
                for (var i = 0; i < self.GridFetchXml.InlineFilters.length; i++) {
                    if (self.GridFetchXml.InlineFilters[i].Schema == schemaname) {
                        found = i;
                        break;
                    }
                }
                if (found != -1) {
                    self.GridFetchXml.InlineFilters.splice(found, 1);
                    return;
                }

                found = -1;
                for (var i = 0; i < self.GridFetchXml.LinkEntities.length; i++) {
                    if (self.GridFetchXml.LinkEntities[i].LinkEntityHeadData.Schema == schemaname) {
                        found = i;
                        break;
                    }
                }
                if (found != -1) {
                    self.GridFetchXml.LinkEntities.splice(found, 1);
                }
            } else {
                self.GridFetchXml.InlineFilters = [];
                self.GridFetchXml.LinkEntities = [];
            }
        };

        self.GetInlineFilterBySchemaName = function (schemaname) {

            for (var i = 0; i < self.GridFetchXml.InlineFilters.length; i++) {
                if (self.GridFetchXml.InlineFilters[i].Schema == schemaname) {
                    return self.GridFetchXml.InlineFilters[i];
                }
            }

            for (var i = 0; i < self.GridFetchXml.LinkEntities.length; i++) {
                if (self.GridFetchXml.LinkEntities[i].LinkEntityHeadData.Schema == schemaname) {
                    return self.GridFetchXml.LinkEntities[i];
                }
            }

            return null;
        };

    }
    
    return DCrmEGConfigurationManager;
})();

function AddToMainConfiguration(config) {
    _thisGlobals.DCrmEGConfiguration.push(config);
}

function LoadDCrmEGConfigurationCallback(fetchResults) {
    if (fetchResults.length <= 0) {
        LogEx("No D CRM Editable Grid records found matching this entity.");
        _thisHelpers.WaitDialog();
        return;
    }

    var val = fetchResults[0].attributes['dcrmeg_headerfieldnameshidden'].value;
    // Display order
    var entities = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._SEPERATOR) : '';

    // All Entities info
    val = fetchResults[0].attributes['dcrmeg_displayfromentityhidden'].value;
    var entitesInfo = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';
    // All fields
    val = fetchResults[0].attributes['dcrmeg_fromentityfieldsattrhidden'].value;
    var fields = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';
    // All conditions
    val = (fetchResults[0].attributes['dcrmeg_fieldcondition']) ? fetchResults[0].attributes['dcrmeg_fieldcondition'].value : undefined;
    var consitions = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';
    // All Formatting dcrmeg_entitiesinfo
    val = (fetchResults[0].attributes['dcrmeg_entitiesinfo']) ? fetchResults[0].attributes['dcrmeg_entitiesinfo'].value : undefined;
    var formattings = (val) ? val.split(_thisGlobals._pSeperator) : null;

    var parentconfig = undefined;
    var config = undefined;

    for (var i = 0; i < entities.length; i++) {

        parentconfig = undefined;
        var tmp = FindEntityGridInfo(entities[i], entitesInfo);

        /*
Index [0] value [contact]
Index [1] value [Contact]
Index [2] value [false]
Index [3] value [parentcustomerid]
Index [4] value [undefined]
Index [5] value []
Index [6] value []
Index [7] value [statecode]
Index [8] value [true]
Index [9] value [100000003]
Index [10] value [5]
Index [11] value [true]
Index [12] value [true]
Index [13] value [true]
Index [14] value [true]
Index [15] value [false]
Index [16] value [firstname;0]
Index [17] value [10]
Index [18] value [10]
Index [19] value [false]
Related [false] RelatedEntityLookup [undefined]
         */

        var data = { schemaName: tmp[0], label: tmp[1], ConfigID: _thisHelpers.GenerateUUID() };

        if (tmp[2] == 'true') {
            data.related = tmp[3];
        }

        // related to another entity in the list
        data.RelatedToParentLI = (tmp[4] == 'true') ? true : false;
        data.RelatedToParentLILookupSchemaName = (tmp[5].length > 0) ? tmp[5] : undefined;
        data.ParentSchemaName = (tmp[6].length > 0) ? tmp[6] : undefined;
        // Find the parent config and set the parentLiId
        if (data.ParentSchemaName) {
            parentconfig = FindDCrmEGConfigurationBySchema(data.ParentSchemaName);
        }

        if (tmp[7].length > 0) {
            // state
            data.HasStatusField = tmp[7];
        }
        data.DisplaySum = tmp[8];
        data.RecordsPerPage = tmp[10];

        if (tmp.length > 11) {
            data.AutoSaveChanges = tmp[11];
            data.AllowCreateNew = tmp[12];
            data.AllowDelete = tmp[13];
            data.RefreshAfterCreate = ((tmp.length > 14) ? tmp[14] : true);
            data.RefreshAfterSave = ((tmp.length > 15) ? tmp[15] : false);
            data.SortOrder = ((tmp.length > 16) ? ((tmp[16].length > 0) ? tmp[16] : undefined) : undefined);
            data.NewBtnBehavoir = ((tmp.length > 17) ? tmp[17] : undefined);
            data.BooleanEditorBehavoir = ((tmp.length > 18) ? tmp[18] : undefined);
            data.HideAutosaveButton = ((tmp.length > 19) ? tmp[19] : undefined);
            data.GridTitle = ((tmp.length > 20) ? tmp[20] : undefined);
            data.DisplayClearFilterButton = ((tmp.length > 21) ? tmp[21] : true);
            data.DisplayHeaderFilter = ((tmp.length > 22) ? tmp[22] : true);
            data.DisplayExportButton = ((tmp.length > 23) ? tmp[23] : true);
            data.DisplaySetRecordState = ((tmp.length > 24) ? tmp[24] : true);
            data.DisplayCloneRecord = ((tmp.length > 25) ? tmp[25] : true);
            data.DisplayCloneRecordButton = ((tmp.length > 26) ? tmp[26] : true);
            data.OpenRecordBehavoir = ((tmp.length > 27) ? tmp[27] : undefined);
            data.PasteFromExcel = ((tmp.length > 28) ? tmp[28] : false);
            data.DateTimeMinuteStep = ((tmp.length > 29) ? tmp[29] : undefined);
            data.DistinctValues = ((tmp.length > 30) ? tmp[30] : false);

        }

        config = new DCrmEGConfigurationManager(data);
        if (fields.length > 0) {
            config.SelectedFields = GetSelectedFields(FindEntiyGridFields(data.schemaName, fields));
            //console.log("Fields", config.SelectedFields);
        }
        if (consitions.length > 0) {
            config.Conditions = FindEntiyGridFields(data.schemaName, consitions);
        }

        if (formattings) {
            for (var index = 0; index < formattings.length; index++) {
                var rec = formattings[index].split(_thisGlobals._OuterSeperator);
                // Get formatting options for this entity
                if (rec[1] == data.schemaName) {
                    var formatOption = new FormattingOptions(rec[1]);

                    var inner = rec[0].split(_thisGlobals._SEPERATOR);
                    // inner[0] headers
                    // inner[1] fields
                    // inner[2] OddRows
                    // inner[3] EvenRows
                    if ((inner[0]) && (inner[0].length > 0)) {
                        var headers = inner[0].split('[H]');
                        for (var ii = 0; ii < headers.length; ii++) {
                            if ((headers[ii]) && (headers[ii].length > 0)) {
                                formatOption.Headers.push(JSON.parse(headers[ii]));
                            }
                        }
                    }
                    if ((inner[1]) && (inner[1].length > 0)) {
                        var cells = inner[1].split('[F]');
                        for (var ii = 0; ii < cells.length; ii++) {
                            if ((cells[ii]) && (cells[ii].length > 0)) {
                                formatOption.Fields.push(JSON.parse(cells[ii]));
                            }
                        }
                    }
                    if ((inner[2]) && (inner[2].length > 0)) {
                        formatOption.OddRows = inner[2];
                    }
                    if ((inner[3]) && (inner[3].length > 0)) {
                        formatOption.EvenRows = inner[3];
                    }

                    config.Formattings = formatOption;
                    //console.log(config.Formattings);
                }
            }
        }

        if ((data.ParentSchemaName) && (parentconfig)) {
            parentconfig.ChildConfigurations.push(config);
        } else {
            AddToMainConfiguration(config);
        }
    }

    // Display root grids
    var $parentContainer = $('#parentcontainer');
    try {
        for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
            if (i > 0) {
                $('<div></div>')
                    .addClass('gridSpacerDiv')
                    .appendTo($parentContainer);
            }
            CreateAndPopulateGrid(_thisGlobals.DCrmEGConfiguration[i], $parentContainer, null, _thisGlobals.ParentPrimaryAttributeValue);
        }
    } catch (e) {
        LogEx("Unable to create grid due to exception:\r\n" + e.message);
    }
}

// data: instance of DCrmEGConfigurationManager
function CreateAndPopulateGrid(data, parentcontainer, relationshipparentEntityGuid, relationShipLookupLabel) { 

   if (data.SelectedFields.length == 0) {
        return null;
    }

    //var userPrivilages = { CanCreate: true, CanUpdate: true, CanDelete: true };

    // Create grid toolbar caption, buttons, and paging controls
    var ContainerIds = CreateGridContainers(data, parentcontainer);

    var EntitiesAreRelated = data.Entity.RelatedToDisplayOnEntity;

    var RelatedEntityLookup = undefined;
    if (EntitiesAreRelated) {
        RelatedEntityLookup = data.Entity.RelatedToDisplayOnLookupSchemaName;
    }

    if (data.Entity.RelatedToParentLI) {
        RelatedEntityLookup = data.Entity.RelatedToParentLILookupSchemaName;
        EntitiesAreRelated = true;
    }

    var DisplayFieldsSum = data.DisplaySum;
    var distinctRecs = (data.DistinctValues ? ' distinct="true"' : '');
    var EntityFetchParts = {
        Head: '<fetch version="1.0"' + distinctRecs + ' output-format="xml-platform" mapping="logical" no-lock="true" count="' + data.RecordsPerPage + '" page="%P%" paging-cookie="">',
        HeadForPaging: '<fetch version="1.0" output-format="xml-platform" mapping="logical" no-lock="true" page="%P%" count="' + data.RecordsPerPage + '" paging-cookie="%PC%">',
        Entity: '<entity name="' + data.Entity.SchemaName + '">',
        Fields: [],
        Sort: [],
        FilterHead: '<filter type="and">',
        Filters: [],
        InlineFilters: [],
        FilterTail: '</filter>',
        Tail: '</entity></fetch>',
        LinkEntities: [],
        //{ LinkEntityHeadData: {Schema: null, From: null, To: null, Alias: null},
        //LinkEntityFields: [],
        //LinkEntityFilters: []
        //}
        LinkEntityHead: '<link-entity name="%n%" from="%f%" to="%t%" alias="%a%">',
        LinkEntityTail: '</link-entity>'
    };

    var hasCurrencyId = false;
    var hasStatus = false;
    var hasState = false;

    var selectedFieldsSchemaNames = [];
    for (var headerIndex = 0; headerIndex < data.SelectedFields.length; headerIndex++) {
        var item = data.SelectedFields[headerIndex];
        EntityFetchParts.Fields.push('<attribute name="' + item.SchemaName + '" />');
        selectedFieldsSchemaNames.push(item.SchemaName);

        if ((hasCurrencyId == false) && (item.AttrType == _thisGlobals.CrmFieldTypes.MoneyType)) {
            EntityFetchParts.Fields.push('<attribute name="transactioncurrencyid" />');
            hasCurrencyId = true;
        }
    }

    if ((data.HasStatusField) && (selectedFieldsSchemaNames.MatchExists('statuscode') == -1)) {
        EntityFetchParts.Fields.push('<attribute name="statuscode" />');
    }
    if ((data.HasStatusField) && (selectedFieldsSchemaNames.MatchExists('statecode') == -1)) {
        EntityFetchParts.Fields.push('<attribute name="statecode" />');
    }

    var InitialSortData = {
        FirstField: undefined,
        SecondField: undefined
    };
    if ((data.SortOrder) && (data.SortOrder != 'undefined')) {
        var sorts = data.SortOrder.split(";");

        InitialSortData.FirstField = { Attribute: sorts[0], Descending: ((sorts[1] == '0') ? false : true) };
        EntityFetchParts.Sort.push('<order attribute="' + sorts[0] + '" descending="' + ((sorts[1] == '0') ? 'false' : 'true') + '" />');

        if (sorts.length > 2) {
            InitialSortData.SecondField = { Attribute: sorts[2], Descending: ((sorts[3] == '0') ? false : true) };
            EntityFetchParts.Sort.push('<order attribute="' + sorts[2] + '" descending="' + ((sorts[3] == '0') ? 'false' : 'true') + '" />');
        }
    }

    // Process any conditions
    var processedCOnditions = ProcessFetchConditions(data.Conditions, data.HasStatusField, selectedFieldsSchemaNames);
    EntityFetchParts.Filters = processedCOnditions.Filters;
    EntityFetchParts.InlineFilters = processedCOnditions.InlineFilters;
    var filterIndexes = processedCOnditions.HeaderIndexes;

    var parentChildLookupInfo = { 
        Related: EntitiesAreRelated,
        LookupSchemaName: RelatedEntityLookup, // primarycontactid
        ParentSchemaName: data.Entity.ParentSchemaName, // contact
        Guid: relationshipparentEntityGuid, // this contact record guid
        Type: 'EntityReference'
    };

    if (EntitiesAreRelated) {

        var pushToInlineIndex = -1;
        for (var headerIndex = 0; headerIndex < data.SelectedFields.length; headerIndex++) {
            var item = data.SelectedFields[headerIndex];
            if (item.SchemaName == RelatedEntityLookup) {
                filterIndexes.push(headerIndex);
                pushToInlineIndex = headerIndex;
                break;
            }
        }
        var relCondition = '';

        if (relationshipparentEntityGuid) {
            relCondition = '<condition attribute="' + RelatedEntityLookup + '" operator="eq" uitype="' + data.Entity.ParentSchemaName + '" value="' + _thisHelpers.AddCurlyBrace(relationshipparentEntityGuid) + '" />';
            if ((pushToInlineIndex > -1) && (relationShipLookupLabel)) {
                EntityFetchParts.InlineFilters.push(InlineFilterDataToStruct(RelatedEntityLookup, pushToInlineIndex, relCondition, 'eq', relationShipLookupLabel, null, null, relationshipparentEntityGuid, data.Entity.ParentSchemaName));
            } else {
                EntityFetchParts.Filters.push(relCondition);
            }
        } else {
            parentChildLookupInfo.ParentSchemaName = _thisGlobals.ParentFormEntityName.toLowerCase();
            parentChildLookupInfo.Guid = _thisGlobals.ParentFormEntityId;
            relCondition = '<condition attribute="' + RelatedEntityLookup + '" operator="eq" uitype="' + _thisGlobals.ParentFormEntityName.toLowerCase() + '" value="' + _thisHelpers.AddCurlyBrace(_thisGlobals.ParentFormEntityId) + '" />';
            if ((pushToInlineIndex > -1) && (relationShipLookupLabel)) {
                EntityFetchParts.InlineFilters.push(InlineFilterDataToStruct(RelatedEntityLookup, pushToInlineIndex, relCondition, 'eq', relationShipLookupLabel, null, null, _thisGlobals.ParentFormEntityId, _thisGlobals.ParentFormEntityName.toLowerCase()));
            } else {
                EntityFetchParts.Filters.push(relCondition);
            }
        }
    }

    data.GridFetchXml = EntityFetchParts;

    var $tr = $('#' + ContainerIds.Table).find('thead:first').find('tr:first');

    var ceditors = [];
    var $theader = undefined;
    var NumericFields = {
        HaveNumeric: false,
        HavePrecision: false
    };

    var autoCellWidth = parseFloat(100 / data.SelectedFields.length).toFixed(2);

    var table = $('#' + ContainerIds.Table)[0];

    if ((!_thisGlobals.FormIsReadOnly) && ((data.AllowDelete) || (data.DisplayCloneRecordButton))) {
        var $chk = $("<input type='checkbox' />")
            .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.SelectAllRecords)
            .on('click', function (e) {
                e.stopPropagation();
                var schemaname = $(this).parent().parent().parent().parent().attr('id');
                _thisHelpers.SelectAllRows(schemaname, ($(this).is(':checked')));
            });
        var $chkHeader = $("<th></th>").addClass('firstColCheckbox').append($chk);
        $chkHeader.appendTo($tr);
    } else {
        var $chkHeader = $("<th></th>").addClass('firstColNoCheckbox');
        $chkHeader.appendTo($tr);
    }

    var $footer = $(table).find('tfoot:first').find('tr:first');
    // Add footer
    var $footercell = $('<td></td>')
        .addClass('tfooterdummy')
        .attr(_thisGlobals.DataAttr.Cell.FooterCell, _thisGlobals.DataAttr.NO)
        .appendTo($footer);

    var formatOptions = data.GetFormattingOptions();

    for (var headerIndex = 0; headerIndex < data.SelectedFields.length; headerIndex++) {
        var item = data.SelectedFields[headerIndex];

        $theader = $('<th></th>')
            .addClass('TextAutoEclipse')
            .attr(_thisGlobals.ToolTipAttrName, item.Name)
            .appendTo($tr);

        var headerFormatOptions = formatOptions.GetHeader(item.SchemaName);
        if (headerFormatOptions) {
            if ((headerFormatOptions.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != headerFormatOptions.BackgroundColor)) {
                $theader.css("background-color", headerFormatOptions.BackgroundColor);
            }
            if ((headerFormatOptions.TextColor) && (_thisGlobals.DefaultTextColor != headerFormatOptions.TextColor)) {
                $theader.css("color", headerFormatOptions.TextColor);
            }
            if (headerFormatOptions.FontCss) {
                DeccoupleCss(headerFormatOptions.FontCss, $theader);
            }
        }

        if (item.RealWidth != '0') {
            $theader.width(item.RealWidth + '%');
        } else {
            $theader.width(autoCellWidth + '%');
        }

        var opSetData = [];
        var lookupSetData = undefined;
        var booleanCheckText = 'Yes';
        var booleanUncheckedText = 'No';
        var requiered = false;
        var ed = DCrmEditableGrid.Editors.None;
        var attrtype = item.AttrType.toLowerCase();
        var fieldIsReadOnly = (item.ReadOnly == 'true') || false;
        var headerIdToUpdate = null;

        if (item.RequieredLevel.toLowerCase() != 'none') {
            requiered = true;
        }

        if (attrtype == _thisGlobals.CrmFieldTypes.TextType) {

            if (item.Format.toLowerCase() == 'textarea') {
                ed = DCrmEditableGrid.Editors.Description;
            } else {
                ed = DCrmEditableGrid.Editors.Text;
            }
        } else if (attrtype == _thisGlobals.CrmFieldTypes.DecimalType) {

            ed = DCrmEditableGrid.Editors.Decimal;
            NumericFields.HaveNumeric = true;
            NumericFields.HavePrecision = true;
        } else if (attrtype == _thisGlobals.CrmFieldTypes.DoubleType) {

            ed = DCrmEditableGrid.Editors.Double;
            NumericFields.HaveNumeric = true;
            NumericFields.HavePrecision = true;

        } else if (attrtype == _thisGlobals.CrmFieldTypes.MemoType) {

            ed = DCrmEditableGrid.Editors.Description;

        } else if (attrtype == _thisGlobals.CrmFieldTypes.IntegerType) {

            ed = DCrmEditableGrid.Editors.Numeric;
            NumericFields.HaveNumeric = true;

        } else if (attrtype == _thisGlobals.CrmFieldTypes.DateTimeType) {

            if (item.Format.toLowerCase() == 'dateonly') {
                ed = DCrmEditableGrid.Editors.DatePicker;
            } else {
                ed = DCrmEditableGrid.Editors.DateTimePicker;
            }

        } else if (attrtype == _thisGlobals.CrmFieldTypes.MoneyType) {

            ed = DCrmEditableGrid.Editors.Currency;
            NumericFields.HaveNumeric = true;
            NumericFields.HavePrecision = true;

        } else if (attrtype == _thisGlobals.CrmFieldTypes.OptionSetType) {
            if ((!fieldIsReadOnly) && (!requiered)) {
                opSetData.insert(0,
                {
                    text: '',
                    value: -1,
                    state: undefined,
                    readonly: false
                });
            }
            ed = DCrmEditableGrid.Editors.OptionSet;

        } else if (attrtype == _thisGlobals.CrmFieldTypes.BooleanType) {
            headerIdToUpdate = _thisHelpers.GenerateUUID();
            $theader.attr('id', headerIdToUpdate);
            ed = DCrmEditableGrid.Editors.Checkbox;

        } else if ((attrtype == _thisGlobals.CrmFieldTypes.LookupType) ||
            (attrtype == _thisGlobals.CrmFieldTypes.CustomerType) ||
            (attrtype == _thisGlobals.CrmFieldTypes.OwnerType)) {

            ed = DCrmEditableGrid.Editors.Lookup;

            lookupSetData = {
                LookupId: '',
                LookupLogicalName: '',
                LookupName: '',
                TargetEntities: [],
                DefaultView: item.DefaultView,
                DefaultViewObjectTypeCode: item.DefaultViewObjectTypeCode
            };

            var earr = item.LookupTargetEntity.split(',');
            for(var earrindex = 0; earrindex < earr.length; earrindex++) {
                lookupSetData.TargetEntities.push({
                    Target: earr[earrindex],
                    PrimaryIdAttribute: null,
                    PrimaryNameAttribute: null,
                    ObjectTypeCode: null,
                    LocalizedLabel: null
                });
            }

            $theader.attr("data-lookuptarget-entities", item.LookupTargetEntity);

        } else if ((attrtype == _thisGlobals.CrmFieldTypes.State) ||
            (attrtype == _thisGlobals.CrmFieldTypes.Status)) {

            ed = DCrmEditableGrid.Editors.Status;
        }

        if ((fieldIsReadOnly) || (_thisGlobals.FormIsReadOnly)) {
            $theader.attr(_thisGlobals.DataAttr.Header.ReadOnlyEditorType, ed);
            ed = DCrmEditableGrid.Editors.None;
            $theader.attr(_thisGlobals.DataAttr.Header.ReadOnly, _thisGlobals.DataAttr.YES);
        }

        $theader.attr(_thisGlobals.DataAttr.Header.EditorType, ed)
            .attr('data-crmfieldtype', attrtype)
            .attr(_thisGlobals.DataAttr.Header.SchemaName, item.SchemaName.toLowerCase());

        if (item.DefaultValue) {
            $theader.attr(_thisGlobals.DataAttr.Header.DefaultValueForCreate, item.DefaultValue);
        }

        var $requireSpan = undefined;

        // Apply readonly fields icon to the header
        if (fieldIsReadOnly) {
            $('<span></span>')
                .addClass('lockedfield')
                .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.ReadOnly)
                .appendTo($theader);
        }

        if (requiered) {
            $requireSpan = $('<span>*</span>')
                .attr(_thisGlobals.ToolTipAttrName, _thisGlobals.Translation_Labels.LockedField)
                .addClass('Requiered')
                .appendTo($theader);
            $theader.attr(_thisGlobals.DataAttr.Header.Required, _thisGlobals.DataAttr.YES);
        } else {
            $theader.attr(_thisGlobals.DataAttr.Header.Required, _thisGlobals.DataAttr.NO);
        }

        var $firstSpan = $('<span class="headertitle"></span>')
            .text(item.Name)
            .attr(_thisGlobals.ToolTipAttrName, item.Name)
            .appendTo($theader);

        if (InitialSortData.FirstField) {
            if (InitialSortData.FirstField.Attribute == item.SchemaName) {
                if (InitialSortData.FirstField.Descending) {
                    $firstSpan.addClass("headerSortDown");
                    $theader[0].InitialSortOrder = "desc";
                } else {
                    $firstSpan.addClass("headerSortUp");
                    $theader[0].InitialSortOrder = "asc";
                }
                $theader[0].order = _thisHelpers.FormatSortingOrder($theader[0].InitialSortOrder);
            } else {
                $theader[0].order = _thisHelpers.FormatSortingOrder(_thisGlobals.DefaultGridOptions.sortInitialOrder);
            }
        } else {
            $theader[0].order = _thisHelpers.FormatSortingOrder(_thisGlobals.DefaultGridOptions.sortInitialOrder);
        }

        if (InitialSortData.SecondField) {
            if (InitialSortData.SecondField.Attribute == item.SchemaName) {
                if (InitialSortData.SecondField.Descending) {
                    $firstSpan.addClass("headerSortDown");
                    $theader[0].InitialSortOrder = "desc";
                } else {
                    $firstSpan.addClass("headerSortUp");
                    $theader[0].InitialSortOrder = "asc";
                }
                $theader[0].order = _thisHelpers.FormatSortingOrder($theader[0].InitialSortOrder);
            } else {
                $theader[0].order = _thisHelpers.FormatSortingOrder(_thisGlobals.DefaultGridOptions.sortInitialOrder);
            }
        }

        $theader[0].count = $theader[0].order;
        $theader.addClass(_thisGlobals.DefaultGridOptions.cssHeader);

        if (data.DisplayHeaderFilter) {
            var filterclass = 'recfilter';
            if (filterIndexes.ExactMatchExists(headerIndex)) {
                filterclass += ' recfilterset';
            } else {
                filterclass += ' recfilternotset';
            }

            var $recFilter = $('<span></span>')
                .attr(_thisGlobals.ToolTipAttrName, "Filter")
                .attr('id', _thisHelpers.GenerateUUID())
                .addClass(filterclass)
                .appendTo($theader);
        }

        var PrecisionData = undefined;
        if ((attrtype == _thisGlobals.CrmFieldTypes.DecimalType) ||
            (attrtype == _thisGlobals.CrmFieldTypes.DoubleType) ||
            (attrtype == _thisGlobals.CrmFieldTypes.MoneyType)) {

            PrecisionData = {
                PrecisionSource: 0,
                UserPrecision: _thisGlobals.userCurrencySettings.CurrencyDecimalPrecision,
                CurrencyPrecision: undefined,
                PricinPrecision: 2,
                FieldPrecision: item.Precision,
                EntitySchemaName: data.Entity.SchemaName,
                FieldSchemaName: item.SchemaName,
                HeaderIndex: (headerIndex + 1)
            };
            //    // PrecisionSource 0 (custom 0-x)
            //    // PrecisionSource 2 (currency percision)
            //    // PrecisionSource 1 (Pricing decimal precision) assume 2
            $theader.attr(_thisGlobals.DataAttr.Header.Precision, PrecisionData.FieldPrecision)
                .attr(_thisGlobals.DataAttr.Header.PrecisionSource, PrecisionData.PrecisionSource);
        }

        // Add footer cell
        var $footercellInner = $('<td></td>')
            .addClass('tfooterdummy')
            .attr(_thisGlobals.DataAttr.Cell.FooterCell, _thisGlobals.DataAttr.NO)
            .attr(_thisGlobals.DataAttr.Header.SchemaName, item.SchemaName.toLowerCase())
            .appendTo($footer);
        // Allow aggreagte button to be visible
        if ((data.DisplaySum) && ((ed == DCrmEditableGrid.Editors.Numeric) ||
            (ed == DCrmEditableGrid.Editors.Decimal) ||
            (ed == DCrmEditableGrid.Editors.Double) ||
            (ed == DCrmEditableGrid.Editors.Currency))) {
            $("<img title='" + _thisGlobals.Translation_Labels.AggregateFunctions + "' class='aggregate'></img><span class='footercelltext'></span>").appendTo($footercellInner);
        } else {
            $("<span class='footercelltext'></span>").appendTo($footercellInner);
        }

        ceditors.push({
            editor: ed,
            ParentEntityName: data.Entity.Label,
            ParentEntitySchemaname: data.Entity.SchemaName,
            FieldLabel: item.Name,
            FieldSchemaName: item.SchemaName.toLowerCase(),

            RequireValue: requiered,
            validator: ValidateEditor,

            HeaderIdToUpdate: headerIdToUpdate,
            CheckText: booleanCheckText,
            UncheckedText: booleanUncheckedText,
            OptionSetData: opSetData,

            LookupData: lookupSetData,

            MaxLength: item.MaxLength,
            Format: item.Format,
            MaxValue: item.MaxValue,
            MinValue: item.MinValue,
            Precision: PrecisionData,
            RealWidth: item.RealWidth
        });
    }

    return new GridLoaderHelper(data, ContainerIds, ceditors, parentChildLookupInfo, NumericFields, parentcontainer);
}

function ParentGridSelectedRecord(data, parentdiv, deleteSubgrid) {
    try {
        var config = FindGridConfigByGridID(data.activeOptions.ConfigID);
        var tt = undefined;

        if (deleteSubgrid) {
            var tableParentId = undefined;
            for (var i = 0; i < config.ChildConfigurations.length; i++) {
                tt = config.ChildConfigurations[i].ThisGrid;
                if (tt) {
                    var ids = tt.activeOptions.GridContainerIds;
                    tableParentId = parentdiv || tt.ParentDivContainer;
                    // When called from parent, will have tableParentId value
                    if (ids.ParentGridDivContainer == tableParentId) {
                        // Has subgrids
                        if (config.ChildConfigurations[i].length > 0) {
                            LogIt("Grid has subgrid");
                            ParentGridSelectedRecord(tt, undefined, true);
                            config.ChildConfigurations[i].ThisGrid = undefined;
                        }

                        $('#' + ids.TableCaptionContainer).empty().remove();
                        $('#' + ids.Table).empty().remove();

                        for (var i = 0; i < tt.GridEditors.length; i++) {
                            if (tt.GridEditors[i] != null) {
                                tt.GridEditors[i].DestroyEditor();
                            }
                        }

                        tt.DestroyGrid();
                    }
                }
            }

        } else {

            var insertAfter = parentdiv || data.mainTable;
            for (var i = 0; i < config.ChildConfigurations.length; i++) {
                CreateAndPopulateGrid(config.ChildConfigurations[i], insertAfter,
                    data.SelectedRecordGuid, null);

                if (i > 0) {
                    $('<div></div>')
                        .addClass('gridSpacerDiv')
                        .insertBefore($('#' + tt.activeOptions.GridContainerIds.TableCaptionContainer));
                }
            }

        }
    } catch (e) {
        LogEx("Creating a child grid failed. " + e.message);
        //_thisHelpers.WaitDialog();
    }
}

function FindEntityGridInfo(schema, entitesInfo) {
    var result = undefined;
    for (var i = 0; i < entitesInfo.length; i++) {
        var tmp = entitesInfo[i].split(_thisGlobals._SEPERATOR);
        if (tmp[0] == schema) {
            result = tmp;
            break;
        }
    }
    return result;
}

function FindEntiyGridFields(schema, fields) {
    var result = undefined;
    for (var i = 0; i < fields.length; i++) {
        var tmp = fields[i].split(_thisGlobals._OuterSeperator);
        if (tmp[tmp.length - 1] == schema) {
            tmp.splice(tmp.length - 1, 1);
            result = tmp.join(_thisGlobals._OuterSeperator);
            break;
        }
    }
    return result;
}

function FindGridConfigByGridID(id, cloneit) {
    var foundit = undefined;

    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
        if (_thisGlobals.DCrmEGConfiguration[i].ConfigID == id) {
            foundit = _thisGlobals.DCrmEGConfiguration[i]; // Clone or actual ref ?? // jQuery.extend(true, {}, _thisGlobals.DCrmEGConfiguration[i]);
            break;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length > 0) {
            for (var ii = 0; ii < _thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length; ii++) {
                foundit = FindGridConfigByIdInner(_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations[ii], id);
                if (foundit) {
                    break;
                }
            }
        }
    }
    if ((foundit) && (cloneit)) {
        foundit = jQuery.extend(true, {}, foundit);
    }

    return foundit;
}

function FindGridConfigByIdInner(config, id) {
    var foundit = undefined;

    if (config.ConfigID == id) {
        foundit = config;
    } else if (config.ChildConfigurations.length > 0) {
        for (var ii = 0; ii < config.ChildConfigurations.length; ii++) {
            foundit = FindGridConfigByIdInner(config.ChildConfigurations[ii], id);
            if (foundit) {
                break;
            }
        }
    }

    return foundit;
}

function FindDCrmEGConfigurationBySchema(schemaname, cloneit) {
    var foundit = undefined;

    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
        if (_thisGlobals.DCrmEGConfiguration[i].Entity.SchemaName == schemaname) {
            foundit = _thisGlobals.DCrmEGConfiguration[i]; // Clone or actual ref ?? // jQuery.extend(true, {}, _thisGlobals.DCrmEGConfiguration[i]);
            break;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length > 0) {
            for (var ii = 0; ii < _thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length; ii++) {
                foundit = FindDCrmEGConfiguration(_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations[ii], schemaname);
                if (foundit) {
                    break;
                }
            }
        }
    }
    if ((foundit) && (cloneit)) {
        foundit = jQuery.extend(true, {}, foundit);
    }

    return foundit;
}

function FindDCrmEGConfiguration(config, schemaname) {
    var foundit = undefined;

    if (config.Entity.SchemaName == schemaname) {
        foundit = config;
    } else if (config.ChildConfigurations.length > 0) {
        for (var ii = 0; ii < config.ChildConfigurations.length; ii++) {
            foundit = FindDCrmEGConfiguration(config.ChildConfigurations[ii], schemaname);
            if (foundit) {
                break;
            }
        }
    }

    return foundit;
}

function GetLookupDisplayName(entitySchemaName, fieldSchemaName, uitype, guid) {
    var val = undefined;

    var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
          '<entity name="' + entitySchemaName + '">' +
          '<attribute name="' + fieldSchemaName + '" />' + 
          '<filter type="and">' +
                  '<condition attribute="' + fieldSchemaName + '" operator="eq" uitype="' + uitype + '" value="' + _thisHelpers.AddCurlyBrace(guid) + '" />' +
                '</filter>' +
                '</entity>' +
          '</fetch>';

    var result = XrmServiceToolkit.Soap.Fetch(fetch);

    if (result.length > 0) {
        val = result[0].attributes[fieldSchemaName].name;
    }

    return val;
}

function InlineFilterDataToStruct(schema, schemaindex, condition, operator, value, fetchop, fetchvalue, lookupguid, lookupuitype) {
    return {
        Schema: schema,
        SchemaIndex: schemaindex,
        Filter: condition,
        Operator: operator,
        Value: value,
        FecthOp: fetchop,
        FetchValue: fetchvalue,
        LookupGuid: lookupguid,
        LookupUiType: lookupuitype
    };
}

function FixDatesForFetch(tmpAval, Atype) {
    var tt = Atype || _thisGlobals.CrmFieldTypes.DateTimeType;
    if (tt == _thisGlobals.CrmFieldTypes.DateTimeType) {
        var ndate = new Date.parseDate(tmpAval);
        return ndate.getFullYear() + "-" + (ndate.getMonth() + 1) + "-" + ndate.getDate();
    }
    return tmpAval;
}

function ProcessFetchConditions(conditions, hasStatusField, FieldsSchemaNames) {
    Aret = {
        Filters: [],
        InlineFilters: [],
        HeaderIndexes: []
    };

    if ((conditions) && (conditions != 'undefined')) {
        var arr = conditions.split('[]');
        var Aattr = undefined,
            Aop = undefined,
            Aval = undefined,
            Atype = undefined,
            matchFieldSchema = false,
            tmpCondition = '',
            tmpStruc = null;
            schemaIndex = -1,
            fetchvalue = null,
            fetchop = null;

        /*
item [statecode||0||eq||Active||state||||statecode||State]
item [parentaccountid||00E339A4-1528-E611-80DD-08002738AA19;0EE339A4-1528-E611-80DD-08002738AA19||ne;ne||Litware, Inc. (sample);A. Datum Corporation (sample)||lookup||account;account||parentaccountid||Parent Account]
item [industrycode||6;7||ne;ne||Business Services;Consulting||picklist||||industrycode||Industry]
item [description||||not-null||||memo||||description||Description]
item [name||%-1%||contains;like||-1||string||||name||Account Name]
item [primarycontactid||68E339A4-1528-E611-80DD-08002738AA19||ne;ne||Nancy Anderson (sample)||lookup||contact||primarycontactid||Primary Contact]

schema  [statecode] schemaindex [-1] condition [<condition attribute="statecode" operator="eq" value="0" />] operator [eq] value [0] fetchop [eq] fetchvalue [null] lookupguid [undefined] lookupUiType [undefined] dcrmeg_dcrmeg:8322:5
schema  [parentaccountid] schemaindex [7] condition [<condition attribute="parentaccountid" operator="not-in"><value uiname="Litware, Inc. (sample)" uitype="account">{00E339A4-1528-E611-80DD-08002738AA19}</value><value uiname="A. Datum Corporation (sample)" uitype="account">{0EE339A4-1528-E611-80DD-08002738AA19}</value></condition>] operator [ne] value [Litware, Inc. (sample)] fetchop [ne] fetchvalue [null] lookupguid [00E339A4-1528-E611-80DD-08002738AA19] lookupUiType [account] dcrmeg_dcrmeg:8322:5
schema  [industrycode] schemaindex [5] condition [<condition attribute="industrycode" operator="not-in"><value>6</value><value>7</value></condition>] operator [ne] value [6] fetchop [ne] fetchvalue [null] lookupguid [undefined] lookupUiType [undefined] dcrmeg_dcrmeg:8322:5
schema  [description] schemaindex [3] condition [<condition attribute="description" operator="not-null" />] operator [not-null] value [undefined] fetchop [undefined] fetchvalue [undefined] lookupguid [undefined] lookupUiType [undefined] dcrmeg_dcrmeg:8322:5
schema  [name] schemaindex [0] condition [<condition attribute="name" operator="like" value="%-1%" />] operator [contains] value [%-1%] fetchop [like] fetchvalue [%{0}] lookupguid [undefined] lookupUiType [undefined] dcrmeg_dcrmeg:8322:5
schema  [primarycontactid] schemaindex [-1] condition [<condition attribute="primarycontactid" operator="ne" value="{68E339A4-1528-E611-80DD-08002738AA19}" uiname="Nancy Anderson (sample) uitype="contact" />] operator [ne] value [Nancy Anderson (sample)] fetchop [ne] fetchvalue [null] lookupguid [{68E339A4-1528-E611-80DD-08002738AA19}] lookupUiType [contact]

         */

        try {
            $.each(arr, function (index, item) {
                var items = item.split('||');

                if (items.length == 1) {
                    return;
                }

                tmpCondition = '';
                tmpStruc = null;

                Aattr = items[0];

                Aop = items[2]; // eq or (contains;like)
                if (Aop.contains(';')) {
                    var d = Aop.split(';');
                    Aop = d[0];
                    fetchop = d[1];
                } else {
                    fetchop = Aop;
                }

                Aval = ((items[1]) && (items[1] != 'undefined')) ? items[1] : '';
                Atype = items[4];

                var uitypes = ((items[5]) && (items[5].length > 0)) ? items[5].split(';') : [];
                var uinames = ((items[3]) && (items[3].length > 0)) ? items[3].split(';') : [];

                schemaIndex = FieldsSchemaNames.MatchExists(Aattr);
                matchFieldSchema = (schemaIndex !== -1);
                if (matchFieldSchema) {
                    Aret.HeaderIndexes.push(schemaIndex);
                }

                fetchvalue = null;
                if (Aval.startsWith('%')) {
                    fetchvalue = '%{0}';
                } else if (Aval.endsWith('%')) {
                    if (fetchvalue != null) {
                        fetchvalue += '%';
                    } else {
                        fetchvalue = '{0}%';
                    }
                }

                if (Aval.contains(';')) {

                    var inarg = Aval.split(';');
                    tmpCondition = '<condition attribute="' + Aattr + '" operator="' + ((fetchop == 'eq') ? 'in' : 'not-in') + '">';

                    for (var i = 0; i < inarg.length; i++) {
                        if ((Atype == _thisGlobals.CrmFieldTypes.LookupType) ||
                            (Atype == _thisGlobals.CrmFieldTypes.CustomerType) ||
                            (Atype == _thisGlobals.CrmFieldTypes.OwnerType)) {
                            tmpCondition += '<value uiname="' + uinames[i] + '" uitype="' + uitypes[i] + '">'
                                + _thisHelpers.AddCurlyBrace(inarg[i]) + '</value>';
                        } else {
                            tmpCondition += '<value>' + FixDatesForFetch(inarg[i], Atype) + '</value>';
                        }
                    }
                    tmpCondition += '</condition>';

                    if (matchFieldSchema) {
                        if ((Atype == _thisGlobals.CrmFieldTypes.LookupType) ||
                            (Atype == _thisGlobals.CrmFieldTypes.CustomerType) ||
                            (Atype == _thisGlobals.CrmFieldTypes.OwnerType)) {
                            tmpStruc = InlineFilterDataToStruct(Aattr, schemaIndex, tmpCondition, Aop, uinames.join(';'), fetchop, fetchvalue, Aval, uitypes.join(';'));
                        } else {
                            tmpStruc = InlineFilterDataToStruct(Aattr, schemaIndex, tmpCondition, Aop, Aval, fetchop, fetchvalue);
                        }
                        Aret.InlineFilters.push(tmpStruc);
                    } else {
                        Aret.Filters.push(tmpCondition);
                    }

                } else if (Aval.length == 0) {
                    tmpCondition = '<condition attribute="' + Aattr + '" operator="' + fetchop + '" />';
                    if (matchFieldSchema) {
                        tmpStruc = InlineFilterDataToStruct(Aattr, schemaIndex, tmpCondition, Aop, null, fetchop);
                        Aret.InlineFilters.push(tmpStruc);
                    } else {
                        Aret.Filters.push(tmpCondition);
                    }
                } else {
                    if ((Atype == _thisGlobals.CrmFieldTypes.LookupType) ||
                        (Atype == _thisGlobals.CrmFieldTypes.CustomerType) ||
                        (Atype == _thisGlobals.CrmFieldTypes.OwnerType)) {
                            Aval = _thisHelpers.AddCurlyBrace(Aval);
                    }

                    var u = '';
                    if (uitypes.length > 0) {
                        u = ' uiname="' + uinames[0] + '" uitype="' + uitypes[0] + '"';
                    }
                    tmpCondition = '<condition attribute="' + Aattr + '" operator="' + fetchop + '" value="' + FixDatesForFetch(Aval, Atype) + '"' + u + ' />';

                    if (matchFieldSchema) {

                        if (fetchvalue) {
                            Aval = Aval.replace(/%/g, '');
                        }

                        if ((Atype == _thisGlobals.CrmFieldTypes.LookupType) ||
                            (Atype == _thisGlobals.CrmFieldTypes.CustomerType) ||
                            (Atype == _thisGlobals.CrmFieldTypes.OwnerType)) {
                            tmpStruc = InlineFilterDataToStruct(Aattr, schemaIndex, tmpCondition, Aop, uinames[0], fetchop, fetchvalue, Aval, uitypes[0]);
                        } else {
                            tmpStruc = InlineFilterDataToStruct(Aattr, schemaIndex, tmpCondition, Aop, Aval, fetchop, fetchvalue);
                        }

                        Aret.InlineFilters.push(tmpStruc);
                    } else {
                        Aret.Filters.push(tmpCondition);
                    }
                }
            });
        } catch (conde) {
            LogEx("Exception: unable to get field conditions. " + conde.message);

            if (hasStatusField) {
                Aret.Filters.push('<condition attribute="statecode" operator="eq" value="0" />');
            }
        }

    } else if (hasStatusField) {
        schemaIndex = FieldsSchemaNames.MatchExists('statecode');
        tmpStruc = InlineFilterDataToStruct('statecode', schemaIndex, '<condition attribute="statecode" operator="eq" value="0" />'
            , 'eq', '0', null, null);
        if (schemaIndex != -1) {
            Aret.InlineFilters.push(tmpStruc);
            Aret.HeaderIndexes.push(schemaIndex);
        } else {
            Aret.Filters.push('<condition attribute="statecode" operator="eq" value="0" />');
        }
    }

    return Aret;
}

function GetFilterUIStruc(fieldtype) {
    var id = null;
    switch (fieldtype) {
        case DCrmEditableGrid.Editors.Text:
        case DCrmEditableGrid.Editors.Description:
            id = { div: '#fieldfilter_stringcontainer', id: "#fieldfilter_stringconditions", input: '#fieldfilter_stringinput', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true };
            break;
        case DCrmEditableGrid.Editors.DateTimePicker:
        case DCrmEditableGrid.Editors.DatePicker:
            id = { div: '#fieldfilter_datetimecontainer', id: "#fieldfilter_datetimeconditions", input: '#fieldfilter_calendarinput', SelectedOptionValue: 'on', FetchOp: 'on', ShowDate: true };
            break;
        case DCrmEditableGrid.Editors.Lookup:
            id = { div: '#fieldfilter_lookupcontainer', id: "#fieldfilter_lookupconditions", input: '#fieldfilter_lookupinput', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true, ShowLookupBtn: true };
            break;
        case DCrmEditableGrid.Editors.OwnerType:
            id = { id: "#fieldfilter_systemuserlookup", input: '#fieldfilter_lookupinput', SelectedOptionValue: 'eq-userid' };
            break;
        //case DCrmEditableGrid.Editors.CustomerType:
        //    id = { id: "#fieldfilter_customerlookup", input: '#fieldfilter_lookupinput', SelectedOptionValue: 'eq', ShowInput: true, ShowLookupBtn: true };
        //    break;
        case DCrmEditableGrid.Editors.Checkbox:
        case DCrmEditableGrid.Editors.OptionSet:
        case DCrmEditableGrid.Editors.Status:
            id = { div: '#fieldfilter_optionsetcontainer', id: "#fieldfilter_optionsetconditions", input: '#fieldfilter_optionsetselect', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true, ShowSelectBtn: true };
            break;
        case DCrmEditableGrid.Editors.Decimal:
        case DCrmEditableGrid.Editors.Double:
        case DCrmEditableGrid.Editors.Currency:
        case DCrmEditableGrid.Editors.Numeric:
            id = { div: '#fieldfilter_numericcontainer', id: "#fieldfilter_numericconditions", input: '#fieldfilter_stringinput', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true };
            break;
        default:
            LogEx("Exception: No field type retrieved: " + fieldtype);
            break;
    }
    return id;
}

function GetFilterContainer(fieldtype) {
    var id = null;
    switch (fieldtype) {
        case _thisGlobals.CrmFieldTypes.TextType:
        case _thisGlobals.CrmFieldTypes.MemoType:
            id = { div: '#fieldfilter_stringcontainer', id: "#fieldfilter_stringconditions", input: '#fieldfilter_stringinput', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true };
            break;
        case _thisGlobals.CrmFieldTypes.DateTimeType:
            id = { div: '#fieldfilter_datetimecontainer', id: "#fieldfilter_datetimeconditions", input: '#fieldfilter_calendarinput', SelectedOptionValue: 'on', FetchOp: 'on', ShowDate: true };
            break;
        case _thisGlobals.CrmFieldTypes.LookupType:
            id = { div: '#fieldfilter_lookupcontainer', id: "#fieldfilter_lookupconditions", input: '#fieldfilter_lookupinput', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true, ShowLookupBtn: true };
            break;
        case _thisGlobals.CrmFieldTypes.OwnerType:
            id = { id: "#fieldfilter_systemuserlookup", input: '#fieldfilter_lookupinput', SelectedOptionValue: 'eq-userid' };
            break;
        case _thisGlobals.CrmFieldTypes.BooleanType:
        case _thisGlobals.CrmFieldTypes.OptionSetType:
        case _thisGlobals.CrmFieldTypes.State:
        case _thisGlobals.CrmFieldTypes.Status:
            id = { div: '#fieldfilter_optionsetcontainer', id: "#fieldfilter_optionsetconditions", input: '#fieldfilter_optionsetselect', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true, ShowSelectBtn: true };
            break;
        case _thisGlobals.CrmFieldTypes.DecimalType:
        case _thisGlobals.CrmFieldTypes.MoneyType:
        case _thisGlobals.CrmFieldTypes.IntegerType:
        case _thisGlobals.CrmFieldTypes.DoubleType:
            id = { div: '#fieldfilter_numericcontainer', id: "#fieldfilter_numericconditions", input: '#fieldfilter_stringinput', SelectedOptionValue: 'eq', FetchOp: 'eq', ShowInput: true };
            break;
        default:
            LogEx("Exception: No field type retrieved: " + fieldtype);
            break;
    }
    return id;
}

//function GetDcrmEgGrid(schemaname) {
//    var config = FindDCrmEGConfigurationBySchema(schemaname);
//    if (config) {
//        return config.ThisGrid;
//    }
//    return null;
//}

var GridLoaderHelper = (function () {
    function GridLoaderHelper(data, ContainerIds, ceditors, parentChildLookupInfo, NumericFields, parentcontainer) {
        var self = this;

        self.data = data;
        self.ContainerIds = ContainerIds;
        self.ceditors = ceditors;
        self.parentChildLookupInfo = parentChildLookupInfo;
        self.NumericFields = NumericFields;
        self.Grid = undefined;
        self.PrimaryIdAttribute = null;
        self.PrimaryNameAttribute = null;
        self.DataLoadErrorMessage = "Unable to load the grid data due to exceptions:\r\n";
        self.TableVisible = false;

        self.TotalRecordCount = -1;

        self.CallbackErrorHandler = function (errorMsg) {
            DisplayCrmAlertDialog(self.DataLoadErrorMessage + errorMsg);
            _thisHelpers.WaitDialog();
        };

        self.RecordCallback = function (fieldsresult, hasMoreRecords, pagingCookie) {

            try {
                var EntityCurrencyid = undefined;
                if ((pagingCookie == undefined) || (pagingCookie == "undefined")) {
                    pagingCookie = null;
                }

                if ((fieldsresult) && (fieldsresult.length) && (fieldsresult.length > 0)) {

                    if ((fieldsresult[0].attributes['transactioncurrencyid']) &&
                        (fieldsresult[0].attributes['transactioncurrencyid'].id) &&
                        (fieldsresult[0].attributes['transactioncurrencyid'].id.length)) {
                        EntityCurrencyid = fieldsresult[0].attributes['transactioncurrencyid'].id;
                    }

                    var extraRowHeight = '';
                    var $tbody = $('#' + self.ContainerIds.Table).find('tbody:first');
                    var $tr, $td = undefined;
                    var fval = '';
                    var tmpLcase = '';
                    var selectedOptionsetValue = undefined;

                    try {
                        if (_thisGlobals.xrmPage.context.client.getClient() == "Mobile") {
                            extraRowHeight = ' style="height:30px;"';
                        }
                    } catch (e) {
                    }

                    var formatOptions = self.data.GetFormattingOptions();
                    var even = true;

                    for (var i = 0; i < fieldsresult.length; i++) {
                        var item = fieldsresult[i];

                        $tr = $('<tr' + extraRowHeight + '></tr>').attr(_thisGlobals.DataAttr.Cell.RecordGuid, item.id).appendTo($tbody);

                        even = (i % 2 == 0);
                        if ((!even) && (formatOptions.EvenRows)) {
                            $tr.css('background-color', formatOptions.EvenRows);
                        } else if ((even) && (formatOptions.OddRows)) {
                            $tr.css('background-color', formatOptions.OddRows);
                        }

                        var callbackRowData = { RecordGuid: item.id, Fields: [], RowIndex: i };

                        for (var iinner = 0; iinner < self.data.SelectedFields.length; iinner++) {
                            var inneritem = self.data.SelectedFields[iinner];
                            var inneritemSchemaName = inneritem.SchemaName.toLowerCase();
                            tmpLcase = inneritem.AttrType.toLowerCase();
                            fval = '';
                            selectedOptionsetValue = undefined;

                            var callbackField = {};
                            callbackField.ReadOnly = false;
                            callbackField.SchemaName = inneritemSchemaName;
                            callbackField.FieldType = tmpLcase;
                            callbackField.FieldIndex = iinner;
                            callbackField.BackgroundColor = null;
                            callbackField.ForgroundColor = null;

                            if ((tmpLcase == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.BooleanType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.MoneyType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.DecimalType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.DoubleType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.IntegerType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.State) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.Status)) {

                                if (item.attributes[inneritemSchemaName]) {
                                    fval = item.attributes[inneritemSchemaName].formattedValue;

                                    callbackField.Value = item.attributes[inneritemSchemaName].value;

                                    if ((tmpLcase == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                                        (tmpLcase == _thisGlobals.CrmFieldTypes.State) ||
                                        (tmpLcase == _thisGlobals.CrmFieldTypes.Status)) {
                                        selectedOptionsetValue = item.attributes[inneritemSchemaName].value;

                                        callbackField.Value = selectedOptionsetValue;
                                    }
                                }
                            } else if ((tmpLcase == _thisGlobals.CrmFieldTypes.LookupType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.CustomerType) || (tmpLcase == _thisGlobals.CrmFieldTypes.OwnerType)) {

                                if (item.attributes[inneritemSchemaName]) {
                                    fval = item.attributes[inneritemSchemaName].name || '';

                                    self.ceditors[iinner].LookupData.LookupId = item.attributes[inneritemSchemaName].id || '';
                                    self.ceditors[iinner].LookupData.LookupLogicalName = item.attributes[inneritemSchemaName].logicalName;
                                    self.ceditors[iinner].LookupData.LookupName = fval;

                                    callbackField.LookupGuid = self.ceditors[iinner].LookupData.LookupId;
                                    callbackField.LookupLogicalName = self.ceditors[iinner].LookupData.LookupLogicalName;
                                    callbackField.LookupName = fval;
                                    callbackField.Value = fval;
                                }

                            } else if ((tmpLcase == _thisGlobals.CrmFieldTypes.TextType) || (tmpLcase == _thisGlobals.CrmFieldTypes.MemoType)) {
                                if (item.attributes[inneritemSchemaName]) {
                                    fval = item.attributes[inneritemSchemaName].value;

                                    callbackField.Value = fval;
                                    callbackField.Format = self.ceditors[iinner].Format;

                                    if (((self.ceditors[iinner].Format == 'Text') || (self.ceditors[iinner].Format == 'Phone'))
                                        && (_thisHelpers.IsvalidPhoneNumber(fval + ''))) {

                                        ceditors[iinner].Format = "Phone";
                                    }
                                }
                            } else if (tmpLcase == _thisGlobals.CrmFieldTypes.DateTimeType) {
                                if (item.attributes[inneritemSchemaName]) {
                                    fval = item.attributes[inneritemSchemaName].formattedValue;

                                    callbackField.Value = fval;
                                }
                            }

                            if (fval.length > 0) {
                                callbackField.FormattedValue = fval;
                            }
                            // Add cell
                            $td = $('<td></td>')
                                .attr(_thisGlobals.DataAttr.Cell.RecordGuid, item.id)
                                .attr(_thisGlobals.ToolTipAttrName, fval)
                                .html('<span class="fieldcelltext" '
                                    + _thisGlobals.ToolTipAttrName + '="' + fval + '">' + fval + '</span>')
                                .appendTo($tr);

                            var headerformatOptions = formatOptions.GetHeader(inneritemSchemaName);
                            var cellformatOptions = formatOptions.GetField(inneritemSchemaName);

                            if ((headerformatOptions) && (headerformatOptions.ApplyToColumn)) {
                                // BackgroundColor: null, TextColor: null, FontCss: null, ApplyToColumn: false };
                                if ((headerformatOptions.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != headerformatOptions.BackgroundColor)) {
                                    $td.css("background-color", headerformatOptions.BackgroundColor);
                                }
                                if ((headerformatOptions.TextColor) && (_thisGlobals.DefaultBackgroundColor != headerformatOptions.TextColor)) {
                                    $td.css("color", headerformatOptions.TextColor);
                                }
                                if (headerformatOptions.FontCss) {
                                    DeccoupleCss(headerformatOptions.FontCss, $td);
                                }
                            }

                            if (cellformatOptions) {
                                // BackgroundColor: null, TextColor: null, FontCss: null, Condition: {Operator: null, Value: null, Guid: null} };
                                if ((cellformatOptions.Condition) && (ConditionIsTrue(cellformatOptions.Condition, tmpLcase, callbackField))) {
                                    if ((cellformatOptions.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != cellformatOptions.BackgroundColor)) {
                                        $td.css("background-color", cellformatOptions.BackgroundColor);
                                    }
                                    if ((cellformatOptions.TextColor) && (_thisGlobals.DefaultBackgroundColor != cellformatOptions.TextColor)) {
                                        $td.css("color", cellformatOptions.TextColor);
                                    }
                                    if (cellformatOptions.FontCss) {
                                        DeccoupleCss(cellformatOptions.FontCss, $td);
                                    }
                                }
                            }

                            if ((tmpLcase == _thisGlobals.CrmFieldTypes.TextType) && (self.ceditors[iinner].Format)) {
                                $td.attr(_thisGlobals.DataAttr.Cell.Format, self.ceditors[iinner].Format.toLowerCase());
                            }

                            if (self.ceditors[iinner].LookupData) {
                                $td.attr(_thisGlobals.DataAttr.Cell.Lookup.Guid, self.ceditors[iinner].LookupData.LookupId)
                                    .attr(_thisGlobals.DataAttr.Cell.Lookup.LogicalName, self.ceditors[iinner].LookupData.LookupLogicalName)
                                    .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, self.ceditors[iinner].LookupData.LookupId)
                                    .attr(_thisGlobals.DataAttr.Cell.Lookup.OriginalLogicalName, self.ceditors[iinner].LookupData.LookupLogicalName);

                            } else if ((tmpLcase == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                                        (tmpLcase == _thisGlobals.CrmFieldTypes.State) ||
                                        (tmpLcase == _thisGlobals.CrmFieldTypes.Status)) {
                                $td.attr(_thisGlobals.DataAttr.Cell.Optionset.SelectedValue, selectedOptionsetValue + '')
                                    .attr(_thisGlobals.DataAttr.Cell.OriginalAttrValue, selectedOptionsetValue + '');
                            }

                            if ((tmpLcase == _thisGlobals.CrmFieldTypes.MoneyType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.DecimalType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.DoubleType) ||
                                (tmpLcase == _thisGlobals.CrmFieldTypes.IntegerType)) {
                                $td.addClass("NumericTextbox");
                            }

                            callbackRowData.Fields.push(callbackField);
                        }

                        FireGridRowOnload($tr, callbackRowData,
                            { ParentEntityName: self.data.Entity.Label, ParentEntitySchemaname: self.data.Entity.SchemaName });

                    }

                    var psize = parseInt(self.data.RecordsPerPage);
                    if (self.TotalRecordCount <= psize) {
                        $('#' + self.ContainerIds.Pager).hide();
                    }

                } else {
                    $('#' + self.ContainerIds.TotalRecords).text(_thisGlobals.Translation_Labels.TotalRecords + ' 0');
                    $('#' + self.ContainerIds.Pager).hide();
                }

                var options = {
                    ConfigID: self.data.ConfigID,

                    HasChildGrids: (self.data.ChildConfigurations.length > 0) ? true : false,
                    Country: _thisGlobals.DefaultCountry,

                    GridContainerIds: self.ContainerIds,
                    columneditors: self.ceditors,

                    EntityCurrencyid: EntityCurrencyid,
                    EntityCurrencySymbol: undefined,
                    EntityCurrencyPrecision: undefined,

                    ParentEntityInfo: {
                        ParentEntityName: self.data.Entity.Label,
                        ParentEntitySchemaname: self.data.Entity.SchemaName,
                        PrimaryIdAttribute: self.PrimaryIdAttribute,
                        PrimaryNameAttribute: self.PrimaryNameAttribute
                    },
                    ParentChildLookupInfo: self.parentChildLookupInfo,

                    PagerSize: (parseInt(self.data.RecordsPerPage)),
                    TotalRecordsCount: self.TotalRecordCount,
                    Page: 1,
                    HasMoreRecords: hasMoreRecords,
                    PagingCookie: pagingCookie,
                    PagingCookies: [pagingCookie],

                    HasStatusField: ((self.data.HasStatusField) ? true : false),

                    RequiredErrorContainer: "validationerror",
                    InputFormatErrorContainer: 'inputformaterror',
                    ParentFormIsReadOnly: _thisGlobals.FormIsReadOnly,

                    UserCanDelete: self.data.AllowDelete,
                    UserCanUpdate: !_thisGlobals.FormIsReadOnly,

                    DisplayCloneRecordButton: self.data.DisplayCloneRecordButton,
                    DisplayCloneRecord: self.data.DisplayCloneRecord,
                    DisplaySetRecordState: self.data.DisplaySetRecordState,
                    DisplayFieldsSum: self.data.DisplaySum,
                    HaveNumericFields: self.NumericFields,
                    AutoSaveChanges: self.data.AutoSaveChanges,
                    AllowDelete: self.data.AllowDelete,
                    DistinctValues: self.data.DistinctValues,
                    RefreshAfterCreate: self.data.RefreshAfterCreate,
                    RefreshAfterSave: self.data.RefreshAfterSave,
                    NewBtnBehavoir: self.data.NewBtnBehavoir,
                    BooleanEditorBehavoir: self.data.BooleanEditorBehavoir,
                    OpenRecordBehavoir: self.data.OpenRecordBehavoir,
                    DateTimeMinuteStep: self.data.DateTimeMinuteStep
                };

                self.Grid = new CrmEditableGrid($('#' + self.ContainerIds.Table), options);
                var config = FindGridConfigByGridID(self.data.ConfigID);

                config.ThisGrid = self.Grid;
                config.ParentDivContainer = parentcontainer.attr('id');
            } catch (e) {
                DisplayCrmAlertDialog(self.DataLoadErrorMessage + e.message);
            }

            _thisHelpers.WaitDialog();
        };
        
        self.RecordCountCallback = function (result) {
            if ((result) && (result.length) && (result.length > 0)) {
                self.TotalRecordCount = result[0].attributes["count"].value;

                $('#' + self.ContainerIds.TotalRecords).text(_thisGlobals.Translation_Labels.TotalRecords + ' ' + self.TotalRecordCount);
            }

            XrmServiceToolkit.Soap.Fetch(self.data.GetFetchXml(), false, self.RecordCallback, self.CallbackErrorHandler);
        };

        self.GetEntityCount = function () {
            var filters = self.data.GetFetchXmlFilters();
            var distinctRecs = (self.data.DistinctValues ? ' distinct="true"' : '');
            var fetchXml =
                '<fetch mapping="logical" aggregate="true">' +
                    '<entity name="' + self.data.Entity.SchemaName + '">' +
                        '<attribute name="' + self.PrimaryIdAttribute + '" aggregate="countcolumn"' + distinctRecs + ' alias="count" />';
            if (filters.length > 0) {
                fetchXml += filters;
            }
            fetchXml += "</entity>" +
                "</fetch>";
            XrmServiceToolkit.Soap.Fetch(fetchXml, false, self.RecordCountCallback, self.CallbackErrorHandler);
        };

        self.GetPrimaryAttributesCallback = function (entityMetaData) {
            if (entityMetaData && entityMetaData.length === 1) {
                self.PrimaryIdAttribute = entityMetaData[0].PrimaryIdAttribute;
                self.PrimaryNameAttribute = entityMetaData[0].PrimaryNameAttribute;
            }
            self.GetEntityCount();
        };

        self.RetreiveEntityMetadateCallback = function (result) {
            if ((result) && (result.length) && (result.length > 0)) {
                var $headers = $('#' + self.ContainerIds.Table).find(_thisGlobals.DefaultGridOptions.selectorHeaders);

                try {
                    var fieldexclusion = ['createdonbehalfby', 'exchangerate', 'importsequencenumber', 'modifiedonbehalfby', 'overriddencreatedon', 'owningbusinessunit', 'owningteam', 'owninguser', 'timezoneruleversionnumber', 'utcconversiontimezonecode', 'versionnumber'];
                    var attrTypeExclusion = ["lookup", "boolean", "picklist", "datetime", "string", "memo", "integer", "double", "decimal", "money", "customer", "owner", "state", "status"];

                    var schName = '';
                    var attrType = '';
                    var lbl = '';
                    var SelectedFields = self.data.SelectedFields;

                    for (index = 0, j = result[0].Attributes.length; index < j; index++) {
                        ent = result[0].Attributes[index];

                        if (ent.AttributeOf == null) {
                            schName = ent.SchemaName.toLowerCase();
                            attrType = ent.AttributeType.toLowerCase();

                            if ((fieldexclusion.ExactMatchExists(schName) == false) && (attrTypeExclusion.ExactMatchExists(attrType) == true)) {

                                for (var iinner = 0; iinner < SelectedFields.length; iinner++) {
                                    if (schName == SelectedFields[iinner].SchemaName.toLowerCase()) {
                                        lbl = _thisHelpers.GetUserLocalizedLabel(ent.DisplayName, ent.LogicalName);
                                        if ((lbl == null) || (lbl == 'null') || (lbl.length == 0)) {
                                            lbl = schName.replace(/\b[a-z]/g, function (letter) {
                                                return letter.toUpperCase();
                                            });
                                        }
                                        _thisHelpers.SetHeaderCellText($($headers[iinner + 1]), lbl);
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    LogEx("unable to retreive entity metadata\r\n" + e.message);
                }
            }
        };

        // Get UserLocalized labels for headers, just in case language has changed
        // Get this primary id and name attribute names, normally (schemaname + id) and (name/subject/fullname)
        // There are exeptions. example: activitypointer -> activityid
        XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Attributes'],
            self.data.Entity.SchemaName, true, self.RetreiveEntityMetadateCallback);

        XrmServiceToolkit.Soap.RetrieveEntityMetadata("Entity",
            self.data.Entity.SchemaName, true, self.GetPrimaryAttributesCallback);
    }

    return GridLoaderHelper;
})();

function FireGridRowOnload(tr, data, info) {
    if (window.parent.DCrmEgGridRowOnload) {
        data.RowBackgroundColor = null;
        window.parent.DCrmEgGridRowOnload(data, info);

        if (data.RowBackgroundColor) {
            tr.css('background-color', data.RowBackgroundColor);
        }

        // disable any readonly fields
        for (var fIndex = 0; fIndex < data.Fields.length; fIndex++) {
            //if (data.Fields[fIndex].ReadOnly) {
                var ff = tr.find('td:eq(' + data.Fields[fIndex].FieldIndex + ')');
                if (ff) {
                    if (data.Fields[fIndex].ReadOnly) {
                        ff.attr('data-user-disabledfield', _thisGlobals.DataAttr.YES);
                    }

                    if (data.Fields[fIndex].BackgroundColor) {
                        ff.css('background-color', data.Fields[fIndex].BackgroundColor);
                    }
                    if (data.Fields[fIndex].ForgroundColor) {
                        ff.css('color', data.Fields[fIndex].ForgroundColor);
                    }
                }
            //}
        }
    }
}

function DeccoupleCss(css, elem, remove) {
    try {
        var arr = css.split(';');
        for (var i = 0; i < arr.length; i++) {
            if ((arr[i]) && (arr[i].length) && (arr[i].length > 0)) {
                var item = arr[i].split(":");
                if (remove) {
                    elem.css(item[0], "");
                } else {
                    elem.css(item[0], item[1]);
                }
            }
        }
    } catch (e) {
        LogEx("DeccoupleCss:css\r\n" + css + "\r\nerror:\r\n" + e.message);
    }
}

function ConditionIsTrue(condition, tmpLcase, callbackField) {
    var result = false;
    try {

        if ((callbackField.Value == undefined) || (callbackField.Value == 'undefined') ||
            (callbackField.Value == null) || (callbackField.Value == 'null')) {
            if ((condition.Operator != 'not-null') && (condition.Operator != 'null')) {
                return result;
            }
        }

        switch (condition.Operator) {
            case 'eq':
                //if ((tmpLcase == _thisGlobals.CrmFieldTypes.LookupType) ||
                //    (tmpLcase == _thisGlobals.CrmFieldTypes.CustomerType) ||
                //    (tmpLcase == _thisGlobals.CrmFieldTypes.OwnerType)) {
                //    result = (condition.Value == callbackField.Value) && (condition.Guid == callbackField.LookupGuid.replace('{', '').replace('}'));
                //}
                result = (condition.Value == callbackField.Value);
                break;
            case 'ne':
                result = (condition.Value != callbackField.Value);
                break;
            case 'contains':
                result = callbackField.Value.contains(condition.Value, true);
                break;
            case 'doesnotcontain':
                result = !callbackField.Value.contains(condition.Value, true);
                break;
            case 'beginswith':
                result = callbackField.Value.startsWith(condition.Value);
                break;
            case 'doesnotbeginwith':
                result = !callbackField.Value.startsWith(condition.Value);
                break;
            case 'endswith':
                result = callbackField.Value.endsWith(condition.Value);
                break;
            case 'doesnotendwith':
                result = !callbackField.Value.endsWith(condition.Value);
                break;
            case 'not-null':
                result = ((callbackField.Value != null) && (callbackField.Value != 'null') && (callbackField.Value != undefined) && (callbackField.Value != 'undefined') && (callbackField.Value.length > 0));
                break;
            case 'null':
                result = ((callbackField.Value == null) || (callbackField.Value == 'null') || (callbackField.Value == undefined) || (callbackField.Value == 'undefined') || (callbackField.Value.length == 0));
                break;
            case 'gt':
                result = callbackField.Value > condition.Value;
                break;
            case 'ge':
                result = callbackField.Value >= condition.Value;
                break;
            case 'lt':
                result = callbackField.Value < condition.Value;
                break;
            case 'le':
                result = callbackField.Value <= condition.Value;
                break;
            case 'eq-userid':
                result = callbackField.LookupGuid == _thisGlobals.LoggedInUserID.replace('{', '').replace('}');
                break;
            case 'ne-userid':
                result = callbackField.LookupGuid != _thisGlobals.LoggedInUserID.replace('{', '').replace('}');
                break;
            case 'on':
            case 'today':
                var d = new Date();
                var d2 = Date.parseDate(callbackField.Value);
                result = (d.getFullYear() == d2.getFullYear()) && (d.getMonth() == d2.getMonth()) && (d.getDate() == d2.getDate());
                break;
            case 'on-or-after':
                var d2 = Date.parseDate(condition.Value);
                var d = Date.parseDate(callbackField.Value);
                result = (d.getFullYear() >= d2.getFullYear()) && (d.getMonth() >= d2.getMonth()) && (d.getTime() >= d2.getTime());
                break;
            case 'on-or-before':
                var d2 = Date.parseDate(condition.Value);
                var d = Date.parseDate(callbackField.Value);
                result = (d.getFullYear() <= d2.getFullYear()) && (d.getMonth() <= d2.getMonth()) && (d.getTime() <= d2.getTime());
                break;
            case 'yesterday':
                var d = new Date();
                d.setDate(d.getDate() - 1);
                var d2 = Date.parseDate(callbackField.Value);
                result = (d.getFullYear() == d2.getFullYear()) && (d.getMonth() == d2.getMonth()) && (d.getDate() == d2.getDate());
                break;
            case 'tomorrow':
                var d = new Date();
                d.setDate(d.getDate() + 1);
                var d2 = Date.parseDate(callbackField.Value);
                result = (d.getFullYear() == d2.getFullYear()) && (d.getMonth() == d2.getMonth()) && (d.getDate() == d2.getDate());
                break;
            case 'next-seven-days':
                var d = new Date();
                d.setDate(d.getDate() + 7);
                var d2 = Date.parseDate(callbackField.Value);
                result = (d.getFullYear() == d2.getFullYear()) && (d.getMonth() == d2.getMonth()) && (d.getDate() == d2.getDate());
                break;
            case 'last-seven-days':
                var d = new Date();
                d.setDate(d.getDate() - 7);
                var d2 = Date.parseDate(callbackField.Value);
                result = (d.getFullYear() == d2.getFullYear()) && (d.getMonth() == d2.getMonth()) && (d.getDate() == d2.getDate());
                break;
            //case 'next-week':
            //    break;
            //case 'last-week':
            //    break;
            //case 'this-week':
            //    break;
            //case 'next-month':
            //    break;
            //case 'last-month':
            //    break;
            //case 'this-month':
            //    break;
            //case 'next-year':
            //    break;
            //case 'last-year':
            //    break;
            //case 'this-year':
            //    break;
        }
    } catch (e) {
        LogEx("ConditionIsTrue: " + e.message);
    }
    return result;
}
