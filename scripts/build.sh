#!/usr/bin/env bash

[ -z ${MYPATH+x}  ] && export MYPATH=$(command -v realpath &>/dev/null && realpath $0 || readlink -f $0 || greadlink -f $0)
[ -z ${SCRIPTS+x} ] && export SCRIPTS=$(dirname $MYPATH)
[ -z ${APPROOT+x} ] && export APPROOT=$(dirname $SCRIPTS)
PATH="${APPROOT}/node_modules/.bin:${PATH}"

BROWSERIFY="browserify -p esmify"
UGLIFY="${APPROOT}/node_modules/uglify-es/bin/uglifyjs"

# Compile some assets
FILES=()
FILES+=("index.js")
OUTS=()
OUTS+=("lucene-filter.js")
MINS=()
MINS+=("lucene-filter.min.js")

echo -e "\nBuilding"
for INDEX in "${!FILES[@]}"; do
  echo " - dist/${OUTS[$INDEX]}"
  ${BROWSERIFY} -e "${APPROOT}/src/${FILES[$INDEX]}" -o "${APPROOT}/dist/${OUTS[$INDEX]}"
done

echo -e "\nMinifying"
for INDEX in "${!OUTS[@]}"; do
  echo " - dist/${MINS[$INDEX]}"
  { echo "// Build by" $(whoami) "@" $(date) ; cat "dist/${OUTS[$INDEX]}" | ${UGLIFY} --compress --mangle ; } > "dist/${MINS[$INDEX]}"
done


ARGMODE=0
while (( "$#" )); do
  case "$ARGMODE" in
    0)
      case "$1" in
        "--watch")
          echo ""
          inotifywait -re close_write "${APPROOT}/src/"
          exec "${MYPATH}" --watch
          ;;
        *);;
      esac
      shift
      ;;
    *);;
  esac
done
