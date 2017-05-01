String.prototype.capitalizeFirstLetter = function () {
    return (this && this.length > 0) ? this.charAt(0).toUpperCase() + this.slice(1) : '';
};
// data.contains(str, true);
String.prototype.contains = function (str, exactMatch) {
    if ((exactMatch == null) || (exactMatch == undefined)) {
        exactMatch = false;
    }
    return (!exactMatch) ? (this.indexOf(str) != -1) : (this.toLowerCase().indexOf(str.toLowerCase()) != -1);
};

// data.startswith(str)
String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
};

// data.endswith(str)
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

/*Obsolete fileds to be deleted from configuration entity*/
//var EntitiesAreRelatedBoolean = 'dcrmeg_entitiesarerelated';
//var RelatedEntityLookupSchemaName = 'dcrmeg_relatedentitylookup';
//var DisplaySumForNumericFields = 'dcrmeg_displaysumfornumericfields';
//var SelectFieldsDispalyOption = 'dcrmeg_selectfieldsdispalyoption';
//var MaxRecordPerPage = 'dcrmeg_maxrecordperpage';
/*Obsolete*/

(function ($) {

    $.extend(true, window, {
        "DCrmEditableGrid": {
            "Globals": {
                "xrmPage": undefined,
                "LoggedInUserID": undefined,
                "Translation_Labels": {},
                "WaitDialog": undefined,
                "ToolTipClassSelector": '',
                "PickListCheckboxListCtl": undefined,
                "_DefaultLookupElemId": '',

                "EntityNameField": 'dcrmeg_name',
                "DisplayOnEntityFieldName": 'dcrmeg_displayonentityhidden',
                "DisplayFromEntityFieldName": 'dcrmeg_displayfromentityhidden',
                "FromEntityFieldsAttr": 'dcrmeg_fromentityfieldsattrhidden',
                "FieldConditionValues": 'dcrmeg_fieldcondition',
                "HeaderFieldNames": 'dcrmeg_headerfieldnameshidden',

                "AllFieldsMetadata": undefined,
                "SelectFieldsCheckboxList": undefined,
                "ReloadedSavedFields": [],
                "ReloadedFieldConditions": [],
                "CurFieldCondition": undefined,
                "TooltipControl": undefined,
                "ParentFieldsFormType": 0,
                "FormIsReadOnly": false,
                "CrmFormFieldsSchemas": [],
                "MandatoryFieldsOptionsId": null,
                "EntityToGetMetadataFor": '',
                "DCrmEGConfiguration": [],
                "BeforeDragParentLi": undefined,
                "_CurConfiguration": undefined,
                "_Entityinfo": '',
                "_Fieldsinfo": '',
                "_Conditioninfo": '',

                "CrmFieldTypes": {
                    LookupType: "lookup",
                    CustomerType: 'customer', // account,contact
                    OwnerType: 'owner', // systemuser,team
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
                "FieldIds": {
                    FieldConditionFlyout: "#fieldconditionflyout",
                    stringconditions: "#stringconditions",
                    datetimeconditions: "#datetimeconditions",
                    lookupconditions: "#lookupconditions",
                    systemuserlookup: "#systemuserlookup",
                    customerlookup: "#customerlookup",
                    optionsetconditions: "#optionsetconditions",
                    numericconditions: "#numericconditions",
                    fieldconditioninput: "#fieldconditioninput",
                    dateconditioninput: "#dateconditioninput",
                    lookupsearchbtn: "#lookupsearchbtn",
                    picklistselect: "#picklistselect"
                },
                "_SEPERATOR": '||',
                "_OuterSeperator": '[]',
                "_pSeperator": '%%',
                "_sSeperator": '$$',

                "TargetOutputEncSeed": '5CD566B7B6D04BE19572',
                "userDatetimeSettings": undefined,
                "ToolTipAttrName": "data-tooltip",
                "DefaultBackgroundColor": '#FFF',
                "DefaultTextColor": '#000',
                "Debug": false
            }
        }
    });

    $.extend(true, window, {
        "DCrmEditableGrid": {
            "Helper": {
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
                "CheckboxList": function (fields, CheckFieldClicked, SavedFields, CheckListParent, noCondition) {
                    var WidthPercentage = '0';
                    var tip;
                    var $parentContainer = CheckListParent || $('#listoffieldstoselect');

                    var $thecontainer = $('<div></div').addClass('flyout-ContentContainer').appendTo($parentContainer);

                    var ChkClicked = CheckFieldClicked;
                    // Re enable pre filtering (field condition) in configuration
                    $.each(fields, function (index, item) {

                        tip = '<div><table><tbody><tr><td>SchemaName</td><td>' + item.SchemaName +
                            '</td></tr><tr><td>FieldType</td><td>' + item.AttrType +
                            '</td></tr><tr><td>RequiredLevel</td><td>' + item.RequieredLevel + '</td></tr>';
                        if ((item.Format) && (item.Format != 'A')) {
                            tip += '<tr><td>Format</td><td>' + item.Format + '</td></tr>';
                        }
                        if ((item.MaxLength) && (item.MaxLength != 'A')) {
                            tip += '<tr><td>MaxLength</td><td>' + item.MaxLength + '</td></tr>';
                        }
                        if ((item.MaxValue) && (item.MaxValue != 'A')) {
                            tip += '<tr><td>MaxValue</td><td>' + item.MaxValue + '</td></tr>';
                        }
                        if ((item.MinValue) && (item.MinValue != 'A')) {
                            tip += '<tr><td>MinValue</td><td>' + item.MinValue + '</td></tr>';
                        }
                        if ((item.Precision) && (item.Precision != 'A')) {
                            tip += '<tr><td>Precision</td><td>' + item.Precision + '</td></tr>';
                        }
                        if ((item.LookupTargetEntity) && (item.LookupTargetEntity != 'A')) {
                            tip += '<tr><td>Target</td><td>' + item.LookupTargetEntity + '</td></tr>';
                        }
                        tip += '</tbody></table></div>';

                        var btnid = DCrmEditableGrid.Helper.GenerateUUID();
                        var id = DCrmEditableGrid.Helper.GenerateUUID();

                        var $td = $('<div></div>')
                            .addClass('selectFieldsCheckList')
                            .attr('data-button-id', btnid)
                            .attr('data-check-id', id)
                            .attr(_thisGlobals.ToolTipAttrName, tip)
                            .addClass(_thisGlobals.ToolTipClassSelector)
                            .on('click', function (e) {
                                if ((ChkClicked) && (e.target.tagName == 'DIV')) {
                                    var input = $('#' + $(this).attr('data-check-id'));
                                    if (input.is(':checked')) {
                                        input.prop('checked', false);
                                    } else {
                                        input.prop('checked', true);
                                    }
                                    ChkClicked(input);
                                }
                            })
                        //.on('mouseover', function(e) {
                        //    $('#' + $(this).attr('data-button-id')).show();
                        //})
                        //.on('mouseleave', function (e) {
                        //    $('#' + $(this).attr('data-button-id')).hide();
                        //})
                            .appendTo($thecontainer);

                        var $chk = $('<input type="checkbox"></input>')
                            .attr('id', id)
                            .attr('data-item-realindex', '' + index)
                            .attr('data-item-label', item.Name)
                            .attr('data-item-schema', item.SchemaName)
                            .attr('data-item-attrtype', item.AttrType)
                            .attr('data-item-readonly', item.ReadOnly)
                            .attr('data-item-requiered', item.RequieredLevel)
                            .attr('data-item-maxlength', item.MaxLength)
                            .attr('data-item-format', item.Format)
                            .attr('data-item-maxvalue', item.MaxValue)
                            .attr('data-item-minvalue', item.MinValue)
                            .attr('data-item-precision', item.Precision)
                            .attr('data-item-realwidth', WidthPercentage)
                            .attr('data-item-lookuptargetentity', item.LookupTargetEntity)
                            .appendTo($td);
                        $('<label></label>')
                            .attr('for', id)
                            .text(item.Name)
                            .attr(_thisGlobals.ToolTipAttrName, tip)
                            .addClass(_thisGlobals.ToolTipClassSelector)
                            .appendTo($td);
                        $chk.on('click', function (e) {
                            e.stopPropagation();
                            if (ChkClicked) {
                                ChkClicked($(this));
                            }

                        });

                        //var tmpcondition = FindCondition(item.SchemaName);
                        //if ((item.SchemaName == 'statecode') || (item.SchemaName == 'statuscode')) {
                        //    $chk.prop('disabled', 'disabled');
                        //}

                        if ((SavedFields) && (SavedFields.length > 0)) {
                            $.each(SavedFields, function (ind, saveditem) {
                                if (saveditem.Name == item.Name) {
                                    $chk.prop('checked', true);
                                    saveditem.RealIndex = $chk.attr('data-item-realindex');
                                    $chk.attr('data-item-realwidth', saveditem.RealWidth);
                                    $chk.attr('data-item-readonly', saveditem.ReadOnly);
                                }
                            });
                        }

                        // Add button if not read only
                        if ((!_thisGlobals.FormIsReadOnly) && (noCondition != true)) {
                            var tmpcondition = FindCondition(item.SchemaName);

                            var btnclass = 'fieldoptionsettingbutton';
                            var btntooltip = _thisGlobals.Translation_Labels.FieldConditionBtn;
                            if (tmpcondition) {
                                btnclass += ' checklistbuttoncondition';
                                btntooltip = '<span>' + item.Name +
                                    ' ' + GetFieldConditionSelectOptionLabelByValue(tmpcondition.CrmFieldType, tmpcondition.ConditonOperator) +
                                    ' ' + (((tmpcondition.ConditionLabel) && (tmpcondition.ConditionLabel != 'undefined')) ? tmpcondition.ConditionLabel : '') + '</span>';
                            }
                            $('<button></button>')
                                .attr('data-tilename-id', id)
                                .attr('data-tooltip', btntooltip)
                                .attr('id', btnid)
                                .addClass(btnclass)
                                .addClass(_thisGlobals.ToolTipClassSelector)
                                .appendTo($td)
                                .on('click', function (e) {
                                    e.stopPropagation();

                                    var $tile = $('#' + $(this).attr('data-tilename-id'));
                                    var thisid = $(this).attr('id');
                                    var attrtype = $tile.attr('data-item-attrtype');
                                    var select = FieldConditionSelectId(attrtype);
                                    _thisGlobals.CurFieldCondition = FindCondition($tile.attr('data-item-schema'));
                                    if (_thisGlobals.CurFieldCondition) {
                                        $("#removefieldcondition").show();
                                        _thisGlobals.CurFieldCondition.LookupEntities = undefined;
                                        _thisGlobals.CurFieldCondition.LookupData = [];
                                        _thisGlobals.CurFieldCondition.PicklistData = [];
                                        _thisGlobals.CurFieldCondition.ConditionAttributeOrg = $tile.attr('data-item-schema');
                                        _thisGlobals.CurFieldCondition.CrmFieldLabel = $tile.attr('data-item-label');
                                        if ((_thisGlobals.CurFieldCondition.ConditionValue) && (_thisGlobals.CurFieldCondition.ConditionValue != 'undefined')) {
                                            if ((_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.BooleanType) ||
                                                (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                                                (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.State) ||
                                                (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.Status)) {
                                                if (!_thisGlobals.CurFieldCondition.ConditionValue.contains('%')) {
                                                    var arrv = _thisGlobals.CurFieldCondition.ConditionValue.split(';');
                                                    var arrl = _thisGlobals.CurFieldCondition.ConditionLabel.split(';');
                                                    for (var i = 0; i < arrv.length; i++) {
                                                        _thisGlobals.CurFieldCondition.PicklistData.push({ Label: arrl[i], Value: arrv[i] });
                                                    }
                                                } else {
                                                    select.ShowSelectBtn = false;
                                                    _thisGlobals.CurFieldCondition.ConditionAttributeOptionset = _thisGlobals.CurFieldCondition.ConditionAttribute;
                                                }
                                            } else if ((_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.LookupType) ||
                                                (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.CustomerType) ||
                                                (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.OwnerType)) {
                                                if (!_thisGlobals.CurFieldCondition.ConditionValue.contains('%')) {
                                                    var arrv = _thisGlobals.CurFieldCondition.ConditionValue.split(';');
                                                    var arrl = _thisGlobals.CurFieldCondition.ConditionLabel.split(';');
                                                    var arrnames = _thisGlobals.CurFieldCondition.LookupLogicalNames.split(';');
                                                    for (var i = 0; i < arrv.length; i++) {
                                                        _thisGlobals.CurFieldCondition.LookupData.push({ LookupName: arrl[i], LookupId: arrv[i], LookupLogicalName: arrnames[i] });
                                                    }
                                                } else {
                                                    select.ShowLookupBtn = false;
                                                    _thisGlobals.CurFieldCondition.ConditionAttributeLookup = _thisGlobals.CurFieldCondition.ConditionAttribute;
                                                }
                                            }
                                        } else {
                                            select.ShowSelectBtn = false;
                                            select.ShowLookupBtn = false;
                                        }
                                    } else {
                                        _thisGlobals.CurFieldCondition = {};
                                        _thisGlobals.CurFieldCondition.ConditonOperator = select.SelectedOptionValue;
                                        _thisGlobals.CurFieldCondition.ConditionAttribute = $tile.attr('data-item-schema');
                                        _thisGlobals.CurFieldCondition.ConditionAttributeOrg = $tile.attr('data-item-schema');
                                        _thisGlobals.CurFieldCondition.CrmFieldLabel = $tile.attr('data-item-label');
                                        _thisGlobals.CurFieldCondition.CrmFieldType = $tile.attr('data-item-attrtype');
                                        _thisGlobals.CurFieldCondition.ConditionValue = undefined;
                                        _thisGlobals.CurFieldCondition.ConditionLabel = undefined;
                                        _thisGlobals.CurFieldCondition.LookupEntities = undefined;
                                        _thisGlobals.CurFieldCondition.LookupData = [];
                                        _thisGlobals.CurFieldCondition.PicklistData = [];
                                        $("#removefieldcondition").hide();
                                    }
                                    _thisGlobals.CurFieldCondition.BtnId = thisid;
                                    _thisGlobals.CurFieldCondition.Selectid = select.id;
                                    if ($tile.attr('data-item-lookuptargetentity')) {
                                        _thisGlobals.CurFieldCondition.LookupEntities = $tile.attr('data-item-lookuptargetentity').split(',');
                                    }
                                    $(select.id).attr('data-item-org-schema', $tile.attr('data-item-schema'));
                                    $(_thisGlobals.FieldIds.fieldconditioninput).removeAttr('readonly');
                                    $(_thisGlobals.FieldIds.fieldconditioninput).val('');
                                    $(_thisGlobals.FieldIds.dateconditioninput).val('');
                                    $(".conditionscontainer").addClass("hideconditionscontainer");
                                    $(select.label).addClass(_thisGlobals.ToolTipClassSelector).text($tile.attr('data-item-label')).attr('data-tooltip', $tile.attr('data-item-label'));
                                    $(select.id).parent().removeClass("hideconditionscontainer");
                                    //eq on eq-userid  --- contains;like
                                    var tmpArr = _thisGlobals.CurFieldCondition.ConditonOperator.split(';');
                                    _thisGlobals.CurFieldCondition.ConditonOperator = tmpArr[0];
                                    var showInputs = true;
                                    if (select.id == '#datetimeconditions') {
                                        // on on-or-after on-or-before olderthan-x-months
                                        showInputs = ((_thisGlobals.CurFieldCondition.ConditonOperator == 'on') || (_thisGlobals.CurFieldCondition.ConditonOperator == 'on-or-after')
                                            || (_thisGlobals.CurFieldCondition.ConditonOperator == 'on-or-before') || (_thisGlobals.CurFieldCondition.ConditonOperator == 'olderthan-x-months'));
                                    } else {
                                        // eq-userid ne-userid eq-userteams eq-useroruserteams
                                        showInputs = ((_thisGlobals.CurFieldCondition.ConditonOperator != 'not-null') && (_thisGlobals.CurFieldCondition.ConditonOperator != 'null')
                                            && (_thisGlobals.CurFieldCondition.ConditonOperator != 'eq-userid') && (_thisGlobals.CurFieldCondition.ConditonOperator != 'ne-userid')
                                            && (_thisGlobals.CurFieldCondition.ConditonOperator != 'eq-userteams') && (_thisGlobals.CurFieldCondition.ConditonOperator != 'eq-useroruserteams'));
                                    }
                                    if (tmpArr.length > 1) {
                                        _thisGlobals.CurFieldCondition.OperatorFetchOp = tmpArr[1];
                                    }
                                    $(select.id).val(_thisGlobals.CurFieldCondition.ConditonOperator);
                                    if ((select.ShowInput) && (showInputs)) {
                                        $(_thisGlobals.FieldIds.fieldconditioninput).val(_thisGlobals.CurFieldCondition.ConditionLabel);
                                        $(_thisGlobals.FieldIds.fieldconditioninput).show();
                                    } else {
                                        $(_thisGlobals.FieldIds.fieldconditioninput).hide();
                                    }
                                    if ((select.ShowLookupBtn) && (showInputs)) {
                                        $(_thisGlobals.FieldIds.lookupsearchbtn).show();
                                        $(_thisGlobals.FieldIds.fieldconditioninput).attr('readonly', 'readonly');
                                    } else {
                                        $(_thisGlobals.FieldIds.lookupsearchbtn).hide();
                                    }
                                    if ((select.ShowSelectBtn) && (showInputs)) {
                                        $(_thisGlobals.FieldIds.picklistselect).show();
                                    } else {
                                        $(_thisGlobals.FieldIds.fieldconditioninput).attr('readonly', 'readonly');
                                        $(_thisGlobals.FieldIds.picklistselect).hide();
                                    }
                                    if ((select.ShowDate) && (showInputs)) {
                                        $(_thisGlobals.FieldIds.dateconditioninput).val(_thisGlobals.CurFieldCondition.ConditionLabel);
                                        $(_thisGlobals.FieldIds.dateconditioninput).show();
                                    } else {
                                        $(_thisGlobals.FieldIds.dateconditioninput).hide();
                                    }
                                    $(_thisGlobals.FieldIds.FieldConditionFlyout).show('slow');
                                    if ((select.ShowInput) && (showInputs)) {
                                        if (!select.ShowLookupBtn) {
                                            $(_thisGlobals.FieldIds.fieldconditioninput).removeAttr('readonly');
                                        }
                                        $(_thisGlobals.FieldIds.fieldconditioninput).focus();
                                    }
                                    ConditionSelectOnChange(select.id);
                                    CreateTooltip();
                                });
                        }

                        // TODO
                        if (noCondition) {
                            $('<button></button>')
                                .attr('data-tilename-id', id)
                                .attr('data-tooltip', 'Editable field. Click to lock field')
                                .attr('id', btnid)
                                .addClass('lookupfieldseditable')
                                .addClass(_thisGlobals.ToolTipClassSelector)
                                .appendTo($td).on('click', function (e) {
                                    e.stopPropagation();
                                    var _this = $(this);
                                    if (_this.hasClass('lookupfieldslocked')) {
                                        _this.removeClass('lookupfieldslocked').attr('data-tooltip', 'Editable field. Click to lock field.');
                                    } else {
                                        _this.addClass('lookupfieldslocked').attr('data-tooltip', 'Locked field. Click to make field editable.');
                                    }
                                });
                        }
                    });

                    $thecontainer.DestroyYourself = function () {
                        $parentContainer.empty();
                    };

                    $thecontainer.GetContent = function () {
                        return $thecontainer;
                    };
                    return $thecontainer;
                },
                "PicklistCheckboxList": function (fields, CheckFieldClicked) {
                    var $thecontainer = $('#picklistchecklist');

                    var ChkClicked = CheckFieldClicked;
                    $.each(fields, function (index, item) {

                        var $td = $('<div></div>').addClass('selectFieldsCheckList')
                            .appendTo($thecontainer);
                        var id = DCrmEditableGrid.Helper.GenerateUUID();
                        var $chk = $('<input type="checkbox"></input>')
                            .attr('id', id)
                            .attr('data-item-value', '' + item.value)
                            .attr('data-item-label', '' + item.Label)
                            .appendTo($td);
                        $('<label></label>')
                            .attr('for', id)
                            .text(item.Label)
                            .insertAfter($chk);
                        $chk.on('click', function (e) {
                            if (ChkClicked) {
                                ChkClicked($(this));
                            }
                            e.stopPropagation();
                        });
                    });

                    return $thecontainer;
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
                }
            }
        }
    });
})(jQuery);

var _thisGlobals = DCrmEditableGrid.Globals;
_thisGlobals.xrmPage = window.parent.Xrm.Page;
_thisGlobals.LoggedInUserID = _thisGlobals.xrmPage.context.getUserId();

function LogIt(s) {
    if ((_thisGlobals.Debug) && (typeof console != "undefined") && (typeof console.debug != "undefined")) {
        console.log(s);
    }
}

function LogEx(s) {
    if (typeof console != "undefined" && typeof console.debug != "undefined") {
        console.error(s);
    }
}

Date.parseDate = function (input, format) {
    format = format || _thisGlobals.userDatetimeSettings.DateFormat;

    if (input.trim().length == 0) {
        return new Date();
    }

    var arr = input.trim().split(" ");
    var d = arr[0].trim().replace(/[//]/g, _thisGlobals.userDatetimeSettings.DateSeparator).split(_thisGlobals.userDatetimeSettings.DateSeparator);
    var t = undefined;

    // parse time as well?
    if (format.contains(_thisGlobals.userDatetimeSettings.TimeFormat)) {
        t = arr[1].trim().replace(":", _thisGlobals.userDatetimeSettings.TimeSeparator).split(_thisGlobals.userDatetimeSettings.TimeSeparator);
    }
    // dd/MM/yyyy
    // M/dd/yyyy
    // yyyy/dd/M
    var dformat = format.toLowerCase().replace(/[//]/g, _thisGlobals.userDatetimeSettings.DateSeparator).split(_thisGlobals.userDatetimeSettings.DateSeparator);
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
}

Date.prototype.dateFormat = function (mask) {
    var t = new XDate(this).toString(mask);
    return t;
};

var BareboneTip = (function () {

    function BareboneTip(tooltipattr, tooltipclass) {
        var self = this;

        self.TargettingClass = tooltipclass;

        self.TooltipContainer = $('<div class="tinytipclass"></div>').on('mouseenter', function (e) { $(this).hide(); }).appendTo('body');

        self.TooltipAttr = tooltipattr;

        self.HighlightRows = false;
        self.HighLightedCell = undefined;

        self.HookTooltips = function () {
            $('.' + self.TargettingClass)
                .on('mouseover', function (e) {
                    if (e.target) {
                        var $tmp = $(e.target);
                        var tip = $tmp.attr(self.TooltipAttr);
                        var tname = undefined;

                        if ((tip) && (tip.length) && (tip.length > 0)) {
                            self.TooltipContainer.html(tip.replace(/\n/g, "<br />"));

                            var tope = $tmp.offset().top;
                            var lefte = $tmp.offset().left;
                            var width = $tmp.outerWidth();
                            var height = self.TooltipContainer.outerHeight();

                            lefte = lefte + (width / 2);
                            lefte = lefte - (self.TooltipContainer.outerWidth() / 2);
                            if (lefte < 0) {
                                lefte = 0;
                            }
                            var tmp = $(window).width() - (lefte + width);
                            if (tmp < 0) {
                                lefte = lefte + tmp;
                            }

                            tope = tope - height - 2;
                            if (tope < 0) {
                                tope = $tmp.offset().top + $tmp.height() + 2;
                            }
                            self.TooltipContainer.css({ left: lefte, top: tope }).show();
                        }
                    }
                }).on('mouseleave', function (e) {
                    self.TooltipContainer.hide();
                });
        }

        self.UnHookTooltips = function () {
            $('.' + self.TargettingClass).off('mouseover').off('mouseleave');
        }
    }

    return BareboneTip;
})();

var NumericTextbox = (function () {
    
    function NumericTextbox(id, tooltipText, tooltipClass, initValue, elemWidth, parentElem, saveFunction, forWidth) {
        var self = this;
        self.SaveFuncPtr = saveFunction;
        self.InitialInputValue = initValue;

        self.$input = $('<input style="width:' + elemWidth + 'px;" value="' + initValue + '" type="text" />')
        .attr('data-tilename-id', id)
        .attr("data-item-forwidth", (forWidth ? "1" : "0"))
        .keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter decimal
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                // Allow: Ctrl+A v c
                (e.keyCode == 65 && e.ctrlKey === true) ||
                (e.keyCode == 67 && e.ctrlKey === true) ||
                (e.keyCode == 86 && e.ctrlKey === true) ||
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }).blur(function (e) {
            var $this = $(this);
            var val = $this.val();
            var updateFileds = false;

            if ($this.attr("data-item-forwidth") == "1") {
                if ((val == null) || (val.length == 0)) {
                    $this.val('0');
                }
                $('#' + $this.attr('data-tilename-id')).attr('data-item-realwidth', '' + val);
                updateFileds = true;
            } else {
                if ((val) && (val.length > 0)) {
                    $this.parent().attr('data-item-default', val);
                    updateFileds = true;
                } else if(self.InitialInputValue.length > 0) {
                    $this.parent().removeAttr('data-item-default');
                    updateFileds = true;
                }
            }

            if ((updateFileds) && (self.SaveFuncPtr)) {
                self.SaveFuncPtr();
            }
        }).appendTo(parentElem);

        if (forWidth) {
            self.$input.attr('data-tooltip', tooltipText).addClass(tooltipClass).prop('maxlength', 2);
        }

        self.GetInput = function () {
            return self.$input;
        }
    }


    return NumericTextbox;
})();

var SelectBooleanCheck = (function () {

    function SelectBooleanCheck(id, elemWidth, parentElem, data, defaultValue, saveFunction) {
        var self = this;
        self.SaveFuncPtr = saveFunction;
        var select = '<option selected="selected" value="1">True</option><option value="0">False</option>';

        if (data.length > 0) {
            if (defaultValue) {
                select = '<option ' + ((defaultValue.split('{}')[1] == data[0].value) ? 'selected="selected"' : '') + ' value="' + data[0].value + '">' + data[0].Label +
                    '</option><option ' + ((defaultValue.split('{}')[1] == data[1].value) ? 'selected="selected"' : '') + ' value="' + data[1].value + '">' + data[1].Label + '</option>';
            } else {
                select = '<option selected="selected" value="' + data[0].value + '">' + data[0].Label + '</option><option value="' + data[1].value + '">' + data[1].Label + '</option>';
            }
        }

        self.$input = $('<select style="width:' + elemWidth + 'px;">' + select + '</select>')
            .attr('data-tilename-id', id)
            .on('change', function (e) {
                e.stopPropagation();
                
                var val = $(this).val();
                var txt = $(this).find(":selected").text();
                $(this).parent().attr('data-item-default', txt + '{}' + val);

                if (self.SaveFuncPtr) {
                    self.SaveFuncPtr();
                }
            })
            .appendTo(parentElem);

        self.GetInput = function () {
            return self.$input;
        }
    }

    return SelectBooleanCheck;
})();

var OptionSetSelect = (function () {

    function OptionSetSelect(id, elemWidth, parentElem, data, defaultValue, saveFunction) {
        var self = this;
        self.SaveFuncPtr = saveFunction;
        var select = '<option selected="selected" value="-1">---</option>';

        if (data.length > 0) {
            var dv = (defaultValue) ? defaultValue.split('{}')[1] : '-1';

            for (var i = 0; i < data.length; i++) {
                select += '<option ' + ((dv == data[i].value) ? 'selected="selected"' : '') + ' value="' + data[i].value + '">' + data[i].Label + '</option>';
            }
        }

        self.$input = $('<select style="width:' + elemWidth + 'px;">' + select + '</select>')
            .attr('data-tilename-id', id)
            .on('change', function (e) {
                e.stopPropagation();

                var val = $(this).val();
                var txt = $(this).find(":selected").text();

                if (val != '-1') {
                    $(this).parent().attr('data-item-default', txt + '{}' + val);
                } else {
                    $(this).parent().removeAttr('data-item-default');
                }

                if (self.SaveFuncPtr) {
                    self.SaveFuncPtr();
                }
            })
            .appendTo(parentElem);

        self.GetInput = function () {
            return self.$input;
        }
    }

    return OptionSetSelect;
})();

/*Retreive list of entities*/
function RetreiveEntityList() {
    _thisGlobals.WaitDialog.show();
    XrmServiceToolkit.Soap.RetrieveAllEntitiesMetadata(['Entity'], true, RetreiveEntityListCallback);
}

function RetreiveEntityListCallback(result) {
    _thisGlobals.WaitDialog.hide();
    if (result.length == 0) {
        LogEx("Exception: No entites were retreived");
        return;
    }

    var index = 0;
    var ent = null;
    var options = []; //'<option value="0">--Select Entity--</option>';
    var lbl = '';

    for (index = 0, j = result.length; index < j; index++) {
        ent = result[index];
        lbl = DCrmEditableGrid.Helper.GetUserLocalizedLabel(ent.DisplayName, ent.LogicalName);
        if (lbl.length > 0) {
            options.push({ SchemaName: ent.SchemaName, Name: lbl});
        }
    }

    // Call back to iframe
    if (result.length > 0) {
        options.sort(function (a, b) {
            var alabel = (a.Name);
            var blabel = (b.Name);
            if (alabel < blabel)
            { return -1 }
            if (alabel > blabel)
            { return 1 }
            return 0;
        });
        FillEntitiesSelect(options);
    }
}

function FillEntitiesSelect(data) {
    var $entityfrom = $('#displayonentity');
    var $entityto = $('#displayfromentity');

    $entityfrom.empty();
    $entityto.empty();

    $('<option value="0">--</option>').appendTo($entityfrom);
    $('<option value="0">--</option>').appendTo($entityto);

    $.each(data, function (index, item) {
        $('<option></option>').text(item.Name).val(item.SchemaName.toLowerCase()).appendTo($entityfrom);
        $('<option></option>').text(item.Name).val(item.SchemaName.toLowerCase()).appendTo($entityto);
    });

    var d = GetHiddenFieldValue(1);
    if (d) {
        $entityfrom.val(d);
    }

    LoadDCrmEGConfiguration();
}

/*Retreive entity metadata*/
function RetreiveLookupEntityMetadata(logicalName) {
    _thisGlobals.EntityToGetMetadataFor = logicalName;

    XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Attributes'], logicalName, false, RetreiveLookupEntityMetadateCallback, RetreiveLookupEntityMetadataErrorCallback);
}

function RetreiveLookupEntityMetadataErrorCallback(msg) {
    window.parent.Xrm.Utility.alertDialog(msg);
}

function RetreiveLookupEntityMetadateCallback(result) {

    if (result.length == 0) {
        LogEx("RetreiveEntityMetadateCallback called - No metadata were retreived");
        return;
    }

    var index = 0;
    var ent = null;
    var attrType, schName;

    var AllLookupFieldsMetadata = [];

    var fieldexclusion = ['createdonbehalfby', 'exchangerate', 'importsequencenumber', 'modifiedonbehalfby', 'overriddencreatedon', 'owningbusinessunit', 'owningteam', 'owninguser', 'timezoneruleversionnumber', 'utcconversiontimezonecode', 'versionnumber'];
    var attrTypeExclusion = ["lookup", "boolean", "picklist", "datetime", "string", "memo", "integer", "double", "decimal", "money", "customer", "owner", "state", "status"];

    var fe = fieldexclusion.join(" ");
    var ate = attrTypeExclusion.join(" ");

    for (index = 0, j = result[0].Attributes.length; index < j; index++) {
        ent = result[0].Attributes[index];

        if (ent.AttributeOf == null) {
            attrType = ent.AttributeType.toLowerCase();
            schName = ent.SchemaName.toLowerCase();

            //LogIt("SchemaName [" + ent.SchemaName + "] attrType [" + attrType + "]");

            if ((fieldexclusion.ExactMatchExists(schName) == false) && (attrTypeExclusion.ExactMatchExists(attrType) == true)) {
                var ename = DCrmEditableGrid.Helper.GetUserLocalizedLabel(ent.DisplayName, ent.LogicalName);
                if ((ename == null) || (ename == 'null') || (ename.length == 0)) {
                    ename = schName.replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                }

                AllLookupFieldsMetadata.push({
                    SchemaName: schName,
                    Name: ename,
                    AttrType: attrType,
                    ReadOnly: false,
                    RequieredLevel: (((ent.RequiredLevel) && (ent.RequiredLevel.Value)) ? ent.RequiredLevel.Value : undefined) || 'None',
                    MaxLength: ent.MaxLength || 'A',
                    Format: ent.Format || 'A',
                    MaxValue: ent.MaxValue || 'A',
                    MinValue: ent.MinValue || 'A',
                    Precision: ent.Precision || 'A',
                    LookupTargetEntity: ((ent.Targets) && (ent.Targets.length)) ? ent.Targets.join(',').toLowerCase() : 'A',
                    CustomAttribute: ent.IsCustomAttribute
                });
            }
        }
    }

    // Call back to iframe
    if (result.length > 0) {
        AllLookupFieldsMetadata.sort(function (a, b) {
            var alabel = (a.Name);
            var blabel = (b.Name);
            if (alabel < blabel)
            { return -1 }
            if (alabel > blabel)
            { return 1 }
            return 0;
        });
        DisplayLookupEntityFields(AllLookupFieldsMetadata);

    } else {
        RetreiveLookupEntityMetadataErrorCallback("Unable to retreive metadata for " + _thisGlobals.EntityToGetMetadataFor);
    }
}

function DisplayLookupEntityFields(data) {
    if (_thisGlobals.SelectLookupEntityFieldsCheckboxList) {
        _thisGlobals.SelectLookupEntityFieldsCheckboxList.DestroyYourself();
    }

    _thisGlobals.SelectLookupEntityFieldsCheckboxList = DCrmEditableGrid.Helper.CheckboxList(
        data, LookupEntityFieldsCheckboxListClickHandler, null, $('#listoflookupentityfieldstoselect'), true);
    
    $('#listoflookupentityfieldstitle').text('Select Fields for ' + _thisGlobals.EntityToGetMetadataFor.capitalizeFirstLetter());
    $('#listoflookupentityfieldsflyout').show('slow');
    CreateTooltip();
}

function RetreiveEntityMetadata(logicalName) {
    _thisGlobals.WaitDialog.show();
    _thisGlobals.EntityToGetMetadataFor = logicalName;

    XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Attributes'], logicalName, false, RetreiveEntityMetadateCallback, RetreiveEntityMetadataErrorCallback);
}

function RetreiveEntityMetadataErrorCallback(msg) {
    _thisGlobals.WaitDialog.hide();
    window.parent.Xrm.Utility.alertDialog(msg);
}

function RetreiveEntityMetadateCallback(result) {
    _thisGlobals.WaitDialog.hide();

    _thisGlobals._CurConfiguration.HasStatusField = undefined;

    if (result.length == 0) {
        LogEx("RetreiveEntityMetadateCallback called - No metadata were retreived");
        return;
    }

    var index = 0;
    var ent = null;
    var attrType, schName;

    _thisGlobals.AllFieldsMetadata = [];

    // , 'transactioncurrencyid', 'createdby', 'createdon', , 'modifiedby', 'modifiedon', 'statecode', 'statuscode'
    var fieldexclusion = ['createdonbehalfby', 'exchangerate', 'importsequencenumber', 'modifiedonbehalfby', 'overriddencreatedon', 'owningbusinessunit', 'owningteam', 'owninguser', 'timezoneruleversionnumber', 'utcconversiontimezonecode', 'versionnumber'];
    var attrTypeExclusion = ["lookup", "boolean", "picklist", "datetime", "string", "memo", "integer", "double", "decimal", "money", "customer", "owner", "state", "status"];

    var fe = fieldexclusion.join(" ");
    var ate = attrTypeExclusion.join(" ");

    for (index = 0, j = result[0].Attributes.length; index < j; index++) {
        ent = result[0].Attributes[index];

        if (ent.AttributeOf == null) {
            attrType = ent.AttributeType.toLowerCase();
            schName = ent.SchemaName.toLowerCase();

            //LogIt("SchemaName [" + ent.SchemaName + "] attrType [" + attrType + "]");

            if (schName == 'statecode') {
                _thisGlobals._CurConfiguration.HasStatusField = schName;
                LogIt("Found state " + _thisGlobals._CurConfiguration.HasStatusField);
            }

            if ((fieldexclusion.ExactMatchExists(schName) == false) && (attrTypeExclusion.ExactMatchExists(attrType) == true)) {
                //LogIt("SchemaName [" + ent.SchemaName + "] LogicalName [" + ent.LogicalName + "] attrType [" + ent.AttributeType + "] isPrimaryId ["
                //    + ent.IsPrimaryId + "] IsPrimaryName [" + ent.IsPrimaryName + "] Format [" + ent.Format +
                //    "] MaxValue [" + ent.MaxValue + "] MinValue [" + ent.MinValue + "] Presicion [" + ent.Precision + "]");
                var ename = DCrmEditableGrid.Helper.GetUserLocalizedLabel(ent.DisplayName, ent.LogicalName);
                if ((ename == null) || (ename == 'null') || (ename.length == 0)) {
                    ename = schName.replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                }

                _thisGlobals.AllFieldsMetadata.push({
                    SchemaName: schName,
                    Name: ename,
                    AttrType: attrType,
                    ReadOnly: false,
                    RequieredLevel: (((ent.RequiredLevel) && (ent.RequiredLevel.Value)) ? ent.RequiredLevel.Value : undefined) || 'None',
                    MaxLength: ent.MaxLength || 'A',
                    Format: ent.Format || 'A',
                    MaxValue: ent.MaxValue || 'A',
                    MinValue: ent.MinValue || 'A',
                    Precision: ent.Precision || 'A',
                    LookupTargetEntity: ((ent.Targets) && (ent.Targets.length)) ? ent.Targets.join(',').toLowerCase() : 'A',
                    CustomAttribute: ent.IsCustomAttribute
                });
            }
            //else {
            //    // modifiedon createdon
            //    LogIt("SchemaName [" + schName + "] attrType [" + attrType + "]");
            //}
        }
    }

    // Call back to iframe
    if (result.length > 0) {
        _thisGlobals.AllFieldsMetadata.sort(function (a, b) {
            var alabel = (a.Name);
            var blabel = (b.Name);
            if (alabel < blabel)
            { return -1 }
            if (alabel > blabel)
            { return 1 }
            return 0;
        });
        SetupFieldsDisplayOption();
    } else {
        $('#listoffieldstoselectlabel').text('');
    }
}

function SetupFieldsDisplayOption() {
    var finalArr = [];
    var displayOption = _thisGlobals._CurConfiguration.FieldDisplayOption;

    $('#listoffieldstoselect').empty();
    $('#selectedfieldstable').find('tbody:first').empty();

    var txt = '';
    var opt = ($('#makesortable').attr('data-item-lastfocus')) ?
        $('#' + $('#makesortable').attr('data-item-lastfocus')).find('span:first') : undefined;

    txt = (((opt) && (opt.length)) ? 'Select Fields for ' + opt.attr('data-item-orglabel') : '');
    $('#listoffieldstoselectlabel').text(txt);

    if (displayOption == 100000000) {
        // Fields on the form
        _thisGlobals.WaitDialog.show();
        RetreiveSystemFormsForEntity(_thisGlobals.EntityToGetMetadataFor);
        _thisGlobals.WaitDialog.hide();

        if (_thisGlobals.CrmFormFieldsSchemas.length == 0) {
            FillEntityMetadata(_thisGlobals.AllFieldsMetadata);
        } else {
            for (var i = 0; i < _thisGlobals.AllFieldsMetadata.length; i++) {
                $.each(_thisGlobals.CrmFormFieldsSchemas, function (index, schemaname) {
                    if (AllFieldsMetadata[i].SchemaName == schemaname) {
                        finalArr.push(AllFieldsMetadata[i]);
                        return;
                    }
                });
            }
            FillEntityMetadata(finalArr);
        }

    } else if (displayOption == 100000001) {
        // Custom fields
        for (var i = 0; i < _thisGlobals.AllFieldsMetadata.length; i++) {
            if (_thisGlobals.AllFieldsMetadata[i].CustomAttribute) {
                finalArr.push(_thisGlobals.AllFieldsMetadata[i]);
            }
        }
        FillEntityMetadata(finalArr);

    } else if (displayOption == 100000002) {
        // System fields
        for (var i = 0; i < _thisGlobals.AllFieldsMetadata.length; i++) {
            if (!_thisGlobals.AllFieldsMetadata[i].CustomAttribute) {
                finalArr.push(_thisGlobals.AllFieldsMetadata[i]);
            }
        }
        FillEntityMetadata(finalArr);

    } else if (displayOption == 100000003) {
        // All fields
        FillEntityMetadata(_thisGlobals.AllFieldsMetadata);
    }
}

function FillEntityMetadata(data) {
    if (_thisGlobals.SelectFieldsCheckboxList) {
        _thisGlobals.SelectFieldsCheckboxList.DestroyYourself();
    }

    PopulateSavedFields();
    if ((_thisGlobals.ReloadedFieldConditions.length == 0) && (_thisGlobals._CurConfiguration.HasStatusField)) {
        AddCondition('statecode', '0', 'eq', 'Active', _thisGlobals.CrmFieldTypes.State, null, _thisGlobals._CurConfiguration.HasStatusField, 'State');
    }
    _thisGlobals.SelectFieldsCheckboxList = DCrmEditableGrid.Helper.CheckboxList(data, CheckFieldClicked, _thisGlobals.ReloadedSavedFields);

    DisplaySectionGroup(4, true);
    DisplaySectionGroup(5, true);
    DisplaySectionGroup(41, true);
    DisplaySectionGroup(51, true);

    if (_thisGlobals.ReloadedSavedFields.length > 0) {

        var tbody = $('#selectedfieldstable').find('tbody:first');
        tbody.empty();

        var formattable = $('#formattingcolors');
        var htr = formattable.find('thead:first').find('tr');
        var $hth = htr.find('th');
        $.each($hth, function (index, cell) {
            if (index > 0) {
                $(cell).remove();
            }
        });

        var btr = formattable.find('tbody tr');
        $.each(btr, function (index, row) {
            var $tds = $(row).find('td');
            $.each($tds, function (index, cell) {
                if (index > 0) {
                    $(cell).remove();
                }
            });
        });
        var $row1 = $(btr[0]);
        var $row2 = $(btr[1]);
        ResetEvenOddRowColors($row1, $row2);
        $('#headerformattingcontainer').addClass('displaynone');
        
        var formattingopions = _thisGlobals._CurConfiguration.GetFormattingOptions();

        $.each(_thisGlobals.ReloadedSavedFields, function (index, item) {
            SetupSelectedFieldRow(tbody, item);
            SetupSelectedFieldFormattingRow(htr, $row1, $row2, item, formattingopions);
        });

        if (formattingopions.OddRows) {
            $('#oddrowcolorinput').spectrum("set", formattingopions.OddRows);
            $row1.css("background-color", formattingopions.OddRows);
        }
        if (formattingopions.EvenRows) {
            $('#oddrowcolorinput').spectrum("set", formattingopions.EvenRows);
            $row2.css("background-color", formattingopions.EvenRows);
        }
    }

    if (!_thisGlobals.FormIsReadOnly) {
        var selFieldsTable = $('#selectedfieldstable');
        selFieldsTable.sortable({
            containerSelector: 'table',
            itemPath: '> tbody',
            itemSelector: 'tr',
            placeholder: '<tr class="placeholder"/>',
            onDrop: function ($item, container, _super) {
                SaveFields();
                _super($item, container);
            },
            onMousedown: function ($item, _super, event) {
                if (!event.target.nodeName.match(/^(input|select|button|textarea)$/i)) {
                    event.preventDefault();
                    return true;
                }
            }
        });

        $("#cellformatconditionlookupbtn").on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            _thisGlobals._DefaultLookupElemId = 'cellformatconditioninput';

            var EntityObjectTypeCode = [];
            var LookupEntities = $('#cellformattingcontainer').attr('data-item-lookuptargetentity').split(',');

            for (var i = 0; i < LookupEntities.length; i++) {
                EntityObjectTypeCode[i] = XrmServiceToolkit.Common.GetObjectTypeCode(LookupEntities[i]);
            }

            var url = "/_controls/lookup/lookupinfo.aspx?LookupStyle=single&objecttypes=" + EntityObjectTypeCode.join(',');
            var DialogOptions = new window.parent.Xrm.DialogOptions();
            DialogOptions.width = 700;
            DialogOptions.height = 700;
            window.parent.Xrm.Internal.openDialog(
                window.parent.Mscrm.CrmUri.create(url).toString(),
                DialogOptions, null, null, LookupDefaultValueCallbackFunction);

            return false;
        });
    }

    if (_thisGlobals.FormIsReadOnly) {
        $('#listoffieldstoselect').find('input').attr('disabled', 'disabled');

        $('#selectedfieldstable').find('tbody:first').find('input').attr('disabled', 'disabled');
        $('#selectedfieldstable').find('tbody:first').find('button').attr('disabled', 'disabled');
        $('#selectedfieldstable').find('tbody:first').find('select').attr('disabled', 'disabled');

        $("#headerbkcolor").spectrum("disable");
        $("#headerfkcolor").spectrum("disable");
        $("#oddrowcolorinput").spectrum("disable");
        $("#evenrowcolorinput").spectrum("disable");
        $('#headerformattingcontainer').find('button').attr('disabled', 'disabled');
        $('#formattingcolors').find('button').attr('disabled', 'disabled');
    }

    $('#dcrmeg_selectedgridheaders').text('Selected ' + _thisGlobals.EntityToGetMetadataFor.capitalizeFirstLetter() + ' Fields');
    CreateTooltip();
}

function ResetEvenOddRowColors(row1, row2) {
    $('#oddrowcolorinput').spectrum("set", _thisGlobals.DefaultBackgroundColor);
    $('#evenrowcolorinput').spectrum("set", _thisGlobals.DefaultBackgroundColor);
    row1.css("background-color", _thisGlobals.DefaultBackgroundColor);
    row2.css("background-color", _thisGlobals.DefaultBackgroundColor);
}

function ResetHeaderFormattingElements() {
    $('#headerfontcss').val('');
    $("#headerbkcolor").spectrum("set", _thisGlobals.DefaultBackgroundColor);
    $("#headerfkcolor").spectrum("set", _thisGlobals.DefaultTextColor);
    $('#applyheaderformattoallcells').prop('checked', false);
}

function ResetCellFormattingElements() {
    $('#cellfontcss').val('');
    $("#conditionbackgroundcolor").spectrum("set", _thisGlobals.DefaultBackgroundColor);
    $("#conditionforegroundcolor").spectrum("set", _thisGlobals.DefaultTextColor);
    $('#cellformatconditioninput').val('');
    $('#cellformatdateconditioninput').val('');
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

function LookupDefaultValueCallbackFunction(returnValue) {
    var $targetElem = $("#" + _thisGlobals._DefaultLookupElemId);
    var LookupLogicalNames = null;

    if ((returnValue) && (returnValue.items) && (returnValue.items.length) && (returnValue.items.length > 0)) {

        var ConditionLabel = returnValue.items[0].name;
        var ConditionValue = returnValue.items[0].id.replace('{', '').replace('}', '');
        LookupLogicalNames = returnValue.items[0].typename;

        if (ConditionLabel) {
            $targetElem.parent().attr('data-item-default', ConditionLabel + '{}' + ConditionValue + '{}' + LookupLogicalNames);
            $targetElem.val(ConditionLabel);
        } else {
            $targetElem.parent().removeAttr('data-item-default');
            $targetElem.val('');
        }

    } else {
        $targetElem.parent().removeAttr('data-item-default');
        $targetElem.val('');
    }

    if (_thisGlobals._DefaultLookupElemId != 'cellformatconditioninput') {
        var hiddenLookupSelect = $targetElem.parent().find('.lookupselect2class');
        if ((hiddenLookupSelect) && (hiddenLookupSelect.length)) {
            hiddenLookupSelect.select2("destroy");
            hiddenLookupSelect.remove();
        }
        if (LookupLogicalNames) {
            var inlineLookupHelper = new LookupViewHelper(LookupLogicalNames, $targetElem.parent(), $targetElem.parent().attr('data-item-viewid'));
        }
        SaveFields();
    }
}

/*Setup selected field row*/
function SetupSelectedFieldFormattingRow(htr, row1, row2, item, formattingopions) {
    var id = DCrmEditableGrid.Helper.GenerateUUID();
    var th = $('<th data-schemaname="' + item.SchemaName + '" id="' + id + '"><div style="height: 20px;">' + item.Name + '</div></th>').appendTo(htr);

    var options = formattingopions.GetHeader(item.SchemaName);
    if (options) {
        if (options.BackgroundColor) {
            th.css("background-color", options.BackgroundColor);
        }
        if (options.TextColor) {
            th.css("color", options.TextColor);
        }
        if (options.FontCss) {
            DeccoupleCss(options.FontCss, th);
        }
        options.HtmlHeaderId = id;
    } else {
        // Add a header object
        //self.Headers = []; //{ HtmlHeaderId: null, SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, ApplyToColumn: false };
        formattingopions.AddHeader(id, item.SchemaName, _thisGlobals.DefaultBackgroundColor, _thisGlobals.DefaultTextColor, null, false);
    }

    id = DCrmEditableGrid.Helper.GenerateUUID();
    var idp = DCrmEditableGrid.Helper.GenerateUUID();
    var td1 = $('<td id="' + id + '"><div style="height:20px;">Data</div></td>')
        //.attr('data-item-lookuptargetentity', item.LookupTargetEntity)
        .appendTo(row1);
    var td2 = $('<td id="' + idp + '"><div style="height:20px;">Data</div></td>').appendTo(row2);

    if ((options) && (options.ApplyToColumn)) {
        td1.find('div:first').css("background-color", options.BackgroundColor).css("color", options.TextColor);
        td2.find('div:first').css("background-color", options.BackgroundColor).css("color", options.TextColor);
    }

    options = formattingopions.GetField(item.SchemaName);
    if (options) {
        if ((options.BackgroundColor) && (_thisGlobals.DefaultBackgroundColor != options.BackgroundColor)) {
            td1.css("background-color", options.BackgroundColor);
            td2.css("background-color", options.BackgroundColor);
        }
        if ((options.TextColor) && (_thisGlobals.DefaultTextColor != options.TextColor)) {
            td1.css("color", options.TextColor);
            td2.css("color", options.TextColor);
        }
        if (options.FontCss) {
            DeccoupleCss(options.FontCss, td1);
            DeccoupleCss(options.FontCss, td2);
        }
        options.HtmlCellId = [id, idp];
    } else {
        // Add a field
        //self.Fields = []; // { HtmlCellId: null, SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, Condition: {Operator: null, Value: null, Guid: null} };
        // { Operator: 'eq', Value: 'something', Guid: 'HTRE8783-94-049-ERFD' }
        formattingopions.AddField([id, idp], item.SchemaName, _thisGlobals.DefaultBackgroundColor, _thisGlobals.DefaultTextColor, null, null);
    }
}

function SetupSelectedFieldRow(tbody, item) {

    var id = DCrmEditableGrid.Helper.GenerateUUID();
    row = $('<tr></tr>').attr('id', id)
        .attr('data-item-realindex', item.RealIndex)
        .attr('data-item-realwidth', item.RealWidth)
        .attr('data-item-label', item.Name)
        .attr('data-item-schema', item.SchemaName)
        .attr('data-item-attrtype', item.AttrType)
        .attr('data-item-readonly', item.ReadOnly)
        .attr('data-item-requiered', item.RequieredLevel)
        .attr('data-item-maxlength', item.MaxLength)
        .attr('data-item-format', item.Format)
        .attr('data-item-maxvalue', item.MaxValue)
        .attr('data-item-minvalue', item.MinValue)
        .attr('data-item-precision', item.Precision)
        .attr('data-item-lookuptargetentity', item.LookupTargetEntity)
    .appendTo(tbody);

    $('<td><span class="sortable-drag-handle">&#9776;</span></td>').appendTo(row);
    var $td = $('<td>' + item.Name + '</td>').appendTo(row);
    $('<td>' + item.SchemaName + '</td>').appendTo(row);
    $('<td>' + item.AttrType + '</td>').appendTo(row);
    $('<td>' + item.RequieredLevel + '</td>').appendTo(row);

    // Read only
    $td = $('<td></td>').appendTo(row);

    var $readonlyChk = $('<input type="checkbox" />')
        .attr('data-tilename-id', id)
        .appendTo($td).click(function (e) {
            var $this = $(this);
            $('#' + $this.attr('data-tilename-id')).attr('data-item-readonly', '' + $this.prop('checked'));
            SaveFields();
        }).appendTo($td);

    if (item.ReadOnly == 'true') {
        $readonlyChk.prop('checked', true);
    }

    // Width
    var $numInput = undefined;
    $td = $('<td></td>').appendTo(row);
    $numInput = new NumericTextbox(id, _thisGlobals.Translation_Labels.widthAutoCalculate, _thisGlobals.ToolTipClassSelector, item.RealWidth, 20, $td, SaveFields, true);


    // Setup create default values 
    var dValue = item.DefaultValue;

    $td = $('<td></td>').appendTo(row);

    if ((item.AttrType == _thisGlobals.CrmFieldTypes.TextType) || (item.AttrType == _thisGlobals.CrmFieldTypes.MemoType)) {
        if (dValue) {
            $td.attr('data-item-default', dValue);
        }
        $numInput = $('<input style="width:130px;" type="text" />')
            .attr('data-tilename-id', id)
            .val(((dValue) ? dValue : ""))
            .on('blur', function (e) {
                e.stopPropagation();
                var val = $(this).val();
                if ((val) && (val.length > 0)) {
                    $(this).parent().attr('data-item-default', val);
                } else {
                    $(this).parent().removeAttr('data-item-default');
                }
                SaveFields();
            })
            .appendTo($td);
    } else if (item.AttrType == _thisGlobals.CrmFieldTypes.BooleanType) {
        var optionset = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(_thisGlobals._CurConfiguration.Entity.SchemaName, item.SchemaName, true);
        var data = [];
        if (optionset.length > 0) {
            data.push(
            {
                Label: DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.FalseOption.Label),
                value: optionset[0].OptionSet.FalseOption.Value + ""
            });
            data.push(
            {
                Label: DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.TrueOption.Label),
                value: optionset[0].OptionSet.TrueOption.Value + ""
            });
        }

        if (dValue) {
            $td.attr('data-item-default', dValue);
        } else {
            // 0 false, 4 true
            dValue = data[0].Label + '{}' + data[0].value;
            $td.attr('data-item-default', dValue);
        }
        $numInput = new SelectBooleanCheck(id, 140, $td, data, dValue, SaveFields);

    } else if ((item.AttrType == _thisGlobals.CrmFieldTypes.DecimalType) || (item.AttrType == _thisGlobals.CrmFieldTypes.DoubleType) || (item.AttrType == _thisGlobals.CrmFieldTypes.MoneyType) || (item.AttrType == _thisGlobals.CrmFieldTypes.IntegerType)) {
        if (dValue) {
            $td.attr('data-item-default', dValue);
        }
        $numInput = new NumericTextbox(id, null, null, ((dValue) ? dValue : ""), 130, $td, SaveFields, false);

    } else if ((item.AttrType == _thisGlobals.CrmFieldTypes.LookupType) || (item.AttrType == _thisGlobals.CrmFieldTypes.CustomerType) || (item.AttrType == _thisGlobals.CrmFieldTypes.OwnerType)) {

        if(item.DefaultView) {
            $td.attr('data-item-viewid', item.DefaultView).attr('data-item-viewentityobjecttypecode', item.DefaultViewObjectTypeCode); 
        }

        var inputid = DCrmEditableGrid.Helper.GenerateUUID();
        $numInput = $('<input style="width:100px;" type="text" />')
            .attr('data-tilename-id', id)
            .attr('id', inputid)
            .on('blur', function (e) {
                e.stopPropagation();
                var _this = $(this);
                var val = _this.val();
                if ((!val) || (val === 'undefined') || (val.length == 0)) {
                    _this.parent().removeAttr('data-item-default');
                    if (dValue) {
                        _this.attr('data-item-originalval', dValue);
                    }
                    SaveFields();
                }
            })
            .appendTo($td);

        if (dValue) {
            $td.attr('data-item-default', dValue);
            $numInput.val(dValue.split('{}')[0]);
            $numInput.attr('data-item-originalval', dValue);
        }

        $numInput = $('<button class="picklistselectbtn" style="margin-left:5px;">...</button>')
            .attr('data-item-parentinputid', inputid)
            .attr('data-tilename-id', id)
            .on('click', function (e) {
                e.stopPropagation();
                _thisGlobals._DefaultLookupElemId = $(this).attr('data-item-parentinputid');
                var defaultView = $(this).parent().attr('data-item-viewid');
                var defaultviewentityname = $(this).parent().attr('data-item-viewentityobjecttypecode');

                var EntityObjectTypeCode = [];
                var LookupEntities = item.LookupTargetEntity.split(',');

                for (var i = 0; i < LookupEntities.length; i++) {
                    EntityObjectTypeCode[i] = XrmServiceToolkit.Common.GetObjectTypeCode(LookupEntities[i]);
                }

                // &search=Searchstring
                var url = "/_controls/lookup/lookupinfo.aspx?LookupStyle=single" + (defaultView ? '&DefaultViewId=' + defaultView + '&DefaultType=' + defaultviewentityname : '') + "&objecttypes=" + EntityObjectTypeCode.join(',');
                var DialogOptions = new window.parent.Xrm.DialogOptions();
                DialogOptions.width = 700;
                DialogOptions.height = 700;
                window.parent.Xrm.Internal.openDialog(
                    window.parent.Mscrm.CrmUri.create(url).toString(),
                    DialogOptions, null, null, LookupDefaultValueCallbackFunction);
            })
            .appendTo($td);

        //$numInput = $('<button class="picklistselectbtn" title="Select fields to display form this lookup" style="margin-left:5px;">F</button>')
        //    .attr('data-item-parentinputid', inputid)
        //    .attr('data-tilename-id', id)
        //    .on('click', function (e) {
        //        e.stopPropagation();
        //        RetreiveLookupEntityMetadata(item.LookupTargetEntity.split(',')[0]);
        //    }).appendTo($td);

        // default view selector
        if (dValue) {
            var entitySchemaName = dValue.split('{}')[2];
            if ((entitySchemaName) && (entitySchemaName.length > 0)) {
                _thisGlobals.LookupViewHelperArray.push(new LookupViewHelper(entitySchemaName, $td, item.DefaultView));
            }
        } else {
                _thisGlobals.LookupViewHelperArray.push(new LookupViewHelper(item.LookupTargetEntity, $td, item.DefaultView));
        }

    } else if (item.AttrType == _thisGlobals.CrmFieldTypes.DateTimeType) {
        var inputid = DCrmEditableGrid.Helper.GenerateUUID();
        $numInput = $('<input style="width:130px;" type="text" />')
            .val((dValue || ''))
            .attr('data-tilename-id', id)
            .attr('data-item-haschanged', 'N')
            .attr('id', inputid)
            .appendTo($td);

        if (dValue) {
            $td.attr('data-item-default', dValue);
            $numInput.attr('data-item-originalval', dValue);
        }

        $("#" + inputid).datetimepicker({
            timepicker: false,
            format: _thisGlobals.userDatetimeSettings.DateFormat.replace(/[//]/g, _thisGlobals.userDatetimeSettings.DateSeparator),
            formatDate: _thisGlobals.userDatetimeSettings.DateFormat.replace(/[//]/g, _thisGlobals.userDatetimeSettings.DateSeparator),
            formatTime: _thisGlobals.userDatetimeSettings.TimeFormat.replace(":", _thisGlobals.userDatetimeSettings.TimeSeparator),
            onShow: function (dp, $input) {
                if ($input.val() && $input.val().length > 0) {
                    $input.attr('data-item-openervalue', $input.val());
                } else {
                    $input.removeAttr('data-item-openervalue');
                }
            },
            onChangeDateTime: function (dp, $input) {
                var compare = $input.attr('data-item-openervalue') || 'N';

                if ($input.val() != compare) {
                    $input.attr('data-item-haschanged', 'Y');
                } else {
                    $input.attr('data-item-haschanged', 'N');
                }
            },
            onClose: function (dp, $input) {
                var compare = $input.attr('data-item-openervalue') || 'N';
                if (($input.attr('data-item-haschanged') == 'Y') && ($input.val() != compare)) {
                    $input.parent().attr('data-item-default', $input.val());
                    SaveFields();
                } else if (($input.val().length == 0) && ($input.attr('data-item-openervalue'))) {
                    $input.parent().removeAttr("data-item-default");
                    SaveFields();
                }
            }
        });

    } else if (item.AttrType == _thisGlobals.CrmFieldTypes.OptionSetType) {
        //(item.AttrType == _thisGlobals.CrmFieldTypes.State) ||
        //(item.AttrType == _thisGlobals.CrmFieldTypes.Status)) {
        var optionset = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(_thisGlobals._CurConfiguration.Entity.SchemaName, item.SchemaName, true);
        var data = [];
        if (optionset.length > 0) {
            for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                data.push(
                {
                    Label: DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label),
                    value: optionset[0].OptionSet.Options[i].Value
                });
            }
        }
        if (dValue) {
            $td.attr('data-item-default', dValue);
        }
        $numInput = new OptionSetSelect(id, 140, $td, data, dValue, SaveFields);
    }

    // colors and formatings
    $td = $('<td></td>').appendTo(row);
    $('<div><button data-schemaname="' + item.SchemaName
        + '" data-item-label="' + item.Name + '" class="headerformattingbtn selectedfieldsformattingbtns">Header</button></div>').appendTo($td);

    $td.find('.headerformattingbtn').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('#cellformattingcontainer').addClass('displaynone');
        ResetHeaderFormattingElements();

        var txt = $(this).attr('data-item-label');;
        var container = $('#headerformattingcontainer');
        container.find('.headerformattinglabel').text(txt);

        var schema = $(this).attr('data-schemaname');
        var htmlHeaderid = $(this).parent().parent().attr('id');

        container.attr('data-schemaname', schema);

        var options = _thisGlobals._CurConfiguration.GetFormattingOptions().GetHeader(schema);
        if (options) {
            //self.Headers = []; //{ HtmlHeaderId: null, SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, ApplyToColumn: false };

            if (options.BackgroundColor) {
                $('#headerbkcolor').spectrum("set", options.BackgroundColor);
            }
            if (options.TextColor) {
                $('#headerfkcolor').spectrum("set", options.TextColor);
            }
            if (options.FontCss) {
                $('#headerfontcss').val(options.FontCss);
                DeccoupleCss(options.FontCss, $('#' + options.HtmlHeaderId));
            }
            if (options.ApplyToColumn) {
                $('#applyheaderformattoallcells').prop('checked', options.ApplyToColumn);
            }
            container.attr('data-htmlheaderid', options.HtmlHeaderId);
        }

        container.removeClass('displaynone');
        return false;
    });

    $td = $('<td></td>').appendTo(row);
    $('<div><button class="cellformattingbtn selectedfieldsformattingbtns" data-schemaname="' + item.SchemaName
        + '" data-item-attrtype="' + item.AttrType
        + '" data-item-label="' + item.Name
        + '" data-item-lookuptargetentity="' + item.LookupTargetEntity + '">Cell</button></div>')
        .appendTo($td);

    $td.find('.cellformattingbtn').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);

        $('#headerformattingcontainer').addClass('displaynone');
        ResetCellFormattingElements();
        var container = $('#cellformattingcontainer');
        container.find('.cellformattinglabel').text(_this.attr('data-item-label'));

        var attrtype = _this.attr('data-item-attrtype');
        var schema = _this.attr('data-schemaname');

        var options = _thisGlobals._CurConfiguration.GetFormattingOptions().GetField(schema);
        container.attr('data-schemaname', schema)
            .attr('data-item-attrtype', attrtype)
            .attr('data-item-lookuptargetentity', _this.attr('data-item-lookuptargetentity'));

        $("#cellformatdateconditioninput").addClass('displaynone');
        $("#cellformatconditioninput").addClass('displaynone');
        var conditionElemsDefaults = null;

        switch (attrtype) {
            case _thisGlobals.CrmFieldTypes.TextType:
            case _thisGlobals.CrmFieldTypes.MemoType:
            case _thisGlobals.CrmFieldTypes.IntegerType:
            case _thisGlobals.CrmFieldTypes.DoubleType:
            case _thisGlobals.CrmFieldTypes.DecimalType:
            case _thisGlobals.CrmFieldTypes.MoneyType:
                $('#cellformatgeneralcondition').val('eq').removeClass('displaynone');
                $('#cellformatoptionsetcondition').addClass('displaynone');
                $('#cellformatdatetimeconditions').addClass('displaynone');
                $("#cellformatconditioninput").removeClass('displaynone');
                $('#cellformatconditionlookupbtn').addClass('displaynone');
                $('#cellformatlookupcondition').addClass('displaynone');
                conditionElemsDefaults = {
                    Select1: 'cellformatgeneralcondition',
                    Input1: 'cellformatconditioninput'
                };
                break;
            case _thisGlobals.CrmFieldTypes.LookupType:
            case _thisGlobals.CrmFieldTypes.OwnerType:
            case _thisGlobals.CrmFieldTypes.CustomerType:
                $('#cellformatgeneralcondition').addClass('displaynone');
                $('#cellformatoptionsetcondition').addClass('displaynone');
                $('#cellformatdatetimeconditions').addClass('displaynone');
                $("#cellformatlookupcondition").val('eq').removeClass('displaynone');
                $("#cellformatconditioninput").removeClass('displaynone');
                $('#cellformatconditionlookupbtn').removeClass('displaynone');
                conditionElemsDefaults = {
                    Select1: 'cellformatlookupcondition',
                    Input1: 'cellformatconditioninput'
                };
                break;
            case _thisGlobals.CrmFieldTypes.DateTimeType:
                $('#cellformatgeneralcondition').addClass('displaynone');
                $('#cellformatoptionsetcondition').addClass('displaynone');
                $('#cellformatconditionlookupbtn').addClass('displaynone');
                $('#cellformatlookupcondition').addClass('displaynone');
                $('#cellformatdatetimeconditions').val('on').removeClass('displaynone');
                $("#cellformatdateconditioninput").removeClass('displaynone');
                conditionElemsDefaults = {
                    Select1: 'cellformatdatetimeconditions',
                    Input1: 'cellformatdateconditioninput'
                };
                break;
            case _thisGlobals.CrmFieldTypes.BooleanType:
            case _thisGlobals.CrmFieldTypes.OptionSetType:
            case _thisGlobals.CrmFieldTypes.State:
            case _thisGlobals.CrmFieldTypes.Status:
                $('#cellformatgeneralcondition').val('eq').removeClass('displaynone');
                $('#cellformatoptionsetcondition').removeClass('displaynone');
                $('#cellformatdatetimeconditions').addClass('displaynone');
                $('#cellformatconditionlookupbtn').addClass('displaynone');
                $('#cellformatlookupcondition').addClass('displaynone');

                var optionsetSelect = $('#cellformatoptionsetcondition');
                optionsetSelect.empty();
                optionsetSelect.append('<option value="-1">---</option>');

                var optionset = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(_thisGlobals._CurConfiguration.Entity.SchemaName, schema, true);
                if (optionset.length > 0) {
                    if (attrtype == _thisGlobals.CrmFieldTypes.BooleanType) {
                        optionsetSelect.append('<option value="' + optionset[0].OptionSet.TrueOption.Value + '">' +
                            DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.TrueOption.Label) + '</option>');
                        optionsetSelect.append('<option value="' + optionset[0].OptionSet.FalseOption.Value + '">' +
                            DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.FalseOption.Label) + '</option>');
                    } else {
                        for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                            optionsetSelect.append('<option value="' + optionset[0].OptionSet.Options[i].Value + '">' +
                                DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label) + '</option>');
                        }
                    }
                }

                conditionElemsDefaults = {
                    Select1: 'cellformatgeneralcondition',
                    Select2: 'cellformatoptionsetcondition'
                };
                break;
            default:
                LogEx("Exception: No field type retrieved: " + fieldtype);
                break;
        }

        if (options) {
            //self.Fields = []; // { HtmlCellId: null, SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, Condition: {Operator: null, Value: null, Guid: null} };
            // { Operator: 'eq', Value: 'something', Guid: 'HTRE8783-94-049-ERFD' }
            if (options.BackgroundColor) {
                $('#conditionbackgroundcolor').spectrum("set", options.BackgroundColor);
            }
            if (options.TextColor) {
                $('#conditionforegroundcolor').spectrum("set", options.TextColor);
            }
            if (options.FontCss) {
                $('#cellfontcss').val(options.FontCss);
            }
            if ((options.Condition) && (conditionElemsDefaults)) {
                // set values
                if (options.Condition.Operator) {
                    $('#' + conditionElemsDefaults.Select1).val(options.Condition.Operator);
                }

                if (options.Condition.Value) {
                    if (conditionElemsDefaults.Input1) {
                        $('#' + conditionElemsDefaults.Input1).val(options.Condition.Value);
                    } else if (conditionElemsDefaults.Select2) {
                        $('#' + conditionElemsDefaults.Select2).val(options.Condition.Value);
                    }
                }

                if (options.Condition.Guid) {
                    //$('#' + conditionElemsDefaults.Input1).parent().attr('data-item-default', ConditionLabel + '{}' + ConditionValue + '{}' + LookupLogicalNames);
                }
            }
            container.attr('data-cellid', options.HtmlCellId[0])
                .attr('data-cellbelowid', options.HtmlCellId[1]);
        }

        container.removeClass('displaynone');
        return false;
    });

    // Delete
    $td = $('<td><button class="entitylistbuttons"></button></td>').appendTo(row);

    $td.find('.entitylistbuttons').on('click', function (e) {
        e.stopPropagation();
        var row = $(this).parent().parent();
        var $inputs = $(".flyout-ContentContainer").find("input[type='checkbox'][data-item-schema=" + row.attr('data-item-schema') + "]");
        if (($inputs) && ($inputs.length)) {
            //$inputs[0].scrollIntoView();
            $inputs.trigger('click');
        }
    });
}

