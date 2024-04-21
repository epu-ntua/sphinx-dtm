SET ksqlserverpod
SET ksqlclipod
FOR /F "tokens=*" %a in ('kubectl get pods -o=name --selector=channels=ksql-server') do SET ksqlserverpod=%a
FOR /F "tokens=*" %a in ('kubectl get pods -o=name --selector=channels=ksql-cli') do SET ksqlclipod=%a
CMD /C kubectl exec --stdin --tty %ksqlclipod% -- ksql http://ksqldb-server:8088
CMD /C "
CREATE SOURCE CONNECTOR jdbc_source WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSourceConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'topic.prefix'             = 'jdbc_',
  'table.whitelist'          = 'table_source_ad, table_source_ae, table_source_bbtr, table_source_dss, table_source_dtm, table_source_hp, table_source_kb, table_source_rcra, table_source_siem, table_source_vaaas',
  'mode'                     = 'bulk'
);"
CMD /C "
CREATE SINK CONNECTOR jdbc_dest WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'tasks.max'		     = '10',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.json.JsonConverter',
  'value.converter.schema.registry.url'= 'http://cp-schema-registry:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'topics'                    = 'JDBC_SOURCE_JSON',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true
);"

