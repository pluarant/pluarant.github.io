---
title: Mesibo Real-time APIs - User &amp; Group Profile Management
description: Mesibo Real-time APIs - User &amp; Group Profile Management
keywords: mesibo, real-time api, messaging API, chat API, voice SDK, video SDK
---
{% include_relative nav.html selected="profiles" %}

A profile allows you to associate human readable information such as name, picture, status, presence information, etc. with a user or a group.

Note that:

  - Mesibo does not do anything with profiles other than maintaining registry and setting profile fields in `MessageParams` every time a message is received from a user and a group for which a profile is set. You can create a profile for every users or groups. 

  - Mesibo does not know or fetch any users or groups from your servers. You need to do it yourself and let Mesibo know about it using `setProfile` API. 

Mesibo manages each profile using `UserProfile` object. You can set various information like user or group name, picture, status, presence information, etc.

Following are the User and Group Profile management APIs.

### createProfile
Create a user or a group profile. You also need to call `setProfile` for Mesibo to register this profile. 

It takes the following parameters:

  - **name**, User or Group Name
  - **groupid**, Group ID for group profile, 0 otherwise
  - **address**, User address for user profile, NULL (or nil) otherwise

### setProfile
Adds or updates a user or a group profile in the Mesibo registry. Once the profile is `set` for a user or a group in the registry, it will be set in `MesiboParams` everytime a new one-to-one or a group message is received from the user. 

It takes the following parameters:

  - **profile**, `UserProfile` Object

### getProfile
Returns a user or a group profile. 

It takes the following parameters:

  - **groupid**, Group ID for group profile, 0 otherwise
  - **address**, User address for user profile, NULL (or nil) otherwise

### deleteUserProfile
Delete a user profile

It takes the following parameters:

  - **groupid**, Group ID for group profile, 0 otherwise
  - **address**, User address for user profile, NULL (or nil) otherwise

### setSelfProfile
This is special profile to identify the `self` user. 

It takes the following parameters:

  - **profile**, `UserProfile` Object

### getSelfProfile
Returns self profile set in `setSelfProfile`. 

It takes no parameters.

### getProfiles
Returns all the profiles from the registry in an array.                          

It takes no parameters.


### getSortedUserProfiles
Returns all the profiles sorted by name in an array.                           

It takes no parameters.

### getRecentProfiles
Returns all the recent profiles. Recent profile is the one to whom a message was send or received recently.                          
It takes no parameters.

### getUserProfilePicturePath
Returns absolute path of profile picture

It takes no parameters.

### startUserProfilePictureTransfer
Start a profile picture transfer, handled by `FileTransferHandler`

It takes the following parameters:

  - **profile**, `UserProfile` Object

### deleteUserProfilePicture
Delete a profile picture

It takes the following parameters:

  - **profile**, `UserProfile` Object

[Utility APIs >>](utility.md){: class="button outline-btn" style="margin-bottom: 30px; margin-right: 100%"}
