A template repository for creating API's with Node.js, the Serverless framework,
and AWS. Provisions Lambda, API Gateway, and DynamoDB with help from a few useful 
tools/frameworks.

## Installation
```bash
npm i
```

## Local Development

### Testing
By default, offline development is configured with serverless-offline and 
serverless-dynamodb-local. serverless-dynamodb-local still requires credentials
to be defined even if they aren't valid. This is already taken care of in `offline.sh`
which loads the necessary environment variables.

```bash
npm run offline
```

or

```bash
source offline.sh
sls offline start
```

### Utilities
The project is configured to use [`eslint`]() and [`prettier`](). There is a script 
added to the `package.json` that auto-formats the `src/` directory with the 
`eslint-config-google` and `eslint-config-prettier` presets.

```bash
npm run lint
```

or 

```bash 
eslint --fix src/**/*.js
prettier --write src/**/*.js
```

To make commits more fluid you can also run

```bash
npm run commit
```

or 

```bash
npm run lint 
git add .
git commit # Will prompt you for your commit message
git push
```

## Deployment

Deployment is standard with the Serverless framework and requires AWS 
credentials to be already configured.

```bash
sls deploy 
```