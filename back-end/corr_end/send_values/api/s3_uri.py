import time
import requests
import sys
import subprocess
import json
from multiprocessing import Pool

assembly = []
outputType = []

def parseSearch(url):
    download_time = time.time()
    # url = 'https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&award.rfa=ENCODE4&assay_title=Histone+ChIP-seq&assembly=GRCh38&format=json'
    encsrLinkList = []
    encsrNameList = []

    # making directories where bed files will be downloaded and unzipped
    bashCommand = 'mkdir -p ./bedAuto/jsonENCSR'
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    process.communicate()

    bashCommand = 'mkdir -p ./bedAuto/filesBed'
    process = subprocess.Popen( bashCommand.split(), stdout=subprocess.PIPE)
    process.communicate()

    # download json file of user search results
    filePath = './bedAuto/userSearch.json'
    r = requests.get(url, allow_redirects=True)

    with open(filePath, 'wb') as f:
        f.write(r.content)

    print('download search json --- %.2f seconds ---' % (time.time() - download_time))

    encsr_time = time.time()

    with open(filePath, 'r') as f:
        userSearch = json.load(f)

    userSearchFiltered = userSearch['@graph']

    # getting encsrs from json of user search results
    for element in range(len(userSearchFiltered)):
        if userSearchFiltered[element]['@id'][1:18] == 'experiments/ENCSR':
            encsrName = userSearchFiltered[element]['@id'][13:24]
            encsrNameList.append(encsrName)
            encsrLink = 'https://www.encodeproject.org/experiments/' + encsrName + '/?format=json'
            encsrLinkList.append(encsrLink)

    print('parse for encsr --- %.2f seconds ---' % (time.time() - encsr_time))

    return encsrNameList, encsrLinkList

# not multi-threaded
def sequential_encsr_encff(args):
    encff_time = time.time()
    filePath = './bedAuto/jsonENCSR/'
    encsrDict = dict()
    encffNames = []
    encffLinks = []
    encsrNameList, encsrLinkList = parseSearch(args[0])

    # getting encffs from jsons of encsrs
    # only encffs matching below criteria will be extracted from jsons of encsrs
    # file type: bed narrowPeak, output type: replicated peaks, assembly: GRCh38
    for encsrName, encsrLink in zip(encsrNameList, encsrLinkList):
        r = requests.get(encsrLink, allow_redirects=True)
        filePathCurrent = filePath + encsrName + '.json'
        with open(filePathCurrent, 'wb') as f:
            f.write(r.content)
        with open(filePathCurrent, 'r') as f:
            encsrDict[encsrName] = json.load(f)
        infoFiltered = encsrDict[encsrName]['files']
        for element in range(len(infoFiltered)):
            if infoFiltered[element]['file_type'] == 'bed narrowPeak' and infoFiltered[element]['output_type'] == 'replicated peaks':
                if infoFiltered[element]['assembly'] == 'GRCh38':
                    encffNames.append(infoFiltered[element]['s3_uri'][-18:])
                    encffLinks.append(infoFiltered[element]['s3_uri'])

    print('parse for encff --- %.2f seconds ---' % (time.time() - encff_time))

    for name, link in zip(encffNames, encffLinks):
        print(name)
        print(link)

def set_globals(assemblyParam, outputTypeParam, fileTypeParam):
    global assembly
    global outputType
    global fileType
    assembly = assemblyParam
    outputType = outputTypeParam
    fileType = fileTypeParam

# multi-threaded
def multi_encsr_encff(*file_path):
    encsr_dict = dict()
    encff_names = []
    encff_links = []
    encff_labels = []
    global assembly
    global outputType
    file_path = str(file_path)[2:-3]

    # getting encffs from jsons of encsrs
    # only encffs matching below criteria will be extracted from jsons of encsrs
    # file type: bed narrowPeak, output type: replicated peaks, assembly: GRCh38
    # for encsrName, encsrLink in zip(encsrNameList, encsrLinkList):
    with open(str(file_path), 'r') as f:
        encsr_dict[file_path] = json.load(f)

    info_filtered = encsr_dict[file_path]['files']
    info_more = encsr_dict[file_path]

    if type(assembly) != list:
        assembly = [assembly]

    if type(outputType) != list:
        outputType = [outputType]

    # bed files getting s3_uri
    if fileType == "bed":
        for element in range(len(info_filtered)):
            for assemblyElement, outputTypeElement in zip(assembly, outputType):
                if info_filtered[element]['file_type'] == 'bed narrowPeak' and info_filtered[element]['output_type'] == outputTypeElement:
                    if info_filtered[element]['assembly'] == assemblyElement:
                        encff_names.append(info_filtered[element]['s3_uri'][-18:])
                        encff_links.append(info_filtered[element]['s3_uri'])
                        encff_label = info_filtered[element]['s3_uri'][-18:] + ' ' + info_more['biosample_ontology']['term_name'] + ' ' + info_more['target']['label']
                        encff_labels.append(encff_label)

    # bigbed files getting url
    if fileType == ['bigBed']:
        with open('input.txt', 'a+') as f:
            for element in range(len(info_filtered)):
                for assemblyElement, outputTypeElement in zip(assembly, outputType):
                    if info_filtered[element]['file_type'] == 'bigBed narrowPeak' and info_filtered[element]['output_type'] == outputTypeElement:
                        if info_filtered[element]['assembly'] == assemblyElement:
                            encff_names.append(info_filtered[element]['s3_uri'][-18:])
                            f.write(info_filtered[element]['cloud_metadata']['url'] + '\n')
                            print(info_filtered[element]['cloud_metadata']['url'])
                            encff_links.append(info_filtered[element]['cloud_metadata']['url'])
                            encff_label = info_filtered[element]['s3_uri'][-18:] + ' ' + info_more['biosample_ontology']['term_name'] + ' ' + info_more['target']['label']
                            encff_labels.append(encff_label)

    return encff_names, encff_links, encff_labels

# calling multi-threaded encsr_encff parse function
def fetch_encsr_encff(args):
    fetch_encsr_time = time.time()
    file_path = './bedAuto/jsonENCSR/'
    file_path_all = []
    encff_names = []
    encff_links = []
    encff_labels = []
    encsr_names, encsr_links = parseSearch(args[0])

    for encsr_name, encsr_link in zip(encsr_names, encsr_links):
        r = requests.get(encsr_link, allow_redirects=True)
        file_path_current = file_path + encsr_name + '.json'
        file_path_all.append(file_path_current)
        with open(file_path_current, 'wb') as f:
            f.write(r.content)

    num_processes = len(file_path_all)

    with Pool(num_processes) as p:
        encff_names_links = p.map(multi_encsr_encff, file_path_all)

    print('parse for encff --- %.2f seconds ---' % (time.time() - fetch_encsr_time))

    for encff_name, encff_link, encff_label in encff_names_links:
        encff_names.append(str(encff_name)[2:-2])
        encff_links.append(str(encff_link)[2:-2])
        encff_labels.append(str(encff_label)[2:-2])

    print("encff labels")
    print(encff_labels)
    print("encff names")
    print(encff_names)
    print("encff links")
    print(encff_links)

    return encff_links, encff_labels

def main(args):
    # sequential_encsr_encff(args)
    fetch_encsr_encff(args)

if __name__ == '__main__':
    main(sys.argv[1:])