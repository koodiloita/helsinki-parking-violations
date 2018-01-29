import csv


def load_parking_data(year=None, month=None):
    data = []
    with open('data.tsv', encoding='utf-16') as tsv_file:
        for row in csv.DictReader(tsv_file, delimiter='\t'):
            year_is_valid = year is None or int(row['Virheen tekovuosi']) == year
            month_is_valid = month is None or row['Virheen tekokuukausi'] == month
            if year_is_valid and month_is_valid:
                data.append(row)
    return data
