---
title: "Restore Database"
metaTitle: "Restore a SQL Server database | MSSQL Tutorial"
metaDescription: "This page is a quick start that covers how to restore a database."
---

In this section, you will restore a database from a backup file into your SQL Server database.

## Pre-requisite

* MSSQL Server
* SQL Server Management Studio (SSMS)
* A database restore file stored in the default backup location. ( As explained in the download sample database section of the [select page](https://hasura.io/learn/database/microsoft-sql-server/core-concepts/t-sql-statements/4-select/) ).

## Restore a database

1. Open SQL Server Management Studio (SSMS), and connect to your database.
1. In **Object Explorer** on the left, right-click **Databases > Restore Database...** to launch the **Restore Database** wizard.

   ![restore](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/restore/restore-database.png))

1. Select **General > Device**.
1. Select the 3 eclipses `...` next to Device.

    ![select](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/restore/select-backup.png)

1. Locate the `AdventureWorks2019.bak` file from the default location, and click **OK**.

    ![backup created](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/restore/backup-created.png)

1. Select **Add** to add the **Backup media** file.
1. Click **OK** to confirm your database backup selection and return to the main wizard.

    ![Complete](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/restore/complete-restore.png)

1. Select **OK** to restore your database.

**AdventureWorks2019** sample database is now available in the **Object Explorer**.
