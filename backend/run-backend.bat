@echo off
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%
cd /d "%~dp0"
mvn spring-boot:run

@REM Made with Bob
