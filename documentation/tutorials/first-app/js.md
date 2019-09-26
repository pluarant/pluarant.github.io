---
title: Write your First mesibo Enabled Application
description: Write your First mesibo Enabled Application
keywords: mesibo, android, ios
---
{% include_relative nav.html selected="js" %}

In this part, we will create a simple real-time app for Web (Javascript).

## Prerequisites
You MUST go through following prerequisites before you read further.

- Read the [Preparation]({{ '/documentation/tutorials/first-app/' | relative_url }}) Guide.
- Knowledge of Javascript

## First Web (Javascript) App
Now let's quickly start coding:

Add mesibo API for javascript in your code:

{% highlight javascript %}
<script type="text/javascript" src="https://api.mesibo.com/mesibo.js"></script>
{% endhighlight %}


Now, initialize mesibo like shown below

{% highlight javascript %}
var api = new Mesibo();
api.setAppName("console");
api.setListener(new MesiboListener());
api.setCredentials(accessToken);
api.start();
{% endhighlight %}

Implement MesiboListener to receive messages and status in real-time.

{% highlight javascript %}
function MesiboListener() {
}

MesiboListener.prototype.Mesibo_OnConnectionStatus = function(status, value) {
	console.log("TestNotify.prototype.Mesibo_OnConnectionStatus: "  + status);
}

MesiboListener.prototype.Mesibo_OnMessageStatus = function(m) {
	console.log("TestNotify.prototype.Mesibo_OnMessageStatus: from "  
			+ m.peer + " status: " + m.status);
}

MesiboListener.prototype.Mesibo_OnMessage = function(m, data) {
	console.log("TestNotify.prototype.Mesibo_OnMessage: from "  + m.peer);
}

{% endhighlight %}
		

That’s it - you are now ready to receive your first real-time message.

## Testing your first application

1. Compile and Run Application.
2. `Mesibo_onConnectionStatus` should cycle through various status information. Finally, you should receive `status=1` which indicates that your app is successfully connected to mesibo real-time server and ready to send and receive real-time messages.
3. Since we do not have any other users right now, we will use **mesibo console** to send a test message. In later section, we will learn how to send messages from the app itself. 
   - Go to **Console ->Application->Users**. You should see the user you have created. 
   - Go to user details by clicking `Edit` button. Scroll down, you will see a section to `Message User`
   - Enter 1000 (or anything) in `From` field, check `Create This User` checkbox, type message and click on `Send`.
4. You will instantly receive this message in your mobile app in `Mesibo_onMessage` listener. 


## Sending Messages
In previous section, we have used **mesibo console** to send a message. Now we will quickly learn how to send messages from app itself. To send messages, we will use `sendMessage` real-time API for which we will need destination user, message id and message itself. 

Invoke following function anywhere from your code to send a text message. In later section, we will learn how to send rich messages.

{% highlight javascript %}
function sendTextMessage(to, message) {
	var p = {};
       	p.peer = to;
	var id = parseInt(Math.random()*10000);
	api.sendMessage(p, id, message);
}
{% endhighlight %}

That's it! Try it out by creating two instances of the app and send message to each other by using above function.

## Download Sample Application

You can download entire sample application from **[GitHub](https://github.com/mesibo/samples)**

