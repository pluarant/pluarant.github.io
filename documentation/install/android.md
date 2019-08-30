---
title: Getting Started with Mesibo on Android
description: Getting Started with Mesibo on Android
keywords: mesibo, installation, android
redirect_from:
- /installation/
---
<script src="https://api.mesibo.com/maven_versions.js?refresh"></script>
<script src="{{ '/js/api_versions.js' | relative_url }}"></script>

The most recent version of the mesibo Android SDK can be found on Maven Repository. You can install mesibo SDK into your Android Studio project just by adding gradle dependency and perform gradle sync (no manual download requires).


## Install Mesibo Core API SDK
Include following into dependencies section of your app build.gradle file, for example:

    dependencies {
        implementation 'com.mesibo.api:mesibo:version_api'
    }

You can then import mesibo in your project by

    import com.mesibo.api.mesibo;

### Install Mesibo UI and Voice/Video Calls Framework

Similarly, you can also install mesibo-ui and mesibo-calls framework as following:

    dependencies {
        implementation 'com.mesibo.api:ui:version_ui'
        implementation 'com.mesibo.api:calls:version_calls'
    }


### That's All!
You can now begin developing features with mesibo. Be sure you update these frameworks each time mesibo is updated.

> Mesibo UI SDK uses google map to send location, and hence in order to use that feature, you must be having your Google API key in the AndroidMenifest.xml - refer [how to get your google map api key and install it](https://developers.google.com/places/ios-api/start#step-2-install-the-api).

<script>
//populate_versions();
</script>
