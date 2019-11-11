---
title: Write your First mesibo Enabled Application
description: Write your First mesibo Enabled Application
keywords: mesibo, android, ios
---
{% include_relative nav.html selected="files" %}

In this part, we will describe file transfer.

## Prerequisites
You MUST go through following prerequisites before you read further.

- Read the [Preparation]({{ '/documentation/tutorials/first-app/' | relative_url }}) Guide.
- Read one of the Android, iOS, JS section of this tutorial.

## How to add file handling

Just like text messages, mesibo allows you to send and receive any arbitrary file (image, video, doc, etc) in real-time. Sending and receiving file is no different from sending and receiving text messages. All an application has to do is to first upload the file to a server and then send the URL and thumbnail [optional] using mesibo in real-time. The receiver then downloads it using that URL. This out-of-band mechanism ensures that no real-time messages are blocked waiting for large files to be uploaded or downloaded.

mesibo offers you the flexibility to store all files on your own servers including private servers or cloud services like Amazon Web Services, Google Cloud Storage, Microsoft Azure etc.

You can use any data structure (for example, json) to send rich messages which contain text message, title, picture url etc. Mesibo provides a convenient utility function sendFile, which does most of the work and allows you to send various other information along with the file such as title, message, geolocation, etc. Receiver is notified of incoming file in listener function `mesibo_onFile()`

However, Mesibo does not know or mandate how and where you store your files. Hence in order to use sendFile function, you must assist mesibo in uploading and downloading files to your server. You can achieve that by implementing upload and download handler functions in `mesiboFileTransferHandler` which is called by mesibo real-time API whenever it needs to upload or download file.  For more information, refer to FileTransferHandler reference document.

![]({{ '/api/images/file-handler.png' | relative_url }})

> Refer to `FileTransferHandler.java` (Android) or `FileTransfer.m` (iOS) in Sample app code on [GitHub](https://github.com/mesibo/samples/){:target="_blank"} to learn how to create a file handler.

[On to Part 9 >>](ui-modules.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
