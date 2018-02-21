import pandas as pd
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, distinct

from flask import(
    Flask,
    render_template,
    jsonify
)

# Database Setup
engine = create_engine("sqlite:///db/winter_olympics.sqlite")

# reflect existing database into new model
Base = automap_base()

# reflect tables
Base.prepare(engine, reflect=True)

# save reference to tables
medals = Base.classes.medals

# create session to query tables
session = Session(engine)

# create inspector to get column names
inspector = inspect(engine)
# Collect the names of tables within the database
print(inspector.get_table_names())

# Using the inspector to print the column names within the 'dow' table and its types
columns = inspector.get_columns('medals')
for column in columns:
    print(column["name"], column["type"])

app = Flask(__name__)

#create route to return possible gender options for select menu
@app.route('/genders')
def genders():
    #get possible gender values
    gender_list = []
    response = session.query(distinct(medals.gender)).all()
    for gender in response:
        temp = gender
        gender_list.append(temp)
    
    #return response object
    return jsonify(gender_list)

#create route to return possible medal options for select menu
@app.route('/medals')
def medals_route():
    #get possible gender values
    medal_list = []
    response = session.query(distinct(medals.medal)).all()
    for medal in response:
        temp = medal
        medal_list.append(temp)
    
    #return response object
    return jsonify(medal_list)

#create route to return data for charts
@app.route('/data_by_country_filtered/<gender>/<medal_type>')
def data_by_country(gender,medal_type):
    # get medal info

    #filter by medal type and gender
    if gender!='All' and medal_type!='All':
        number_of_sports_with_medals_won = session.query(medals.year,medals.country,func.count(distinct(medals.sport))).filter(medals.gender==gender).filter(medals.medal==medal_type).group_by(medals.year).group_by(medals.country).all() 
        number_of_medals_won = session.query(medals.year,medals.country,func.count(medals.sport)).group_by(medals.year).filter(medals.gender==gender).filter(medals.medal==medal_type).group_by(medals.country).all()

    #just filter by type of medal
    elif gender=='All' and medal_type!='All':
        number_of_sports_with_medals_won = session.query(medals.year,medals.country,func.count(distinct(medals.sport))).filter(medals.medal==medal_type).group_by(medals.year).group_by(medals.country).all() 
        number_of_medals_won = session.query(medals.year,medals.country,func.count(medals.sport)).group_by(medals.year).filter(medals.medal==medal_type).group_by(medals.country).all()

    #just filter by gender
    elif gender!='All' and medal_type=='All':
        number_of_sports_with_medals_won = session.query(medals.year,medals.country,func.count(distinct(medals.sport))).filter(medals.gender==gender).group_by(medals.year).group_by(medals.country).all() 
        number_of_medals_won = session.query(medals.year,medals.country,func.count(medals.sport)).group_by(medals.year).filter(medals.gender==gender).group_by(medals.country).all() 

    #no filter
    else:
        number_of_sports_with_medals_won = session.query(medals.year,medals.country,func.count(distinct(medals.sport))).group_by(medals.year).group_by(medals.country).all() 
        number_of_medals_won = session.query(medals.year,medals.country,func.count(medals.sport)).group_by(medals.year).group_by(medals.country).all() 
    
    num_sports_with_medal_object = {}
    #unpack list of tuples for number of sports with medals won
    for row in number_of_sports_with_medals_won:
        year,country,num_sports_with_medal = row
        if country not in num_sports_with_medal_object.keys():
            num_sports_with_medal_object.update({country:{'year':[],'num_sports_with_medal':[]}})
        num_sports_with_medal_object[country]['year'].append(year)
        num_sports_with_medal_object[country]['num_sports_with_medal'].append(num_sports_with_medal)

    num_medal_object = {}
    #unpack list of tuples for number of sports with medals won
    for row in number_of_medals_won:
        year,country,num_medals = row
        if country not in num_medal_object.keys():
            num_medal_object.update({country:{'year':[],'num_medals':[]}})
        num_medal_object[country]['year'].append(year)
        num_medal_object[country]['num_medals'].append(num_medals)


   #build response object
    response_object = {'number_of_sports_with_medals_won': num_sports_with_medal_object,'number_of_medals_won': num_medal_object}
    
    #return response object
    return jsonify(response_object)


# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)