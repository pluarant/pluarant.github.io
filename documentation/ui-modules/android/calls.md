---
description: Using Mesibo UI Modules for Android - Voice and Video Calls
keywords: open, source, on-premise, messaging, chat, voice, video
title: Using Mesibo UI Modules for Android - Voice and Video Calls
---
<script src="https://api.mesibo.com/maven_versions.js?refresh"></script>
<script src="{{ '/js/api_versions.js' | relative_url }}"></script>
Mesibo provides inbuilt UI for your audio and video calls. You just need to add dependencies, and you will be ready to make and receive calls using Mesibo. 

## Using Mesibo Calls Fragment


### Install Mesibo Calls API SDK
Include following into dependencies section of your app `build.gradle` file, for example:

```java
implementation 'com.mesibo.api:calls:version_calls'

```

### Initialize Mesibo calls
Initialize Mesibo Calls by adding the below code. This initializes the complete Mesibo call infrastructure and will automatically show any incoming voice or video calls.

```java
MesiboCall mesiboCall = MesiboCall.getInstance();
mesiboCall.init(this);
```

### Runtime Permissions
When you make or receive calls with Mesibo, it asks you to grant a few permissions which are required to place the call. 
> You need to give access to these permissions as the call functionality may not work without these.

#### Record Audio 
This permission is required to access the microphone and record your voice.

#### Record Video
This permission is required to access the camera to make video calls.


### Making Voice and Video calls

Making a voice or video calls using Mesibo is as simple as calling a function:

```java
call(Context context, long callId, Mesibo.UserProfile userProfile, boolean IsVideoCall)
```

Where,
- `Context` of the application
- `callId` unique random number which can be generated from `Mesibo.random()`
- `userProfile` profile of the user to who you are making a call
- `IsVideoCall` a flag to indicate a video or a voice call. `true` if placing a video call, `false` otherwise
	

```java
Mesibo.UserProfile userProfile = new Mesibo.UserProfile();
userProfile.name = "User name";
userProfile.address = "User address";
	
// Making audio call
MesiboCall.getInstance().call(MainActivity.this, Mesibo.random(), userProfile, false);

```

## Customization of Mesibo voice and video calls
Mesibo Calls uses fragments to display the call UI and to handle user actions. Mesibo has default calls UI implementation. However, before placing a call or showing incoming calls, `MesiboCall` object can request you to supply your own fragments. It does it by invoking a listener which you MUST implemnt if you plan to use your own UI. 

You can supply your own UI fragments by implementing `MesiboCall.MesiboCallListener` somewhere in your code. For example,


```java 
public class ExampleActivity extends AppCompatActivity implements MesiboCall.MesiboCallListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
	      setContentView(R.layout.activity_main);
	        
    }
    
    @Override
    public MesiboVideoCallFragment MesiboCall_getVideoCallFragment(Mesibo.UserProfile userProfile) {
       return null;
    }

    @Override
    public MesiboAudioCallFragment MesiboCall_getAudioCallFragment(Mesibo.UserProfile userProfile) {
        return null;
    }

    @Override
    public Fragment MesiboCall_getIncomingAudioCallFragment(Mesibo.UserProfile userProfile) {
      return null;
    }
}

```

and let Mesibo know about your listener by, 

```java
mesiboCall.setListener(this);
        
```

There are three listener functions which you must implement:

### MesiboCall_getIncomingAudioCallFragment
This is called when MesiboCall is about to display the incoming voice call. You should return an instance of `MesiboIncomingAudioCallFragment` to show your own incoming voice call UI. You should implement at least two buttons to `Accept` and `Decline` the call. You may also want to show the User name, address and profile picture of the user who is calling you.

### MesiboCall_getAudioCallFragment
This is called when MesiboCall is about to display the call in progress screen (the outgoing call or the screen after incoming call is accepted). You should return an instance of `Fragment` to show your own voice call UI. 

- `MesiboVideoCallFragment` - This fragment is loaded when you make or receive a video call. 

### MesiboCall_geVideoCallFragment
This is called when MesiboCall is about to display the incoming or outgoing video call. You should return an instance of `MesiboVideoCallFragment` to show your own video call UI. 

Below are the samples of how you can implement your own UI.


### Incoming Audio call
Create a custom fragment that extends `MesiboIncomingAudioCallFragment`

