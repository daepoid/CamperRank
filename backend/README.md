## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## .ENV

```dotenv

# development
GRADING_SERVER_URL=http://[hosting_url]:[hosting_port]/grade-server/v1/grading
MYSQL_DATABASE=[DB_name]
MYSQL_HOST=[DB_host]
MYSQL_PASSWORD=[DB_pw]
MYSQL_PORT=[DB_port]
MYSQL_USERNAME=[DB_username]
SERVERLESS_GRADE_JAVASCRIPT= [serverless_url_JS]
SERVERLESS_GRADE_PYTHON= [serverless_url_PY]
JWT_SECRETKEY=[JWT_key]

```