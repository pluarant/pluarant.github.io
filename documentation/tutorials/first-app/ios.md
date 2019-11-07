---
title: Write your First mesibo Enabled Application
description: Write your First mesibo Enabled Application
keywords: mesibo, android, ios
---
{% include_relative nav.html selected="ios" %}

In this part, we will create a simple real-time app for iOS.

## Prerequisites
You MUST go through following prerequisites before you read further.

- Read the [Preparation]({{ '/documentation/tutorials/first-app/' | relative_url }}) Guide.
- Knowledge of using Xcode and making basic iOS Apps

## First iOS App
Now let's quickly start coding:

1.  Start Xcode.
2.  Create a new project.
4.  Add `mesibo.framework` to your Xcode project. Refer [Install Instructions](/documentation/install/ios/) for more details.
5.  #import `<Mesibo/Mesibo.h>` in your project
6.  Add mesibo initialization code in your didFinishLaunchingWithOptions method inside `AppDelegate.m`

{% highlight objective_c %}
#import <Mesibo/Mesibo.h>
{% endhighlight %}


{% highlight objective_c %}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:
				(NSDictionary *)launchOptions {

	[MesiboInstance addListener:self];

	// set user authentication token obtained by creating user
	[MesiboInstance setAccessToken:@"89314021d442c8169b2f3baf71c79caa3b026c16daedd3ee9"];
	[MesiboInstance start];
}
{% endhighlight %}


Implement necessary delegate methods of `MesiboDelegate` in `AppDelegate.m` as shown below. 

{% highlight objective_c %}
	
-(void) Mesibo_OnConnectionStatus:(int)status {
	// You will receive the connection status here
    	NSLog(@"Connection status: %d", status);
}

-(void) Mesibo_OnMessage:(MesiboParams *)params data:(NSData *)data {    
	
	// You will receive messages here

}

-(void) Mesibo_OnMessageStatus:(MesiboParams *)params {

	// You will receive status of sent messages here
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

{% highlight objective_c %}
-(void) sendTextMessage:(NSString *)to message:(NSString *)message {
	MesiboParams *params = [MesiboParams new];
    	params.peer = to;
    	params.flag = MESIBO_FLAG_READRECEIPT | MESIBO_FLAG_DELIVERYRECEIPT;

    	uint32_t mid = [MesiboInstance random];
    	[MesiboInstance sendMessage:params msgid:id string:message];
}
{% endhighlight %}

That's it! Try it out by creating two instances of the app and send message to each other by using above function.

## Download Sample Application

You can download entire sample application from **[GitHub](https://github.com/mesibo/samples){:target="_blank"}**

[On to Part 5 >>](js.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}