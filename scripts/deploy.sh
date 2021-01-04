docker stack rm easyfit
docker rmi easyfit-ui:0.2.0-SNAPSHOT --force
docker rmi easyfit-api:0.2.0-SNAPSHOT --force
docker-compose --file $EASYFIT/docker-stack.yml build
docker stack deploy -c $EASYFIT/docker-stack.yml easyfit
sh $SCRIPTS/time.sh