--
-- Name: kafka_AD_ALERT_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

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

--
-- Name: kafka_DTM_ALERTS_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

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

--
-- Name: kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

CREATE TABLE sphinx."kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO" (
    "NAME" text,
    "IP" text,
    "SERVICE" text,
    "TS" text
);


ALTER TABLE sphinx."kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO" OWNER TO sphinx;

--
-- Name: kafka_HP_INTERVAL_INFO_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

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

--
-- Name: kafka_HP_MOST_USED_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

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

--
-- Name: kafka_HP_SERVICE_COUNTERS_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

CREATE TABLE sphinx."kafka_HP_SERVICE_COUNTERS_AVRO" (
    "NAME" text,
    "STAT" text,
    "TS" text
);


ALTER TABLE sphinx."kafka_HP_SERVICE_COUNTERS_AVRO" OWNER TO sphinx;

--
-- Name: kafka_HP_STATIC_INFO_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

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

--
-- Name: kafka_ID_ALERTS; Type: TABLE; Schema: sphinx; Owner: sphinx
--

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

--
-- Name: kafka_VAAAS_REPORT_AVRO; Type: TABLE; Schema: sphinx; Owner: sphinx
--

CREATE TABLE sphinx."kafka_VAAAS_REPORT_AVRO" (
    "DATA" text
);


ALTER TABLE sphinx."kafka_VAAAS_REPORT_AVRO" OWNER TO sphinx;

--
-- Name: vaaas_reports; Type: TABLE; Schema: sphinx; Owner: sphinx
--

CREATE TABLE sphinx.vaaas_reports (
    id character varying,
    type character varying,
    assessment_date character varying,
    cvss_score character varying,
    start character varying,
    stop character varying,
    task_name character varying,
    total_services character varying,
	ip character varying,
	mac character varying,
	port character varying,
	protocol character varying,
	state character varying,
	service_name character varying,
	service_product character varying,
	service_product_version character varying,
	service_cpe_list character varying,
	vulnerability_id character varying,
	vulnerability_cvss character varying,
	vulnerability_type character varying,
	vulnerability_exploit character varying
);


ALTER TABLE sphinx.vaaas_reports OWNER TO sphinx;

drop trigger vaaas_json_to_columns on "kafka_VAAAS_REPORT_AVRO";
drop function filter_vaaas;

CREATE or REPLACE FUNCTION filter_vaaas()
RETURNS TRIGGER
AS
$$
BEGIN
INSERT INTO vaaas_reports 
SELECT 
  id, 
  type, 
  assessment_date, 
  cvss_score, 
  start, 
  stop, 
  task_name, 
  total_services, 
  ip, 
  mac, 
  port, 
  protocol, 
  state, 
  service_name, 
  service_product, 
  service_product_version, 
  service_cpe_list, 
  json_array_elements(interiorofscriptsthree)-> 'id' AS vulnerability_id, 
  json_array_elements(interiorofscriptsthree)-> 'cvss' AS vulnerability_cvss, 
  json_array_elements(interiorofscriptsthree)-> 'type' AS vulnerability_type, 
  json_array_elements(interiorofscriptsthree)-> 'is_exploit' AS vulnerability_exploit 
FROM 
  (
    SELECT 
      id, 
      type, 
      assessment_date, 
      cvss_score, 
      start, 
      stop, 
      task_name, 
      total_services, 
      ip, 
      mac, 
      discovered, 
      port, 
      protocol, 
      state, 
      service_name, 
      service_product, 
      service_product_version, 
      service_cpe_list, 
      tempvalue, 
      interiorofscriptstwo -> json_object_keys(interiorofscriptstwo) as interiorofscriptsthree 
    FROM 
      (
        SELECT 
          id, 
          type, 
          assessment_date, 
          cvss_score, 
          start, 
          stop, 
          task_name, 
          total_services, 
          ip, 
          mac, 
          discovered, 
          port, 
          protocol, 
          state, 
          service_name, 
          service_product, 
          service_product_version, 
          service_cpe_list, 
          tempvalue, 
          to_json(
            interiorofscripts -> json_object_keys(interiorofscripts)
          ) as interiorofscriptstwo 
        FROM 
          (
            SELECT 
              id, 
              type, 
              assessment_date, 
              cvss_score, 
              start, 
              stop, 
              task_name, 
              total_services, 
              ip, 
              mac, 
              discovered, 
              port, 
              protocol, 
              state, 
              service_name, 
              service_product, 
              service_product_version, 
              service_cpe_list, 
              to_json(scripts_list -> 0 -> 'elements') as interiorofscripts, 
              tempvalue 
            FROM 
              (
                SELECT 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'id' AS id, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'type' AS type, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'assessment_date' AS assessment_date, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'cvss_score' AS cvss_score, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'start' AS start, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'stop' AS stop, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'task_name' AS task_name, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'total_services' AS total_services, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'objects' -> 0 -> 'value' AS ip, 
                  "DATA" :: json -> json_object_keys("DATA" :: json)-> 'objects' -> 1 -> 'value' AS mac, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'id' AS discovered, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'port' AS port, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'protocol' AS protocol, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'state' AS state, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'service_name' AS service_name, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'service_product' AS service_product, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'service_product_version' AS service_product_version, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'service_cpe_list' AS service_cpe_list, 
                  jsonb_path_query(
                    "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                    '$[$.size() - $.size() + 3 to $.size()]'
                  )-> 'scripts_list' AS scripts_list, 
                  (
                    jsonb_path_query(
                      "DATA" :: jsonb -> json_object_keys("DATA" :: json)-> 'objects', 
                      '$[$.size() - $.size() + 3 to $.size()]'
                    )-> 'scripts_list' -> 0 -> 'id'
                  ):: TEXT as tempvalue 
                FROM 
                  "kafka_VAAAS_REPORT_AVRO"
              ) as firstTable 
            WHERE 
              tempvalue LIKE '"vulners"'
          ) as secondTable
      ) as thirdTable
  ) as fourthTable 
