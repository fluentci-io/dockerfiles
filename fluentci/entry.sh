#!/bin/sh
set -e

if [ "$1" != "${1#-}" ]; then
    # if the first argument is an option like `--help` or `-h`
    exec fluentci "$@"
fi

case "$1" in
    run | init | search | upgrade | cache | ls | list | agent | doctor | docs | man | agent | whoami | publish | env | login | project | studio )
    dockerd-entrypoint.sh > /dev/null 2> /dev/null &
    sudo chown -R `whoami` /var/run/docker.sock
    # if the first argument is a known fluentci command
    exec fluentci "$@";;
esac

exec "$@"
