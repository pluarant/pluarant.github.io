---
title: Mesibo Backend APIs (Server-side APIs)
description: Mesibo backend APIs allows you to administer your account, manage apps, manage users and groups etc. Mesibo backend API is a REST based API which you can access using any language of your choice. 
keywords: chat api backend, server-side api guide, chat app backend references, mesibo backend api, php, rest api
redirect_from:
- /documentation/backend/
---
Mesibo backend APIs allows you to administer your account, manage apps, manage users and groups etc. Mesibo backend API is a REST based API which you can access using any language of your choice. 

### Mesibo Backend API URL

     https://api.mesibo.com/api.php

For maintaining privacy and security, Mesibo REST APIs can only be accessed over HTTPS.

### Parameters

Every REST request will have minimum two POST parameters

  1. operation (**op**), identifies the operation requested.
  2. Application token (**token**).  Application Token is a unique token for your application which your MUST not share with anyone including your users. You can get and change the app token from the [Mesibo Console](/console).

![]({{ '/api/images/regenerate-app-token.png' | relative_url }})

## Sample API Request and Response

    https://api.mesibo.com/api.php?op=userdel&token=123434343xxxxxxxxx&uid=456

The response is a JSON object with at least following fields, and other fields depending on the operation.
- **op**, requested operation
- **result**, true if successful, false otherwise
- **error**, error code if request failed

An example of a successful JSON response is as follows:

{% highlight javascript %}
{"account":
{"uid":"10","oid":"9","msgs":"0","users":"0","groups":"0","conns":"0",
"apps":"0","storage":"0","pid":"1","billday":"1","status":"0","flag":"0",
"expiry":"2020-09-01 22:38:45","issuetime":"2017-09-01 22:38:45"}, 
"op":"appadd",
"result":true
}
{% endhighlight %}

An example of a failed JSON response is as follows:

{% highlight javascript %}
{"op":"someop","result":false,"error":"BADOP"}
{% endhighlight %}

Mesibo backend APIs is broadly categorized into two categories:

  1. [Mesibo User Management APIs]({{ '/documentation/api/backend-api/#mesibo-user-management-apis' | relative_url }})

  2. [Mesibo Group Management APIs]({{ '/documentation/api/backend-api/#mesibo-group-management-apis' | relative_url }})

Following are the list of Mesibo REST APIs.

## User Management APIs

### Add a User / Regenerate a User Access Token 
To enable real-time communication between your users, you need to let mesibo know about each of your users. Mesibo will create an access token for each user and give it to you which you can send it to your users. Your user can then use this access token in [Mesibo Real-time APIs]({{ '/documentation/api/real-time-api/' | relative_url }}) using `setAccessToken` function. 

To add a user or to re-generate user access token, you need to invoke this API with the following parameters:

- **op** = "useradd"
- **token** = Application Token obtained from mesibo console
- **addr** = User Address (e.g phone number, email address, etc.)
- **appid** = Android app id or iOS Bundle id. The generated token will be applicable for the app with this appid only. For any other platform, you can pass a unique string identifying your application. 
- **expiry** = in minutes, default 1 year [Optional]
- **active** = enable user, default 1 (active) [Optional]
- **groups** = Maximum Groups [Optional]

Response Fields

    response[‘user’][‘uid’] = User ID (UID)
    response[‘user’][‘token’] = User Access Token

> You should save the created user information (UID, Address, Access Token, etc.) in your own database so that you can access them later.

### Edit a User 
Edit an existing user using the `UID` obtained from 'add user` operation.

- **op** = "userset"
- **token** = Application Token obtained from Mesibo console
- **uid** = User ID obtained in add user operation
- **flag** = Flags
- **active** = 1 to enable, 0 to disable

### Delete a User 
Delete an existing user using UID obtained from `add user` operation.

- **op** = "userdel"
- **token** = Application Token obtained from mesibo console
- **uid** = User ID obtained in add user operation

### Delete a User Access Token
Delete an existing user access token without deleting a user. User will be logged-out but will continue to receive messages which will be delivered when user logs-in next time with a new token.

- **op** = "userdel"
- **token** = Application Token obtained from mesibo console
- **uid** = User ID obtained in add user operation

### Get Users 
Get users for an application. This API is only for **development purpose** and hence maximum 20 users will be returned. You should store your users locally instead of obtaining from the Mesibo.

- **op** = "usersget"
- **token** = Application Token obtained from mesibo console
- **addr** = get users marching address. Wildcard (\*) allowed
- **count** = max number of users to get. Max 20

## Group Management APIs

### Create a Group 
Create a group to enable real-time **group communication** between your users. Mesibo will create a group ID (GID) which you can use to add and remove members. Your users can use GID in various real-time API to send messages to the group.

To create a group, you need to invoke this API with the following parameters:

- **op** = "groupadd"
- **token** = Application Token obtained from mesibo console
- **name** = Group Name [Optional]
- **flag** = Group Flags
- **expiry** = Expiry in seconds, default 1 year
- **expiryext** = Auto extend expiry on group activity, in seconds. Default disabled.
- **active** = 1 to enable, 0 to disable

Response Fields

    response[‘group’][‘gid’] = Group ID (GID)

> You should save the created group information (GID, name, etc.) in your own database so that you can access them later.

### Edit a Group 
Edit an existing group using GID obtained in the `group add` operation. 

- **op** = "groupset"
- **token** = Application Token obtained from mesibo console
- **gid** = Group ID (GID)
- **name** = Group Name [Optional]
- **flag** = Group Flags
- **expiry** = Expiry in seconds, default 1 year
- **expiryext** = Auto extend expiry on group activity, in seconds. Default disabled.
- **active** = 1 to enable, 0 to disable

Response Fields

    response[‘group’][‘gid’] = Group ID (GID)

### Delete a Group 
Delete an existing group using GID obtained in the `group add` operation. 

- **op** = "groupdel"
- **token** = Application Token obtained from mesibo console
- **gid** = Group ID (GID)

### Add or Remove Group Members
Add or Remove Group Members using GID obtained in the `group add` operation. 

- **op** = "groupeditmembers"
- **token** = Application Token obtained from mesibo console
- **gid** = Group ID (GID)
- **m** = comma-separated list of user addresses to add or remove in the group
- **delete** = 0 to add members, 1 to remove members

### Get Group Members
Get Group Members using GID obtained in the `group add` operation. 

- **op** = "groupgetmembers"
- **token** = Application Token obtained from mesibo console
- **gid** = Group ID (GID)
- **count** = max number of users to get. Max 20

Response Fields

    response[‘members’] = Group Members

## Message API
While your users can send messages to each-other or groups using Mesibo real-time APIs, you can also send messages to one of your users or group using backend API. 

To send a message, you need to invoke this API with the following parameters:

- **op** = "message"
- **token** = Application Token obtained from mesibo console
- **from** = From Address [MUST be a valid user]
- **to** = To Address
- **gid** = Group ID [Optional, either this or `to` field needs to be present]
- **type** = Message Type
- **expiry** = Expiry in seconds, default 1 year
- **msg** = Message

The response could be `OK` or `FAIL`.

### PHP Helper SDK

A PHP helper class for mesibo REST API is available [here](https://github.com/mesibo/samples/tree/master/php){:target="_blank"}

