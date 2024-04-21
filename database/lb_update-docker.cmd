@echo off

mvn -e -Ppostgresql -Dschema=sphinx -Dprofile=docker -Doperation=update clean resources:resources liquibase:update