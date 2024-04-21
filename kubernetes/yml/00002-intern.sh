# assumption: the current folder is the SPHINX/kubernetes/yml folder
kubectl apply -f 00010-repository-secret.yml
kubectl apply -f 00021-simavi-config-map-intern.yml
kubectl apply -f 00501-simavi-pv-minikube.yml
kubectl apply -f 01000-simavi-postgres.yml
kubectl apply -f 02000-simavi-elasticsearch.yml
kubectl apply -f 03000-simavi-schema-registry.yml
kubectl apply -f 04000-simavi-ksqldb.yml
kubectl apply -f 05000-simavi-ksqldb-cli.yml
kubectl apply -f 06000-simavi-hbase.yml
kubectl apply -f 07000-simavi-spark.yml
kubectl apply -f 08000-simavi-dtm.yml
kubectl apply -f 09000-simavi-ad.yml
kubectl apply -f 10000-simavi-id.yml
kubectl apply -f 11000-simavi-id-ui.yml
kubectl apply -f 12000-simavi-id-java.yml