/*Color Picker*/
function SetupColorPicker(elem, defaultVal) {
    elem.spectrum({
        flat: false,
        showInput: true,
        allowEmpty: true,
        preferredFormat: "hex",
        clickoutFiresChange: false
    });

    if (defaultVal) {
        elem.spectrum("set", defaultVal);
    }

    elem.on("change.spectrum", function (e, color) {
        var _this = $(this);
        var id = _this.attr('id');
        if (color) {
            var hexstr = color.toHexString();
            if (id == 'oddrowcolorinput' || id == 'evenrowcolorinput') {
                var options = _thisGlobals._CurConfiguration.GetFormattingOptions();
                if (id == 'oddrowcolorinput') {
                    options.OddRows = hexstr;
                }
                if (id == 'evenrowcolorinput') {
                    options.EvenRows = hexstr;
                }
                _this.parent().parent().parent().css("background-color", hexstr);
                SetParentFormDirty();
            }
        } else {
            if (id == 'oddrowcolorinput' || id == 'evenrowcolorinput') {
                var options = _thisGlobals._CurConfiguration.GetFormattingOptions();
                if (id == 'oddrowcolorinput') {
                    options.OddRows = null;
                    $("#oddrowcolorinput").spectrum("set", _thisGlobals.DefaultBackgroundColor);
                }
                if (id == 'evenrowcolorinput') {
                    options.EvenRows = null;
                    $("#evenrowcolorinput").spectrum("set", _thisGlobals.DefaultBackgroundColor);
                }
                _this.parent().parent().parent().css("background-color", "");
            } else {
                if ((id == 'headerbkcolor') || (id == 'conditionbackgroundcolor')) {
                    _this.spectrum("set", _thisGlobals.DefaultBackgroundColor);
                } else if ((id == 'headerfkcolor') || (id == 'conditionforegroundcolor')) {
                    _this.spectrum("set", _thisGlobals.DefaultTextColor);
                }
            }
            SetParentFormDirty();
        }
    });
/*
var t = $("#element").spectrum("get").toHexString();
t.toHex()       // "ff0000"
t.toHexString() // "#ff0000"
t.toRgb()       // {"r":255,"g":0,"b":0}
t.toRgbString() // "rgb(255, 0, 0)"
t.toHsv()       // {"h":0,"s":1,"v":1}
t.toHsvString() // "hsv(0, 100%, 100%)"
t.toHsl()       // {"h":0,"s":1,"l":0.5}
t.toHslString() // "hsl(0, 100%, 50%)"
t.toName()      // "red"

$("#picker").spectrum("show");
$("#picker").spectrum("hide");
$("#picker").spectrum("toggle");
$("#picker").spectrum("get");
$("#picker").spectrum("set", colorString);
$("#picker").spectrum("container");
$("#picker").spectrum("reflow");
$("#picker").spectrum("destroy");
$("#picker").spectrum("enable");
$("#picker").spectrum("disable");
$("#picker").spectrum("option", optionName);
$("#picker").spectrum("option", optionName, newOptionValue);
 */
}

