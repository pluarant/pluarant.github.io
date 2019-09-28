---
title: Overview
description: Overview of Mesibo APIs
keywords: mesibo, api
---
In this section, we will describe various Mesibo APIs in detail. However, before we move further, ensure that you have read the guides mentioned in the **Prerequisites** below.

### Prerequisites

- Read the  [Get Started]({{ '/documentation/get-started/' | relative_url }}) guide.

## Type of APIs
Mesibo provides two type of APIs

### Real-time API (App side API)
Mesibo real-time API allows users to communicate in real-time by providing APIs for

- 1-to-1 messaging
- group messaging
- voice and video calls. 

This is the main and **the most important** mesibo API which you will integrate with your Android, iOS or Web based application. Once you download and integrate it with your application, your application will be able to communicate in real-time.

### Admin API (Server-side)
Mesibo server-side API allows your backend servers to communicate with Mesibo to perform various administrative tasks such as 

- managing users
- managing groups
- managing apps
- access statistics 
	
Mesibo server-side API is REST APIs which you can access using any language of your choice. 

## Mesibo HTTP Library
In addition to core mesibo real-time and server side API, mesibo provides powerful cross platform HTTP Library for Android, iOS, Linux, Mac. 

Mesibo HTTP is a light but fast and powerful http client library compliant with RFC 7230-7235, 1738, 2046. Unlike other libraries, it is cross platform and provides unified API across platforms.

## Get Started with APIs
Now let's get started with each type of APIs in detail:

- [Real-time API]({{ '/documentation/api/real-time-api' | relative_url }})
- [Server Side REST API]({{ '/documentation/api/server-side-api' | relative_url }})
- [HTTP Library]({{ '/documentation/api/http-library' | relative_url }})

