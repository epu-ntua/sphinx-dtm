FROM adoptopenjdk:14-jre-hotspot as builder
WORKDIR application
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} application.jar
RUN java -Djarmode=layertools -jar application.jar extract

FROM adoptopenjdk:14-jre-hotspot
RUN  mkdir -p /sphinx/tshark/export
# pun fisierul de test
#ARG TEST_FILE=temp/input.csv
#COPY ${TEST_FILE} /sphinx/tshark/export/input.csv
WORKDIR application
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
# COPY --from=builder application/resources/ ./
COPY --from=builder application/application/ ./
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "org.springframework.boot.loader.JarLauncher"]
