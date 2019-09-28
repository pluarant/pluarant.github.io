---
title: Data Structures
description: Mesibo Data Structures
keywords: mesibo, real-time
---
### MessageParams
MessageParams is one of the most important data structures of Mesibo real-time API.

- **Android**: mesibo.MessageParams
- **iOS**: mesiboParams

Following are the members of MessageParams

- **mid** - Message id, id of the incoming message. For outgoing messages, mid should be specified in send_xxx() functions.
- **peer** - Address of sender or receiver of the message. Address can be anything and completely defined by your application logic, for example, phone number or email address. Only requirement is that it should be unique for each user. **peer** should be  empty (null) when sending to a group.
- **groupid** - Group ID, should be specified when sending message to groip, 0 for one-to-one messages. When message is received from the group, both gropupid and peer will be set.                           
- **expiry** - Message Expiry for outgoing message (time to live), in seconds                         
- **type** - Message Type, any arbitary user defined types
- **ts**  - Timestamp when the message was received - in milli seconds
- **flag** - Message Flag - can be the combination of one or more flags
  - FLAG_DELIVERYRECEIPT- delivery receipt is required (default, set)
  - FLAG_READRECEIPT - read receipt is required (default, set)
  - FLAG_TRANSIENT - transient message which should not be stored in the database.
  - FLAG_QUEUE - enqueue this message for sending but don’t really send unless send() is called or the queue is full.
  - FLAG_NONBLOCKING - don’t block while queueing message for sending.
  - FLAG_EOM (incoming only) - no more messages, can be used to update UI.
  - FLAG_FILETRANSFERRED (incoming only) - File was transferred and saved.
  - FLAG_FILEFAILED (incoming only) - File transfer was failed. 

- **origin** - Origin of the message. Can be one of the followings:
  - ORIGIN_REALTIME - realtime message.
  - ORIGIN_DBMESSAGE - message from the database.
  - ORIGIN_DBSUMMARY - summary message from the database.
  - ORIGIN_FILTER - message for filtering (moderation)

- **status** - Message Status - Can be one of the followings
  - MSGSTATUS_OUTBOX - Message is pending to send
  - MSGSTATUS_SENT - Message sent to server
  - MSGSTATUS_DELIVERED - Message delivered to recipient
  - MSGSTATUS_READ - Message was read by the recipient
  - MSGSTATUS_RECEIVEDNEW - Message Received and not read earlier
  - MSGSTATUS_RECEIVEDREAD - Message Received and read earlier
  - MSGSTATUS_FAIL - Message Failed
  - MSGSTATUS_USEROFFLINE - Recipient is not active
  - MSGSTATUS_INBOXFULL - Inbox Full
  - MSGSTATUS_INVALIDDEST - Invalid Destination
  - MSGSTATUS_EXPIRED - Expiry reached before message could be sent                          

- **profile** - UserProfile of peer

### FileInfo
FileInfo is used in file transfer using mesibo real-time API. For more information on file transfer, read section in user guide.

Following are the members of FileInfo

- **mode**, File Transfer Mode. It can be one of the followings
  - MODE_DOWNLOAD
  - MODE_UPLOAD                           
- **progress**, File Transfer Progress (in percent)                          
- **url** File URL - it can be an absolute URL or anything which your file transfer handler can interpret.
- **filePath**, File Path
- **type**, File Type. Can be one of the followings
  - TYPE_AUTO
  - TYPE_IMAGE
  - TYPE_VIDEO
  - TYPE_AUDIO
  - TYPE_OTHER                           
- **size**, File Size, in bytes                          

### UserProfile
You can create profile for each user to store user specific information. User profile has no bearing on Mesibo real-time API. However, it makes it easier to accociate sender and receiver of the message. 

- **name**, User or Group Name                           
- **address**, address of Peer, null for group messaging 
- **groupid**, Group ID, 0 for user.                          
- **status**, Social Status                           
- **picturePath**, Profile Picture path                          
- **draft**, Draft message                           
- **unread**, Count of unread messages                         
- **other**, Any custom object                           
- **flag**, Flags. Can be one of the followings
  - FLAG_ARCHIVE
  - FLAG_MUTE
  - FLAG_SELFPROFILE
  - FLAG_HIDDEN
  - FLAG_TEMPORARY	
  - FLAG_DELETED


