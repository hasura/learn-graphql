## Development

#### Build Docker Image
```bash
docker build -t hasura-v3-ts-connector -f Dockerfile.localdev .
```

#### Run Container in Dev Mode

```bash
docker run -ti -p 8080:8080 -v /path/to/content:/gatsby-gitbook-starter/content -v /path/to/config.js:/gatsby-gitbook-starter/config.js hasura-v3-ts-connector
```

Two volumes are mounted. One for `content` and one for `config.js`. This is required for hot-reloading. 

Restart docker container
- In case there are new files
- Gatsby cache needs to be updated
