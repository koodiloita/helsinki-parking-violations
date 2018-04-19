import json
from graphqlclient import GraphQLClient
import sys

CREATE_ADDRESS_TEMPLATE = '''
mutation {{
  createAddress(data: {{
    title: "{title}"
    lat: {lat}
    lon: {lon}
  }}) {{
    id
  }}
}}
'''

CREATE_VIOLATION_COUNT_TEMPLATE = '''
mutation {{
  createViolationCount(data: {{
    address: {{
      connect: {{
        id: "{address_id}"
      }}
    }}
    year: {year}
    month: {month}
    count: {count}
  }}) {{
    id
  }}
}}
'''

def main():
    app_data_json = sys.argv[1]
    graphql_url = sys.argv[2]
    client = GraphQLClient(graphql_url)
    app_data = load_app_data(app_data_json)
    for address, address_dict in app_data.items():
        print('Inserting address {address} to database ... '.format(address=address))
        lat = address_dict['lat']
        lon = address_dict['lon']
        address_result = client.execute(CREATE_ADDRESS_TEMPLATE.format(title=address, lat=lat, lon=lon))
        for year, year_counts_dict in address_dict['violationCounts'].items():
            for month, month_count in year_counts_dict.items():
                address_id = parse_address_id(address_result)
                result = client.execute(CREATE_VIOLATION_COUNT_TEMPLATE.format(address_id=address_id, year=year, month=month, count=month_count))


def parse_address_id(address_result):
    address_dict = json.loads(address_result)
    try:
        return address_dict['data']['createAddress']['id']
    except Exception:
        return None


def load_app_data(json_filename):
    with open(json_filename, 'r') as json_file:
        return json.load(json_file)


if __name__ == '__main__':
    main()
