# Simavi Kubernetes documentation
v15.01.2021
---
This is the documentation that provides information about Simavi components and steps for testing and deployment.

---
## List of deployments
---
 - PostgreSQL
 - Elasticsearch
 - Schema Registry
 - KSQLDB Server
 - KSQLDB CLI
 - Data Traffic Monitoring
 - Anomaly Detection
 - Interactive Dashboards (utilities for Grafana)
 - Interactive Dashboards (Grafana Dashboards)
 - User Interface (for DTM, AD and ID - Grafana)
 
---
## Important scripts/steps to be executed 
---
### Schema Registry

Schema Registry needs to connect to the Kafka Server, provided in the yml file
```sh
                - name: SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS
                  value: 'PLAINTEXT://Sphinx:9092'
```
After the bootstrap server is modified, we need to configure through [Apache Kafka binary](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.5.1/kafka_2.12-2.5.1.tgz) the _schema topic inside Kafka Server.
```sh
$ KAFKA_PATH="C:\Tools\Kafka\kafka_2.12-2.5.0\bin"
$ cd $KAFKA_PATH
$ ./kafka-configs.sh --bootstrap-server Sphinx:9092 --entity-type topics --entity-name _schemas --alter --add-config cleanup.policy=compact
```

---
## Tests
---
In order to test the integrations between components, we provided a list of tests and steps for each one.

