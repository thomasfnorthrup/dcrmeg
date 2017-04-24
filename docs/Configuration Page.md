<h2>General</h2>
<p><img src="https://github.com/mehrgithub/dcrmeg/raw/master/docs/Configuration_ConfigurationSect1.png" /><br>
<br>
<span style="color:red; font-size:14px">1</span> Select entity where the grid is to be placed. Example Account.<br>
<span style="color:red; font-size:14px">2</span> Select entity to display data from. Example Contact.<br>
<span style="color:red; font-size:14px">3</span> Adds the selected entity (2) to the list of selected entities to display data from (7).<br>
<span style="color:red; font-size:14px">4</span> This is the Guid of this configuration. This value is used during the grid setup when attempting to display multiple grids on the same form but in different sections.<br>
<span style="color:red; font-size:14px">5</span> Allows selection of fields to be displayed on the grid.<br>
<br>
By default, all the fields for the entity are displayed. Changing &quot;All Fields&quot; drop down option to other options such as &quot;Fields on the form&quot; will display a subset of all the fields for the entity.<br>
<br>
The text box to the right of the fields' display drop down can be used for searching for a field rather than scrolling.</p>
<p><span style="color:red; font-size:14px">6</span> Allows setting of field conditions to display a subset of data. Please see
<a href="https://github.com/mehrgithub/dcrmeg/blob/master/docs/Field%20Conditions.md">Field Conditions</a><br>
<span style="color:red; font-size:14px">7</span>&nbsp;Selected&nbsp;entities to display data from. Added using '&#43;' button (3).&nbsp;Please see:&nbsp;<a href="https://github.com/mehrgithub/dcrmeg/blob/master/docs/Toolbar.md">Toolbar</a><br>
<span style="color:red; font-size:14px">8</span> Controls display of clear filter toolbar button<br>
<span style="color:red; font-size:14px">9</span> Controls display of filter icon (inline filtering) on the grid headers.<br>
<span style="color:red; font-size:14px">10</span> Controls display of export (Excel, CSV, PDF) toolbar button<br>
<span style="color:red; font-size:14px">11</span> Controls display of Set Record Status context menu<br>
<span style="color:red; font-size:14px">12</span> Controls display of clone selected record<br>
<span style="color:red; font-size:14px">13</span> Controls display of clone record context menu<br>
<span style="color:red; font-size:14px">14</span> Controls Open record icon behaviour. New window, Same window<br>
<span style="color:red; font-size:14px">15</span> If a selected entity has a many to one relationship with the entity hosting the grid, you will be presented with the option to use this relationship to display only related records or all records.<br>
<span style="color:red; font-size:14px">16</span> Displays available relationships to select<br>
<span style="color:red; font-size:14px">17</span> Displays selected relationship<br>
<span style="color:red; font-size:14px">18</span> Controls how changes to the grid data is handled. Checked, will save changes automatically. If unchecked, user will need to use the grid save toolbar button to save the changes.
<br>
<span style="color:red; font-size:14px">19</span> Controls display of Auto Save toolbar button<br>
<span style="color:red; font-size:14px">20</span> Controls whether the user is allowed to create new records. If unchecked, the '&#43;' toolbar button will be hidden<br>
<span style="color:red; font-size:14px">21</span> Controls whether the user is allowed to delete a record<br>
<span style="color:red; font-size:14px">22</span> Controls whether to refresh the grid after creating a new inline record.<br>
<span style="color:red; font-size:14px">23</span> Controls whether to refresh the grid after saving changes.<br>
<span style="color:red; font-size:14px">24</span> Controls display of Aggregate icon on the grid footer for numeric fields</p>
<p><br>
<img src="https://github.com/mehrgithub/dcrmeg/raw/master/docs/Configuration_aggregates.PNG" /><br>
<span style="color:red; font-size:14px">25</span> Controls the behaviour of (&#43;) new record toolbar button. Display menu (inline, window)<br>
<span style="color:red; font-size:14px">26</span> Controls how Boolean (two option) editor changes the value. One click or display editor</p>
<p><br>
<img src="https://github.com/mehrgithub/dcrmeg/raw/master/docs/Configuration_twoption1.PNG" />
<img src="https://github.com/mehrgithub/dcrmeg/raw/master/docs/Configuration_twoption2.PNG" /></p>
<p><br>
<span style="color:red; font-size:14px">27</span> Controls the initial number of records per page to display. If the number of records exceed five, navigation icons are displays.<br>
<span style="color:red; font-size:14px">28</span> Sets the grid title. By default, the name of selected entity is used.<br>
<span style="color:red; font-size:14px">29</span> <strong>Experimental</strong>. Controls display a text field on the grid toolbar. This allows a user to copy and paste Excell cells into the text field. After pasting, pressing the Enter key, will cause the
 grid to attempt to create new records based on the pasted Excel rows.</p>
<p><br>
<strong>Important</strong>:<br>
Number and order of the cells must match the number of fields and their order Grid Fields.</p>
<table width="599" style="height:78px">
<tbody>
<tr>
<td colspan="8">Grid Fields</td>
</tr>
<tr>
<td>Name</td>
<td>Price</td>
<td>Birthdate</td>
<td>Description</td>
<td>Revenue</td>
<td>FieldA</td>
<td>FieldB</td>
<td>FieldC</td>
</tr>
<tr>
<td colspan="8">Excel Cells</td>
</tr>
<tr>
<td>John</td>
<td>5.6</td>
<td>6/23/2016</td>
<td>(empty cell)</td>
<td>3405.25</td>
<td>(empty cell)</td>
<td>(empty cell)</td>
<td>(empty cell)</td>
</tr>
</tbody>
</table>
<p>Ensue that decimal, float, and money types use <strong>&quot;.&quot;</strong> character as decimal separator</p>
<p>We use parseInt and parseFloat to parse the numbers<br>
55,55 =&gt; would return 55<br>
55.55 =&gt; would return 55.55<br>
<br>
<strong>Limitations:</strong><br>
This functionality works only with the following data types.<br>
Text, Description, Date, Datetime, Integer, Decimal, Float, and Money</p>
<p>Optionset, Boolean, and Lookup fields require further modifications to the CreateInlineRecord logic. Blame IE for not following Clipboard standards.</p>
<h2>Selected Fields</h2>
<p>
<img src="https://github.com/mehrgithub/dcrmeg/raw/master/docs/Configuration_ConfigurationSect2.png" /><br>
<br>
<span style="color:red; font-size:14px">1</span> Displays selected xxxxx (entity) fields and various options that can be set.<br>
<span style="color:red; font-size:14px">2</span> Allows to set up to two fields to be used for initial sorting<br>
<img src="https://github.com/mehrgithub/dcrmeg/raw/master/docs/Configuration_configureSorting.PNG" /><br>
<span style="color:red; font-size:14px">3</span> Controls whether the field is read-only<br>
<span style="color:red; font-size:14px">4</span> Controls the width of the grid header in pixels (example: 120). Default 0, the grid auto calculates the width.<br>
<span style="color:red; font-size:14px">5</span> Values set in these fields is used during the creation of inline records to set the initial value of the field in the new record.<br>
<span style="color:red; font-size:14px">6</span> Allows setting of the grid header colors and CSS<br>
<span style="color:red; font-size:14px">7</span> Allows setting of the grid cells colors and CSS based on a given condition<br>
<span style="color:red; font-size:14px">8</span> Removes the field from selected fields<br>
<span style="color:red; font-size:14px">9</span> Allows setting of a default view for lookups when &quot;Lookup more records&quot; menu is used. If a look up is of type Customer, you will be presented with a list of both Account and Contacts system views to choose from<br>
<span style="color:red; font-size:14px">10</span> Color picker to set the backgound color of a header/cell<br>
<span style="color:red; font-size:14px">11</span> Color picker to set the foreground color of a header/cell<br>
<span style="color:red; font-size:14px">12</span> Allows addition of custom CSS to effect display of a header/cell. Example: font-size:16px;font-weight:bold<br>
<span style="color:red; font-size:14px">13</span> Saves changes and updates the Color and format preview (17)<br>
<span style="color:red; font-size:14px">14</span> Resets the color, CSS, and condition values to default<br>
<span style="color:red; font-size:14px">15</span> Allows to set a condition operator.<br>
<span style="color:red; font-size:14px">16</span> Depending of the field type, you will be able to use this field to set a condition. For textual and numeric fields, a text field is displayed, etc<br>
<span style="color:red; font-size:14px">17</span> Displays a preview of set colors and formatting<br>
<span style="color:red; font-size:14px">18</span> Allows to set the background color of even grid rows (row index 0, 2, ...)<br>
<span style="color:red; font-size:14px">19</span> Allows to set the background color of odd grid rows (row index 1, 2, ...)</p>
