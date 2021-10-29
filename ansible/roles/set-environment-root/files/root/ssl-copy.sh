#!/bin/bash

rm -f /etc/ssl/private/dfcert.crt
rm -f /etc/ssl/certs/dfcert.crt
sshpass -p "$LETSENCRYPT" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null  -r letsencrypt@vault.df.sahamassurance.ma:letsencrypt/config/live/df.sahamassurance.ma/privkey.pem /etc/ssl/private/dfcert.key
sshpass -p "$LETSENCRYPT" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null  -r letsencrypt@vault.df.sahamassurance.ma:letsencrypt/config/live/df.sahamassurance.ma/fullchain.pem /etc/ssl/certs/dfcert.crt

if [ $1 ] && [ $1 = "restart-nginx" ]; then
  service nginx restart
fi
