import datetime as dt
import numpy as np
import pandas as pd
from sqlalchemy import create_engine


class SQLHelper():
    """This is a class called SQLHELPER. I init method connects to the hawaii sqlite engine and then each function connects to the database and brings back the required columns.
    """


    def __init__(self):
        self.connection_string = "sqlite:///Resources/hawaii.sqlite"
        self.engine = create_engine(self.connection_string)

    def getAllStation(self):
        query = f"""
                    SELECT
                        station,
                        name
                    FROM
                        station
                    
                """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    def getMostActiveStation(self):
        query = f"""
                select
                    station,
                    date,
                    tobs
                
                from 
                    measurement
                where 
                    date between '2016-08-23' and '2017-08-23' AND
                    station = 'USC00519281'
                """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df
    
    def getfilter_by_date(self, startDate, endDate):
        query= f'''
               SELECT 
                    min(tobs) as min_temperature,
                    max(tobs) as max_temperature,
                    avg(tobs) as avg_temperature,
                    date
               FROM
                    measurement
               WHERE
                   date>= '{startDate}' AND
                   date< '{endDate}'
                '''

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    def getPrecipitation(self):
        query = f"""
                select
                    date,
                    prcp    
                from 
                    measurement
                """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df


