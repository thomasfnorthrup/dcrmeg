## JavaScript Callbacks

**ValidateDCrmEgGrid**
Fired before the value of a field is changed. Cancellable.

**DCrmEgGridSaving**
Fired before saving changed values to records. Cancellable.

**DCrmEgGridDeleting**
Fired before the selected record(s) are deleted. Cancellable.

**DCrmEgGridBeforeCreateNewRecord**
Fired before a new record is created. Cancellable.

**DCrmEgGridCreateNewRecord**
Fired after a new record is created using (+) create new button. Returns Guid of the new record.

**DCrmEgGridOnload**
Fired during population of Option-Sets. You will have the opportunity to set individual options to disabled.

**DCrmEgGridRowOnload**
Fires for every row to be rendered. Allows setting a field (cell) to readonly and change the background and forground colors.

**DCrmEgGridOnBeforeFetchRecords**
Allow additional conditions to be added to the fetch XML prior to fetching data for the grid.

**Set up**

1. Create a new JavaScript resource and add the following code to the it
1. Replace the body of the functions with your code
1. Add the resource to the entity where the grid is being displayed (form editor)
1. For CRM 2015 and 2016, add the FormOnloadHandler function to form onload event (form editor)

Code Blocks

	function Log(s) {
		if (typeof console != "undefined" && typeof console.debug != "undefined") {
			console.log(s);
		}
	}
	// Implement the following only for CRM 2015 and 2016
	// Add the FormOnloadHandler function to form (where grid is to be displayed) onload using form editor
	function FormOnloadHandler(context) {
		window.parent.ValidateDCrmEgGrid = ValidateDCrmEgGrid;
		window.parent.DCrmEgGridSaving = DCrmEgGridSaving;
		window.parent.DCrmEgGridDeleting = DCrmEgGridDeleting;
		window.parent.DCrmEgGridBeforeCreateNewRecord = DCrmEgGridBeforeCreateNewRecord;
		window.parent.DCrmEgGridCreateNewRecord = DCrmEgGridCreateNewRecord;
		window.parent.DCrmEgGridOnload = DCrmEgGridOnload;
		window.parent.DCrmEgGridRowOnload = DCrmEgGridRowOnload;
		window.parent.DCrmEgGridOnBeforeFetchRecords = DCrmEgGridOnBeforeFetchRecords;
	}
	function ValidateDCrmEgGrid(param, field) {
		var allow = true;
		Log("FieldSchemaName [" + field.FieldSchemaName + "](_-+-field.FieldSchemaName-+-_) FieldLabel [" + field.FieldLabel + "](_-+-field.FieldLabel-+-_) ParentEntitySchemaName [" + field.ParentEntitySchemaName + "](_-+-field.ParentEntitySchemaName-+-_) ParentEntityLabel [" + field.ParentEntityLabel + "](_-+-field.ParentEntityLabel-+-_) record guid [" + param.RecordGuid + "](_-+-param.RecordGuid-+-_)" );
		switch (param.EditorType) {
			// Text
			case 0:
				Log("Text - NewValue [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalValue [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			// Whole Number
			case 1:
				Log("Text - NewValue [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalValue [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			// Date Picker
			case 2:
				Log("Date - NewDate [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalDate [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			// Checkbox (two option)
			case 3:
				Log("Checkbox (TwoOption) - NewText [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalText [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_) isChecked [" + param.IsChecked + "](_-+-param.IsChecked-+-_)");
				break;
			// OptionSet
			case 4:
				Log("OptionSet - NewLabel [" + param.NewLabel + "](_-+-param.NewLabel-+-_) NewValue [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalLabel [" + param.OriginalLabel + "](_-+-param.OriginalLabel-+-_) OriginalValue [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			// Memo (Description)
			case 5:
				Log("Memo (description) - NewValue [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalValue [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			// Lookup (single)
			case 6:
				Log("Lookup - NewLabel [" + param.NewLabel + "](_-+-param.NewLabel-+-_) NewGuid [" + param.NewGuid + "[ NewLogicalName [" + param.NewLogicalName + "](_-+-param.NewGuid-+-_[-NewLogicalName-[_-+-param.NewLogicalName-+-_) OriginalLabel [" + param.OriginalLabel + "](_-+-param.OriginalLabel-+-_) OriginalGuid [" + param.OriginalGuid + "](_-+-param.OriginalGuid-+-_) OriginalLogicalName [" + param.OriginalLogicalName + "](_-+-param.OriginalLogicalName-+-_)");
				break;
			// Decimal / Float
			case 7:
				Log("Text - NewValue [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalValue [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			// Currency
			case 8:
				Log("Text - NewValue [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalValue [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			// Date Time Picker
			case 9:
				Log("DateTime - NewDateTime [" + param.NewValue + "](_-+-param.NewValue-+-_) OriginalDateTime [" + param.OriginalValue + "](_-+-param.OriginalValue-+-_)");
				break;
			default:
				break;
		}
		return allow;
	}
	function DCrmEgGridSaving(data, entityinfo) {
		var allow = true;
		Log("ParentEntityName [" + entityinfo.ParentEntityName + "](_-+-entityinfo.ParentEntityName-+-_) ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "](_-+-entityinfo.ParentEntitySchemaname-+-_)");
		var item;
		for (var i = 0; i < data.length; i++) {
			item = data[i](i);
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
						"] Format [" + item.InternalEditorFormat + "](_-+-item.InternalEditorFormat-+-_)");
					// Format: url, email, phone, ...
					break;
					// Checkbox (two option)
				case 3:
					Log("Record Guid [" + item.RecGuid +
						"] ValueToSave [" + item.ValueToSave +
						"] FieldSchemaName [" + item.FieldSchemaName +
						"]  [" + item.CheckAttribute + "](_-+-item.CheckAttribute-+-_)");
					break;
				// OptionSet
				case 4:
					Log("Record Guid [" + item.RecGuid +
						"] OptionSetLabel [" + item.ValueToSave +
						"] FieldSchemaName [" + item.FieldSchemaName +
						"] OptionSetValue [" + item.OptionSetValue + "](_-+-item.OptionSetValue-+-_)");
					break;
				// Lookup (single)
				case 6:
					Log("Record Guid [" + item.RecGuid +
						"] LookupText [" + item.ValueToSave +
						"] FieldSchemaName [" + item.FieldSchemaName +
						"] LookupLogicalName [" + item.LookupLogicalName +
						"] LookupGuid [" + item.LookupId + "](_-+-item.LookupId-+-_)");
					break;
				default:
					break;
			}
		}
		return allow;
	}
	function DCrmEgGridDeleting(data, entityinfo) {
		var allow = true;
		Log("ParentEntityName [" + entityinfo.ParentEntityName + "](_-+-entityinfo.ParentEntityName-+-_) ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "](_-+-entityinfo.ParentEntitySchemaname-+-_)");
		for (var i = 0; i < data.length; i++) {
			Log("Record Guid [" + data[i](_-+-data[i) + "]");
		}
		return allow;
	}
	function DCrmEgGridBeforeCreateNewRecord(newRecStruct, entityinfo) {
		var allow = true;
		Log("ParentEntityName [" + entityinfo.ParentEntityName + "](_-+-entityinfo.ParentEntityName-+-_) ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "](_-+-entityinfo.ParentEntitySchemaname-+-_)");
		Log("New Record Struct", newRecStruct);
		return allow;
	}
	function DCrmEgGridCreateNewRecord(data, entityinfo) {
		Log("ParentEntityName [" + entityinfo.ParentEntityName + "](_-+-entityinfo.ParentEntityName-+-_) ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "](_-+-entityinfo.ParentEntitySchemaname-+-_)");
		Log("Record Guid [" + data.NewRecordGuid + "](_-+-data.NewRecordGuid-+-_)");
	}
	function DCrmEgGridOnload(data, entityinfo) {
		Log("ParentEntityName [" + entityinfo.ParentEntityName + "](_-+-entityinfo.ParentEntityName-+-_) ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "](_-+-entityinfo.ParentEntitySchemaname-+-_)");
		//data.Option.readonly = (data.Option.text == "Web");
		Log("Option set - text [" + data.Option.text + "](_-+-data.Option.text-+-_) value [" + data.Option.value + "](_-+-data.Option.value-+-_) ReadOnly [" + data.Option.readonly + "](_-+-data.Option.readonly-+-_)");
	}
	function DCrmEgGridRowOnload(rowData, entityinfo) {
		Log("ParentEntityName [" + entityinfo.ParentEntityName + "](_-+-entityinfo.ParentEntityName-+-_) ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "](_-+-entityinfo.ParentEntitySchemaname-+-_)");
		Log("Record Guid [" + rowData.RecordGuid + "](_-+-rowData.RecordGuid-+-_)");
		if (rowData.InlineCreate) {
			Log("Create inline record is used. One row is being added.");
		}
		var CrmFieldTypes = {
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
		};
		for (var i = 0; i < rowData.Fields.length; i++) {
			var field = rowData.Fields[i](i);
			Log("Field schema name [" + field.SchemaName + "](_-+-field.SchemaName-+-_) field.FieldType [" + field.FieldType + "](_-+-field.FieldType-+-_)");
			switch (field.FieldType) {
				case CrmFieldTypes.TextType:
				case CrmFieldTypes.MemoType:
					Log("Field ["
						+ field.Value + "] Format ["
						+ field.Format + "]");
					break;
				case CrmFieldTypes.LookupType:
				case CrmFieldTypes.CustomerType:
				case CrmFieldTypes.OwnerType:
					Log("Field Lookup Guid ["
						+ field.LookupGuid + "] Lookup LogicalName ["
						+ field.LookupLogicalName + "] Lookup Name ["
						+ field.LookupName + "] Value ["
						+ field.Value + "]");
					break;
				case CrmFieldTypes.IntegerType:
				case CrmFieldTypes.DoubleType:
				case CrmFieldTypes.DecimalType:
				case CrmFieldTypes.MoneyType:
					Log("Field FormattedValue ["
						+ field.FormattedValue + "] Value ["
						+ field.Value + "]");
					break;
				case CrmFieldTypes.DateTimeType:
					Log("Field FormattedValue ["
						+ field.FormattedValue + "]");
					field.ReadOnly = true;
					// Optional, set field (cell) background and forground colors
					field.BackgroundColor = 'lightyellow';
					field.ForgroundColor = 'black';
					break;
				case CrmFieldTypes.OptionSetType:
				case CrmFieldTypes.BooleanType:
					Log("Field FormattedValue ["
						+ field.FormattedValue + "] Value [" + field.Value + "](_-+-field.Value-+-_)");
					field.ReadOnly = true;
					field.BackgroundColor = '#CCCCCC';
					field.ForgroundColor = 'blue';
					break;
				case CrmFieldTypes.State:
				case CrmFieldTypes.Status:
					Log("Field FormattedValue ["
						+ field.FormattedValue + "] Value [" + field.Value + "](_-+-field.Value-+-_)");
				default:
					break;
			}
		}
	}
	function DCrmEgGridOnBeforeFetchRecords(entityinfo) {
		var additions = null;
		Log("DCrmEgGridOnBeforeFetchRecords - ParentEntityName [" + entityinfo.ParentEntityLabel + "](_-+-entityinfo.ParentEntityLabel-+-_) ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaName + "](_-+-entityinfo.ParentEntitySchemaName-+-_)");
		//// Add additional conditions
		//if (entityinfo.ParentEntitySchemaName == 'account') {
			//additions = {};
			//// Example for a sinle value condition
			//additional.Condition = '<condition attribute="primarycontactid" operator="eq" value="{76E339A4-1528-E611-80DD-08002738AA19}" />';
			//// Example for multi value condition
			//additions.Condition = '<condition attribute="primarycontactid" operator="in">' +
			//    '<value>{64E339A4-1528-E611-80DD-08002738AA19}</value>' +
			//    '<value>{76E339A4-1528-E611-80DD-08002738AA19}</value>' +
			//'</condition>';
			//// Example for a link entity
			//additions.LinkEntity = '<link-entity name="incident" from="customerid" to="accountid" alias="aa">' +
			//  '<filter type="and">' +
			//    '<condition attribute="primarycontactidname" operator="like" value="fjghg%" />' +
			//  '</filter>' +
			//'</link-entity>';
		//}
		return additions;
	}
