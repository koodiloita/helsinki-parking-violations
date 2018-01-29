def parse_parking_data(parking_rows, coordinates):
    parking_dict = {}
    for row in parking_rows:
        address = row['Osoite']
        year = int(row['Virheen tekovuosi'])
        month = parse_month(row['Virheen tekokuukausi'])

        if address not in parking_dict:
            add_address(address, coordinates, parking_dict)
        if year not in parking_dict[address]['violationCounts']:
            add_year(address, year, parking_dict)

        parking_dict[address]['violationCounts'][year][month] += 1

    return parking_dict


def add_year(address, year, parking_dict):
    parking_dict[address]['violationCounts'][year] = {}
    for month in range(1, 13):
        parking_dict[address]['violationCounts'][year][month] = 0


def add_address(address, coordinates, parking_dict):
    if address in coordinates:
        address_coordinates = coordinates[address]
    else:
        address_coordinates = {
            'lat': None,
            'lon': None
        }
    parking_dict[address] = {}
    parking_dict[address]['lat'] = address_coordinates['lat']
    parking_dict[address]['lon'] = address_coordinates['lon']
    parking_dict[address]['violationCounts'] = {}


def parse_month(month_str):
    month_conversion = {
        'Tammikuu': 1,
        'Helmikuu': 2,
        'Maaliskuu': 3,
        'Huhtikuu': 4,
        'Toukokuu': 5,
        'Kesäkuu': 6,
        'Heinäkuu': 7,
        'Elokuu': 8,
        'Syyskuu': 9,
        'Lokakuu': 10,
        'Marraskuu': 11,
        'Joulukuu': 12
    }
    if month_str in month_conversion:
        return month_conversion[month_str]
    else:
        return None


def parse_coordinates(geocode_response):
    try:
        coordinates = {
            'lat': geocode_response[0]['geometry']['location']['lat'],
            'lon': geocode_response[0]['geometry']['location']['lng']
        }
        return coordinates
    except:
        print('Cannot parse coordinates of response', geocode_response)
        return {
            'lat': None,
            'lon': None
        }
