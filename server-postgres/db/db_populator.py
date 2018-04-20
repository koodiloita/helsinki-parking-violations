import psycopg2
import json


APP_DATA_JSON = 'appData.json'
DB_NAME = 'parking'

def main():
    app_data = load_app_data()
    conn = create_db_conn()
    with conn, conn.cursor() as cursor:
        for address, address_dict in app_data.items():
            lat = address_dict['lat']
            lon = address_dict['lon']
            cursor.execute('INSERT INTO address (title, lat, lon) VALUES (%s, %s, %s) RETURNING id', (address, lat, lon))
            address_id = cursor.fetchone()[0]
            for year, year_counts_dict in address_dict['violationCounts'].items():
                for month, month_count in year_counts_dict.items():
                    cursor.execute('INSERT INTO violation_count (address_id, year, month, count) VALUES (%s, %s, %s, %s)', (address_id, int(year), int(month), month_count))


def load_app_data():
    with open(APP_DATA_JSON, 'r') as json_file:
        return json.load(json_file)


def create_db_conn():
    connection_str = "dbname='{db_name}' host='localhost'".format(db_name=DB_NAME)
    return psycopg2.connect(connection_str)


if __name__ == '__main__':
    main()
