# python lambda_async_s3_uri.py 'https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json'

import time

start_time = time.time()

from itertools import combinations_with_replacement
import multiprocessing
import boto3
import json
import sys
from .s3_uri import fetch_encsr_encff, sequential_encsr_encff, set_globals
import re
import os
from dotenv import load_dotenv

load_dotenv()

def atoi(text):
    return int(text) if text.isdigit() else text

def natural_keys(text):
    return [atoi(c) for c in re.split(r'(\d+)', text)]

def format(args):
    bed_paths, bed_labels = fetch_encsr_encff(args)
    bed_files_nsort = []

    for i in range(len(bed_paths)):
        bed_files_nsort.append(bed_paths[i][-18:])

    # natural sort of bed files
    bed_files_nsort.sort(key=natural_keys)

    # generating unique pairs of bed files to correlate
    bed_pairs = list(combinations_with_replacement(bed_paths, 2))

    num_bed_pairs = len(bed_pairs)

    bed_formatted = []

    '''
    for bed_pair, i in zip(bed_pairs, range(len(bed_pairs))):
        file1 = bed_pair[0][19:]
        file2 = bed_pair[1][19:]
        f_name1 = file1[-18:]
        f_name2 = file2[-18:]
        print(f_name1)
        print(f_name2)
        label1 = ''
        label2 = ''
        for bed_label in bed_labels:
            print("bed label")
            print(bed_label[:18])
            print(f_name1)
            print(f_name2)
            if f_name1 == bed_label[:18]:
                label1 = bed_label
            if f_name2 == bed_label[:18]:
                label2 = bed_label
        bed_formatted.append('{"file1": "' + file1 + '", "file2": "' + file2 + '", "label1": "' + label1 + '", "label2": "' + label2 + '"}')
    '''

    for bed_pair in bed_pairs:
        file1 = bed_pair[0][19:]
        file2 = bed_pair[1][19:]
        f_name1 = file1[-18:]
        f_name2 = file2[-18:]
        label1 = ''
        label2 = ''
        for bed_label in bed_labels:
            # print("bed label")
            # print(bed_label[:18])
            # print("file 1")
            # print(f_name1)
            # print("file 2")
            # print(f_name2)
            if f_name1 == bed_label[:18]:
                label1 = bed_label
            if f_name2 == bed_label[:18]:
                label2 = bed_label
        bed_formatted.append('{"file1": "' + file1 + '", "file2": "' + file2 + '", "label1": "' + label1 + '", "label2": "' + label2 + '"}')

    # print(bed_formatted)

    return bed_formatted, num_bed_pairs, bed_files_nsort, bed_labels

def asyncInvokeLambda(payload):
    client = boto3.client('lambda')
    response = client.invoke(
        FunctionName=os.getenv('JACCARD3'),
        InvocationType='Event',
        LogType='None',
        Payload=payload
        # Qualifier='$LATEST'
    )

    return response

def poll1():
    # Get the service resource
    sqs = boto3.resource('sqs')
    messageOne = ""

    queue = sqs.get_queue_by_name(QueueName='jaccard3-success')

    for message in queue.receive_messages():
        messageOne = json.loads(message.body)
        message.delete()

    print("aws lambda response")
    print(messageOne)

    return messageOne

def poll_all(num_bed_pairs):
    messagesList = []
    processedList = []

    for x in range(num_bed_pairs):
        messagesList.append(poll1())

    for x in range(len(messagesList)):
        processedList.append(messagesList[x]['responsePayload'])

    print(processedList)
    print(len(processedList))

    return processedList

def filter_complete(args):
    processes = []
    table_values = []
    not_duplicated = []
    assembly = args[2]
    outputType = args[3]
    set_globals(assembly, outputType)
    payload_formatted, num_bed_pairs, bed_files_nsort, bed_labels = format(args[0])
    # print(payload_formatted)
    experiment_name = args[1]

    for payload in payload_formatted:
        p = multiprocessing.Process( target=asyncInvokeLambda, args=(payload,) )
        processes.append(p)
        p.start()

    for process in processes:
        process.join()

    print('All AWS Lambda Asynchrous Invocations Triggered --- %.2f seconds ---' % (time.time() - start_time))

    processFurther = poll_all(num_bed_pairs)

    for i in range(len(processFurther)):
        dataInter = processFurther[i]['score']
        # row_label = dataInter.split('/tmp/')[1][:-4]
        # col_label = dataInter.split('/tmp/')[2][:18]
        row_label = dataInter.split("'")[1]
        col_label = dataInter.split("'")[3]
        for i in range(len(bed_files_nsort)):
            # print(bed_files_nsort[i])
            if row_label[:18] == bed_files_nsort[i]:
                row_num = i
                break
        for j in range(len(bed_files_nsort)):
            # print(bed_files_nsort[j])
            if col_label[:18] == bed_files_nsort[j]:
                col_num = j
                break
        corr_value = dataInter.split(': ')[-1][:-1]
        dataDict = dict(experimentName=experiment_name, rowNum=row_num, colNum=col_num, rowLabel=row_label, colLabel=col_label, corrValue=corr_value)
        # dataDict = [experiment_name, row_num, col_num, row_label, col_label, corr_value]
        table_values.append(dataDict)
        if row_label != col_label:
            temp_label = row_label
            row_label = col_label
            col_label = temp_label
            temp_num = row_num
            row_num = col_num
            col_num = temp_num
            dataDictFlipped = dict(experimentName=experiment_name, rowNum=row_num, colNum=col_num, rowLabel=row_label,
                             colLabel=col_label, corrValue=corr_value)
            table_values.append(dataDictFlipped)
        else:
            not_duplicated.append(dataDict)

    '''
    print('bed files nsort')
    print(bed_files_nsort)
    print('end')
    print('not duplicated')
    print(not_duplicated)
    print('end')
    '''

    print(table_values)
    print(len(table_values))

    return table_values

def main(args):
    filter_complete(args)
    print('Total time --- %.2f seconds ---' % (time.time() - start_time))

if __name__ == '__main__':
    main(sys.argv[1:])