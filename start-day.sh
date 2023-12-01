#!/bin/bash
if [ $# -eq 1 ]
then
    cp -R template/ Day$1/
    mv Day$1/Day00.ts Day$1/Day$1.ts
else
    echo "You need to specify a day number"
fi