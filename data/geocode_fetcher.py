import sys
import json
import csv
import googlemaps


def main():
    api_key = sys.argv[1]
    parking_data_filename = sys.argv[2]
    geocode_filename = sys.argv[3]
    client = googlemaps.Client(key=api_key)
    load_geocode_data(client, geocode_filename, parking_data_filename)


def load_geocode_data(client, geocode_filename, parking_data_filename):
    addresses = load_addresses(parking_data_filename)
    with open(geocode_filename, 'w', encoding='utf-16') as geocode_file:
        for index, address in enumerate(addresses):
            print_progress(index, len(addresses))
            geocode_result = fetch_geocode(address, client)
            output_str = json.dumps({
                'address': address,
                'geocode': geocode_result
            })
            geocode_file.write(output_str + '\n')


def print_progress(index, addresses_length):
    if index % 100 == 0:
        print('{} / {} addresses processed'.format(index, addresses_length))


def fetch_geocode(address, client):
    try:
        address_with_city = '{}, Helsinki'.format(address)
        geocode_result = client.geocode(address_with_city)
        return geocode_result
    except Exception as inst:
        print('Failed to load geocode data of address {}: {}'.format(address, inst))
        return None


def load_addresses(parking_data_filename):
    data = load_parking_data(parking_data_filename)
    unique_addresses = set([row['Osoite'] for row in data if len(row['Osoite']) > 0])
    return sorted(list(unique_addresses))


def load_parking_data(filename):
    with open(filename, encoding='utf-16') as tsv_file:
        return list(csv.DictReader(tsv_file, delimiter='\t'))


if __name__ == '__main__':
    main()
