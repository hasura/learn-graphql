---
title: "Connect Hasura | Fullstack VectorDB Tutorial"
metaTitle: "Connect Hasura | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

You can write introductory text here.

## Getting started
As a first step, you need to ensure you have ![Git's Large File Storage](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage) extension installed before cloning the repository.

```
brew install git-lfs
git lfs install
```

Next, clone the pre-built Hasura image from ![GitHub Repo]( https://github.com/hasura/ai-workshop-hasuracon23/tree/main.). The image comes with Weaviate driver baked into it. At the moment we only support ARM64 platform.


```
git clone git@github.com:hasura/ai-workshop-hasuracon23.git
git lfs pull
docker load < hausra-image-arm64.tar.gz
docker load < weaviate-gdc-image-arm64.tar.gz
docker compose up
```

Amazing, after this step you should be able to load Hasura console locally at ` http://localhost:8080/console`.

## Connecting databases with Hasura
### Connecting application database
Connecting application database is very simple, Hasura supports connectors to most of the databases. Go to `Data` tab and click on `Connect Database`.
<connect_postgres_db.png>
Select Postgres from list of connectors and click `Connect Existing Database`.

Give your database an identifiable name, lets say <>.
Provide the path to your postgres db, in our case we have a postgres running as part of the docker-image that we downloaded. So, we will connect using environment variable `HASURA_GRAPHQL_METADATA_DATABASE_URL`. You can find this environment variable in `docker-compose`.

Finish by clicking `Connect Database`.

#### Let us create tables and assume they were always there ;)
For this usecase we need to create 2 tables - Candidate and Application.
Candidate table holds basic information for the candidate who is applying and Application table holds the information like the resume link, hiring manager etc.

To create a table, click `Databases` on left hand panel. Click `Manage` next to the database of interest and click `Create Table`. This would open up an interface for us.

Create a new table named `candidate`. Add the following columns:
```
- id, which be of type integer (auto-increment)
- name, which is of type text
- email, which is also text
```
<add_candidate_table.png>
Set the `id` as the primary key and click `Add Table`. 
Repeat the process for the `application` table using these columns:

```
id, of type text
candidate, of type integer
candidate_id, of type integer
resume_url, of type text
hiring_manager of type text
```
<add_application_table.png>

#### Let's track our Postgres tables
Tracking tables lets GraphQL engine know that you want to query them using Graph Query Language (GQL). Let us track both the tables, Candidate and Application.

### Connecting vector database
With Hasura and our data sorted, we need to vectorize things! We're going to use a vector database called Weaviate.
Let us setup a Weaviate cluster. You can create a free 14-day cluster on Weavite. 
Head to [Weaviate Console](https://console.weaviate.cloud/) and register for an account. After confirming via email, click `+ Create cluster` and fill in a name before clicking `Create`. Once Weaviate has provisioned your sandbox cluster, proceed to the next step.

#### Creating Schema and loading data into Weaviate
In the repository, follow notebook `scripts/2_vectordb_setup.ipynb` to explore resume data and create the Resume schema.

#### Setup Weaviate agent
Back in the Hasura Console, head to `Data` and add the Weaviate agent as shown in the image.
<setup_weaviate_agent.png>

#### Let's track our Schema
Under `Data` > `Resumes`, track the Resume table:
<track_resume_schema.png>

## Defining Remote Relationship
As the name goes, by definining this relation across databases you will be able to join and query the data of these tables.
 
Define a remote relationship from your vector db to your relational database as shown in the screenshot below - 
<create_rdb_vdb_relationship.png>

All in all, if your Console looks like this — you should be set 🎉
<final_setup_image.png>