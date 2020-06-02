import csv
import os
import datetime


csvpath = r"Instructions\PyBoss\employee_data.csv"


firstName=[]
lastName=[]
dob=[]
ssn=[]
state_ab=[]

us_state_abbrev = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',
}

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',', )

    header = next(csvreader)

    for rows in csvreader:
        split_string= rows[1].split(' ')

        #split the names into first and last name
        firstName.append(split_string[0])
        lastName.append(split_string[1])

        #convert date into different format
        d = datetime.datetime.strptime(rows[2], '%Y-%m-%d')
        d_fomratted = datetime.date.strftime(d, "%m/%d/%y")
        dob.append(d_fomratted)
        

        #SSN data should be re-written such that the first five numbers are hidden from view
        ssncover= list(rows[3])
        ssncover[0:6]=['*','*','*','-','*','*']
        listToStr = ' '.join([str(elem) for elem in ssncover]) 
        ssn.append(listToStr)

        #The State data should be re-written as simple two-letter abbreviations.
        stateAbbreviation= us_state_abbrev[rows[4]]
        state_ab.append(stateAbbreviation)

    
    
table= zip(firstName, lastName, dob, ssn, state_ab)

for employee in table:
    print (employee)

outputpath= r"Instructions\PyBoss\davidsEmployee_formatted.csv"

with open(outputpath, "w") as datafile:
    writer = csv.writer(datafile)
    writer.writerow(["First Name", "Last Name",
                    "DOB", "SSN", "State"])
    writer.writerows(table)



