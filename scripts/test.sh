#!/usr/bin/env bash

# Ensure bash in approot
[ "$BASH" ] || exec bash $0 "$@"
cd "$(dirname "$0")/.."

# Ensure our dependencies are installed
[ -f "node_modules/.bin/tape" ] || npm install --save-dev tape
[ -d "node_modules/esm"       ] || npm install --save-dev esm

FILES=$(find -name '*.test.js' | egrep -v '\/node_modules\/')
node_modules/.bin/tape -r esm ${FILES}
