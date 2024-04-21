CREATE SCHEMA IF NOT EXISTS sphinx;
CREATE TABLE sphinx."kafka_AD_ALERT_AVRO" (
    "ALERTID" text,
    "TOTALFLOWS" text,
    "PROTOCOLFLOWID" text,
    "PROTOCOLFLOWDETECTEDPROTOCOL" text,
    "PROTOCOLFLOWLOWERPORT" text,
    "PROTOCOLFLOWUPPERPORT" text,
    "PROTOCOLFLOWUPPERIP" text,
    "PROTOCOLFLOWLOWERIP" text,
    "PROTOCOLFLOWIPPROTOCOL" text,
    "PROTOCOLFLOWFLOWDURATION" text,
    "PROTOCOLFLOWBYTES" text,
    "PROTOCOLFLOWPACKETS" text,
    "PROTOCOLFLOWPACKETSWITHOUTPAYLOAD" text,
    "PROTOCOLFLOWAVGPACKETSIZE" text,
    "PROTOCOLFLOWMINPACKETSIZE" text,
    "PROTOCOLFLOWMAXPACKETSIZE" text,
    "PROTOCOLFLOWAVGINTERTIME" text,
    "PROTOCOLFLOWPACKETSIZE0" text,
    "PROTOCOLFLOWINNERTIME0" text,
    "PROTOCOLFLOWPACKETSIZE1" text,
    "PROTOCOLFLOWINNERTIME1" text,
    "PROTOCOLFLOWPACKETSIZE2" text,
    "PROTOCOLFLOWINNERTIME2" text,
    "PROTOCOLFLOWPACKETSIZE3" text,
    "PROTOCOLFLOWINNERTIME3" text,
    "PROTOCOLFLOWPACKETSIZE4" text,
    "PROTOCOLFLOWINNERTIME4" text,
    "PROTOCOLFLOWHOSTNAME" text,
    "PROTOCOLFLOWDNATYPE" text,
    "PROTOCOLFLOWTIMESTAMP2" text,
    "PROTOCOLFLOWMALWARE" text,
    "PROTOCOLFLOWFLAGS" text,
    "TEXT" text,
    "TITLE" text,
    "FLOWID" text,
    "COORDS" text,
    "USERNAME" text,
    "TIMESTAMP" text,
    "ALGORITHMTYPE" text,
    "ALGORITHMHOSTNAME" text,
    "ALGORITHMNUMBEROFPAIRS" text,
    "ALGORITHMTCPPORT" text,
    "ALGORITHMBYTESUP" text,
    "ALGORITHMBYTESDOWN" text,
    "ALGORITHMNUMBERPKTS" text,
    "ALGORITHMCONNECTIONS" text,
    "ALGORITHMPORTS" text,
    "ALGORITHMMYIP" text,
    "ALGORITHMSTRINGFLOWS" text,
    "ALGORITHMDATAMEAN" text,
    "ALGORITHMDATASTDEV" text,
    "ALGORITHMPAIRSMEAN" text,
    "ALGORITHMPAIRSSTDEV" text,
    "ALGORITHMALIENS" text,
    "ALGORITHMNUMBEROFFLOWS" text,
    "ALGORITHMNUMBEROFFLOWSPERPORT" text,
    "ALGORITHMFLOWSMEAN" text,
    "ALGORITHMFLOWSSTDEV" text,
    "ALGORITHMNUMBEROFFLOWSALIENPORT" text,
    "ALGORITHMNUMBEROFPORTS" text,
    "ALGORITHMPORTSMEAN" text,
    "ALGORITHMPORTSSTDEV" text
);
ALTER TABLE sphinx."kafka_AD_ALERT_AVRO" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_DTM_ALERTS_AVRO" (
    "ALERT_ID" text,
    "EVENT_KIND" text,
    "SIGNATURE_SEVERITY" text,
    "AFFECTED_PRODUCT" text,
    "SIGNATURE" text,
    "ACTION" text,
    "SEVERITY" text,
    "CATEGORY" text,
    "TAGS" text,
    "COMMUNITY_ID" text,
    "TIMESTAMP" text,
    "SRC_IP" text,
    "COUNT" text,
    "SRC_PORT" text,
    "DNSQRY" text,
    "VERSION" text,
    "DEST_IP_RDNS" text,
    "HTTPHOST" text,
    "DEST_GEOIP" text,
    "ETHER" text,
    "TYPE" text,
    "ETHSOURCE" text,
    "TOOL" text,
    "USERNAME" text,
    "ISTANCEKEY" text,
    "COMPONENT" text,
    "HOSTNAME" text,
    "PATH" text,
    "DEST_IP" text,
    "SRC_GEOIP" text,
    "FLOW_ID" text,
    "DEST_PORT" text,
    "EVENT_TYPE" text,
    "PROTO" text,
    "SRC_IP_RDNS" text,
    "HOST" text,
    "ALERT_TYPE" text
);
ALTER TABLE sphinx."kafka_DTM_ALERTS_AVRO" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO" (
    "NAME" text,
    "IP" text,
    "SERVICE" text,
    "TS" text
);
ALTER TABLE sphinx."kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_HP_INTERVAL_INFO_AVRO" (
    "HPID" text,
    "NAME" text,
    "CPUACTIVITYVAL" text,
    "CPUACTIVITYUNIT" text,
    "MEMORYUSAGEVAL" text,
    "MEMORYUSAGEUNIT" text,
    "UPLOADVAL" text,
    "UPLOADUNIT" text,
    "DOWNLOADVAL" text,
    "DOWNLOADUNIT" text,
    "DBUSAGE" text,
    "TS" text
);
ALTER TABLE sphinx."kafka_HP_INTERVAL_INFO_AVRO" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_HP_MOST_USED_AVRO" (
    "HONEYNAME" text,
    "HONEYID" text,
    "USERNAME" text,
    "UTIMES" text,
    "PASSWORD" text,
    "PTIMES" text,
    "TS" text
);
ALTER TABLE sphinx."kafka_HP_MOST_USED_AVRO" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_HP_SERVICE_COUNTERS_AVRO" (
    "NAME" text,
    "STAT" text,
    "TS" text
);
ALTER TABLE sphinx."kafka_HP_SERVICE_COUNTERS_AVRO" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_HP_STATIC_INFO_AVRO" (
    "NAME" text,
    "ISACTIVE" text,
    "HPID" text,
    "SSH" text,
    "FTP" text,
    "SMTP" text,
    "HTTP" text,
    "FLAVOUR" text,
    "GENERALINFO" text,
    "TS" text
);
ALTER TABLE sphinx."kafka_HP_STATIC_INFO_AVRO" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_ID_ALERTS" (
    "ALERTID" text,
    "DESCRIPTION" text,
    "CLASSIFICATION" text,
    "TIMESTAMP" text,
    "LOCATION" text,
    "INDICATION" text,
    "TOOL" text,
    "STATUS" text,
    "ACTION" text,
    "DETAILS" text,
    "SENT" text,
    id integer NOT NULL
);
ALTER TABLE sphinx."kafka_ID_ALERTS" OWNER TO sphinx;
CREATE TABLE sphinx."kafka_VAAAS_REPORT_AVRO" (
    "DATA" text
);
ALTER TABLE sphinx."kafka_VAAAS_REPORT_AVRO" OWNER TO sphinx;