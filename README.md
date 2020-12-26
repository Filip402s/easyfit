local build:
```
docker-compose down && echo y | docker-compose up --build --force-recreate -d
echo y | docker stack deploy -c docker-stack.yml easyfit
```

standalone db:
docker run -p 3306:3306 --name some-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest

package name:
pl.mazzaq.easyfit

steps to finish MVP for the project:
* [x] local react app
* [x] vps -> deploy react app on gitlab server
* [ ] + auth & config server
* [ ] + CQRS
* [ ] + products microservice
* [ ] + diary microservice