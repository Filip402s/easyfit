docker rmi easyfit-ui:0.2.0-SNAPSHOT --force
docker rmi easyfit-api:0.2.0-SNAPSHOT --force
docker-compose --file docker-stack.yml build
sh $SCRIPTS/time.sh