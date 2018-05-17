# [{"country":"usa","value":[{"name":"Total Navy","count":22},{},{}]},{}]
a = [{
    "Country": "Canada",
    "Ranks": 22,
    "Total Navy": 63,
    "Self Propelled guns": 0,
    "Man Power": "95,000",
    "Submarines": 4,
    "Total fighters": 64,
    "Destroyers": 1,
    "Tanks": 181,
    "Helicopter": 175,
    "Aircraft": 426,
    "Reserve Man power": "51,000",
    "Population": "35,099,836"
  }]


final=[]
for country in a:
	temp={}
	temp={"country": country["Country"],"value":[]}
	for keys in country.keys():
		# print keys
		another_temp ={}
		another_temp["name"] = keys
		another_temp["value"] = country[keys]
		temp["value"].append(another_temp)
	final.append(temp)

print final