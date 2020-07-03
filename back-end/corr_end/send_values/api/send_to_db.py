# python send_to_db.py 'https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json'

from ..models import Correlations
from .lambda_async_s3_uri import filter_complete

def insert_db(args):
    table_values = filter_complete(args)

    ordered_table_values = sorted(table_values, key=lambda i: (i['rowNum'], i['colNum']))

    for value_set in ordered_table_values:
        new_value_set = Correlations.objects.create(**value_set)
        new_value_set.save()