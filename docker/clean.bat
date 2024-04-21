docker-compose down
docker rmi -f $(docker images -a -q)
docker rmi -f $(docker images -f "dangling=true" -q)

docker volume rm $(docker volume ls -qf dangling=true)

# remove all stopped containers
docker rm -f $(docker ps -a -q)

docker rmi -f alpine
docker rmi -f nginx:stable-alpine
docker rmi -f sphinxproject/postgres
docker rmi -f sphinxproject/tshark
docker rmi -f sphinxproject/data-traffic-monitoring-ui

# pull: sphinxproject/postgres
docker pull sphinxproject/postgres
(manual:docker run --name sphinxproject/postgres)

# pull: rabbitmq
# docker pull rabbitmq

# pull: sphinxproject/grafana
docker pull sphinxproject/grafana
# docker run -d -p 3000:3000 --name grafana sphinxproject/grafana

# pull: sphinxproject/tshark
docker pull sphinxproject/tshark

# pull: obsidiandynamics/kafdrop
docker pull obsidiandynamics/kafdrop

# pornire cele 3 servici: grafana, postgres, zookeeper, kafka, rabbitmq
docker-compose up -d

# rulare liquibase
SPHINX\database>lb_update-docker.cmd

# verify: postgres (pgadmin4 / username/password=>sphinx/sphinx; db=>sphinx; host/port=>localhost:8432)

# verify: rabbitmq (username/password:guest/guest)
http://localhost:15672/

# verify grafana:
username: admin
passowrd: Admin

#DTM: apoi din SPHINX\data-traffic-monitoring, trebuie rulate instructiunile din deploy.bat
    mvn clean -Dspring.profiles.active=kafka package -DskipTests
    docker build -t sphinxproject/data-traffic-monitoring .
    docker run -it --link sphinx-postgres --net docker_default -p8087:8087 sphinxproject/data-traffic-monitoring

#=> verify in rabbitmq (number of message)


#AD: apoi din SPHINX\anomaly-detection, trebuie rulate instructiunile din deploy.bat
    mvn clean -Dspring.profiles.active=kafka package -DskipTests
    docker build -t sphinxproject/anomaly-detection .
    docker run -it --link sphinx-postgres --net docker_default -p8088:8088 sphinxproject/anomaly-detection

#ID-UI apoi din SPHINX\interactive-dashboard-ui, trebuie rulate instructiunile:
    docker build -f Dockerfile.prod -t sphinxproject/interactive-dashboard-ui:prod .
    # pornire serviciu:
    docker-compose -f docker-compose.prod.yml up -d --build

#=> verify http://localhost:1337/

1. create network: sphinx-network
docker network ls
docker network inspect sphinx-network
docker network rm sphinx-network
docker network create --driver=bridge --subnet=172.18.0.0/16 sphinx-network
docker network inspect sphinx-network

2.
docker-compose -f docker-compose-infrastructure.yml -f docker-compose-sphinx-components.yml build
docker-compose -f docker-compose-infrastructure.yml -f docker-compose-sphinx-components.yml up
