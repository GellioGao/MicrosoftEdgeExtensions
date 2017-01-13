"c:\Program Files (x86)\Windows Kits\10\bin\x64\MakeCert.exe" /n {PublisherId} /r /h 0 /eku "1.3.6.1.5.5.7.3.3,1.3.6.1.4.1.311.10.3.13" /e 12/31/2019 /sv QrCode4Url.pvk QrCode4Url.cer
"c:\Program Files (x86)\Windows Kits\10\bin\x64\Pvk2Pfx.exe" /pvk QrCode4Url.pvk /pi 1qaz2wsx /spc QrCode4Url.cer /pfx QrCode4Url.pfx /po 1qaz2wsx
Certutil -addStore TrustedPeople QrCode4Url.cer

rem 查看和删除证书
rem Certutil -store TrustedPeople
rem Certutil -delStore TrustedPeople certID
