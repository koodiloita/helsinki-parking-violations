import json
import tsv_reader
import parser


def main():
    coordinates = load_coordinates()
    parking_data = tsv_reader.load_parking_data()
    parsed_data = parser.parse_parking_data(parking_data, coordinates)
    with open('appData.json', 'w') as visualization_file:
        json.dump(parsed_data, visualization_file, indent=2)


def load_coordinates():
    with open('coordinates.json', 'r') as coordinates_file:
        return json.load(coordinates_file)

if __name__ == '__main__':
    main()