| Tests_to_be_run | Script |
| ------ | ------ |
| DTM - PostgreSQL | [Scripts/simavi-dtm-ad-id-psql-testing.sh](https://git.siveco.ro/SPHINX/SPHINX/edit/develop/kubernetes/Scripts/simavi-dtm-ad-id-psql-testing.sh) |
| AD - PostgreSQL | [Scripts/simavi-dtm-ad-id-psql-testing.sh](https://git.siveco.ro/SPHINX/SPHINX/edit/develop/kubernetes/Scripts/simavi-dtm-ad-id-psql-testing.sh) |
| ID(utilities) - PostgreSQL | [Scripts/simavi-dtm-ad-id-psql-testing.sh](https://git.siveco.ro/SPHINX/SPHINX/edit/develop/kubernetes/Scripts/simavi-dtm-ad-id-psql-testing.sh) |
| Schema Registry - KSQL - PostgreSQL | [Scripts/simavi-sr-ksql-psql-testing.sh](https://git.siveco.ro/SPHINX/SPHINX/edit/develop/kubernetes/Scripts/simavi-sr-ksql-psql-testing.sh) |
| Elasticsearch - Grafana | [Scripts/simavi-sr-ksql-psql-testing.sh](https://git.siveco.ro/SPHINX/SPHINX/edit/develop/kubernetes/Scripts/simavi-sr-ksql-psql-testing.sh) |

### General:

```sh
$ ./simavi-dtm-ad-id-psql-testing.sh 
```



### DTM - PostgreSQL

```sh
$ minikube service dtm-service
$ curl http://[ip_given_by_minikube]:[port]/sphinx/dtm/swagger-ui.html#/instance-controller/getInstanceUsingGET
```
Expected output:
```sh
{
		id: 1,
		jpa: 3,
		created_date: '2021-01-04',
		update_date: '2021-01-04',
		title: 'First_test',
		description: 'Test Description',		
		key: '1234567',
		enabled: true,
		host: 'http://localhost:8087/sphinx/dtm',
		isMaster: true,
		hasSuricata: true,
		hasTashark: true
}
```

### AD - PostgreSQL (not working yet)

```sh
$ minikube service ad-service
$ curl http://[ip_given_by_minikube]:[port]/sphinx/ad/component/list
```

Expected output:
```sh
{1, 3, '2021-01-04', '2021-01-04', 'First AD test', 'Decription testing', true, '-', true}
```

### ID - PostgreSQL

```sh
$ minikube service id-service 
$ curl http://[ip_given_by_minikube]:[port]/sphinx/id/email/show-emails
```

Expected output:
```sh
{"test@gmail.com"}
```

### Schema Registry - KSQL - PostgreSQL (has to be tested manually)

```sh
$ ksqldbserverpod=$(kubectl get pods -o=name --selector=channels=ksql)
$ kubectl exec --stdin --tty $ksqldbserverpod -- ksql http://ksqldb-server:8088 -c "help"

$ ksql> SET 'auto.offset.reset'='earliest';



$ ksql> CREATE STREAM AD_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_ad', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM DTM_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_dtm', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM AE_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_ae', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM BBTR_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_bbtr', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM HP_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_hp', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM RCRA_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_rcra', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM KB_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_kb', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM DSS_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_dss', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM VAAAS_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_vaaas', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM SIEM_JDBC_SOURCE_JSON 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, ACTION VARCHAR, DETAILS VARCHAR) \
        WITH (KAFKA_TOPIC='jdbc_table_source_siem', VALUE_FORMAT='JSON', PARTITIONS=1);

$ ksql> CREATE STREAM JDBC_SOURCE_AVRO 
	(ID INT KEY, DESCRIPTION VARCHAR, TIMESTAMP VARCHAR, INDICATION VARCHAR, TOOL VARCHAR, STATUS VARCHAR, ACTION VARCHAR, DETAILS VARCHAR, SENT VARCHAR) \
        WITH (KAFKA_TOPIC='JDBC_SOURCE_AVRO', PARTITIONS=1, VALUE_FORMAT='AVRO');

$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'AD' AS TOOL, '--' AS STATUS, ACTION, DETAILS, 'false' AS SENT FROM AD_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'DTM' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM DTM_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'AE' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM AE_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'BBTR' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM BBTR_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'HP' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM HP_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'RCRA' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM RCRA_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'KB' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM KB_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'DSS' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM DSS_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'VAAAS' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM VAAAS_JDBC_SOURCE_JSON;
$ ksql> INSERT INTO JDBC_SOURCE_AVRO SELECT ID, DESCRIPTION, TIMESTAMP, INDICATION, 'SIEM' AS TOOL, '--' AS STATUS,  ACTION, DETAILS, 'false' AS SENT FROM SIEM_JDBC_SOURCE_JSON;

$ ksql> CREATE SINK CONNECTOR jdbc_dest_4 WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSinkConnector',
  'connection.url'           = 'jdbc:postgresql://sphinx-postgres:5432/sphinx',
  'connection.user'          = 'sphinx',
  'connection.password'      = 'sphinx',
  'tasks.max'		     = '10',
  'mode'                     = 'incrementing',
  'key'                      = 'id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter',
  'value.converter'          = 'io.confluent.connect.avro.AvroConverter',
  'value.converter.schema.registry.url'= 'http://schema-registry-service:8081',
  'key.converter.schemas.enable' = false,
  'value.converter.schemas.enable' = true,
  'pk.mode'                  = 'none',
  'topics'                    = 'JDBC_SOURCE_AVRO',
  'table.name.format'        = 'kafka_${topic}',
  'auto.create'              = true
);

$ ksql> exit;

$ cd KAFKA_PATH
$ ./kafka-console-producer.sh --topic jdbc_table_source_ad --bootstrap-server Sphinx:9092
$ > { "DESCRIPTION":"Vulnerability detected", "TIMESTAMP":"2020-08-18 16:20:00", "LOCATION":"Romania", "INDICATION":"CRITICAL", "ACTION":"-", "DETAILS":"Check the switch ports" }

$ postgresdbpod=$(kubectl get pods -o=name --selector=tier=simavidb)
$ kubectl exec --stdin $postgresdbpod -- psql -h localhost -U sphinx -p 5432 sphinx -c "SELECT * FROM \"kafka_JDBC_SOURCE_AVRO\""

```

Expected output:
```sh
-------------------------------------------------------------------------------------------------------------------------------------
| ID |      DESCRIPTION       |      TIMESTAMP      | LOCATION |INDICATION | TOOL | STATUS | ACTION |        DETAILS         | SENT |
-------------------------------------------------------------------------------------------------------------------------------------
 null  Vulnerability detected   2020-08-18 16:20:00    ROMANIA   CRITICAL     AD      --       --     Check the switch ports   false
```