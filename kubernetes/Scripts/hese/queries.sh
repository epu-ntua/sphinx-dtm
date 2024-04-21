#!/bin/sh
ksqldbserver=$(kubectl get pods -o=name | grep ksqldb-server)
#kubectl cp init.sql ${ksqldbserver:0:${#ksqldbserver}-1}:/home/appuser/init.sql
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP CONNECTOR ksql_to_postgresql;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_to_postgresql WITH(
#  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
#  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
#  'connection.user'          = 'sphinx',
#  'connection.password'      = 'sphinx',
#  'mode'                     = 'incrementing',
#  'key'                      = 'id',
#  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
#  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
#  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
#  'key.converter.schemas.enable' = false,
#  'value.converter.schemas.enable' = true,
#  'pk.mode'                  = 'none',
#  'pk.fields'                = 'ID',
#  'topics'                   = 'DSS_SUGGESTIONS_AVRO, VAAAS_REPORT_AVRO, DTM_ALERTS_AVRO, RCRA_REPORT_TOPIC_AVRO, KB_INDICATORS_AVRO, HP_CURRENTLY_CONNECTED_IPS_AVRO, HP_INTERVAL_INFO_AVRO, HP_MOST_USED_AVRO, HP_SERVICE_COUNTERS_AVRO, HP_STATIC_INFO_AVRO, FDCE_REPORT_TOPIC_AVRO, JDBC_SOURCE_AVRO, AD_ALERT_AVRO, SIEM_ALERTS_AVRO, CERTIFICATIONS_AVRO',
#  'table.name.format'        = 'kafka_${topic}',
#  'auto.create'              = true);"
#================================================================================================================================================================================================================================================================================================================================================================
#
# ID ALERTS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP CONNECTOR ID_ALERTS_SINK;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ID_ALERTS_SINK WITH(
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'topics'                   = 'ID_ALERTS',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# ECARE NONVALIDATED CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_ecare_nonvalid_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_ecare_nonvalid_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'ECARE_NONVALIDATED_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# ECARE LOGIN FAILURES CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_ecare_login_failures_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_ecare_login_failures_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'ECARE_LOGIN_FAILURES_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# ECARE BRUTEFORCE CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_ecare_bruteforce_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_ecare_bruteforce_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'ECARE_BRUTEFORCE_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# AD CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_ad_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_ad_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'AD_ALERT_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# CERTIFICATIONS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_cert_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_cert_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'CERTIFICATIONS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# DSS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_dss_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_dss_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'DSS_SUGGESTIONS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# FDCE ALERTS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_fdce_alerts_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_fdce_alerts_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'FDCE_ALERTS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# FDCE REPORTS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_fdce_reports_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_fdce_reports_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'FDCE_REPORT_TOPIC_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# HP CAPTURED IPS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_hp_captured_ip_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_hp_captured_ip_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'HP_CAPTURED_IPS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# HP CURRENTLY CONNECTED IPS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_hp_currently_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_hp_currently_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'HP_CURRENTLY_CONNECTED_IPS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# HP INTERVAL INFO CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_hp_interval_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_hp_interval_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'HP_INTERVAL_INFO_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# HP MOST USED CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_hp_most_used_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_hp_most_used_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'HP_MOST_USED_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# HP SERVICE COUNTERS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_hp_service_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_hp_service_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'HP_SERVICE_COUNTERS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# HP STATIC INFO CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_hp_static_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_hp_static_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'HP_STATIC_INFO_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# RCRA ALERTS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_rcra_alerts_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_rcra_alerts_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'RCRA_ALERTS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# RCRA ASSET REPUTATION CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_rcra_asset_rep_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_rcra_asset_rep_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'RCRA_ASSET_REPUTATION_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# RCRA REPORT TOPIC CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_rcra_report_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_rcra_report_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'RCRA_REPORT_TOPIC_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# SIEM ALERTS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_siem_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_siem_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'SIEM_ALERTS_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#
# VAAAS REPORTS CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_vaaas_to_postgresql;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_vaaas_to_postgresql WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'pk.fields'                = 'ID',
  'topics'                   = 'VAAAS_REPORT_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true);"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "drop connector ksql_dtm_to_postgresql;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SINK CONNECTOR ksql_dtm_to_postgresql WITH (
#  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
#  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
#  'connection.user'          = 'sphinx',
#  'connection.password'      = 'sphinx',
#  'mode'                     = 'incrementing',
#  'key'                      = 'id',
#  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
#  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
#  'value.converter.schema.registry.url' = 'http://schema-registry-service-evora:8081',
#  'key.converter.schemas.enable' = false,
#  'value.converter.schemas.enable' = true,
#  'pk.mode'                  = 'none',
#  'pk.fields'                = 'ID',
#  'topics'                   = 'DTM_ALERTS_AVRO',
#  'table.name.format'        = 'kafka_${topic}',
#  'auto.create'              = true);"
#
# SUGGESTIONS APPLIED CONNECTOR
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP CONNECTOR suggestions_applied;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE SOURCE CONNECTOR suggestions_applied WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSourceConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres-hese:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'topic.prefix'             = 'id_',
  'table.whitelist'          = 'suggestions_applied',
  'mode'                     = 'incrementing',
  'numeric.mapping'          = 'best_fit',
  'incrementing.column.name' = 'id',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -f '/home/appuser/init.sql'
#
# AD
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS AD_ALERT;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS AD_ALERT_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM AD_ALERT (id VARCHAR KEY, \"objects\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='ad-alert', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM AD_ALERT_AVRO (id VARCHAR KEY, ALERTID VARCHAR, TOTALFLOWS VARCHAR,PROTOCOLFLOWID VARCHAR,PROTOCOLFLOWDETECTEDPROTOCOL VARCHAR,PROTOCOLFLOWLOWERPORT VARCHAR,PROTOCOLFLOWUPPERPORT VARCHAR,PROTOCOLFLOWUPPERIP VARCHAR,PROTOCOLFLOWLOWERIP VARCHAR,PROTOCOLFLOWIPPROTOCOL VARCHAR,PROTOCOLFLOWFLOWDURATION VARCHAR,PROTOCOLFLOWBYTES VARCHAR,PROTOCOLFLOWPACKETS VARCHAR,PROTOCOLFLOWPACKETSWITHOUTPAYLOAD VARCHAR,PROTOCOLFLOWAVGPACKETSIZE VARCHAR,PROTOCOLFLOWMINPACKETSIZE VARCHAR,PROTOCOLFLOWMAXPACKETSIZE VARCHAR,PROTOCOLFLOWAVGINTERTIME VARCHAR,PROTOCOLFLOWPACKETSIZE0 VARCHAR,PROTOCOLFLOWINNERTIME0 VARCHAR,PROTOCOLFLOWPACKETSIZE1 VARCHAR,PROTOCOLFLOWINNERTIME1 VARCHAR,PROTOCOLFLOWPACKETSIZE2 VARCHAR,PROTOCOLFLOWINNERTIME2 VARCHAR,PROTOCOLFLOWPACKETSIZE3 VARCHAR,PROTOCOLFLOWINNERTIME3 VARCHAR,PROTOCOLFLOWPACKETSIZE4 VARCHAR,PROTOCOLFLOWINNERTIME4 VARCHAR,PROTOCOLFLOWHOSTNAME VARCHAR,PROTOCOLFLOWDNATYPE VARCHAR,PROTOCOLFLOWTIMESTAMP2 VARCHAR,PROTOCOLFLOWMALWARE VARCHAR,PROTOCOLFLOWFLAGS VARCHAR,TEXT VARCHAR,TITLE VARCHAR,FLOWID VARCHAR,COORDS VARCHAR,USERNAME VARCHAR,TIMESTAMP VARCHAR,ALGORITHMTYPE VARCHAR,ALGORITHMHOSTNAME VARCHAR,ALGORITHMNUMBEROFPAIRS VARCHAR,ALGORITHMTCPPORT VARCHAR,ALGORITHMBYTESUP VARCHAR,ALGORITHMBYTESDOWN VARCHAR,ALGORITHMNUMBERPKTS VARCHAR,ALGORITHMCONNECTIONS VARCHAR,ALGORITHMPORTS VARCHAR,ALGORITHMMYIP VARCHAR,ALGORITHMSTRINGFLOWS VARCHAR,ALGORITHMDATAMEAN VARCHAR,ALGORITHMDATASTDEV VARCHAR,ALGORITHMPAIRSMEAN VARCHAR,ALGORITHMPAIRSSTDEV VARCHAR,ALGORITHMALIENS VARCHAR,ALGORITHMNUMBEROFFLOWS VARCHAR,ALGORITHMNUMBEROFFLOWSPERPORT VARCHAR,ALGORITHMFLOWSMEAN VARCHAR,ALGORITHMFLOWSSTDEV VARCHAR,ALGORITHMNUMBEROFFLOWSALIENPORT VARCHAR,ALGORITHMNUMBEROFPORTS VARCHAR,ALGORITHMPORTSMEAN VARCHAR,ALGORITHMPORTSSTDEV VARCHAR) WITH (KAFKA_TOPIC='AD_ALERT_AVRO',PARTITIONS=1,VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO AD_ALERT_AVRO SELECT id, EXTRACTJSONFIELD(\"objects\"[2], '$.id') AS ALERTID, EXTRACTJSONFIELD(\"objects\"[2], '$.details.totalFlows') AS TOTALFLOWS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.id') AS PROTOCOLFLOWID, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.detectedProtocol') AS PROTOCOLFLOWDETECTEDPROTOCOL, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.lowerPort') AS PROTOCOLFLOWLOWERPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.upperPort') AS PROTOCOLFLOWUPPERPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.upperIp') AS PROTOCOLFLOWUPPERIP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.lowerIp') AS PROTOCOLFLOWLOWERIP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.ipProtocol') AS PROTOCOLFLOWIPPROTOCOL, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.flowDuration') AS PROTOCOLFLOWFLOWDURATION, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.bytes') AS PROTOCOLFLOWBYTES, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packets') AS PROTOCOLFLOWPACKETS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetsWithoutPayload') AS PROTOCOLFLOWPACKETSWITHOUTPAYLOAD, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.avgPacketSize') AS PROTOCOLFLOWAVGPACKETSIZE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.minPacketSize') AS PROTOCOLFLOWMINPACKETSIZE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.maxPacketSize') AS PROTOCOLFLOWMAXPACKETSIZE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.avgInterTime') AS PROTOCOLFLOWAVGINTERTIME, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize0') AS PROTOCOLFLOWPACKETSIZE0, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.interTime0') AS PROTOCOLFLOWINNERTIME0, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize1') AS PROTOCOLFLOWPACKETSIZE1, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime1') AS PROTOCOLFLOWINNERTIME1, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize2') AS PROTOCOLFLOWPACKETSIZE2, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime2') AS PROTOCOLFLOWINNERTIME2, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize3') AS PROTOCOLFLOWPACKETSIZE3, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime3') AS PROTOCOLFLOWINNERTIME3, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize4') AS PROTOCOLFLOWPACKETSIZE4, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime4') AS PROTOCOLFLOWINNERTIME4, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.hostname') AS PROTOCOLFLOWHOSTNAME, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.dnaType') AS PROTOCOLFLOWDNATYPE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.timeStamp2') AS PROTOCOLFLOWTIMESTAMP2, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.malware') AS PROTOCOLFLOWMALWARE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.flags') AS PROTOCOLFLOWFLAGS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.text') AS TEXT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.title') AS TITLE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.flowId') AS FLOWID, EXTRACTJSONFIELD(\"objects\"[2], '$.details.coords') AS COORDS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.username') AS USERNAME, EXTRACTJSONFIELD(\"objects\"[2], '$.created') AS TIMESTAMP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.type') AS ALGORITHMTYPE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.hostname') AS ALGORITHMHOSTNAME, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfPairs') AS ALGORITHMNUMBEROFPAIRS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.tcpport') AS ALGORITHMTCPPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.bytesUp') AS ALGORITHMBYTESUP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.bytesDown') AS ALGORITHMBYTESDOWN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numerPkts') AS ALGORITHMNUMBERPKTS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.connections') AS ALGORITHMCONNECTIONS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.ports') AS ALGORITHMPORTS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.myIP') AS ALGORITHMMYIP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.stringFlows') AS ALGORITHMSTRINGFLOWS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.dataMean') AS ALGORITHMDATAMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.dataStdev') AS ALGORITHMDATASTDEV, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.pairsMean') AS ALGORITHMPAIRSMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.pairsStdev') AS ALGORITHMPAIRSSTDEV, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.aliens') AS ALGORITHMALIENS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfFlows') AS ALGORITHMNUMBEROFFLOWS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfFlowsPerPort') AS ALGORITHMNUMBEROFFLOWSPERPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.flowsMean') AS ALGORITHMFLOWSMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.flowsStdev') AS ALGORITHMFLOWSSTDEV, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfFlowsAlienPort') AS ALGORITHMNUMBEROFFLOWSALIENPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfPorts') AS ALGORITHMNUMBEROFPORTS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.portsMean') AS ALGORITHMPORTSMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.portsStdev') AS ALGORITHMPORTSSTDEV FROM AD_ALERT;"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM AD_ALERT_AVRO_ID (id VARCHAR KEY, ALERTID VARCHAR, TOTALFLOWS VARCHAR,PROTOCOLFLOWID VARCHAR,PROTOCOLFLOWDETECTEDPROTOCOL VARCHAR,PROTOCOLFLOWLOWERPORT VARCHAR,PROTOCOLFLOWUPPERPORT VARCHAR,PROTOCOLFLOWUPPERIP VARCHAR,PROTOCOLFLOWLOWERIP VARCHAR,PROTOCOLFLOWIPPROTOCOL VARCHAR,PROTOCOLFLOWFLOWDURATION VARCHAR,PROTOCOLFLOWBYTES VARCHAR,PROTOCOLFLOWPACKETS VARCHAR,PROTOCOLFLOWPACKETSWITHOUTPAYLOAD VARCHAR,PROTOCOLFLOWAVGPACKETSIZE VARCHAR,PROTOCOLFLOWMINPACKETSIZE VARCHAR,PROTOCOLFLOWMAXPACKETSIZE VARCHAR,PROTOCOLFLOWAVGINTERTIME VARCHAR,PROTOCOLFLOWPACKETSIZE0 VARCHAR,PROTOCOLFLOWINNERTIME0 VARCHAR,PROTOCOLFLOWPACKETSIZE1 VARCHAR,PROTOCOLFLOWINNERTIME1 VARCHAR,PROTOCOLFLOWPACKETSIZE2 VARCHAR,PROTOCOLFLOWINNERTIME2 VARCHAR,PROTOCOLFLOWPACKETSIZE3 VARCHAR,PROTOCOLFLOWINNERTIME3 VARCHAR,PROTOCOLFLOWPACKETSIZE4 VARCHAR,PROTOCOLFLOWINNERTIME4 VARCHAR,PROTOCOLFLOWHOSTNAME VARCHAR,PROTOCOLFLOWDNATYPE VARCHAR,PROTOCOLFLOWTIMESTAMP2 VARCHAR,PROTOCOLFLOWMALWARE VARCHAR,PROTOCOLFLOWFLAGS VARCHAR,TEXT VARCHAR,TITLE VARCHAR,FLOWID VARCHAR,COORDS VARCHAR,USERNAME VARCHAR,TIMESTAMP VARCHAR,ALGORITHMTYPE VARCHAR,ALGORITHMHOSTNAME VARCHAR,ALGORITHMNUMBEROFPAIRS VARCHAR,ALGORITHMTCPPORT VARCHAR,ALGORITHMBYTESUP VARCHAR,ALGORITHMBYTESDOWN VARCHAR,ALGORITHMNUMBERPKTS VARCHAR,ALGORITHMCONNECTIONS VARCHAR,ALGORITHMPORTS VARCHAR,ALGORITHMMYIP VARCHAR,ALGORITHMSTRINGFLOWS VARCHAR,ALGORITHMDATAMEAN VARCHAR,ALGORITHMDATASTDEV VARCHAR,ALGORITHMPAIRSMEAN VARCHAR,ALGORITHMPAIRSSTDEV VARCHAR,ALGORITHMALIENS VARCHAR,ALGORITHMNUMBEROFFLOWS VARCHAR,ALGORITHMNUMBEROFFLOWSPERPORT VARCHAR,ALGORITHMFLOWSMEAN VARCHAR,ALGORITHMFLOWSSTDEV VARCHAR,ALGORITHMNUMBEROFFLOWSALIENPORT VARCHAR,ALGORITHMNUMBEROFPORTS VARCHAR,ALGORITHMPORTSMEAN VARCHAR,ALGORITHMPORTSSTDEV VARCHAR) WITH (KAFKA_TOPIC='AD_ALERT_AVRO_ID',PARTITIONS=1,VALUE_FORMAT='AVRO');"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO AD_ALERT_AVRO_ID SELECT CAST(id as VARCHAR), EXTRACTJSONFIELD(\"objects\"[2], '$.id') AS ALERTID, EXTRACTJSONFIELD(\"objects\"[2], '$.details.totalFlows') AS TOTALFLOWS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.id') AS PROTOCOLFLOWID, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.detectedProtocol') AS PROTOCOLFLOWDETECTEDPROTOCOL, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.lowerPort') AS PROTOCOLFLOWLOWERPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.upperPort') AS PROTOCOLFLOWUPPERPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.upperIp') AS PROTOCOLFLOWUPPERIP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.lowerIp') AS PROTOCOLFLOWLOWERIP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.ipProtocol') AS PROTOCOLFLOWIPPROTOCOL, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.flowDuration') AS PROTOCOLFLOWFLOWDURATION, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.bytes') AS PROTOCOLFLOWBYTES, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packets') AS PROTOCOLFLOWPACKETS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetsWithoutPayload') AS PROTOCOLFLOWPACKETSWITHOUTPAYLOAD, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.avgPacketSize') AS PROTOCOLFLOWAVGPACKETSIZE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.minPacketSize') AS PROTOCOLFLOWMINPACKETSIZE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.maxPacketSize') AS PROTOCOLFLOWMAXPACKETSIZE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.avgInterTime') AS PROTOCOLFLOWAVGINTERTIME, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize0') AS PROTOCOLFLOWPACKETSIZE0, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.interTime0') AS PROTOCOLFLOWINNERTIME0, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize1') AS PROTOCOLFLOWPACKETSIZE1, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime1') AS PROTOCOLFLOWINNERTIME1, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize2') AS PROTOCOLFLOWPACKETSIZE2, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime2') AS PROTOCOLFLOWINNERTIME2, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize3') AS PROTOCOLFLOWPACKETSIZE3, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime3') AS PROTOCOLFLOWINNERTIME3, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.packetSize4') AS PROTOCOLFLOWPACKETSIZE4, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.innerTime4') AS PROTOCOLFLOWINNERTIME4, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.hostname') AS PROTOCOLFLOWHOSTNAME, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.dnaType') AS PROTOCOLFLOWDNATYPE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.timeStamp2') AS PROTOCOLFLOWTIMESTAMP2, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.malware') AS PROTOCOLFLOWMALWARE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.protocolFlow.flags') AS PROTOCOLFLOWFLAGS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.text') AS TEXT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.title') AS TITLE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.flowId') AS FLOWID, EXTRACTJSONFIELD(\"objects\"[2], '$.details.coords') AS COORDS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.username') AS USERNAME, EXTRACTJSONFIELD(\"objects\"[2], '$.details.timestamp') AS TIMESTAMP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.type') AS ALGORITHMTYPE, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.hostname') AS ALGORITHMHOSTNAME, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfPairs') AS ALGORITHMNUMBEROFPAIRS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.tcpport') AS ALGORITHMTCPPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.bytesUp') AS ALGORITHMBYTESUP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.bytesDown') AS ALGORITHMBYTESDOWN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numerPkts') AS ALGORITHMNUMBERPKTS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.connections') AS ALGORITHMCONNECTIONS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.ports') AS ALGORITHMPORTS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.myIP') AS ALGORITHMMYIP, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.stringFlows') AS ALGORITHMSTRINGFLOWS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.dataMean') AS ALGORITHMDATAMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.dataStdev') AS ALGORITHMDATASTDEV, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.pairsMean') AS ALGORITHMPAIRSMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.pairsStdev') AS ALGORITHMPAIRSSTDEV, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.aliens') AS ALGORITHMALIENS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfFlows') AS ALGORITHMNUMBEROFFLOWS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfFlowsPerPort') AS ALGORITHMNUMBEROFFLOWSPERPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.flowsMean') AS ALGORITHMFLOWSMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.flowsStdev') AS ALGORITHMFLOWSSTDEV, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfFlowsAlienPort') AS ALGORITHMNUMBEROFFLOWSALIENPORT, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.numberOfPorts') AS ALGORITHMNUMBEROFPORTS, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.portsMean') AS ALGORITHMPORTSMEAN, EXTRACTJSONFIELD(\"objects\"[2], '$.details.algorithm.portsStdev') AS ALGORITHMPORTSSTDEV FROM AD_ALERT;"
#
# CERTIFICATIONS SIEM
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM SIEM_CERTIFICATIONS_VULNERS (id INT KEY, \"id\" VARCHAR,\"name\" VARCHAR,\"attackType\" VARCHAR,\"start\" VARCHAR,\"end\" VARCHAR,\"query\" VARCHAR,\"tag\" VARCHAR,\"riskScore\" VARCHAR,\"severity\" VARCHAR,\"uuid\" VARCHAR, \"data\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='siem-certification-vulnerabilities', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ACS_SCA (id INT KEY, \"id\" VARCHAR,\"name\" VARCHAR,\"attackType\" VARCHAR,\"start\" VARCHAR,\"end\" VARCHAR,\"query\" VARCHAR,\"tag\" VARCHAR,\"riskScore\" VARCHAR,\"severity\" VARCHAR,\"uuid\" VARCHAR, \"data\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='sphinx-acs-sca', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ACS_SCA_DETAILED (id INT KEY, \"id\" VARCHAR,\"name\" VARCHAR,\"attackType\" VARCHAR,\"start\" VARCHAR,\"end\" VARCHAR,\"query\" VARCHAR,\"tag\" VARCHAR,\"riskScore\" VARCHAR,\"severity\" VARCHAR,\"uuid\" VARCHAR, \"data\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='sphinx-acs-sca-detailed', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM CERTIFICATIONS_AVRO (id INT KEY, alertid VARCHAR, name VARCHAR, attack_type VARCHAR, start_time VARCHAR, end_time VARCHAR, query_used VARCHAR, tag VARCHAR, risk_score VARCHAR, severity VARCHAR, uuid VARCHAR, agent_name VARCHAR, agent_ip VARCHAR, rule_description VARCHAR, rule_level VARCHAR, cvss3 VARCHAR, timestamp VARCHAR, count VARCHAR, last_seen VARCHAR, rule_groups VARCHAR, data_sca_passed VARCHAR, data_sca_score VARCHAR, data_sca_failed VARCHAR, cvss3_base_score VARCHAR) WITH (KAFKA_TOPIC='CERTIFICATIONS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO CERTIFICATIONS_AVRO SELECT id as id, \"id\" as alertid, \"name\" as name, \"attackType\" as attack_type, \"start\" as start_time, \"end\" as end_time, \"query\" as query_used, \"tag\" as tag, \"riskScore\" as risk_score, \"severity\" as severity, \"uuid\" as uuid, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"agent.name\"]') as agent_name, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"agent.ip\"]') as agent_ip, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"rule.description\"]') as rule_description, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"rule.level\"]') as rule_level, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.cvss3]') as cvss3, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.timestamp') as timestamp, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.count') as count, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.last_seen') as last_seen, '' as rule_groups, '' as data_sca_passed, '' as data_sca_score, '' as data_sca_failed, '' as cvss3_base_score FROM SIEM_CERTIFICATIONS_VULNERS EMIT CHANGES LIMIT 1;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO CERTIFICATIONS_AVRO SELECT id as id, \"id\" as alertid, \"name\" as name, \"attackType\" as attack_type, \"start\" as start_time, \"end\" as end_time, \"query\" as query_used, \"tag\" as tag, \"riskScore\" as risk_score, \"severity\" as severity, \"uuid\" as uuid, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"agent.name\"]') as agent_name, '' as agent_ip, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"rule.description\"]') as rule_description, '' as rule_level, '' as cvss3, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.timestamp') as timestamp, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.count') as count, '' as last_seen, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"rule.groups\"]') as rule_groups, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"data.sca.passed\"]') as data_sca_passed, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"data.sca.score\"]') as data_sca_score, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"data.sca.failed\"]') as data_sca_failed, '' as cvss3_base_score FROM ACS_SCA EMIT CHANGES LIMIT 1;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO CERTIFICATIONS_AVRO SELECT id as id, \"id\" as alertid, \"name\" as name, \"attackType\" as attack_type, \"start\" as start_time, \"end\" as end_time, \"query\" as query_used, \"tag\" as tag, \"riskScore\" as risk_score, \"severity\" as severity, \"uuid\" as uuid, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"agent.name\"]') as agent_name, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"agent.ip\"]') as agent_ip, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"rule.description\"]') as rule_description, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"rule.level\"]') as rule_level, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.cvss3]') as cvss3, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.timestamp') as timestamp, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.count') as count, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$.last_seen') as last_seen, '' as rule_groups, '' as data_sca_passed, '' as data_sca_score, '' as data_sca_failed, EXTRACTJSONFIELD(EXPLODE(\"data\"), '$[\"data.vulnerability.cvss.cvss3.base_score\"]') as cvss3_base_score FROM ACS_SCA_DETAILED EMIT CHANGES LIMIT 1;"
#
# DSS-SUGGESTIONS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS dss_suggestion;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS dss_suggestions_filtered;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DSS_SUGGESTIONS (id INT KEY, \"timestamp\" VARCHAR, \"event\" VARCHAR, \"assets\" ARRAY<VARCHAR>, \"type\" VARCHAR, \"confidence\" VARCHAR, \"suggestions\" VARCHAR, \"alert_id\" VARCHAR, \"alerting_component\" VARCHAR, \"vulnerabilities\" VARCHAR, \"risk_level\" VARCHAR, \"external_references\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='dss-suggestions', VALUE_FORMAT='JSON', PARTITIONS=1);"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DSS_SUGGESTIONS_FILTERED AS SELECT id, \"timestamp\" AS timestamp, \"event\" AS event, EXPLODE(\"assets\") AS asset, \"type\" AS type, \"confidence\" AS confidence, \"suggestions\" AS suggestions, \"alert_id\" AS alertID, \"alerting_component\" AS alertComponent, \"vulnerabilities\" AS vulnerabilities, \"risk_level\" AS riskLevel, EXPLODE(\"external_references\") AS externalReferences FROM DSS_SUGGESTIONS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DSS_SUGGESTIONS_AVRO (id INT KEY, TIMESTAMP VARCHAR, EVENT VARCHAR, ASSET VARCHAR, TYPE VARCHAR, CONFIDENCE VARCHAR, SUGGESTIONS VARCHAR, ALERTID VARCHAR, ALERTCOMPONENT VARCHAR, VULNERABILITIES VARCHAR, RISKLEVEL VARCHAR, EXTERNALREFERENCES VARCHAR) WITH (KAFKA_TOPIC='DSS_SUGGESTIONS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO DSS_SUGGESTIONS_AVRO SELECT id, timestamp AS TIMESTAMP, event AS EVENT, asset AS ASSET, type AS TYPE, confidence AS CONFIDENCE, AS_VALUE(suggestions) AS SUGGESTIONS, alertID AS ALERTID, alertComponent AS ALERTCOMPONENT, vulnerabilities AS VULNERABILITIES, riskLevel AS RISKLEVEL, externalReferences AS EXTERNALREFERENCES FROM DSS_SUGGESTIONS_FILTERED;"
#
# DTM
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS DTM_ALERT;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DTM_ALERT (id VARCHAR KEY, \"id\" VARCHAR, \"objects\" ARRAY<VARCHAR>, \"flow_id\" VARCHAR, \"event_type\" VARCHAR) WITH (KAFKA_TOPIC='dtm-alert', VALUE_FORMAT='JSON', PARTITIONS=1);"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS DTM_ALERTS_AVRO DELETE TOPIC;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DTM_ALERTS_AVRO (id INT KEY, alert_id VARCHAR, event_kind VARCHAR, signature_severity VARCHAR, affected_product VARCHAR, signature VARCHAR, action VARCHAR, severity VARCHAR, category VARCHAR, tags VARCHAR, community_id VARCHAR, timestamp VARCHAR, src_ip VARCHAR, count VARCHAR, src_port VARCHAR, dnsQry VARCHAR, version VARCHAR, dest_ip_rdns VARCHAR, httpHost VARCHAR, dest_geoip VARCHAR, ether VARCHAR, type VARCHAR, ethSource VARCHAR, tool VARCHAR, username VARCHAR, istanceKey VARCHAR, component VARCHAR, hostname VARCHAR, path VARCHAR, dest_ip VARCHAR, src_geoip VARCHAR, flow_id VARCHAR, dest_port VARCHAR, event_type VARCHAR, proto VARCHAR, src_ip_rdns VARCHAR, host VARCHAR, alert_type VARCHAR) WITH (KAFKA_TOPIC='DTM_ALERTS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO DTM_ALERTS_AVRO SELECT id, \"id\" AS alert_id, EXTRACTJSONFIELD(\"objects\"[1], '$.details.event_kind') AS event_kind, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.metadata.signature_severity') AS signature_severity, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.metadata.affected_product') AS affected_product, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.signature') AS signature, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.action') AS action, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') AS severity, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') AS category, EXTRACTJSONFIELD(\"objects\"[1], '$.details.tags') AS tags, EXTRACTJSONFIELD(\"objects\"[1], '$.details.community_id') AS community_id, EXTRACTJSONFIELD(\"objects\"[1], '$.details.timestamp') AS timestamp, EXTRACTJSONFIELD(\"objects\"[1], '$.details.src_ip') AS src_ip, EXTRACTJSONFIELD(\"objects\"[1], '$.details.count') AS count, EXTRACTJSONFIELD(\"objects\"[1], '$.details.src_port') AS src_port, EXTRACTJSONFIELD(\"objects\"[1], '$.details.dnsQry') AS dnsQry, EXTRACTJSONFIELD(\"objects\"[1], '$.details.@version') AS version, EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_ip_rdns') AS dest_ip_rdns, EXTRACTJSONFIELD(\"objects\"[1], '$.details.httpHost') AS httpHost, EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_geoip') AS dest_geoip, EXTRACTJSONFIELD(\"objects\"[1], '$.details.ether') AS ether, EXTRACTJSONFIELD(\"objects\"[1], '$.details.type') AS type, EXTRACTJSONFIELD(\"objects\"[1], '$.details.ethSource') AS ethSource, EXTRACTJSONFIELD(\"objects\"[1], '$.details.sphinx.tool') AS tool, EXTRACTJSONFIELD(\"objects\"[1], '$.details.sphinx.username') AS username, EXTRACTJSONFIELD(\"objects\"[1], '$.details.sphinx.instanceKey') AS istanceKey, EXTRACTJSONFIELD(\"objects\"[1], '$.details.sphinx.component') AS component, EXTRACTJSONFIELD(\"objects\"[1], '$.details.sphinx.hostname') AS hostname, EXTRACTJSONFIELD(\"objects\"[1], '$.details.path') AS path, EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_ip') AS dest_ip, EXTRACTJSONFIELD(\"objects\"[1], '$.details.src_geoip') AS src_geoip, EXTRACTJSONFIELD(\"objects\"[1], '$.details.flow_id') AS flow_id, EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_port') AS dest_port, EXTRACTJSONFIELD(\"objects\"[1], '$.details.event_type') AS event_type, EXTRACTJSONFIELD(\"objects\"[1], '$.details.proto') AS proto, EXTRACTJSONFIELD(\"objects\"[1], '$.details.src_ip_rdns') AS src_ip_rdns, EXTRACTJSONFIELD(\"objects\"[1], '$.details.host') AS host, CASE WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') LIKE '%BlackWeb%' THEN '1' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') LIKE '%MassiveDataProcessing%' THEN '2' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') LIKE '%PortDiscovery%' THEN '3' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') LIKE '%ReactivateAsset%' THEN '4' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') LIKE '%TcpAnalysisFlags%' THEN '5' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') LIKE '%Suricata %' THEN '6' ELSE '7' END AS alert_type FROM dtm_alert;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DTM_DSS AS SELECT a.\"id\" AS alertid, EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.alert.signature') AS description, CASE WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '1' THEN 'high' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '2' THEN 'medium' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '3' THEN 'low' ELSE 'low' END AS classification, EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.timestamp') AS timestamp, CASE WHEN EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_geoip.country_name') LIKE '' THEN '-' ELSE EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_geoip.country_name') END AS location, 'src_ip:' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.src_ip') + ':' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.src_port') +' dest-ip:' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_ip') + ':' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_port') AS indication, 'DTM' AS tool, 'OPEN' AS status, b.\"suggestions\" AS action, EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.alert') AS details, 'false' AS SENT FROM DTM_ALERT a LEFT OUTER JOIN DSS_SUGGESTIONS b WITHIN 24 HOURS ON a.\"id\" = b.\"alert_id\" EMIT CHANGES;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DTM_DSS_AVRO (alertid VARCHAR KEY, description VARCHAR, classification VARCHAR, timestamp VARCHAR, location VARCHAR, indication VARCHAR, tool VARCHAR, status VARCHAR, action ARRAY<VARCHAR>, details VARCHAR, sent VARCHAR) WITH (KAFKA_TOPIC='DTM_DSS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO DTM_DSS_AVRO SELECT alertid AS alertid, description AS description, classification AS classification, timestamp AS timestamp, location AS location, indication AS indication, tool AS tool, status AS status, action AS action, details AS details, sent AS sent FROM DTM_DSS_FILTER;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM DTM_DSS (alertid VARCHAR KEY, description VARCHAR, classification VARCHAR, timestamp VARCHAR, location VARCHAR, indication VARCHAR, tool VARCHAR, status VARCHAR, action ARRAY<VARCHAR>, details VARCHAR, SENT VARCHAR) WITH (KAFKA_TOPIC='dtm-dss', VALUE_FORMAT='JSON', PARTITIONS=1);"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO DTM_DSS SELECT a.\"id\" AS alertid, EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.alert.signature') AS description, CASE WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '1' THEN 'high' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '2' THEN 'medium' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '3' THEN 'low' ELSE 'low' END AS classification, EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.timestamp') AS timestamp, CASE WHEN EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_geoip.country_name') LIKE '' THEN '-' ELSE EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_geoip.country_name') END AS location, 'src_ip:' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.src_ip') + ':' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.src_port') +' dest-ip:' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_ip') + ':' + EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.dest_port') AS indication, 'DTM' AS tool, 'OPEN' AS status, b.\"suggestions\" AS action, EXTRACTJSONFIELD(a.\"objects\"[1], '$.details.alert') AS details, 'false' AS SENT FROM DTM_ALERT a LEFT OUTER JOIN DSS_SUGGESTIONS b WITHIN 24 HOURS ON a.\"id\" = b.\"alert_id\" EMIT CHANGES;"
# FROM DTM_ALERT a LEFT OUTER JOIN DSS_SUGGESTIONS b WITHIN 24 HOURS ON a."id" = b."alert_id" EMIT CHANGES;
#
# ECARE NONVALIDATED
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS ECARE_NONVALIDATED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_NONVALIDATED (ID VARCHAR KEY, \"id\" VARCHAR, \"name\" VARCHAR, \"attackType\" VARCHAR, \"start\" VARCHAR, \"end\" VARCHAR, \"eventsCount\" VARCHAR, \"data\" ARRAY<VARCHAR>, \"query\" VARCHAR, \"tag\" VARCHAR, \"riskScore\" VARCHAR, \"severity\" VARCHAR, \"uuid\" VARCHAR) WITH (KAFKA_TOPIC='ecare-nonvalidated', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_NONVALIDATED_FILTER AS SELECT ID, \"id\" AS ecare_id, \"name\" AS name, \"attackType\" AS attack_type, \"start\" AS start_nonvalidated, \"end\" AS end_nonvalidated, \"eventsCount\" AS events_count, EXPLODE(\"data\") AS data, \"query\" AS query_used, \"tag\" AS tag, \"riskScore\" AS risk_score, \"severity\" AS severity, \"uuid\" AS uuid FROM ECARE_NONVALIDATED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_NONVALIDATED_AVRO (ID VARCHAR KEY, ecare_id VARCHAR, name VARCHAR, attack_type VARCHAR, start_nonvalidated VARCHAR, end_nonvalidated VARCHAR, events_count VARCHAR, data_timestamp VARCHAR, data_last_seen VARCHAR, data_dst_host VARCHAR, data_src_ip VARCHAR, data_user VARCHAR, data_action VARCHAR, data_status VARCHAR, data_cont VARCHAR, data_mtd VARCHAR, query_used VARCHAR, tag VARCHAR, risk_score VARCHAR, severity VARCHAR, uuid VARCHAR) WITH (KAFKA_TOPIC='ECARE_NONVALIDATED_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ECARE_NONVALIDATED_AVRO SELECT id, ecare_id as ecare_id, name AS name, attack_type AS attack_type, start_nonvalidated AS start_nonvalidated, end_nonvalidated AS end_nonvalidated, events_count AS events_count, EXTRACTJSONFIELD(data, '$.@timestamp') AS data_timestamp, EXTRACTJSONFIELD(data, '$.last_seen') AS data_last_seen, EXTRACTJSONFIELD(data, '$.dst_host') AS data_dst_host, EXTRACTJSONFIELD(data, '$.src_ip') AS data_src_ip, EXTRACTJSONFIELD(data, '$.user') AS data_user, EXTRACTJSONFIELD(data, '$.action') AS data_action, EXTRACTJSONFIELD(data, '$.status') AS data_status, EXTRACTJSONFIELD(data, '$.cont') AS data_cont, EXTRACTJSONFIELD(data, '$.mtd') AS data_mtd, query_used AS query_used, tag AS tag, risk_score AS risk_score, severity AS severity, uuid AS uuid FROM ECARE_NONVALIDATED_FILTER;"
#
# ECARE LOGIN FAILURES
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS ECARE_LOGIN_FAILURES;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS ECARE_LOGIN_FAILURES_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_LOGIN_FAILURES (ID VARCHAR KEY, \"@timestamp\" VARCHAR, \"last_seen\" VARCHAR, \"dst_host\" VARCHAR, \"src_ip\" VARCHAR, \"user\" VARCHAR, \"action\" VARCHAR, \"status\" VARCHAR, \"cont\" VARCHAR) WITH (KAFKA_TOPIC='ecare-login-failures', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_LOGIN_FAILURES_AVRO (ID VARCHAR KEY, timestamp VARCHAR, last_seen VARCHAR, dst_host VARCHAR, src_ip VARCHAR, user VARCHAR, action VARCHAR, status VARCHAR, cont VARCHAR) WITH (KAFKA_TOPIC='ECARE_LOGIN_FAILURES_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ECARE_LOGIN_FAILURES_AVRO SELECT id, \"@timestamp\" as timestamp, \"last_seen\" AS last_seen, \"dst_host\" AS dst_host, \"src_ip\" AS src_ip, \"user\" AS user, \"action\" AS action, \"status\" AS status, \"cont\" AS cont FROM ECARE_LOGIN_FAILURES;"
#
# ECARE BRUTEFORCE
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS ECARE_BRUTEFORCE;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS ECARE_BRUTEFORCE_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_BRUTEFORCE (ID VARCHAR KEY, \"id\" VARCHAR, \"name\" VARCHAR, \"attackType\" VARCHAR, \"start\" VARCHAR, \"end\" VARCHAR, \"eventsCount\" VARCHAR, \"data\" ARRAY<VARCHAR>, \"query\" VARCHAR, \"tag\" VARCHAR, \"riskScore\" VARCHAR, \"severity\" VARCHAR, \"uuid\" VARCHAR) WITH (KAFKA_TOPIC='ecare-bruteforce', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_BRUTEFORCE_FILTER AS SELECT ID, \"id\" AS ecare_id, \"name\" AS name, \"attackType\" AS attack_type, \"start\" AS start_bruteforce, \"end\" AS end_bruteforce, \"eventsCount\" AS events_count, EXPLODE(\"data\") AS data, \"query\" AS query_used, \"tag\" AS tag, \"riskScore\" AS risk_score, \"severity\" AS severity, \"uuid\" AS uuid FROM ECARE_BRUTEFORCE;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ECARE_BRUTEFORCE_AVRO (ID VARCHAR KEY, ecare_id VARCHAR, name VARCHAR, attack_type VARCHAR, start_bruteforce VARCHAR, end_bruteforce VARCHAR, events_count VARCHAR, data_timestamp VARCHAR, data_last_seen VARCHAR, data_dst_host VARCHAR, data_src_ip VARCHAR, data_user VARCHAR, data_action VARCHAR, data_status VARCHAR, data_cont VARCHAR, data_mtd VARCHAR, query_used VARCHAR, tag VARCHAR, risk_score VARCHAR, severity VARCHAR, uuid VARCHAR) WITH (KAFKA_TOPIC='ECARE_BRUTEFORCE_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ECARE_BRUTEFORCE_AVRO SELECT id, ecare_id as ecare_id, name AS name, attack_type AS attack_type, start_bruteforce AS start_bruteforce, end_bruteforce AS end_bruteforce, events_count AS events_count, EXTRACTJSONFIELD(data, '$.@timestamp') AS data_timestamp, EXTRACTJSONFIELD(data, '$.last_seen') AS data_last_seen, EXTRACTJSONFIELD(data, '$.dst_host') AS data_dst_host, EXTRACTJSONFIELD(data, '$.src_ip') AS data_src_ip, EXTRACTJSONFIELD(data, '$.user') AS data_user, EXTRACTJSONFIELD(data, '$.action') AS data_action, EXTRACTJSONFIELD(data, '$.status') AS data_status, EXTRACTJSONFIELD(data, '$.cont') AS data_cont, EXTRACTJSONFIELD(data, '$.mtd') AS data_mtd, query_used AS query_used, tag AS tag, risk_score AS risk_score, severity AS severity, uuid AS uuid FROM ECARE_BRUTEFORCE_FILTER;"
#
# FDCE
#
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS FDCE_REPORT_TOPIC;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS FDCE_REPORT_TOPIC_AVRO;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_REPORT_TOPIC (id INT KEY, \"Report Name\" VARCHAR, \"Date\" VARCHAR, \"Status\" VARCHAR, \"Last Edited\" VARCHAR, \"Description\" VARCHAR) WITH (KAFKA_TOPIC='fdce-report-topic',PARTITIONS=1, VALUE_FORMAT='JSON');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_REPORT_TOPIC_AVRO (id INT KEY, REPORT VARCHAR, TIMESTAMP VARCHAR, STATUS VARCHAR, LASTEDITED VARCHAR, DESCRIPTION VARCHAR) WITH (KAFKA_TOPIC='FDCE_REPORT_TOPIC_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO FDCE_REPORT_TOPIC_AVRO SELECT id, \"Report Name\" AS REPORT, \"Date\" AS TIMESTAMP, \"Status\" AS STATUS, \"Last Edited\" AS LASTEDITED, \"Description\" AS DESCRIPTION FROM FDCE_REPORT_TOPIC;"
#
# FDCE ALERTS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS FDCE_ALERTS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS FDCE_ALERTS_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_ALERTS (id INT KEY, \"report_name\" VARCHAR, \"data_time\" VARCHAR, \"description\" VARCHAR , \"status\" VARCHAR) WITH (KAFKA_TOPIC='fdce-alerts', VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_ALERTS_AVRO (id INT KEY, REPORT_NAME VARCHAR, DATE_TIME VARCHAR, DESCRIPTION VARCHAR, STATUS VARCHAR) WITH (KAFKA_TOPIC='FDCE_ALERTS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO FDCE_ALERTS_AVRO SELECT id, \"report_name\" AS REPORT_NAME, \"data_time\" AS DATE_TIME, \"description\" AS DESCRIPTION, \"status\" AS STATUS FROM FDCE_ALERTS;"
#
# FDCE REPORT TOPIC
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS FDCE_REPORT_TOPIC;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS FDCE_REPORT_TOPIC_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_REPORT_TOPIC (id INT KEY, \"chain_of_evidence\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='fdce-report-topic',PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_REPORT_TOPIC_EXPLODED AS SELECT id, EXPLODE(\"chain_of_evidence\") AS chain_of_evidence FROM FDCE_REPORT_TOPIC;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_REPORT_TOPIC_FILTERED AS SELECT id, chain_of_evidence AS chain_of_evidence FROM FDCE_REPORT_TOPIC_EXPLODED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM FDCE_REPORT_TOPIC_AVRO (id INT KEY, CASE_ID VARCHAR, DATETIME VARCHAR, MESSAGE VARCHAR, DETAILS VARCHAR) WITH (KAFKA_TOPIC='FDCE_REPORT_TOPIC_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO FDCE_REPORT_TOPIC_AVRO SELECT id, EXTRACTJSONFIELD(chain_of_evidence, '$.case_id') AS CASE_ID, EXTRACTJSONFIELD(chain_of_evidence, '$.datetime') AS DATETIME, EXTRACTJSONFIELD(chain_of_evidence, '$.message') AS MESSAGE, EXTRACTJSONFIELD(chain_of_evidence, '$.details') AS DETAILS FROM FDCE_REPORT_TOPIC_FILTERED;"
#
# HP_CAPTURED_IPS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_CAPTURED_IPS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_CAPTURED_IPS_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_CAPTURED_IPS_FILTERED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_CAPTURED_IPS (id INT KEY, \"ip\" VARCHAR) WITH (KAFKA_TOPIC='hp-captured-ips', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_CAPTURED_IPS_FILTERED AS SELECT id, \"ip\" AS ip, TIMESTAMPTOSTRING(ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS') AS ts FROM HP_CAPTURED_IPS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_CAPTURED_IPS_AVRO (id INT KEY, IP VARCHAR, TS VARCHAR) WITH (KAFKA_TOPIC='HP_CAPTURED_IPS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO HP_CAPTURED_IPS_AVRO SELECT id, ip AS IP, ts as TS FROM HP_CAPTURED_IPS_FILTERED;"
#
# HP_CURRENTLY_CONNECTED_IPS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_CURRENTLY_CONNECTED_IPS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_CURRENTLY_CONNECTED_IPS_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_CURRENTLY_CONNECTED_IPS_FILTERED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_CURRENTLY_CONNECTED_IPS (id INT KEY, \"Connected\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='hp-currently-connected-ips', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_CURRENTLY_CONNECTED_IPS_CONNECTIONS AS SELECT id, EXPLODE(\"Connected\") AS Connected FROM HP_CURRENTLY_CONNECTED_IPS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_CURRENTLY_CONNECTED_IPS_FILTERED AS SELECT id, Connected AS Connected, TIMESTAMPTOSTRING(ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS') AS ts FROM HP_CURRENTLY_CONNECTED_IPS_CONNECTIONS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_CURRENTLY_CONNECTED_IPS_AVRO (id INT KEY, NAME VARCHAR, IP VARCHAR, SERVICE VARCHAR, TS VARCHAR) WITH (KAFKA_TOPIC='HP_CURRENTLY_CONNECTED_IPS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO HP_CURRENTLY_CONNECTED_IPS_AVRO SELECT id, EXTRACTJSONFIELD(Connected, '$.name') AS NAME, EXTRACTJSONFIELD(Connected, '$.ip') AS IP,  EXTRACTJSONFIELD(Connected, '$.service') AS SERVICE, ts as TS FROM HP_CURRENTLY_CONNECTED_IPS_FILTERED;"
#
# HP_INTERVAL_INFO
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_INTERVAL_INFO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_INTERVAL_INFO_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_INTERVAL_INFO_FILTERED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_INTERVAL_INFO (id INT KEY, \"id\" VARCHAR, \"name\" VARCHAR, \"cpu_activity\" VARCHAR, \"memory_usage\" VARCHAR, \"upload\" VARCHAR, \"download\" VARCHAR, \"db_usage\" VARCHAR) WITH (KAFKA_TOPIC='hp-interval-info', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_INTERVAL_INFO_FIRST_FILTER AS SELECT id, \"id\" AS hpid, \"name\" AS name, EXTRACTJSONFIELD(\"cpu_activity\", '$.value') AS cpuactivityval, EXTRACTJSONFIELD(\"cpu_activity\", '$.unit') AS cpuactivityunit, EXTRACTJSONFIELD(\"memory_usage\", '$.value') AS memoryusageval, EXTRACTJSONFIELD(\"memory_usage\", '$.unit') AS memoryusageunit, EXTRACTJSONFIELD(\"upload\", '$.value') AS uploadval, EXTRACTJSONFIELD(\"upload\", '$.unit') AS uploadunit, EXTRACTJSONFIELD(\"download\", '$.value') AS downloadval, EXTRACTJSONFIELD(\"download\", '$.unit') AS downloadunit, \"db_usage\" AS dbusage FROM HP_INTERVAL_INFO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_INTERVAL_INFO_FILTERED AS SELECT id, hpid as hpid, name AS name, cpuactivityval AS cpuactivityval, cpuactivityunit AS cpuactivityunit, memoryusageval AS memoryusageval, memoryusageunit AS memoryusageunit, uploadval AS uploadval, uploadunit AS uploadunit, downloadval AS downloadval, downloadunit AS downloadunit, dbusage AS dbusage, TIMESTAMPTOSTRING(ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS') AS ts FROM HP_INTERVAL_INFO_FIRST_FILTER;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_INTERVAL_INFO_AVRO (id INT KEY, HPID VARCHAR, NAME VARCHAR, CPUACTIVITYVAL VARCHAR, CPUACTIVITYUNIT VARCHAR, MEMORYUSAGEVAL VARCHAR, MEMORYUSAGEUNIT VARCHAR, UPLOADVAL VARCHAR, UPLOADUNIT VARCHAR, DOWNLOADVAL VARCHAR, DOWNLOADUNIT VARCHAR, DBUSAGE VARCHAR, TS VARCHAR) WITH (KAFKA_TOPIC='HP_INTERVAL_INFO_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO HP_INTERVAL_INFO_AVRO SELECT id, hpid AS HPID, name AS NAME, cpuactivityval AS CPUACTIVITYVAL, cpuactivityunit AS CPUACTIVITYUNIT, memoryusageval AS MEMORYUSAGEVAL, memoryusageunit AS MEMORYUSAGEUNIT, uploadval AS UPLOADVAL, uploadunit AS UPLOADUNIT, downloadval AS DOWNLOADVAL, downloadunit AS DOWNLOADUNIT, dbusage AS DBUSAGE, ts AS TS FROM HP_INTERVAL_INFO_FILTERED;"
#
# HP_MOST_USED
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_MOST_USED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_MOST_USED_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_MOST_USED_FILTERED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_MOST_USED (id INT KEY, \"honey_name\" VARCHAR, \"honey_id\" VARCHAR, \"usernames\" ARRAY<VARCHAR>, \"passwords\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='hp-most-used', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_MOST_USED_FIRST_FILTER AS SELECT id, \"honey_name\" AS honeyname, \"honey_id\" AS honeyid, EXPLODE(\"usernames\") AS usernames, EXPLODE(\"passwords\") AS passwords FROM HP_MOST_USED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_MOST_USED_FILTERED AS SELECT id, honeyname AS honeyname, honeyid AS honeyid, usernames AS usernames, passwords AS passwords, TIMESTAMPTOSTRING(ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS') AS ts FROM HP_MOST_USED_FIRST_FILTER;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_MOST_USED_AVRO (id INT KEY, HONEYNAME VARCHAR, HONEYID VARCHAR, USERNAME VARCHAR, UTIMES VARCHAR, PASSWORD VARCHAR, PTIMES VARCHAR, TS VARCHAR) WITH (KAFKA_TOPIC='HP_MOST_USED_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO HP_MOST_USED_AVRO SELECT id, honeyname AS HONEYNAME, honeyid AS HONEYID, EXTRACTJSONFIELD(usernames, '$.username') AS USERNAME, EXTRACTJSONFIELD(usernames, '$.times') AS UTIMES, EXTRACTJSONFIELD(passwords, '$.password') AS PASSWORD, EXTRACTJSONFIELD(passwords, '$.times') AS PTIMES, ts as TS FROM HP_MOST_USED_FILTERED;"
#
# HP_SERVICE_COUNTERS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_SERVICE_COUNTERS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_SERVICE_COUNTERS_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_SERVICE_COUNTERS_FILTERED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_SERVICE_COUNTERS (id INT KEY, \"name\" VARCHAR, \"stat\" VARCHAR) WITH (KAFKA_TOPIC='hp-service-counters', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_SERVICE_COUNTERS_FILTERED AS SELECT id, \"name\" AS name, \"stat\" AS stat, TIMESTAMPTOSTRING(ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS') AS ts FROM HP_SERVICE_COUNTERS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_SERVICE_COUNTERS_AVRO (id INT KEY, NAME VARCHAR, STAT VARCHAR, TS VARCHAR) WITH (KAFKA_TOPIC='HP_SERVICE_COUNTERS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO HP_SERVICE_COUNTERS_AVRO SELECT id, name AS NAME, stat AS STAT, ts as TS FROM HP_SERVICE_COUNTERS_FILTERED;"
#
# HP_STATIC_INFO
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_STATIC_INFO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_STATIC_INFO_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS HP_STATIC_INFO_FILTERED;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_STATIC_INFO (id INT KEY, \"name\" VARCHAR, \"isActive\" VARCHAR, \"Id\" VARCHAR, \"active_services\" VARCHAR, \"flavour\" VARCHAR, \"general_info\" VARCHAR) WITH (KAFKA_TOPIC='hp-static-info', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_STATIC_INFO_FILTERED AS SELECT id, \"name\" AS name, \"isActive\" as isactive, \"Id\" as hpid, EXTRACTJSONFIELD(\"active_services\", '$.ssh') AS ssh, EXTRACTJSONFIELD(\"active_services\", '$.ftp') AS ftp, EXTRACTJSONFIELD(\"active_services\", '$.smtp') AS smtp, EXTRACTJSONFIELD(\"active_services\", '$.http') AS http, \"flavour\" as flavour, \"general_info\" as generalinfo, TIMESTAMPTOSTRING(ROWTIME, 'yyyy-MM-dd HH:mm:ss.SSS') AS ts FROM HP_STATIC_INFO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM HP_STATIC_INFO_AVRO (id INT KEY, NAME VARCHAR, ISACTIVE VARCHAR, HPID VARCHAR, SSH VARCHAR, FTP VARCHAR, SMTP VARCHAR, HTTP VARCHAR, FLAVOUR VARCHAR, GENERALINFO VARCHAR, TS VARCHAR) WITH (KAFKA_TOPIC='HP_STATIC_INFO_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO HP_STATIC_INFO_AVRO SELECT id, name AS NAME, isactive AS ISACTIVE, hpid AS HPID, ssh AS SSH, ftp AS FTP, smtp AS SMTP, http AS HTTP, flavour AS FLAVOUR, generalinfo AS GENERALINFO, ts AS TS FROM HP_STATIC_INFO_FILTERED;"
#
# KB_INDICATORS
#
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS KB_INDICATORS;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS KB_INDICATORS_AVRO;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM KB_INDICATORS (\"id\" INT KEY, \"articles\" VARCHAR, \"users\" VARCHAR, \"url\" VARCHAR) WITH (KAFKA_TOPIC='kb-indicators', PARTITIONS=3, VALUE_FORMAT='JSON');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM KB_INDICATORS_AVRO (id INT KEY, ARTICLES VARCHAR, USERS VARCHAR, URL VARCHAR) WITH (KAFKA_TOPIC='KB_INDICATORS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO KB_INDICATORS_AVRO SELECT \"id\" as id, \"articles\" AS ARTICLES, \"users\" AS USERS, \"url\" AS URL FROM KB_INDICATORS;"
#
# RCRA
#
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_REPORT_TOPIC;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_REPORT_TOPIC_AVRO;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_REPORT_TOPIC (id INT KEY, \"Threat Detected\" VARCHAR, \"Date\" VARCHAR, \"Asset\" VARCHAR, \"Risk Level\" VARCHAR) WITH (KAFKA_TOPIC='rcra-report-topic', VALUE_FORMAT='JSON');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_REPORT_TOPIC_AVRO (id INT KEY, THREAT VARCHAR, TIMESTAMP VARCHAR, ASSET VARCHAR, RISK VARCHAR) WITH (KAFKA_TOPIC='RCRA_REPORT_TOPIC_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO RCRA_REPORT_TOPIC_AVRO SELECT id, \"Threat Detected\" AS THREAT, \"Date\" AS TIMESTAMP, \"Asset\" AS ASSET, \"Risk Level\" AS RISK FROM RCRA_REPORT_TOPIC;"
#
# RCRA ALERTS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_ALERTS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_ALERTS_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_ALERTS (ID VARCHAR KEY, \"alert_type\" VARCHAR, \"alert_severity\" VARCHAR, \"date_time\" VARCHAR, \"asset\" VARCHAR, \"threat\" VARCHAR, \"asset_url\" VARCHAR, \"pages_update_url\" ARRAY<VARCHAR>, \"risk_reports\" ARRAY<VARCHAR>) WITH (KAFKA_TOPIC='rcra-alerts', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_ALERTS_FILTERED AS SELECT ID, \"alert_type\" AS alert_type, \"alert_severity\" AS alert_severity, \"date_time\" AS date_time, \"asset\" AS asset, \"threat\" AS threat, \"asset_url\" AS asset_url, EXPLODE(IFNULL(\"pages_update_url\", ARRAY['-'])) AS page_update_url, EXPLODE(IFNULL(\"risk_reports\", ARRAY['-'])) AS risk_report FROM RCRA_ALERTS emit changes;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_ALERTS_AVRO (id VARCHAR KEY, ALERT_TYPE VARCHAR, ALERT_SEVERITY VARCHAR, DATE_TIME VARCHAR, ASSET_IP VARCHAR, ASSET_COMMON_ID VARCHAR, ASSET_LAST_TOUCHED VARCHAR, THREAT VARCHAR, ASSET_URL VARCHAR, PAGE_UPDATE_URL VARCHAR, RISK_REPORT_URL VARCHAR) WITH (KAFKA_TOPIC='RCRA_ALERTS_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO RCRA_ALERTS_AVRO SELECT id, alert_type AS ALERT_TYPE, alert_severity AS ALERT_SEVERITY, date_time AS DATE_TIME, EXTRACTJSONFIELD(asset, '$.asset_ip') AS ASSET_IP, EXTRACTJSONFIELD(asset, '$.asset_common_id') AS ASSET_COMMON_ID, EXTRACTJSONFIELD(asset, '$.last_touched') AS ASSET_LAST_TOUCHED, threat AS THREAT, asset_url AS ASSET_URL, page_update_url AS PAGE_UPDATE_URL, EXTRACTJSONFIELD(risk_report, '$.report_url') AS RISK_REPORT_URL FROM RCRA_ALERTS_FILTERED;"
#
# RCRA ASSET REPUTATION
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_ASSET_REPUTATION;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_ASSET_REPUTATION_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_ASSET_REPUTATION (ID VARCHAR KEY, \"index\" VARCHAR, \"source_hospital_id\" VARCHAR, \"asset_id\" VARCHAR, \"asset_value\" VARCHAR, \"asset_type\" VARCHAR, \"count\" VARCHAR, \"first_update\" VARCHAR, \"last_update\" VARCHAR, \"reputation\" VARCHAR, \"reputation_speed\" VARCHAR, \"weighted_importance\" VARCHAR, \"asset_ip\" VARCHAR) WITH (KAFKA_TOPIC='rcra-asset-reputation', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_ASSET_REPUTATION_AVRO (id VARCHAR KEY, INDEX VARCHAR, SOURCE_HOSPITAL_ID VARCHAR, ASSET_ID VARCHAR, ASSET_VALUE VARCHAR, ASSET_TYPE VARCHAR, COUNT VARCHAR, FIRST_UPDATE VARCHAR, LAST_UPDATE VARCHAR, REPUTATION VARCHAR, REPUTATION_SPEED VARCHAR, WEIGHTED_IMPORTANCE VARCHAR, ASSET_IP VARCHAR) WITH (KAFKA_TOPIC='RCRA_ASSET_REPUTATION_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO RCRA_ASSET_REPUTATION_AVRO SELECT id, \"index\" AS INDEX, \"source_hospital_id\" AS SOURCE_HOSPITAL_ID, \"asset_id\" AS ASSET_ID, \"asset_value\" AS ASSET_VALUE, \"asset_type\" AS ASSET_TYPE, \"count\" AS COUNT, \"first_update\" AS FIRST_UPDATE, \"last_update\" AS LAST_UPDATE, \"reputation\" AS REPUTATION, \"reputation_speed\" AS REPUTATION_SPEED, \"weighted_importance\" AS WEIGHTED_IMPORTANCE, \"asset_ip\" AS ASSET_IP FROM RCRA_ASSET_REPUTATION;"
#
# RCRA REPORT TOPIC
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_REPORT;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS RCRA_REPORT_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_REPORT (id INT KEY, \"report_info\" VARCHAR, \"assset\" VARCHAR, \"threat\" VARCHAR, \"risk\" VARCHAR) WITH (KAFKA_TOPIC='rcra-report-topic', VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM RCRA_REPORT_TOPIC_AVRO (
id INT KEY, 
REPORT_DATE_TIME VARCHAR, 
REPORT_TYPE VARCHAR, 
ASSET_ID VARCHAR, 
ASSET_NAME VARCHAR, 
ASSET_IP VARCHAR, 
ASSET_MAC VARCHAR,
ASSET_LAST_TOUCHED VARCHAR, 
ASSET_VULNERABILITIES VARCHAR, 
THREAT_NAME VARCHAR, 
THREAT_CAPEC_ID VARCHAR, 
THREAT_CAPEC_NAME VARCHAR, 
THREAT_CAPEC_ABSTRACTION VARCHAR, 
THREAT_CAPEC_LIKELIHOOD VARCHAR, 
THREAT_CAPEC_SEVERITY VARCHAR, 
THREAT_ASSET_SKILL VARCHAR, 
THREAT_ASSET_MOTIVE VARCHAR, 
THREAT_ASSET_SOURCE VARCHAR, 
THREAT_ASSET_ACTOR VARCHAR, 
THREAT_ASSET_OPPORTUNITY VARCHAR, 
RISK_SERVICE_INSURANCE_CHECK VARCHAR, 
RISK_THREAT_OCCURANCE VARCHAR, 
RISK_MATERIALISATION VARCHAR, 
RISK_UNAUTH_MODIFICATIONS VARCHAR, 
RISK_UNDER_MAINTENANCE VARCHAR, 
RISK_EXPOSURE_THREAT_OCCURENCE VARCHAR, 
RISK_OBJECTIVE_CONFIDENTIALITY_LOW VARCHAR, 
RISK_OBJECTIVE_CONFIDENTIALITY_MEDIUM VARCHAR, 
RISK_OBJECTIVE_CONFIDENTIALITY_HIGH VARCHAR, 
RISK_OBJECTIVE_INTEGRITY_LOW VARCHAR, 
RISK_OBJECTIVE_INTEGRITY_MEDIUM VARCHAR, 
RISK_OBJECTIVE_INTEGRITY_HIGH VARCHAR, 
RISK_OBJECTIVE_AVAILABILITY_LOW VARCHAR, 
RISK_OBJECTIVE_AVAILABILITY_MEDIUM VARCHAR, 
RISK_OBJECTIVE_AVAILABILITY_HIGH VARCHAR, 
RISK_OBJECTIVE_MONETARY_LOW VARCHAR, 
RISK_OBJECTIVE_MONETARY_MEDIUM VARCHAR, 
RISK_OBJECTIVE_MONETARY_HIGH VARCHAR, 
RISK_OBJECTIVE_SAFETY_LOW VARCHAR, 
RISK_OBJECTIVE_SAFETY_MEDIUM VARCHAR, 
RISK_OBJECTIVE_SAFETY_HIGH VARCHAR, 
RISK_OBJECTIVE_CIA_MOST_PROBABLE_SCENARIOS VARCHAR, 
RISK_OBJECTIVE_EVALUATION_MOST_PROBABLE_SCENARIOS VARCHAR, 
RISK_ALERT_CONFIDENTIALITY_LEVEL VARCHAR, 
RISK_ALERT_CONFIDENTIALITY_THRESHOLD VARCHAR
) WITH (KAFKA_TOPIC='RCRA_REPORT_TOPIC_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO RCRA_REPORT_TOPIC_AVRO 
SELECT id,
EXTRACTJSONFIELD(\"report_info\", '$.date_time') AS REPORT_DATE_TIME,
EXTRACTJSONFIELD(\"report_info\", '$.type') AS REPORT_TYPE,
EXTRACTJSONFIELD(\"assset\", '$.id') AS ASSET_ID,
EXTRACTJSONFIELD(\"assset\", '$.name') AS ASSET_NAME,
EXTRACTJSONFIELD(\"assset\", '$.ip') AS ASSET_IP,
EXTRACTJSONFIELD(\"assset\", '$.mac') AS ASSET_MAC,
EXTRACTJSONFIELD(\"assset\", '$.last_touched') AS ASSET_LAST_TOUCHED,
EXTRACTJSONFIELD(\"assset\", '$.vulnerabilities') AS ASSET_VULNERABILITIES,
EXTRACTJSONFIELD(\"threat\", '$.name') AS THREAT_NAME,
EXTRACTJSONFIELD(\"threat\", '$.capec_info.capec_id') AS THREAT_CAPEC_ID,
EXTRACTJSONFIELD(\"threat\", '$.capec_info.name') AS THREAT_CAPEC_NAME,
EXTRACTJSONFIELD(\"threat\", '$.capec_info.abstraction') AS THREAT_CAPEC_ABSTRACTION,
EXTRACTJSONFIELD(\"threat\", '$.capec_info.likelihood') AS THREAT_CAPEC_LIKELIHOOD,
EXTRACTJSONFIELD(\"threat\", '$.capec_info.typical_severity') AS THREAT_CAPEC_SEVERITY,
EXTRACTJSONFIELD(\"threat\", '$.threat_asset_info.skill_level') AS THREAT_ASSET_SKILL,
EXTRACTJSONFIELD(\"threat\", '$.threat_asset_info.motive') AS THREAT_ASSET_MOTIVE,
EXTRACTJSONFIELD(\"threat\", '$.threat_asset_info.source') AS THREAT_ASSET_SOURCE,
EXTRACTJSONFIELD(\"threat\", '$.threat_asset_info.actor') AS THREAT_ASSET_ACTOR,
EXTRACTJSONFIELD(\"threat\", '$.threat_asset_info.opportunity') AS THREAT_ASSET_OPPORTUNITY,
EXTRACTJSONFIELD(\"risk\", '$.static_info.service_insurance_check') AS RISK_SERVICE_INSURANCE_CHECK,
EXTRACTJSONFIELD(\"risk\", '$.static_info.threat_occurance') AS RISK_THREAT_OCCURANCE,
EXTRACTJSONFIELD(\"risk\", '$.static_info.materialisation') AS RISK_MATERIALISATION,
EXTRACTJSONFIELD(EXTRACTJSONFIELD(\"risk\", '$.static_info'), '$[\\"Unauthorised modifications of data\\"]') AS RISK_UNAUTH_MODIFICATIONS,
EXTRACTJSONFIELD(EXTRACTJSONFIELD(\"risk\", '$.static_info'), '$[\\"Under maintenance\\"]') AS RISK_UNDER_MAINTENANCE,
EXTRACTJSONFIELD(\"risk\", '$.exposure_threat.occurrence') AS RISK_EXPOSURE_THREAT_OCCURENCE,
EXTRACTJSONFIELD(\"risk\", '$.objectives.confidentiality.low') AS RISK_OBJECTIVE_CONFIDENTIALITY_LOW,
EXTRACTJSONFIELD(\"risk\", '$.objectives.confidentiality.medium') AS RISK_OBJECTIVE_CONFIDENTIALITY_MEDIUM,
EXTRACTJSONFIELD(\"risk\", '$.objectives.confidentiality.high') AS RISK_OBJECTIVE_CONFIDENTIALITY_HIGH,
EXTRACTJSONFIELD(\"risk\", '$.objectives.integrity.low') AS RISK_OBJECTIVE_INTEGRITY_LOW,
EXTRACTJSONFIELD(\"risk\", '$.objectives.integrity.medium') AS RISK_OBJECTIVE_INTEGRITY_MEDIUM,
EXTRACTJSONFIELD(\"risk\", '$.objectives.integrity.high') AS RISK_OBJECTIVE_INTEGRITY_HIGH,
EXTRACTJSONFIELD(\"risk\", '$.objectives.availability.low') AS RISK_OBJECTIVE_AVAILABILITY_LOW,
EXTRACTJSONFIELD(\"risk\", '$.objectives.availability.medium') AS RISK_OBJECTIVE_AVAILABILITY_MEDIUM,
EXTRACTJSONFIELD(\"risk\", '$.objectives.availability.high') AS RISK_OBJECTIVE_AVAILABILITY_HIGH,
EXTRACTJSONFIELD(\"risk\", '$.objectives.monetary.low') AS RISK_OBJECTIVE_MONETARY_LOW,
EXTRACTJSONFIELD(\"risk\", '$.objectives.monetary.medium') AS RISK_OBJECTIVE_MONETARY_MEDIUM,
EXTRACTJSONFIELD(\"risk\", '$.objectives.monetary.high') AS RISK_OBJECTIVE_MONETARY_HIGH,
EXTRACTJSONFIELD(\"risk\", '$.objectives.safety.low') AS RISK_OBJECTIVE_SAFETY_LOW,
EXTRACTJSONFIELD(\"risk\", '$.objectives.safety.medium') AS RISK_OBJECTIVE_SAFETY_MEDIUM,
EXTRACTJSONFIELD(\"risk\", '$.objectives.safety.high') AS RISK_OBJECTIVE_SAFETY_HIGH,
EXTRACTJSONFIELD(\"risk\", '$.objectives.utilities.CIA.most_probable_scenarios') AS RISK_OBJECTIVE_CIA_MOST_PROBABLE_SCENARIOS,
EXTRACTJSONFIELD(\"risk\", '$.objectives.utilities.Evaluation.most_probable_scenarios') AS RISK_OBJECTIVE_EVALUATION_MOST_PROBABLE_SCENARIOS,
EXTRACTJSONFIELD(\"risk\", '$.objectives.alerts.objectives.confidentiality.level') AS RISK_ALERT_CONFIDENTIALITY_LEVEL,
EXTRACTJSONFIELD(\"risk\", '$.objectives.alerts.objectives.confidentiality.threshold') AS RISK_ALERT_CONFIDENTIALITY_THRESHOLD
FROM RCRA_REPORT;"
#
# SIEM ALERTS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS SIEM_ALERTS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS SIEM_ALERTS_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM SIEM_ALERTS (id VARCHAR KEY, \"id\" VARCHAR, \"name\" VARCHAR, \"attackType\" VARCHAR, \"start\" VARCHAR, \"end\" VARCHAR, \"eventsCount\" VARCHAR, \"data\" ARRAY<VARCHAR>, \"query\" VARCHAR, \"tag\" VARCHAR, \"riskScore\" VARCHAR, \"severity\" VARCHAR, \"uuid\" VARCHAR) WITH (KAFKA_TOPIC='siem-alerts', PARTITIONS=1, VALUE_FORMAT='JSON');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM SIEM_ALERTS_EXPLODED AS SELECT id, \"id\" as \"id\", \"name\" AS \"name\", \"attackType\" AS \"attackType\", \"start\" AS \"start\", \"end\" AS \"end\", \"eventsCount\" AS \"eventsCount\", EXPLODE(\"data\") AS data, \"query\" AS \"query\", \"tag\" AS \"tag\", \"riskScore\" AS \"riskScore\", \"severity\" AS \"severity\", \"uuid\" AS \"uuid\" FROM SIEM_ALERTS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM SIEM_ALERTS_AVRO (id VARCHAR KEY, ALERTID VARCHAR, NAME VARCHAR, ATTACKTYPE VARCHAR, START VARCHAR, ENDQUERY VARCHAR, EVENTSCOUNT VARCHAR, ASSETIP VARCHAR, ACTION VARCHAR, AGG VARCHAR, QUERY_SQL VARCHAR, TAG VARCHAR, RISKSCORE VARCHAR, SEVERITY VARCHAR, UUID VARCHAR) WITH (KAFKA_TOPIC='SIEM_ALERTS_AVRO',PARTITIONS=1,VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO SIEM_ALERTS_AVRO SELECT id AS id, \"id\" AS ALERTID, \"name\" AS NAME, \"attackType\" AS ATTACKTYPE, \"start\" AS START, \"end\" AS ENDQUERY, \"eventsCount\" AS EVENTSCOUNT, EXTRACTJSONFIELD(data, '$.Asset_IP') AS ASSETIP, EXTRACTJSONFIELD(data, '$.action') AS ACTION, EXTRACTJSONFIELD(data, '$.agg') AS AGG, \"query\" AS QUERY_SQL, \"tag\" AS TAG, \"riskScore\" AS RISKSCORE, \"severity\" SEVERITY, \"uuid\" AS UUID FROM SIEM_ALERTS_EXPLODED;"
#
# VAAAS
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS VAAAS_REPORT_AVRO DELETE TOPIC;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS VAAAS_REPORTS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM VAAAS_REPORTS (id INT KEY, \"data\" VARCHAR) WITH (KAFKA_TOPIC='vaaas-reports', VALUE_FORMAT='JSON', PARTITIONS=3);"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM VAAAS_REPORT_AVRO (id INT KEY, data VARCHAR) WITH (KAFKA_TOPIC='VAAAS_REPORT_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO VAAAS_REPORT_AVRO SELECT id, EXTRACTJSONFIELD("data", '$["vaaas-reports"]') AS data FROM VAAAS_REPORTS;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM VAAAS_REPORTS_FILTERED AS SELECT id as id, REPLACE(\"data\", '\\\\\"', '') as data FROM VAAAS_REPORTS;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO VAAAS_REPORT_AVRO SELECT id, data AS data FROM VAAAS_REPORTS_FILTERED;"
##kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO VAAAS_REPORT_AVRO SELECT id, \"data\" AS data FROM VAAAS_REPORTS;"
#
# ALERTS TABLE
#
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS ID_ALERTS;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ID_ALERTS (ID VARCHAR KEY, ALERTID VARCHAR, DESCRIPTION VARCHAR, CLASSIFICATION VARCHAR, TIMESTAMP VARCHAR, LOCATION VARCHAR, INDICATION VARCHAR, TOOL VARCHAR, STATUS VARCHAR, ACTION VARCHAR, DETAILS VARCHAR, SENT VARCHAR) WITH (KAFKA_TOPIC='ID_ALERTS', PARTITIONS=1, VALUE_FORMAT='AVRO');"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ID_ALERTS SELECT id, EXTRACTJSONFIELD(\"objects\"[1], '$.id') AS ALERTID, IFNULL(EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.signature'), '-') AS DESCRIPTION, CASE WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '1' THEN 'high' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '2' THEN 'medium' WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.severity') LIKE '3' THEN 'low' ELSE 'low' END AS CLASSIFICATION, EXTRACTJSONFIELD(\"objects\"[1], '$.details.timestamp') AS TIMESTAMP, CASE WHEN EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_geoip.country_name') LIKE '' THEN '-' ELSE EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_geoip.country_name') END AS LOCATION, 'src_ip:' + EXTRACTJSONFIELD(\"objects\"[1], '$.details.src_ip') + ':' + EXTRACTJSONFIELD(\"objects\"[1], '$.details.src_port') +' dest-ip:' + EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_ip') + ':' + EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_port') AS indication, 'DTM' AS TOOL, 'OPEN' AS STATUS, '-' AS ACTION, IFNULL(EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert'), '-') AS DETAILS, 'false' AS SENT FROM DTM_ALERT;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ID_ALERTS SELECT id AS ID, AS_VALUE(ALERTID) AS ALERTID, IFNULL(ALGORITHMTYPE, '-') AS DESCRIPTION, 'medium' AS CLASSIFICATION, TIMESTAMP AS TIMESTAMP, '-' AS LOCATION, IFNULL(PROTOCOLFLOWLOWERIP, '-') AS INDICATION, 'AD' AS TOOL, 'OPEN' AS STATUS, '-' ACTION, IFNULL(TEXT, '-') AS DETAILS, 'false' AS SENT FROM AD_ALERT_AVRO;"
kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ID_ALERTS SELECT id, EXTRACTJSONFIELD(asset, '$.asset_common_id') AS ALERTID, alert_type AS DESCRIPTION, CASE WHEN alert_severity LIKE '1' THEN 'low' WHEN alert_severity LIKE '2' THEN 'medium' WHEN alert_severity LIKE '3' THEN 'high' ELSE 'low' END AS CLASSIFICATION, date_time AS TIMESTAMP, '-' AS LOCATION,  EXTRACTJSONFIELD(asset, '$.asset_ip') AS INDICATION, 'RCRA' AS TOOL, 'OPEN' AS STATUS, '-' AS ACTION, 'asset_common_id: ' + IFNULL(EXTRACTJSONFIELD(asset, '$.asset_common_id'), 'null') + ', last_touched: ' + IFNULL(EXTRACTJSONFIELD(asset, '$.last_touched'), 'null') + ', asset_url: ' + IFNULL(asset_url, 'null') + ', threat: ' + IFNULL(threat, 'null') AS DETAILS, 'false' AS SENT FROM RCRA_ALERTS_FILTERED;"
#kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ID_ALERTS SELECT alertid AS ID, AS_VALUE(alertid) AS ALERTID, IFNULL(description, '-') AS DESCRIPTION, classification AS CLASSIFICATION, timestamp AS TIMESTAMP, IFNULL(location, '-') AS LOCATION, IFNULL(indication, '-') AS INDICATION, tool AS TOOL, status AS STATUS, IFNULL(ARRAY_JOIN(action, ''), '-') AS ACTION, IFNULL(details, '-') AS DETAILS, sent AS SENT FROM DTM_DSS_AVRO;"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "DROP STREAM IF EXISTS JDBC_SOURCE_AVRO;"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM ALERT_TABLE (ID VARCHAR KEY, SUGGESTIONID VARCHAR, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, LOCATION VARCHAR, INDICATION VARCHAR, TOOL VARCHAR, STATUS VARCHAR, ACTION ARRAY<VARCHAR>, DETAILS VARCHAR, SENT VARCHAR) WITH (KAFKA_TOPIC='JDBC_SOURCE_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "CREATE STREAM JDBC_SOURCE_AVRO (ALERTID VARCHAR KEY, SUGGESTIONID VARCHAR, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, LOCATION VARCHAR, INDICATION VARCHAR, TOOL VARCHAR, STATUS VARCHAR, ACTION ARRAY<VARCHAR>, DETAILS VARCHAR, SENT VARCHAR) WITH (KAFKA_TOPIC='JDBC_SOURCE_AVRO', PARTITIONS=1, VALUE_FORMAT='JSON');"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO JDBC_SOURCE_AVRO SELECT alertid AS ALERTID, suggestionid AS SUGGESTIONID, description AS DESCRIPTION, timestamp AS TIMESTAMP, location AS LOCATION, indication AS INDICATION, 'DTM' AS TOOL, 'OPEN' AS STATUS, action AS ACTION, details AS DETAILS, 'false' AS SENT FROM DTM_DSS;"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO ALERT_TABLE SELECT ALERTID AS ID, SUGGESTIONID AS SUGGESTIONID, DESCRIPTION AS DESCRIPTION, TIMESTAMP AS TIMESTAMP, LOCATION AS LOCATION, INDICATION AS INDICATION, TOOL AS TOOL, STATUS AS STATUS, ACTION AS ACTION, DETAILS AS DETAILS, SENT AS SENT FROM JDBC_SOURCE_AVRO;"
# INSERT INTO ALERT_TABLE SELECT COUNT(*) as id, ALERTID AS ALERTID, SUGGESTIONID AS SUGGESTIONID, DESCRIPTION AS DESCRIPTION, TIMESTAMP AS TIMESTAMP, LOCATION AS LOCATION, INDICATION AS INDICATION, TOOL AS TOOL, STATUS AS STATUS, ACTION AS ACTION, DETAILS AS DETAILS, SENT AS SENT FROM JDBC_SOURCE_AVRO GROUP BY (ALERTID, SUGGESTIONID, DESCRIPTION, TIMESTAMP, LOCATION, INDICATION, TOOL, STATUS, ACTION, DETAILS, SENT);
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO JDBC_SOURCE_AVRO SELECT id, alertid AS ALERTID, suggestionid AS SUGGESTIONID, event AS DESCRIPTION, timestamp AS TIMESTAMP, '--' AS LOCATION, destinationIP AS INDICATION, 'DSS' AS TOOL, 'OPEN' AS STATUS,  EXTRACTJSONFIELD(suggestion, '$.suggestion') AS ACTION, EXTRACTJSONFIELD(suggestion, '$.risk_reduction_level') AS DETAILS, 'false' AS SENT FROM dss_suggestions_filtered;"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO JDBC_SOURCE_AVRO SELECT id, \"id\" AS ALERTID, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert.category') AS DESCRIPTION, EXTRACTJSONFIELD(\"objects\"[1], '$.details.timestamp') AS TIMESTAMP, EXTRACTJSONFIELD(\"objects\"[1], '$.details.dest_geoip.country_name') AS LOCATION, '--' AS INDICATION, 'DTM' AS TOOL, 'OPEN' AS STATUS,  '--' AS ACTION, EXTRACTJSONFIELD(\"objects\"[1], '$.details.alert') AS DETAILS, 'false' AS SENT FROM dtm_alert;"
# kubectl exec -it ${ksqldbserver:0:${#ksqldbserver}} /bin/bash -- ksql -e "INSERT INTO JDBC_SOURCE_AVRO SELECT id, "-" AS ALERTID, ALGORITHMTYPE AS DESCRIPTION, TIMESTAMP AS TIMESTAMP, '-' AS LOCATION, PROTOCOLFLOWLOWERIP AS INDICATION, 'AD' AS TOOL, 'OPEN' AS STATUS, '-' ACTION, TEXT AS DETAILS, 'false' AS SENT FROM AD_ALERT_AVRO;"