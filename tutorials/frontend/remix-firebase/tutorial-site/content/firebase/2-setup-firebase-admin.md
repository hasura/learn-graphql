---
title: "Setup Firebase Admin"
metaTitle: "Setup Firebase Admin | Remix Fullstack GraphQL Tutorial"
metaDescription: "Create the Firebase Admin Service Account"
---

1. Back at the project settings screen, navigate to service accounts

1. Generate a new private key

1. Rename to `firebase-admin.json` and move it to the project root

1. We need to turn the JSON you downloaded into a string so we can save it in an environment variable. One way to do this is using Nodejs

   1. Create a file in project root `admin-parse.js`

   ```javascript
   const { readFileSync } = require("fs");

   console.log(JSON.stringify(JSON.parse(readFileSync("firebase-admin.json"))));
   ```

   1. Run `node ./admin-parse.js`

1. Copy the output string and save it for later. Delete `firebase-admin.json` and `admin-parse.js`
