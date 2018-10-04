perl -pe 's/CONFIG_HERE/`env | grep INJECT_`/ge' -i /var/www/index.html
nginx -g 'pid /tmp/nginx.pid; daemon off;'