import unittest
import io
import csv
import parser


TSV_FILE = """Virheen tekokuukausi	Virheen tekovuosi	Osoite	Virhemaksun vaihe	Virheen pääluokka / pääsyy	Virheen kirjaaja	y	x	Postinumero	Postitoimipaikka	Alue	Kunta	Kunta_nro
Helmikuu	2017	Aadolfinkatu 11	Pysäköintivirhemaksu	0601 pysäköinti ilman p-tunnusta/p-laitetta/p-lippua	Pysäköinnintarkastaja	6674897	25497503	00500	HELSINKI	Sörnäinen	Helsinki	91
Huhtikuu	2017	Aadolfinkatu 11	Pysäköintivirhemaksu	0601 pysäköinti ilman p-tunnusta/p-laitetta/p-lippua	Pysäköinnintarkastaja	6674897	25497503	00500	HELSINKI	Sörnäinen	Helsinki	91
Maaliskuu	2017	Aadolfinkatu 11	Pysäköintivirhemaksu	0601 pysäköinti ilman p-tunnusta/p-laitetta/p-lippua	Pysäköinnintarkastaja	6674897	25497503	00500	HELSINKI	Sörnäinen	Helsinki	91
Maaliskuu	2016	Aadolfinkatu 11	Pysäköintivirhemaksu	0601 pysäköinti ilman p-tunnusta/p-laitetta/p-lippua	Pysäköinnintarkastaja	6674897	25497503	00500	HELSINKI	Sörnäinen	Helsinki	91
Kesäkuu	2017	Abrahaminkatu 1	Pysäköintivirhemaksu	1501 Pysäköinti jalkakäytävälle 2200 Pysäköinti merkityn pysäköintipaikan viereen	Pysäköinnintarkastaja	6672246	25496197	00180	HELSINKI	Ruoholahti	Helsinki	91
Maaliskuu	2017	Abrahaminkatu 1	Pysäköintivirhemaksu	0601 pysäköinti ilman p-tunnusta/p-laitetta/p-lippua	Pysäköinnintarkastaja	6672246	25496197	00180	HELSINKI	Ruoholahti	Helsinki	91
Maaliskuu	2017	Abrahaminkatu 1	Pysäköintivirhemaksu	0601 pysäköinti ilman p-tunnusta/p-laitetta/p-lippua	Pysäköinnintarkastaja	6672246	25496197	00180	HELSINKI	Ruoholahti	Helsinki	91
Maaliskuu	2017	Abrahaminkatu 1	Pysäköintivirhemaksu	0702 pysäköinti ilman p-laitetta/p-lippua	Pysäköinnintarkastaja	6672246	25496197	00180	HELSINKI	Ruoholahti	Helsinki	91
"""

COORDINATES = {
    'Aadolfinkatu 11': {
        'lat': 11,
        'lon': 22
    },
    'Abrahaminkatu 1': {
        'lat': 101,
        'lon': 202
    }
}


class TestParser(unittest.TestCase):
    def test_parse_parking_tsv(self):
        expected_dict = {
            'Aadolfinkatu 11': {
                'lat': 11,
                'lon': 22,
                'violationCounts': {
                    2017: {
                        1: 0,
                        2: 1,
                        3: 1,
                        4: 1,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0
                    },
                    2016: {
                        1: 0,
                        2: 0,
                        3: 1,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0
                    }
                }
            },
            'Abrahaminkatu 1': {
                'lat': 101,
                'lon': 202,
                'violationCounts': {
                    2017: {
                        1: 0,
                        2: 0,
                        3: 3,
                        4: 0,
                        5: 0,
                        6: 1,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0
                    }
                }
            }
        }
        parking_data = list(csv.DictReader(io.StringIO(TSV_FILE), delimiter='\t'))
        parking_json = parser.parse_parking_data(parking_data, COORDINATES)
        self.assertEqual(parking_json, expected_dict)

    def test_parse_coordinates(self):
        geocode_response = [{
            "geometry": {
                "location": {
                    "lat": 10,
                    "lng": 20
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 100,
                        "lng": 200
                    },
                    "southwest": {
                        "lat": 1000,
                        "lng": 2000
                    }
                }
            }
        }]
        expected_coordinates = {
            'lat': 10,
            'lon': 20
        }
        parsed_coordinates = parser.parse_coordinates(geocode_response)
        self.assertEqual(parsed_coordinates, expected_coordinates)
