------------------ RabbitMQ ----------------
# location
cd C:\servers\rabbitMQ-3.8.3\rabbitmq_server-3.8.3\sbin>

# instalare RabbitMQ (v3.8.3):
=> are nevoie de ERLANG (v23.0) (instalat pe calculator)

# activare/instalare plugin
rabbitmq-plugins enable rabbitmq_management

# restart server
rabbitmq-server -detached

url:http://localhost:15672/
username:guest
password:guest

docker:
docker pull rabbitmq
# docker run -d --hostname localhost --name sphinx-rabbitmq -p 8080:15672 rabbitmq:3-management
# docker run -d --hostname sphinx-rabbitmq --name sphinx-rabbitmq --network docker_default -p 15672:15672 rabbitmq:3-management
docker run -d --hostname localhost --name sphinx-rabbitmq --network docker_default -p 15672:15672  -p 5672:5672 rabbitmq:3-management

docker ps -a
docker start 1ef859ff92a1
docker rm 1ef859ff92a1
docker-machine ip
# spring.rabbitmq.host={docker-machine ip address}

# daca avem mai multi consumatori si vrem sa primeasca toti un mesaj trebuie sa punem mesajul [CRED] pe cozi diferite si fiecare consumator sa isi consume coada proprie

------------------ JAVADOC ----------------
mvn javadoc:javadoc

------------------ ANALIZA COD -----------
git shortlog -s

git ls-tree -r HEAD | sed -Ee 's/^.{53}//' | while read filename; do file "$filename"; done | grep -E ': .*text' | sed -E -e 's/: .*//' | while read filename; do git blame --line-porcelain "$filename"; done | sed -n 's/^author //p' | sort | uniq -c | sort -rn

git log --shortstat --author="letyournailsgrow" | grep -E "fil(e|es) changed" | awk '{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed: ", files, "lines inserted: ", inserted, "lines deleted: ", deleted }'


------------------ Kafka ------------------------
URL: https://kafka.apache.org/
URL: https://kafka.apache.org/quickstart
# pornire din powershell
cd C:\servers\sphinx-docker\kafka
.\bin\windows\zookeeper-server-start.bat config\zookeeper.properties
.\bin\windows\kafka-server-start.bat config\server.properties

If Kafka is not running and fails to start after your computer wakes up from hibernation,
delete the <TMP_DIR>/kafka-logs folder and then start Kafka again.

# creare topic
.\bin\windows\kafka-topics.bat --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic connect-test
==> Created topic test.

# afisare topic
.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
==> test

# afisare numar mesaje intr-un topic
.\bin\windows\kafka-run-class.bat kafka.tools.GetOffsetShell --broker-list localhost:9092 --topic tshark_topic --time -1 --offsets 1

# pentru a vedea operatie de mai sus pe retea
tshark -i  \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69} -d tcp.port==9092,kafka -Y "kafka.topic_name==tshark_topic"

## producatorul (citeste din consola)
.\bin\windows\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic test

## consumatorul ( de la inceput)
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic test --from-beginning
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic connect-test --from-beginning

## citeste dintr-un fisier
.\bin\windows\connect-standalone.bat config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties


# daca avem mai multi consumatori si vrem sa primeasca toti un mesaj trebuie sa fie in grupuri diferite

# stoacare date:
# kafka\config\server\properties
    log.dirs=/tmp/kafka-logs

------------------ t-shark/kafka -------------------------
#info:
http://mail-archives.apache.org/mod_mbox/kafka-users/201408.mbox/%3C20140812180358.GA24108@idrathernotsay.com%3E


#home:
cd C:\Program Files\Wireshark

# tshark -G fields | grep -i kafka
tshark -G fields | findstr  kafka
https://www.wireshark.org/docs/dfref/k/kafka.html

#din linia de comanda:
tshark -V -i eth1 -o 'kafka.tcp.port:9092' -d tcp.port=9092,kafka -f 'dst port 9092' -Y 'kafka.topic_name==mytopic && kafka.request_key==0'

#din interfata 'wireshark':
Edit -> Preferences -> Protocol Select the "Kafka" protocol and change the broker port to 9092
implicit e: 9092

tcpdump -n -s 0 -w c:\kafka.tcpd -i eth1 'port 9092'

tshark -i \Device\NPF_{DAD9B06B-406B-48F7-A86B-8C3029EF9C9E} -o "kafka.tcp.port:9092" -d tcp.port==9092,kafka -f "dst port 9092" -Y "kafka.topic_name==test"
tshark -V -r /var/tmp/kafka.tcpd                             -o 'kafka.tcp.port:9092' -d tcp.port=9092,kafka -R 'kafka.topic_name==mytopic' -2

tshark -V -i lo -o 'kafka.tcp.port:9092' -d tcp.port=9092,kafka -f 'dst port 9092'

