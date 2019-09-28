#!/usr/bin/env bash

set -e

if [[ $# -lt 1 ]]; then
	exit 1
fi

current=$(cd $(dirname $0);
pwd)

SCRIPT_DIR=${1}
source ${SCRIPT_DIR}/variables.sh

VERSION=$(cat ${TRAVIS_BUILD_DIR}/package.json | jq -r .version)
cat ${GH_WORK_DIR}/template/package.json | jq '.devDependencies |= .+{"@technote-space/register-grouped-format-type": "^'${VERSION}'"}' > ${GH_WORK_DIR}/template/TMP && mv -f ${GH_WORK_DIR}/template/TMP ${GH_WORK_DIR}/template/package.json

cp -f ${current}/plugin.js ${GH_WORK_DIR}/
cp -f ${current}/plugin.scss ${GH_WORK_DIR}/
