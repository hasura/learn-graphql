---
title: "Advanced PostgreSQL"
metaTitle: "Advanced PostgreSQL"
metaDescription: ""
---

Backup
------

PostgreSQL provides the pg_dump utility to simplify backing up a single database. This command must be run as a user with read permissions to the database you intend to back up.

Log in as the postgres user:

```
su - postgres
```

Dump the contents of a database to a file by running the following command. Replace dbname with the name of the database to be backed up.

```
pg_dump dbname > dbname.bak
```

The resulting backup file, dbname.bak, can be transferred to another host with scp or stored locally for later use.
To demonstrate restoring lost data, delete your example database and create an empty database in its place:

dropdb dbname
createdb dbname
Restore the database using psql:

psql test < dbname.bak
There are several options for the backup format:

*.bak: compressed binary format
*.sql: plaintext dump
*.tar: tarball
