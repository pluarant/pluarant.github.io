---
title: Mesibo Real-time APIs - Initialization
description: Mesibo Real-time APIs - Initialization
keywords: mesibo, real-time api, messaging API, chat API, voice SDK, video SDK
---
{% include_relative nav.html selected="init" %}

You need to call one or more initialization APIs before using any other mesibo APIs. Following are the various `Initialization` APIs.

### init
This API is for **Android** only.  

This is the first API function you must call before you use any other mesibo API.

It takes the following parameters:

 - **context**, Application Context

## setPath [Optional]
Path where all the databases and other files will be stored. This API is optional. The default Path will be used if this API is not called.

It takes the following parameters:
 
  - **path**, a valid file system path


### setAccessToken
Set the access token for the user. 

It takes the following parameters:
 
  - **token**, User Access Token Obtained using [Backend API - Add User Operation](/documentation/api/backend-api/) 

### setDatabase [Optional]
Enable local database to store all the incoming &amp; outgoing messages and other information. If this API is not called, Mesibo will not use any local database to store messages. 

It is recommended to call 'setDatabase' after setting user access token using `setAccessToken` API. It ensures a unique local database for each user. If `setDatabase` is called before `setAccessToken` API function, the same local database will be used for all the users. 

It takes the following parameters:
 
  - **DBName**, Name, or the complete path of the database. If path is not specified, the database will be stored in the default path or the path set by setPath API.
  - **resetTables**, reset existing tables


### addListener
Mesibo invokes [**Listeners**](/documentation/api/real-time-api/listeners/) for various events. For example, when you receive a message, receive an incoming call, etc. You can implement these listeners to get real-time event notifications. Refer to [Listeners](/documentation/api/real-time-api/listeners/) section for more details on listeners.

You can add a listener using 'addListener' API.  You can add multiple listeners if requires. 

It takes the following parameters:
 
  - **listner**, listener object

### removeListener [Optional]
Remove a listener previously added using `addListner` API.                           

It takes the following parameters:
 
  - **listner**, listener object

### setSecureConnection [Optional]
Enable encrypted connection. Encryption is enabled by default. This is an optional API. However, if invoked, should be invoked before the `start' API. 

It takes the following parameters:
 
  - **enable**, enable or disable encryption

### start 
Start Mesibo. Mesibo will start connection establishment with Mesibo cloud servers OR your on-premise Mesibo server. Note that, **Mesibo will not establish network connection till the `start` is called**. However, once the `start` is called, Mesibo will automatically manage any future reconnections till stop() is called

It does not take any parameters.

### stop
Disconnect any existing connection and also prevent future reconnections.|Void|                           

It does not take any parameters.

## Initialization APIs Example 
Below is an example of using initialization APIs.

### Android Example

```java
	Mesibo api = Mesibo.getInstance();
        api.init(context);

        // set path for storing DB and messaging files
        Mesibo.setPath(Environment.getExternalStorageDirectory().getAbsolutePath());

        // add listener
        Mesibo.addListener(this);

        // set access token
        if(0 != Mesibo.setAccessToken(accessToken) {
            return false;
        }

        // set database after setting access token so that it's associated with the user
        Mesibo.setDatabase("mesibo.db", 0);

        // Now start mesibo
        if(0 != Mesibo.start()) {
            return false;
        }
```

### iOS Example

```objc
    [MesiboInstance setPath:appdir];

    [MesiboInstance addListener:self];

    [MesiboInstance setAccessToken:accessToken];
    [MesiboInstance setDatabase:@"mesibo.db"] ; 

    [MesiboInstance start];
```

[Messaging APIs >>](messaging.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
