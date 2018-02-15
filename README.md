# Parking violations in Helsinki

Visualize the dataset [https://www.avoindata.fi/data/en/dataset/pysakointivirheet-helsingissa](https://www.avoindata.fi/data/en/dataset/pysakointivirheet-helsingissa) using heatmap.

The original dataset and generated files are ignored in repository because of their large size.

## Prerequisites
- Install Node (and Yarn)
- Install Python 3
- Install googlemaps package for python
- Create [Google API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Get [MapBox](https://www.mapbox.com/help/define-access-token/) token

## How to create the visualization data

1. Download the Excel file [http://www.hel.fi/hel2/tietokeskus/data/helsinki/hkr/Pysakointivirheet.xlsx](http://www.hel.fi/hel2/tietokeskus/data/helsinki/hkr/Pysakointivirheet.xlsx)
2. Save the Excel file as "Unicode Text (.txt)" because otherwise scandic characters might be corrupted
3. Rename the text file to data.tsv and move it into folder `data/`
4. Go to folder `data/` and run script `create_app_data.sh <GOOGLE_API_KEY>`

Note that the number of requests to Google API for the whole dataset is roughly 16k which might require a paid plan.

## Run visualization app

1. Go to folder `app`
2. Create the environment variables file `app/.env` and add following line:
 ```
 REACT_APP_MAPBOX_TOKEN=<MAPBOX_TOKEN>
 ```
3. Run `yarn install` or `npm install` to install the dependencies
4. Run `yarn start` or `npm start` to start the application and open the url [http://localhost:3000](http://localhost:3000)
