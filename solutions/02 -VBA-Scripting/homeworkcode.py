Sub vbastock()
' declare the variables
Dim ticker As String
Dim yearlychange As Double
Dim percentchange As Double
Dim totstockvol As Long
Dim lastrow As Long
Dim summarytabindex As Integer
Dim counter As Integer
Dim i As Long

'give titles to columns
Cells(1, 9).Value = "ticker"
Cells(1, 10).Value = "yearly Change"
Cells(1, 11).Value = "Percent change"
Cells(1, 12).Value = "Total Stock Volume"



'declare current as worksheet object variable
Dim current As Worksheet
For Each current In Worksheets


 lastrow = Range("A" & Rows.Count).End(xlUp).Row
 totalstockvol = 0
 summarytabindex = 2
 ticker = Cells(2, 1).Value

'loop through rows in ticker column
For i = 2 To lastrow

'use if statement to ensure that i stops at the row before last row-this is the lookforward
If i <> lastrow Then

'use another if statement to ensure that the next row is not the same as i
    If Cells(i + 1, 1).Value <> ticker Then
'test and see if this equation works by msgboxing
'MsgBox (Cells(i, 1).Value & "and then" & Cells(i + 1, 1).Value)

'output in summary table if they are different
'totalstockvol is added up
    totalstockvol = totalstockvol + Cells(i, 7).Value
'place ticker name in summarytable
    Cells(summarytabindex, 9).Value = ticker
'place totalstockvol in cells (summarytabindex,12)
    Cells(summarytabindex, 12).Value = totalstockvol
'reset totalstockvol
    totalstockvol = 0
    ticker = Cells(i + 1, 1).Value
'move cell row in summary table, down by 1
 summarytabindex = summarytabindex + 1
    

 
'elseif it is the same?
    Else:
    totalstockvol = totalstockvol + Cells(i, 7).Value

    End If
Else:
'found the last row of data
'totalstockvol is added up
    totalstockvol = totalstockvol + Cells(i, 7).Value
'place ticker name in summarytable
    Cells(summarytabindex, 9).Value = ticker
'place totalstockvol in cells (summarytabindex,12)
    Cells(summarytabindex, 12).Value = totalstockvol
'reset totalstockvol
    totalstockvol = 0
    ticker = Cells(i + 1, 1).Value
'move cell row in summary table, down by 1
 summarytabindex = summarytabindex + 1
End If



Next i
'end of current in worksheets
Next

End Sub

Sub yearly_change()

'dim variables
Dim ticker As String
Dim yearlychange As Double
Dim percentchange As Double
Dim totstockvol As Long
Dim lastrow As Long
Dim summarytabindex As Long
Dim counter As Integer
Dim i As Long
Dim startprice As Double
Dim endprice As Double
Dim j As Long

'declare current as worksheet object variable
Dim current As Worksheet
For Each current In Worksheets



'capture lastrow of data set
 lastrow = Range("A" & Rows.Count).End(xlUp).Row
'create a variable that holds the opening price at the beginning of year
startprice = Cells(2, 3).Value
'create a varriable that holds the end price at year end
endprice = Cells(2, 6).Value



 summarytabindex = 2
 ticker = Cells(2, 1).Value

'create a for loop
For i = 2 To lastrow

'use if statement to ensure that i stops at the row before last row-this is the lookforward
    If i <> lastrow Then
    
'use another if statement to ensure that the next row is not the same as i
        If Cells(i + 1, 1).Value <> ticker Then
        
        'change endprice to mean price at i
        'endprice = Cells(i, 6).Value
        
        'what happens if they are different?
        ' yearly change= endprice- startprice
        yearlychange = endprice - startprice
        'percent change = yearlychange/100
        percentchange = yearlychange / 100
        ' yearly change and percentage are placed in summary table index
        Cells(summarytabindex, 10).Value = yearlychange
        Cells(summarytabindex, 11).Value = percentchange
        'reset year change
        startprice = Cells(i + 1, 3).Value
        ticker = Cells(i + 1, 1).Value
        
        
        'move cell in summary table down
        summarytabindex = summarytabindex + 1
        
        Else:
        'if next row is the same as current row
        startprice = startprice
        endprice = Cells(i, 6).Value
        
        End If
    Else:
    'found the last row of data
    'yearly change= endprice- startprice
    yearlychange = endprice - startprice
    'percent change = yearlychange/100
    percentchange = yearlychange / 100
    ' yearly change and percentage are placed in summary table index
    Cells(summarytabindex, 10).Value = yearlychange
    Cells(summarytabindex, 11).Value = percentchange
    'reset year change
    startprice = Cells(i + 1, 1).Value
    ticker = Cells(i + 1, 1).Value
    
    'move cell in summary table down
    summarytabindex = summarytabindex + 1
    
    End If
Next i



'adding color to column 10
For j = 2 To summarytabindex

'create a loop to change color of cells above 0
    If Cells(j, 10).Value > 0 Then
    Cells(j, 10).Interior.ColorIndex = 4
    Else:
    Cells(j, 10).Interior.ColorIndex = 3
    End If
Next j

'end of current in worksheets
Next

'######################################################################################
'last section- finding the greatest percentage increase, decrease and total volume

 Dim pMin As Double
 Dim vMax As Double
 Dim pMax As Double
 Dim tickerpmax As String
 Dim tickerpmin As String
 Dim tickervmax As String
 
 
 Cells(2, 15).Value = "greatest % increase"
 Cells(3, 15).Value = "greatest % decrease"
 Cells(4, 15).Value = "greatest total volume"
 Cells(1, 16).Value = "ticker"
 Cells(1, 17).Value = "value"
 
 
 pMin = Application.WorksheetFunction.Min(Columns("k"))
 pMax = Application.WorksheetFunction.Max(Columns("k"))
 vMax = Application.WorksheetFunction.Max(Columns("L"))
 
 tickerpmax = Cells(2, 16).Value
 tickerpmin = Cells(3, 16).Value
 tickervmax = Cells(4, 16).Value
 Cells(2, 17).Value = pMax
 Cells(3, 17).Value = pMin
 Cells(4, 17).Value = vMax
 
 For j = 2 To summarytabindex
 If Cells(j, 11) = pMax Then
 Cells(2, 16).Value = Cells(j, 9).Value
 
 ElseIf Cells(j, 11) = pMin Then
 Cells(3, 16).Value = Cells(j, 9).Value
 
 ElseIf Cells(j, 12) = vMax Then
Cells(4, 16).Value = Cells(j, 9).Value
 End If
 Next j
 
 

End Sub


