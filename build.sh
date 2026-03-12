#!/bin/bash
set -e

timestamp=$(date +%s)
dist="dist_$timestamp"

docker buildx build --output type=local,dest=./$dist .

rsync -av --delete ./$dist/ ./dist

find ./dist -type d -exec chmod 755 {} \;
find ./dist -type f -exec chmod 644 {} \;

rm -rf ./$dist