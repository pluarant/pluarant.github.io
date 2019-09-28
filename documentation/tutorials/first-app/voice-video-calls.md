---
title: Write your First mesibo Enabled Application
description: Write your First mesibo Enabled Application
keywords: mesibo, android, ios
---
{% include_relative nav.html selected="calls" %}

In this part, we will learn how to use Mesibo's Voice and Video Call Features

## Prerequisites
- Read the [Preparation]({{ '/documentation/tutorials/first-app/' | relative_url }}) Guide.
- Read one of the Android, iOS, JS section of this tutorial.

## Voice and Video Calls
In addition to Messaging, Mesibo also allows your apps to enable high quality, secure voice and video calls between users. You can even add PSTN calling to let your users make long distance calls.

To use Mesibo Call Features modules, you need add Call modules in your project and perform minimum two steps:

 1. Initialize Mesibo API with access token as described in Android, or iOS section
 2. Launch Mesibi Call Modules,

```
     MesiboCalls.call(context, destination, video);
```
That's it. Isn't it simple ?

We will go into details on various kind of calls, creating call logs etc in next tutorial. In the meantime, refer to sample app code for ready-to-run examples.