# incerc sa scriu in topicul 'tshark_topic' ce obtin pe wifi
tshark -i  \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69} -o 'kafka.tcp.port:9092' -d tcp.port==9092,kafka -Y 'kafka.topic_name==tshark_topic'
tshark -i  \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69} -d tcp.port==9092,kafka -R 'kafka.topic_name==tshark_topic' -2

tshark -i  \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69} -d tcp.port==9092,kafka -Y "kafka.topic_name==tshark_topic"
tshark -o "kafka.tcp.port:9092" -d tcp.port==9092,kafka -Y "kafka.topic_name==tshark_topic"

cd C:\Program Files\Wireshark
# creare topic tshark_topic (din kafka)
.\bin\windows\kafka-topics.bat --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic tshark_topic

## citeste dintr-un fisier (din kafka)
.\bin\windows\connect-standalone.bat config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties

## tshark scrie in acel fisier
tshark -i \Device\NPF_{DAD9B06B-406B-48F7-A86B-8C3029EF9C9E} > C:\servers\sphinx-docker\kafka\text.txt

## viaualizare (din kafka)
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic connect-test

https://github.com/tudrescu/kafka-wireshark-debug-workshop/blob/master/docker-compose.yml
https://rmoff.net/2020/01/08/streaming-messages-from-rabbitmq-into-kafka-with-kafka-connect/

-----------------------t-shark---------------------------------------
tshark -D

AMQPS port: 5671
AMPQ port: 5672

# exemplu intrare csv:
frame,frame.number,eth.src,eth.dst,ip.src,ip.dst,frame.len,frame.time,frame.time_delta,ip,ip.proto,ip.src_host,ip.dst_host
"Frame 1: 69 bytes on wire (552 bits), 69 bytes captured (552 bits) on interface 0",1,02:50:00:00:00:01,f6:16:36:bc:f9:c6,192.168.65.3,192.168.65.1,69,"Apr 20, 2020 02:48:24.926925738 UTC",0,"Internet Protocol Version 4, Src: 192.168.65.3, Dst: 192.168.65.1",17,192.168.65.3,192.168.65.1

# exemplu de export in csv:
tshark -r test.pcap -T fields -e frame.number -e frame.time -e eth.src -e eth.dst -e ip.src -e ip.dst -e ip.proto -E header=y -E separator=, -E quote=d -E occurrence=f > test.csv

# explicatii campuri
https://www.wireshark.org/docs/dfref/f/frame.html
frame = (Frame 1: 69 bytes on wire (552 bits), 69 bytes captured (552 bits) on interface 0)
frame.number = Frame Number (1)
eth.src = Source (02:50:00:00:00:01)
eth.dst = Destination (f6:16:36:bc:f9:c6)
ip.src = Source (192.168.65.3)
ip.dst = Destination (192.168.65.1)
frame.len = Frame length on the wire (69)
frame.time = Arrival Time (Apr 20, 2020 02:48:24.926925738 UTC)
frame.time_delta = Time delta from previous captured frame (0)
ip = Internet Protocol Version 4, Src: 192.168.65.3, Dst: 192.168.65.1
ip.proto = Protocol(17)
ip.src_host = Source Host (92.168.65.3)
ip.dst_host = Destination Host	(192.168.65.1)
---------------------------------------------------------------

https://www.confluent.io/blog/stream-analyze-visualize-data-with-kafka-ksqldb-and-friends/

FILTRE tshark
-Y http.request -T fields -e http.host -e http.user_agent
tshark tcp port 80 or tcp port 443 -V -R "http.request || http.response"
tshark -i tcp port 80 or tcp port 443 -V -R "http.request || http.response"
tshark -i "wi-fi" tcp port 80 -Y http.request -T fields -e http.host -e http.user_agent -e ip.dst

# filtre valide
tshark -i "wi-fi" tcp port 80
tshark -i "wi-fi" tcp port 80 or tcp port 443
tshark -i "wi-fi" -f "tcp port 80 or tcp port 443" -T fields -e frame.number -e frame.time -e eth.src -e eth.dst -e ip.src -e ip.dst -e ip.proto -E separator=,
tshark -i "wi-fi" -f "tcp port 80 or tcp port 443" -Y http.request -T fields -e frame.number -e frame.time -e http.host -e http.user_agent -e eth.src -e eth.dst -e ip.src -e ip.dst -e ip.proto -E separator=,
tshark -i "wi-fi" -f "tcp port 80 or tcp port 443" -Y http -T fields -e frame.number -e frame.time -e http.host -e http.user_agent -e eth.src -e eth.dst -e ip.src -e ip.dst -e ip.proto -E separator=,
tshark -i "wi-fi" -Y http

