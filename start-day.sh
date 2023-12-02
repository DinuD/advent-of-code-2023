#!/bin/bash
if [ $# -eq 1 ]
then
    cp -R template/ Day$1/
    mv Day$1/Day00.ts Day$1/Day$1.ts
    touch Day$1/input.txt
    touch Day$1/example.txt
    echo "Day $1 created"
else
    echo "You need to specify a day number"
fi