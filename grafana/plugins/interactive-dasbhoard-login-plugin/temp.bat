@echo off 
:: Program pentru a testa mai usor plugin-uri grafana

CMD /C yarn dev

echo ----------------- COPY DIST -----------------------
docker cp dist/ sphinx-grafana:/data/grafana/plugins/interactive-dashboard-login-plugin


echo ----------------- RESTART GRAFANA -----------------
docker restart sphinx-grafana


echo ----------------- COPY CONF -----------------------
docker cp sphinx-grafana:/usr/share/grafana/conf/ conf/
