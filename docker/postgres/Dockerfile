FROM postgres:13
ENV POSTGRES_DB sphinx
ENV POSTGRES_USER sphinx
ENV POSTGRES_PASSWORD sphinx
RUN mkdir /home/geoip/
COPY GeoLite2-City-CSV /home/geoip/
COPY init.sql /docker-entrypoint-initdb.d/