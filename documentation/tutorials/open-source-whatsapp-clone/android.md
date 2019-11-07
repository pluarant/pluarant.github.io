---
description: Open Source Android Messenger
keywords: open, source, whatsapp, mesibo, overview
title: Build Open Source Android Messenger
---
{% include_relative nav.html selected="android" %}

In this part, we will download the source code for Android Messenger, build and run it on a real device.

Ready? let's get started. 

## Prerequisites
Before we dive into building and running a fully featured Messenger for Android, ensure that you've read the following.

- The [first part of this tutorial](index.md) and Prerequisites mentioned there.
- [Get Started Guide]({{ '/documentation/get-started/' | relative_url }}).
- Tutorial on [Writing your First mesibo Enabled Application]({{ '/documentation/tutorials/first-app/' | relative_url }})
- Android Studio Installed
- An Android Device

## Downloading the Source Code
The latest code for the Android Messenger is always updated and pushed on [messenger-app-android repository](https://github.com/mesibo/messenger-app-android){:target="_blank"}.

There are multiple ways of "downloading" code from GitHub.

### Clone the Repository (Recommended)
If you have git installed, this is a recommended approach as you can quickly sync and stay up to date with the latest version. This is also a preferred way of downloading the code if you decide to contribute to the project. 

To download, open a terminal and issue following commands:

    $ mkdir Messenger
    $ cd Messenger
    $ git clone https://github.com/mesibo/messenger-app-android.git

### Download the code as a zip file
You can also download the complete Android Messenger source code as a zip file. Although simple, the downside of this approach is that you will have to download the full source code every time it is updated on the repository. 

Click on the `Download` button to start downloading.

[Download](https://github.com/mesibo/messenger-app-android/archive/master.zip){: target="_blank" class="button outline-btn" style="margin-bottom: 10px; margin-right: 100%"}

Once the download completes, unzip into a folder. 

### Stay Up-to-date
Whatever approach you take to download the code, it is important to stay up-to-date with the latest changes, new features, fixes etc. Ensure to **Star(*)** the project on GitHub to get notified whenever the source code is updated. 

<a class="github-button" href="https://github.com/mesibo/messenger-app-android" target="_blank" data-icon="octicon-star" data-size="large" aria-label="Star mesibo/messenger-app-android on GitHub">Star</a>

## Build and Run
In this part, we will build the code as it is and run the app. In the next section, we will learn about customizing applications.

Building the code is as simple as:

 1. Launch Android Studio
 2. Open the project from the folder where you have downloaded the code using the menu `File -> Open`
 3. Build using menu `Build -> Rebuild Project`
 4. It may take a while to build the project for the first time. 
 5. Once the build is over, run on the device using the menu `Run -> Run (app)`
 6. That's it, you should see the welcome screen and then the login screen.

Log in using your phone number. You can even start using the app you've just built to communicate with your family and friends. Cool isn't?

## Conclusion of part two

In this part, we have built and run the Android Messenger app. 

In part 3, we will start building the iOS app. However, if you prefer, you can skip it and go to Part 4 of this tutorial to learn about customizing.

[On to Part 3 >>](ios.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
