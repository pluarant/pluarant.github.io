---
title: Mesibo Server Side API
description: Mesibo Server Side API
keywords: mesibo, installation, ios, address, peer
redirect_from:
- /installation/
---
The mesibo server side REST API allows you to administer your account, manage apps, manage users and groups, send messages etc.

### mesibo API URL

     https://api.mesibo.com/api.php

For maintaining privacy and security, the mesibo REST API can only be accessed over HTTPS.

### Authentication

Every REST request will have minimum two POST parameters

  1. operation (op), identifies the operation requested.
  2. Application token (token).  Application Token is a unique alphanumeric identifier with your application. You can view and change the app token from the mesibo Console.

![]({{ '/api/images/regenerate-app-token.png' | relative_url }})

## Sample API Request and Response

    https://api.mesibo.com/api.php?op=userdel&token=1234343434341212612812&uid=456

The response is a JSON object with at least following fields, and other fields depending on the operation.
- op, operation
- result, true if successful, false otherwise
- error, error code if request failed

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

Mesibo admin API is broadly categorized into two categories:

  1. [Mesibo User Management APIs]({{ '/documentation/api/server-side-api/#mesibo-user-management-apis' | relative_url }})

  2. [Mesibo Group Management APIs]({{ '/documentation/api/server-side-api/#mesibo-group-management-apis' | relative_url }})

Following are the list of Mesibo REST APIs.

## Mesibo User Management APIs

### Add a User / Regenerate access token
To enable real-time communication between your users, you need to let mesibo know about each of your users. Mesibo will create an access token for each user and give it to you which you can send it to your users. Your user can then use this access token in real-time API using `setAccessToken` function. 

To add a user or re-generate access token, you need to invoke this API with following parameters:

- **op** = "useradd"
- **token** = Application Token obtained from mesibo console
- **addr** = User Address (e.g phone number, email etc)
- **appid** = Android app id or iOS Bundle id. The generated token will be applicable for the app with this appid only. For any other platform, you can pass anything. 
- **expiry** = in minutes, default 1 year [Optional]
- **active** = enable user, default 1 (active) [Optional]
- **groups** = Maximum Groups [Optional]

Response Fields

    response[‘user’][‘uid’] = User ID (UID)
    response[‘user’][‘token’] = User Access Token

### Edit a User 
Edit an existing user using UID obtained in add user operation.

- **op** = "userset"
- **token** = Application Token obtained from mesibo console
- **uid** = User ID obtained in add user operation
- **flag** = Flags
- **active** = 1 to enable, 0 to disable

### Delete a User 
Delete an existing user using UID obtained in add user operation.

- **op** = "userdel"
- **token** = Application Token obtained from mesibo console
- **uid** = User ID obtained in add user operation

### Delete a User Token
Delete an existing user token without deleting user. User will be logged-out but will continue to receive messages which will be delivered when user logs-in next time with new token.

- **op** = "userdel"
- **token** = Application Token obtained from mesibo console
- **uid** = User ID obtained in add user operation

### Get Users 
Get users for an application. This API is only for development purpose and hence maximum 20 users will be returned. You should store your messages locally instead of obtaining from mesibo.

- **op** = "usersget"
- **token** = Application Token obtained from mesibo console
- **addr** = get users marching address. Wildcard (\*) allowed
- **count** = max number of users to get. Max 20

## Mesibo Group Management APIs

### Add a Group 
Add a group to enable real-time group communication between your users. Mesibo will create a group ID (GID) which you can use to add/remove members. Your users can use GID in various real-time API to send messages to the group.

To add a group, you need to invoke this API with following parameters:

- **op** = "groupadd"
- **token** = Application Token obtained from mesibo console
- **name** = Group Name [Optional]
- **flag** = Group Flags
- **expiry** = Expiry in seconds, default 1 year
- **expiryext** = Auto extend expiry on group activity, in seconds. Default disabled.
- **active** = 1 to enable, 0 to disable

Response Fields

    response[‘group’][‘gid’] = Group ID (GID)

### Edit a Group 
Edit an existing group using GID obtained in group add operation. 

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
Delete an existing group using GID obtained in group add operation. 

- **op** = "groupdel"
- **token** = Application Token obtained from mesibo console
- **gid** = Group ID (GID)

### Add or Remove Group Members
Add or Remove Group Members using GID obtained in group add operation. 

- **op** = "groupeditmembers"
- **token** = Application Token obtained from mesibo console
- **gid** = Group ID (GID)
- **m** = comma separated list of members to add or remove
- **delete** = 0 to add members, 1 to remove members

### Get Group Members
Get Group Members using GID obtained in group add operation. 

- **op** = "groupgetmembers"
- **token** = Application Token obtained from mesibo console
- **gid** = Group ID (GID)
- **count** = max number of users to get. Max 20

Response Fields

    response[‘members’] = Group Members

### PHP Helper SDK

A PHP helper class for mesibo REST API is available at **< link >**.

