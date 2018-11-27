#!/usr/bin/env bash

[ -z ${MYPATH+x}  ] && export MYPATH=$(command -v realpath &>/dev/null && realpath $0 || readlink -f $0 || greadlink -f $0)
[ -z ${SCRIPTS+x} ] && export SCRIPTS=$(dirname $MYPATH)
[ -z ${APPROOT+x} ] && export APPROOT=$(dirname $SCRIPTS)

PATH="${APPROOT}/node_modules/.bin:${PATH}"
source "${SCRIPTS}/unset-npm-env.sh"

# Build scripts
source "${SCRIPTS}/build.sh"
