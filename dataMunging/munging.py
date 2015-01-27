''' original header: STATION,STATION_NAME,DATE,HLY-CLOD-PCTOVC,HLY-HIDX-NORMAL,HLY-TEMP-NORMAL,HLY-WCHL-NORMAL,HLY-WIND-AVGSPD
'''
import csv
import time
import datetime

cityNicknames = {'JACKSONVILLE INTERNATIONAL AIRPORT FL US': 'JACKSONVILLE',
'INDIANAPOLIS INTERNATIONAL AIRPORT IN US': 'INDIANAPOLIS',
'LOS ANGELES INTERNATIONAL AIRPORT CA US': 'LOS ANGELES',
'AUSTIN BERGSTROM INTERNATIONAL AIRPORT TX US': 'AUSTIN 2',
'COLUMBUS PORT COLUMBUS INTERNATIONAL AIRPORT OH US': 'COLUMBUS',
'WILMINGTON NEW CASTLE CO AIRPORT DE US': 'WILMINGTON',
'FARGO HECTOR INTERNATIONAL AIRPORT ND US': 'FARGO',
'CHARLOTTE DOUGLAS INTERNATIONAL AIRPORT NC US': 'CHARLOTTE',
'MINNEAPOLIS ST PAUL INTERNATIONAL AIRPORT MN US': 'MINNEAPOLIS',
'NEWARK INTERNATIONAL AIRPORT NJ US': 'NEWARK',
'MIAMI INTERNATIONAL AIRPORT FL US': 'MIAMI',
'PHILADELPHIA INTERNATIONAL AIRPORT PA US': 'PHILADELPHIA',
'GREAT FALLS INTERNATIONAL AIRPORT MT US': 'GREAT FALLS',
'NEW YORK LAGUARDIA AIRPORT NY US': 'NEW YORK LAGUARDIA', 
'SAN FRANCISCO INTERNATIONAL AIRPORT CA US': 'SAN FRANCISCO',
'PORTLAND INTERNATIONAL AIRPORT OR US': 'PORTLAND',
'EL PASO INTERNATIONAL AIRPORT TX US': 'EL PASO',
'NEW YORK J F KENNEDY INTERNATIONAL AIRPORT NY US': 'NEW YORK',
'AUSTIN CAMP MABRY TX US': 'AUSTIN',
'ATLANTA HARTSFIELD INTERNATIONAL AIRPORT GA US': 'ATLANTA',
'SEATTLE TACOMA INTERNATIONAL AIRPORT WA US': 'SEATTLE',
'SAN ANTONIO INTERNATIONAL AIRPORT TX US': 'SAN ANTONIO',
'LAS VEGAS MCCARRAN INTERNATIONAL AIRPORT NV US': 'LAS VEGAS',
'SAN DIEGO LINDBERGH FIELD CA US': 'SAN DIEGO',
'MEMPHIS INTERNATIONAL AIRPORT TN US': 'MEMPHIS',
'PHOENIX SKY HARBOR INTERNATIONAL AIRPORT AZ US': 'PHOENIX',
'HOUSTON INTERCONTINENTAL AIRPORT TX US': 'HOUSTON',
'LONG BEACH DAUGHERTY FIELD CA US': 'LONG BEACH',
'AURORA BUCKLEY FIELD ANGB CO US': 'DENVER',
'DALLAS FAA AIRPORT TX US': 'DALLAS',
'DETROIT METROPOLITAN AIRPORT MI US': 'DETROIT',
'CHICAGO OHARE INTERNATIONAL AIRPORT IL US': 'CHICAGO'}


def readList(filename):
    ''' reads in a file line by line
        for each line it strips the new line character, turns it into an integer, and appends it to an array
    '''
    myarray = []
    with open(filename, encoding='utf-8') as a_file:
        for a_line in a_file:
            a_line = a_line.rstrip("\n").split(",")[1:8]
            a_line[0] = cityNicknames[a_line[0]]
            a_line.append(int(a_line[1].split(" ")[1].split(":")[0]))
            k = a_line[1].split(" ")[0]
            a_line[1] = int(datetime.date(int(k[0:4]),int(k[4:6]),int(k[6:8])).strftime("%j"))
            myarray.append(a_line)

    for city in cityNicknames:
    	print(city)
    	ofile  = open(cityNicknames[city] + '.csv', "w")
    	writer = csv.writer(ofile, delimiter=',')
    	z = 'city,day,cloudCover,heatIndex,normalTemperature,windChill,aveWindSpeed,hour'
    	z = z.split(",")
    	writer.writerow(z)
    	for row in myarray:
	    	if row[0] == cityNicknames[city]:
	    		writer.writerow(row)

    	ofile.close()
    return [myarray]

# def readList(filename):
#     ''' reads in a file line by line
#         for each line it strips the new line character, turns it into an integer, and appends it to an array
#     '''
#     myarray = []
#     citiesList = []
#     with open(filename, encoding='utf-8') as a_file:
#         for a_line in a_file:
#         	a_line = a_line.rstrip("\n").split(",")[1:8]
#         	if a_line[0] not in citiesList:
#         		citiesList.append(a_line[0])
#         	a_line[0] = citiesList.index(a_line[0])
#         	a_line.append(int(a_line[1].split(" ")[1].split(":")[0]))
#         	a_line[1] = a_line[1].split(" ")[0]
#         	myarray.append(a_line)
#     ofile  = open('output.csv', "w")
#     writer = csv.writer(ofile, delimiter=',')
#     for row in myarray:
#     	writer.writerow(row)

#     ofile.close()
#     return [myarray, citiesList]

if __name__ == '__main__':
	''' do stuff ''' 
	k = readList("rawData.csv")
