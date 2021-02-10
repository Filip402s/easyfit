echo '*** deleting containers'
docker rm $(docker ps -qa --no-trunc --filter "status=exited")
echo '*** deleting volumes'
docker volume rm $(docker volume ls -qf dangling=true)
echo 'deleting images'
docker rmi $(docker images -q -a)
echo 'restarting docker'
service docker restart