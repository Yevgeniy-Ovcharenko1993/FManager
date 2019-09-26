### Prerequisites: 
1. Install postgres server (latest)
2. Create database and set up password
    - sudo -u postgres psql
    - CREATE DATABASE footbalmanaginginfo;
    - ALTER USER postgres PASSWORD 'postgres';
6. Install redis server (latest)
7. Install npm 
8. Install node

Steps: 
1. Create .env file in the root project directory
2. Put environment variables into the .env file (Check env_example file)
6. run sh script OR docker-compose up --build if your environment is set up to use docker
