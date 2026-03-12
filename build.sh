#!/bin/bash

docker buildx build --output type=local,dest=./dist .

chmod -R 755 ./dist