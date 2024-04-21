@echo off 
:: Program pentru a testa mai usor plugin-uri grafana

echo ----------------- COPY DIST -----------------------
docker cp dist/ sphinx-grafana:/var/lib/grafana/plugins/interactive-dashboard-login-plugin


echo ----------------- RESTART GRAFANA -----------------
docker restart sphinx-grafana


echo ----------------------- TEST ----------------------
docker exec -t -i sphinx-grafana /bin/bash

echo ----------------- COPY CONF -----------------------
docker cp sphinx-grafana:/usr/share/grafana/conf/ conf


PAUSE