/*Helpers*/
function CreateTooltip() {
    if (_thisGlobals.TooltipControl) {
        _thisGlobals.TooltipControl.UnHookTooltips();
    } else {
        _thisGlobals.TooltipControl = new BareboneTip('data-tooltip', _thisGlobals.ToolTipClassSelector);
    }
    _thisGlobals.TooltipControl.HookTooltips();
}

function DisplaySectionGroup(id, show) {
    var s = $("#maincontentsect" + id);
    if ((s) && (s.length)) {
        if (show) {
            s.removeClass('displaynone');
        } else {
            s.addClass('displaynone');
        }
    } else {
        LogEx("Unable to get main content section");
    }
}

function ParentFormSaving(context) {
    var cancel = false;

    if (GetHiddenFieldValue(1) == undefined) {
        window.parent.Xrm.Utility.alertDialog(_thisGlobals.Translation_Labels.TragetEntityReq);
        cancel = true;
    }

    if (_thisGlobals.ParentFieldsFormType == 1) {
        setTimeout(function () {
            $('#configguid').val(_thisGlobals.xrmPage.data.entity.getId());
        },
        1500);
    }

    // Calling the following 
    //else {
    //    try {
    //        var haveit = AllConfigsHaveFields();
    //        if (haveit.length > 0) {
    //            window.parent.Xrm.Utility.alertDialog(_thisGlobals.Translation_Labels.FieldReq + ' ' + haveit);
    //            cancel = true;
    //        }
    //    } catch (e) {
    //        cancel = true;
    //    }
    //}

    return cancel;
}

function SetParentTitle() {
    var final = '';
    var title = GetHiddenFieldText(1);
    if ((title) && (title.length > 0)) {
        final += title;
    }

    var $li = $('#makesortable').find('li');
    if (($li) && ($li.length)) {
        for (var i = 0; i < $li.length; i++) {
            final += '-' + $($li[i]).find('span:first').attr('data-item-orglabel');
        }
    }

    var curtitle = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.EntityNameField).getValue();
    if ((curtitle) && (curtitle == final)) {
        return false;
    }

    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.EntityNameField).setValue(final);
    return true;
}

function PopulateSavedFields() {

    _thisGlobals.ReloadedSavedFields = [];
    if (_thisGlobals._CurConfiguration.Fields) {
        var arr = _thisGlobals._CurConfiguration.Fields.split(_thisGlobals._OuterSeperator);
        $.each(arr, function (index, item) {
            var items = item.split(_thisGlobals._SEPERATOR);

            if (items.length == 1) {
                return;
            }
            _thisGlobals.ReloadedSavedFields.push({
                Name: items[0],
                SchemaName: items[1],
                AttrType: items[2],
                RequieredLevel: items[3],
                MaxLength: items[4],
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
                RealIndex: ''
            });
        });
    }

    _thisGlobals.ReloadedFieldConditions = [];
    if (_thisGlobals._CurConfiguration.Conditions) {
        var arr = _thisGlobals._CurConfiguration.Conditions.split(_thisGlobals._OuterSeperator);
        $.each(arr, function (index, item) {
            var items = item.split(_thisGlobals._SEPERATOR);
            if (items.length == 1) {
                return;
            }
            AddCondition(items[0], items[1], items[2], items[3], items[4], items[5], items[6], items[7]);
        });
        DisplayConditions();
    }
}

function CheckFieldClicked(chk) {
    SelectFieldsCallback(chk);
    CreateTooltip();
}

function SaveFields(reset) {
    if (reset) {
        _thisGlobals.ReloadedFieldConditions = [];
        _thisGlobals._CurConfiguration.Conditions = undefined;
        return;
    }

    var headersinfo = '';
    //var jheaderInfo = [];
    var $div;

    var $rows = $('#selectedfieldstable').find('tbody:first').find('tr');
    headersinfo = '';
    var $cell = undefined;
    var ftype = '';
    var val = null;
    var viewid = null;

    for (var i = 0; i < $rows.length; i++) {

        $div = $($rows[i]);
        $cell = $($rows[i].cells[7]);
        ftype = $div.attr('data-item-attrtype');

        val = null;
        if ($cell.attr('data-item-default')) {
            val = $cell.attr('data-item-default');
        } else if (ftype == _thisGlobals.CrmFieldTypes.DateTimeType) {
            val = $cell.find('input').val() || '';
        }

        if ((val == undefined) || (val == 'undefined') || (val == null) || (val == 'null')) {
            val = '';
        }

        //var item = {
        //    Name: $div.attr('data-item-label'),
        //    SchemaName: $div.attr('data-item-schema'),
        //    AttrType: $div.attr('data-item-attrtype'),
        //    RequieredLevel: $div.attr('data-item-requiered'),
        //    MaxLength: $div.attr('data-item-maxlength'),
        //    Format: $div.attr('data-item-format'),
        //    MaxValue: $div.attr('data-item-maxvalue'),
        //    MinValue: $div.attr('data-item-minvalue'),
        //    Precision: $div.attr('data-item-precision'),
        //    RealWidth: $div.attr('data-item-realwidth'),
        //    ReadOnly: $div.attr('data-item-readonly'),
        //    LookupTargetEntity: $div.attr('data-item-lookuptargetentity'),
        //    DefaultValue: val
        //};
        //jheaderInfo.push(item);

        viewid = null;
        viewentityname = '';
        viewid = $cell.attr('data-item-viewid');
        if((viewid == undefined) || (viewid == 'undefined')) {
            viewid = '';
        } else {
            viewentityname = $cell.attr('data-item-viewentityobjecttypecode');
        }

        if (i > 0) {
            headersinfo += _thisGlobals._OuterSeperator +
                $div.attr('data-item-label') + _thisGlobals._SEPERATOR +
                $div.attr('data-item-schema') + _thisGlobals._SEPERATOR +
                $div.attr('data-item-attrtype') + _thisGlobals._SEPERATOR +
                $div.attr('data-item-requiered') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-maxlength') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-format') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-maxvalue') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-minvalue') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-precision') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-realwidth') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-readonly') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-lookuptargetentity') + _thisGlobals._SEPERATOR +
            val + _thisGlobals._SEPERATOR +
            viewid + _thisGlobals._SEPERATOR +
            viewentityname;
        } else {
            headersinfo =
                $div.attr('data-item-label') + _thisGlobals._SEPERATOR +
                $div.attr('data-item-schema') + _thisGlobals._SEPERATOR +
                $div.attr('data-item-attrtype') + _thisGlobals._SEPERATOR +
                $div.attr('data-item-requiered') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-maxlength') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-format') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-maxvalue') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-minvalue') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-precision') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-realwidth') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-readonly') + _thisGlobals._SEPERATOR +
            $div.attr('data-item-lookuptargetentity') + _thisGlobals._SEPERATOR + 
            val + _thisGlobals._SEPERATOR +
            viewid + _thisGlobals._SEPERATOR +
            viewentityname;
        }
    }

    //_thisGlobals._CurConfiguration.EntityFields = jheaderInfo;
    _thisGlobals._CurConfiguration.Fields = headersinfo;
    SetParentFormDirty();
}

