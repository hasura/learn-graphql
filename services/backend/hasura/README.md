## Todo App Migrations

Update `config.yaml` to point to the right `graphql-engine` endpoint with/without `admin_secret`.

Run the following command in the console:
```bash
$ hasura migrate apply
```
This will apply the migrations and metadata.
