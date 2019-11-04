---
description: Install Chat SDK on Raspberry Pi. Mesibo Chat SDK is available as a shared library (.so) which allows you to use it from any application OR languages of your choice like C, C++, Python, PHP, etc.
keywords: chat sdk for raspberry pi, raspberry pi chat sdk, raspberry pi sdk for chat, mesibo raspberry pi sdk, open source chat sdk, real-time chat sdk, raspberry pi sdk for messaging apps
title: Chat SDK for Raspberry Pi 
---
Instantly add real-time communication on your embedded devices by using Mesibo. You can control and communicate with your Raspberry Pi based devices from mobile apps, web, Linux, using the same API. 

Mesibo on Raspberry Pi is available as a shared library(.so) which allows you to use it from any application OR languages of your choice like C, C++, Python, PHP, etc.

### Install Mesibo using the convenience script

Mesibo provides a convenience script for installing Mesibo on your Raspberry Pi.


```bash
$ curl -fsSL https://raw.githubusercontent.com/mesibo/libmesibo/master/install.sh | sudo bash -

<output truncated>

```
Please note the following:

- The scripts require `root` or `sudo` privileges to run. Therefore, you should carefully examine and audit the scripts before running them.

- Convenience script overwrites existing mesibo version with the latest version without any confirmation.

### Install Sqlite 

You may also need to install sqlite and sqlite development package if you plan to store real-time messages on a database.

```bash
$ sudo apt-get install sqlite3 libsqlite3-dev
```

That’s All!

You can now begin tinkering with Mesibo on Raspberry Pi !

### Next steps

- Continue to [Writing App for Raspberry Pi](/documentation/tutorials/first-app/cpp/)

- Continue with the User Guide.

