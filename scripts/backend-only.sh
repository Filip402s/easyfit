docker stack rm easyfit
docker rmi easyfit-api:0.2.0-SNAPSHOT --force
docker-compose --file docker-stack.yml build
docker stack deploy -c docker-stack.yml easyfit