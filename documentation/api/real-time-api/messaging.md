---
title: Mesibo Real-time APIs - Messaging
description: Mesibo Real-time APIs - Messaging
keywords: mesibo, real-time api, messaging API, chat API, voice SDK, video SDK
---
{% include_relative nav.html selected="messaging" %}

Sending messages using Mesibo only requires initializing a `MesssageParams` object with needed parameters and invoke one of the messaging API with params, Message-ID and the message.

Each message has essentially two parts:

  - Message properties, for example, type of message, expiry, Message-ID, etc. Refer to [Getting Started Guide](/documentation/get-started/messaging) for more information. You can specify message properties using [MessageParams](data-structures.md)
  - Message 

> You should use a unique Message-ID for sending each message so that you can identify the message when the message status is received. Message-ID is 32-bit unique id. It will be converted into a 64-bit globally unique ID by the system. The ID which you have originally passed will be preserved in the lower 32-bit of the globally unique ID.  For example, if you send a message with id 0x12345678, it will be converted into global id 0xXXXXXXXX12345678 when delivering your message to the receiver.

### sendMessage
Send a message. There are overloaded functions to send messages in different formats, for example, string, byte array etc.

It takes the following parameters:
 
  - **params**, `MessageParams` object initialized with required parameters
  - **mid**, Message-ID. For sending messages, Message-ID should be specified in the function parameters instead of using it from params. This enables using the same `MessageParams` object from different threads. 
  - **message**, Message

### sendFile 
Send a file. This API is described in more details in the `File Transfer` section below. This API is deprecated and will be soon replaced by a common API.

It takes the following parameters:
 
  - **params**, `MessageParams` object initialized with required parameters
  - **mid**, Message-ID. For sending messages, Message-ID should be specified in the function parameters instead of using it from params. This enables using the same `MessageParams` object from different threads. 
  - **file**, `FileInfo` object initialized with file information like path, type, etc.

### sendLocation 
Send a location.  This API is deprecated and will be soon replaced by a common API.

It takes the following parameters:
 
  - **params**, `MessageParams` object initialized with required parameters
  - **mid**, Message-ID. For sending messages, Message-ID should be specified in the function parameters instead of using it from params. This enables using the same `MessageParams` object from different threads. 
  - **location**, `LocationInfo` object initialized with location information like latitude, longitude, address, etc.

### forwardMessage
Forward an existing message to a user or a group. A FORWARD flag will be set at recepients end to indicate it as a forwarded message. 

It takes the following parameters:
 
  - **params**, `MessageParams` object initialized with required parameters
  - **mid**, Message-ID of an existing message to be forwarded

> You must enable local database using `setDatabase` API for this API to work. 

### resendMessage
Resend a failed message. 

It takes the following parameters:
 
  - **params**, `MessageParams` object initialized with required parameters
  - **mid**, Message-ID of an existing message to be resent

> You must enable local database using `setDatabase` API for this API to work. 

### cancel
Cancel a message. Message can not be canceled if already sent &amp; delivered. Use `deleteMessage` API if you like to recall a delivered message.

It takes the following parameters:
 
  - **params**, `MessageParams` object initialized with required parameters
  - **mid**, Message-ID of an existing message to be cancel

### deleteMessage
Delete a message.

It takes the following parameters:
 
  - **mid**, Message-ID of an existing message to be deleted

### deleteMessages
Delete messages matching criteria in `MessageParams` object. For example, if you pass `MessageParams` with `address` set, it will delete all the messages from an `address`

It takes the following parameters:
 
  - **params**, `MessageParams` object initialized with required parameters

### random
Returns a new unique message ID which you can use to send messages.  

It does not take any parameters.

## Messaging APIs Example 

### Android Example

```java
Mesibo.MessageParams p = new Mesibo.MessageParams(to, Mesibo.FLAG_DEFAULT);

int rv = Mesibo.sendMessage(p, Mesibo.random(), "A Test Message");
if(Mesibo.RESULT_OK == rv) {
	Log.d(TAG, "Message sent");
} else {
	Log.d(TAG, "Message failed: " + rv);
}
```

### iOS Example

```objc
MesiboParams *p = [MesiboParams new];

[p setPeer:to];
[p setFlag:MESIBO_FLAG_READRECEIPT|MESIBO_FLAG_DELIVERYRECEIPT];
[p setExpiry:3600*24*7];

uint32_t mid = [MesiboInstance random];
[MesiboInstance sendMessage:params msgid:mid string:@"A Test Message"];
```

## Reading Stored Messages and Sending Read Receipts
These set of APIs deal with stored messages in the database and sending read receipts.

To read stored messages from the database, you need to create a read session and set the criteria to read messages; for example, 

   - read all messages
   - read messages from a sender
   - read messages for a particular group
   - read messages matching a search query
   - etc. 
   
### Reading Modes
There are two modes of operation:

   - Read Messages and call logs. This mode is enabled by default
   - Read Summary, read a latest message from each user and group. This allows you to get a snapshot of all the communicating users and groups. You can then create another read session to read messages for any of those users or groups. 

### Reading Order
Once you set a read session, you can start reading messages by calling `read` API. You can read messages in the first-in-first-out (fifo) mode or the last-in-first-out (lifo) mode. In the first-in-first-out mode, oldest messages are read first. By default, the first-in-first-out mode is disabled. 

### Read Receipts
You can enable automatic sending of read-receipts every time you read a message. This can be achieved by enabling read-receipt for the read session. On reading or receiving a message, read receipts will be automatically sent if

- Sending Read Receipt is enabled for the reading session, AND
- Read receipt requested by the sender, AND
- A new real-time or database message matches the read session.

Following are the various `read session` APIs followed by examples. Unless specified, all the read session APIs takes only one parameter:

  - **enable**, Enable or Disable a particular mode

### enableSummary
Enable or disable Summary mode. Refer `Reading Modes` above for the details.

### enableFifo
Enable or disable first-in-first-out mode. Refer `Reading Order` above for the details.

### enableFiles
Enable reading messages having files. Messages without files will not be read.

### enableIncomingCalls
Enable or disable reading incoming call logs along with other messages.  

### enableOutgoingCalls
Enable or disable reading outgoing call logs along with other messages.  

### enableMissedCalls
Enable or disable reading missed call logs along with other messages.  

### enableCalls
Enable or disable reading all the call logs along with other messages.  

### enableReadReceipt
Enable or disable sending read receipts

### read
Read the requested number of messages. Any subsequent invocations will read more messages till all the messages have been read. 

It takes the following parameters:
 
  - **count**, number of messages to read

## Read Session APIs Example 

### Android Example

```java
Mesibo.ReadDbSession mReadSession = new Mesibo.ReadDbSession(from, 0, null, this);
mReadSession.enableReadReceipt(true);
mReadSession.enableMissedCalls(mShowMissedCalls);
mReadSession.read(100);
```

To read last message from each user (summary) 
```java
Mesibo.ReadDbSession mReadSession = new Mesibo.ReadDbSession(null, 0, null, this);
mDbSession.enableSummary(true);
mReadSession.enableReadReceipt(false);
mReadSession.enableMissedCalls(mShowMissedCalls);
mReadSession.read(100);
```
### iOS Example

```objc
MesiboReadSession *mReadSession = [MesiboReadSession new];
[mReadSession initSession:nil groupid:0 query:nil delegate:self];
[mReadSession enableSummary:YES];
[mReadSession read:100];
```


[File Transfer APIs >>](file-transfer.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
