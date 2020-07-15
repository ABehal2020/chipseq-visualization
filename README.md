# chipseq-visualization
# Front End Setup
// install JavaScript dependencies listed in package.json

// navigate to front-end directory

```
$ npm install
```

# Back End Setup
1. Make sure Postgres is installed.
2. Properly configure .env file (see .env.example file in back-end directory as a template). Create a new database with an appropriate postgres user/password configuration with sufficient permissions to access and edit the newly created database. Then, ensure that the variables below in particular are properly configured.

SECRET_KEY=your-secret-key

DB_NAME=cherry_db

DB_USER=cherry

DB_PASSWORD=secret

DB_PORT=3306

JACCARD3=arn-of-jaccard3

3. Configure AWS CLI. In ./aws in your home directory, edit the file "credentials" properly.

[default]

aws_access_key_id = "{AWS ACCESS KEY ID}"

aws_secret_access_key = "{AWS SECRET ACCESS KEY}"

region = us-west-2

output = json

[aditya-lambda-cli]

region = us-west-2

output = json

role_arn = "{ADITYA-LAMBDA-CLI ROLE_ARN - AWS CHERRY LAB ACCESS REQUIRED HERE}"

source_profile = default

4. Create a conda environment and install all the python dependencies from requirements.txt in back-end directory into this conda environment.

# Running the application
Termminal 1 (running React JS front end):

```
$ open -a /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security
```

// navigate to front-end directory

```
$ nvm use v11.15.0
$ npm start
```

Terminal 2 (running Python Django server back end):

```
$ conda activate {NAME OF CONDA ENVIRONMENT WITH PYTHON DEPENDENCIES INSTALLED}
```

// navigate to the back-end/corr-end sub-directory

```
$ python manage.py runserver
```

# Troubleshooting (Cherry Lab Members With Access to Cherry Lab AWS only)
Occasionally, if the correlations request to the back end fails or if multiple requests are submitted at once, the AWS lambda function might crash. Go to the SQS page and check "jaccard3-success" and "jaccard3-failure" and "jaccard3-unprocessed"; make sure all 3 SQS queues are cleared before submitting a new request.

