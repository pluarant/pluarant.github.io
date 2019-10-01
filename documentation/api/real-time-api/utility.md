---
title: Mesibo Real-time APIs - Utility 
description: Mesibo Real-time APIs - Utility
keywords: mesibo, real-time api, messaging API, chat API, voice SDK, video SDK
---
{% include_relative nav.html selected="utility" %}

Following are some of the utility APIs which you can use in your apps. Ensure that you have ncessary permissions from the app users to use these APIs.

## Networking, Timings and other Utility APIs

### getNetworkConnectivity [Android and iOS only]
Returns current network connectivity. It can be one of the following

  - CONNECTIVITY_UNKNOWN
  - CONNECTIVITY_DISCONNECTED
  - CONNECTIVITY_WIFI
  - CONNECTIVITY_2G
  - CONNECTIVITY_3G
  - CONNECTIVITY_4G

### getTimestamp
Returns current timestamp in milliseconds.

It does not take any parameters.

### getUpTime
Returns the time when Mesibo was initialized (in milliseconds).

It does not take any parameters.

### getConnectedTime
Returns the timestamp when last connected to Mesibo cloud server or your on-premise server

It does not take any parameters.

### random                        
Returns a new unique Message-ID (pseudo-random number) which you can use to send messages or for any other purpose.  

It does not take any parameters.

### isUiThread [Android and iOS only]
Returns `true` if current thread is an UI thread.

It does not take any parameters.

### loadImage [Android and iOS only]
Returns image from the file path

It takes the following parameters:
 
  - **filepath**, Full file path

### getThumbnailBitmap [Android and iOS only]
Get thumbnail from an image

It takes the following parameters:
 
  - **image**, Bitmap (Android) or a pointer to UIImage (iOS) object

## Filesystem APIs

### createFile
Create a file|Filename and path|                           

It takes the following parameters:
 
  - **filename**, File name
  - **path**, Path where file is to be created

### fileExists
Check if a file exists|Filename and path|                           

It takes the following parameters:
 
  - **filepath**, Full file path

### renameFile
Rename a file

It takes the following parameters:
 
  - **oldpath**, Old File path
  - **newpath**, New File Path

### copyFile
Copy a file

It takes the following parameters:
 
  - **src**, Source File path
  - **dest**, Destination File Path

### deleteFile
Delete a file

It takes the following parameters:
 
  - **filepath**, Full file path