```java 
public class AudioIncomingFragment extends MesiboIncomingAudioCallFragment implements Mesibo.CallListener {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_audio_custom, container, false);
	    
	// initialize your fragment views, click handlers etc
        
	return view;
    }

    // Hangup handler
    public void callHangup() {
        hangup(); // call hangup from the super class
        getActivity().finish();
    }

    public void callAnswer() {
        answer(); // call answer from the super class
    }

    @Override
    public void onResume() {
        super.onResume();
        Mesibo.addListener(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        Mesibo.removeListener(this);
    }


    @Override
    public boolean Mesibo_onCall(long peerid, long callid, Mesibo.UserProfile profile, int flags) {
        return true;
    }

    @Override
    public boolean Mesibo_onCallStatus(long peerid, long callid, int status, int flags, String desc) {
        if ((status & CALLSTATUS_COMPLETE) > 0) {
            getActivity().finish();
        }
        return true;
    }

    @Override
    public void Mesibo_onCallServer(int type, String url, String username, String credential) {

    }
}


```

#### Return `AudioIncomingFragment` in `MesiboCall_getIncomingAudioCallFragment()`

In your activity where you have implemented `MesiboCall.MesiboCallListener` add below code to return your custom fragment.

```java

    @Override
    public Fragment MesiboCall_getIncomingAudioCallFragment(Mesibo.UserProfile userProfile) {
    
        AudioIncomingFragment audioIncomingFragment = new AudioIncomingFragment();
        audioIncomingFragment.setProfile(userProfile);

        return audioIncomingFragment;
    }
```


<img src="/images/ui-modules/android/audio_call.png" width="320" height="550">

That's it. Run your app and when you receive a voice call, you will see your custom fragment instead of the default fragment.

### Video call

Create a custom fragment that extends `MesiboVideoCallFragment`

```java 
public class VideoCallFragment extends MesiboVideoCallFragment implements Mesibo.CallListener, View.OnTouchListener {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View controlView = inflater.inflate(R.layout.fragment_videocall_custom, container, false);

	//Initialize view and click handlers

        // Add buttons click events.
        disconnectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                hangup();


            }
        });

        cameraSwitchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                switchCamera();
            }
        });

        videoScalingButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (scalingType == ScalingType.SCALE_ASPECT_FILL) {
                    videoScalingButton.setBackgroundResource(R.drawable.ic_fullscreen_white_48dp);
                    scalingType = ScalingType.SCALE_ASPECT_FIT;
                } else {
                    videoScalingButton.setBackgroundResource(R.drawable.ic_fullscreen_exit_white_48dp);
                    scalingType = ScalingType.SCALE_ASPECT_FILL;
                }
                ///callEvents.onVideoScalingSwitch(scalingType);
                scaleVideo(true);
            }
        });

        toggleSpeakerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                toggleSpeaker();
                boolean enabled = callEvents.onToggleSpeaker();
                toggleSpeakerButton.setAlpha(enabled ? 1.0f : 0.3f);
                callEvents.onToggleSpeaker();

            }
        });

        toggleMuteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                toggleMic();
                boolean enabled = callEvents.onToggleMic();
                toggleMuteButton.setAlpha(enabled ? 1.0f : 0.3f);
                callEvents.onToggleMic();

            }
        });

        toggleCameraButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                toggleCamera();
                boolean enabled = callEvents.onToggleCamera();
                //setButton(toggleCameraButton, enabled);
                toggleCameraButton.setAlpha(enabled ? 1.0f : 0.3f);
                callEvents.onToggleCamera();
            }
        });

        mDeclineViewButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                hangup();
            }
        });

        mAcceptViewButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                answer(true);
                setDisplayMode();
            }
        });

        return controlView;
    }

    @Override
    public void onResume() {
        super.onResume();
        Mesibo.addListener(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        Mesibo.removeListener(this);
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        callEvents = (OnCallEvents) activity;
    }

    @Override
    public boolean Mesibo_onCall(long peerid, long callid, Mesibo.UserProfile userProfile, int i) {
        return false;
    }

    @Override
    public boolean Mesibo_onCallStatus(long peerid, long callid, int status, int flags, String desc) {

        return false;
    }

    @Override
    public void Mesibo_onCallServer(int type, String url, String username, String credential) {

    }

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        return false;
    }
}

```

In your code where you have implemented `MesiboCall.MesiboCallListener`, add below code to return your custom fragment.

```java

    @Override
    public MesiboVideoCallFragment MesiboCall_getVideoCallFragment(Mesibo.UserProfile userProfile) {

        VideoCallFragment videoCallFragment = new VideoCallFragment();
        videoCallFragment.setProfile(userProfile);

        return videoCallFragment;
    }

```


<img src="/images/ui-modules/android/video_call.png" width="320" height="550">

That's it. Run your app and make Video calls. You will see your custom created fragment for video calls.


