#!/usr/bin/env bash

# unset all npm_ vars
for v in $(printenv); do
  [[ $v == npm_* ]] || continue;
  unset $(echo $v | tr '=' ' ' | awk '{print $1}')
done
