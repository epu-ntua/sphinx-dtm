# COMMON
cd sphinx-common
mvn clean -Dspring.profiles.active=kafka install -DskipTests

# DTM
cd data-traffic-monitoring
mvn clean -Dspring.profiles.active=kafka install -DskipTests
java -Dspring.profiles.active=kafka -cp target\data-traffic-monitoring-0.0.1-SNAPSHOT.jar org.springframework.boot.loader.PropertiesLauncher

# AD
cd anomaly-detection
mvn clean -Dspring.profiles.active=kafka install -DskipTests
java -Dspring.profiles.active=kafka -cp target\anomaly-detection-0.0.1-SNAPSHOT.jar org.springframework.boot.loader.PropertiesLauncher

# ID-UI
cd interactive-dashboards-ui
start yarn

mvn clean -Dspring-boot.run.profiles="kafka" -DskipTests org.springframework.boot:spring-boot-maven-plugin:2.3.0.RELEASE:run
