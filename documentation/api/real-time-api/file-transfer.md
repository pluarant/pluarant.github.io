---
title: Mesibo Real-time APIs - File Transfer
description: Just like text messages, mesibo real-time file-transfer API allows you to send and receive any arbitrary file - image, video, doc, etc. 
keywords: file transfer api, real-time file sending, file transferring, instance file transfer api, file transfer api for android, file transfer api for ios 
---
{% include_relative nav.html selected="file" %}

Just like text messages, mesibo allows you to send and receive any arbitrary file (image, video, doc, etc.) in real-time. Sending and receiving files is no different from sending and receiving text messages. All an application has to do is to upload the file to a server and then send the URL and thumbnail [optional] using mesibo in real-time. The receiver then downloads it using that URL. This out-of-band mechanism ensures that no real-time messages are blocked waiting for large files to be uploaded or downloaded.

mesibo offers you the flexibility to store all files on your own servers including private servers or cloud services like Amazon Web Services, Google Cloud Storage, Microsoft Azure, etc.

There are two ways you can send files using Mesibo:

 - Perform above process manually - upload a file and then send a rich message (say, JSON) containing the file information (e.g., URL, name. title, thumbnail, etc.) using `sendMessage` API.

 - Alternatively, Mesibo provides convenient helper APIs which does most of the work and allows you to send various other information along with the file such as title, message, geolocation, etc. Receiver is notified of incoming file in listener function `mesibo_onFile()`
 
In this section, we will describe these helper APIs.

To start a file transfer (download or upload), you must initialize a `FileInfo` object and pass it to `sendFile` or `startFileTransfer` API. However, instead of creating this object manually, mesibo provides getFileInstance() API, which checks if an existing file transfer for this particular URL (download) or the file (upload) is in progress and if so, returns that object instead of creating a new object. This highly optimizes sending a file by avoiding duplicate file transfers.

Mesibo automatically uploads or downloads files for you. However, Mesibo does not know or mandate how and where you store your files. Hence to use helper APIs, you must assist mesibo in uploading and downloading files to your server. You can achieve this by implementing an upload and download handler functions which are called by mesibo real-time API whenever it needs to upload or download a file.  

![]({{ 'images/file-handler.png' }} )

Following are the file transfer APIs.

### getFileInstance
Create a new `FileInfo` instance for a file transfer. 

It takes the following parameters:
 
  - **type**, type of the transfer, Upload or Download
  - **url**, download URL (only for Downloads)
  - **path**, FIle Path (only for Uploads)

### startFileTransfer
Start a File Transfer

It takes the following parameters:
 
  - **file**, `FileInfo` object

### stopFileTransfer
Stop a File Transfer

It takes the following parameters:
 
  - **file**, `FileInfo` object

### updateFileTransferProgress
Update the progress of current file Transfer. This API should be called by the FileTransferHandler to update the progress of the file transfer or any error. In turn, it invokes FileTransferProgressListener so that application can update the state, UI, etc.

It takes the following parameters:
 
  - **file**, `FileInfo` object

### isFileTransferEnabled
Returns true if FileTransferHandler is implemented by the application

It does not take any parameters.


> Refer to `FileTransferHandler.java` (Android) or `FileTransfer.m` (iOS) in Sample app code on [GitHub](https://github.com/mesibo/samples/) to learn how to create a file handler.


[Voice &amp; Video Calls APIs >>](calls.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%; width: 300px;"}
