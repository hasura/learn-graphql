---
title: "MS SQL Server on Mac with Docker"
metaTitle: "Installing MSSQL on Mac | MSSQL Tutorial"
metaDescription: "Learn how to install MSSQL Server on Mac by following this step by step instructions guide"
---

Follow this guide to install MS SQL Server on a Mac machine. You pull SQL Server 2019 container image from Docker and connect to the database with `sqlcmd` utility.

> MS SQL Server and `sqlcmd` utility is preinstalled in this container.

Prerequisite

* Mac OS
* [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop).
* Refer the common [Prerequisite](https://hasura.io/learn/database/microsoft-sql-server/installation/) section.
* Start the Docker engine on your Mac machine and log in with your DockerHub credentials.

## Pull and run the 2019 container image

1. Pull the SQL Server 2019 Linux container image from Microsoft Container Registry.

```bash
sudo docker pull mcr.microsoft.com/mssql/server:2019-latest
```

2. Next, run the container image

```bash
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong@Passw0rd>" \
   -p 1433:1433 --name mssql -h mssql \
   -d mcr.microsoft.com/mssql/server:2019-latest
```

Note that on modern Macs with Apple Silicon based processors you will likely get a message from Docker along the lines of:

`WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested`

To circumvent this you can navigate to Settings in your Docker Desktop and click Features in Development and check "Use Rosetta for x86/amd64 emulation on Apple Silicon.

Docker will restart and your containers should be running properly. 

3. To view your Docker containers, use the `docker ps` command.

```bash
docker ps
```

![MS SQL Container](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/linux/sql-container.png)

Your SQL Server container is successful if you see the status of 'Up' in the **STATUS** column.

## Connect to SQL Server

1. Start a bash shell inside the container

```bash
sudo docker exec -it mssql "bash"
```

![Start a bash shell](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/linux/connect-container.png)

The command takes you to the container prompt as shown in the screenshot above.

2. Next, connect locally with the database using the `sqlcmd` utility

```bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "<YourStrong@Passw0rd>"
```

![Connect with SQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/linux/connect-sql.png)
If successful, you should get to a `sqlcmd` command prompt: `1>`.

You can enter the T-SQL statements on this prompt.

To exit the `sqlcmd` utility, type `quit`.

### Manage Container

Type `exit` to leave the container and return to Mac prompt.

To remove your docker container and image, follow the steps in sequence:

* First stop the container - `docker stop mssql`
* Remove the stopped container:
   * To see all the stopped containers: `docker ps -a`
   * Now stop the container with its name: `docker rm mssql`
* Remove the image
   * Get a list of images: `docker images`. Identify and copy the mssql value from the `<IMAGE ID>` column.
   * `docker rmi <Image_Id>`.
