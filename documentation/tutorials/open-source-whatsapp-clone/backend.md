---
description: Backend for Open Source Android and iOS Messenger
keywords: open, source, whatsapp, mesibo, ios, backend
title: Backend for Open Source Android and iOS Messenger
---
{% include_relative nav.html selected="backend" %}

Previously, you have used the backend which is already hosted by Mesibo so that you can quickly play with the apps. In this and the next part, we will learn about hosting the entire backend on your infrastructure.

There are two types of backends you may host:
 1. Backend APIs for administrative tasks. You apps communicate with your backend API for administrative functions like login, contact synchronization, getting profile and group information, etc.
 2. Real-time Mesibo server which handles real-time messaging, voice and video calls.

In this part, we will describe how to host backend API on your infrastructure. You apps communicate with your backend API for administrative functions like login. For example, when a new user signs-up up with your services, your app will communicate with your backend API for the login and verification. Your backend verifies the new sign-in (say, using username/password, or OTP, etc.). If successful, it saves the user in a database and then registers this user with Mesibo. Mesibo returns a token for this use which you can give it to your app so that your app can communicate in real-time.

![How mesibo works](/documentation/get-started/images/conceptual-arch-small.png)

Refer, [Getting Started](/documentation/get-started/) guide for for more details. 

## Prerequisites
Before we dive into setting up the backend for the Messenger apps, please ensure that the following servers are running.

- A web server with HTTPS and PHP support. Depending on the web server (apache / h2o/ Lighttpd/ Nginx) you are using, the setup varies. In the subsequent examples, we will assume that your hostname is `example.com` and the backend code which you will download soon is accessible via URL `https://example.com/api.php`

- MySQL server

- Mesibo API Key and the App token. Refer to [First Mesibo App](/documentation/tutorials/first-app/) tutorial to learn about how to get API key and App token. 

We will also need Facebook Account Kit and Google Maps keys which we registered in the [previous part](/documentation/tutorials/open-source-whatsapp-clone/customize/).

## Downloading the Backend Source Code
The latest code for the backend is always updated and pushed on [messenger-app-backend repository](https://github.com/mesibo/messenger-app-backend){:target="_blank"}.

There are multiple ways of "downloading" code from GitHub.

### Clone the Repository (Recommended)
If you have git installed, this is a recommended approach as you can quickly sync and stay up to date with the latest version. This is also a preferred way of downloading the code if you decide to contribute to the project. 

To download, open a terminal and issue following commands:

    $ git clone https://github.com/mesibo/messenger-app-backend.git

### Download the code as a zip file
You can also download the full backend source code as a zip file. Although simple, the downside of this approach is that you will have to download the full source code every time it is updated on the repository. 

Click on the `Download` button to start downloading.

[Download](https://github.com/mesibo/messenger-app-backend/archive/master.zip){: target="_blank class="button outline-btn" style="margin-bottom: 10px; margin-right: 100%"}

Once the download completes, unzip into a folder. 

### Stay Up-to-date
Whatever approach you take to download the code, it is important to stay up-to-date with the latest changes, new features, fixes etc. Ensure to **Star(*)** the project on GitHub to get notified whenever the source code is updated. 

<a class="github-button" href="https://github.com/mesibo/messenger-app-backend" target="_blank" data-icon="octicon-star" data-size="large" aria-label="Star mesibo/messenger-app-backend on GitHub">Star</a>

## Setting up the Database
You will need to set up a database so that backend can store various information:

- Users phone number and login token
- Groups, group members, and group admins
- Users contacts for contact synchronizations.
- Google and Apple push notification tokens

The backend uses MySQL as the database. We will not go into details of setting up MySQL server; there are plenty of tutorials on the web if you are not familiar. Once you’ve set up the MySQL server, create a database and the credentials. These credentials will be needed by the backend code to access the database.

The next step is to create the database schema using the supplied SQL file `mysql-schema.sql`. Run following to create the database schema for the backend.

    $ mysql -h <host> -u <username> -p <password> <dbname> < mysql-schema.sql

## Push Notifications
The last set of information you need is to enable push notification for Android and iOS. You will need the following credentials:

 - Google FCM/GCM Key for Android Push notification.
 - Apple VoIP Certificate and passphrase.

Refer to Google FCM and Apple push notification document to get above credentials. Once you get them, you need to configure Push Notification credentials in Mesibo Console by clicking on your App and then in  `Push Notifications` tab.

## Configuring the Backend
We now have all the information to configure and go live with backend on your own servers.

Open `config.php` in the backend code and enter all the information we have obtained above, namely:

 - MySQL host, database name, username, and password
 - Facebook Account Kit AppID, and Secret
 - Google Maps key
 - Mesibo API Key, and App Token

You will also need to set `files_path` and `files_tn_path` to valid paths on your server where backend will store the profile pictures.

That’s it! We are now ready to test the backend!

## Testing the backend
It’s time now to test the backend. Open `https://example.com/api.php` in your browser. It should output

    { "code": "NOOP", "result": "FAIL" }

Above output indicates that the backend appears to be set up correctly. You can further test by opening api.php with some parameters. For example,

     https://example.com/api.php?op=login&aktoken=test&appid=com.mesibo.mesiboapplication

this should output like the following

     { "op": "login", "ts": 1555861088, "error": "BADAKTOKEN", "result": "FAIL" }

Looks fine! The next step is to update the Android and iOS Apps you have built in previous parts with the new backend.

## Configure Apps to use the new backend
Edit the following files in the Messenger apps to use the new backend.

### Android
 - Edit `app/src/main/res/values/strings.xml` and enter your Account Kit APP ID and Client token in `FACEBOOK_APP_ID` and `ACCOUNT_KIT_CLIENT_TOKEN` fields respectively.
 - In the same file, enter Google map key in the `GOOGLE_MAP_KEY` field.
 - Edit `SampleApi.java` and change `mApiUrl` to reflect the new backend URL.

### iOS
 - Click on Info.plist and enter your APP ID and Client token in `FacebookAppID` and `AccountKitClientToken` fields respectively. You also need to edit `CFBundleURLSchemes` field to reflect your Facebook APP ID after prefixing with fb.
 - In the same file, enter Google map key in the `GoogleMapKey` field.
 - In the same file, enter new backend URL in the `MessengerApiUrl` field.

That’s it. Recompile both the apps and start using it!

You can now see any new user and group you create in the Mesibo console along with statistics.

## Conclusion of part five

In this part, we have learnt about hosting backend API on your own infrastructure. In the next part, we will learn about how to host Mesibo real-time server on your own premise. 


[On to Part 6 >>](on-premise.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
