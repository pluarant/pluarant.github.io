var strings = new Object();

/*My Application View*/
strings.createfirstapp = "You have not created your App yet.";
strings.myapplication = "Application is a logical entity to partition your users and groups. All your users and groups are local and confined to an Application.";

/*Analytics View*/ /*App Settings: Stats View*/
strings.nostatstext = "Not enough data to show stats.";
strings.noappusage = "No App usage data";

/*User Account View*/
strings.myplan = "*Assume reasonable/normal usage.";

/*App Settings: General View*/
strings.general = "Edit basic application settings.";

/*App Settings: Push Notification View*/
strings.pushnotification = "Mesibo will send a push notification to offline users when a message or a call received for them. Enter your FCM credentials for Android and APN production push certificate for iOS and Mesibo will take care of the rest. You MUST register client push token using Mesibo setPushtoken() API.";
strings.push_fcm = "Enter your FCM credentials";
strings.push_apn = "Upload production Push/VoIP certificate in .p12 format from your Apple Developer Account (without password)";

strings.onpremise = "Deploy entire Mesibo solution on your own premise or data center. All the messages and calls will route through your own servers and will be saved in your own database.";
strings.onpremisewarning = "DO NOT enable On-Premise unless you have read the documentation, hosted Mesibo on your own premise and you can see your hostname correctly in the 'Running Status' field below. As soon as you turn ON the on-premise switch, mesibo cloud will stop serving your users and they will be redirected to your own data center. If Mesibo on-premise server is not running on your data-center, your users will not be able to connect.";
strings.onpconfig = "Configure Mesibo on-premse server. The Mesibo on-premise server will fetch these configurations and automatically configure itself. We do not need to access your database and hence you can keep it behind firewall. However, ensure that your database is accessible to Mesibo on-premise server.";

/*App Settings: Webhook View*/
strings.webhook = "A WebHook is an HTTP/HTTPS URL callback. mesibo invokes it with data in real-time when something happens; for example, if a message was undelivered. A potential use of webhook could be to further send push notifications to users using say GCM or APN. Refer documentation for more details.";
strings.webhookuserstatustext = 'Notify when users come online or goes offline';
strings.webhookusermessagestext = 'Notify about new messages';
strings.webhookusermessagestatustext = 'Notify about message status';

/*App Settings: Users View*/
strings.users = "Users are the endpoint who will send or receive messages. You can manage all your application users here. However, the mesibo server-side API is the best way to manage users programmatically. Refer documentation for more details.";
strings.nousers = "No Users. Create a new user by clicking 'New User' button.";

/*App Settings: Groups View*/
strings.groups = "Group is a set of users. You can manage all your application groups here. However, the mesibo server-side API is the best way to manage groups programmatically. Refer documentation for more details.";
strings.nogroups = "No Groups. Create a new group by clicking 'New Group' button.";

/*App Settings: Edit Groups View*/
strings.groupexpirytext = 'Group expiry (in seconds)';
strings.groupautoextendexpirytext = 'Auto extend group expiry on activity (in seconds)';
strings.groupmemberstext = 'Note: use API to access all the members';





