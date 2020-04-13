import csv
from statistics import mean
import string

csvpath = r"PyPoll\Resources\election_data.csv"



with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',', )
    

    csv_header = next(csvreader)
    totalVotes = 0
    subtotal1= 0
    subtotal2= 0
    subtotal3= 0
    subtotal4= 0

    
    candidate1= "Li"
    candidate2= "Khan"
    candidate3= "Correy"
    candidate4= "O'Tooley"



    unique_candidates = set()
    for rows in csvreader:
        totalVotes+= 1
        unique_candidates.add(rows[2])
        
        if (rows[2]== candidate1):
            subtotal1+=1
        elif (rows[2]== candidate2):
            subtotal2+=1 
        elif (rows[2]== candidate3):
            subtotal3+=1 
        elif (rows[2]== candidate4):
            subtotal4+=1

    #create a function to calculate percentages for each candidate    
    def percent(subtotal, total, candidatename,):
        percentage = (subtotal/total)*100
        print(f"{candidatename}:{percentage} % votes ({subtotal})")
        return(percentage)
    
    #print the names of the candidates
    print(f"These are the candidates:{unique_candidates}")

    #print out the total number of votes
    print(f"Total Votes : {totalVotes}")
    
    # use percent function to find the percentage for each candidate
    firstperc =percent(subtotal1,totalVotes,candidate1)

    secperc =percent(subtotal2,totalVotes,candidate2)

    thirdperc= percent(subtotal3,totalVotes,candidate3)

    fourthperc= percent(subtotal4,totalVotes,candidate4)
 
       
    peoplezip= [candidate1, candidate2,candidate3,candidate4]
    percentzip= [firstperc,secperc, thirdperc, fourthperc ]

    data = zip(peoplezip, percentzip)
    maximumpercent = max(percentzip)
    for thing in data:
        #int(thing[1])
        if thing[1] == maximumpercent:
            print(F"Winner: {thing[0]} ")

    
    

    
    
    #print(f"li had :{subtotal1} votes")
    #print (f"Khan had :{subtotal2} votes")
    #print (f"Correy had :{subtotal3} votes")
    #print (f"O'Tooley had :{subtotal4} votes")







    
    

    
