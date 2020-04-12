#import the file
import csv
from statistics import mean

csvpath = r"PyBank\Resources\budget_data.csv"

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',', )

    num_rows= 0
    #skip header
    csv_header = next(csvreader)
    #change rows into integer
    total=0

    total_b2=0
    
    sum_rows= 0
    profit= 0
    
    def show_next(profit,next_row):
        



    

    #this counts the number o
    for rows  in csvreader:
       #this counts number of rows
        num_rows+=1

        #rhis sums up the profit/loss
        total+= int(rows[1])
        #avg= total/len(rows)

    
##################################### 
    
        profit= int(rows[1])
        next_row= next(csvreader)[1]
        
        print(f"current row:{profit} and next row is {next_row}")
        profit=int(rows[1])
        #profit= int(rows)
        #sum_rows= int(rows[1])+ next_row
        #print(f"sum of row a and b is{sum_rows}")
        #sum_rows=0

        

        
    print(f"Total months:{num_rows}")

    print(f"total profit: {total}")

    
    #print (avg)



#the average of the changes in profit/loss over the entire period




    
    



#calculate net total amount of "profit/losses" over the entire period