WHERE 
  NOT EXISTS (
    SELECT 
      1 
    FROM 
      vaaas_reports t2 
    WHERE 
      t2.id :: TEXT LIKE fourthTable.id :: TEXT
  );
RETURN NULL;
END
$$
LANGUAGE plpgsql;

CREATE TRIGGER vaaas_json_to_columns AFTER INSERT ON "kafka_VAAAS_REPORT_AVRO"
FOR EACH ROW
EXECUTE PROCEDURE filter_vaaas();

drop table geoip_blocks;
drop table geoip_locations;
CREATE TABLE geoip_blocks (
    network cidr,
    geoname_id bigint,
    registered_country_geoname_id bigint,
    represented_country_geoname_id bigint,
    is_anonymous_proxy bool,
    is_satellite_provider bool,
	postal_code varchar(8),
	latitude decimal(9,6),
	longitude decimal(9,6),
	accuracy_radius smallint
);

CREATE TABLE geoip_locations (
    geoname_id bigint,
    locale_code varchar(2),
    continent_code varchar(2),
    continent_name varchar(255),
    country_iso_code varchar(2),
    country_name varchar(255),
	subdivision_1_iso_code varchar(3),
	subdivision_1_name varchar(255),
	subdivision_2_iso_code varchar(3),
	subdivision_2_name varchar(255),
	city_name varchar(255),
	metro_code varchar(3),
	time_zone varchar(255),
    is_in_european_union bool
);

\copy geoip_blocks from '/home/geoip/GeoLite2-City-Blocks-IPv4.csv' delimiter ',' csv header;
\copy geoip_blocks from '/home/geoip/GeoLite2-City-Blocks-IPv6.csv' delimiter ',' csv header;
\copy geoip_locations from '/home/geoip/GeoLite2-City-Locations-en.csv' delimiter ',' csv header encoding 'UTF8';
drop table hp_geoip;
drop trigger hp_ip_to_location on "kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO";
drop function hp_filter_ip_to_location;

CREATE TABLE hp_geoip (ip_address varchar, ip_country varchar, lat float, long float, timestamp varchar);

CREATE or REPLACE FUNCTION hp_filter_ip_to_location()
RETURNS TRIGGER
AS
$$
BEGIN
INSERT INTO hp_geoip
        (ip_address, ip_country, lat, long, timestamp)
	SELECT
		t1."IP" as ip_address,
		t3.country_iso_code AS ip_country,
		t2.latitude as latitude,
		t2.longitude as longitude,
		t1."TS" as timestamp
	FROM
		"kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO" t1,
		geoip_blocks t2
			INNER JOIN geoip_locations t3 ON t2.geoname_id = t3.geoname_id
	WHERE
		t2.network >>= t1."IP"::inet
	AND NOT EXISTS (
        SELECT 1 
		FROM hp_geoip t4
		WHERE t4.timestamp LIKE (t1."TS")::TEXT
		AND t4.ip_address LIKE t1."IP"
    );
RETURN NULL;
END
$$
LANGUAGE plpgsql;

CREATE TRIGGER hp_ip_to_location AFTER INSERT ON "kafka_HP_CURRENTLY_CONNECTED_IPS_AVRO"
FOR EACH ROW
EXECUTE PROCEDURE hp_filter_ip_to_location();
