## Development

#### Build Docker Image
```bash
docker build -t tutorial-site:0.1 -f Dockerfile.localdev .
```

#### Run Container in Dev Mode

If you are not going to user Algolia API in development, then disable Algolia search in the `config.js`.Otherwise provide the corresponding env vars to the following bash command using `--env-file path/to/file-with-env-vars` flag.

```bash
docker run -ti -p 8080:8080 -v /path/to/learn-graphql/tutorials/frontend/react-apollo/tutorial-site/content:/gatsby-gitbook-starter/content -v /path/to/learn-graphql/tutorials/frontend/react-apollo/tutorial-site/config.js:/gatsby-gitbook-starter/config.js tutorial-site:0.1
```

Two volumes are mounted. One for `content` and one for `config.js`. This is required for hot-reloading. 

Restart docker container
- In case there are new files
- Gatsby cache needs to be updated
