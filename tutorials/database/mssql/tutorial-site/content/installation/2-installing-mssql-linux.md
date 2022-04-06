---
title: "MS SQL Server on Linux"
metaTitle: "Installing MSSQL on Linux | MSSQL Tutorial"
metaDescription: "Learn how to install MSSQL Server and connect to the server on Linux by following this step by step instructions guide"
---

This guide walks you through installing MS SQL Server 2019 on Ubuntu 16.04, and then connecting to the `sqlcmd` utility to run SQL queries on the database.

## Prerequisite

* Ubuntu 16.04 (either Ubuntu OS or a docker Ubuntu container)
* Also refer the common [Prerequisite](https://hasura.io/learn/database/microsoft-sql-server/installation/) section.

## Install MS SQL Server

1. Import the public repository GPG keys:

```bash
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
```

2. Register the Microsoft SQL Server Ubuntu repository for SQL Server 2019:

```bash
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/16.04/mssql-server-2019.list)"
```

> In case of an error with "missing add-apt-repository", install the package: "software-properties-common"
>
> `sudo apt-get update`
>
> `sudo apt-get install software-properties-common`

3. Run the following commands to install SQL Server:

```bash
sudo apt-get update
sudo apt-get install -y mssql-server
```
Select the geographic area and the timezone.

![MS SQL installed on Linux](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/linux/mssql-installed.png)

4. Run the following command to complete the Microsoft SQL Server setup.

```bash
sudo /opt/mssql/bin/mssql-conf setup
```

Choose your edition and a strong `sa` (system administrator) password.

On completion of the setup, you get the message: "Setup has completed successfully. SQL Server is now starting".

5. Once the configuration is done verify that the service is running:

```bash
systemctl status mssql-server --no-pager
```

![MS SQL Server running](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/linux/mssql-running.png)

The above message **Active: active (running)** confirms the installation.

At this point, SQL Server 2019 is running on your Ubuntu machine and is ready to use!

## Install the SQL Server command-line tools

In Ubuntu OS, you need to use the command-line tool `sqlcmd` to run Transact-SQL statements on the MS SQL database.

### Pre-requisite

Install curl on Ubuntu.

```bash
sudo apt-get update
sudo apt install curl
```

1. Import the public repository GPG keys.

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
```

2. Register the Microsoft Ubuntu repository.

```bash
curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list
```

3. Update the sources list and run the installation command with the unixODBC developer package.

```bash
sudo apt-get update
sudo apt-get install mssql-tools unixodbc-dev
```

4. Optional: Add /opt/mssql-tools/bin/ to your PATH environment variable in a bash shell.

```bash
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
```

### Connect locally to SQL Server Database Engine

Run `sqlcmd` utility as:

```bash
sqlcmd -S localhost -U SA -P '<YourPassword>'
```

where,

* `-S`: SQL Server name (localhost) to connect locally
* `-U`: user name (SA)
* `-P`: password entered during setup.

If successful, you should get to the `sqlcmd` command prompt: `1>`

You can now enter your T-SQL commands to connect and transact with the database from Linux.
