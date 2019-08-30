---
title: Write your First mesibo Enabled Application
description: Write your First mesibo Enabled Application
keywords: mesibo, android, ios
---
{% include_relative nav.html selected="ui" %}

In this part, we will learn how to use Mesibo's ready to use UI modules.

## Prerequisites
- Read the [Preparation]({{ '/documentation/tutorials/first-app/' | relative_url }}) Guide.
- Read one of the Android, iOS, JS section of this tutorial.

## Ready to use UI Modules
In addition to core APIs, Mesibo also offers you ready to use UI modules which you can use it in your app. Mesibo UI modules are completely customizable. You not only can customize colors, icon etc but you can even customize how each message is rendered. This enables you to create powerful chatbots in no-time.

To use Mesibo UI modules, you need add UI modules in your project and perform minimum two steps:

 1. Initialize Mesibo API with access token as described in Android, or iOS section
 2. Launch Mesibi UI modules, for example,

```
     MesiboUI.launch(context, 0, false, true);
```
That's it.

> Mesibo Messaging UI module uses Google Map SDK for location. Hence, you'll need to get your own Google Map Key to use location features. Refer to Mesibo installation instruction for your platform to learn more. 

Refer to sample app code for ready-to-run examples.

