"c:\Program Files (x86)\Windows Kits\10\bin\x64\MakeCert.exe" /n {PublisherId} /r /h 0 /eku "1.3.6.1.5.5.7.3.3,1.3.6.1.4.1.311.10.3.13" /e 12/31/2019 /sv OpenSelectedUrl.pvk OpenSelectedUrl.cer
"c:\Program Files (x86)\Windows Kits\10\bin\x64\Pvk2Pfx.exe" /pvk OpenSelectedUrl.pvk /pi 1qaz2wsx /spc OpenSelectedUrl.cer /pfx OpenSelectedUrl.pfx /po 1qaz2wsx
Certutil -addStore TrustedPeople OpenSelectedUrl.cer

rem 查看和删除证书
rem Certutil -store TrustedPeople
rem Certutil -delStore TrustedPeople certID