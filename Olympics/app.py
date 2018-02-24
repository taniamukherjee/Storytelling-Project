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
@app.route('/fetch_genders')
def fetch_genders():
    #get possible gender values
    gender_list = []
    response = session.query(distinct(medals.gender)).all()
    for gender in response:
        temp = gender
        gender_list.append(temp)
    
    #return response object
    return jsonify(gender_list)

#create route to return possible medal options for select menu
@app.route('/fetch_medals')
def fetch_medals():
    #get possible medal values
    medal_list = []
    response = session.query(distinct(medals.medal)).all()
    for medal in response:
        temp = medal
        medal_list.append(temp)
    
    #return response object
    return jsonify(medal_list)

@app.route('/fetch_sports')
def fetch_sports():
    #get possible sport values
    sport_list = []
    response = session.query(distinct(medals.sport)).all()
    for sport in response:
        temp = sport
        sport_list.append(sport)
    
    #return response object
    return jsonify(sport_list)

@app.route('/fetch_years')
def fetch_years():
    #get possible year values
    year_list = []
    response = session.query(distinct(medals.year)).all()
    for year in response:
        temp = year
        year_list.append(year)
    
    #return response object
    return jsonify(year_list)

@app.route('/fetch_countries')
def fetch_countries():
    #get possible gender values
    country_list = []
    response = session.query(distinct(medals.country)).order_by(medals.country).all()
    for country in response:
        temp = country
        country_list.append(country)
    
    #return response object
    return jsonify(country_list)

#create route to return data for charts
@app.route('/data_by_country_filtered/<gender>/<sport>/<demo_variable>')
def data_by_country(gender,sport,demo_variable):
    # get medal info

    #filter by medal type, gender, sport 
    #maybe in the future filter by event as well
    queries = []
    print(queries)
    if gender!='All':
        queries.append(medals.gender==gender)
    if sport!='All':
        queries.append(medals.sport==sport)
#    if event!='All':
#        queries.append(medals.event==event)

    #set up query list for each medal type

    #bronze
    queries_bronze = queries[:]
    queries_bronze.append(medals.medal=='bronze')
    
    #silver
    queries_silver = queries[:]
    queries_silver.append(medals.medal=='silver')
    
    #gold
    queries_gold = queries[:]
    queries_gold.append(medals.medal=='gold')

    #find number of bronze medals, silver medals, gold medals, all medals
    bronze_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries_bronze).group_by(medals.year).group_by(medals.country).all()
    silver_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries_silver).group_by(medals.year).group_by(medals.country).all()
    gold_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries_gold).group_by(medals.year).group_by(medals.country).all()
    all_medals_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries).group_by(medals.year).group_by(medals.country).all()

    num_bronze_object = {}
    #unpack list of tuples for number of bronze medals
    for row in bronze_query:
        year,country,num_bronze = row
        if country not in num_bronze_object.keys():
            num_bronze_object.update({country:{'year':[],'num_medals':[],'name':''}})
        num_bronze_object[country]['year'].append(year)
        num_bronze_object[country]['num_medals'].append(num_bronze)
        num_bronze_object[country]['name'] = country

    num_silver_object = {}
    #unpack list of tuples for number of silver medals
    for row in silver_query:
        year,country,num_silver = row
        if country not in num_silver_object.keys():
            num_silver_object.update({country:{'year':[],'num_medals':[]}})
        num_silver_object[country]['year'].append(year)
        num_silver_object[country]['num_medals'].append(num_silver)
        num_silver_object[country]['name'] = country

    num_gold_object = {}
    #unpack list of tuples for number of gold medals
    for row in gold_query:
        year,country,num_gold = row
        if country not in num_gold_object.keys():
            num_gold_object.update({country:{'year':[],'num_medals':[]}})
        num_gold_object[country]['year'].append(year)
        num_gold_object[country]['num_medals'].append(num_gold)
        num_gold_object[country]['name'] = country

    num_medals_object = {}
    #unpack list of tuples for number of medals
    for row in all_medals_query:
        year,country,num_medals = row
        if country not in num_medals_object.keys():
            num_medals_object.update({country:{'year':[],'num_medals':[]}})
        num_medals_object[country]['year'].append(year)
        num_medals_object[country]['num_medals'].append(num_medals)
        num_medals_object[country]['name'] = country


   #build response object
    response_object = {'bronze':num_bronze_object, 'silver':num_silver_object, 'gold':num_gold_object, 'All':num_medals_object}
    
    #return response object
    return jsonify(response_object)


