@echo off 
:: Program pentru a testa mai usor plugin-uri grafana

CMD /C yarn dev

echo ----------------- COPY DIST -----------------------
docker cp dist/ 6922d3ab7be1:/var/lib/grafana/plugins/my-plugin


echo ----------------- RESTART GRAFANA -----------------
docker restart 6922d3ab7be1


echo ----------------- COPY CONF -----------------------
docker cp 6922d3ab7be1:/usr/share/grafana/conf/ conf/
