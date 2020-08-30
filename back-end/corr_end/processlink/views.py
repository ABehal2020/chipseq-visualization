from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from send_values.api.send_to_db import insert_db

import requests
from urllib.parse import urlparse

import sys
import json

import requests
from rest_framework.views import APIView
#from django.shortcuts import render

# http://127.0.0.1:8000/processlink/pushlink
@api_view(['POST'])
def postLink(request):
    '''
    :param request:
    :return:
    '''
    print(request.method)
    print(request.data)

    requestDict = request.data

    link = requestDict["encodeLink"]
    exp_name = requestDict["experimentName"]
    assembly = requestDict["assembly"]
    outputType = requestDict["outputType"]
    fileInput = requestDict["fileInput"]

    print("FILE INPUT ALERT")
    print(fileInput)
    print("FILE INPUT ALERT END")

    args = [[link], exp_name, assembly, outputType, fileInput]
    print(link)
    print(exp_name)
    print(assembly)
    print(outputType)

    insert_db(args)

    return Response(
        data=requestDict,
        status=status.HTTP_200_OK
    )

# http://127.0.0.1:8000/processlink/sendlink
@api_view(['GET'])
def getLink(param):
    #process_files()
    print("get link called")
    s = param.query_params.get('experimentName')
    print(s)

    mydata = { "name": 'ASP', "type":"sv", "content":[[1.0,2.0,3],[2,3,4]]}
    mydata['experimentName'] = s

    x = 'https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json'
    args = [x]

    insert_db(args)

    return Response(
        data=mydata,
        status=status.HTTP_200_OK
    )