#create route to return data for charts
@app.route('/stacked_bar_chart/<gender>/<sport>/<year>')
def stacked_bar_chart(gender,sport,year):
    # get medal info

    #filter by medal type, gender, sport 
    #maybe in the future filter by event as well
    queries = []
    print(queries)
    if gender!='All':
        queries.append(medals.gender==gender)
    if sport!='All':
        queries.append(medals.sport==sport)
    if year!='All':
        queries.append(medals.year==year)

    queries_bronze = queries[:]
    queries_bronze.append(medals.medal=='bronze')
    queries_silver = queries[:]
    queries_silver.append(medals.medal=='silver')
    queries_gold = queries[:]
    queries_gold.append(medals.medal=='gold')

    #find number of bronze medals, silver medals, gold medals, all medals
    bronze_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries_bronze).group_by(medals.country).all()
    silver_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries_silver).group_by(medals.country).all()
    gold_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries_gold).group_by(medals.country).all()
    all_medals_query = session.query(medals.year,medals.country,func.count(medals.id)).filter(*queries).group_by(medals.country).all()


    #set up query list for each medal type
    num_bronze_object = {}
    #unpack list of tuples for number of medals
    for row in bronze_query:
        year,country,num_medals = row
        if country not in num_bronze_object.keys():
            num_bronze_object.update({country:{'year':[],'num_medals':[],'name':'','medal_total':0}})
        num_bronze_object[country]['year'].append(year)
        num_bronze_object[country]['num_medals'].append(num_medals)
        num_bronze_object[country]['name'] = country
        num_bronze_object[country]['medal_total'] = num_medals
    #print(num_medals)
    
    num_silver_object = {}
    #unpack list of tuples for number of medals
    for row in silver_query:
        year,country,num_medals = row
        if country not in num_silver_object.keys():
            num_silver_object.update({country:{'year':[],'num_medals':[],'name':'','medal_total':0}})
        num_silver_object[country]['year'].append(year)
        num_silver_object[country]['num_medals'].append(num_medals)
        num_silver_object[country]['name'] = country
        num_silver_object[country]['medal_total'] = num_medals
            
    num_gold_object = {}
    #unpack list of tuples for number of medals
    for row in gold_query:
        year,country,num_medals = row
        if country not in num_gold_object.keys():
            num_gold_object.update({country:{'year':[],'num_medals':[],'name':'','medal_total':0}})
        num_gold_object[country]['year'].append(year)
        num_gold_object[country]['num_medals'].append(num_medals)
        num_gold_object[country]['name'] = country
        num_gold_object[country]['medal_total'] = num_medals

    num_medals_object = {}
    country_list = []
    #unpack list of tuples for number of medals
    for row in all_medals_query:
        year,country,num_medals = row
        if country not in num_medals_object.keys():
            num_medals_object.update({country:{'year':[],'num_medals':[],'name':'','medal_total':0}})
            country_list.append(country)
        num_medals_object[country]['year'].append(year)
        num_medals_object[country]['num_medals'].append(num_medals)
        num_medals_object[country]['medal_total'] = num_medals

    all_countries_list = num_medals_object.keys()
    bronze_list = []
    silver_list = []
    gold_list = []

    for country in all_countries_list:
        if country in num_bronze_object:
            bronze_list.append(num_bronze_object[country]['medal_total'])
        else:
            bronze_list.append(0)
        if country in num_silver_object:
            silver_list.append(num_silver_object[country]['medal_total'])
        else:
            silver_list.append(0)
        if country in num_gold_object:
            gold_list.append(num_gold_object[country]['medal_total'])
        else:
            gold_list.append(0)
        

   #build response object
    response_object = {'bronze':num_bronze_object, 'silver':num_silver_object, 'gold':num_gold_object, 'All':num_medals_object,'countries':country_list,'bronze_data':bronze_list,'silver_data':silver_list,'gold_data':gold_list}
    
    #return response object
    return jsonify(response_object)



# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

#create route that renders medal_page.html template
@app.route("/medal_page")
def medal_page():
    return render_template("medal_page.html")

#create route that renders map.html template
@app.route("/map")
def map():
    return render_template("map.html")

if __name__ == "__main__":
    app.run(debug=True)