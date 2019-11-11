---
description: Mesibo tutorial for making a chat app for iOS and Android similar to WhatsApp  
keywords: whatsapp clone tutorial, android chat app tutorial, ios chat app tutorial, tutorials for making whatsapp, open source chat app tutorials
heading: Create an Open Source WhatsApp clone app using Mesibo
title: Create an Open Source WhatsApp clone app using Mesibo
---
{% include_relative nav.html selected="prep" %}

This multi-part series will describe the design and implementation of a commercially deployable WhatsApp like app having real-time messaging, voice and video communication. By the end of this article series, you will create fully functional Android and iOS applications which you can even publish on Google and Apple App Store under your own brand name.

For this article series, we have selected WhatsApp as a use case since it’s easy to relate. However, the technology and techniques described in this article series are equally applicable to any domain that requires real-time communication, for example, telemedicine, customer support, social apps, to name a few.

Ready? let's get started. Remember, for all our subsequent discussion, we will refer the app as **Messanger**.

## Messenger Features
Let's quickly learn about some of the key features of both these apps which we are about to build and run. Both these open-source apps are fully functional real-time messaging, voice and video calling apps. Some of the key features are,

- One-on-one messaging and Group chat
- High-quality voice and video calling
- Rich messaging (text, picture, video, audio, other files)
- Encryption 
- Location sharing
- Message status and typing indicators
- Online status (presence) and real-time profile update
- Push notifications

Excited? It won't take much before you build your own Android and iOS app with all these features yourself. But if you can't wait, you can also try them from [Google Play Store](https://play.google.com/store/apps/details?id=com.mesibo.mesiboapplication) OR [Apple AppStore](https://itunes.apple.com/us/app/mesibo-realtime-messaging-voice-video/id1222921751)

<a href="https://itunes.apple.com/us/app/mesibo-realtime-messaging-voice-video/id1222921751"><img src="{{ '/images/iphone-app.png' | relative_url }}" align="left" hspace="20"/></a>
<a href="https://play.google.com/store/apps/details?id=com.mesibo.mesiboapplication"><img src="{{ '/images/android-app.png' | relative_url }}" align="left" hspace="20"/></a>
<br/><br/>
<p>
&nbsp;
</p>

Alright, let's get going!

## Prerequisites
Before we dive into building and running a fully featured Messenger for Android and iOS, ensure that you've read the followings.

- [Get Started Guide]({{ '/documentation/get-started/' | relative_url }}).
- Tutorial on [Writing your First mesibo Enabled Application]({{ '/documentation/tutorials/first-app/' | relative_url }}).

It is expected that you are already familiar with the `Android` or `iOS` app development, and have installed the `Android Studio` OR `Xcode`. Familiarity with GitHub is also recommended but not mandatory. 

> You must run this code on a real device! Hence it is also expected that you have access to Android or iPhone to run this app.

## Introduction
This tutorial is broken into multiple parts. Instead of making you wait till the end to build both the apps, we will quickly build apps first and then dwell into details later. 

- In this part, we will learn about the features and key components of both the apps.
- In the next part, we will download the source code for Android App, build and run it.
- We will then download the source code for iOS App, build and run it.
- In the fourth part, we will learn about customizing both the apps.
- In the fifth and sixth part, we will learn about hosting entire platform on your own-premise.
- Finally, we will discuss contributing and requesting support if you need any help.


## Key App Components & Third Party Libraries

These apps use the following Mesibo SDKs.

- Mesibo Core SDK
- Mesibo Messaging UI Module
- Mesibo Call UI Module

These apps also use the following third-party libraries/services.

- [Facebook AccountKit](https://www.accountkit.com/){:target="_blank"} for the Phone Verification
- [Google Maps](https://developers.google.com/maps/documentation/){:target="_blank"} and [Google Places](https://cloud.google.com/maps-platform/places/){:target="_blank"} SDKs for Geolocation integration 

In a later section, we will discuss how to configure your own API keys for both these services.

## Conclusion of part one

In this part, we have learned a brief about Messenger app features and key components. 

In part 2, we will start building the Android app. 

[On to Part 2 >>](android.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
