# afisare module disponibile
.\filebeat.exe modules list

# activare modul suricata
.\filebeat.exe modules enable suricata

.\filebeat.exe setup --pipelines --modules suricata