@echo off
set /p ip=Enter IP Address: 
set /p port=Enter Port: 
@echo on
python -m http.server %port% --bind %ip%