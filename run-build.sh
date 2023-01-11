#!/bin/bash
ssh ubuntu@18.119.107.170
<<EOF
    cd ~/node-project
    git pull
    npm install
    npm run start
    exit
EOF