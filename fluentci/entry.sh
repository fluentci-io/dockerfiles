#!/bin/sh
set -e

if [ "$1" != "${1#-}" ]; then
    # if the first argument is an option like `--help` or `-h`
    exec fluentci "$@"
fi

case "$1" in
    run | init | search | upgrade | cache | ls | list | agent | doctor | docs | man | agent | whoami | publish | env | login | project | studio )
    sudo dockerd-entrypoint.sh > /dev/null 2> /dev/null &

    DOCKER_SOCKET="/var/run/docker.sock"

    while [ ! -S "$DOCKER_SOCKET" ]; do
      echo "Waiting for socket file to be created..."
      sleep 1  # Wait for 1 second before checking again
    done

    sudo chown -R `whoami` $DOCKER_SOCKET
    sudo chown -R `whoami` ~/*
    sudo chown -R `whoami` ~/.fluentci ~/.cache ~/.cargo ~/.rustup ~/.local || true
    # if the first argument is a known fluentci command
    exec fluentci "$@";;
esac

exec "$@"
