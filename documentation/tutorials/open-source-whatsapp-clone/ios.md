---
description: Open Source iOS Messenger
keywords: open, source, whatsapp, mesibo, ios, overview
title: Build Open Source iOS Messenger
---
{% include_relative nav.html selected="ios" %}

In this part, we will download the source code for iOS Messenger, build and run it on a real iPhone device.

Ready? let's get started. 

## Prerequisites
Before we dive into building and running a fully featured Messenger for iOS, ensure that you've read the following.

- The [first part of this tutorial](index.md) and Prerequisites mentioned there.
- [Get Started Guide]({{ '/documentation/get-started/' | relative_url }}).
- Tutorial on [Writing your First mesibo Enabled Application]({{ '/documentation/tutorials/first-app/' | relative_url }})
- XCode Installed
- An iPhone Device

## Downloading the Source Code
The latest code for the iOS Messenger is always updated and pushed on [messenger-app-ios repository](https://github.com/mesibo/messenger-app-ios){:target="_blank"}.

There are multiple ways of "downloading" code from GitHub.

### Clone the Repository (Recommended)
If you have git installed, this is a recommended approach as you can quickly sync and stay up to date with the latest version. This is also a preferred way of downloading the code if you decide to contribute to the project. 

To download, open a terminal and issue following commands:

    $ mkdir Messenger
    $ cd Messenger
    $ git lfs install
    $ git clone https://github.com/mesibo/messenger-app-ios.git

### Download the code as a zip file
You can also download the complete iOS Messenger source code as a zip file. Although simple, the downside of this approach is that you will have to download the complete source code every time it is updated on the repository. 

Click on the `Download` button to start downloading.

[Download](https://github.com/mesibo/messenger-app-ios/archive/master.zip){: target="_blank" class="button outline-btn" style="margin-bottom: 10px; margin-right: 100%"}

Once the download completes, unzip into a folder. 

{: .warning}
> WARNING! zip file will be quite large due to the inclusion of bitcode enabled frameworks. `git clone` is the recommended approach.

### Stay Up-to-date
Whatever approach you take to download the code, it is important to stay up-to-date with the latest changes, new features, fixes, etc. Ensure to **Star(*)** the project on GitHub to get notified whenever the source code is updated. 

<a class="github-button" href="https://github.com/mesibo/messenger-app-ios" target="_blank" data-icon="octicon-star" data-size="large" aria-label="Star mesibo/messenger-app-ios on GitHub">Star</a>

## Build and Run
In this part, we will build the code as it is and run the app. In the next section we will learn about customizing.

Building the code is as simple as:

 1. Launch Xcode
 2. Open the project from the folder where you have downloaded the code using the menu `File -> Open`
 3. Build using menu `Product -> Build`
 4. It may take a while to build the project for the first time. 
 5. Once the build is over, run on the device using the menu `Product -> Run`
 6. That's it, you should see the welcome screen like below.

Log in using your phone number. You can even start using the app you've just built to communicate with your family and friends. Cool isn't it?

### If you receive linker errors
If you receive linker errors, it means that **your download was incomplete**. One of the likely reason is that you forgot to issue `git lfs install`. There are two ways to fix:
  - Delete entire repository and download again (do not forget `git lfs install`, as instructed above). Note that enabling `git lfs install` after partial download does not seem to work as expected. 
  - OR, run `fetch_broken_download.sh` script 

  ```
  ./fetch_broken_download.sh
  ```

## Conclusion of part three

In this part, we have built and run the iOS Messenger app. 

In part 4, we will learn about customizing applications.

[On to Part 4 >>](customize.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
