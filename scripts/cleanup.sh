docker volume rm $(docker volume ls -qf dangling=true)
docker rm $(docker ps -qa --no-trunc --filter "status=exited")
docker rmi $(docker images -q -a)
service docker restart