---
title: Mesibo Real-time APIs - Listeners
description: Mesibo Real-time APIs - Listeners
keywords: mesibo, real-time api, messaging API, chat API, voice SDK, video SDK
---
Mesibo invokes **Listeners** for various events. For example, when you receive a message, receive an incoming call etc. You can implement to these listners to get real-time notifications of events.

To set listener, use setListener API.

Folliwing are various Mesibo Listeners

### Message Listener
Message listener is invoked on receiving a message or when a message delivery status changes. 

It is defined as following:

- **Android**: mesibo.MessageListener interface
- **iOS**: mesiboListener delegate

Following are individual listeners:

- **mesibo_onMessage**, Invoked on receiving a new message or reading database messages with following parameters
  - MessageParams									
  - Data

- **mesibo_onFile**, Invoked on receiving a new file message or reading database messages with following parameters
  - MessageParams
  - FileInfo

- **mesibo_onLocation**, Invoked on receiving a new location message or reading database messages with following parameters
  - MessageParams
  - Location

- **mesibo_onActivity**, Invoked on receiving a new activity with following parameters
  - MessageParams
  - Activity

- **mesibo_onMessageStatus**, Invoked when the status of outgoing or sent message is changed with following parameters
  - MessageParams

### Connection Listener
Connection listener is invoked when the connection status is changed. 

It is defined as following:

- **Android**: mesibo.ConnectionListener interface
- **iOS**: mesiboListener delegate

Following is listener:

- **mesibo_onConnectionStatus**, Invoked when the connection status is changed. It is also invoked when the token is about to be expired.
  - status

### File Transfer Handler
File Transfer handler is invoked when mesibo need to upload or download a file. Since mesibo allows you to use your own server, mesibo let you do the file transfer.

It is defined as following:

- **Android**: mesibo.FileTransferHandler interface
- **iOS**: mesiboListener delegate

Following are individual listeners:

- **mesibo_onStartFileTransfer**, Invoked to start a file transfer.
  - FileInfo Object

- **mesibo_onStopFileTransfer**, Invoked to start a file transfer.
  - FileInfo Object                          

### File Transfer Progress Listener
File Transfer Progress Listener is invoked to File Transfer Handler updates the file transfer progress.

It is defined as following:

- **Android**: mesibo.FileTransferProgressListner interface
- **iOS**: mesiboListener delegate

Following are individual listeners:

- **mesibo_onFilerTransferProgress**, Invoked when file transfer status is updated
  - FileInfo Object                          

### Message Filter Listener
Message Filter Listener is used to filter / moderate messages.

It is defined as following:

- **Android**: mesibo.MessageFilter interface
- **iOS**: mesiboListener delegate

Following are individual listeners:

- **mesibo_onMessageFilter**, Invoked when a new real-time message is received. Return false to filter out the message.	
  - MessageParams
  - Data                           

