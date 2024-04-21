@echo off

mvn -e -Ppostgresql -Dschema=sphinx -Dprofile=local -Doperation=update clean resources:resources liquibase:update