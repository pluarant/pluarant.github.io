---
title: Overview
description: Overview of Mesibo APIs
keywords: mesibo, api
---
Mesibo APIs allows you to add **real-time messaging, voice, and video** calls to your apps and website in no-time. Mesibo APIs is easy to learn and master. In an hour, you should be able to start using Mesibo APIs in your code.

Mesibo APIs is as simple as creating end-points (users or groups) and start communicating between them. Mesibo APIs remain the same, whether you are using our cloud-based services or our [On-Premise]({{ '/documentation/on-premise/' | relative_url }}) offerings. This allows you to switch anytime without impacting your users.

In this section, we will describe various Mesibo APIs in detail. However, before we move further, ensure that you have read the guides mentioned in the Prerequisites below.

### Prerequisites

- Read the  [Get Started]({{ '/documentation/get-started/' | relative_url }}) guide.

## Type of APIs
As previously mentioned, Mesibo APIs is as simple as creating end-points (users or groups) and start communicating between them. You perform two categories of tasks using Mesibo:

  - **Non-real-time tasks**, e.g., creating users and groups for your apps. You generally perform these tasks from your backend, and your end-users have no control over it.

  - **Real-Time time tasks**, in which your users will be able to communicate in real-time, for example, sending messages, or making calls. However, before they can communicate in real-time, they must be created in the system by backend API.

Mesibo provides separate APIs for both these tasks.

### Real-time APIs (App or Client Side APIs)
Mesibo real-time APIs allows users to communicate in real-time by providing APIs for

- 1-to-1 messaging
- group messaging
- voice and video calls

This is the API which you will integrate with your client-side applications (e.g., Android, iOS, Web, C++, Python, etc.). Once you download and integrate it with your apps, your apps will be able to communicate in real-time.

### Non real-time Back-end API (Server side API)
Mesibo backend API allows your backend servers to communicate with Mesibo to perform various administrative tasks such as

- managing users
- managing groups
- managing apps
- access statistics 
	
Mesibo backend API is a REST based APIs which you can access using any language of your choice. 

## Mesibo HTTP Library
In addition to core mesibo real-time and backend API, mesibo provides powerful cross-platform HTTP Library for Android, iOS, Linux, MacOS.

Mesibo HTTP is a lightweight but fast and powerful HTTP client library compliant with RFC 7230-7235, 1738, 2046. Unlike other libraries, it is cross-platform and provides unified API across platforms.

## Get Started with APIs
Now let's get started with each type of APIs in detail:

- [Real-time API]({{ '/documentation/api/real-time-api' | relative_url }})

- [Backend REST API]({{ '/documentation/api/backend-api' | relative_url }})

- [HTTP Library]({{ '/documentation/api/http-library' | relative_url }})

