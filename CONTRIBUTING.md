# Contributing Guide

*First*: if you feel insecure about how to start contributing, feel free to ask us on our [Discord channel](https://discordapp.com/invite/hasura), in the #contrib channel. You can also just go ahead with your contribution and we'll give you feedback. Don't worry - the worst that can happen is that you'll be politely asked to change something. We appreciate any contributions, and we don't want a wall of rules to stand in the way of that. 

However, for those individuals who want a bit more guidance on the best way to contribute to the project, read on. This document will cover what we're looking for. By addressing the points below, the chances that we
can quickly merge or address your contributions will increase.

## Overview

[hasura/learn-graphql](https://github.com/hasura/learn-graphql) repo consists of tutorials for frontend, mobile and backend.

### Tutorials

Our goal is to keep our tutorial content and the apps associated with it comprehensive and updated. If you would like to help us in doing so, we are grateful for any kind of contribution:

- Add new tutorials (please reach out to us if you have ideas to avoid duplicate work)

- Report missing content

- Fix errors in existing tutorials

- Help us in updating the apps versions

## Ways of contributing

### Reporting an Issue

- Provide steps to reproduce the issue, including the tutorial that you are trying out.

- Please include logs, if relevant.

### Working on an issue

- Please make sure there is an issue associated with the work that you're doing.

- If you're working on an issue, please comment that you are doing so to prevent duplicate work by others also.

- Squash your commits and refer to the issue using `fix #<issue-no>` or `close
  #<issue-no>` in the commit message, at the end.
  For example: `resolve answers to everything (fix #42)` or `resolve answers to everything, fix #42`

- Rebase master with your branch before submitting a pull request.

### Testing

- Please make sure that your code is linted as per the rules in the project. To run an ESLint check, run npm run eslint from the root of the project.

- To run the tests locally, you will need to have a Hasura GraphQL engine URL. You can run the tests locally by passing the GraphQL Engine URL and the access key to the npm test command.

- $ GRAPHQURL_TEST_GRAPHQL_ENGINE_URL=<Hasura GraphQL Engine> \
  GRAPHQURL_TEST_X_HASURA_ACCESS_KEY=<Access key> \
  npm test

## Commit messages

- The first line should be a summary of the changes, not exceeding 50
  characters, followed by an optional body which has more details about the
  changes. Refer to [this link](https://github.com/erlang/otp/wiki/writing-good-commit-messages)
  for more information on writing good commit messages.

- Use the imperative present tense: "add/fix/change", not "added/fixed/changed" nor "adds/fixes/changes".

- Don't capitalize the first letter of the summary line.

- Don't add a period/dot (.) at the end of the summary line.
