import urllib2
from BeautifulSoup import BeautifulSoup
import csv

links = {"Population":"http://www.globalfirepower.com/total-population-by-country.asp", "Man Power" :"http://www.globalfirepower.com/active-military-manpower.asp", "Reserve Man power":"http://www.globalfirepower.com/active-reserve-military-manpower.asp", "Tanks" :"http://www.globalfirepower.com/armor-tanks-total.asp", "Self Propelled guns":"http://www.globalfirepower.com/armor-self-propelled-guns-total.asp", "Aircraft":"http://www.globalfirepower.com/aircraft-total.asp", "Total fighters" : "http://www.globalfirepower.com/aircraft-total-fighters.asp", "Helicopter":"http://www.globalfirepower.com/aircraft-helicopters-total.asp","Total Navy" : "http://www.globalfirepower.com/navy-ships.asp","Destroyers": "http://www.globalfirepower.com/navy-destroyers.asp", "Submarines":"http://www.globalfirepower.com/navy-submarines.asp"}

target = "./projectData.csv"
csvFile = open(target,"wb")
wr = csv.writer(csvFile,quoting = csv.QUOTE_ALL)
final=[]
country_dic={}

for i in links.keys():
	print links[i]
	r = urllib2.urlopen(links[i])
	soup = BeautifulSoup(r)
	count=0
	
	for element in soup.findAll("div",{"id" : "content-right"}):
		# print element.contents
		for title in element.findAll('a'):
				if len(title.contents)!=1:
					country_name = ''
					for l in title['title'].split(" ")[:-3]:
						country_name += l+" "
					country_name += title['title'].split(" ")[-3]
					temp_arr = title.contents
					temp_arr = [x for x in temp_arr if x!="\n"]
					temp_arr[0].contents = [x for x in temp_arr[0].contents if x!="\n"]
					arr = temp_arr[0].contents[-1].contents
					arr = [x for x in arr if x!="\n"]
					value =  arr[0].contents[0]
					if country_name not in country_dic:
						country_dic[country_name]= {}
						country_dic[country_name][i] = value
					else:
						country_dic[country_name][i] = value


	

print country_dic

for country in country_dic.keys():
	temp = []
	temp.append("Country")
	for each in country_dic[country].keys():
		temp.append(each)
	final.append(temp)
	break
print final

for country in country_dic:
	temp = []
	temp.append(country)
	for each in final[0][1:]:
		# print each
		try:
			temp.append(country_dic[country][each])
		except:
			temp.append(0)
	print temp
	final.append(temp)

for item in final:
	wr.writerow(item)
csvFile.close()