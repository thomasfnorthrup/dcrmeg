using CrmEnabledWPFWindowsClient1.LoginWindow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace CrmEnabledWPFWindowsClient1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Button to login to CRM and create a CrmService Client 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            #region Login Control
            // Establish the Login control
            CrmLogin ctrl = new CrmLogin();
            // Wire Event to login response. 
            ctrl.ConnectionToCrmCompleted += ctrl_ConnectionToCrmCompleted;
            // Show the dialog. 
            ctrl.ShowDialog();

            // Handel return. 
            if (ctrl.CrmConnectionMgr != null && ctrl.CrmConnectionMgr.CrmSvc != null && ctrl.CrmConnectionMgr.CrmSvc.IsReady)
                MessageBox.Show("Good Connect");
            else
                MessageBox.Show("BadConnect");

            #endregion

            #region CRMServiceClient
            if (ctrl.CrmConnectionMgr != null && ctrl.CrmConnectionMgr.CrmSvc != null && ctrl.CrmConnectionMgr.CrmSvc.IsReady)
            {
                //                CrmServiceClient svcClient = ctrl.CrmConnectionMgr.CrmSvc;
                //                if (svcClient.IsReady)
                //                {
                //                    // Get data from CRM . 
                //                    string FetchXML =
                //                        @"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                //                        <entity name='account'>
                //                            <attribute name='name' />
                //                            <attribute name='primarycontactid' />
                //                            <attribute name='telephone1' />
                //                            <attribute name='accountid' />
                //                            <order attribute='name' descending='false' />
                //                          </entity>
                //                        </fetch>";

                //                    var Result = svcClient.GetEntityDataByFetchSearchEC(FetchXML);
                //                    if (Result != null)
                //                    {
                //                        MessageBox.Show(string.Format("Found {0} records\nFirst Record name is {1}", Result.Entities.Count, Result.Entities.FirstOrDefault().GetAttributeValue<string>("name")));
                //                    }


                //                    // Core API using SDK OOTB 
                //                    CreateRequest req = new CreateRequest();
                //                    Entity accENt = new Entity("account");
                //                    accENt.Attributes.Add("name", "TESTFOO");
                //                    req.Target = accENt;
                //                    CreateResponse res = (CreateResponse)svcClient.OrganizationServiceProxy.Execute(req);
                //                    //CreateResponse res = (CreateResponse)svcClient.ExecuteCrmOrganizationRequest(req, "MyAccountCreate");
                //                    MessageBox.Show(res.id.ToString());



                //                    // Using Xrm.Tooling helpers. 
                //                    Dictionary<string, CrmDataTypeWrapper> newFields = new Dictionary<string, CrmDataTypeWrapper>();
                //                    // Create a new Record. - Account 
                //                    newFields.Add("name", new CrmDataTypeWrapper("CrudTestAccount", CrmFieldType.String));
                //                    Guid guAcctId = svcClient.CreateNewRecord("account", newFields);

                //                    MessageBox.Show(string.Format("New Record Created {0}", guAcctId));
                //}
            }
            #endregion


        }

        /// <summary>
        /// Raised when the login form process is completed.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ctrl_ConnectionToCrmCompleted(object sender, EventArgs e)
        {
            if (sender is CrmLogin)
            {
                this.Dispatcher.Invoke(() =>
                {
                    ((CrmLogin)sender).Close();
                });
            }
        }

    }
}
