---
description: Mesibo On-Premise Server
keywords: open, source, contributing, overview, on-premise
title: Installing & Running Mesibo On-Premise Server
---
Mesibo On-Premise solution allows you to run entire Mesibo solution in your own premise / data center. All the messages and calls goes through your own data center and stays in your own database. All you have to do it to download Mesibo on-premise server and run it in your own data center. That's it! 

Mesibo On-Premise is a perfect solution for sensitive data, or for that matter, all your data. Messenger is an open-source app with real-time messaging, voice and video call features. We have released the entire source code of Mesibo Android and iOS Apps on GitHub, where it can be continuously updated. You can download entire source code, and customize it to suit your needs. 

### Features
- All the mesibo features, including Messaging, Voice and Video calling
- Complete control over your data. All the messages and calls route through and stays in your own infrastructure. 
- Unlimited storage and data retention
- Unlimited Messages
- Private and public deployment
- Auto fallback to cloud as a backup, if requires. 
- Push notifications
- At no additional cost

### Prerequisites
Mesibo made it extremely simple for you to setup an On-Premise Messaging, Voice and Video call server. You only need to provide bare minimum infomation regarding your setup and network and rest will be taken care by Mesibo. 

Mesibo only requires following:

- Linux 64-bit server (or an instance) with at least 1GB free RAM. Mesibo supports all the major Linux distributions, including: 

	- RHEL or CentOS 7.x 

	- Ubuntu 16.x or 18.x

	- Fedora 28 or 29

	- Debian 9 or 10

	- SLES 15

	- Oracles Linux 7.x

- MySQL (or MariaDB) database 

### Assumptions
It is assumed that you are familar with:

- mesibo API and successfuly using Mesibo cloud services. If not, please refer to Mesibo basic started guide and tutorials before setting up On-Premise server.

- setting up a Linux server and MySQL database. If not, refer to online tutorials for the Linux distribution of your choice. 

- setting up Docker and using Docker images. If not, refer to excellent Docker documentation and various online tutorials on docker. 


## Step 1 - Install Docker
Mesibo On-Premise server is distributed as a docker image so that you can install it on most Linux distributions without worrying about any dependencies etc. All you need is to install Docker to run it. If you have already installed Docker on your server, you can skip to Step 2. 

You can install Docker by running the command below.

```
$ sudo curl -sSL https://get.docker.com/ | sh
```

Once Docker is installed, you need to start the Docker daemon. Most Linux distributions use `systemctl` to start services. If you
do not have `systemctl`, use the `service` command.

- **`systemctl`**:

  ```bash
  $ sudo systemctl start docker
  ```

- **`service`**:

  ```bash
  $ sudo service docker start
  ```

Once the installation is over, you can verify it by running 

```
$ sudo docker run hello-world
```

## Step 2 - Download Mesibo On-Premise Server Image
Download Mesibo On-Premise server by running the following command

```
$ sudo docker pull mesibo/mesibo
```

However, before we launch Mesibo, we need to setup a mesibo configuraiton file. 

## Step 3 - Configure Mesibo
Mesibo requires following configuration:

- Mesibo App Token, which you can get from Mesibo Console

- Database Information

- Your Hostname. All your users will connect to this hostname and hence ensure that it is correct.

- TLS/SSL Cerificate for your hostname [Optional but recommended]

All the mesibo configuration is stored in a configuration file `/etc/mesibo/mesibo.conf`. You can change the location of this file if requires.

Mesibo provides a simple script to generate initial configuration file. You can later edit this configuration file as required.

```
$ curl -fsSL https://raw.githubusercontent.com/mesibo/libmesibo/master/install.sh 
$ chmod a+x mesibo_config.sh
$ sudo ./mesibo_config.sh
```

TBD, we can set config flag to server so that we know what client has configured

## Step 3 - Configure TLS Certificate
Although Mesibo can automatically generate a self-signed certificate for you, it is recommended that you configure a valid certificate. You can use any existing ceriticate, OR Letsencrypt which is a free service OR any other provides of your choice to get a secure ceritificate. Note that, wild card certificate is not recommended. 

## Step 3 - Run Mesibo

```
docker run -v /etc/mesibo:/etc/mesibo -v /var/log/mesibo:/var/log/mesibo -p 5222:5222 -p 5228:5228 -p 80:80 -p 443:443 -p 4443:4443 -p 5443:5443 -p 513:513 -d mesibo/mesibo
```

## Step 3 - Firewall


## Step 3 - Group Management

