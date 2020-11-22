#!/usr/bin/env bash

set -e

if [[ $# -lt 1 ]]; then
  exit 1
fi

current=$(
  cd $(dirname $0)
  pwd
)

SCRIPT_DIR=${1}
source ${SCRIPT_DIR}/variables.sh

yarn --cwd ${TRAVIS_BUILD_DIR} install
yarn --cwd ${TRAVIS_BUILD_DIR} build
rm -rdf ${GH_WORK_DIR}/build

cp -a ${TRAVIS_BUILD_DIR}/build ${GH_WORK_DIR}/build
cp -f ${current}/plugin.js ${GH_WORK_DIR}/
cp -f ${current}/plugin.scss ${GH_WORK_DIR}/
