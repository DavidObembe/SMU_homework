#import the file
import csv
from statistics import mean
import copy

csvpath = r"PyBank\Resources\budget_data.csv"


with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',', )
    first_val = 0



    csv_header = next(csvreader)
    

    num_rows= 1 #this is a counter for the number of rows

   
    
    change=0
    

    

    lastvalue= int(next(csvreader)[1])
    total= lastvalue #this is a counter for adding up the profits/losses
    changes= []
    months=[]
    
    for rows in csvreader:
        num_rows+=1 #equation1 for counting rows
        total+= int(rows[1]) #equation2 for adding profits
        
        currentvalue= int(rows[1])
        change= currentvalue- lastvalue
        lastvalue= int(rows[1])

        month= rows[0]
        months.append(month)

        #add change to an array so that average can be obtained 
        changes.append(change)
        

    print(f"Total months:{num_rows}") 
    print(f"total profit: ${total}")    
    #print(average)
    average= mean(changes)
    print(f"average:${average}" )

    data = zip(months, changes)
    maxchange = max(changes)
    minchange = min(changes)
    for thing in data:
        if thing[1] == maxchange:
            print(f"greatest increase in profit: {thing[0]} (${thing[1]})")
        elif thing[1] == minchange:
            print (f"greatest decrease in profit: {thing[0]} (${thing[1]})")
    
 
#specify the file to write to
output_path= r"Pybank\output.csv"

#write file
with open(output_path, "w") as csvfile:
    csvwriter = csv.writer(csvfile, dialect='excel')

    csvwriter.writerows(data)



    
          

            
    


        
       