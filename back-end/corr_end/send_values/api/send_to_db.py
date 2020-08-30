# python send_to_db.py 'https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json'
import boto3
import subprocess
# import os.path
from os import path

from ..models import Correlations
from .lambda_async_s3_uri import filter_complete

def insert_db(args):
    if path.exists('input.txt'):
        bashCommand = 'rm input.txt'
        process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
        process.communicate()

    if path.exists('output.csv'):
        bashCommand = 'rm output.csv'
        process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
        process.communicate()

    table_values = filter_complete(args)

    ordered_table_values = sorted(table_values, key=lambda i: (i['rowNum'], i['colNum']))

    for value_set in ordered_table_values:
        new_value_set = Correlations.objects.create(**value_set)
        new_value_set.save()

    sqs = boto3.client('sqs')
    sqs.purge_queue(QueueUrl='https://sqs.us-west-2.amazonaws.com/618537831167/jaccard3-success')