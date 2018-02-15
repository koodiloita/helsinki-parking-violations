import json
import sys
import csv
import parser


def main():
    coordinates_filename = sys.argv[1]
    parking_data_filename = sys.argv[2]
    app_data_filename = sys.argv[3]

    coordinates = load_coordinates(coordinates_filename)
    parking_data = load_parking_data(parking_data_filename)
    parsed_data = parser.parse_parking_data(parking_data, coordinates)
    with open(app_data_filename, 'w') as visualization_file:
        json.dump(parsed_data, visualization_file, indent=2)


def load_coordinates(coordinates_filename):
    with open(coordinates_filename, 'r') as coordinates_file:
        return json.load(coordinates_file)


def load_parking_data(filename):
    with open(filename, encoding='utf-16') as tsv_file:
        return list(csv.DictReader(tsv_file, delimiter='\t'))


if __name__ == '__main__':
    main()
