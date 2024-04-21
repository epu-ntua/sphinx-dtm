1. am comentat in setup.bat:

rem JAVA_OPTS is not a built-in JVM mechanism but some people think it is so we
rem warn them that we are not observing the value of %JAVA_OPTS%
rem if not "%JAVA_OPTS%" == "" (
rem  echo|set /p="warning: ignoring JAVA_OPTS=%JAVA_OPTS%; "
rem  echo pass JVM parameters via LS_JAVA_OPTS
rem )

2. am adaugat fisierul care contine baza de date GeoIP