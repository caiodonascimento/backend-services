#!/bin/bash

if [ -n "$DELETE_SERVICES" ]; then
  echo ">>>>> Eliminando servicios"
  docker stop mysql-happyfoot; docker rm mysql-happyfoot
  docker stop keycloak-happyfoot; docker rm keycloak-happyfoot
  exit 1
fi

# Configure DB for works
if [ -z "$(docker ps -a | grep mysql-happyfoot | awk '{print $1}')"  ]; then
  echo ">>>>> Crear base de datos"
  #docker run --name mysql-happyfoot -e MYSQL_DATABASE=happyfoot_db -e MYSQL_USER=happyfoot -e MYSQL_PASSWORD=lsUnd823JAUsj2 -e MYSQL_ROOT_PASSWORD=lsUnd823JAUsj2 -d mysql:5.7
  
  docker run --name mysql -e MYSQL_DATABASE=keycloak -e MYSQL_USER=keycloak -e MYSQL_PASSWORD=password -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7
else
  echo ">>>>> Iniciar base de datos"
  docker start mysql-happyfoot
fi

sleep 15s

# Configure keycloak for works
if [ -n "$(docker ps -a | grep keycloak-happyfoot | awk '{print $1}')"  ]; then
  echo ">>>>> Iniciar SSO"
  docker stop keycloak-happyfoot
  docker rm keycloak-happyfoot
fi

echo ">>>>> Crear SSO"
#docker run --name keycloak-happyfoot \
#--link mysql-happyfoot:mysql-happyfoot \
#-e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
#-e DB_VENDOR=MYSQL -e MYSQL_PORT_3306_TCP_ADDR=mysql-happyfoot -e MYSQL_PORT_3306_TCP_PORT=3306 -e MYSQL_DATABASE=happyfoot_db -e MYSQL_USERNAME=happyfoot -e MYSQL_PASSWORD=lsUnd823JAUsj2 \
#-d jboss/keycloak:3.3.0.CR2-2

docker run --name keycloak-happyfoot --link mysql:mysql -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DB_VENDOR=MYSQL -d jboss/keycloak:3.3.0.Final

sleep 15s

docker cp realm-export.json keycloak-happyfoot:/opt/jboss/; docker exec keycloak-happyfoot ./keycloak/bin/kcadm.sh create realms -f realm-export.json --server http://localhost:8080/auth --realm master --user admin --password admin
