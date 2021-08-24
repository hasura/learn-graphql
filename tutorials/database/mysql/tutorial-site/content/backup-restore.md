---
title: "Backup & Restore"
metaTitle: "Backup & Restore | MySQL Tutorial"
metaDescription: "Learn how to take MySQL database backups and also step by step commands on how to restore a database in MySQL"
---

It is important to make regular backups of all data in case of any loss.

To back up a MySQL database, the general syntax is:

**sudo mysqldump -u [user] -p [database_name] \&gt; [filename].sql**

- Replace [user] with the username and password (if needed).
- The [database_name] is the path and filename of the database.
- The \&gt; command specifies the output.
- [filename] is the path and filename you want to save the dump file as.

To back up an entire Database Management System:

**mysqldump --all-databases --single-transaction --quick --lock-tables=false \&gt; full-backup-$(date +%F).sql -u root -p**

To back up more than one database in the backup dump file:

**sudo mysqldump -u [user] -p [database_1] [database_2] [database_etc] \&gt; [filename].sql**

**Restoring MySQL with mysqldump**

**Step 1:** Create New Database

On the system that hosts the database, use MySQL to create a new database.

Make sure the backup is named the same as the database which is lost. This creates the foundation file that mysqldump will import the data into. Since the dump file has the commands to rebuild the database, only the empty database needs to be created.

**Step 2:** Restore MySQL Dump

To restore a MySQL backup, enter:

**mysql -u [user] -p [database_name] \&lt; [filename].sql**

Make sure to include [database_name] and [filename] in the path.

On the host machine, [database_name] can be in a root directory, so it may not be necessary to add the path. Make sure that the exact path for the dump file which is being restored is specified, including server name (if needed).

select restaurants.res_id, restaurants.res_name, count(orders.order_id), sum(orders.amount)

from orders inner join restaurants on orders.res_id=restaurants.res_id

group by dt order by sum(orders.amount);
