import json
import sys
import parser


def main():
    geocode_filename = sys.argv[1]
    coordinates_filename = sys.argv[2]
    data = load_geocode_data(geocode_filename)
    with open(coordinates_filename, 'w') as coordinates_file:
        json.dump(data, coordinates_file, indent=2)


def load_geocode_data(geocode_filename):
    data = {}
    with open(geocode_filename, 'r', encoding='utf-16') as geocode_file:
        for line in geocode_file.readlines():
            geocode_datum = json.loads(line)
            coordinates = parser.parse_coordinates(geocode_datum['geocode'])
            data[geocode_datum['address']] = {
                'lat': coordinates['lat'],
                'lon': coordinates['lon']
            }
    return data


if __name__ == '__main__':
    main()
