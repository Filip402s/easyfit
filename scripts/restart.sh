docker stack rm easyfit
docker-compose --file docker-stack.yml build
docker stack deploy -c docker-stack.yml easyfit
sh $SCRIPTS/time.sh