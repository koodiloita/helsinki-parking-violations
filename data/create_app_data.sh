#!/bin/bash

set -o errexit
set -o nounset

GOOGLE_API_KEY=$1
PARKING_DATA_FILENAME=data.tsv
GEOCODE_FILENAME=geocode.txt
COORDINATES_FILENAME=coordinates.json
APP_DATA_FILENAME=appData.json

python geocode_fetcher.py $GOOGLE_API_KEY $PARKING_DATA_FILENAME $GEOCODE_FILENAME
python coordinates_parser.py $GEOCODE_FILENAME $COORDINATES_FILENAME
python app_data_generator.py $COORDINATES_FILENAME $PARKING_DATA_FILENAME $APP_DATA_FILENAME
mkdir -p ../app/src/data
cp $APP_DATA_FILENAME ../app/src/data/
