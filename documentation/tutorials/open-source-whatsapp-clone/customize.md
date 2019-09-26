---
description: Customize Open Source Android and iOS Messenger
keywords: open, source, whatsapp, mesibo, ios, overview
title: Customize Android and iOS Messenger
---
{% include_relative nav.html selected="customize" %}

In this part, we will customize the Android and iOS messenger apps we just built. 

Let's get started.

## What can be customized? 
Everything! that's true! You can customize each and everything in these apps to suit your requirements and branding. Not only you can customize the look and feel of the app but even how each and every message is rendered (covered in our upcoming chatbot tutorial). 

However, we will not cover all the customizations in this tutorial. Instead, we will focus on a few very important ones as follow.

 - Account Kit to send your own branded verification SMS 
 - Geolocation support by configuring Google Maps and Google Places API key
 - Files/Media handler to store files on your own server(s)/cloud
 - Welcome screen and other miscellaneous customizations

## Customizations
### Facebook Account Kit
The first screen you see in the Mesibo Messenger right after the welcome screen is the login screen. This is the screen which allows the user to enter their phone number and then verifies it by sending an OTP over an SMS or a call. 

![]({{ '/images/app/ios/mesibo_account_kit_ios.jpg' | relative_url }} )

The phone verification is usually an expensive process, as it requires sending SMS or making calls to verify phone number, often international numbers. However, thanks to the Facebook Account Kit, this entire process is automated and made available free (well, almost).  Account Kit lets your quickly register for and log in to your app by using just their phone number or email address — no password needed. It's reliable, easy to use and gives you a choice about how you sign up for apps - by using the phone, email or optionally, your Facebook account.

> Facebook has recently discontinued Account Kit. The existing accounts will work till March 9, 2019. However, for the new installations, you need to have your own verification method.

To use Account Kit, you need to create an App and generate an Account Kit client token. The entire process takes less than 5 minutes. 

 1. Go to [Facebook App Page](https://developers.facebook.com/apps/)
 2. If you have an existing app, click on it. Otherwise, click on `Add A New App` to create a new app and go to its settings.
 3. On the left side navigation, you will see `PRODUCTS`. If you don't see `Account Kit` there, click on `+` icon and add 'Account Kit'.
 4. Now you shall see `Account Kit` under `PRODUCTS`. Click on `Settings` under `Account Kit` menu. 
 5. Make a note of `APP ID` and `Account Kit Client Token`

![]({{'/images/tuts/accountkit.jpg' | relative_url }}){: style="margin-top: 30px; margin-bottom: 10px"}

> Although Mesibo Messenger shipped with its own Account Kit token, we usually keep changing this token and hence you MUST get your own token as described above. 

Once you get your own APP ID and Client token, edit following files in Mesibo Messenger source and change the value

 - For Android, edit `app/src/main/res/values/strings.xml` file and enter your APP ID and Client token in `FACEBOOK_APP_ID` and `ACCOUNT_KIT_CLIENT_TOKEN` fields respectively.
 - For iOS, click on `Info.plist` and enter your APP ID and Client token in `FacebookAppID` and `AccountKitClientToken` fields respectively. You also need to edit `CFBundleURLSchemes` field to reflect your Facebook APP ID after prefixing with 'fb'. 

### Geolocation - Google Maps and Google Places 
Mesibo Messenger allows you to select and send the location to your friends and family. Mesibo Messenger uses Google Maps and Google Places SDK for this functionality. Hence, you must add Google Maps and Google Places API Key into the project for it to work. 

For instructions to get API key and configure it, visit
 - For Android, https://developers.google.com/maps/documentation/android-sdk/signup 
 - For iOS, https://developers.google.com/maps/documentation/ios-sdk/get-api-key

### Media/File Storage
Just like text messages, mesibo allows you to send and receive any arbitrary file (image, video, doc, etc) in real-time. Sending and receiving file is no different from sending and receiving text messages. All an application has to do is to first upload the file to a server and then send the URL and thumbnail [optional] using mesibo in real-time. The receiver then downloads it using that URL. This out-of-band mechanism ensures that no real-time messages are blocked waiting for a large file to be uploaded or downloaded.

Mesibo Messenger offers you the flexibility to store all files on your own servers including private servers or cloud services like Amazon Web Services, Google Cloud Storage, Microsoft Azure, etc. All you have to do is to configure the upload and download URL. 

> Mesibo Messenger source code has been configured with upload and download URLs that only stores your files for a few hours. Also, the quota is limited for demo purpose. Hence, you must provide your own upload and download URLs.


## Conclusion of part four

In this part, we have learn about customizing Mesibo Messenger. So far, you have used the backend which we already hosted for you so that you can quickly play with the apps. In the next part, we will learn about hosting the backend on your infastructure. 


[On to Part 5 >>](backend.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
