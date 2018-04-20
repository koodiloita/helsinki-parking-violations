#!/bin/bash

set -o errexit
set -o nounset

read -p "Are you sure you want to continue (y/N)? This script will reset the database 'parking'. " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Initializing database 'parking' ..."
    psql -f db.sql
    echo "Populating database with parking data ..."
    python db_populator.py
fi
