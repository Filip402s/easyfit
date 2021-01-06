### local build:
```
docker-compose down && echo y | docker-compose -f docker-stack.yml up --build --force-recreate -d

export EASYFIT="/home/mazaq/repos/easyfit-group/easyfit" && export SCRIPTS=$EASYFIT/scripts

or

sh $SCRIPTS/deploy.sh
sh $SCRIPTS/restart.sh
sh $SCRIPTS/backend-only.sh
sh $SCRIPTS/ui-only.sh
sh $SCRIPTS/build-only.sh
```

## vps

### useful:
```
docker-compose -f docker-stack.yml build
echo y | docker stack deploy -c docker-stack.yml easyfit
docker service logs easyFitStack_web -f
```

### build:
```
- ultimate build all
docker stack rm easyfit &&  docker rmi easyfit-ui:0.2.0-SNAPSHOT && docker rmi easyfit-api:0.2.0-SNAPSHOT && docker-compose --file docker-stack.yml build && docker stack deploy -c docker-stack.yml easyfit

- build images
docker-compose -f docker-stack.yml build

```

### config gitlab runner 
```
gitlab_runner_container_id = d1cd77196b63
docker cp config.toml gitlab_runner:/etc/gitlab-runner/config.toml
```

### run standalone db:
```
docker run -p 3306:3306 --name some-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
```
package name:
pl.mazzaq.easyfit

steps to finish MVP for the project:
- [x] local react app
- [x] vps -> deploy react app on gitlab server
- [ ] + auth & config server
- [ ] + CQRS
- [ ] + products microservice
- [ ] + diary microservice