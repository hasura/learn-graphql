---
title: "Clone the Repo"
metaTitle: 'Clone the Repo | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

You can use this course by following this guide but you can also
[clone the finished repo](https://github.com/hasura/ndc-typescript-learn-course) to see the finished result in 
action straight away. Or, to follow along starting from a skeleton project, clone the repo and checkout the  
`follow-along` branch:

```shell
# If using GitHub with SSH
git clone git@github.com:hasura/ndc-typescript-learn-course.git
# OR if using GitHub with HTTPS
git clone https://github.com/hasura/ndc-typescript-learn-course.git
```

To checkout the `follow-along` branch:
```shell
git checkout follow-along
```

Then install the dependencies:
```shell
npm install
```

You can build and run the connector, when you need to, with:
```shell
npm run build && node dist/index.js serve --configuration .
```

However, you can run nodemon to watch for changes and rebuild automatically:

```shell
npm run watch
```

[//]: # (TODO: Cannot find more information about the configuration file creation and usage.)

_Note: the configuration.json file is a pre-configured file which gives the connector information about the data 
source._