How to run app. 

1. Fill out .env file according to env_example schema
2. Run docker-compose up command in directory where docker-compose.yml file is locating 
3. Open postgres container and Run command to crete database  
 - docker exec -it containerName  psql -U postgres
 - CREATE DATABASE footbalmanaginginfo;
4. Rebuild app and restart

To do: need to fix problem with automaticaly creation of DB while DB service is starting
