from flask import Flask, render_template, redirect
import scrape_mars
import datetime
from flask_pymongo import PyMongo


app = Flask(__name__)

#created a mongo connection
    #conn = 'mongodb://localhost:27017'
    #mongo = PyMongo(app)
#app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_db"
#mongo = PyMongo(app)

mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_db")

@app.route('/')
def home_page():
    mars = mongo.db.mars.find_one({"active": 1})
    return render_template("index2.html", mars= mars)




@app.route('/scrape')
def scrape():
    mars_db = mongo.db.mars
# Run the scrape function
    
    mars = scrape_mars.scrapify()

    mars_db.update_many(
        {'active':1},
        {"$set": {'active': 0}
        }
    )

    mars_db.insert_one(mars)

    # Redirect back to home page
    return redirect("/")

if __name__ == "__main__":
    app.run()
