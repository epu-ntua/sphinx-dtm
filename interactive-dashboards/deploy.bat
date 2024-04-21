rem mvn clean -Dspring.profiles.active=docker package
docker build -t sphinxproject/interactive-dashboards .
docker run -it --link sphinx-postgres --net docker_default -p 8089:8089 sphinxproject/interactive-dashboards