function SelectFieldsCallback(selectedCheckbox) {

    var tbody = $('#selectedfieldstable').find('tbody:first');

    if (selectedCheckbox.is(':checked')) {
        var item = {
            Name: selectedCheckbox.attr('data-item-label'),
            SchemaName: selectedCheckbox.attr('data-item-schema'),
            AttrType: selectedCheckbox.attr('data-item-attrtype'),
            RequieredLevel: selectedCheckbox.attr('data-item-requiered'),
            MaxLength: selectedCheckbox.attr('data-item-maxlength'),
            Format: selectedCheckbox.attr('data-item-format'),
            MaxValue: selectedCheckbox.attr('data-item-maxvalue'),
            MinValue: selectedCheckbox.attr('data-item-minvalue'),
            Precision: selectedCheckbox.attr('data-item-precision'),
            RealIndex: selectedCheckbox.attr('data-item-realindex'),
            RealWidth: selectedCheckbox.attr('data-item-realwidth'),
            ReadOnly: selectedCheckbox.attr('data-item-readonly'),
            LookupTargetEntity: selectedCheckbox.attr('data-item-lookuptargetentity')
        };
        SetupSelectedFieldRow(tbody, item);

        var formattable = $('#formattingcolors');
        var btr = formattable.find('tbody tr');
        var $row1 = $(btr[0]);
        var $row2 = $(btr[1]);
        var formattingopions = _thisGlobals._CurConfiguration.GetFormattingOptions();
        SetupSelectedFieldFormattingRow(formattable.find('thead tr'), $row1, $row2, item, formattingopions);
    } else {
        var $row = $('#selectedfieldstable').find('tbody:first').find("tr[data-item-realindex=" + selectedCheckbox.attr('data-item-realindex') + "]");
        if (($row) && ($row.length)) {
            $row.empty().remove();
        }

        var formattable = $('#formattingcolors');
        var schema = selectedCheckbox.attr('data-item-schema');
        var options = _thisGlobals._CurConfiguration.GetFormattingOptions();
        options.RemoveHeader(schema);
        options.RemoveField(schema);

        var $th = formattable.find('thead tr').find("th[data-schemaname=" + schema + "]");
        var index = $th[0].cellIndex;
        $th.remove();
        var $trs = formattable.find('tbody tr');
        for (var i = 0; i < $trs.length; i++) {
            $($trs[i].cells[index]).remove();
        }

        if ((!$("#cellformattingcontainer").hasClass('displaynone')) && ($("#cellformattingcontainer").attr('data-schemaname') == schema)) {
            $("#cellformattingcontainer").addClass('displaynone');
        }
        if ((!$("#headerformattingcontainer").hasClass('displaynone')) && ($("#headerformattingcontainer").attr('data-schemaname') == schema)) {
            $("#headerformattingcontainer").addClass('displaynone');
        }
    }

    SaveFields();
}

function GetHiddenFieldValue(which) {
    var field = undefined;
    if (which == 1) {
        field = _thisGlobals.DisplayOnEntityFieldName;
    } else if (which == 2) {
        field = _thisGlobals.DisplayFromEntityFieldName;
    } else if (which == 3) {
        field = _thisGlobals.FromEntityFieldsAttr;
        //} else if (which == 4) {
        //    field = EntitiesAreRelatedBoolean;
        //} else if (which == 5) {
        //    field = RelatedEntityLookupSchemaName;
    } else if (which == 6) {
        field = _thisGlobals.FieldConditionValues;
    }

    if (!field) {
        return field;
    }

    var result = _thisGlobals.xrmPage.data.entity.attributes.get(field).getValue();
    if (result) {
        if (which == 3) {
            return RetrieveEntityOutput(result, true);
        }

        if (which == 4) {
            return result;
        }

        if (which == 6) {
            return RetrieveEntityOutput(result, true);
        }

        return result.split('|')[0];
    }
    return undefined;
}

function GetHiddenFieldText(which) {
    var field = undefined;
    if (which == 1) {
        field = _thisGlobals.DisplayOnEntityFieldName;
    } else if (which == 2) {
        field = _thisGlobals.DisplayFromEntityFieldName;
    }

    if (!field) {
        return field;
    }

    var result = _thisGlobals.xrmPage.data.entity.attributes.get(field).getValue();
    if (result) {
        return result.split('|')[1];
    }
    return undefined;
}

/*Field Conditions*/
function RemoveCondition(conditionAttr) {
    var condition = -1;
    for (var i = 0; i < _thisGlobals.ReloadedFieldConditions.length; i++) {
        if (_thisGlobals.ReloadedFieldConditions[i].ConditionAttribute == conditionAttr) {
            condition = i;
            break;
        }
    }
    if (condition != -1) {
        _thisGlobals.ReloadedFieldConditions.splice(condition, 1);
        if (_thisGlobals.ReloadedFieldConditions.length == 0) {
            DisplaySectionGroup(7, false);
        }
        return true;
    }

    return false;
}

function DeleteAllConditions() {
    // Adjust conditions to work
    _thisGlobals.ReloadedFieldConditions = [];
    SaveConditions();
    if (_thisGlobals._CurConfiguration.HasStatusField) {
        AddCondition('statecode', '0', 'eq', 'Active', _thisGlobals.CrmFieldTypes.State, null, _thisGlobals._CurConfiguration.HasStatusField, 'State');
    }
    SetParentFormDirty();
    DisplaySectionGroup(7, false);
}

function AddCondition(attr, val, op, cl, fdt, llnames, orgattr, fname) {
    LogIt("Loading attr " + attr + " val " + val + " op " + op + " cl " + cl + " fdt " + fdt + " llnames " + llnames + " orgattr " + orgattr + " fname " + fname);
    // exists, update
    for (var i = 0; i < _thisGlobals.ReloadedFieldConditions.length; i++) {
        if (_thisGlobals.ReloadedFieldConditions[i].ConditionAttribute == attr) {
            _thisGlobals.ReloadedFieldConditions[i] = {
                ConditionAttribute: attr,
                ConditionValue: val,
                ConditonOperator: op,
                ConditionLabel: cl,
                CrmFieldType: fdt,
                LookupLogicalNames: (((llnames) && ((llnames) != 'undefined')) ? llnames : ''),
                ConditionAttributeOrg: orgattr,
                CrmFieldLabel: fname
            };
            return;
        }
    }

    // Add new
    var tmpCondition = {
        ConditionAttribute: attr,
        ConditionValue: val,
        ConditonOperator: op,
        ConditionLabel: cl,
        CrmFieldType: fdt,
        LookupLogicalNames: (((llnames) && ((llnames) != 'undefined')) ? llnames : ''),
        ConditionAttributeOrg: orgattr,
        CrmFieldLabel: fname
    };
    _thisGlobals.ReloadedFieldConditions.push(tmpCondition);

    if ((attr != 'statecode') || (_thisGlobals.ReloadedFieldConditions.length > 1)) {
        DisplaySectionGroup(7, true);
    }

    return tmpCondition;
}

function AddACondition(con) {
    DisplaySectionGroup(7, true);
    // exists, update
    for (var i = 0; i < _thisGlobals.ReloadedFieldConditions.length; i++) {
        if (_thisGlobals.ReloadedFieldConditions[i].ConditionAttribute == con.ConditionAttribute) {
            _thisGlobals.ReloadedFieldConditions[i] = con;
            return;
        }
    }

    // Add new
    _thisGlobals.ReloadedFieldConditions.push(con);
}

function FindCondition(conditionAttr) {
    var condition = undefined;

    for (var i = 0; i < _thisGlobals.ReloadedFieldConditions.length; i++) {
        if (_thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg == conditionAttr) {
            condition = jQuery.extend(true, {}, _thisGlobals.ReloadedFieldConditions[i]);  //_thisGlobals.ReloadedFieldConditions[i];
            break;
        }
    }

    return condition;
}

function SaveConditions() {

    if (_thisGlobals.ReloadedFieldConditions.length == 0) {
        $('#conditionsfetchdisplay').html('');
        _thisGlobals._CurConfiguration.Conditions = undefined;
        return;
    }

    //var jheadersinfo = [];
    var headersinfo = '';
    var cop = '';

    for (var i = 0; i < _thisGlobals.ReloadedFieldConditions.length; i++) {
        cop = _thisGlobals.ReloadedFieldConditions[i].ConditonOperator;

        //var item = {
        //    ConditionAttribute: _thisGlobals.ReloadedFieldConditions[i].ConditionAttribute,
        //    ConditionValue: _thisGlobals.ReloadedFieldConditions[i].ConditionValue,
        //    OperatorFetchOp: (_thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) ? (cop + ';' + _thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) : cop,
        //    ConditionLabel: _thisGlobals.ReloadedFieldConditions[i].ConditionLabel,
        //    CrmFieldType: _thisGlobals.ReloadedFieldConditions[i].CrmFieldType,
        //    LookupLogicalNames: _thisGlobals.ReloadedFieldConditions[i].LookupLogicalNames,
        //    ConditionAttributeOrg: _thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg,
        //    CrmFieldLabel: _thisGlobals.ReloadedFieldConditions[i].CrmFieldLabel
        //};
        //jheadersinfo.push(item);

        var tmpVal = (_thisGlobals.ReloadedFieldConditions[i].ConditionValue) ? _thisGlobals.ReloadedFieldConditions[i].ConditionValue : '';
        if (_thisGlobals.ReloadedFieldConditions[i].CrmFieldType == _thisGlobals.CrmFieldTypes.DateTimeType) {
            if ((tmpVal.contains('/')) && (_thisGlobals.userDatetimeSettings.DateSeparator != '/')) {
                tmpVal = tmpVal.split('/').join(_thisGlobals.userDatetimeSettings.DateSeparator);
            }
            if ((tmpVal.contains('.')) && (_thisGlobals.userDatetimeSettings.DateSeparator != '.')) {
                tmpVal = tmpVal.split('.').join(_thisGlobals.userDatetimeSettings.DateSeparator);
            }
        }

        if (i > 0) {
            headersinfo += _thisGlobals._OuterSeperator + _thisGlobals.ReloadedFieldConditions[i].ConditionAttribute + _thisGlobals._SEPERATOR
            + tmpVal + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) ? (cop + ';' + _thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) : cop) + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionLabel) ? _thisGlobals.ReloadedFieldConditions[i].ConditionLabel : '') + _thisGlobals._SEPERATOR
            + _thisGlobals.ReloadedFieldConditions[i].CrmFieldType + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].LookupLogicalNames) ? _thisGlobals.ReloadedFieldConditions[i].LookupLogicalNames : '') + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg) ? _thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg : '') + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].CrmFieldLabel) ? _thisGlobals.ReloadedFieldConditions[i].CrmFieldLabel : '');
        } else {
            headersinfo = _thisGlobals.ReloadedFieldConditions[i].ConditionAttribute + _thisGlobals._SEPERATOR
            + tmpVal + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) ? (cop + ';' + _thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) : cop) + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionLabel) ? _thisGlobals.ReloadedFieldConditions[i].ConditionLabel : '') + _thisGlobals._SEPERATOR
            + _thisGlobals.ReloadedFieldConditions[i].CrmFieldType + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].LookupLogicalNames) ? _thisGlobals.ReloadedFieldConditions[i].LookupLogicalNames : '') + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg) ? _thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg : '') + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].CrmFieldLabel) ? _thisGlobals.ReloadedFieldConditions[i].CrmFieldLabel : '');
        }
    }

    //_thisGlobals._CurConfiguration.EntityConditions = jheadersinfo;
    _thisGlobals._CurConfiguration.Conditions = headersinfo;
    DisplayConditions();
    SetParentFormDirty();
}

function DisplayConditions() {

    var Aattr = undefined,
        Aop = undefined,
        Aval = undefined,
        Atype = undefined,
        Aret = '';

    try {
        for (var index = 0; index < _thisGlobals.ReloadedFieldConditions.length; index++) {
            var reCond = _thisGlobals.ReloadedFieldConditions[index];

            Aattr = reCond.ConditionAttribute;
            Aval = ((reCond.ConditionValue) &&
                (reCond.ConditionValue != 'undefined'))
                ? reCond.ConditionValue : '';
            Aop = reCond.ConditonOperator;
            Atype = reCond.CrmFieldType;

            var condName = '';
            var tmp = '';
            var changedattr = undefined;

            if ((_thisGlobals.AllFieldsMetadata) && (_thisGlobals.AllFieldsMetadata.length > 0)) {
                for (var i = 0; i < _thisGlobals.AllFieldsMetadata.length; i++) {
                    if (_thisGlobals.AllFieldsMetadata[i].SchemaName == reCond.ConditionAttributeOrg) {
                        condName = '<span style="font-weight:bold;">' + _thisGlobals.AllFieldsMetadata[i].Name + "</span><br />";
                        break;
                    }
                }
            }

            if (Atype == _thisGlobals.CrmFieldTypes.DateTimeType) {
                if (Aval.contains('/')) {
                    Aval = Aval.split('/').join('-');
                }
                if (Aval.contains('.')) {
                    Aval = Aval.split('.').join('-');
                }
            }

            if (Aval.contains(';')) {
                var inarg = Aval.split(';');
                if (Aop.contains(';')) {
                    var tmpAop = Aop.split(';')[1];
                    tmp += condName + '&lt;condition attribute="' + Aattr + '" operator="' + ((tmpAop == 'eq') ? 'in' : 'not-in') + '"&gt;<br />';
                } else {
                    tmp += condName + '&lt;condition attribute="' + Aattr + '" operator="' + ((Aop == 'eq') ? 'in' : 'not-in') + '"&gt;<br />';
                }

                var uitypes = ((reCond.LookupLogicalNames) && (reCond.LookupLogicalNames.length > 0)) ? reCond.LookupLogicalNames.split(';') : [];
                var uinames = ((reCond.ConditionLabel) && (reCond.ConditionLabel.length > 0)) ? reCond.ConditionLabel.split(';') : [];

                for (var i = 0; i < inarg.length; i++) {
                    if ((Atype == _thisGlobals.CrmFieldTypes.LookupType) || (Atype == _thisGlobals.CrmFieldTypes.CustomerType) || (Atype == _thisGlobals.CrmFieldTypes.OwnerType)) {
                        tmp += '&nbsp;&nbsp;&nbsp;&lt;value uiname="' + uinames[i] + '" uitype="' + uitypes[i] + '"&gt;{' + inarg[i] + '}&lt;/value&gt;<br />';
                    } else {
                        tmp += '&nbsp;&nbsp;&nbsp;&lt;value&gt;' + inarg[i] + '&lt;/value&gt;<br />';
                    }
                }
                tmp += '&lt;/condition&gt;';
            } else if (Aval.length == 0) {
                tmp += condName + '&lt;condition attribute="' + Aattr + '" operator="' + Aop + '" /&gt;<br />';
            } else {
                // operator
                if (Aop.contains(';')) {
                    tmp += condName + '&lt;condition attribute="' + Aattr + '" operator="' + Aop.split(';')[1] + '" value="' + Aval + '" /&gt;<br />';
                } else {
                    tmp += condName + '&lt;condition attribute="' + Aattr + '" operator="' + Aop + '" value="' + Aval + '" /&gt;<br />';
                }
            }

            if (tmp.length > 0) {
                Aret += '<div class="displayconditionitem" data-item-schema="' + Aattr + '" data-item-org-schema="' + reCond.ConditionAttributeOrg + '">' + tmp + '</div>';
            }

        }
    } catch (conde) {
        LogEx("Exception: unable to get field conditions. " + conde.message);
        $('#conditionsfetchdisplay').html('');
        return;
    }

    $('#conditionsfetchdisplay').html(Aret);

    $("#conditionsfetchdisplay").find(".displayconditionitem").off('click').on('click', function (e) {
        if (_thisGlobals.FormIsReadOnly) {
            e.stopPropagation();
            return false;
        }
        var $this = $(this);
        var $inputs = $(".flyout-ContentContainer").find("input[type='checkbox'][data-item-schema=" + $this.attr('data-item-org-schema') + "]");
        if (($inputs) && ($inputs.length)) {
            $inputs[0].scrollIntoView();
            $inputs.next().next().trigger('click');
            e.stopPropagation();
        }
    });
}

function GetFieldConditionSelectOptionLabelByValue(fieldtype, fieldval) {
    var id = undefined;
    switch (fieldtype) {
        case _thisGlobals.CrmFieldTypes.TextType:
        case _thisGlobals.CrmFieldTypes.MemoType:
            id = _thisGlobals.FieldIds.stringconditions;
            break;
        case _thisGlobals.CrmFieldTypes.DateTimeType:
            id = _thisGlobals.FieldIds.datetimeconditions;
            break;
        case _thisGlobals.CrmFieldTypes.LookupType:
            id = _thisGlobals.FieldIds.lookupconditions;
            break;
        case _thisGlobals.CrmFieldTypes.OwnerType:
            id = _thisGlobals.FieldIds.systemuserlookup;
            break;
        case _thisGlobals.CrmFieldTypes.CustomerType:
            id = _thisGlobals.FieldIds.customerlookup;
            break;
        case _thisGlobals.CrmFieldTypes.BooleanType:
        case _thisGlobals.CrmFieldTypes.OptionSetType:
        case _thisGlobals.CrmFieldTypes.State:
        case _thisGlobals.CrmFieldTypes.Status:
            id = _thisGlobals.FieldIds.optionsetconditions;
            break;
        case _thisGlobals.CrmFieldTypes.IntegerType:
        case _thisGlobals.CrmFieldTypes.DoubleType:
        case _thisGlobals.CrmFieldTypes.DecimalType:
        case _thisGlobals.CrmFieldTypes.MoneyType:
            id = _thisGlobals.FieldIds.numericconditions;
            break;
        default:
            break;
    }

    if (id) {
        var options = $(id).find('option');
        var lookfor = fieldval.contains(';') ? fieldval.split(';')[0] : fieldval;
        for (var i = 0; i < options.length; i++) {
            var opt = $(options[i]);
            if (opt.val() == lookfor) {
                return opt.text();
            }
        }
    }

    return fieldval;
}

function FieldConditionSelectId(fieldtype) {

    var id = undefined;
    switch (fieldtype) {
        case _thisGlobals.CrmFieldTypes.TextType:
        case _thisGlobals.CrmFieldTypes.MemoType:
            id = { id: _thisGlobals.FieldIds.stringconditions, label: '#stringconditionslabel', SelectedOptionValue: 'eq', ShowInput: true };
            break;
        case _thisGlobals.CrmFieldTypes.DateTimeType:
            id = { id: _thisGlobals.FieldIds.datetimeconditions, label: '#datetimeconditionslabel', SelectedOptionValue: 'on', ShowDate: true };
            break;
        case _thisGlobals.CrmFieldTypes.LookupType:
            id = { id: _thisGlobals.FieldIds.lookupconditions, label: '#lookupconditionslabel', SelectedOptionValue: 'eq', ShowInput: true, ShowLookupBtn: true };
            break;
        case _thisGlobals.CrmFieldTypes.OwnerType:
            id = { id: _thisGlobals.FieldIds.systemuserlookup, label: '#systemuserctllabel', SelectedOptionValue: 'eq-userid' };
            break;
        case _thisGlobals.CrmFieldTypes.CustomerType:
            id = { id: _thisGlobals.FieldIds.customerlookup, label: '#customerlookuplabel', SelectedOptionValue: 'eq', ShowInput: true, ShowLookupBtn: true };
            break;
        case _thisGlobals.CrmFieldTypes.BooleanType:
        case _thisGlobals.CrmFieldTypes.OptionSetType:
        case _thisGlobals.CrmFieldTypes.State:
        case _thisGlobals.CrmFieldTypes.Status:
            id = { id: _thisGlobals.FieldIds.optionsetconditions, label: '#optionsetconditionslabel', SelectedOptionValue: 'eq', ShowInput: true, ShowSelectBtn: true };
            break;
        case _thisGlobals.CrmFieldTypes.IntegerType:
        case _thisGlobals.CrmFieldTypes.DoubleType:
        case _thisGlobals.CrmFieldTypes.DecimalType:
        case _thisGlobals.CrmFieldTypes.MoneyType:
            id = { id: _thisGlobals.FieldIds.numericconditions, label: '#numericconditionslabel', SelectedOptionValue: 'eq', ShowInput: true };
            break;
        default:
            LogEx("Exception: No field type retrieved: " + fieldtype);
            break;
    }
    return id;
}

function ConditionSelectOnChange(id) {
    $(id).off('change').on('change', function (e) {

        var $this = $(this);
        var option = $this.find("option:selected");
        var id = $this.attr('id');

        _thisGlobals.CurFieldCondition.ConditonOperator = option.val();
        _thisGlobals.CurFieldCondition.OperatorFetchOp = option.attr('data-fetchop');
        _thisGlobals.CurFieldCondition.OperatorFetchVal = option.attr('data-fetchval');
        // undefined or one of %{0}% or %{0} or {0}%

        _thisGlobals.CurFieldCondition.ConditionAttributeLookup = undefined;
        _thisGlobals.CurFieldCondition.ConditionAttributeOptionset = undefined;

        if ((id == 'stringconditions') || (id == 'numericconditions')) {
            if (_thisGlobals.CurFieldCondition.OperatorFetchOp) {
                $(_thisGlobals.FieldIds.fieldconditioninput).val('').show().focus();
            } else {
                $(_thisGlobals.FieldIds.fieldconditioninput).val('').hide();
            }

        } else if (id == 'optionsetconditions') {
            _thisGlobals.CurFieldCondition.ConditionAttributeOptionset = _thisGlobals.CurFieldCondition.ConditionAttributeOrg;

            if (_thisGlobals.CurFieldCondition.OperatorFetchOp) {
                if ((_thisGlobals.CurFieldCondition.OperatorFetchOp == 'eq') || (_thisGlobals.CurFieldCondition.OperatorFetchOp == 'ne')) {
                    $(_thisGlobals.FieldIds.picklistselect).show();
                    $(_thisGlobals.FieldIds.fieldconditioninput).val('').attr('readonly', 'readonly');
                } else {
                    $(_thisGlobals.FieldIds.picklistselect).hide();
                    _thisGlobals.CurFieldCondition.ConditionAttributeOptionset += 'name';
                    $(_thisGlobals.FieldIds.fieldconditioninput).val('').removeAttr('readonly');
                }
                $(_thisGlobals.FieldIds.fieldconditioninput).show().focus();
            } else {
                $(_thisGlobals.FieldIds.fieldconditioninput).val('').hide();
                $(_thisGlobals.FieldIds.picklistselect).hide();
            }

        } else if (id == 'datetimeconditions') {
            if (_thisGlobals.CurFieldCondition.OperatorFetchOp) {
                if (_thisGlobals.CurFieldCondition.OperatorFetchOp == 'olderthan-x-months') {
                    $(_thisGlobals.FieldIds.dateconditioninput).val('').hide();
                    $(_thisGlobals.FieldIds.fieldconditioninput).val('').removeAttr('readonly').show().focus();
                } else {
                    $(_thisGlobals.FieldIds.dateconditioninput).val('').show().datetimepicker('show');
                    $(_thisGlobals.FieldIds.fieldconditioninput).val('').hide();
                }
            } else if ((_thisGlobals.CurFieldCondition.ConditonOperator.startsWith('last-x')) ||
                    (_thisGlobals.CurFieldCondition.ConditonOperator.startsWith('next-x'))) {
                $(_thisGlobals.FieldIds.dateconditioninput).val('').hide();
                $(_thisGlobals.FieldIds.fieldconditioninput).val('').removeAttr('readonly').show().focus();
            } else {
                $(_thisGlobals.FieldIds.fieldconditioninput).val('').hide();
                $(_thisGlobals.FieldIds.dateconditioninput).val('').hide();
            }

        } else if ((id == 'lookupconditions') || (id == 'systemuserlookup') || (id == 'customerlookup')) {
            _thisGlobals.CurFieldCondition.ConditionAttributeLookup = _thisGlobals.CurFieldCondition.ConditionAttributeOrg;

            if (_thisGlobals.CurFieldCondition.OperatorFetchOp) {
                if ((_thisGlobals.CurFieldCondition.OperatorFetchOp == 'eq') || (_thisGlobals.CurFieldCondition.OperatorFetchOp == 'ne')) {
                    $(_thisGlobals.FieldIds.lookupsearchbtn).show();
                    $(_thisGlobals.FieldIds.fieldconditioninput).val('').attr('readonly', 'readonly');
                } else {
                    $(_thisGlobals.FieldIds.lookupsearchbtn).hide();
                    _thisGlobals.CurFieldCondition.ConditionAttributeLookup += 'name';
                    $(_thisGlobals.FieldIds.fieldconditioninput).val('').removeAttr('readonly');
                }
                $(_thisGlobals.FieldIds.fieldconditioninput).show().focus();
            } else {
                $(_thisGlobals.FieldIds.lookupsearchbtn).hide();
                $(_thisGlobals.FieldIds.fieldconditioninput).val('').hide();
            }
        }

        e.stopPropagation();
    });
}

function moveItems(origin, dest) {
    $(origin).find(':selected').appendTo(dest);
}

function moveAllItems(origin, dest) {
    $(origin).children().appendTo(dest);
}

/* Get a list of active forms for a specific entity */
function RetreiveSystemFormsForEntity(entity) {
    //// entity = "incident"
    //if ((entity == undefined) || (entity == null)) {
    //    entity = "incident";
    //}

    // Get the forms that this user is allowed to see
    //var userId = _thisGlobals.LoggedInUserID;

    var requestMain = "";
    requestMain += "      <request i:type=\"b:RetrieveFilteredFormsRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">";
    requestMain += "        <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">";

    requestMain += "          <a:KeyValuePairOfstringanyType>";
    requestMain += "            <c:key>EntityLogicalName</c:key>";
    requestMain += "            <c:value i:type=\"d:string\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">" + entity.toLowerCase() + "</c:value>";
    requestMain += "          </a:KeyValuePairOfstringanyType>";

    requestMain += "          <a:KeyValuePairOfstringanyType>";
    requestMain += "            <c:key>FormType</c:key>";
    requestMain += "            <c:value i:type=\"a:OptionSetValue\">";
    requestMain += "              <a:Value>2</a:Value>";
    requestMain += "            </c:value>";
    requestMain += "          </a:KeyValuePairOfstringanyType>";

    requestMain += "          <a:KeyValuePairOfstringanyType>";
    requestMain += "            <c:key>SystemUserId</c:key>";
    requestMain += "            <c:value i:type=\"d:guid\" xmlns:d=\"http://schemas.microsoft.com/2003/10/Serialization/\">" + _thisGlobals.LoggedInUserID + "</c:value>";
    requestMain += "          </a:KeyValuePairOfstringanyType>";

    requestMain += "        </a:Parameters>";
    requestMain += "        <a:RequestId i:nil=\"true\" />";
    requestMain += "        <a:RequestName>RetrieveFilteredForms</a:RequestName>";
    requestMain += "      </request>";

    _thisGlobals.CrmFormFieldsSchemas = [];
    var xmlFormIds = XrmServiceToolkit.Soap.Execute(requestMain);
    if (xmlFormIds) {
        RetreiveSystemFormsForEntityCallback(xmlFormIds);
    }
}

