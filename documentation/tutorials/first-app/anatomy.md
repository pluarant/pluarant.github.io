---
title: Anatomy of a Mesibo Application
description: Anatomy of a Mesibo Application
keywords: mesibo, android, ios, cpp, c++, python, javascript
---
{% include_relative nav.html selected="anatomy" %}

In the previous section, we learned about basic Mesibo App setup and creating users. In subsequent sections, we will learn about sending real-time messages and making calls on various platforms. However, before we start coding, we will briefly describe the basic structure and setup of a Mesibo based App which is standard across the platform. Mesibo is designed to be a cross-platform API maintaining the same API signature across all the platforms. Hence, once you are familiar with the basic Mesibo API flow, you can use it on any platform that Mesibo supports.

At a high level, there are two components that form any Mesibo Application:

- **Functional Interface** for initializing Mesibo, Sending messages, making calls, etc. Mesibo provides a set of API which you can call on a need basis. Mesibo APIs are thread-safe and can be called from multiple threads.  

- **Callback Interface** for receiving real-time messages, calls, etc. You can pass one or more callback objects to Mesibo to listen to various events, and they will be invoked when a particular event occurs, for example, a message is received, or a message delivered/read, etc.

## Functional Interface (Mesibo API Calls)
Mesibo makes it remarkably simple to send real-time messages from one endpoint to another. Based on the type of data (message) you need to send, there is a wide range of API functions you can use. Additionally, Mesibo provides numerous APIs for other functionalities like storing and retrieving messages in the database, connectivity check, etc.

For example,
to send a text message, call `sendMessage()` with parameters `destination` and the `message` 
to send a file, such as an image you can use `sendFile()`
to read messages from the database, you can use `read()`

## Callback Interface (Mesibo Listeners)
Since your app can receive messages or calls anytime, you instruct Mesibo to let your app know when it happens. You can do it by passing a Callback object to Mesibo. When a particular event occurs, Mesibo will invoke an appropriate callback to let your app know about the event. The event could be:

- a message was received
- a message was sent
- a message was delivered
- a message was read
- a call received
- your app is online
- network issues
- etc.

Following are some of the callbacks. For entire list and more details, refer [listener API documentation](https://mesibo.com/documentation/api/listeners/):

### mesibo_onConnectionStatus 
Invoked when the connection status is changed. There are different connection status codes corresponding to which you can get to know you whether your app is online/offline. 

### mesibo_onMessageStatus
Invoked when the status of the outgoing or sent message is changed. For example, 

- a message was sent from the device
- received by the recipient
- read by the recipient

### mesbo_onMessage
Invoked on receiving a new message or reading database messages. The message parameters of this function will contain the `peer`, which will inform you who sent the message, and the `data` parameter will contain the message data.

## Initialising Mesibo
Before you send and receive real-time messages and calls, you need to initialize Mesibo. The initialization involves the following steps:

1. Set your user credentials for authentication: access token and app ID / app name.
2. Set up Mesibo to invoke your listener class
3. Set up database to store sent and received messages (Optional)
4. Start Mesibo
 
That's it! It's coding time now. 

From the next section onwards, we will start coding basic Mesibo application on various platforms, starting with Android in the next section. 

[On to Part 3 >>](android.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
