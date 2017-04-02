# Display Entities on Different Sections of the Same Form

## Configuration for the first grid

**Create a new "D CRM EG Configuration"**

**Select an entity to display the grid on. Example Case**

![](Display Entities on Different Sections of the Same Form_config1copy.png)

**Select and two entites to the list of entities to be displayed. Example Account and Contact**

![](Display Entities on Different Sections of the Same Form_config2copy.png)

![](Display Entities on Different Sections of the Same Form_config10copy.png)

**Drag Contact entity and drop it on the Account entity**

**If the drag entity (Contact) has many to one relationship with the dropped entity (Account), you will have the option to display related Contacts or all Contacts.**

![](Display Entities on Different Sections of the Same Form_config12copy.png)

**Select fields for Account and Contact**

![](Display Entities on Different Sections of the Same Form_configuration.png)

**Save the new configuration.**
**Copy the Guid of the new configuration to a a temporary text editor.**

![](Display Entities on Different Sections of the Same Form_guid.PNG)

**Close the new configuration.**

## Configuration for the second grid

**Create a new "D CRM EG Configuration"**
**Select an entity to display the grid on. Case**
**Select Account entity and add it to the list of entities to be displayed.**
**Select fields for the Account entity.**
**Save the new configuration.**
**Copy the Guid of the new configuration to a a temporary text editor.**
**Close the new configuration.**

## Setting up the web resource for Case-Account-Contact and Case-Account D CRM EG Configurations

**Open any "Case" record. Find and click "Form Editor" menu item.**

![](Display Entities on Different Sections of the Same Form_case1copy.PNG)

**In the form editor, add a new "One Column Tab" to the form.**

![](Display Entities on Different Sections of the Same Form_case2copy.PNG)

**Open up the new tab's properties (DbClick or use properties tool-bar button). Uncheck "Show the label for this tab on the form" check box. Click OK button.**

![](Display Entities on Different Sections of the Same Form_case3copy.PNG)

**Add a new web resource to the tab.**

![](Display Entities on Different Sections of the Same Form_case4copy.PNG)

**For the web resource, enter "dcrmeg_dcrmeghtml". Enter a name for the web resource.**

![](Display Entities on Different Sections of the Same Form_case5copy.PNG)

**Paste the GUID for the first configuration to the "Custome Parameters {data}" field**

![](Display Entities on Different Sections of the Same Form_webresourcedataparamcopy.png)

**Click on the "Formatting" tab of the new Add Web Resource window.**

![](Display Entities on Different Sections of the Same Form_case7copy.PNG)

**Set the "Number of rows" to 20. Uncheck "Display border". Click OK.**

![](Display Entities on Different Sections of the Same Form_case8copy.PNG)

## Repeat "Setting up the web resource" for the second configuration

**Save and publish the changes to the case form.**

**Refresh the case record. You should see two grids on different sections of the form.**


