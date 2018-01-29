import json
import parser


def main():
    data = load_geocode_data()
    with open('coordinates.json', 'w') as coordinates_file:
        json.dump(data, coordinates_file, indent=2)


def load_geocode_data():
    data = {}
    with open('geocode.txt', 'r', encoding='utf-16') as geocode_file:
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
