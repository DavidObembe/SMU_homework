import datetime as dt
import numpy as np
import pandas as pd
import json

#My SQL Class I wrote
from sqlHelper import SQLHelper
from flask import Flask, jsonify

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

sqlHelper = SQLHelper()

#################################################
# Flask Routes
#################################################
#precipitation route
@app.route("/precipitation")
def getPrecipitation():
    data = sqlHelper.getPrecipitation()
    #convert to json string
    data = data.to_json(orient='records')
    #convert to list
    data = json.loads(data)
    #return jsonify
    return(jsonify(data))


@app.route("/stations")
def getAllStation():
    data = sqlHelper.getAllStation()
    #convert to json string
    data = data.to_json(orient='records')
    #convert to list
    data = json.loads(data)
    #return jsonify
    return(jsonify(data))

@app.route("/tobs")
def getMostActiveStation():
    data = sqlHelper.getMostActiveStation()
    #convert to json string
    data = data.to_json(orient='records')
    #convert to list
    data = json.loads(data)
    #return jsonify
    return(jsonify(data))


#homescreen app for listing all routes 
@app.route("/")
def home():
    return (
        f"Welcome to the Climate API!<br/>"

        f"""
        <ul>
            <li><a target="_blank" href='/precipitation'>Precipitation per day</a></li>
            <li><a target="_blank" href='/stations'>List of stations</a></li>
            <li><a target="_blank" href='/tobs'>Temperatures observed for the previous year</a></li>
            <li><a target="_blank" href='/<startDate>/<endDate>'>Temperatures within time range</a></li>
            
        </ul>
        """
    )



@app.route("/<startDate>/<endDate>")
def getfilter_by_date(startDate, endDate): #insert a variable
    data = sqlHelper.getfilter_by_date(startDate, endDate)
    #convert to json string
    data = data.to_json(orient='records')
    #convert to list
    data = json.loads(data)
    #return jsonify
    return(jsonify(data))




#################################################
# Flask Run
#################################################
if __name__ == "__main__":
    app.run(debug=True)