function RetreiveSystemFormsForEntityCallback(xmlDoc) {
    var child = undefined;
    if ((xmlDoc.childNodes) && (xmlDoc.childNodes.length)) {
        child = xmlDoc.childNodes[0].textContent;
    }
    // Child Node RetrieveFilteredFormsSystemForms1fed44d1-ae68-4a41-bd2b-f13acac4acfasystemform
    if (child == undefined) {
        child = xmlDoc.text; // IE 11
    }

    if ((child) && (child.length > 0)) {
        child = child.replace("RetrieveFilteredFormsSystemForms", "");
        var formIds = child.split("systemform");

        //RetreiveFormXml(formIds[0]);
        var xmlDoc = XrmServiceToolkit.Soap.Retrieve('systemform', formIds[0], ['formxml']);
        var foundDup = false;
        var ts;

        if (xmlDoc) {
            var formxml = xmlDoc.attributes['formxml'].value;
            var xml = $.parseXML(formxml),
            $xml = $(xml),
            $cells = $xml.find('cell');


            $cells.each(function () {
                // Get the control id
                $ctl = $(this).find("control");

                if ($ctl.length != 0) {
                    // Do not bother with controls starting with "header_" as they are 
                    // hosted on the header
                    _thisGlobals.MandatoryFieldsOptionsId = $ctl.attr('id');
                    if ((_thisGlobals.MandatoryFieldsOptionsId != undefined) &&
                        (_thisGlobals.MandatoryFieldsOptionsId != "undefined") &&
                        (_thisGlobals.MandatoryFieldsOptionsId != null) &&
                        (_thisGlobals.MandatoryFieldsOptionsId.length > 0) &&
                        (!_thisGlobals.MandatoryFieldsOptionsId.startsWith('header_'))) {

                        ts = _thisGlobals.MandatoryFieldsOptionsId.toLowerCase();
                        foundDup = false;

                        for (var i = 0; i < _thisGlobals.CrmFormFieldsSchemas.length; i++) {
                            if (_thisGlobals.CrmFormFieldsSchemas[i] == ts) {
                                foundDup = true;
                                break;
                            }
                        }
                        if (!foundDup) {
                            _thisGlobals.CrmFormFieldsSchemas.push(ts);
                        }
                    }
                }
            });

        }
    } // No ID
}

function RetreiveFormNameFromFormId(formid) {

    var query =
    "    <a:ColumnSet>" +
    "     <a:AllColumns>false</a:AllColumns>" +
    "     <a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
    "      <b:string>name</b:string>" +
    "     </a:Columns>" +
    "    </a:ColumnSet>" +
    "    <a:Criteria>" +
    "     <a:Conditions>" +
    "      <a:ConditionExpression>" +
    "       <a:AttributeName>formid</a:AttributeName>" +
    "       <a:Operator>Equal</a:Operator>" +
    "       <a:Values xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
    "        <b:anyType i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + formid + "</b:anyType>" +
    "       </a:Values>" +
    "      </a:ConditionExpression>" +
    "     </a:Conditions>" +
    "     <a:FilterOperator>And</a:FilterOperator>" +
    "     <a:Filters />" +
    "    </a:Criteria>" +
    "    <a:Distinct>false</a:Distinct>" +
    "    <a:EntityName>systemform</a:EntityName>" +
    "    <a:LinkEntities />" +
    "    <a:Orders />" +
    "    <a:PageInfo>" +
    "     <a:Count>0</a:Count>" +
    "     <a:PageNumber>0</a:PageNumber>" +
    "     <a:PagingCookie i:nil='true' />" +
    "     <a:ReturnTotalRecordCount>true</a:ReturnTotalRecordCount>" +
    "    </a:PageInfo>" +
    "    <a:NoLock>false</a:NoLock>";

    var formName = XrmServiceToolkit.Soap.RetrieveMultiple(query);
    if (formName.length > 0) {
        return formName[0].attributes['name'].value;
    }

    return '';
}

function RetreiveFormXml(systemFormId) {
    XrmServiceToolkit.Soap.Retrieve('systemform', systemFormId, ['formxml'], RetreiveFormXmlCallback);
}

function RetreiveFormXmlCallback(xmlDoc) {
    _thisGlobals.CrmFormFieldsSchemas = [];
    var formxml = xmlDoc.attributes['formxml'].value;
    var xml = $.parseXML(formxml),
    $xml = $(xml),
    $cells = $xml.find('cell');
    var sortedList = new Array();

    $cells.each(function () {
        // Get the control id
        $ctl = $(this).find("control");
        /*
        <cell id="{542e581d-cca1-5e40-e6d9-d67a9d1468b4}" showlabel="true" locklevel="0">
            <labels>
                <label description="Full Name" languagecode="1033"/>
            </labels>
            <control id="fullname" classid="{4273EDBD-AC1D-40d3-9FB2-095C621B552D}" datafieldname="fullname" disabled="false"/>
        </cell>
            
        */

        if ($ctl.length != 0) {
            // Do not bother with controls starting with "header_" as they are 
            // hosted on the header
            _thisGlobals.MandatoryFieldsOptionsId = $ctl.attr('id');
            if ((_thisGlobals.MandatoryFieldsOptionsId != undefined) &&
                (_thisGlobals.MandatoryFieldsOptionsId != null) &&
                (_thisGlobals.MandatoryFieldsOptionsId.length > 0) &&
                (!_thisGlobals.MandatoryFieldsOptionsId.startsWith('header_'))) {

                // Get the first label (E) Label
                $labels = $(this).find('labels');
                $label = $labels.find('label');

                $label.each(function () {
                    // If we could  not find a label then we use the schema name instead
                    var desc = $(this).attr('description');
                    if ((desc != undefined) && (desc != null) && (desc.length > 0)) {
                        // key: parentcustomerid val: Company Name
                        _thisGlobals.CrmFormFieldsSchemas.push(_thisGlobals.MandatoryFieldsOptionsId.toLowerCase());
                        return;
                    }
                });
            }
        }
    });
}

/*Translation related*/
function GetTranslationsFor(lcid) {
    var fetch = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
      '<entity name="dcrmeg_dcrmegtranslation">' +
        '<attribute name="dcrmeg_dcrmegtranslationid" />' +
        '<attribute name="dcrmeg_name" />' +
        '<attribute name="dcrmeg_lcid" />' +

        '<attribute name="dcrmeg_widthisautocalculated" />' +
        '<attribute name="dcrmeg_width" />' +
        '<attribute name="dcrmeg_systemfields" />' +
        '<attribute name="dcrmeg_selectedgridheaders" />' +
        '<attribute name="dcrmeg_selectfields" />' +
        '<attribute name="dcrmeg_relatedentitylookup" />' +
        '<attribute name="dcrmeg_readonly" />' +
        '<attribute name="dcrmeg_maxrecordsperpage" />' +
        '<attribute name="dcrmeg_fieldsontheform" />' +
        '<attribute name="dcrmeg_displaysumfornumericvalues" />' +
        '<attribute name="dcrmeg_displayonlyrelatedrecords" />' +
        '<attribute name="dcrmeg_displaygridonentity" />' +
        '<attribute name="dcrmeg_displaydatafromentity" />' +
        '<attribute name="dcrmeg_customfields" />' +
        '<attribute name="dcrmeg_allfields" />' +
        '<attribute name="dcrmeg_targetentityisrequiered" />' +
        '<attribute name="dcrmeg_entitytodisplaythegridonisrequiered" />' +
        '<attribute name="dcrmeg_atleasetonefieldmustbeselected" />' +

        '<attribute name="dcrmeg_fieldcondition" />' +
        '<attribute name="dcrmeg_fieldvalue" />' +
        '<attribute name="dcrmeg_setcondition" />' +
        '<attribute name="dcrmeg_configcancel" />' +
        '<attribute name="dcrmeg_removecondition" />' +

        '<order attribute="dcrmeg_name" descending="false" />' +
        '<filter type="and">' +
          '<condition attribute="dcrmeg_lcid" operator="eq" value="' + lcid + '" />' +
        '</filter>' +
    '</entity>' +
  '</fetch>';
    return XrmServiceToolkit.Soap.Fetch(fetch);
}

/*User settings currency and datetime*/
function GetUserSettings(userId) {

    var attributes = "";

    for (var i = 1; i < arguments.length; i++) {
        attributes += '<attribute name="' + arguments[i] + '" />';
    }

    var fetchXml = [
        '<fetch mapping="logical">',
            '<entity name="usersettings">',
                attributes,
                '<filter>',
                    '<condition attribute="systemuserid" operator="eq" value="', userId, '" />',
                '</filter>',
            '</entity>',
        '</fetch>'].join('');

    var result = XrmServiceToolkit.Soap.Fetch(fetchXml);

    return result.length > 0 ? result[0] : null;
}

function GetCurrentUserDateTimeSettings() {

    var result = GetUserSettings(
                      _thisGlobals.LoggedInUserID,
                      "dateformatstring",
                      "dateseparator",
                      "timeformatstring",
                      "timeseparator");
    return {
        // /
        DateSeparator: result.attributes.dateseparator.value,
        // M/d/yyyy
        DateFormat: result.attributes.dateformatstring.value,
        // h:mm tt
        TimeFormat: result.attributes.timeformatstring.value,
        // :
        TimeSeparator: result.attributes.timeseparator.value,
        DateTimeFormat: result.attributes.dateformatstring.value + " " + result.attributes.timeformatstring.value
    };
}

function CallbackFunction(returnValue) {
    var isfirst = true;
    var index = 0;

    if ((returnValue) && (returnValue.items) && (returnValue.items[0].id) && (returnValue.items[0].name)) {

        _thisGlobals.CurFieldCondition.LookupData = [];
        for (var i = 0; i < returnValue.items.length; i++) {
            _thisGlobals.CurFieldCondition.LookupData[i] = {};
            _thisGlobals.CurFieldCondition.LookupData[i].LookupName = returnValue.items[i].name;
            _thisGlobals.CurFieldCondition.LookupData[i].LookupId = returnValue.items[i].id.replace('{', '').replace('}', '');
            // returnValue.items[0].type "112"
            _thisGlobals.CurFieldCondition.LookupData[i].LookupLogicalName = returnValue.items[i].typename // 'incident" LogicalName

            if (!isfirst) {
                _thisGlobals.CurFieldCondition.ConditionLabel += ';' + _thisGlobals.CurFieldCondition.LookupData[i].LookupName;
                _thisGlobals.CurFieldCondition.ConditionValue += ';' + _thisGlobals.CurFieldCondition.LookupData[i].LookupId;
                _thisGlobals.CurFieldCondition.LookupLogicalNames += ';' + _thisGlobals.CurFieldCondition.LookupData[i].LookupLogicalName;
            } else {
                isfirst = false;
                _thisGlobals.CurFieldCondition.ConditionLabel = _thisGlobals.CurFieldCondition.LookupData[i].LookupName;
                _thisGlobals.CurFieldCondition.ConditionValue = _thisGlobals.CurFieldCondition.LookupData[i].LookupId;
                _thisGlobals.CurFieldCondition.LookupLogicalNames = _thisGlobals.CurFieldCondition.LookupData[i].LookupLogicalName;
            }
        }

        if (_thisGlobals.CurFieldCondition.ConditionLabel) {
            $("#fieldconditioninput").val(_thisGlobals.CurFieldCondition.ConditionLabel);
        } else {
            $("#fieldconditioninput").val('');
        }

    }
}

