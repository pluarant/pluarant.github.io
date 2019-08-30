---
description: Instructions for installing Mesibo on Linux
keywords: mesibo, install, linux
title: Instructions for installing Mesibo on Linux
toc_max: 4
---
Mesibo on Linux is available as a shared library(.so) which allows you to use it from any application OR languages of your choice like C, C++, Python, PHP, Matlab etc. 

## OS requirements
- CentOS / RedHat 7.x or above
- Debian 
- Ubuntu

### Install using the convenience script

Mesibo provides a convenience script for installing Mesibo on all the 
supported platforms. 

> **Warning**:
>
Always examine scripts downloaded from the internet before
> running them locally.
{:.warning}

```bash
$ curl -fsSL https://raw.githubusercontent.com/mesibo/libmesibo/master/install.sh | sudo bash -

<output truncated>
```

Please note the following points:

- The scripts require `root` or `sudo` privileges to run. Therefore,
  you should carefully examine and audit the scripts before running them.
- The scripts attempt to detect your Linux distribution and version and
  configure your package management system for you. 
- Convenience script overwrites existing mesibo version with the latest version 
  without any confirmation.


## Next steps

- Continue to [Download Sample Code for Linux](https://github.com/mesibo/samples/)

- Continue with the [User Guide]({{ '/documentation/get-started/' | relative_url }}).
