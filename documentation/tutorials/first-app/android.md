---
title: Write your First mesibo Enabled Application
description: Write your First mesibo Enabled Application
keywords: mesibo, android, ios
---
{% include_relative nav.html selected="android" %}

In this part, we will create a simple real-time app for Android.

## Prerequisites
You MUST go through following prerequisites before you read further.

- Read the [Preparation]({{ '/documentation/tutorials/first-app/' | relative_url }}) Guide.
- Knowledge of using Android Studio and making basic Android Apps

## First Android App
Now let's quickly start coding:

1. Start Android Studio.
2. Create a new project with minimum SDK version 16 or higher.
3. Android Studio starts Gradle and builds your project. This may take a few seconds. For more information about creating a project in Android Studio, see the Android Studio documentation. [https://developer.android.com/training/basics/firstapp/creating-project.html](https://developer.android.com/training/basics/firstapp/creating-project.html)
4. Add mesibo SDK to your project by adding gradle dependency and performing gradle sync as explained in [installation instructions]({{ '/documentation/install/android/' | relative_url }}).
5. Import mesibo API and add mesibo initialization code in your onCreate method

{% highlight java %}
import com.mesibo.api.mesibo;
{% endhighlight %}


{% highlight java %}
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);

	mesibo api = mesibo.getInstance();
	api.init(this);

	api.addListener(this);

	// set user authentication token obtained by creating user
	api.setAccessToken("89314021d442c8169b2f3baf71c79caa3b026c16daedd3ee9");
	api.start();
}
{% endhighlight %}

Extend your activity to Implement `mesibo.MessageListener` and `mesibo.ConnectionListner` class and implement listeners. The easiest way is to click on the `Code` menu and click on `Implement Methods` and it will automatically generate the code for all the methods.

{% highlight java %}
public class MainActivity extends AppCompatActivity implements mesibo.MessageListener, 
       Mesibo.ConnectionListener  {
	
    @Override
    public void Mesibo_onConnectionStatus(int status) {
	    // You will receive the connection status here
	    Log.d(TAG, "on Mesibo Connection: " + status);
    }

    @Override
    public boolean Mesibo_onMessage(Mesibo.MessageParams params, byte[] data) {  
	    // You will receive messages here
	   return true;
    }

    @Override
    public void Mesibo_onMessageStatus(Mesibo.MessageParams params) {
	    // You will receive status of sent messages here

    }
}
{% endhighlight %}
		
That’s it - you are now ready to receive your first real-time message.

## Testing your first application

1. Compile and Run Application.
2. `Mesibo_onConnectionStatus` should cycle through various status information. Finally, you should receive `status=1` which indicates that your app is successfully connected to mesibo real-time server and ready to send and receive real-time messages.
3. Since we do not have any other users right now, we will use **mesibo console** to send a test message. In a later section, we will learn how to send messages from the app itself. 
   - Go to **Console ->Application->Users**. You should see the user you have created. 
   - Go to user details by clicking `Edit` button. Scroll down, you will see a section to `Message User`
   - Enter 1000 (or anything) in `From` field, check `Create This User` checkbox, type message and click on `Send`.
4. You will instantly receive this message in your mobile app in `Mesibo_onMessage` listener. 

## Sending Messages
In previous section, we have used **mesibo console** to send a message. Now we will quickly learn how to send messages from app itself. To send messages, we will use `sendMessage` real-time API for which we will need destination user, message id and message itself. 

Invoke the following function anywhere from your code to send a text message. In later section, we will learn how to send rich messages.

{% highlight java %}
void sendTextMessage(String to, String message) {
	Mesibo.MessageParams p = new Mesibo.MessageParams();
        p.peer = to;
        p.flag = Mesibo.FLAG_READRECEIPT | Mesibo.FLAG_DELIVERYRECEIPT;
		
        Mesibo.sendMessage(p, Mesibo.random(), message);	
}
{% endhighlight %}

That's it! Try it out by creating two instances of the app and send message to each other by using above function.

## Download Sample Application

You can download the entire sample application from **[GitHub](https://github.com/mesibo/samples)**
