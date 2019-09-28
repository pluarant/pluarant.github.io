---
description: Using Mesibo UI Modules for Android - Messaging
keywords: open, source, on-premise, messaging, chat, voice, video
title: Using Mesibo UI Modules for Android - Messaging
---
Mesibo offers ready to use UI components which you can quickly add to your applications. Mesibo UI components are completely customizable as per your needs. On Android, Mesibo UI components are available as `Fragments`.

There are primarily two types of Mesibo UI components:

 - `MesiboUserListFragment`, which displays a list of users in different modes. The modes are explained below. 

 - `MesiboMessagingFragment`, which renders all the messages for a particular user or a group


## MesiboUserListFragment
 
`MesiboUserListFragment` displays a list of users in different modes. You need to pass the desired mode when starting the fragment.

The different modes for `MesiboUserListFragment` are:

 - `MesiboUserListFragment.MODE_MESSAGELIST` shows a list of latest messages, one per user, sorted by time
 
 - `MesiboUserListFragment.MODE_SELECTCONTACT` shows Mesibo Contact List - a list of Mesibo Users in the application
 
 - `MesiboUserListFragment.MODE_SELECTCONTACT_FORWARD` shows a list of users to whom you can forward message(s)      

 - `MesiboUserListFragment.MODE_SELECTGROUP` shows UI for selecting and creating a group 
 
 - `MesiboUserListFragment.MODE_EDITGROUP` shows UI for editing different attributes of a group such as - 
    Group Member List, Group Profile Picture, Group Title or Group Name 
 
Below are some examples showing how to load `MesiboUserListFragment` in different modes.

### Loading a Message List
Loads a list of latest messages, one per user, sorted by the time

```java
public class ExampleActivity extends AppCompatActivity implements MesiboMessageListFragment.FragmentListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
	setContentView(R.layout.my_layout);
    
	MesiboUserListFragment userListFragment = new MesiboUserListFragment();
	userListFragment.setListener(this);

	Bundle bl = new Bundle();
	bl.putInt(MesiboUserListFragment.MESSAGE_LIST_MODE, MesiboUserListFragment.MODE_MESSAGELIST);
	userListFragment.setArguments(bl);

	FragmentManager fm = getSupportFragmentManager();
	FragmentTransaction ft = fm.beginTransaction();
	ft.replace(R.id.userlist_fragment, userListFragment, "null");
	ft.commit();

    }
}
```

<img src="/images/ui-modules/android/message_liist.png" width="320" height="550">

### Loading a Contacts list
Similar to the above example, load the list of all contacts just by changing the mode, a new chat window will be opened when you click on a user or a group.

```java    
Bundle bl = new Bundle();
bl.putInt(MesiboUserListFragment.MESSAGE_LIST_MODE, MesiboUserListFragment.MODE_SELECTCONTACT);
userListFragment.setArguments(bl);

```

<img src="/images/ui-modules/android/new_contact.png" width="320" height="550">

### Loading a Forward List
Loads a list of users to forward one or more messages. It also shows recently contacted users. 

Following are the arguments to forward list

- `MesiboUI.MESSAGE_ID`- MESSAGE_ID is the unique ID of each message to be forwarded.
- `MesiboUI.MESSAGE_IDS` - Multiple messages can also be forwarded at a time by putting all the message Ids in an array.
- `MesiboUI.MESSAGE_CONTENT`- content of a message.  


```java    
Bundle bl = new Bundle();
bl.putInt(MesiboUserListFragment.MESSAGE_LIST_MODE, MesiboUserListFragment.MODE_SELECTCONTACT_FORWARD);
bl.putString(MesiboUI.MESSAGE_CONTENT, "This is forward message Test");
bl.putBoolean(MesiboUI.FORWARD_AND_CLOSE, false);
userListFragment.setArguments(bl);

```

<img src="/images/ui-modules/android/forward_mode.png" width="320" height="550">

### Loading Editing a Group 
This loads the fragment to edit a group. Group properties such as - Members, group name, etc can be edited from here

```java    
Bundle bl = new Bundle();
bl.putInt(MesiboUserListFragment.MESSAGE_LIST_MODE, MesiboUserListFragment.MODE_EDITGROUP);

userListFragment.setArguments(bl);

```

### Loading Select a Group
This loads the fragment to select a group.

```java
Bundle bl = new Bundle();
bl.putInt(MesiboUserListFragment.MESSAGE_LIST_MODE, MesiboUserListFragment.MODE_SELECTGROUP);

userListFragment.setArguments(bl);

```

## MesiboMessagingFragment 
`MesiboMessagingFragment` renders all the messages for a particular user or a group. All you have to go is to pass the `user address` or the `group ID`. It will read all the messages from the database and display them. It will also listen to new real-time messages and display them as and when received. 

### Using MesiboMessagingFragment

Load `MesiboMessagingFragment` from your activity by passing `MesiboUI.PEER` or `MesiboUI.GROUP_ID` in a bundle. 

- `MesiboUI.PEER` - User Address
- `MesiboUI.GROUP_ID` - Group id

You can also pass additional arguments if requires:

- `MesiboMessagingFragment.READONLY` - This is a boolean argument.  Pass `true` to hide the interface to send messages, making the window read-only.

- `MesiboMessagingFragment.SHOWMISSEDCALLS` - Pass `true` if you want to display the alert for missed calls. Default true.


```java

MesiboMessagingFragment mFragment = new MesiboMessagingFragment();

Bundle bl = new Bundle();
bl.putString(MesiboUI.PEER, "+15675551234");
bl.putLong(MesiboUI.GROUP_ID, 0);
mFragment.setArguments(bl);

getSupportFragmentManager().beginTransaction()
	.add(R.id.fragment_container, mFragment).commit();

```

