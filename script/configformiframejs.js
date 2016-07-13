
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

                "TargetOutputEncSeed": '5CD566B7B6D04BE19572',
                "userDatetimeSettings": undefined,
                "ToolTipAttrName": "data-tooltip",
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
                "CheckboxList": function (fields, CheckFieldClicked, SavedFields) {
                    var WidthPercentage = '0';
                    var tip;
                    var $parentContainer = $('#listoffieldstoselect');

                    var $thecontainer = $('<div></div').addClass('flyout-ContentContainer').appendTo($parentContainer);

                    var ChkClicked = CheckFieldClicked;
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

                        if (SavedFields.length > 0) {
                            $.each(SavedFields, function (ind, saveditem) {
                                if (saveditem.Name == item.Name) {
                                    $chk.prop('checked', true);
                                    saveditem.RealIndex = $chk.attr('data-item-realindex');
                                    $chk.attr('data-item-realwidth', saveditem.RealWidth);
                                    $chk.attr('data-item-readonly', saveditem.ReadOnly);
                                }
                            });
                        }

                        //// Add button if not read only
                        //if (!_thisGlobals.FormIsReadOnly) {
                        //    var btnclass = 'fieldoptionsettingbutton';
                        //    var btntooltip = _thisGlobals.Translation_Labels.FieldConditionBtn;
                        //    if (tmpcondition) {
                        //        btnclass += ' checklistbuttoncondition';
                        //        btntooltip = '<span>' + item.Name +
                        //            ' ' + GetFieldConditionSelectOptionLabelByValue(tmpcondition.CrmFieldType, tmpcondition.ConditonOperator) +
                        //            ' ' + (((tmpcondition.ConditionLabel) && (tmpcondition.ConditionLabel != 'undefined')) ? tmpcondition.ConditionLabel : '') + '</span>';
                        //    }
                        //    $('<button></button>')
                        //        .attr('data-tilename-id', id)
                        //        .attr('data-tooltip', btntooltip)
                        //        .attr('id', btnid)
                        //        .addClass(btnclass)
                        //        .addClass(_thisGlobals.ToolTipClassSelector)
                        //        .appendTo($td)
                        //        .on('click', function (e) {
                        //            e.stopPropagation();
                        //            var $tile = $('#' + $(this).attr('data-tilename-id'));
                        //            var thisid = $(this).attr('id');
                        //            var attrtype = $tile.attr('data-item-attrtype');
                        //            var select = FieldConditionSelectId(attrtype);
                        //            _thisGlobals.CurFieldCondition = FindCondition($tile.attr('data-item-schema'));
                        //            if (_thisGlobals.CurFieldCondition) {
                        //                $("#removefieldcondition").show();
                        //                _thisGlobals.CurFieldCondition.LookupEntities = undefined;
                        //                _thisGlobals.CurFieldCondition.LookupData = [];
                        //                _thisGlobals.CurFieldCondition.PicklistData = [];
                        //                _thisGlobals.CurFieldCondition.ConditionAttributeOrg = $tile.attr('data-item-schema');
                        //                _thisGlobals.CurFieldCondition.CrmFieldLabel = $tile.attr('data-item-label');
                        //                if ((_thisGlobals.CurFieldCondition.ConditionValue) && (_thisGlobals.CurFieldCondition.ConditionValue != 'undefined')) {
                        //                    if ((_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.BooleanType) ||
                        //                        (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.OptionSetType) ||
                        //                        (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.State) ||
                        //                        (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.Status)) {
                        //                        if (!_thisGlobals.CurFieldCondition.ConditionValue.contains('%')) {
                        //                            var arrv = _thisGlobals.CurFieldCondition.ConditionValue.split(';');
                        //                            var arrl = _thisGlobals.CurFieldCondition.ConditionLabel.split(';');
                        //                            for (var i = 0; i < arrv.length; i++) {
                        //                                _thisGlobals.CurFieldCondition.PicklistData.push({ Label: arrl[i], Value: arrv[i] });
                        //                            }
                        //                        } else {
                        //                            select.ShowSelectBtn = false;
                        //                            _thisGlobals.CurFieldCondition.ConditionAttributeOptionset = _thisGlobals.CurFieldCondition.ConditionAttribute;
                        //                        }
                        //                    } else if ((_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.LookupType) ||
                        //                        (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.CustomerType) ||
                        //                        (_thisGlobals.CurFieldCondition.CrmFieldType == _thisGlobals.CrmFieldTypes.OwnerType)) {
                        //                        if (!_thisGlobals.CurFieldCondition.ConditionValue.contains('%')) {
                        //                            var arrv = _thisGlobals.CurFieldCondition.ConditionValue.split(';');
                        //                            var arrl = _thisGlobals.CurFieldCondition.ConditionLabel.split(';');
                        //                            var arrnames = _thisGlobals.CurFieldCondition.LookupLogicalNames.split(';');
                        //                            for (var i = 0; i < arrv.length; i++) {
                        //                                _thisGlobals.CurFieldCondition.LookupData.push({ LookupName: arrl[i], LookupId: arrv[i], LookupLogicalName: arrnames[i] });
                        //                            }
                        //                        } else {
                        //                            select.ShowLookupBtn = false;
                        //                            _thisGlobals.CurFieldCondition.ConditionAttributeLookup = _thisGlobals.CurFieldCondition.ConditionAttribute;
                        //                        }
                        //                    }
                        //                } else {
                        //                    select.ShowSelectBtn = false;
                        //                    select.ShowLookupBtn = false;
                        //                }
                        //            } else {
                        //                _thisGlobals.CurFieldCondition = {};
                        //                _thisGlobals.CurFieldCondition.ConditonOperator = select.SelectedOptionValue;
                        //                _thisGlobals.CurFieldCondition.ConditionAttribute = $tile.attr('data-item-schema');
                        //                _thisGlobals.CurFieldCondition.ConditionAttributeOrg = $tile.attr('data-item-schema');
                        //                _thisGlobals.CurFieldCondition.CrmFieldLabel = $tile.attr('data-item-label');
                        //                _thisGlobals.CurFieldCondition.CrmFieldType = $tile.attr('data-item-attrtype');
                        //                _thisGlobals.CurFieldCondition.ConditionValue = undefined;
                        //                _thisGlobals.CurFieldCondition.ConditionLabel = undefined;
                        //                _thisGlobals.CurFieldCondition.LookupEntities = undefined;
                        //                _thisGlobals.CurFieldCondition.LookupData = [];
                        //                _thisGlobals.CurFieldCondition.PicklistData = [];
                        //                $("#removefieldcondition").hide();
                        //            }
                        //            _thisGlobals.CurFieldCondition.BtnId = thisid;
                        //            _thisGlobals.CurFieldCondition.Selectid = select.id;
                        //            if ($tile.attr('data-item-lookuptargetentity')) {
                        //                _thisGlobals.CurFieldCondition.LookupEntities = $tile.attr('data-item-lookuptargetentity').split(',');
                        //            }
                        //            $(select.id).attr('data-item-org-schema', $tile.attr('data-item-schema'));
                        //            $(_thisGlobals.FieldIds.fieldconditioninput).removeAttr('readonly');
                        //            $(_thisGlobals.FieldIds.fieldconditioninput).val('');
                        //            $(_thisGlobals.FieldIds.dateconditioninput).val('');
                        //            $(".conditionscontainer").addClass("hideconditionscontainer");
                        //            $(select.label).addClass(_thisGlobals.ToolTipClassSelector).text($tile.attr('data-item-label')).attr('data-tooltip', $tile.attr('data-item-label'));
                        //            $(select.id).parent().removeClass("hideconditionscontainer");
                        //            //eq on eq-userid  --- contains;like
                        //            var tmpArr = _thisGlobals.CurFieldCondition.ConditonOperator.split(';');
                        //            _thisGlobals.CurFieldCondition.ConditonOperator = tmpArr[0];
                        //            var showInputs = true;
                        //            if (select.id == '#datetimeconditions') {
                        //                // on on-or-after on-or-before olderthan-x-months
                        //                showInputs = ((_thisGlobals.CurFieldCondition.ConditonOperator == 'on') || (_thisGlobals.CurFieldCondition.ConditonOperator == 'on-or-after')
                        //                    || (_thisGlobals.CurFieldCondition.ConditonOperator == 'on-or-before') || (_thisGlobals.CurFieldCondition.ConditonOperator == 'olderthan-x-months'));
                        //            } else {
                        //                // eq-userid ne-userid eq-userteams eq-useroruserteams
                        //                showInputs = ((_thisGlobals.CurFieldCondition.ConditonOperator != 'not-null') && (_thisGlobals.CurFieldCondition.ConditonOperator != 'null')
                        //                    && (_thisGlobals.CurFieldCondition.ConditonOperator != 'eq-userid') && (_thisGlobals.CurFieldCondition.ConditonOperator != 'ne-userid')
                        //                    && (_thisGlobals.CurFieldCondition.ConditonOperator != 'eq-userteams') && (_thisGlobals.CurFieldCondition.ConditonOperator != 'eq-useroruserteams'));
                        //            }
                        //            if (tmpArr.length > 1) {
                        //                _thisGlobals.CurFieldCondition.OperatorFetchOp = tmpArr[1];
                        //            }
                        //            $(select.id).val(_thisGlobals.CurFieldCondition.ConditonOperator);
                        //            if ((select.ShowInput) && (showInputs)) {
                        //                $(_thisGlobals.FieldIds.fieldconditioninput).val(_thisGlobals.CurFieldCondition.ConditionLabel);
                        //                $(_thisGlobals.FieldIds.fieldconditioninput).show();
                        //            } else {
                        //                $(_thisGlobals.FieldIds.fieldconditioninput).hide();
                        //            }
                        //            if ((select.ShowLookupBtn) && (showInputs)) {
                        //                $(_thisGlobals.FieldIds.lookupsearchbtn).show();
                        //                $(_thisGlobals.FieldIds.fieldconditioninput).attr('readonly', 'readonly');
                        //            } else {
                        //                $(_thisGlobals.FieldIds.lookupsearchbtn).hide();
                        //            }
                        //            if ((select.ShowSelectBtn) && (showInputs)) {
                        //                $(_thisGlobals.FieldIds.picklistselect).show();
                        //            } else {
                        //                $(_thisGlobals.FieldIds.fieldconditioninput).attr('readonly', 'readonly');
                        //                $(_thisGlobals.FieldIds.picklistselect).hide();
                        //            }
                        //            if ((select.ShowDate) && (showInputs)) {
                        //                $(_thisGlobals.FieldIds.dateconditioninput).val(_thisGlobals.CurFieldCondition.ConditionLabel);
                        //                $(_thisGlobals.FieldIds.dateconditioninput).show();
                        //            } else {
                        //                $(_thisGlobals.FieldIds.dateconditioninput).hide();
                        //            }
                        //            $(_thisGlobals.FieldIds.FieldConditionFlyout).show('slow');
                        //            if ((select.ShowInput) && (showInputs)) {
                        //                $(_thisGlobals.FieldIds.fieldconditioninput).focus();
                        //            }
                        //            ConditionSelectOnChange(select.id);
                        //            CreateTooltip();
                        //        });
                        //}
                    });

                    $thecontainer.DestroyYourself = function () {
                        $('#listoffieldstoselect').empty();
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
    var self = this;

    function NumericTextbox(id, tooltipText, tooltipClass, initValue, elemWidth, parentElem, saveFunction, forWidth) {

        self.SaveFuncPtr = saveFunction;

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

            if ($this.attr("data-item-forwidth") == "1") {
                if ((val == null) || (val.length == 0)) {
                    $this.val('0');
                }
                $('#' + $this.attr('data-tilename-id')).attr('data-item-realwidth', '' + val);
            } else {
                if ((val) && (val.length > 0)) {
                    $this.parent().attr('data-item-default', val);
                } else {
                    $this.parent().removeAttr('data-item-default');
                }
            }

            if (self.SaveFuncPtr) {
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
    var self = this;

    function SelectBooleanCheck(id, elemWidth, parentElem, data, defaultValue, saveFunction) {

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
    var self = this;

    function OptionSetSelect(id, elemWidth, parentElem, data, defaultValue, saveFunction) {

        var select = '<option selected="selected" value="-1">---</option>';

        if (data.length > 0) {
            var dv = (defaultValue) ? defaultValue.split('{}')[1] : '';

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

    // LogicalName
    // IsCustomEntity
    // DisplayName.LocalizedLabels[0].Label
    // DisplayName.LocalizedLabels[0].LanguageCode
    var index = 0;
    var ent = null;
    var options = []; //'<option value="0">--Select Entity--</option>';

    for (index = 0, j = result.length; index < j; index++) {
        ent = result[index];
        if (ent.DisplayName.LocalizedLabels.length > 0) {
            options.push({ SchemaName: ent.SchemaName, Name: ((ent.DisplayName.LocalizedLabels.length == 0) ? ent.LogicalName : ent.DisplayName.LocalizedLabels[0].Label) });
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
function RetreiveEntityMetadata(logicalName) {
    _thisGlobals.WaitDialog.show();
    _thisGlobals.EntityToGetMetadataFor = logicalName;
    XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Attributes'], logicalName, true, RetreiveEntityMetadateCallback);
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
                _thisGlobals.AllFieldsMetadata.push({
                    SchemaName: schName,
                    Name: ((ent.DisplayName.LocalizedLabels.length == 0) ? ent.LogicalName : ent.DisplayName.LocalizedLabels[0].Label),
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
    //$('#displayfromentity option:selected');

    //var opt2 = $('#displayentityfieldsoptions option:selected');
    txt = (((opt) && (opt.length)) ? opt.attr('data-item-orglabel') : ''); //  + '-' + (((opt2) && (opt2.length)) ? opt2.text() : '')
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

    if (_thisGlobals.ReloadedSavedFields.length > 0) {

        var tbody = $('#selectedfieldstable').find('tbody:first');
        tbody.empty();

        $.each(_thisGlobals.ReloadedSavedFields, function (index, item) {
            SetupSelectedFieldRow(tbody, item);
        });
    }

    if (!_thisGlobals.FormIsReadOnly) {
        $('#selectedfieldstable').sortable({
            containerSelector: 'table',
            itemPath: '> tbody',
            itemSelector: 'tr',
            placeholder: '<tr class="placeholder"/>',
            onDrop: function ($item, container, _super) {
                SaveFields();
                _super($item, container);
            }
        });
    }

    if (_thisGlobals.FormIsReadOnly) {
        $('#listoffieldstoselect').find('input').attr('disabled', 'disabled');

        $('#selectedfieldstable').find('tbody:first').find('input').attr('disabled', 'disabled');
        $('#selectedfieldstable').find('tbody:first').find('button').attr('disabled', 'disabled');
        $('#selectedfieldstable').find('tbody:first').find('select').attr('disabled', 'disabled');
    }

    CreateTooltip();
}

function LookupDefaultValueCallbackFunction(returnValue) {

    if ((returnValue) && (returnValue.items) && (returnValue.items.length) && (returnValue.items.length > 0)) {

        var ConditionLabel = returnValue.items[0].name;
        var ConditionValue = returnValue.items[0].id.replace('{', '').replace('}', '');
        var LookupLogicalNames = returnValue.items[0].typename;

        if (ConditionLabel) {
            $("#" + _thisGlobals._DefaultLookupElemId).parent().attr('data-item-default', ConditionLabel + '{}' + ConditionValue + '{}' + LookupLogicalNames);
            $("#" + _thisGlobals._DefaultLookupElemId).val(ConditionLabel);
        } else {
            $("#" + _thisGlobals._DefaultLookupElemId).parent().removeAttr('data-item-default');
            $("#" + _thisGlobals._DefaultLookupElemId).val('');
        }

    } else {
        $("#" + _thisGlobals._DefaultLookupElemId).parent().removeAttr('data-item-default');
        $("#" + _thisGlobals._DefaultLookupElemId).val('');
    }
    SaveFields();
}

/*Setup selected field row*/
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
    $('<td>' + item.Name + '</td>').appendTo(row);
    $('<td>' + item.SchemaName + '</td>').appendTo(row);
    $('<td>' + item.AttrType + '</td>').appendTo(row);
    $('<td>' + item.RequieredLevel + '</td>').appendTo(row);

    // Read only
    var $td = $('<td></td>').appendTo(row);

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
        $td.attr('data-item-default', ((dValue) ? dValue : "Default Value"));
        $numInput = $('<input style="width:130px;" type="text" />')
            .attr('data-tilename-id', id)
            .val(((dValue) ? dValue : "Default Value"))
            .on('blur', function (e) {
                e.stopPropagation();
                var val = $(this).val();
                $(this).parent().attr('data-item-default', val);
                SaveFields();
            })
            .appendTo($td);

    } else if (item.AttrType == _thisGlobals.CrmFieldTypes.BooleanType) {
        var optionset = XrmServiceToolkit.Soap.RetrieveAttributeMetadata(_thisGlobals._CurConfiguration.Entity.SchemaName, item.SchemaName, true);
        var data = [];
        if (optionset.length > 0) {
            data.push(
            {
                Label: optionset[0].OptionSet.TrueOption.Label.LocalizedLabels[0].Label,
                value: optionset[0].OptionSet.TrueOption.Value
            });
            data.push(
            {
                Label: optionset[0].OptionSet.FalseOption.Label.LocalizedLabels[0].Label,
                value: optionset[0].OptionSet.FalseOption.Value
            });
        }

        if (dValue) {
            $td.attr('data-item-default', dValue);
        } else {
            $td.attr('data-item-default', data[0].Label + '{}' + data[0].value);
        }
        $numInput = new SelectBooleanCheck(id, 130, $td, data, dValue, SaveFields);

    } else if ((item.AttrType == _thisGlobals.CrmFieldTypes.DecimalType) || (item.AttrType == _thisGlobals.CrmFieldTypes.DoubleType) || (item.AttrType == _thisGlobals.CrmFieldTypes.MoneyType) || (item.AttrType == _thisGlobals.CrmFieldTypes.IntegerType)) {
        if (dValue) {
            $td.attr('data-item-default', dValue);
        }
        $numInput = new NumericTextbox(id, null, null, ((dValue) ? dValue : ""), 130, $td, SaveFields, false);

    } else if ((item.AttrType == _thisGlobals.CrmFieldTypes.LookupType) || (item.AttrType == _thisGlobals.CrmFieldTypes.CustomerType) || (item.AttrType == _thisGlobals.CrmFieldTypes.OwnerType)) {

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
                    _this.attr('data-item-originalval', dValue);
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

                var EntityObjectTypeCode = [];
                var LookupEntities = item.LookupTargetEntity.split(',');

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
            })
            .appendTo($td);

    } else if (item.AttrType == _thisGlobals.CrmFieldTypes.DateTimeType) {
        var inputid = DCrmEditableGrid.Helper.GenerateUUID();
        $numInput = $('<input style="width:130px;" type="text" />')
            .val((dValue || ''))
            .attr('data-tilename-id', id)
            .attr('data-item-haschanged', '0')
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
            onChangeDateTime: function (dp, $input) {
                if ((dp === undefined) || (dp === null) || (dp.getDay() == 0)) {
                    $input.attr('data-item-haschanged', '0');
                } else {
                    $input.attr('data-item-haschanged', '1');
                }
            },
            onClose: function (dp, $input) {
                if ($input.attr('data-item-haschanged') == '1') {
                    $input.parent().attr('data-item-default', $input.val());
                    SaveFields();
                } else if ($input.val().length == 0) {
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
                    Label: optionset[0].OptionSet.Options[i].Label.LocalizedLabels[0].Label,
                    value: optionset[0].OptionSet.Options[i].Value
                });
            }
        }
        if (dValue) {
            $td.attr('data-item-default', dValue);
        }
        $numInput = new OptionSetSelect(id, 130, $td, data, dValue, SaveFields);
    }

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
                DefaultValue: ((items.length == 13) ? items[12] : null),
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
            $div.attr('data-item-lookuptargetentity');
            if (val) {
                headersinfo += _thisGlobals._SEPERATOR + val;
            }
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
            $div.attr('data-item-lookuptargetentity');
            if (val) {
                headersinfo += _thisGlobals._SEPERATOR + val;
            }
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
    } else {
        var $row = $('#selectedfieldstable').find('tbody:first').find("tr[data-item-realindex=" + selectedCheckbox.attr('data-item-realindex') + "]");
        if (($row) && ($row.length)) {
            $row.empty().remove();
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

        if (i > 0) {
            headersinfo += _thisGlobals._OuterSeperator + _thisGlobals.ReloadedFieldConditions[i].ConditionAttribute + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionValue) ? _thisGlobals.ReloadedFieldConditions[i].ConditionValue : '') + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) ? (cop + ';' + _thisGlobals.ReloadedFieldConditions[i].OperatorFetchOp) : cop) + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionLabel) ? _thisGlobals.ReloadedFieldConditions[i].ConditionLabel : '') + _thisGlobals._SEPERATOR
            + _thisGlobals.ReloadedFieldConditions[i].CrmFieldType + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].LookupLogicalNames) ? _thisGlobals.ReloadedFieldConditions[i].LookupLogicalNames : '') + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg) ? _thisGlobals.ReloadedFieldConditions[i].ConditionAttributeOrg : '') + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].CrmFieldLabel) ? _thisGlobals.ReloadedFieldConditions[i].CrmFieldLabel : '');
        } else {
            headersinfo = _thisGlobals.ReloadedFieldConditions[i].ConditionAttribute + _thisGlobals._SEPERATOR
            + ((_thisGlobals.ReloadedFieldConditions[i].ConditionValue) ? _thisGlobals.ReloadedFieldConditions[i].ConditionValue : '') + _thisGlobals._SEPERATOR
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
            Aattr = _thisGlobals.ReloadedFieldConditions[index].ConditionAttribute;
            Aval = ((_thisGlobals.ReloadedFieldConditions[index].ConditionValue) && (_thisGlobals.ReloadedFieldConditions[index].ConditionValue != 'undefined'))
                ? _thisGlobals.ReloadedFieldConditions[index].ConditionValue : '';
            Aop = _thisGlobals.ReloadedFieldConditions[index].ConditonOperator;
            Atype = _thisGlobals.ReloadedFieldConditions[index].CrmFieldType;

            var condName = '';
            var tmp = '';
            var changedattr = undefined;

            if ((_thisGlobals.AllFieldsMetadata) && (_thisGlobals.AllFieldsMetadata.length > 0)) {
                for (var i = 0; i < _thisGlobals.AllFieldsMetadata.length; i++) {
                    if (_thisGlobals.AllFieldsMetadata[i].SchemaName == _thisGlobals.ReloadedFieldConditions[index].ConditionAttributeOrg) {
                        condName = '<span style="font-weight:bold;">' + _thisGlobals.AllFieldsMetadata[i].Name + "</span><br />";
                        break;
                    }
                }
            }

            if (Atype == _thisGlobals.CrmFieldTypes.DateTimeType) {
                Aval = Aval.split(_thisGlobals.userDatetimeSettings.DateSeparator).join('-');
            }

            if (Aval.contains(';')) {
                var inarg = Aval.split(';');
                if (Aop.contains(';')) {
                    var tmpAop = Aop.split(';')[1];
                    tmp += condName + '&lt;condition attribute="' + Aattr + '" operator="' + ((tmpAop == 'eq') ? 'in' : 'not-in') + '"&gt;<br />';
                } else {
                    tmp += condName + '&lt;condition attribute="' + Aattr + '" operator="' + ((Aop == 'eq') ? 'in' : 'not-in') + '"&gt;<br />';
                }

                var uitypes = ((_thisGlobals.ReloadedFieldConditions[index].LookupLogicalNames) && (_thisGlobals.ReloadedFieldConditions[index].LookupLogicalNames.length > 0)) ? _thisGlobals.ReloadedFieldConditions[index].LookupLogicalNames.split(';') : [];
                var uinames = ((_thisGlobals.ReloadedFieldConditions[index].ConditionLabel) && (_thisGlobals.ReloadedFieldConditions[index].ConditionLabel.length > 0)) ? _thisGlobals.ReloadedFieldConditions[index].ConditionLabel.split(';') : [];

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
                Aret += '<div class="displayconditionitem" data-item-schema="' + Aattr + '" data-item-org-schema="' + _thisGlobals.ReloadedFieldConditions[index].ConditionAttributeOrg + '">' + tmp + '</div>';
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
                    $(_thisGlobals.FieldIds.fieldconditioninput).val('').show().focus();
                } else {
                    $(_thisGlobals.FieldIds.dateconditioninput).val('').show().datetimepicker('show');
                }
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

    _thisGlobals.Translation_Labels.widthAutoCalculate = "0, width is auto calculated";
    _thisGlobals.Translation_Labels.width = "Width";
    _thisGlobals.Translation_Labels.readonly = "Read-only";
    _thisGlobals.Translation_Labels.TragetEntityReq = "Target entity is requiered.";
    _thisGlobals.Translation_Labels.EntityToDisplayReq = "Entity to display the grid on is requiered.";
    _thisGlobals.Translation_Labels.FieldReq = "At leaset one field must be selected for";
    _thisGlobals.Translation_Labels.FieldConditionBtn = "Field condition";
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
    $("#refreshaftercreate_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#refreshaftercreate_label").text());
    $("#refreshaftersave_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#refreshaftersave_label").text());
    $("#createnewbtnclick_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#createnewbtnclick_label").text());
    $("#booleaneditorbehaviour_label").addClass(_thisGlobals.ToolTipClassSelector).attr(_thisGlobals.ToolTipAttrName, $("#booleaneditorbehaviour_label").text());

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
    $('#refreshaftercreate_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.RefreshAfterCreate = $(this).prop('checked');

        SetParentFormDirty();
    });
    $('#refreshaftersave_check').on('click', function (e) {
        _thisGlobals._CurConfiguration.RefreshAfterSave = $(this).prop('checked');

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

    $("#cancelfieldcondition").on('click', function (e) {
        _thisGlobals.CurFieldCondition = undefined;
        $("#fieldconditionflyout").hide('slow');
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
                    Label: optionset[0].OptionSet.TrueOption.Label.LocalizedLabels[0].Label,
                    value: optionset[0].OptionSet.TrueOption.Value
                });
                data.push(
                {
                    Label: optionset[0].OptionSet.FalseOption.Label.LocalizedLabels[0].Label,
                    value: optionset[0].OptionSet.FalseOption.Value
                });
            } else {
                for (var i = 0; i < optionset[0].OptionSet.Options.length; i++) {
                    data.push(
                    {
                        Label: optionset[0].OptionSet.Options[i].Label.LocalizedLabels[0].Label,
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
            var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Attributes'], _thisGlobals.CurFieldCondition.LookupEntities[i], true);
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

        if (EntityGridEntityExists(schemaName)) {
            return;
        }

        var data = { SchemaName: schemaName, Label: entityLabel };
        var config = new DCrmEGConfigurationManager(data);
        AddToMainConfiguration(config);
        SetParentTitle();
        SetParentFormDirty();
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

        $('#displayentityfieldsoptions').prop('disabled', 'disabled');
        $('#entitiesAreRelated').attr('disabled', 'disabled');
        $('#displaySum').attr('disabled', 'disabled');
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
        EntityGridMakeSortable();
    }

    CreateTooltip();
}

/* Make selected entities list items sortable */
function EntityGridMakeSortable() {
    $('#makesortable').sortable({
        onDragStart: function ($item, container, _super) {

            var elem = $item.parent().parent();
            if (elem[0].tagName != 'LI') {
                _thisGlobals.BeforeDragParentLi = undefined;
            } else {
                _thisGlobals.BeforeDragParentLi = FindDCrmEGConfigurationBySchema(elem.find('span:first').attr('data-item-schemaname'));
            }
            _super($item, container);
        },
        onDrop: function ($item, container, _super) {

            var parent = $item.parent().parent();
            var $thisspan = $item.find('span:first');
            var schema = $thisspan.attr('data-item-schemaname');

            var config = FindDCrmEGConfigurationBySchema(schema);

            if (parent[0].tagName == 'LI') {

                var parentspan = $(parent).find('span:first');
                var parentschema = parentspan.attr('data-item-schemaname');

                var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Relationships'], schema, true);
                if ((result) && (result.length > 0)) {

                    // remove existing one if any
                    var label = $thisspan.next();
                    if ((label) && (label.length) && (label[0].tagName == 'LABEL')) {
                        label.empty().remove();
                    }

                    var related = GetEntityRelationships(result[0].ManyToOneRelationships, parentschema);
                    if (related) {
                        $thisspan.text($thisspan.attr('data-item-orglabel') + ' '); // + ' - ' + related + ' = ' + parentspan.attr('data-item-orglabel'));
                        $('<label> <input data-item-schema="' + schema + '" onclick="InnerRelationshipHandler(event, this);" checked="checked" type="checkbox"></input>' + related
                            + ' = ' + parentspan.attr('data-item-orglabel') + '</label>').insertAfter($thisspan);

                        config.Entity.ParentLiId = $(parent).attr('id');
                        config.Entity.RelatedToParentLI = true;
                        config.Entity.RelatedToParentLILookupSchemaName = related;
                        config.Entity.ParentSchemaName = parentschema;

                    } else {
                        config.Entity.ParentLiId = undefined;
                        config.Entity.RelatedToParentLI = false;
                        config.Entity.RelatedToParentLILookupSchemaName = undefined;
                        config.Entity.ParentSchemaName = parentschema;
                    }

                    var parentconfig = FindDCrmEGConfigurationBySchema(parentschema);
                    parentconfig.ChildConfigurations.push(jQuery.extend(true, {}, config));
                    if (_thisGlobals.BeforeDragParentLi) {
                        _thisGlobals.BeforeDragParentLi.RemoveChild(schema);
                    } else {
                        RemoveDCrmEGConfiguration(schema, false);
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

    $('#listoffieldstoselectlabel').text('');
    $('#conditionsfetchdisplay').html('');
    if (_thisGlobals.SelectFieldsCheckboxList) {
        _thisGlobals.SelectFieldsCheckboxList.DestroyYourself();
    }
    DisplaySectionGroup(2, false);
    DisplaySectionGroup(4, false);
    DisplaySectionGroup(5, false);
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
    RemoveDCrmEGConfiguration(c.Entity.SchemaName, false);
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
            if (i > 0) {
                tmp += _thisGlobals._SEPERATOR + $(li[i]).find('span:first').attr('data-item-schemaname');
            } else {
                tmp = $(li[i]).find('span:first').attr('data-item-schemaname');
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

    var result = XrmServiceToolkit.Soap.RetrieveEntityMetadata(['Relationships'], logicalName, true);
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
                if (data[index].ReferencedEntity == displayon) {

                    relationships.push(data[index].ReferencingAttribute);
                    console.log("getting [" + data[index].ReferencingAttribute + "]");
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
                if (data[index].ReferencedEntity == displayon) {
                    foundit = data[index].ReferencingAttribute;
                    break;
                }
            }
        }
    }
    return foundit;
}

/*Configuration Manager Related*/

var DCrmEGConfigurationManager = (function () {

    function DCrmEGConfigurationManager(data) {
        var self = this;

        var parentContainer = '#makesortable';
        if (data.parentContainer) {
            parentContainer = '#' + data.parentContainer;
        }

        var id = DCrmEditableGrid.Helper.GenerateUUID();
        var related = undefined;

        if (data.related) {
            RetreiveEntityRelationShips(data.SchemaName);
            related = data.related;
        } else {
            var tmpRelated = RetreiveEntityRelationShips(data.SchemaName);
            if (tmpRelated.length > 0) {
                related = tmpRelated[0];
            }
        }

        self.Entity = {
            LiId: id,
            SchemaName: data.SchemaName,
            Label: data.Label,

            RelatedToDisplayOnEntity: (related) ? true : false,
            RelatedToDisplayOnLookupSchemaName: (related) ? related : undefined,

            ParentLiId: (data.ParentLiId) ? data.ParentLiId : undefined,

            RelatedToParentLI: data.RelatedToParentLI,
            ParentSchemaName: (data.ParentSchemaName) ? data.ParentSchemaName : undefined,
            RelatedToParentLILookupSchemaName: (data.RelatedToParentLILookupSchemaName) ? data.RelatedToParentLILookupSchemaName : undefined
        };

        self.HasStatusField = (data.HasStatusField) ? data.HasStatusField : undefined;
        self.DisplaySum = ((data.DisplaySum) && (data.DisplaySum == 'false')) ? false : true;
        self.FieldDisplayOption = (data.FieldDisplayOption) ? data.FieldDisplayOption : 100000003; // All fields
        self.RecordsPerPage = (data.RecordsPerPage) ? data.RecordsPerPage : '5';

        self.AutoSaveChanges = ((data.AutoSaveChanges) && (data.AutoSaveChanges == 'false')) ? false : true;
        self.AllowCreateNew = ((data.AllowCreateNew) && (data.AllowCreateNew == 'false')) ? false : true;
        self.AllowDelete = ((data.AllowDelete) && (data.AllowDelete == 'false')) ? false : true;
        self.RefreshAfterCreate = ((data.RefreshAfterCreate) && (data.RefreshAfterCreate == 'false')) ? false : true;
        self.RefreshAfterSave = ((data.RefreshAfterSave) && (data.RefreshAfterSave == 'true')) ? true : false;

        self.SortOrder = ((data.SortOrder) && (data.SortOrder != 'undefined')) ? data.SortOrder : undefined;
        self.NewBtnBehavoir = ((data.NewBtnBehavoir) && (data.NewBtnBehavoir != 'undefined')) ? data.NewBtnBehavoir : "30";
        self.BooleanEditorBehavoir = ((data.BooleanEditorBehavoir) && (data.BooleanEditorBehavoir != 'undefined')) ? data.BooleanEditorBehavoir : "20";

        self.HideAutosaveButton = ((data.HideAutosaveButton) && (data.HideAutosaveButton == 'true')) ? true : false;

        self.Fields = undefined;
        self.Conditions = undefined;
        //self.EntityFields = [];
        //self.EntityConditions = [];
        self.ChildConfigurations = [];

        self.Li = $('<li><div class="entitygridinfocontainer"><span class="EntityGridLabels" data-item-orglabel="' + data.Label
            + '" data-item-schemaname="' + data.SchemaName + '">'
            + data.Label + '</span><button class="entitylistbuttons"></button></div><ol id="' + DCrmEditableGrid.Helper.GenerateUUID() + '"></ol></li>')
            .attr('id', id).appendTo($(parentContainer));

        self.Li.find('.entitygridinfocontainer').on('click', function (e) {
            e.stopPropagation();

            if ((e.target) && (e.target.tagName == 'DIV')) {
                var li = $(this).parent();
                DisplaySelectedEntityInfo(li, self.Entity.SchemaName);
            }
        });

        self.Li.find('span:first').on('click', function (e) {
            e.stopPropagation();
            var li = $(this).parent().parent();
            DisplaySelectedEntityInfo(li, self.Entity.SchemaName);
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

            RemoveDCrmEGConfiguration(self.Entity.SchemaName, true);
            self.DestroyLi();
            SetParentTitle();
            SetParentFormDirty();
        });

        self.RemoveChild = function (schemaname) {
            var condition = -1;
            var config = FindDCrmEGConfigurationBySchema(self.Entity.SchemaName);

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
            var config = FindDCrmEGConfigurationBySchema(self.Entity.SchemaName);

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

function DisplaySelectedEntityInfo(li, schema) {
    var $this = $('#makesortable');

    if ($this.attr('data-item-lastfocus')) {
        $('#' + $this.attr('data-item-lastfocus')).find('div:first').removeClass('selectedli');
    }
    li.find('div:first').addClass('selectedli');
    $this.attr('data-item-lastfocus', li.attr('id'));

    ResetAllUI();

    _thisGlobals._CurConfiguration = FindDCrmEGConfigurationBySchema(schema);

    if (_thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnEntity) {
        $('#entitiesAreRelated').prop('checked', true);
        $('#relatedEntityLookupSelect').val(_thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnLookupSchemaName);
        $('#relatedEntityLookup').val(_thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnLookupSchemaName);
        console.log("Setting [" + _thisGlobals._CurConfiguration.Entity.RelatedToDisplayOnLookupSchemaName + "]");
        DisplaySectionGroup(2, true);
    } else {
        $('#entitiesAreRelated').prop('checked', false);
        $('#relatedEntityLookupSelect').empty();
        $('#relatedEntityLookup').val('');
        DisplaySectionGroup(2, false);
    }

    $('#displaySum').prop('checked', _thisGlobals._CurConfiguration.DisplaySum);
    $('#autosavechanges_check').prop('checked', _thisGlobals._CurConfiguration.AutoSaveChanges);
    $('#hideautosave_check').prop('checked', _thisGlobals._CurConfiguration.HideAutosaveButton);
    $('#allowcreate_check').prop('checked', _thisGlobals._CurConfiguration.AllowCreateNew);
    $('#allowdelete_check').prop('checked', _thisGlobals._CurConfiguration.AllowDelete);
    $('#refreshaftercreate_check').prop('checked', _thisGlobals._CurConfiguration.RefreshAfterCreate);
    $('#refreshaftersave_check').prop('checked', _thisGlobals._CurConfiguration.RefreshAfterSave);
    $('#maxrecordperpage').val(_thisGlobals._CurConfiguration.RecordsPerPage);
    $('#createnewbtnclick').val(_thisGlobals._CurConfiguration.NewBtnBehavoir);
    $('#booleaneditorbehaviour').val(_thisGlobals._CurConfiguration.BooleanEditorBehavoir);

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

    //var allEntittiesInfo = _thisGlobals.xrmPage.data.entity.attributes.get('dcrmeg_entitiesinfo').getValue();

    var val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.HeaderFieldNames).getValue();
    // Display order
    var entities = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._SEPERATOR) : '';
    var parentconfig = undefined;
    var config = undefined;

    //if ((allEntittiesInfo) && (allEntittiesInfo.length > 0)) {
    //    var allconfigs = JSON.parse(allEntittiesInfo);
    //    for (var i = 0; i < entities.length; i++) {
    //    }
    //}

    // All Entities info
    val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.DisplayFromEntityFieldName).getValue();
    var entitesInfo = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';
    // All fields
    val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FromEntityFieldsAttr).getValue();
    var fields = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';
    // All conditions
    val = _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FieldConditionValues).getValue();
    var consitions = (val) ? RetrieveEntityOutput(val, true).split(_thisGlobals._pSeperator) : '';

    for (var i = 0; i < entities.length; i++) {

        parentconfig = undefined;
        var tmp = FindEntityGridInfo(entities[i], entitesInfo);

        var data = { SchemaName: tmp[0], Label: tmp[1] };
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
        }

        config = new DCrmEGConfigurationManager(data);
        config.Fields = FindEntiyGridFields(data.SchemaName, fields);

        //if (config.Fields) {
        //    var arr = config.Fields.split(_thisGlobals._OuterSeperator);
        //    $.each(arr, function (index, item) {
        //        var items = item.split(_thisGlobals._SEPERATOR);

        //        if (items.length == 1) {
        //            return;
        //        }

        //        config.EntityFields.push({
        //            Name: items[0],
        //            SchemaName: items[1],
        //            AttrType: items[2],
        //            RequieredLevel: items[3],
        //            MaxLength: items[4],
        //            Format: items[5],
        //            MaxValue: items[6],
        //            MinValue: items[7],
        //            Precision: items[8],
        //            RealWidth: items[9],
        //            ReadOnly: items[10],
        //            LookupTargetEntity: items[11],
        //            DefaultValue: ((items.length == 13) ? items[12] : null)
        //        });
        //    });
        //}


        if (consitions.length > 0) {
            config.Conditions = FindEntiyGridFields(data.SchemaName, consitions);
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
                $('<label> <input type="checkbox" ' + checked + '  data-item-schema="' + data.SchemaName + '" onclick="InnerRelationshipHandler(event, this);"></input>' + data.RelatedToParentLILookupSchemaName + ' = ' + parentconfig.Entity.Label + '</label>').insertAfter(li);
            }
            // add to parent
            parentconfig.ChildConfigurations.push(config);
        } else {
            AddToMainConfiguration(config);
        }
    }
}

function InnerRelationshipHandler(e, input) {
    e.stopPropagation();
    var schema = $(input).attr('data-item-schema');
    var config = FindDCrmEGConfigurationBySchema(schema);
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

    //var local = JSON.stringify(_thisGlobals.DCrmEGConfiguration);
    //console.log(local);
    //var obj = JSON.parse(local);
    //for (var index = 0; index < obj.length; index++) {
    //    var inner = JSON.parse(obj[index]);
    //    if (inner.ChildConfigurations) {
    //        var final = [];
    //        // For each child configuration, we need to call JSON.parse
    //        final.push(JSON.parse(inner.ChildConfigurations[0]));
    //        inner.ChildConfigurations = final;
    //    }
    //    console.log("index");
    //}

    for (var i = 0; i < _thisGlobals.DCrmEGConfiguration.length; i++) {

        if (i > 0) {
            _thisGlobals._Entityinfo += _thisGlobals._pSeperator;
        }

        _thisGlobals._Entityinfo += _thisGlobals.DCrmEGConfiguration[i].Entity.SchemaName + _thisGlobals._SEPERATOR
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
        + _thisGlobals._SEPERATOR + _thisGlobals.DCrmEGConfiguration[i].HideAutosaveButton;


        if (_thisGlobals.DCrmEGConfiguration[i].Fields) {
            if (i > 0) {
                _thisGlobals._Fieldsinfo += _thisGlobals._pSeperator;
            }
            _thisGlobals._Fieldsinfo += _thisGlobals.DCrmEGConfiguration[i].Fields + _thisGlobals._OuterSeperator + _thisGlobals.DCrmEGConfiguration[i].Entity.SchemaName;
        }
        if (_thisGlobals.DCrmEGConfiguration[i].Conditions) {
            if (i > 0) {
                _thisGlobals._Conditioninfo += _thisGlobals._pSeperator;
            }
            _thisGlobals._Conditioninfo += _thisGlobals.DCrmEGConfiguration[i].Conditions + _thisGlobals._OuterSeperator + _thisGlobals.DCrmEGConfiguration[i].Entity.SchemaName;
        }

        if (_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length > 0) {
            for (var ii = 0; ii < _thisGlobals.DCrmEGConfiguration[i].ChildConfigurations.length; ii++) {
                SaveDCrmEGConfigurationInternal(_thisGlobals.DCrmEGConfiguration[i].ChildConfigurations[ii]);
            }
        }
    }

    var displayorder = GetEntitesDispayOrder();

    //_thisGlobals.xrmPage.data.entity.attributes.get('dcrmeg_entitiesinfo').setValue(local);

    // Display order of entities
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.HeaderFieldNames).setValue(RetrieveEntityOutput(displayorder, false));
    // All Entities info
    // dcrmeg_entitiesinfo
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.DisplayFromEntityFieldName).setValue(RetrieveEntityOutput(_thisGlobals._Entityinfo, false));
    // All fields
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FromEntityFieldsAttr).setValue(RetrieveEntityOutput(_thisGlobals._Fieldsinfo, false));
    // All conditions
    _thisGlobals.xrmPage.data.entity.attributes.get(_thisGlobals.FieldConditionValues).setValue(RetrieveEntityOutput(_thisGlobals._Conditioninfo, false));

}

function SaveDCrmEGConfigurationInternal(config) {

    _thisGlobals._Entityinfo += _thisGlobals._pSeperator + config.Entity.SchemaName + _thisGlobals._SEPERATOR
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
    + _thisGlobals._SEPERATOR + config.HideAutosaveButton;


    if (config.Fields) {
        _thisGlobals._Fieldsinfo += _thisGlobals._pSeperator + config.Fields + _thisGlobals._OuterSeperator + config.Entity.SchemaName;
    }
    if (config.Conditions) {
        _thisGlobals._Conditioninfo += _thisGlobals._pSeperator + config.Conditions + _thisGlobals._OuterSeperator + config.Entity.SchemaName;
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