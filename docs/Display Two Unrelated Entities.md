## Display Two Unrelated Entities

**Create a new "D CRM EG Configuration"**

**Select an entity to display the grid on. Example Case**

![](Display%20Two%20Unrelated%20Entities_config1copy.png)

**Select and two entites to the list of entities to be displayed. Example Account and Contact**

![](Display%20Two%20Unrelated%20Entities_config2copy.png)

![](Display%20Two%20Unrelated%20Entities_config10copy.png)

**Select fields for Account and Contact**

![](Display%20Two%20Unrelated%20Entities_configuration.PNG)

**Save and close the new configuration**

## Setting up the web resource

**Open any "Case" record. Find and click "Form Editor" menu item.**

![](Display%20Two%20Unrelated%20Entities_case1copy.png)

**In the form editor, add a new "One Column Tab" to the form.**

![](Display%20Two%20Unrelated%20Entities_case2copy.png)

**Open up the new tab's properties (DbClick or use properties tool-bar button). Uncheck "Show the label for this tab on the form" check box. Click OK button.**

![](Display%20Two%20Unrelated%20Entities_case3copy.png)

**Add a new web resource to the tab.**

![](Display%20Two%20Unrelated%20Entities_case4copy.png)

**For the web resource, enter "dcrmeg_dcrmeghtml". Enter a name for the web resource.**

![](Display%20Two%20Unrelated%20Entities_case5copy.png)

**Click on the "Formatting" tab of the new Add Web Resource window.**

![](Display%20Two%20Unrelated%20Entities_case7copy.png)

**Set the "Number of rows" to 22. Uncheck "Display border". Click OK.**

![](Display%20Two%20Unrelated%20Entities_case8copy.png)

**Save and publish the changes to the case form.**

**Refresh the case record. You should see two grids displaying selected fields from the "Account" and "Contact" entities.**