/*Initialization*/
function InitializeSetupRoutines() {

    if (window.frameElement) {
        $(window.frameElement).css('width', '100%');
    }

    _thisGlobals.xrmPage = window.parent.Xrm.Page;
    _thisGlobals.ParentFieldsFormType = _thisGlobals.xrmPage.ui.getFormType();
    _thisGlobals.FormIsReadOnly = ((_thisGlobals.ParentFieldsFormType == 3) || (_thisGlobals.ParentFieldsFormType == 4));
    _thisGlobals.WaitDialog = $('#dcrmegProcessingDialog');

    if (_thisGlobals.ParentFieldsFormType != 1) {
        $('#configguid').val(_thisGlobals.xrmPage.data.entity.getId());
    }

    _thisGlobals.ToolTipClassSelector = DCrmEditableGrid.Helper.GenerateRandomLetters(10);
    _thisGlobals.userDatetimeSettings = GetCurrentUserDateTimeSettings();
    //console.log("DateFormat [" + _thisGlobals.userDatetimeSettings.DateFormat +
    //    "] DateTime Format [" + _thisGlobals.userDatetimeSettings.DateTimeFormat + "] Date Seperator [" +
    //    _thisGlobals.userDatetimeSettings.DateSeparator + "]");

    _thisGlobals.Translation_Labels.widthAutoCalculate = "0, width is auto calculated";
    _thisGlobals.Translation_Labels.width = "Width";
    _thisGlobals.Translation_Labels.readonly = "Read-only";
    _thisGlobals.Translation_Labels.TragetEntityReq = "Target entity is requiered.";
    _thisGlobals.Translation_Labels.EntityToDisplayReq = "Entity to display the grid on is requiered.";
    _thisGlobals.Translation_Labels.FieldReq = "At leaset one field must be selected for";
    _thisGlobals.Translation_Labels.FieldConditionBtn = "Filter";
    _thisGlobals.Translation_Labels.ConditionMissingError = "Please enter a value for the condition";
    _thisGlobals.Translation_Labels.Aggregate = "Aggrgate";

    var currUserLcid = _thisGlobals.xrmPage.context.getUserLcid();
    var translation = GetTranslationsFor(currUserLcid);
    if (translation.length > 0) {
        var dp = $("#displayentityfieldsoptions");
        dp.empty();

        $('<option value="100000000"></option>')
            .text((translation[0].attributes["dcrmeg_fieldsontheform"] ? translation[0].attributes["dcrmeg_fieldsontheform"].value : ''))
            .appendTo(dp);
        $('<option value="100000001"></option>')
            .text((translation[0].attributes["dcrmeg_customfields"] ? translation[0].attributes["dcrmeg_customfields"].value : ''))
            .appendTo(dp);
        $('<option value="100000002"></option>')
            .text((translation[0].attributes["dcrmeg_systemfields"] ? translation[0].attributes["dcrmeg_systemfields"].value : ''))
            .appendTo(dp);
        $('<option selected="selected" value="100000003"></option>')
            .text((translation[0].attributes["dcrmeg_allfields"] ? translation[0].attributes["dcrmeg_allfields"].value : ''))
            .appendTo(dp);

        //$("#dcrmeg_selectfields")
        //    .text((translation[0].attributes["dcrmeg_selectfields"] ? translation[0].attributes["dcrmeg_selectfields"].value : ''));

        $("#dcrmeg_selectedgridheaders")
            .text((translation[0].attributes["dcrmeg_selectedgridheaders"] ? translation[0].attributes["dcrmeg_selectedgridheaders"].value : ''));

        _thisGlobals.Translation_Labels.widthAutoCalculate = (translation[0].attributes["dcrmeg_widthisautocalculated"] ? translation[0].attributes["dcrmeg_widthisautocalculated"].value : '');
        _thisGlobals.Translation_Labels.width = (translation[0].attributes["dcrmeg_width"] ? translation[0].attributes["dcrmeg_width"].value : '');
        _thisGlobals.Translation_Labels.readonly = (translation[0].attributes["dcrmeg_readonly"] ? translation[0].attributes["dcrmeg_readonly"].value : '');

        $("#dcrmeg_relatedentitylookup").text((translation[0].attributes["dcrmeg_relatedentitylookup"] ? translation[0].attributes["dcrmeg_relatedentitylookup"].value : ''));
        $("#dcrmeg_maxrecordsperpage").text((translation[0].attributes["dcrmeg_maxrecordsperpage"] ? translation[0].attributes["dcrmeg_maxrecordsperpage"].value : ''));
        $("#dcrmeg_displaysumfornumericvalues").text((translation[0].attributes["dcrmeg_displaysumfornumericvalues"] ? translation[0].attributes["dcrmeg_displaysumfornumericvalues"].value : ''));
        $("#dcrmeg_displayonlyrelatedrecords").text((translation[0].attributes["dcrmeg_displayonlyrelatedrecords"] ? translation[0].attributes["dcrmeg_displayonlyrelatedrecords"].value : ''));
        $("#dcrmeg_displaygridonentity").text((translation[0].attributes["dcrmeg_displaygridonentity"] ? translation[0].attributes["dcrmeg_displaygridonentity"].value : ''));
        $("#dcrmeg_displaydatafromentity").text((translation[0].attributes["dcrmeg_displaydatafromentity"] ? translation[0].attributes["dcrmeg_displaydatafromentity"].value : ''));

        $("#dcrmeg_targetentityisrequiered").text((translation[0].attributes["dcrmeg_targetentityisrequiered"] ? translation[0].attributes["dcrmeg_targetentityisrequiered"].value : ''));
        $("#dcrmeg_entitytodisplaythegridonisrequiered").text((translation[0].attributes["dcrmeg_entitytodisplaythegridonisrequiered"] ? translation[0].attributes["dcrmeg_entitytodisplaythegridonisrequiered"].value : ''));
        $("#dcrmeg_atleasetonefieldmustbeselected").text((translation[0].attributes["dcrmeg_atleasetonefieldmustbeselected"] ? translation[0].attributes["dcrmeg_atleasetonefieldmustbeselected"].value : ''));

        _thisGlobals.Translation_Labels.FieldConditionBtn = (translation[0].attributes["dcrmeg_fieldcondition"] ? translation[0].attributes["dcrmeg_fieldcondition"].value : '');
        _thisGlobals.Translation_Labels.ConditionMissingError = (translation[0].attributes["dcrmeg_pleaseenteravalueforthecondition"] ? translation[0].attributes["dcrmeg_pleaseenteravalueforthecondition"].value : '');

        $("#fieldconditionslabel").text((translation[0].attributes["dcrmeg_fieldvalue"] ? translation[0].attributes["dcrmeg_fieldvalue"].value : ''));

        $("#deleteallfieldconditionsbtn")
            .text((translation[0].attributes["dcrmeg_deleteallfieldconditions"] ? translation[0].attributes["dcrmeg_deleteallfieldconditions"].value : ''));
        $("#setfieldcondition")
            .text((translation[0].attributes["dcrmeg_setcondition"] ? translation[0].attributes["dcrmeg_setcondition"].value : ''));
        $("#cancelfieldcondition")
            .text((translation[0].attributes["dcrmeg_configcancel"] ? translation[0].attributes["dcrmeg_configcancel"].value : ''));
        $("#removefieldcondition")
            .text((translation[0].attributes["dcrmeg_removecondition"] ? translation[0].attributes["dcrmeg_removecondition"].value : ''));
    }

    $("#dcrmeg_displaygridonentity").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#dcrmeg_displaygridonentity").text());
    $("#dcrmeg_displaydatafromentity").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#dcrmeg_displaydatafromentity").text());
    $("#dcrmeg_displaydatafromentity_copy").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#dcrmeg_displaydatafromentity_copy").text());
    $("#dcrmeg_displaysumfornumericvalues").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#dcrmeg_displaysumfornumericvalues").text());
    $("#dcrmeg_maxrecordsperpage").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#dcrmeg_maxrecordsperpage").text());
    $("#dcrmeg_displayonlyrelatedrecords").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#dcrmeg_displayonlyrelatedrecords").text());
    $("#dcrmeg_relatedentitylookup").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#dcrmeg_relatedentitylookup").text());
    $("#deleteallfieldconditionsbtn").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#deleteallfieldconditionsbtn").text());

    $("#autosavechanges_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#autosavechanges_label").text());
    $("#hideautosave_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#hideautosave_label").text());
    $("#allowcreate_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#allowcreate_label").text());
    $("#allowdelete_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#allowdelete_label").text());

    $("#distinctvalues_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#distinctvalues_label").text());

    $("#refreshaftercreate_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#refreshaftercreate_label").text());
    $("#refreshaftersave_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#refreshaftersave_label").text());
    $("#createnewbtnclick_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#createnewbtnclick_label").text());
    $("#booleaneditorbehaviour_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#booleaneditorbehaviour_label").text());
    $("#gridtitlelabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#gridtitlelabel").text());
    $("#pastefromexcellabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#pastefromexcellabel").text());

    $("#displayclearfilterbuttonlabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#displayclearfilterbuttonlabel").text());
    $("#displayheaderfilterlabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#displayheaderfilterlabel").text());
    $("#displayexportbuttonlabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#displayexportbuttonlabel").text());
    $("#displaysetrecordstatelabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#displaysetrecordstatelabel").text());
    $("#displayclonerecordlabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#displayclonerecordlabel").text());
    $("#displayclonerecordbuttonlabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#displayclonerecordbuttonlabel").text());
    $("#openrecordbehavoirlabel").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#openrecordbehavoirlabel").text());

    if ((window.parent.OnFormSaveFunctionCallback != 'undefined') && (window.parent.OnFormSaveFunctionCallback != undefined) &&
        (typeof window.parent.OnFormSaveFunctionCallback === 'function')) {
        window.parent.OnFormSaveFunctionCallback(ParentFormSaving);
    }

    $("#displayonentity").on("change", function (e) {
        var realValue = $(this).val();
        var realText = $(this).find("option:selected").text();

        if ((realValue == undefined) || (realValue == null) || (realValue == '0')) {
            return;
        }

        _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.DisplayOnEntityFieldName).setValue(realValue + '|' + realText);
        ResetEntityGrid();
        SetParentTitle();
        SetParentFormDirty();
    });
    $('#entitiesAreRelated').on('click', function (e) {
        var checked = $(this).prop('checked');
        _thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnEntity = checked;

        SetParentFormDirty();
    });
    $('#relatedEntityLookupSelect').on('change', function (e) {
        var val = $(this).val();
        _thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnLookupSchemaName = val;
        $('#relatedEntityLookup').val(val);
        SetParentFormDirty();
    });
    $('#displaySum').on('click', function (e) {
        _thisGlobals._CurConfiguration.DisplaySum = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#gridtitle').on('blur', function (e) {
        _thisGlobals._CurConfiguration.GridTitle = $(this).val();

        SetParentFormDirty();
    });
    $('#displayclearfilterbutton').on('click', function (e) {
        _thisGlobals._CurConfiguration.DisplayClearFilterButton = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#displayheaderfilter').on('click', function (e) {
        _thisGlobals._CurConfiguration.DisplayHeaderFilter = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#displayexportbutton').on('click', function (e) {
        _thisGlobals._CurConfiguration.DisplayExportButton = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#displaysetrecordstate').on('click', function (e) {
        _thisGlobals._CurConfiguration.DisplaySetRecordState = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#displayclonerecord').on('click', function (e) {
        _thisGlobals._CurConfiguration.DisplayCloneRecord = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#displayclonerecordbutton').on('click', function (e) {
        _thisGlobals._CurConfiguration.DisplayCloneRecordButton = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#openrecordbehavoir').on('change', function (e) {
        var val = $(this).val();
        _thisGlobals._CurConfiguration.OpenRecordBehavoir = val;

        SetParentFormDirty();
    });
    $('#systemcurrencyprecision').on('change', function (e) {
        var val = $(this).val();
        _thisGlobals._CurConfiguration.SystemCurrencyPrecision = val;

        SetParentFormDirty();
    });


    $('#autosavechanges_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.AutoSaveChanges = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#hideautosave_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.HideAutosaveButton = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#allowcreate_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.AllowCreateNew = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#allowdelete_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.AllowDelete = $(this).prop('checked');
        SetParentFormDirty();
    });
    $('#distinctvalues_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.DistinctValues = $(this).prop('checked');	 
        SetParentFormDirty();
    });
    $('#refreshaftercreate_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.RefreshAfterCreate = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#refreshaftersave_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.RefreshAfterSave = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#pastefromexcel_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.PasteFromExcel = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#displayentityfieldsoptions').on('change', function (e) {
        var val = $(this).val();
        _thisGlobals._CurConfiguration.FieldDisplayOption = parseInt(val);
        SetupFieldsDisplayOption();

        SetParentFormDirty();
    });
    $('#maxrecordperpage').on('change', function (e) {
        var val = $(this).val();
        _thisGlobals._CurConfiguration.RecordsPerPage = val;

        SetParentFormDirty();
    });
    $('#createnewbtnclick').on('change', function (e) {
        var val = $(this).val();
        _thisGlobals._CurConfiguration.NewBtnBehavoir = val; // 10 inline, 20 new window, 30 show menu (Default)

        SetParentFormDirty();
    });
    $('#booleaneditorbehaviour').on('change', function (e) {
        var val = $(this).val();
        _thisGlobals._CurConfiguration.BooleanEditorBehavoir = val; // 10 one click, 20 dislay editor (default)

        SetParentFormDirty();
    });

    $('#datetimeeditorminutestep').on('blur', function (e) {
        var val = $(this).val();
        if (val.length == 0) {
            $(this).val(_thisGlobals._CurConfiguration.DateTimeMinuteStep);
            return;
        }
        var num = parseInt(val);
        if (isNaN(num)) {
            $(this).val(_thisGlobals._CurConfiguration.DateTimeMinuteStep);
            return;
        } else {
            _thisGlobals._CurConfiguration.DateTimeMinuteStep = num + '';
        }
        SetParentFormDirty();
    });
    $("#cancelsetpicklistcondition").on('click', function (e) {
        $("#picklistconditionflyout").hide('slow');
    });
    $("#picklistselect").on('click', function (e) {
        // If boolean type, use a different method
        var TargetEntitySchemaName = _thisGlobals._CurConfiguration.Entity.SchemaName;

        var optionset = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(TargetEntitySchemaName, _thisGlobals.CurFieldCondition.ConditionAttributeOrg, true);
        var data = [];
        if (optionset.length > 0) {

            if (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.BooleanType) {
                data.push(
                {
                    Label: DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.TrueOption.Label),
                    value: optionset[0].OptionSet.TrueOption.Value
                });
                data.push(
                {
                    Label: DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.FalseOption.Label),
                    value: optionset[0].OptionSet.FalseOption.Value
                });
            } else {
                for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                    data.push(
                    {
                        Label: DCrmEditableGrid.Helper.GetUserLocalizedLabel(optionset[0].OptionSet.Options[i].Label),
                        value: optionset[0].OptionSet.Options[i].Value
                    });
                }
            }
        }

        if (_thisGlobals.PickListCheckboxListCtl) {
            _thisGlobals.PickListCheckboxListCtl.empty();
        }
        _thisGlobals.PickListCheckboxListCtl = DCrmEditableGrid.Helper.PicklistCheckboxList(data);

        // reload
        if ((_thisGlobals.CurFieldCondition.PicklistData) && (_thisGlobals.CurFieldCondition.PicklistData.length > 0)) {
            var $selected = _thisGlobals.PickListCheckboxListCtl.find('input');
            for (var i = 0; i < $selected.length; i++) {
                for (var ii = 0; ii < _thisGlobals.CurFieldCondition.PicklistData.length; ii++) {
                    if ($($selected[i]).attr('data-item-value') == _thisGlobals.CurFieldCondition.PicklistData[ii].Value) {
                        $($selected[i]).prop('checked', true);
                    }
                }
            }
        }

        $("#picklistconditionflyout").show('slow');
    });
    $("#setpicklistcondition").on('click', function (e) {
        var chks = undefined;
        var index = 0;
        var $selected = _thisGlobals.PickListCheckboxListCtl.find('input');

        if (($selected) && ($selected.length)) {
            _thisGlobals.CurFieldCondition.PicklistData = [];

            for (var i = 0; i < $selected.length; i++) {
                if ($($selected[i]).is(":checked")) {
                    _thisGlobals.CurFieldCondition.PicklistData.push({ Label: $($selected[i]).attr('data-item-label'), Value: $($selected[i]).attr('data-item-value') });
                    index = _thisGlobals.CurFieldCondition.PicklistData.length - 1;
                    if (index > 0) {
                        _thisGlobals.CurFieldCondition.ConditionLabel += ';' + _thisGlobals.CurFieldCondition.PicklistData[index].Label;
                        _thisGlobals.CurFieldCondition.ConditionValue += ';' + _thisGlobals.CurFieldCondition.PicklistData[index].Value;
                        index++;
                    } else {
                        _thisGlobals.CurFieldCondition.ConditionLabel = _thisGlobals.CurFieldCondition.PicklistData[index].Label;
                        _thisGlobals.CurFieldCondition.ConditionValue = _thisGlobals.CurFieldCondition.PicklistData[index].Value;
                    }
                }
            }

            if (_thisGlobals.CurFieldCondition.ConditionLabel) {
                $("#fieldconditioninput").val(_thisGlobals.CurFieldCondition.ConditionLabel);
            } else {
                $("#fieldconditioninput").val('');
            }
        }
        $("#picklistconditionflyout").hide('slow');
    });
    $("#lookupsearchbtn").on('click', function (e) {
        // Get the entities object codes
        var EntityObjectTypeCode = [];
        var EntityPrimaryName = [];
        var EntitySchemaName = [];

        // ReLoad if anything we already have
        for (var i = 0; i < _thisGlobals.CurFieldCondition.LookupEntities.length; i++) {
            // EntityTargets
            EntityObjectTypeCode[i] = XrmServiceToolkit.Common.GetObjectTypeCode(_thisGlobals.CurFieldCondition.LookupEntities[i]);
            EntityPrimaryName[i] = '';
            EntitySchemaName[i] = _thisGlobals.CurFieldCondition.LookupEntities[i] + 'id';

            // Needs to be a structure to hold more than one entity (Customer -> account, contact)
            var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Attributes'], _thisGlobals.CurFieldCondition.LookupEntities[i], false);
            if (result.length > 0) {
                var ent = undefined;
                for (var index = 0, j = result[0].Attributes.length; index < j; index++) {
                    ent = result[0].Attributes[index];
                    if ((ent) && (ent.IsPrimaryName)) {
                        EntityPrimaryName[i] = ent.SchemaName.toLowerCase();
                        break;
                    }
                }
            }
        }

        //var url = "/_controls/lookup/lookupmulti.aspx?objecttypes=" + EntityObjectTypeCode.join(',');
        // LookupStyle=single
        // currentObjectType=2&currentid=kjdfjhjkgdfgsdfjg
        // otypename="account" otype="1" oid="{27A79D85-748C-E511-80C7-08002738AA19}"
        var url = "/_controls/lookup/lookupinfo.aspx?LookupStyle=multi&objecttypes=" + EntityObjectTypeCode.join(',');
        var DialogOptions = new window.parent.Xrm.DialogOptions();
        DialogOptions.width = 700;
        DialogOptions.height = 700;
        window.parent.Xrm.Internal.openDialog(
            window.parent.Mscrm.CrmUri.create(url).toString(),
            DialogOptions, null, null, CallbackFunction);
    });
    $("#cancelfieldcondition").on('click', function (e) {
        _thisGlobals.CurFieldCondition = undefined;
        $("#fieldconditionflyout").hide('slow');
    });
    $("#setfieldcondition").on('click', function (e) {
        if ((_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.TextType) ||
            (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.MemoType) ||
            (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.IntegerType) ||
            (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.DoubleType) ||
            (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.DecimalType) ||
            (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.MoneyType)) {

            _thisGlobals.CurFieldCondition.ConditionValue = $(_thisGlobals.FieldIds.fieldconditioninput).val();
            _thisGlobals.CurFieldCondition.ConditionLabel = _thisGlobals.CurFieldCondition.ConditionValue;

        } else if (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.DateTimeType) {
            _thisGlobals.CurFieldCondition.ConditionValue = $(_thisGlobals.FieldIds.dateconditioninput).val();
            _thisGlobals.CurFieldCondition.ConditionLabel = _thisGlobals.CurFieldCondition.ConditionValue;

        } else if ((_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                    (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.State) ||
                    (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.Status)) {
            if ((_thisGlobals.CurFieldCondition.ConditionAttributeOptionset) && (_thisGlobals.CurFieldCondition.ConditionAttributeOptionset != _thisGlobals.CurFieldCondition.ConditionAttributeOrg)) {
                _thisGlobals.CurFieldCondition.ConditionAttribute = _thisGlobals.CurFieldCondition.ConditionAttributeOptionset;
                _thisGlobals.CurFieldCondition.ConditionValue = $(_thisGlobals.FieldIds.fieldconditioninput).val();
                _thisGlobals.CurFieldCondition.ConditionLabel = _thisGlobals.CurFieldCondition.ConditionValue;
            }

        } else if ((_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.LookupType) ||
            (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.OwnerType) ||
            (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.CustomerType)) {
            if ((_thisGlobals.CurFieldCondition.ConditionAttributeLookup) && (_thisGlobals.CurFieldCondition.ConditionAttributeLookup != _thisGlobals.CurFieldCondition.ConditionAttributeOrg)) {
                _thisGlobals.CurFieldCondition.ConditionAttribute = _thisGlobals.CurFieldCondition.ConditionAttributeLookup;
                _thisGlobals.CurFieldCondition.ConditionValue = $(_thisGlobals.FieldIds.fieldconditioninput).val();
                _thisGlobals.CurFieldCondition.ConditionLabel = _thisGlobals.CurFieldCondition.ConditionValue;
            }
        }

        if (($(_thisGlobals.FieldIds.fieldconditioninput).css('display') !== 'none') || ($(_thisGlobals.FieldIds.dateconditioninput).css('display') !== 'none')) {
            if ((_thisGlobals.CurFieldCondition.ConditionValue == undefined) || (_thisGlobals.CurFieldCondition.ConditionValue == 'undefined') ||
                (_thisGlobals.CurFieldCondition.ConditionValue.length == undefined) || (_thisGlobals.CurFieldCondition.ConditionValue.length == 0)) {
                window.parent.Xrm.Utility.alertDialog(_thisGlobals.Translation_Labels.ConditionMissingError);
                return;
            }
        }

        if (_thisGlobals.CurFieldCondition.OperatorFetchVal) {
            _thisGlobals.CurFieldCondition.ConditionValue = _thisGlobals.CurFieldCondition.OperatorFetchVal.replace('{0}', _thisGlobals.CurFieldCondition.ConditionValue);
        }

        if ((_thisGlobals.CurFieldCondition.ConditonOperator == 'not-null') || (_thisGlobals.CurFieldCondition.ConditonOperator == 'null')) {
            _thisGlobals.CurFieldCondition.ConditionValue = '';
            _thisGlobals.CurFieldCondition.ConditionLabel = '';
        }

        LogIt("Before Save Label [" + _thisGlobals.CurFieldCondition.ConditionLabel +
            "] Value [" + _thisGlobals.CurFieldCondition.ConditionValue +
            "] Op [" + _thisGlobals.CurFieldCondition.ConditonOperator +
            "] fetchop [" + _thisGlobals.CurFieldCondition.OperatorFetchOp +
            "] fetchval [" + _thisGlobals.CurFieldCondition.OperatorFetchVal + "]");

        AddACondition(_thisGlobals.CurFieldCondition);
        SaveConditions();
        $("#fieldconditionflyout").hide('slow');

        var btntooltip = '<span>' +
            ' ' + _thisGlobals.CurFieldCondition.CrmFieldLabel +
            ' ' + GetFieldConditionSelectOptionLabelByValue(_thisGlobals.CurFieldCondition.CrmFieldType, _thisGlobals.CurFieldCondition.ConditonOperator) +
            ' ' + (((_thisGlobals.CurFieldCondition.ConditionLabel) && (_thisGlobals.CurFieldCondition.ConditionLabel != 'undefined')) ? _thisGlobals.CurFieldCondition.ConditionLabel : '') + '</span>';
        $('#' + _thisGlobals.CurFieldCondition.BtnId).attr('data-tooltip', btntooltip).addClass('checklistbuttoncondition');
        _thisGlobals.CurFieldCondition = undefined;
    });
    $("#removefieldcondition").on('click', function (e) {
        RemoveCondition(_thisGlobals.CurFieldCondition.ConditionAttribute);
        SaveConditions();

        $("#fieldconditionflyout").hide('slow');
        $('#' + _thisGlobals.CurFieldCondition.BtnId).attr('data-tooltip', _thisGlobals.Translation_Labels.FieldConditionBtn).removeClass('checklistbuttoncondition');
        _thisGlobals.CurFieldCondition = undefined;
    });
    $("#deleteallfieldconditionsbtn").on('click', function (e) {
        var btns = $('#listoffieldstoselect').find('.checklistbuttoncondition');
        if ((btns) && (btns.length)) {
            DeleteAllConditions();
            for (var i = 0; i < btns.length; i++) {
                var btn = $(btns[i]);
                var $tile = $('#' + btn.attr('data-tilename-id'));

                if ($tile.attr('data-item-schema') != 'statecode') {
                    btn.attr('data-tooltip', _thisGlobals.Translation_Labels.FieldConditionBtn).removeClass('checklistbuttoncondition');
                }
            }
        }

        e.stopPropagation();
    });

    $("#cellformattingokbtn").on('click', function (e) {
        e.stopPropagation();

        var container = $('#cellformattingcontainer');
        var schema = container.attr('data-schemaname');
        var attrtype = container.attr('data-item-attrtype');
        var bkColor = $("#conditionbackgroundcolor").spectrum("get").toHexString();
        var frColor = $("#conditionforegroundcolor").spectrum("get").toHexString();

        var options = _thisGlobals._CurConfiguration.GetFormattingOptions();
        console.log(options);

        var headeroption = options.GetField(schema);

        var cellcondition = null;
        // { Operator: 'eq', Value: 'something', Guid: 'HTRE8783-94-049-ERFD' }
        // 'data-item-default', ConditionLabel + '{}' + ConditionValue + '{}' + LookupLogicalNames
        switch (attrtype) {
            case _thisGlobals.CrmFieldTypes.TextType:
            case _thisGlobals.CrmFieldTypes.MemoType:
                var selected = $("#cellformatgeneralcondition option:selected").val();
                if ((selected) && (selected != '-1')) {
                    cellcondition = { Operator: selected, Value: $("#cellformatconditioninput").val() };
                }
                break;
            case _thisGlobals.CrmFieldTypes.IntegerType:
                var selected = $("#cellformatgeneralcondition option:selected").val();
                if ((selected) && (selected != '-1')) {
                    cellcondition = { Operator: selected, Value: parseInt($("#cellformatconditioninput").val()) };
                }
                break;
            case _thisGlobals.CrmFieldTypes.DoubleType:
            case _thisGlobals.CrmFieldTypes.DecimalType:
            case _thisGlobals.CrmFieldTypes.MoneyType:
                var selected = $("#cellformatgeneralcondition option:selected").val();
                if ((selected) && (selected != '-1')) {
                    cellcondition = { Operator: selected, Value: parseFloat($("#cellformatconditioninput").val()) };
                }
                break;
            case _thisGlobals.CrmFieldTypes.LookupType:
            case _thisGlobals.CrmFieldTypes.OwnerType:
            case _thisGlobals.CrmFieldTypes.CustomerType:
                var selected = $("#cellformatlookupcondition option:selected").val();
                if ((selected) && (selected != '-1')) {
                    var lookupvalue = $('#cellformatconditioninput').parent().attr('data-item-default');
                    if (lookupvalue) {
                        var arr = lookupvalue.split('{}');
                        cellcondition = { Operator: selected, Value: arr[0], Guid: arr[1] };
                    }
                }
                break;
            case _thisGlobals.CrmFieldTypes.DateTimeType:
                var selected = $("#cellformatdatetimeconditions option:selected").val();
                if ((selected) && (selected != '-1')) {
                    cellcondition = { Operator: selected, Value: $("#cellformatdateconditioninput").val() };
                }
                break;
            case _thisGlobals.CrmFieldTypes.BooleanType:
            case _thisGlobals.CrmFieldTypes.OptionSetType:
            case _thisGlobals.CrmFieldTypes.State:
            case _thisGlobals.CrmFieldTypes.Status:
                var selected = $("#cellformatgeneralcondition option:selected").val();
                var selected2 = $("#cellformatoptionsetcondition option:selected").val();
                if ((selected) && (selected != '-1') && (selected2)) {
                    cellcondition = { Operator: selected, Value: selected2 };
                }
                break;
            default:
                LogEx("Exception: No field type retrieved: " + fieldtype);
                break;
        }

        if (cellcondition == null) {
            container.addClass('displaynone');
            return;
        }

        var cellone = $('#' + headeroption.HtmlCellId[0]);
        var celltwo = $('#' + headeroption.HtmlCellId[1]);
        cellone.css('background-color', bkColor).css('color', frColor);
        celltwo.css('background-color', bkColor).css('color', frColor);

        var tmp = {
            HtmlCellId: headeroption.HtmlCellId,
            SchemaName: schema,
            BackgroundColor: bkColor,
            TextColor: frColor,
            FontCss: null,
            Condition: cellcondition
        };

        if ($('#cellfontcss').val()) {
            DeccoupleCss($('#cellfontcss').val(), cellone);
            DeccoupleCss($('#cellfontcss').val(), celltwo);
            tmp.FontCss = $('#cellfontcss').val();
        } else if ((headeroption) && (headeroption.FontCss)) {
            DeccoupleCss(headeroption.FontCss, cellone, true);
            DeccoupleCss(headeroption.FontCss, celltwo, true);
        }
        
        options.AddOrUpdateField(schema, tmp);
        container.addClass('displaynone');
        SetParentFormDirty();
    });
    $("#cellformattingcancelbtn").on('click', function (e) {
        e.stopPropagation();
        $("#cellformattingcontainer").addClass('displaynone');
    });
    $("#cellformattingresetbtn").on('click', function (e) {
        e.stopPropagation();
        ResetCellFormattingElements();
    });


    $('#listoffieldstoselectfilter').on('keypress', function (e) {
        var tkey = e.which || e.keycode;
        e.stopPropagation();

        try {
            var val = $(this).val() + String.fromCharCode(tkey);

            if ((val) && (val.length) && (val.length > 0)) {
                val = val.toLowerCase();
                LogIt("keypress " + val);

                var $inputs = $(".flyout-ContentContainer").find("input[type='checkbox']");
                if (($inputs) && ($inputs.length)) {
                    for (var i = 0; i < $inputs.length; i++) {
                        var tmp = $($inputs[i]);
                        if (tmp.attr('data-item-label').toLowerCase().startsWith(val)) {
                            $inputs[i].scrollIntoView();
                            break;
                        }
                    }
                }
            }
        } catch (e) {

        }

    });
    $('#addentitytodisplaybutton').on('click', function (e) {
        e.stopPropagation();
        var schemaName = $('#displayfromentity').val();
        var entityLabel = $('#displayfromentity').find("option:selected").text();

        if ((schemaName == undefined) || (schemaName == null) || (schemaName == '0')) {
            return;
        }

        //if (EntityGridEntityExists(schemaName)) {
        //    return;
        //}

        var data = { SchemaName: schemaName, Label: entityLabel };
        var config = new DCrmEGConfigurationManager(data);
        AddToMainConfiguration(config);
        SetParentTitle();
        SetParentFormDirty();
        DisplaySelectedEntityInfo(config.Li, schemaName, config.Entity.LiId);
    });
    $('#configuresorting').on('click', function (e) {
        var $rows = $('#selectedfieldstable').find('tbody:first').find('tr');

        if (($rows) && ($rows.length) && ($rows.length > 0)) {
            var $div;
            var $primary = $('#sorttypeprimary');
            var $secondary = $('#sorttypesecondary');

            $primary.empty();
            $('<option selected="selected" value="-1">---</option>').appendTo($primary);
            $secondary.empty();
            $('<option selected="selected" value="-1">---</option>').appendTo($secondary);

            for (var i = 0; i < $rows.length; i++) {

                $div = $($rows[i]);
                $('<option value="' + $div.attr('data-item-schema') + '">' + $div.attr('data-item-label') + '</option>').appendTo($primary);
                $('<option value="' + $div.attr('data-item-schema') + '">' + $div.attr('data-item-label') + '</option>').appendTo($secondary);
            }

            if (_thisGlobals._CurConfiguration.SortOrder) {
                var sorts = _thisGlobals._CurConfiguration.SortOrder.split(';');

                $primary.val(sorts[0]);
                $('input[name="sorttypeprimaryradio"][value="' + sorts[1] + '"]').prop('checked', true);

                if (sorts.length > 2) {
                    $secondary.val(sorts[2]);
                    $('input[name="sorttypesecondaryradio"][value="' + sorts[3] + '"]').prop('checked', true);
                }
            }

            $("#colsorttypedilog").show('slow');
        }
    });
    $('#sorttypeok').on('click', function (e) {
        var final = undefined;

        var primarySelectVal = $('#sorttypeprimary').val(); // -1, schemaname
        var secondaySelectVal = $('#sorttypesecondary').val();

        var primaryRadioVal = $("input[name=sorttypeprimaryradio]:checked").val(); // 0 asc, 1 desc
        var secondaryRadioVal = $("input[name=sorttypesecondaryradio]:checked").val();

        if (primarySelectVal != '-1') {
            final = primarySelectVal + ";" + primaryRadioVal;
        }
        if (secondaySelectVal != '-1') {
            final += ";" + secondaySelectVal + ";" + secondaryRadioVal;
        }

        $("#colsorttypedilog").hide('slow');

        if ((final) && (final.length > 0)) {
            _thisGlobals._CurConfiguration.SortOrder = final;
        } else {
            _thisGlobals._CurConfiguration.SortOrder = undefined;
        }

        SetParentFormDirty();
    });
    $('#sorttypecancel').on('click', function (e) {
        $("#colsorttypedilog").hide('slow');
    });

    if (_thisGlobals.FormIsReadOnly) {

        var realValue = GetHiddenFieldText(1);
        $('#displayonentity').html('<option value="0">' + realValue + '</option>');
        $('#displayfromentity').html('<option value="0">--</option>');

        $('#displayonentity').prop('disabled', 'disabled');
        $('#displayfromentity').prop('disabled', 'disabled');
        $('#maxrecordperpage').prop('disabled', 'disabled');
        $('#createnewbtnclick').prop('disabled', 'disabled');
        $('#booleaneditorbehaviour').prop('disabled', 'disabled');

        $('#autosavechanges_check').prop('disabled', 'disabled');
        $('#hideautosave_check').prop('disabled', 'disabled');
        $('#allowcreate_check').prop('disabled', 'disabled');
        $('#allowdelete_check').prop('disabled', 'disabled');
        $('#refreshaftercreate_check').prop('disabled', 'disabled');
        $('#refreshaftersave_check').prop('disabled', 'disabled');
        $('#pastefromexcel_check').prop('disabled', 'disabled');

        $('#displayentityfieldsoptions').prop('disabled', 'disabled');
        $('#entitiesAreRelated').attr('disabled', 'disabled');
        $('#displaySum').attr('disabled', 'disabled');
        $('#gridtitle').attr('disabled', 'disabled');
        $('#datetimeeditorminutestep').attr('disabled', 'disabled');

        $('#displayclearfilterbutton').attr('disabled', 'disabled');
        $('#displayheaderfilter').attr('disabled', 'disabled');
        $('#displayexportbutton').attr('disabled', 'disabled');
        $('#displaysetrecordstate').attr('disabled', 'disabled');
        $('#displayclonerecord').attr('disabled', 'disabled');
        $('#displayclonerecordbutton').attr('disabled', 'disabled');
        $('#openrecordbehavoir').prop('disabled', 'disabled');
        $('#systemcurrencyprecision').prop('disabled', 'disabled');
        
        $('#deleteallfieldconditionsbtn').attr('disabled', 'disabled');

        LoadDCrmEGConfiguration();

        $('.entitylistbuttons').hide();

    } else {
        RetreiveEntityList();

        $("#dateconditioninput").datetimepicker({
            timepicker: false,
            format: _thisGlobals.userDatetimeSettings.DateFormat,
            formatDate: _thisGlobals.userDatetimeSettings.DateFormat,
            formatTime: _thisGlobals.userDatetimeSettings.TimeFormat,
            onChangeDateTime: function (dp, $input) {

            }
        });
        $("#cellformatdateconditioninput").datetimepicker({
            timepicker: false,
            format: _thisGlobals.userDatetimeSettings.DateFormat,
            formatDate: _thisGlobals.userDatetimeSettings.DateFormat,
            formatTime: _thisGlobals.userDatetimeSettings.TimeFormat,
        });
        EntityGridMakeSortable();

    }

    CreateTooltip();
    // Setup default colors
    SetupColorPicker($('#oddrowcolorinput'), _thisGlobals.DefaultBackgroundColor);
    SetupColorPicker($('#evenrowcolorinput'), _thisGlobals.DefaultBackgroundColor);
    SetupColorPicker($('#headerbkcolor'), _thisGlobals.DefaultBackgroundColor);
    SetupColorPicker($('#headerfkcolor'), _thisGlobals.DefaultTextColor);
    SetupColorPicker($('#conditionbackgroundcolor'), _thisGlobals.DefaultBackgroundColor);
    SetupColorPicker($('#conditionforegroundcolor'), _thisGlobals.DefaultTextColor);

    $('#headerformattingokbtn').on('click', function (e) {
        e.stopPropagation();
        var container = $('#headerformattingcontainer');
        container.addClass('displaynone');

        var schema = container.attr('data-schemaname');
        var bkColor = $("#headerbkcolor").spectrum("get").toHexString();
        var frColor = $("#headerfkcolor").spectrum("get").toHexString();

        var options = _thisGlobals._CurConfiguration.GetFormattingOptions();
        var headeroption = options.GetHeader(schema);

        var header = $('#' + headeroption.HtmlHeaderId);
        header.css('background-color', bkColor);
        header.css('color', frColor);

        var tmp = {
            HtmlHeaderId: headeroption.HtmlHeaderId,
            SchemaName: schema,
            BackgroundColor: bkColor,
            TextColor: frColor,
            FontCss: null,
            ApplyToColumn: false // only apply colors to the column and not font
        };

        if ($('#headerfontcss').val()) {
            DeccoupleCss($('#headerfontcss').val(), header);
            tmp.FontCss = $('#headerfontcss').val();
        } else if ((headeroption) && (headeroption.FontCss)) {
            DeccoupleCss(headeroption.FontCss, header, true);
        }

        if ($('#applyheaderformattoallcells').prop('checked')) {
            tmp.ApplyToColumn = true;

            var index = header[0].cellIndex;
            var tr = $('#formattingcolors').find('tbody tr');
            var $tmpelem = $(tr[0].cells[index]);
            $tmpelem.find('div:first').css("background-color", tmp.BackgroundColor).css("color", tmp.TextColor);

            $tmpelem = $(tr[1].cells[index]);
            $tmpelem.find('div:first').css("background-color", tmp.BackgroundColor).css("color", tmp.TextColor);
        } else {
            // TODO
            // if the cells have no formatting of their own then reset
            var index = header[0].cellIndex;
            var tr = $('#formattingcolors').find('tbody tr');
            var $tmpelem = $(tr[0].cells[index]);
            $tmpelem.find('div:first').css("background-color", "").css("color", "");

            $tmpelem = $(tr[1].cells[index]);
            $tmpelem.find('div:first').css("background-color", "").css("color", "");
        }

        options.AddOrUpdateHeader(schema, tmp);
        SetParentFormDirty();
    });

    $('#headerformattingcancelbtn').on('click', function (e) {
        e.stopPropagation();
        $('#headerformattingcontainer').addClass('displaynone');
    });

    $('#headerformattingresetbtn').on('click', function (e) {
        e.stopPropagation();
        ResetHeaderFormattingElements();
    });

    $('#listoflookupfieldstoselectcancelbtn').on('click', function (e) {
        e.stopPropagation();
        $('#listoflookupentityfieldsflyout').hide();
    });

    $('#listoflookupfieldstoselectokbtn').on('click', function (e) {
        e.stopPropagation();
        var checkboxs = $('#listoflookupentityfieldstoselect').find('input[type=checkbox]');
        if (checkboxs) {
            $.each(checkboxs, function (index, item) {
                var input = $(item);
                if (input.is(':checked')) {
                    console.log(input.attr('id'));
                }
            });
        }

        $('#listoflookupentityfieldsflyout').hide();
    });

    //$('#testheadercssinput').on('blur', function (e) {
    //    e.stopPropagation();
    //    var _this = $(this);
    //    var val = _this.val();
    //    var target = _this.parent().prev().prev();
    //    if (val != '') {
    //        _this.attr('data-item-prev', val);
    //        DeccoupleCss(val, _this.parent().prev().prev());
    //    } else {
    //        val = _this.attr('data-item-prev');
    //        if (val) {
    //            DeccoupleCss(val, _this.parent().prev().prev(), true);
    //            _this.removeAttr('data-item-prev');
    //        }
    //    }
    //});
}

function LookupEntityFieldsCheckboxListClickHandler(chk) {
    console.log("Check clicked [" + chk.is(':checked') + "]");
}

