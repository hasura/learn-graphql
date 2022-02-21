---
title: "Install Dependencies"
metaTitle: "Install Dependencies | Remix Firebase Hasura Tutorial"
metaDescription: "You will setup a solid foundation for your Remix app"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/package.json" text="package.json" />

1. In our `package.json` we'll add the dependencies for our app make sure everything is the latest version, and modify the scripts section. Please copy the package.json from the Github link to your folder.

2. Run `npm install`

3. Add a `.eslintrc.json` file to the root of the project.

   ```json
   {
     "root": true,
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint"],
     "extends": [
       "eslint:recommended",
       "@remix-run/eslint-config",
       "plugin:@typescript-eslint/eslint-recommended",
       "plugin:@typescript-eslint/recommended"
     ],
     "rules": {
       "@typescript-eslint/no-non-null-assertion": false
     }
   }
   ```
