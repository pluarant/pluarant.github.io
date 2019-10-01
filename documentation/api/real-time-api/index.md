---
title: Mesibo Real-time APIs - Introduction
description: Mesibo Real-time APIs - Introduction
keywords: mesibo, real-time api, messaging API, chat API, voice SDK, video SDK
---
{% include_relative nav.html selected="introduction" %}

Mesibo real-time API allows users to communicate in real-time by providing APIs for

- 1-to-1 messaging
- group messaging
- voice and video calls

In this section, we will explore these real-time APIs in detail. 

### Key Components
There are three key components of Mesibo real-time APIs
- **Functions**, which you can invoke. For example, to send a message, make a call, etc

- **Listeners**, which mesibo will invoke for various events. For example, when you receive a message, receive an incoming call, etc. You can implement these listeners to get real-time notifications of events

- **Data Structures**, various data structures used in functions and listeners

### API Signatures
All the APIs have exactly the same name and parameters across the platform unless specified. They only differ in the way they are invoked in various platforms like Java (Android), Objective-C (iOS), Swit (iOS), C++, Javascript. For example, the ‘setPath’ API is invoked on the various platform, as shown below:

On Android
```
mesibo.setPath(path)
``` 

On IOS 

Objective-C
``` 
[mesiboInstance setPath:path];
``` 						

Swift
```
mesibo.getInstance().setPath(path)
``` 					
This makes it easy for you to write cross-platform code across platform. In following sections, we will only describe APIs with name and parameters.

## Get Started with Mesibo Real-time APIs
Mesibo Real-time APIs are broadly classified in the following categories:

- [Initialization APIs]({{ '/documentation/api/real-time-api/initialization/' | relative_url }}) - Set of APIs for initializing Mesibo and start connection to Mesibo cloud or your on-premise servers. 

- [Messaging APIs]({{ '/documentation/api/real-time-api/messaging/' | relative_url }}) - Core Messaging APIs for sending messages, forwarding, resending, reading messages from the database etc. 

- [File Transfer APIs]({{ '/documentation/api/real-time-api/file-transfer/' | relative_url }}) - APIs to send and receive files. 

- [Voice &amp; Video Calls APIs]({{ '/documentation/api/real-time-api/calls/' | relative_url }}) - APIs for voice and video calls. 

- [User and Group Profile APIs]({{ '/documentation/api/real-time-api/profiles/' | relative_url }}) - APIs to manage user and group profiles.

- [Utility APIs]({{ '/documentation/api/real-time-api/utility/' | relative_url }}) - Various utility APIs to perform auxilary tasks like checking network connections, creating files, etc.

You can click on individual sections to go through each API category. Although, it is not necessary to go in the order but recommended for the first reading. 

[Initialization APIs >>](initialization.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