/* Make selected entities list items sortable */
function EntityGridMakeSortable() {
    $('#makesortable').sortable({
        onDragStart: function ($item, container, _super) {

            var elem = $item.parent().parent();
            if (elem[0].tagName != 'LI') {
                _thisGlobals.BeforeDragParentLi = undefined;
            } else {
                // data-item-liid
                _thisGlobals.BeforeDragParentLi = FindDCrmEGConfigurationByLiId(elem.find('span:first').attr('data-item-liid')); // FindDCrmEGConfigurationBySchema(elem.find('span:first').attr('data-item-schemaname'));
            }
            _super($item, container);
        },
        onDrop: function ($item, container, _super) {

            var parent = $item.parent().parent();
            var $thisspan = $item.find('span:first');
            var schema = $thisspan.attr('data-item-schemaname');
            var liid = $thisspan.attr('data-item-liid');

            var config = FindDCrmEGConfigurationByLiId(liid);

            if (parent[0].tagName == 'LI') {

                var parentspan = $(parent).find('span:first');
                var parentschema = parentspan.attr('data-item-schemaname');
                var parentliid = $(parent).attr('id');

                var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Relationships'], schema, false);
                if ((result) && (result.length > 0)) {

                    // remove existing one if any
                    var label = $thisspan.next();
                    if ((label) && (label.length) && (label[0].tagName == 'LABEL')) {
                        label.empty().remove();
                    }

                    var related = GetEntityRelationships(result[0].ManyToOneRelationships, parentschema);
                    if (related) {
                        // TODO
                        $thisspan.text($thisspan.attr('data-item-orglabel') + ' '); // + ' - ' + related + ' = ' + parentspan.attr('data-item-orglabel'));
                        $('<label> <input data-item-schema="' + schema + '" data-item-liid="' + liid + '" onclick="InnerRelationshipHandler(event, this);" checked="checked" type="checkbox"></input>' + related
                            + ' = ' + parentspan.attr('data-item-orglabel') + '</label>').insertAfter($thisspan);

                        config.Entity.ParentLiId = parentliid;
                        config.Entity.RelatedToParentLI = true;
                        config.Entity.RelatedToParentLILookupSchemaName = related;
                        config.Entity.ParentSchemaName = parentschema;
                    } else {
                        config.Entity.ParentLiId = undefined;
                        config.Entity.RelatedToParentLI = false;
                        config.Entity.RelatedToParentLILookupSchemaName = undefined;
                        config.Entity.ParentSchemaName = parentschema;
                    }

                    var parentconfig = FindDCrmEGConfigurationByLiId(parentliid); // FindDCrmEGConfigurationBySchema(parentschema);
                    parentconfig.ChildConfigurations.push(jQuery.extend(true, {}, config));
                    if (_thisGlobals.BeforeDragParentLi) {
                        _thisGlobals.BeforeDragParentLi.RemoveChild(schema);
                    } else {
                        // RemoveDCrmEGConfiguration(schema, false);
                        RemoveDCrmEGConfigurationbyLiId(liid, false);
                    }

                } else {
                    ResetLiData($thisspan, $item, config);
                }
            } else {
                ResetLiData($thisspan, $item, config);
            }

            SetParentTitle();
            SetParentFormDirty();
            _super($item, container);
        }
    });
}

function ResetAllUI() {
    $('#selectedfieldstable').find('tbody:first').empty();

    var formattable = $('#formattingcolors');
    var htr = formattable.find('thead:first').find('tr');
    var $hth = htr.find('th');
    $.each($hth, function (index, cell) {
        if (index > 0) {
            $(cell).remove();
        }
    });

    var btr = formattable.find('tbody tr');
    $.each(btr, function (index, row) {
        var $tds = $(row).find('td');
        $.each($tds, function (index, cell) {
            if (index > 0) {
                $(cell).remove();
            }
        });
    });

    $('#oddrowcolorinput').spectrum("set", _thisGlobals.DefaultBackgroundColor);
    $('#evenrowcolorinput').spectrum("set", _thisGlobals.DefaultBackgroundColor);
    $('#oddrowcolorinput').parent().parent().parent().css('background-color', '');
    $('#evenrowcolorinput').parent().parent().parent().css('background-color', '');

    $('#headerformattingcontainer').addClass('displaynone');
    $('#cellformattingcontainer').addClass('displaynone');

    $('#listoffieldstoselectlabel').text('');
    $('#conditionsfetchdisplay').html('');
    if (_thisGlobals.SelectFieldsCheckboxList) {
        _thisGlobals.SelectFieldsCheckboxList.DestroyYourself();
    }

    DisplaySectionGroup(2, false);
    DisplaySectionGroup(4, false);
    DisplaySectionGroup(41, false);
    DisplaySectionGroup(5, false);
    DisplaySectionGroup(51, false);
}

function ResetLiData(a, b, c) {
    a.text(a.attr('data-item-orglabel'));
    var label = a.next();
    if ((label) && (label.length) && (label[0].tagName == 'LABEL')) {
        label.empty().remove();
    }

    c.Entity.ParentLiId = undefined;
    c.Entity.RelatedToParentLI = false;
    c.Entity.RelatedToParentLILookupSchemaName = undefined;
    c.Entity.ParentSchemaName = undefined;

    if (_thisGlobals.BeforeDragParentLi) {
        _thisGlobals.BeforeDragParentLi.RemoveChild(c.Entity.SchemaName);
    }

    var clone = jQuery.extend(true, {}, c);
    //RemoveDCrmEGConfiguration(c.Entity.SchemaName, false);
    RemoveDCrmEGConfigurationbyLiId(c.Entity.LiId, false);
    AddToMainConfiguration(clone);
}

function ResetEntityGrid() {

    var ol = $('#makesortable');
    if (ol.attr('data-item-lastfocus')) {
        $('#' + ol.attr('data-item-lastfocus')).find('div:first').removeClass('selectedli');
    }

    var li = $('#makesortable').find('li');

    if ((li) && (li.length)) {
        for (var i = 0; i < li.length; i++) {
            var config = FindDCrmEGConfigurationByLiId($(li[i]).attr('id'));
            // Reset relationships to the parent
            var related = RetreiveEntityRelationShips(config.Entity.SchemaName);
            config.Entity.RelatedToDisplayOnEntity = (related.length > 0) ? true : false;;
            config.Entity.RelatedToDisplayOnLookupSchemaName = (related.length > 0) ? related[0] : undefined;
        }
    }
    ResetAllUI();
    _thisGlobals._CurConfiguration = undefined;
}

// TODO
// Obsolete - remove it
function EntityGridEntityExists(schema) {
    var li = $('#makesortable').find('li');
    var tmp = '';

    if ((li) && (li.length)) {
        for (var i = 0; i < li.length; i++) {
            if ($(li[i]).find('span:first').attr('data-item-schemaname') == schema) {
                return true;
            }
        }
    }
    return false;
}

function GetEntitesDispayOrder() {
    var li = $('#makesortable').find('li');
    var tmp = '';
    if ((li) && (li.length)) {
        for (var i = 0; i < li.length; i++) {
            var elem = $(li[i]).find('span:first');

            if (i > 0) {
                tmp += _thisGlobals._SEPERATOR + elem.attr('data-item-schemaname') + _thisGlobals._sSeperator + elem.attr('data-item-liid');
            } else {
                tmp = elem.attr('data-item-schemaname') + _thisGlobals._sSeperator + elem.attr('data-item-liid');
            }
        }
    }
    return tmp;
}

function SetParentFormDirty() {
    SaveDCrmEGConfiguration();
    _thisGlobals.xrmPage.data.setFormDirty(true);
}

function ResetEntityGridDisplayOrder() {
    var displayOrder = GetEntitesDispayOrder();

    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.HeaderFieldNames).setValue(displayOrder);
    _thisGlobals.xrmPage.data.setFormDirty(true);
}

/*Entity relationship related*/
function RetreiveEntityRelationShips(logicalName) {
    $('#entitiesAreRelated').prop('checked', false);
    $('#relatedEntityLookupSelect').empty();
    $('#relatedEntityLookup').val('');

    var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Relationships'], logicalName, false);
    if ((result) && (result.length > 0)) {
        var data = GetEntityRelationshipsMain(result[0].ManyToOneRelationships);
        if (data.length > 0) {
            $('#relatedEntityLookupSelect').find('option:eq(0)').prop('selected', true);
        }
        return data;
    }
    return false;
}

function GetEntityRelationshipsMain(data, displayon) {

    displayon = displayon || GetHiddenFieldValue(1);
    var relationships = [];
    if (displayon) {
        if ((data) && (data.length)) {
            for (var index = 0; index < data.length; index++) {
                if ((data[index].IsValidForAdvancedFind) && (data[index].ReferencedEntity == displayon)) {

                    relationships.push(data[index].ReferencingAttribute);
                    $('#relatedEntityLookupSelect')
                        .append('<option value="' + data[index].ReferencingAttribute + '">' + data[index].ReferencingAttribute + '</option>');
                }
            }
        }
    }
    return relationships;
}

function GetEntityRelationships(data, displayon) {

    displayon = displayon || GetHiddenFieldValue(1);
    var foundit = false;

    if (displayon) {
        if ((data) && (data.length)) {

            for (var index = 0; index < data.length; index++) {
                if ((data[index].IsValidForAdvancedFind) && (data[index].ReferencedEntity == displayon)) {
                    foundit = data[index].ReferencingAttribute;
                    break;
                }
            }
        }
    }
    return foundit;
}

/*Configuration Manager Related*/
_thisGlobals.LookupViewHelperArray = [];

var LookupViewHelper = (function () {

    function LookupViewHelper(entitySchemaName, htmlElemParent, DefaultView) {
        // entitySchemaName could have multiple 'account,contact' for say customer field
        var self = this;
        self.IdCounter = 1;
        self.CurEntityProcessing = null;
        self.DefaultViewId = DefaultView;
        self.ViewEntitySchemaName = entitySchemaName.split(',');
        self.Select2Id = DCrmEditableGrid.Helper.GenerateUUID();

        var $div = $('<div class="lookupselect2class" style="width:160px;margin-top:5px;margin-bottom:5px;"></div>').appendTo(htmlElemParent);
        self.Select2Jq = $('<select id="' + self.Select2Id + '"></select>').appendTo($div);

        self.CallbackErrorHandler = function (errorMsg) {
            console.error("Exception " + errorMsg);
        }

        self.UserViewsCallback = function (result) {
            if ((result) && (result.length > 0)) {
                for (var i = 0; i < result.length; i++) {
                    self.IdCounter++;
                    self.Select2Views.append($('<option id="' + (i + self.IdCounter) +
                        '" value="' + result[i].attributes['userqueryid'].value + '" savedqueryid="' + result[i].attributes['userqueryid'].value + '">' +
                        result[i].attributes['name'].value + '</option>'));
                }
            }
        }

        self.SavedViewsCallback = function (result) {
            var sys = $('<optgroup label="' + self.CurEntityProcessing.capitalizeFirstLetter() + '" id="-1"></optgroup>');
            if ((result) && (result.length > 0)) {
                for (var i = 0; i < result.length; i++) {
                    self.IdCounter++;
                    sys.append($('<option id="' + (i + self.IdCounter) +
                        '" data-item-viewentityobjecttypecode="' + self.EntityObjectTypeCode +
                        '" value="' + result[i].attributes['savedqueryid'].value + '" savedqueryid="' + result[i].attributes['savedqueryid'].value + '">' +
                        result[i].attributes['name'].value + '</option>'));
                }
            }
            self.Select2Views.append(sys);

            //var fetch =
            //    '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
            //      '<entity name="userquery">' +
            //        '<attribute name="name" />' +
            //        '<attribute name="userqueryid" />' +
            //        '<attribute name="returnedtypecode" />' +
            //        '<attribute name="fetchxml" />' +
            //        '<attribute name="ownerid" />' +
            //        '<order attribute="name" descending="false" />' +
            //        '<filter>' +
            //          '<condition attribute="statecode" operator="eq" value="0" />' +
            //          '<condition attribute="querytype" operator="eq" value="0" />' +
            //          '<condition attribute="fetchxml" operator="not-null" />' +
            //          '<condition attribute="ownerid" operator="eq" value="' + _thisGlobals.LoggedInUserID + '" />' +
            //          '<condition attribute="returnedtypecode" operator="eq" value="' + self.EntityObjectTypeCode + '" />' +
            //        '</filter>' +
            //      '</entity>' +
            //    '</fetch>';
            //var result = XrmServiceToolkit.Soap.Fetch(fetch);
            //self.UserViewsCallback(result);
        }

        // Set up views
        /*
{
            placeholder: "Set Default View",
            maximumSelectionLength: 1,
            allowClear: true
        }
         */
        self.Select2Views = self.Select2Jq.select2()
            .on("select2:select", function (e) {
                var input = self.Select2Jq.find('option:selected');
                var queryId = $(input[0]).attr('savedqueryid');
                if (queryId) {
                    self.Select2Jq.parent().parent()
                        .attr('data-item-viewid', queryId)
                        .attr('data-item-viewentityobjecttypecode', $(input[0]).attr('data-item-viewentityobjecttypecode'));
                }
                SaveFields();
            })
            .on("select2:unselect", function (e) {
                self.Select2Jq.parent().parent().removeAttr('data-item-viewid').removeAttr('data-item-viewentityobjecttypecode');
                SaveFields();
                //$(e.params.data.element).attr('savedqueryid') (points to currently selected option which will be set to un selected
            });

        for (var i = 0; i < self.ViewEntitySchemaName.length; i++) {
            self.CurEntityProcessing = self.ViewEntitySchemaName[i];
            self.EntityObjectTypeCode = XrmServiceToolkit.Common.GetObjectTypeCode(self.CurEntityProcessing);

            var saveViewFetch =
                '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
                    '<entity name="savedquery">' +
                    '<attribute name="name" />' +
                    '<attribute name="savedqueryid" />' +
                    //'<attribute name="returnedtypecode" />' + // account, lead, systemuser, team, incident, user, goal, ...
                    //'<attribute name="fetchxml" />' +
                    '<order attribute="name" descending="false" />' +
                    '<filter>' +
                        '<condition attribute="statecode" operator="eq" value="0" />' +
                        '<condition attribute="querytype" operator="eq" value="0" />' +
                        '<condition attribute="fetchxml" operator="not-null" />' +
                        '<condition attribute="returnedtypecode" operator="eq" value="' + self.EntityObjectTypeCode + '" />' +
                    '</filter>' +
                    '</entity>' +
                '</fetch>';

            var result = XrmServiceToolkit.Soap.Fetch(saveViewFetch);
            self.SavedViewsCallback(result);
        }

        if (self.DefaultViewId) {
            self.Select2Views.val(self.DefaultViewId).trigger("change");
        } else {
            self.Select2Views.val(null).trigger("change");
        }
    }

    return LookupViewHelper;
})();

var FormattingOptions = (function () {
    function FormattingOptions(entityschemaname) {
        var self = this;

        self.EntityIdentity = entityschemaname;
        self.EntitySchemaName = GetActualSchema(entityschemaname);
        self.Headers = []; //{ HtmlHeaderId: null, SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, ApplyToColumn: false };
        self.Fields = []; // { HtmlCellId: null, SchemaName: null, BackgroundColor: null, TextColor: null, FontCss: null, Condition: {Operator: null, Value: null, Guid: null} };

        self.EvenRows = null;
        self.OddRows = null;

        self.SaveData = function () {
            var final = '';
            var tmp = '';
            var tmpId = '';
            if (self.Headers.length > 0) {
                for (var i = 0; i < self.Headers.length; i++) {
                    tmpId = self.Headers[i].HtmlHeaderId;
                    delete self.Headers[i].HtmlHeaderId;

                    var header = JSON.stringify(self.Headers[i]);
                    if (i > 0) {
                        tmp += '[H]' + header;
                    } else {
                        tmp += header;
                    }

                    self.Headers[i].HtmlHeaderId = tmpId;
                }
            }
            tmp += _thisGlobals._SEPERATOR;

            if (self.Fields.length > 0) {
                for (var i = 0; i < self.Fields.length; i++) {
                    tmpId = self.Fields[i].HtmlCellId;
                    delete self.Fields[i].HtmlCellId;

                    var cell = JSON.stringify(self.Fields[i]);
                    if (i > 0) {
                        tmp += '[F]' + cell;
                    } else {
                        tmp += cell;
                    }
                    self.Fields[i].HtmlCellId = tmpId;
                }
            }
            if (self.OddRows) {
                tmp += _thisGlobals._SEPERATOR + self.OddRows;
            } else {
                tmp += _thisGlobals._SEPERATOR;
            }
            if (self.EvenRows) {
                tmp += _thisGlobals._SEPERATOR + self.EvenRows;
            } else {
                tmp += _thisGlobals._SEPERATOR;
            }
            if (tmp.length > 0) {
                tmp += _thisGlobals._OuterSeperator + self.EntityIdentity;
            }
            return tmp;
        }

        self.ResetFormattingOptions = function () {
            self.Headers = [];
            self.Fields = [];
            self.EvenRows = null;
            self.OddRows = null;
        }

        // Heeders
        self.AddHeader = function (htmlid, schemaname, backgroundcolor, textcolor, fontcss, applytocolumn) {
            var tmp = {
                HtmlHeaderId: htmlid,
                SchemaName: schemaname,
                BackgroundColor: ((backgroundcolor) ? backgroundcolor : _thisGlobals.DefaultBackgroundColor),
                TextColor: ((textcolor) ? textcolor : _thisGlobals.DefaultTextColor),
                FontCss: fontcss,
                ApplyToColumn: applytocolumn // only apply colors to the column and not font
            };
            self.Headers.push(tmp);
        }
        self.AddOrUpdateHeader = function (schemaname, item) {
            for (var i = 0; i < self.Headers.length; i++) {
                if (self.Headers[i].SchemaName == schemaname) {
                    self.Headers[i] = item;
                    return;
                }
            }
            self.Headers.push(item);
        }
        self.RemoveHeader = function (schemaname) {
            InternalRemove(self.Headers, schemaname);
        }
        self.UpdateHeader = function (schemaname, item) {
            InternalUpdate(self.Headers, schemaname, item);
        }
        self.GetHeader = function (schemaname) {
            return InternalGet(self.Headers, schemaname);
        }
        // Fields
        self.AddField = function (htmlid, schemaname, backgroundcolor, textcolor, fontcss, condition) {
            var tmp = {
                HtmlCellId: htmlid,
                SchemaName: schemaname,
                BackgroundColor: ((backgroundcolor) ? backgroundcolor : _thisGlobals.DefaultBackgroundColor),
                TextColor: ((textcolor) ? textcolor : _thisGlobals.DefaultTextColor),
                FontCss: fontcss,
                Condition: condition
            };
            self.Fields.push(tmp);
        }
        self.AddOrUpdateField = function (schemaname, item) {
            for (var i = 0; i < self.Fields.length; i++) {
                if (self.Fields[i].SchemaName == schemaname) {
                    self.Fields[i] = item;
                    return;
                }
            }
            self.Fields.push(item);
        }
        self.RemoveField = function (schemaname) {
            InternalRemove(self.Fields, schemaname);
        }
        self.UpdateField = function (schemaname, item) {
            InternalUpdate(self.Fields, schemaname, item);
        }
        self.GetField = function (schemaname) {
            return InternalGet(self.Fields, schemaname);
        }
    }

    function InternalRemove(arr, schemaname) {
        if (arr.length == 0) {
            return;
        }
        var condition = -1;
        for (var i = 0; i < arr.length; i++) {
            if (arr.SchemaName == schemaname) {
                condition = i;
                break;
            }
        }
        if (condition != -1) {
            arr.splice(condition, 1);
        }
    }

    function InternalUpdate(arr, schemaname, item) {
        if (arr.length == 0) {
            return;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].SchemaName == schemaname) {
                arr[i] = item;
                break;
            }
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

        var parentContainer = '#makesortable';
        if (data.parentContainer) {
            parentContainer = '#' + data.parentContainer;
        }

        var id = DCrmEditableGrid.Helper.GenerateUUID();
        var related = undefined;
        var actualSchema = GetActualSchema(data.SchemaName);

        if (data.isRelated) {
            RetreiveEntityRelationShips(actualSchema);
            related = data.related;
        } else {
            var tmpRelated = RetreiveEntityRelationShips(actualSchema);
            if (tmpRelated.length > 0) {
                related = tmpRelated[0];
            }
        }

        self.Entity = {
            LiId: id,
            SchemaName: actualSchema,
            Label: data.Label,
            Identity: actualSchema + _thisGlobals._sSeperator + id,

            RelatedToDisplayOnEntity: data.isRelated,
            RelatedToDisplayOnLookupSchemaName: (related) ? related : undefined,

            ParentLiId: (data.ParentLiId) ? data.ParentLiId : undefined,

            RelatedToParentLI: data.RelatedToParentLI,
            ParentSchemaName: (data.ParentSchemaName) ? data.ParentSchemaName : undefined,
            RelatedToParentLILookupSchemaName: (data.RelatedToParentLILookupSchemaName) ? data.RelatedToParentLILookupSchemaName : undefined
        };

        self.GridTitle = ((data.GridTitle) && (data.GridTitle.length) && (data.GridTitle.length > 0)) ? data.GridTitle : self.Entity.Label;

        self.DisplayClearFilterButton = ((data.DisplayClearFilterButton) && (data.DisplayClearFilterButton == 'false')) ? false : true;
        self.DisplayHeaderFilter = ((data.DisplayHeaderFilter) && (data.DisplayHeaderFilter == 'false')) ? false : true;
        self.DisplayExportButton = ((data.DisplayExportButton) && (data.DisplayExportButton == 'false')) ? false : true;
        self.DisplaySetRecordState = ((data.DisplaySetRecordState) && (data.DisplaySetRecordState == 'false')) ? false : true;
        self.DisplayCloneRecord = ((data.DisplayCloneRecord) && (data.DisplayCloneRecord == 'false')) ? false : true;
        self.DisplayCloneRecordButton = ((data.DisplayCloneRecordButton) && (data.DisplayCloneRecordButton == 'false')) ? false : true;
        self.OpenRecordBehavoir = ((data.OpenRecordBehavoir) && (data.OpenRecordBehavoir != 'undefined')) ? data.OpenRecordBehavoir : "10";
        
        self.HasStatusField = (data.HasStatusField) ? data.HasStatusField : undefined;
        self.DisplaySum = ((data.DisplaySum) && (data.DisplaySum == 'false')) ? false : true;
        self.FieldDisplayOption = (data.FieldDisplayOption) ? data.FieldDisplayOption : 100000003; // All fields
        self.RecordsPerPage = (data.RecordsPerPage) ? data.RecordsPerPage : '5';
        self.SystemCurrencyPrecision = (data.SystemCurrencyPrecision) ? data.SystemCurrencyPrecision : '2';

        self.AutoSaveChanges = ((data.AutoSaveChanges) && (data.AutoSaveChanges == 'false')) ? false : true;
        self.AllowCreateNew = ((data.AllowCreateNew) && (data.AllowCreateNew == 'false')) ? false : true;
        self.AllowDelete = ((data.AllowDelete) && (data.AllowDelete == 'false')) ? false : true;
        self.DistinctValues = ((data.DistinctValues) && (data.DistinctValues) == 'true') ? true : false;
        self.RefreshAfterCreate = ((data.RefreshAfterCreate) && (data.RefreshAfterCreate == 'false')) ? false : true;
        self.RefreshAfterSave = ((data.RefreshAfterSave) && (data.RefreshAfterSave == 'true')) ? true : false;
        self.PasteFromExcel = ((data.PasteFromExcel) && (data.PasteFromExcel == 'true')) ? true : false;
        
        self.SortOrder = ((data.SortOrder) && (data.SortOrder != 'undefined')) ? data.SortOrder : undefined;
        self.NewBtnBehavoir = ((data.NewBtnBehavoir) && (data.NewBtnBehavoir != 'undefined')) ? data.NewBtnBehavoir : "30";
        self.BooleanEditorBehavoir = ((data.BooleanEditorBehavoir) && (data.BooleanEditorBehavoir != 'undefined')) ? data.BooleanEditorBehavoir : "20";
        self.DateTimeMinuteStep = ((data.DateTimeMinuteStep) && (data.DateTimeMinuteStep != 'undefined')) ? data.DateTimeMinuteStep : "5";

        self.HideAutosaveButton = ((data.HideAutosaveButton) && (data.HideAutosaveButton == 'true')) ? true : false;

        self.Fields = undefined;
        self.Conditions = undefined;
        self.Formattings = undefined;
        self.GetFormattingOptions = function () {
            if (self.Formattings) {
                return self.Formattings;
            }
            self.Formattings = new FormattingOptions(self.Entity.Identity);
            return self.Formattings;
        }

        self.ChildConfigurations = [];

        // <link-entity name="%N%" from="%F%" to="%T%" visible="false" link-type="outer" alias="%A%">
        // <link-entity name="contact" from="contactid" to="primarycontactid" visible="false" link-type="outer" alias="a_410707b195544cd984376608b1802904">
        // <attribute name="lastname" />
        // <attribute name="firstname" />
        // </link-entity> + '[]'
        self.LinkEntityFields = undefined;
        // Add or Update
        self.SetLinkEntityFields = function (name, from, to, fields) {
            if (self.LinkEntityFields == undefined) {
                self.LinkEntityFields = [];
            }
            var tmp = {
                Name: name,
                From: from,
                To: to,
                Alias: DCrmEditableGrid.Helper.GenerateRandomLetters(15),
                Fields: fields
            };
            for (var i = 0; i < self.LinkEntityFields.length; i++) {
                if (self.LinkEntityFields[i].To == to) {
                    self.LinkEntityFields[i] = tmp;
                    return;
                }
            }
            self.LinkEntityFields.push(tmp);
        }
        self.SaveLinkEntityFields = function () {
            if ((self.LinkEntityFields) && (self.LinkEntityFields.length) && (self.LinkEntityFields.length > 0)) {
                var playload = JSON.stringify(self.LinkEntityFields);

                //if (playload) {
                //    console.log(JSON.parse(playload));
                //} else {
                //    console.log('Nothing????');
                //}
            }
        }
        self.GetLinkEntityFields = function (to) {
            for (var i = 0; i < self.LinkEntityFields.length; i++) {
                if (self.LinkEntityFields[i].To == to) {
                    return self.LinkEntityFields[i];
                }
            }
            return null;
        }
        self.RemoveLinkEntityFields = function (to) {
            var foundit = -1;
            for (var i = 0; i < self.LinkEntityFields.length; i++) {
                if (self.LinkEntityFields[i].To == to) {
                    foundit = i;
                    break;
                }
            }
            if (foundit > -1) {
                self.LinkEntityFields.splice(foundit, 1);
            }
        }


        self.Li = $('<li><div class="entitygridinfocontainer"><span class="EntityGridLabels" data-item-orglabel="' + self.Entity.Label
            + '" data-item-schemaname="' + self.Entity.SchemaName + '" data-item-liid="' + id + '">'
            + self.Entity.Label + '</span><button class="entitylistbuttons"></button></div><ol id="' + DCrmEditableGrid.Helper.GenerateUUID() + '"></ol></li>')
            .attr('id', id).appendTo($(parentContainer));

        self.Li.find('.entitygridinfocontainer').on('click', function (e) {
            e.stopPropagation();

            if ((e.target) && (e.target.tagName == 'DIV')) {
                var li = $(this).parent();
                DisplaySelectedEntityInfo(li, self.Entity.SchemaName, self.Entity.LiId);
            }
        });

        self.Li.find('span:first').on('click', function (e) {
            e.stopPropagation();
            var li = $(this).parent().parent();
            DisplaySelectedEntityInfo(li, self.Entity.SchemaName, self.Entity.LiId);
        });

        self.Li.find('.entitylistbuttons').on('click', function (e) {
            e.stopPropagation();

            $(this).parent().find('first:label').empty().remove();

            var $this = $(this).parent().parent();
            var ol = $('#makesortable');
            if (ol.attr('data-item-lastfocus')) {
                var lastfocusLi = ol.attr('data-item-lastfocus');

                if (lastfocusLi == $this.attr('id')) {
                    ol.removeAttr('data-item-lastfocus');
                    ResetAllUI();
                } else {
                    if (FindDCrmEGConfigurationByLiId(lastfocusLi)) {
                        ResetAllUI();
                    }
                }
            }

            //RemoveDCrmEGConfiguration(self.Entity.SchemaName, true);
            RemoveDCrmEGConfigurationbyLiId(self.Entity.LiId, true);
            self.DestroyLi();
            SetParentTitle();
            SetParentFormDirty();
        });

        self.RemoveChild = function (schemaname) {
            var condition = -1;
            var config = FindDCrmEGConfigurationByLiId(self.Entity.LiId); // FindDCrmEGConfigurationBySchema(self.Entity.SchemaName);

            for (var i = 0; i < config.ChildConfigurations.length; i++) {
                if (config.ChildConfigurations[i].Entity.SchemaName == schemaname) {
                    condition = i;
                    break;
                }
            }
            if (condition != -1) {
                config.ChildConfigurations.splice(condition, 1);
            }
        }

        self.RemoveChildByLiId = function (id) {
            var condition = -1;
            var config = FindDCrmEGConfigurationByLiId(self.Entity.LiId); // FindDCrmEGConfigurationBySchema(self.Entity.SchemaName);

            for (var i = 0; i < config.ChildConfigurations.length; i++) {
                if (config.ChildConfigurations[i].Entity.LiId == id) {
                    condition = i;
                    break;
                }
            }
            if (condition != -1) {
                config.ChildConfigurations.splice(condition, 1);
            }
        }

        self.DestroyLi = function () {
            if (self.Li) {
                self.Li.find('.entitylistbuttons').off('click');
                self.Li.find('.entitygridinfocontainer').off('click');
                self.Li.find('span').off('click');
                self.Li.empty().remove();
            }
        }

    }

    //DCrmEGConfigurationManager.prototype.toJSON = function() {
    //    var item = {
    //            SchemaName: this.Entity.SchemaName,
    //            Label: this.Entity.Label,
    //            RelatedToDisplayOnEntity: this.Entity.RelatedToDisplayOnEntity,
    //            RelatedToDisplayOnLookupSchemaName: this.Entity.RelatedToDisplayOnLookupSchemaName,
    //            RelatedToParentLI: this.Entity.RelatedToParentLI,
    //            ParentSchemaName: this.Entity.ParentSchemaName,
    //            RelatedToParentLILookupSchemaName: this.Entity.RelatedToParentLILookupSchemaName,
    //            HasStatusField: this.HasStatusField,
    //            DisplaySum: this.DisplaySum,
    //            FieldDisplayOption: this.FieldDisplayOption,
    //            RecordsPerPage: this.RecordsPerPage,
    //            AutoSaveChanges: this.AutoSaveChanges,
    //            AllowCreateNew: this.AllowCreateNew,
    //            AllowDelete: this.AllowDelete,
    //            RefreshAfterCreate: this.RefreshAfterCreate,
    //            RefreshAfterSave: this.RefreshAfterSave,
    //            SortOrder: this.SortOrder,
    //            NewBtnBehavoir: this.NewBtnBehavoir,
    //            BooleanEditorBehavoir: this.BooleanEditorBehavoir,
    //            EntityFields: this.EntityFields,
    //            EntityConditions: this.EntityConditions,
    //            ChildConfigurations: this.ChildConfigurations
    //    };
    //    return JSON.stringify(item);
    //}

    return DCrmEGConfigurationManager;
})();

