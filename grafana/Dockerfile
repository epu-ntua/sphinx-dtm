FROM registry.sphinx-repo.intracom-telecom.com/sphinx-project/interactive-dashboards/grafana AS orig
# Orig is used in order to prevent the max depth exceeded error
FROM orig
USER root
RUN mkdir -p /data/grafana/ && chown -R grafana:grafana /data/grafana/
RUN mkdir -p /usr/share/grafana/public/manuals
RUN rm /usr/share/grafana/public/dashboards/home.json

USER grafana
RUN mkdir -p /data/grafana/plugins/
ENV GF_PATHS_PLUGINS="/data/grafana/plugins"

#COPY plugins/briangann-grafana-datatable-panel-98acd9d/dist/ /data/grafana/plugins/briangann-grafana-datatable-panel-98acd9d/
RUN rm -rf /data/grafana/plugins/interactive-dasbhoard-login-plugin/
COPY plugins/interactive-dasbhoard-login-plugin/dist/ /data/grafana/plugins/interactive-dasbhoard-login-plugin/
RUN rm -rf /data/grafana/plugins/alert-Table/
COPY plugins/alert-Table/dist/ /data/grafana/plugins/Alerts-panel
#COPY plugins/interactive-dashboard-plugin/dist/ /data/grafana/plugins/interactive-dashboard-plugin/
RUN rm -rf /data/grafana/plugins/interactive-dashboard-tools-list-plugin/
COPY plugins/interactive-dashboard-tools-list-plugin/dist/ /data/grafana/plugins/interactive-dashboard-tools-list-plugin/
RUN rm -rf /data/grafana/plugins/grafana-sankey-panel-master/
COPY plugins/grafana-sankey-panel-master/dist/ /data/grafana/plugins/grafana-sankey-panel-master/
#COPY plugins/grafana-sankey-panel-master/index.html /usr/share/grafana/public/views/
#COPY index-template.html /usr/share/grafana/public/views/
RUN rm -rf /data/grafana/plugins/grafana-json-datasource/
COPY plugins/Datasources/grafana-json-datasource/ /data/grafana/plugins/grafana-json-datasource/

RUN grafana-cli --pluginsDir "/data/grafana/plugins/" plugins install simpod-json-datasource
RUN grafana-cli --pluginsDir "/data/grafana/plugins/" plugins install grafana-worldmap-panel
RUN grafana-cli --pluginsDir "/data/grafana/plugins/" plugins install grafana-piechart-panel
RUN grafana-cli --pluginsDir "/data/grafana/plugins/" plugins install marcusolsson-json-datasource
RUN grafana-cli --pluginsDir "/data/grafana/plugins/" plugins install snuids-radar-panel

COPY datasources/simavi_datasources_kubernetes.yaml /etc/grafana/provisioning/datasources/

COPY /manuals/ /usr/share/grafana/public/manuals/
COPY pdf.png /usr/share/grafana/public/img/pdf.png

COPY dashboards/home.json /usr/share/grafana/public/dashboards/home.json

USER root
#RUN rm -f /etc/grafana/provisioning/dashboards/*
RUN rm -f /etc/grafana/provisioning/dashboards/*.json

#"dashboards/Anomaly Detection-1619608131122.json", \
#"dashboards/Anomaly Detection-1619608131122.json", \
	  
COPY ./dashboards/Recent/ /etc/grafana/provisioning/dashboards/

#COPY ./dashboards/Recent/ /usr/share/grafana/public/dashboards/

COPY ./plugins/defaults.ini /usr/share/grafana/conf/defaults.ini

#ENV GF_AUTH_DISABLE_LOGIN_FORM "false"
#ENV GF_AUTH_ANONYMOUS_ENABLED "false"
ENV GF_AUTH_ANONYMOUS_ORG_ROLE "Admin"
ENV GF_PATHS_LOGS "/var/log/grafana/"
ENV GF_LOG_MODE "console file"
