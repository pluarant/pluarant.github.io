## Run Mesibo anywhere
Mesibo supports almost all popular platforms and languages for you to quickly build your applications. Whether you are developing mobile apps (Android, iOS, Java, Objective-C, C++), web apps (Javascript), integrating with backend (Linux, MacOS, Windows, Python, C++) or creating cool devices using Raspberry PI, mesibo has APIs for you.

<div class="component-container">
    <!--start row-->
    <div class="row">
	{% include content/platform.md url='/documentation/install/android/' img='/images/platform/android-logo.png' title='Mesibo for Android' content='The Mesibo SDK for Android is the easiest way to add real-time messaging, video and voice calls into your Android apps.' id='docker-for-android' %}
	{% include content/platform.md url='/documentation/install/ios/' img='/images/platform/apple_48.svg' title='Mesibo for iOS' content='The Mesibo SDK for iOS is the easiest way to add real-time messaging, video and voice calls into your iOS  apps.' id='docker-for-ios' %}
	{% include content/platform.md url='/documentation/install/javascript/' img='/images/platform/js_logo_96.png' title='Mesibo for JavaScript' content='The Mesibo SDK for JavaScript is the easiest way to add real-time messaging, video and voice calls into your web  apps.' id='docker-for-js' %}
    </div>
    
    <div class="row">
	{% include content/platform.md url='/documentation/install/linux/' img='/images/platform/linux_96.png' title='Mesibo for Linux' content='Install Mesibo on Linux to use it from varities of applications, backend and languages like C++, Python, PHP etc.' id='docker-for-linux' %}
	
	{% include content/platform.md url='/documentation/install/mac/' img='/images/platform/macos_96.png' title='Mesibo for Mac OS' content='Install Mesibo on Mac to use it from varities of applications, backend and languages like C++, Python, PHP etc.' id='docker-for-mac' %}
	
	{% include content/platform.md url='/documentation/install/windows/' img='/images/platform/windows_48.svg' title='Mesibo for Windows' content='Install Mesibo on Windows to use it from varities of applications, backend and languages like C++, Python, PHP etc.' id='docker-for-windows' %}
    </div>
    <div class="row">
	{% include content/platform.md url='/documentation/install/raspberry-pi/' img='/images/platform/raspberry_96.png' title='Mesibo for Raspberry Pi' content='Instantly add real-time communication on your embedded devices by using Mesibo on Raspberry Pi device.' id='docker-for-pi' %}
    </div>

	<!-- template
        <div class="col-sm-12 col-md-12 col-lg-4 block">
            <div class="component">
                <div class="component-icon">
                    <a href="{{ '/documentation/install/android/' | relative_url }}"> <img src="{{'/images/platform/android-logo.png' | relative_url }}" alt="Mesibo for Android"> </a>
                </div>
                <h3 id="docker-for-mac"><a href="{{ '/documentation/install/android/' | relative_url }}">Mesibo for Android</a></h3>
                <p>A native application using the macOS sandbox security model which delivers all Mesibo tools to your Mac.</p>
            </div>
        </div>
	-->