function DisplaySelectedEntityInfo(li, schema, liid) {
    var $this = $('#makesortable');

    if ($this.attr('data-item-lastfocus')) {
        $('#' + $this.attr('data-item-lastfocus')).find('div:first').removeClass('selectedli');
    }
    li.find('div:first').addClass('selectedli');
    $this.attr('data-item-lastfocus', li.attr('id'));

    ResetAllUI();

    _thisGlobals._CurConfiguration = FindDCrmEGConfigurationByLiId(liid); // FindDCrmEGConfigurationBySchema(schema);
    console.log(_thisGlobals._CurConfiguration);

    var tmpRel = RetreiveEntityRelationShips(schema);
    if (tmpRel.length > 0) {

        $('#entitiesAreRelated').prop('checked', _thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnEntity);
        $('#relatedEntityLookupSelect').val(_thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnLookupSchemaName);
        $('#relatedEntityLookup').val(_thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnLookupSchemaName);
        DisplaySectionGroup(2, true);
    } else {
        $('#entitiesAreRelated').prop('checked', false);
        $('#relatedEntityLookupSelect').empty();
        $('#relatedEntityLookup').val('');
        DisplaySectionGroup(2, false);
    }

    $('#gridtitle').val(_thisGlobals._CurConfiguration.GridTitle);

    $('#displayclearfilterbutton').prop('checked', _thisGlobals._CurConfiguration.DisplayClearFilterButton);
    $('#displayheaderfilter').prop('checked', _thisGlobals._CurConfiguration.DisplayHeaderFilter);
    $('#displayexportbutton').prop('checked', _thisGlobals._CurConfiguration.DisplayExportButton);
    $('#displaysetrecordstate').prop('checked', _thisGlobals._CurConfiguration.DisplaySetRecordState);
    $('#displayclonerecord').prop('checked', _thisGlobals._CurConfiguration.DisplayCloneRecord);
    $('#displayclonerecordbutton').prop('checked', _thisGlobals._CurConfiguration.DisplayCloneRecordButton);
    
    $('#displaySum').prop('checked', _thisGlobals._CurConfiguration.DisplaySum);
    $('#autosavechanges_check').prop('checked', _thisGlobals._CurConfiguration.AutoSaveChanges);
    $('#hideautosave_check').prop('checked', _thisGlobals._CurConfiguration.HideAutosaveButton);
    $('#allowcreate_check').prop('checked', _thisGlobals._CurConfiguration.AllowCreateNew);
    $('#allowdelete_check').prop('checked', _thisGlobals._CurConfiguration.AllowDelete);
    $('#distinctvalues_check').prop('checked', _thisGlobals._CurConfiguration.DistinctValues);
    $('#refreshaftercreate_check').prop('checked', _thisGlobals._CurConfiguration.RefreshAfterCreate);
    $('#refreshaftersave_check').prop('checked', _thisGlobals._CurConfiguration.RefreshAfterSave);
    $('#pastefromexcel_check').prop('checked', _thisGlobals._CurConfiguration.PasteFromExcel);
    $('#maxrecordperpage').val(_thisGlobals._CurConfiguration.RecordsPerPage);
    $('#createnewbtnclick').val(_thisGlobals._CurConfiguration.NewBtnBehavoir);
    $('#booleaneditorbehaviour').val(_thisGlobals._CurConfiguration.BooleanEditorBehavoir);
    $('#openrecordbehavoir').val(_thisGlobals._CurConfiguration.OpenRecordBehavoir);
    $('#systemcurrencyprecision').val(_thisGlobals._CurConfiguration.SystemCurrencyPrecision);
    $('#datetimeeditorminutestep').val(_thisGlobals._CurConfiguration.DateTimeMinuteStep);
    RetreiveEntityMetadata(schema);
}

function AddToMainConfiguration(config) {
    _thisGlobals.DCrmEGConfiguration.push(config);
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
    return tmp;
}

function LoadDCrmEGConfiguration() {

    if (_thisGlobals.ParentFieldsFormType == 1) {
        return;
    }

    var parentconfig = undefined;
    var config = undefined;
    var val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.HeaderFieldNames).getValue();
    // Display order
    var entities = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._SEPERATOR) : '';

    // All Entities info
    val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.DisplayFromEntityFieldName).getValue();
    var entitesInfo = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';

    // All fields
    val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FromEntityFieldsAttr).getValue();
    var fields = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';

    // All conditions
    val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FieldConditionValues).getValue();
    var consitions = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';

    // All formattings (headers and cells)
    val = _thisGlobals.xrmPage.data.entity.attributes.get('dcrmeg_entitiesinfo').getValue();
    var formattings = (val) ? val.split(_thisGlobals._pSeperator) : null;

    for (var i = 0; i < entities.length; i++) {

        parentconfig = undefined;
        // TODO
        // This is the problem
        // when saving entity info and other (fileds,...) we need to have a distinct id fot each entity
        // look for _thisGlobals._sSeperator in the schemaname (entities[i]
        var tmp = FindEntityGridInfo(entities[i], entitesInfo);

        var data = { SchemaName: tmp[0], Label: tmp[1] };

        data.isRelated = false;

        if (tmp[2] == 'true') {
            data.isRelated = true;
            data.related = tmp[3];
        }

        // related to another entity in the list
        data.RelatedToParentLI = (tmp[4] == 'true') ? true : false;
        data.RelatedToParentLILookupSchemaName = (tmp[5].length > 0) ? tmp[5] : undefined;
        data.ParentSchemaName = (tmp[6].length > 0) ? tmp[6] : undefined;
        // Find the parent config and set the parentLiId
        if (data.ParentSchemaName) {
            parentconfig = FindDCrmEGConfigurationBySchema(data.ParentSchemaName);
            if (parentconfig) {
                data.ParentLiId = parentconfig.Li.attr('id');
                data.parentContainer = parentconfig.Li.find('ol:first').attr('id');
            }
        }

        if (tmp[7].length > 0) {
            data.HasStatusField = tmp[7];
        }
        data.DisplaySum = tmp[8];
        data.FieldDisplayOption = parseInt(tmp[9]);
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
            data.SystemCurrencyPrecision = ((tmp.length > 31) ? tmp[31] : undefined);
            
        }

        config = new DCrmEGConfigurationManager(data);
        config.Fields = FindEntiyGridFields(data.SchemaName, fields);

        if (consitions.length > 0) {
            config.Conditions = FindEntiyGridFields(data.SchemaName, consitions);
        }

        if (formattings) {
            for (var index = 0; index < formattings.length; index++) {
                var rec = formattings[index].split(_thisGlobals._OuterSeperator);
                // Get formatting options for this entity
                if (rec[1] == data.SchemaName) {
                    var formatOption = new FormattingOptions(config.Entity.Identity);

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
                }
            }
        }

        //if (config.Conditions) {
        //    var arr = config.Conditions.split(_thisGlobals._OuterSeperator);
        //    $.each(arr, function (index, item) {
        //        var items = item.split(_thisGlobals._SEPERATOR);
        //        if (items.length == 1) {
        //            return;
        //        }
        //        config.EntityConditions.push( {
        //            ConditionAttribute: items[0],
        //            ConditionValue: items[1],
        //            OperatorFetchOp: items[2],
        //            ConditionLabel: items[3],
        //            CrmFieldType: items[4],
        //            LookupLogicalNames: items[5],
        //            ConditionAttributeOrg: items[6],
        //            CrmFieldLabel: items[7]
        //        });
        //    });
        //}

        if ((data.ParentSchemaName) && (parentconfig)) {
            var li = config.Li.find('span:first');
            var checked = (data.RelatedToParentLI) ? 'checked=checked' : '';
            li.text(config.Entity.Label + ' ');
            if (data.RelatedToParentLILookupSchemaName) {
                $('<label> <input type="checkbox" ' + checked
                    + '  data-item-schema="' + config.Entity.SchemaName
                    + '" data-item-liid="' + config.Entity.LiId
                    + '" onclick="InnerRelationshipHandler(event, this);"></input>'
                    + data.RelatedToParentLILookupSchemaName + ' = ' + parentconfig.Entity.Label + '</label>').insertAfter(li);
            }
            // add to parent
            parentconfig.ChildConfigurations.push(config);
        } else {
            AddToMainConfiguration(config);
        }
    }

    if (_thisGlobals.DCrmEGConfiguration.length > 0) {
        DisplaySelectedEntityInfo(_thisGlobals.DCrmEGConfiguration[0].Li, _thisGlobals.DCrmEGConfiguration[0].Entity.SchemaName, _thisGlobals.DCrmEGConfiguration[0].Entity.LiId);
    }
}

function GetActualSchema(identity) {
    if (identity.contains(_thisGlobals._sSeperator)) {
        return identity.split(_thisGlobals._sSeperator)[0];
    }
    return identity;
}

function InnerRelationshipHandler(e, input) {
    e.stopPropagation();
    //var schema = $(input).attr('data-item-schema');
    //var config = FindDCrmEGConfigurationBySchema(schema);

    var liid = $(input).attr('data-item-liid');
    var config = FindDCrmEGConfigurationByLiId(liid);
    if (config) {
        config.Entity.RelatedToParentLI = ($(input).is(':checked')) ? true : false;
        SetParentFormDirty();
    }
    return false;
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

function SaveDCrmEGConfiguration() {
    var final = '';

    _thisGlobals._Entityinfo = '';
    _thisGlobals._Fieldsinfo = '';
    _thisGlobals._Conditioninfo = '';
    _thisGlobals._FormattingInfo = '';

    //var local = JSON.stringify(_thisGlobals.DCrmEGConfiguration);
    //var obj = JSON.parse(local);
    //for (var index = 0; index < obj.length; index++) {
    //    var inner = JSON.parse(obj[index]);
    //    if (inner.ChildConfigurations) {
    //        var final = [];
    //        // For each child configuration, we need to call JSON.parse
    //        final.push(JSON.parse(inner.ChildConfigurations[0]));
    //        inner.ChildConfigurations = final;
    //    }
    //}

    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {

        if (i > 0) {
            _thisGlobals._Entityinfo += _thisGlobals._pSeperator;
        }

        // TODO
        // Add an id to Schemaname to ensure we grab the right one
        // _thisGlobals.DCrmEGConfiguration[i].Entity.Identity
        // if both entities are the same account account
        // _thisGlobals._sSeperator  Identity

        _thisGlobals._Entityinfo += _thisGlobals.DCrmEGConfiguration[i].Entity.Identity + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].Entity.Label + _thisGlobals._SEPERATOR

        + _thisGlobals.DCrmEGConfiguration[i].Entity.RelatedToDisplayOnEntity + _thisGlobals._SEPERATOR
        + CheckValue(_thisGlobals.DCrmEGConfiguration[i].Entity.RelatedToDisplayOnLookupSchemaName) + _thisGlobals._SEPERATOR

        + _thisGlobals.DCrmEGConfiguration[i].Entity.RelatedToParentLI + _thisGlobals._SEPERATOR
        + CheckValue(_thisGlobals.DCrmEGConfiguration[i].Entity.RelatedToParentLILookupSchemaName) + _thisGlobals._SEPERATOR
        + CheckValue(_thisGlobals.DCrmEGConfiguration[i].Entity.ParentSchemaName) + _thisGlobals._SEPERATOR

        + CheckValue(_thisGlobals.DCrmEGConfiguration[i].HasStatusField) + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].DisplaySum + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].FieldDisplayOption + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].RecordsPerPage + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].AutoSaveChanges + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].AllowCreateNew + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].AllowDelete + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].RefreshAfterCreate + _thisGlobals._SEPERATOR
        + _thisGlobals.DCrmEGConfiguration[i].RefreshAfterSave
        + _thisGlobals._SEPERATOR + CheckValue(_thisGlobals.DCrmEGConfiguration[i].SortOrder)
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].NewBtnBehavoir
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].BooleanEditorBehavoir
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].HideAutosaveButton
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].GridTitle
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DisplayClearFilterButton
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DisplayHeaderFilter
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DisplayExportButton
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DisplaySetRecordState
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DisplayCloneRecord
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DisplayCloneRecordButton
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].OpenRecordBehavoir
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].PasteFromExcel
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DateTimeMinuteStep
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].DistinctValues
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].SystemCurrencyPrecision;
        
        if (_thisGlobals.DCrmEGConfiguration[i].Fields) {
            if (i > 0) {
                _thisGlobals._Fieldsinfo += _thisGlobals._pSeperator;
            }
            _thisGlobals._Fieldsinfo += _thisGlobals.DCrmEGConfiguration[i].Fields + _thisGlobals._OuterSeperator + _thisGlobals.DCrmEGConfiguration[i].Entity.Identity;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].Conditions) {
            if (i > 0) {
                _thisGlobals._Conditioninfo += _thisGlobals._pSeperator;
            }
            _thisGlobals._Conditioninfo += _thisGlobals.DCrmEGConfiguration[i].Conditions + _thisGlobals._OuterSeperator + _thisGlobals.DCrmEGConfiguration[i].Entity.Identity;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].Formattings) {
            if (_thisGlobals._FormattingInfo.length > 0) {
                _thisGlobals._FormattingInfo += _thisGlobals._pSeperator + _thisGlobals.DCrmEGConfiguration[i].Formattings.SaveData();
            } else {
                _thisGlobals._FormattingInfo = _thisGlobals.DCrmEGConfiguration[i].Formattings.SaveData();
            }
        }

        if (_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length > 0) {
            for (var ii = 0; ii < _thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length; ii++) {
                SaveDCrmEGConfigurationInternal(_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations[ii]);
            }
        }
    }

    var displayorder = GetEntitesDispayOrder();

    // Display order of entities
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.HeaderFieldNames).setValue(RetrieveEntityOutput(displayorder, false));
    // All Entities info
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.DisplayFromEntityFieldName).setValue(RetrieveEntityOutput(_thisGlobals._Entityinfo, false));
    // All fields
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FromEntityFieldsAttr).setValue(RetrieveEntityOutput(_thisGlobals._Fieldsinfo, false));
    // All conditions
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FieldConditionValues).setValue(RetrieveEntityOutput(_thisGlobals._Conditioninfo, false));
    // All formattings
    _thisGlobals.xrmPage.data.entity.attributes.get('dcrmeg_entitiesinfo').setValue(_thisGlobals._FormattingInfo);
}

function SaveDCrmEGConfigurationInternal(config) {
    // TODO
    // _thisGlobals._sSeperator
    _thisGlobals._Entityinfo += _thisGlobals._pSeperator + config.Entity.Identity + _thisGlobals._SEPERATOR
    + config.Entity.Label + _thisGlobals._SEPERATOR

    + config.Entity.RelatedToDisplayOnEntity + _thisGlobals._SEPERATOR
    + CheckValue(config.Entity.RelatedToDisplayOnLookupSchemaName) + _thisGlobals._SEPERATOR

    + config.Entity.RelatedToParentLI + _thisGlobals._SEPERATOR
    + CheckValue(config.Entity.RelatedToParentLILookupSchemaName) + _thisGlobals._SEPERATOR
    + CheckValue(config.Entity.ParentSchemaName) + _thisGlobals._SEPERATOR

    + CheckValue(config.HasStatusField) + _thisGlobals._SEPERATOR
    + config.DisplaySum + _thisGlobals._SEPERATOR
    + config.FieldDisplayOption + _thisGlobals._SEPERATOR
    + config.RecordsPerPage + _thisGlobals._SEPERATOR
    + config.AutoSaveChanges + _thisGlobals._SEPERATOR
    + config.AllowCreateNew + _thisGlobals._SEPERATOR
    + config.AllowDelete + _thisGlobals._SEPERATOR
    + config.RefreshAfterCreate + _thisGlobals._SEPERATOR
    + config.RefreshAfterSave
    + _thisGlobals._SEPERATOR + CheckValue(config.SortOrder)
    + _thisGlobals._SEPERATOR + config.NewBtnBehavoir
    + _thisGlobals._SEPERATOR + config.BooleanEditorBehavoir
    + _thisGlobals._SEPERATOR + config.HideAutosaveButton
    + _thisGlobals._SEPERATOR + config.GridTitle
    + _thisGlobals._SEPERATOR + config.DisplayClearFilterButton
    + _thisGlobals._SEPERATOR + config.DisplayHeaderFilter
    + _thisGlobals._SEPERATOR + config.DisplayExportButton
    + _thisGlobals._SEPERATOR + config.DisplaySetRecordState
    + _thisGlobals._SEPERATOR + config.DisplayCloneRecord
    + _thisGlobals._SEPERATOR + config.DisplayCloneRecordButton
    + _thisGlobals._SEPERATOR + config.OpenRecordBehavoir
    + _thisGlobals._SEPERATOR + config.PasteFromExcel
    + _thisGlobals._SEPERATOR + config.DateTimeMinuteStep
    + _thisGlobals._SEPERATOR + config.DistinctValues
    + _thisGlobals._SEPERATOR + config.SystemCurrencyPrecision;
    
    if (config.Fields) {
        _thisGlobals._Fieldsinfo += _thisGlobals._pSeperator + config.Fields + _thisGlobals._OuterSeperator + config.Entity.Identity;
    }
    if (config.Conditions) {
        _thisGlobals._Conditioninfo += _thisGlobals._pSeperator + config.Conditions + _thisGlobals._OuterSeperator + config.Entity.Identity;
    }
    if (config.Formattings) {
        if (_thisGlobals._FormattingInfo.length > 0) {
            _thisGlobals._FormattingInfo += _thisGlobals._pSeperator + config.Formattings.SaveData();
        } else {
            _thisGlobals._FormattingInfo = config.Formattings.SaveData();
        }
    }

    if (config.ChildConfigurations.length > 0) {
        for (var ii = 0; ii < config.ChildConfigurations.length; ii++) {
            SaveDCrmEGConfigurationInternal(config.ChildConfigurations[ii]);
        }
    }
}

function CheckValue(val) {
    if ((val) && (val != 'undefined')) {
        return val;
    }
    return '';
}

function UpdateDCrmEGConfiguration(config) {
    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
        if (_thisGlobals.DCrmEGConfiguration[i].Entity.SchemaName == config.Entity.SchemaName) {
            _thisGlobals.DCrmEGConfiguration[i] = config;
            break;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length > 0) {
            for (var ii = 0; ii < _thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length; ii++) {
                var foundit = UpdateDCrmEGConfigurationInternal(_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations[ii], config);
                if (foundit) {
                    break;
                }
            }
        }
    }
}

function UpdateDCrmEGConfigurationInternal(config, compareto) {
    var foundit = false;
    if (config.Entity.SchemaName == compareto.Entity.SchemaName) {
        config = compareto; // Clone or actual ref ?? // jQuery.extend(true, {}, _thisGlobals.DCrmEGConfiguration[i]);
        return true;
    }
    if (config.ChildConfigurations.length > 0) {
        for (var ii = 0; ii < config.ChildConfigurations.length; ii++) {
            var foundit = UpdateDCrmEGConfigurationInternal(config.ChildConfigurations[ii], compareto);
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
            foundit = _thisGlobals.DCrmEGConfiguration[i];
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

function AllConfigsHaveFields() {
    _thisGlobals._Entityinfo = '';

    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
        if (_thisGlobals.DCrmEGConfiguration[i].Fields == undefined) {
            if (_thisGlobals._Entityinfo.length > 0) {
                _thisGlobals._Entityinfo += ',';
            }
            _thisGlobals._Entityinfo += _thisGlobals.DCrmEGConfiguration[i].Entity.Label;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length > 0) {
            for (var ii = 0; ii < _thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length; ii++) {
                AllConfigsHaveFieldsInternal(_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations[ii]);
            }
        }
    }

    return _thisGlobals._Entityinfo;
}

function AllConfigsHaveFieldsInternal(config) {
    if (config.Fields == undefined) {
        if (_thisGlobals._Entityinfo.length > 0) {
            _thisGlobals._Entityinfo += ',';
        }
        _thisGlobals._Entityinfo += config.Entity.Label;
    }
    if (config.ChildConfigurations.length > 0) {
        AllConfigsHaveFieldsInternal(config);
    }
}

function FindDCrmEGConfigurationByLiId(id, cloneit) {
    var foundit = undefined;

    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
        if (_thisGlobals.DCrmEGConfiguration[i].Entity.LiId == id) {
            foundit = _thisGlobals.DCrmEGConfiguration[i];
            break;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length > 0) {
            for (var ii = 0; ii < _thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length; ii++) {
                foundit = FindDCrmEGConfigurationLiId(_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations[ii], id);
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

function FindDCrmEGConfigurationLiId(config, id) {
    var foundit = undefined;

    if (config.Entity.LiId == id) {
        foundit = config;
    } else if (config.ChildConfigurations.length > 0) {
        for (var ii = 0; ii < config.ChildConfigurations.length; ii++) {
            foundit = FindDCrmEGConfigurationLiId(config.ChildConfigurations[ii], id);
            if (foundit) {
                break;
            }
        }
    }

    return foundit;
}

function RemoveDCrmEGConfiguration(schemaname, removeChildren) {
    var condition = -1;
    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
        if (_thisGlobals.DCrmEGConfiguration[i].Entity.SchemaName == schemaname) {
            condition = i;
            break;
        }
    }
    if (condition != -1) {
        if (removeChildren) {
            RemoveChildConfiguration(_thisGlobals.DCrmEGConfiguration[condition]);
        }
        _thisGlobals.DCrmEGConfiguration[condition] = undefined;
        _thisGlobals.DCrmEGConfiguration.splice(condition, 1);
        return true;
    }

    return false;
}

function RemoveDCrmEGConfigurationbyLiId(liid, removeChildren) {
    var condition = -1;
    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {
        if (_thisGlobals.DCrmEGConfiguration[i].Entity.LiId == liid) {
            condition = i;
            break;
        }
    }
    if (condition != -1) {
        if (removeChildren) {
            RemoveChildConfiguration(_thisGlobals.DCrmEGConfiguration[condition]);
        }
        _thisGlobals.DCrmEGConfiguration[condition] = undefined;
        _thisGlobals.DCrmEGConfiguration.splice(condition, 1);
        return true;
    }

    return false;
}

function RemoveChildConfiguration(config) {
    if (config) {
        config.DestroyLi();
        for (var i = 0; i < config.ChildConfigurations.length; i++) {
            RemoveChildConfiguration(config.ChildConfigurations[i]);
        }
        config.ChildConfigurations = [];
    }
}

function CloneObject(toclone) {
    return jQuery.extend(true, {}, toclone);
}

function GetBrowserLanguage() {
    // "fr", "fr-FR", "en-US", "en"
    // Chrome en-US
    // IE     en-CA
    var lan = navigator.languages ?
        navigator.languages[0] :
        (navigator.language || navigator.userLanguage || navigator.browserLanguage);
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.HeaderFieldNames).setValue(lan);
}