# frame,frame.number,eth.src,eth.dst,ip.src,ip.dst,frame.len,frame.time,frame.time_delta,ip,ip.proto,ip.src_host,ip.dst_host
tshark -i "wi-fi" -T fields -e frame -e frame.number -e eth.src -e eth.dst -e ip.src -e ip.dst -e frame.len -e frame.time -e frame.time_delta -e ip -e ip.proto -e ip.src_host -e ip.dst_host -E header=y -E separator=, -E quote=d -E occurrence=f

==>
1)
c:\Program Files\Wireshark>tshark -i "wi-fi" -T fields -e frame -e frame.number -e eth.src -e eth.dst -e ip.src -e ip.dst -e frame.len -e frame.time -e frame.time_delta -e ip -e ip.proto -e ip.src_host -e ip.dst_host -E header=y -E separator=, -E quote=d -E occurrence=f
frame,frame.number,eth.src,eth.dst,ip.src,ip.dst,frame.len,frame.time,frame.time_delta,ip,ip.proto,ip.src_host,ip.dst_host
Capturing on 'Wi-Fi'
"Frame 1: 56 bytes on wire (448 bits), 56 bytes captured (448 bits) on interface \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69}, id 0","1","00:15:17:c3:df:d8","ff:ff:ff:ff:ff:ff",,,"56","Jun  2, 2020 12:04:58.437624000 GTB Daylight Time","0.000000000",,,,
"Frame 2: 56 bytes on wire (448 bits), 56 bytes captured (448 bits) on interface \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69}, id 0","2","00:15:17:c3:df:d8","ff:ff:ff:ff:ff:ff",,,"56","Jun  2, 2020 12:04:58.437624000 GTB Daylight Time","0.000000000",,,,
"Frame 3: 56 bytes on wire (448 bits), 56 bytes captured (448 bits) on interface \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69}, id 0","3","00:15:17:c3:df:d8","ff:ff:ff:ff:ff:ff",,,"56","Jun  2, 2020 12:04:58.439515000 GTB Daylight Time","0.001891000",,,,
"Frame 4: 56 bytes on wire (448 bits), 56 bytes captured (448 bits) on interface \Device\NPF_{5A8F4FB6-5E07-48A9-9C4B-E19DA3A1FF69}, id 0","4","00:15:17:c3:df:d8","ff:ff:ff:ff:ff:ff",,,"56","Jun  2, 2020 12:04:58.439516000 GTB Daylight Time","0.000001000",,,,

"Frame 1: 69 bytes on wire (552 bits), 69 bytes captured (552 bits) on interface 0",1,02:50:00:00:00:01,f6:16:36:bc:f9:c6,192.168.65.3,192.168.65.1,69,"Apr 20, 2020 02:48:24.926925738 UTC",0,"Internet Protocol Version 4, Src: 192.168.65.3, Dst: 192.168.65.1",17,192.168.65.3,192.168.65.1

2)
c:\Program Files\Wireshark>tshark -i "wi-fi" -T fields -e frame -e frame.number -e eth.src -e eth.dst -e ip.src -e ip.dst -e frame.len -e frame.time -e frame.time_delta -e ip -e ip.proto -e ip.src_host -e ip.dst_host -E header=y -E separator=, -E quote=d -E occurrence=f
frame,frame.number,eth.src,eth.dst,ip.src,ip.dst,frame.len,frame.time,frame.time_delta,ip,ip.proto,ip.src_host,ip.dst_host
Capturing on 'Wi-Fi'

"c:\Program Files\Wireshark\tshark" -i "wi-fi" -T fields -e frame.number -e frame.time_delta -e frame.time -e frame.interface_name -e frame.interface_id -e frame.interface_description -e frame.cap_len -e frame.len -e frame.protocols -e eth.src -e eth.dst -e ip.src -e ip.dst -e ip -e ip.proto -e ip.src_host -e ip.dst_host -E header=y -E separator="," -E quote=d -E occurrence=f
// protocoale: https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xml

"c:\Program Files\Wireshark\tshark" -i "wi-fi" -T fields -e ip.src -e dns.qry.name -Y "dns.flags.response eq 0"


"c:\Program Files\Wireshark\tshark" -i "wi-fi" -T fields -e dhcp.option.hostname

"c:\Program Files\Wireshark\tshark" -i wi-fi -T fields -e frame.number

tshark -i "wi-fi" -Y "tcp.analysis.flags && !tcp.analysis.window_update"

#fix grafana

docker logs -f 15b71cff091a
curl -i -H "Accept: application/json" -X PUT -d "name=Main Org." http://admin:admin@localhost:3000/api/orgs/1


# kafka:
https://hub.docker.com/r/alexsuch/kafka/
    KAFKA_LOG_RETENTION_HOURS: Maps to log.retention.hours property. Default value is 168.
log.retention.hours
https://github.com/obsidiandynamics/kafdrop/issues/35

