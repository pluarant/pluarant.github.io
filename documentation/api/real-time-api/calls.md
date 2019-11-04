---
title: Voice and Video Call APIs | Real-Time Chat APIs
title: Mesibo Real-time APIs - Voice and Video Calls
description: It’s simple to add voice and video calls facility in your Android and iOS app using mesibo real-time Voice and Video chat APIs.
keywords: video call api, voice call api, call api for android, video call api iOS, voice chat api for android, video chat api, best video api
---
{% include_relative nav.html selected="calls" %}

Making and receiving voice &amp; video calls with Mesibo is simple. You only need to initialize MesiboCall module, and you will be ready to make and receive calls using Mesibo. You can then invoke `Call` API to make voice and video calls as needed. 

### Runtime Permissions 
When you make or receive calls with Mesibo, it asks you to grant a few permissions which are required to place the call. 

> You need to give access to these permissions as the call functionality will not work without these permissions.

#### Record Audio 
This permission is required to access the microphone and record your voice.

#### Record Video
This permission is required to access the camera to make video calls.

Following are the `Call` APIs.

### init
Initialize Mesibo Call Sub-system. You must initialize before you use any other Mesibo Call APIs.

It takes the following parameters:

  - **context**, Application Context

## call
Make a voice or video call. 

It takes the following parameters:
 
  - **context**, Application Context
  - **Call-ID**, a unique ID (similar to Message-ID), can be generated using `Mesibo random API`
  - **profile**, `UserProfile` object of the user to whom you are making a call
  - **IsVideoCall**, `true` if placing a video call, `false` otherwise


```java
Mesibo.UserProfile userProfile = new Mesibo.UserProfile();
userProfile.name = "User name";
userProfile.address = "User address";
	
// Place an audio call
MesiboCall.getInstance().call(MainActivity.this, Mesibo.random(), userProfile, false);

```

[User &amp; Group Profiles APIs >>](profiles.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%; width: 300px;"}