<img src="/images/ui-modules/android/new_message_fragment.png" width="320" height="550">

## Customizing Message Rendering

In the above example, `MesiboMessagingFragment` renders all the messages using a default layout. Although the default layout beautifully meets the requirements of the most, it also allows you to customize each and every message if requires. 

There are essentially three basic elements that form a chat window are

- **Incoming chat view**
Incoming chat view renders all the received messages. By default, it is shown on the left side of the screen. 

- **Outgoing chat view**
Outgoing chat view renders all the outgoing and sent messages. By default, it is shown on the right side of the screen. It is similar to incoming chat view but additinally shows message status. 

- **Data view**
Data view renders non-message data like date, missed calls etc. By default, it is shown in the center of the screen.

By default, `MesiboMessagingFragment` renders using a default layout. However, you can instruct `MesiboMessagingFragment` to let you ask before rendering the message. So if you decide to take over the rendering of a particular message(s), `MesiboMessagingFragment` will let you render them instead of handling itself. And this is very easy, all you have to do is to listen to `MesiboRecycleViewHolder listener` as explained below:

```java
public class MessagingUiFragment extends MesiboMessagingFragment implements MesiboRecycleViewHolder.Listener {
	
	@Override
	public int Mesibo_onGetItemViewType(Mesibo.MessageParams messageParams, String message) {

		return MesiboRecycleViewHolder.TYPE_NONE;
	}

	@Override
	public MesiboRecycleViewHolder Mesibo_onCreateViewHolder(ViewGroup viewGroup, int viewType) {
			return null;
	}

	@Override
	public void Mesibo_onBindViewHolder(MesiboRecycleViewHolder mesiboRecycleViewHolder, int viewType, boolean selected, Mesibo.MessageParams messageParams, Mesibo.MesiboMessage mesiboMessage) {

	}

	@Override
	public void Mesibo_UpdateViewHolder(MesiboRecycleViewHolder mesiboRecycleViewHolder, Mesibo.MesiboMessage mesiboMessage) {

	}

	@Override
	public void Mesibo_onViewRecycled(MesiboRecycleViewHolder mesiboRecycleViewHolder) {

	}
}
```
As you can notice, above methods are very similar to RecyclerView adapter methods. Now, we will look into each of these methods.

### Mesibo_onGetItemViewType
You need to return the type of the message if you are handling the message. return `TYPE_NONE` otherwise. 

```java
if (messageParams.isIncoming()) {
	return MesiboRecycleViewHolder.TYPE_INCOMING;
}

return MesiboRecycleViewHolder.TYPE_OUTGOING;
```

### Mesibo_onCreateViewHolder
Mesibo UI will call this function with each message. If you plan to render that message yourself, you need to return a view holder derived from `MesiboRecycleViewHolder`. If not, return `null` for the default rendering.

```java
if (MesiboRecycleViewHolder.TYPE_INCOMING == type) {
	View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.incoming_chat_layout, viewGroup, false);

	return new IncomingMessgaeViewHolder(v);

}

return null;
```

### Mesibo_onBindViewHolder()

This method binds the returned view with the message content.

```java
if (MesiboRecycleViewHolder.TYPE_INCOMING == type) {

	IncomingMessgaeViewHolder IncomingView = (IncomingMessgaeViewHolder) mesiboRecycleViewHolder;
	IncomingView.mIncomingMessageTV.setText(Html.fromHtml(mesiboMessage.message));

}
```

### Creating the ViewHolder
Below is a sample view holder extending `MesiboRecycleViewHolder`

```java
public class IncomingMessgaeViewHolder extends MesiboRecycleViewHolder {
	View mViewIncomingMessage;
	...

	public IncomingMessgaeViewHolder(View v) {
		super(v);
		mIncomingMessageTV = v.findViewById(R.id.textview_message);
		mViewIncomingMessage = v;
	}
}
```

## Changing Default Texts and other UI elements
`MesiboUI.Config` allows you to change default texts and other UI elements to suit your need. 

```java
public static class Config {
	public Bitmap contactPlaceHolder = null;
	public Bitmap messagingBackground = null;
	public boolean useLetterTitleImage = true;
	public boolean enableVoiceCall = false;
	public boolean enableVideoCall = false;
	public boolean enableForward = true;
	public boolean enableSearch = true;
	public boolean enableBackButton = false;
	public String messageListTitle = "Messages";
	public String userListTitle = "Contacts";
	public String createGroupTitle = "Create a New Group";
	public String modifyGroupTitle = "Modify Group details";
	public String selectContactTitle = "Select a contact";
	public String selectGroupContactsTitle = "Select group members";
	public String forwardTitle = "Forward To";
	public String userOnlineIndicationTitle = "online";
	public String onlineIndicationTitle = null;
	public String offlineIndicationTitle = "Not connected";
	public String connectingIndicationTitle = "Connecting...";
	public String noNetworkIndicationTitle = "No Network";
	public String emptyUserListMessage = "No Messages";
	public boolean showRecentInForward = true;
	public boolean mConvertSmilyToEmoji = true;
	public int[] mLetterTitleColors = null;
	public int mToolbarColor = 0;
	public int mStatusbarColor = 0;
	public int mToolbarTextColor = 0;
	public int mUserListTypingIndicationColor = -11953852;
	public int mUserListStatusColor = -7960954;
	public long mTypingIndicationTimeMS = 10000L;
	public long mMaxImageFileSize = 307200L;
	public long mMaxVideoFileSize = 20971520L;
	public boolean mEnableNotificationBadge = true;

	public Config() {
	}
}
```

All you have to do is to get the config instance and change necessary variable.

```java
MesiboUI.Config config = MesiboUI.getConfig();
config.messageListTitle = "New Messages";

```






