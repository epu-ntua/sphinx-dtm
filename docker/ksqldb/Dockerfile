FROM confluentinc/ksqldb-server:0.14.0

# The folder where strimzi-kafka-oauth project was cloned
RUN mkdir /home/appuser/strimzi
COPY strimzi-kafka-oauth/oauth-common/target/kafka-oauth-common-*.jar \
     /home/appuser/strimzi/
COPY strimzi-kafka-oauth/oauth-server/target/kafka-oauth-server-*.jar \
     /home/appuser/strimzi/
COPY strimzi-kafka-oauth/oauth-server-plain/target/kafka-oauth-server-plain-*.jar \
     /home/appuser/strimzi/
COPY strimzi-kafka-oauth/oauth-keycloak-authorizer/target/kafka-oauth-keycloak-authorizer-*.jar \
     /home/appuser/strimzi/
COPY strimzi-kafka-oauth/oauth-client/target/kafka-oauth-client-*.jar \
     /home/appuser/strimzi/
COPY strimzi-kafka-oauth/oauth-client/target/lib/keycloak-common-*.jar \
     /home/appuser/strimzi/
COPY strimzi-kafka-oauth/oauth-client/target/lib/keycloak-core-*.jar \
     /home/appuser/strimzi/
COPY strimzi-kafka-oauth/oauth-client/target/lib/bcprov-*.jar \
     /home/appuser/strimzi/

# The jks that contains the server public certificate
COPY sphinx.jks /home/appuser/sphinx.jks
COPY sphinx.p12 /home/appuser/sphinx.p12
