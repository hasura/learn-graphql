---
title: "MySQL on Linux"
metaTitle: "Installing MySQL on Linux | MySQL Tutorial"
metaDescription: "Learn how to install and setup MySQL on a Linux distribution like Ubuntu with step by step instructions"
--- 

## Installing MySQL Server on Ubuntu

```bash
sudo apt-get update

sudo apt-get install mysql-server
```

The below command can be used to install MySQL if the above command does not work

```bash
sudo mysql_secure_installation utility
```

## Allow remote access to the application

The below command can be used to allow remote access to the mysql server:

```bash
sudo ufw enable

sudo ufw allow mysql
```

## Open the MySQL application

The below command will start the MySQL application

```bash
sudo systemctl start mysql
```

## Start the MySQL shell

The below command starts the MySQL shell

```bash
/usr/bin/mysql -u root -p
```

## Installing MySQL Workbench

Step 1: Download - The URL to download is:  https://dev.mysql.com/downloads/repo/apt/.

Download the &#39;mysql-apt-config_0.8.15-1_all.deb&#39;

Click on the Download option.

Step 2: Installation of MySQL Workbench

Use the below command to add the MySQL repository URLs in the sources list so that the software can be installed in the right directory.

```bash
sudo apt install ./mysql-apt-config_0.8.16-1_all.deb
```

Step 3: Update apt-cache

Update the cache using the below command to update the configuration URLs.

sudo apt update

Step 4: Installing MySQL Workbench on Ubuntu

Install MySQL workbench using the repository using the below command

```bash
sudo apt install mysql-workbench-community
```

Step 5: Launch MySQL Workbench

Once the installation is completed, launch MySQL using the below command

```bash
mysql-workbench
```
