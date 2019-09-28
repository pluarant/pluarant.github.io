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

strings.onpremise = "Deploy entire Mesibo platform on your own premise or data center. All the messages and calls will route through your own servers and will be saved in your own database.";
strings.onpremisewarning = "DO NOT enable On-Premise before hosting and running Mesibo on your premise. Read On-Premise documentation for details. You should also see your configured hostname correctly in the 'Running Status' field below. Note that, as soon as you turn ON the On-Premise switch, mesibo cloud will stop serving your users and redirect them to your dedicated On-Premise server. Hence, if Mesibo On-Premise server is not running on your data-center, your users will not be able to connect.";
strings.onpconfig = "Configure Mesibo On-Premise server. The Mesibo On-Premise server will fetch these configurations and automatically configure itself. We do not need to access your database, and hence, you may keep it behind the firewall. However, ensure that your database is accessible to Mesibo on-premise server. Refer On-Premise documentation for more details.";

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





