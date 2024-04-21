FROM grafana/grafana

# COPY /interactive-dashboard-tools-list-plugin/dist/ sphinx-grafana:/var/lib/grafana/plugins/interactive-dashboard-tools-list-plugin
# COPY /interactive-dashboard-alerts-plugin/dist/ sphinx-grafana:/var/lib/grafana/plugins/interactive-dashboard-alerts-plugin
# COPY /interactive-dashboard-login-plugin/dist/ sphinx-grafana:/var/lib/grafana/plugins/interactive-dashboard-login-plugin
# COPY /interactive-dashboard-plugin/dist/ sphinx-grafana:/var/lib/grafana/plugins/interactive-dashboard-plugin

ENV GF_AUTH_DISABLE_LOGIN_FORM "false"
ENV GF_AUTH_ANONYMOUS_ENABLED "false"
ENV GF_AUTH_ANONYMOUS_ORG_ROLE "Admin"
ENV GF_INSTALL_PLUGINS "simpod-json-datasource,grafana-worldmap-panel,interactive-dashboard-tools-list-plugin,interactive-dashboard-alerts-plugin,interactive-dashboard-login-plugin,interactive-dashboard-plugin"
ENV GF_PATHS_LOGS "/var/log/grafana/"
ENV GF_LOG_MODE "console file"