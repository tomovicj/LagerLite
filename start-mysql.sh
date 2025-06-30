#!/bin/bash

docker run -d \
  --name lagerlite-mysql \
  -e MYSQL_ROOT_PASSWORD=lagerlite \
  -v mysql_data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:latest
