---
title: "Get Started, Part 3: Group Messaging"
keywords: messages, messaging, group messaging, fan-out
description: Learn about group messaging and it's properties.
---
{% include_relative nav.html selected="gmsg" %}

## Prerequisites

- Read the Introduction in [Part 1](index.md).

- Learn about Messaging and it's properties in [Part 2](messaging.md).

## Introduction

In part 3, we will learn about group messaging in mesibo. With group messaging, you can send a single message to multiple users belonging to a group in **one-shot**. Group messaging is an extremely poweful, useful and popular feature.  

However, before proceeding further, ensure that you have read the Prerequisites above. 

## Group Messaging

What if you have to send a message to multiple users ? One solution is to send same message to each user one by one. So if you have N users, you will have to send a message N times. This is not only ineffective but unmanageable. Imagine, you have to recall or delete or reference this message, you will have to do it for all N individual messages.

Instead, mesibo allows you a create a set of users as a group. Once you create a group, all you have to do is to send a single message to the group and mesibo will automatically send that message to all the users in the group. Very simple! You can create group of any size without any restrictions.  

### Group Types

Group is a very powerful way to communicate with set of users. There are various kind of group messaging possible, just to categorize a few: 

- **Normal Group**: any user can send and receive messages to a group.

- **Restricted Group**: only selected users can send messages to a group and selected users can receive messages from the group. Senders and receivers can be a disjoint set.

- **Broadcast Group**: only admin can send messages to the group.

- **Public Rooms**: anyone can message, even non-members.

- **Round-robin (hunt) Group**: only one user from the group will receive the message in round robin fashion. This is quite useful for creating specialized groups; for example, in a group of support staff, only one of them will receive a message from customer.

Mesibo supports all such and more group types which you can specify at the time of group creation and modify at any point in time later. However, instead of hardcoding group types, mesibo allows you to specify sending and receiving behavior of the group and individual group members for greater flexibility, for example,

- Anyone can send
- Members can send
- Only selected members can send
- Only Selected Members can receive
- Members can receive
- One of the active member can receive, etc

You can dynamically change the group or the member behavior at any point in time and it will be instantly applied to the group or group member(s).

## Conclusion of part three

That's all for this page. In the next section, we learn how to enable **voice and video calling** between your users. 

[Continue to Part 4 >>](voice-video-calls.md){: class="button outline-btn"}

