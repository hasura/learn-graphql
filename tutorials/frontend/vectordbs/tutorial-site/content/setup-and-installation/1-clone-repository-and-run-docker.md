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

## Set the right variable for your system

Our docker-compose file references a variable called `ARCH` which can be set to either `arm64` or `amd64`. This variable
is used to pull the right images for your system. If you're running on an M1 or M2 Mac, you'll want to set this variable
to `arm64`. If you're running on an Intel Mac, you'll want to set this variable to `amd64`:

```bash
# For M1/M2 Macs
export ARCH="arm64"
# For Intel Macs
export ARCH="amd64"
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
 ⠿ Container ai-workshop-hasuracon23-handlers-1        Started
 ⠿ Container ai-workshop-hasuracon23-postgres-1        Started
 ⠿ Container ai-workshop-hasuracon23-weaviate-gdc-1    Started
 ⠿ Container ai-workshop-hasuracon23-graphql-engine-1  Started
```

At this point, you're ready to shape your data and configure your Postgres instance!
