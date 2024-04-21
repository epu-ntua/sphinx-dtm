postgresdbpod=$(kubectl get pods -o=name --selector=tier=simavidb)
kubectl exec --stdin $postgresdbpod -- psql -h localhost -U sphinx -p 5432 sphinx -c 
"CREATE TABLE it_staff (id INT, email VARCHAR); INSERT INTO it_staff VALUES (1, 'test@gmail.com');" 
-c "INSERT INTO ad_component VALUES (1, 3, '2021-01-04', '2021-01-04', 'First AD test', 'Decription testing', true, '-', true);" 
-c "INSERT INTO sphinx.dtm_instance VALUES (1, 3, '2021-01-04', '2021-01-04', 'First_test', 'Test Description', '1234567', true, 'http://localhost:8087/sphinx/dtm', true, true, true)"
