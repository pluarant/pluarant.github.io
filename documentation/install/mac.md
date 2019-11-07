---
description: Install Chat SDK on Mac OS. Mesibo Chat SDK is available as a shared library (.so) which allows you to use it from any application OR languages of your choice like C, C++, Python, PHP, etc.
keywords: chat sdk for mac, messaging sdk for mac, macos chat sdk, chat installation on macos, messaging app for mac
title: Chat SDK for Mac OS 
toc_max: 4
---
Mesibo on MacOS is available as a dynamic library(.dylib) which allows you to use it from any application OR languages of your choice like C, C++, Python, PHP, Matlab etc. 

## OS requirements
- MacOS 10.x or above

### Install using the convenience script

Mesibo provides a convenience script for installing Mesibo on all the 
supported platforms. 

> **Warning**:
>
Always examine scripts downloaded from the internet before
> running them locally.
{:.warning}

```bash
$ curl -fsSL https://mesibo.com/downloads/install.sh -o install-mesibo.sh
$ sudo sh install-mesibo.sh

<output truncated>
```

Please note the following points:

- The scripts require `root` or `sudo` privileges to run. Therefore,
  you should carefully examine and audit the scripts before running them.
- The scripts attempt to detect your OS version version and
  configure your package management system for you. 
- Convenience script overwrites existing mesibo version with the latest version 
  without any confirmation.


## Next steps

- Continue to [Download Sample Code for Mac](https://github.com/mesibo/samples/)

- Continue with the [User Guide]({{ '/documentation/get-started/' | relative_url }}).
