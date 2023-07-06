---
title: "Clone repository and run Docker"
metaTitle: "Setup | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

## Clone the starter

We've created a [starter](https://github.com/hasura/ai-workshop-hasuracon23/) for you to use as a base for this
tutorial. Clone the starter from GitHub:

```bash
git clone https://github.com/hasura/ai-workshop-hasuracon23.git
```

Then, head into the directory:

```bash
cd ai-workshop-hasuracon23
```

Next, we'll need to use `git-lfs` to pull down the large files in the repository. If you don't have `git-lfs`,
[install it globally](https://git-lfs.github.com/) and then run the following command to install it on the repository:

```bash
git lfs install
```

Next, pull down the large files:

```bash
git lfs pull
```

## Start the containers

Next, we'll need to start the containers for the application. We'll use Docker Compose to start the containers. From the
root of the repository, run the following commands in sequence:

```bash
docker load < hasura-image-arm64.tar.gz
docker load < weaviate-gdc-image-arm64.tar.gz
docker compose up -d
```

The first two commands will load the images for Hasura and VectorDB into Docker. The last command will start the
containers for the application. You should see output similar to the following after all of the containers have started:

```bash
⠿ Container ai-workshop-hasuracon23-weaviate-gdc    Started
⠿ Container ai-workshop-hasuracon23-postgres        Started
⠿ Container ai-workshop-hasuracon23-graphql-engine  Started
```

At this point, you're ready to shape your data and configure your Postgres instance!
