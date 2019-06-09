eval $(cat .$1.env | sed 's/^/export /') && sls deploy

