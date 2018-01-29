import sys
import json
import googlemaps
import tsv_reader


def main():
    api_key = sys.argv[1]
    client = googlemaps.Client(key=api_key)
    load_geocode_data(client)


def load_geocode_data(client):
    addresses = load_addresses()
    index = 0
    with open('geocode.txt', 'w', encoding='utf-16') as geocode_file:
        for address in addresses:
            print_progress(index, len(addresses))
            index += 1
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


def load_addresses():
    data = tsv_reader.load_parking_data()
    addresses = set([row['Osoite'] for row in data if len(row['Osoite']) > 0])
    return sorted(list(addresses))


if __name__ == '__main__':
    main()
