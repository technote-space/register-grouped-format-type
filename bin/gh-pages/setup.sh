#!/usr/bin/env bash

set -e

if [[ $# -lt 1 ]]; then
	exit 1
fi

SCRIPT_DIR=${1}
source ${SCRIPT_DIR}/variables.sh

curl -o ${GH_PAGES_DIR}/screenshot.png https://raw.githubusercontent.com/technote-space/register-grouped-format-type/images/screenshot.png
