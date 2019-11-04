---
title: Write your First mesibo Enabled Application - C/C++
description: Write your First mesibo Enabled Application - C/C++
keywords: mesibo, android, ios, cpp, c++, c
---
{% include_relative nav.html selected="cpp" %}

In this part, we will create a simple real-time app using Mesibo C/C++ API. The Mesibo C/C++ SDK allows you to create real-time application on `Linux`, `Mac OS`, and `Raspberry Pi` platforms. Mesio C/C++ API is the low-level API which is extremely powerful, efficient, and light-weight.

Mesibo C/C++ library is available as a shared library(libmesibo.so) which can be seamlessly integrated into any application by compile time linking or by loading it dynamically. You can even use it from other languages of your choice like Python, PHP, Matlab, etc. as all of these languages allow interfacing with C/C++ libraries. 

### Supported Platforms
- CentOS / RedHat 7.x or above
- Debian / Ubuntu
- Mac OS
- Raspberry Pi


### Prerequisites

- Installed the Mesibo Real-Time C/C++ Library. If not, refer installation instructions [here](/documentation/install/linux/) 

- Read the [Preparation Guide](/documentation/tutorials/first-app/)

- Read the [Anatomy of a Mesibo Application](/documentation/tutorials/first-app/anatomy/) 

- Basic knowledge of writing and compiling C/C++ code

### First C/C++ App

Now let’s quickly start coding:

1. Open a code editor
2. Include `mesibo.h` in your code
3. Create a class derived from the `CMesiboNotify` class to listen to all the message and call events. 
4. Initialize mesibo using the user token and listener.

```cpp
#include <mesibo.h>
```

Below is Mesibo Event Listener

```cpp
class CNotify : public CMesiboNotify {
	
	IMesibo *m_api;
	public:
	
	void set_api(IMesibo *api) {
		m_api = api;
	}


	// You will receive the connection status here
	int on_status(int status, uint32_t substatus, uint8_t channel,
			const char *from) {
		ERRORLOG("===> on_status: %u \n", status);
		return 0;
	}


	// Invoked on receiving a new message or reading database messages
	// You will receive messages here.
	int on_message(tMessageParams * p, const char *from, const char *data,
			uint32_t len) {
	
		int printlen = len;
	        if (printlen > 64) printlen = 64;

		ERRORLOG("===> message received:from %s,of len %d: %.*s\n",
			from, len, printlen, data);

		return 0;

	}

	// Invoked when the status of the outgoing or sent message is changed
	// You will receive the status of sent messages here
	int on_messagestatus(tMessageParams * p, const char *from, int last) {
		ERRORLOG(
			"===> on_messagestatus status %u from: %s\n",p->status, from);
		return 0;
	}
};

```
 
Following is the Mesibo Initialization code.

```cpp
#define AUTH_TOKEN 3e7694e19d192588a4ffcb4eab26b6afb3d5aada54bbd41ed140a
#define APP_ID "mycppapp"

IMesibo* mesibo_init(){
	
	// Create a Mesibo Instance
	m_api = query_mesibo("/tmp");

	// Add Listener
	CNotify *n = new CNotify();
	m_api->set_notify(0, n, 1);

  
	// Set your AUTH_TOKEN obtained from the Mesibo Console
	m_api->set_credentials("3e7694e19d192588a4ffcb4eab26b6afb3d5aada54bbd41edd7140a");
  
  	// Set  APP_ID which you used to create AUTH_TOKEN 
	m_api->set_device(1, "cpp", APP_ID, "1.0.0");

	// Set the name of the database
	if (0 != m_api->set_database("mesibo.db")) {
		fprintf(stderr, "Database failed\n");
		return NULL;
	}
	
	return m_api;
}


```
Now,after initialization is complete you run Mesibo
```
m_api->start();
```

That’s it - you are now ready to receive your first real-time message.

## Compiling and Running sample C/C++ application

It is recommended that you use a modern C/C++ compiler such as gcc (GCC-C++ 4.x or above) or clang. You can compile your code by linking the Mesibo Library as shown below:

```bash
g++ my_first_app.cpp -o myfirstapp -lmesibo
```

Run the output executable

```bash
./myfirstapp
```

2. `on_status` should cycle through various status information. Finally, you should receive status=1 which indicates that your app is successfully connected to the mesibo real-time server and ready to send and receive real-time messages.

3. Since we do not have any other users right now, we will use **mesibo console** to send a test message. In a later section, we will learn how to send messages from the code itself.

- Go to **Console ->Application->Users**. You should see the user you have created.

- Go to user details by clicking the `Edit` button. Scroll down, you will see a section to `Message User`
Enter 1000 (or anything) in `From` field, check `Create This User` checkbox, type message and click on `Send`.

4. You will instantly receive this message in your console/terminal in `on_message` listener.

## Sending Messages
In the previous section, we have used mesibo console to send a message. Now we will quickly learn how to send messages from the code itself. To send messages, we will use `message` real-time API for which we will need destination user, message-id and the message itself.

Invoke the following function anywhere from your code to send a text message. 

```cpp
int send_text_message(const char* to,const char * message){
        tMessageParams p = {};
        p.id = m_api->random32();
	p.expiry = 3600;
	int datalen = strlen(message);
        m_api->message(&p, to, message, datalen);
}

```

That’s it! Try it out by creating two users and send messages to each other by using the above function.
