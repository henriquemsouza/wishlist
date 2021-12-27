#!/bin/sh

echo -e "\n🚀  starting application 🚀"
yarn install
echo -e "\n🏃  running migrations 🏃...🏃...🏃"
yarn migration:up
echo -e "\n🖥️  start server"
yarn start:dev