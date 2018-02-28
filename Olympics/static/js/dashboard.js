// Create a map object
var myMap = L.map("map", {
    center: [37.09, 0],
    zoom: 2
});


// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mraigosa/cje1m3khj0ex72so7bju99x0z/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoibXJhaWdvc2EiLCJhIjoiY2plMWw0YjVyNmRmZjJ4cDBmcWMzdmVpZSJ9.YkLtlmRv2I7ziqzFHAykZw"
    //L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    //  "access_token=pk.eyJ1IjoibXJhaWdvc2EiLCJhIjoiY2plMWw0YjVyNmRmZjJ4cDBmcWMzdmVpZSJ9.YkLtlmRv2I7ziqzFHAykZw" +
    //  "T6YbdDixkOBWH_k9GbS8JQ"
).addTo(myMap);

// An array containing each city's name, location, and population
var cities = [{
    location: [45.9237, 6.8694],
    name: "Chamonix, France",
    year: "1924",
    gold: "N/A"
},
{
    location: [46.4908, 9.8355],
    name: "St. Mortiz, Switzerland",
    year: "1928",
    gold: "+0%"
},
{
    location: [44.2795, -73.9799],
    name: "Lake Placid, USA",
    year: "1932",
    gold: "+300%"
},
{
    location: [47.4917, 11.0955],
    name: "Garmisch-Partenkirchen, Germany",
    year: "1936",
    gold: "+0%"
},
{
    location: [46.4908, 9.8355],
    name: "St. Moritz, Switzerland",
    year: "1948",
    gold: "+133%"
},
{
    location: [59.9139, 10.7522],
    name: "Oslo, Norway",
    year: "1952",
    gold: "+49%"
},
{
    location: [46.5405, 12.1357],
    name: "Cortina D Ampezzo",
    year: "1956",
    gold: "+167%"
},
{
    location: [39.197, -120.2357],
    name: "Squaw Valley, USA",
    year: "1960",
    gold: "+29%"
},
{
    location: [47.2692, 11.4041],
    name: "Innsbruck, Austria",
    year: "1964",
    gold: "+70%"
},
{
    location: [45.1885, 5.7245],
    name: "Grenoble, France",
    year: "1968",
    gold: "+120%"
},
{
    location: [43.0621, 141.3544],
    name: "Sapporo, Japan",
    year: "1972",
    gold: "+100%"
},
{
    location: [47.2692, 11.4041],
    name: "Innsbruck, Austria",
    year: "1976",
    gold: "+22%"
},
{
    location: [44.2795, -73.9799],
    name: "Lake Placid, USA",
    year: "1980",
    gold: "+36%"
},
{
    location: [43.8563, 18.4131],
    name: "Sarejevo, Yugoslavia",
    year: "1984",
    gold: "+100%"
},
{
    location: [51.0486, -114.0708],
    name: "Calgary, Canada",
    year: "1988",
    gold: "+0%"
},
{
    location: [45.6755, 6.3927],
    name: "Albertville, France",
    year: "1992",
    gold: "+44%"
},
{
    location: [61.1153, 10.4662],
    name: "Lilehammer, Norway",
    year: "1994",
    gold: "+28%"
},
{
    location: [36.077961, 138.065536],
    name: "Nagano, Japan",
    year: "1998",
    gold: "+800%"
},
{
    location: [40.760779, -111.891047],
    name: "Salt Lake City, USA",
    year: "2002",
    gold: "+38%"
},
{
    location: [45.0703, 7.6869],
    name: "Torino, Italy",
    year: "2006",
    gold: "+51%"
},
{
    location: [49.2827, -123.1207],
    name: "Vancouver, Canada",
    year: "2010",
    gold: "+118%"
},
{
    location: [43.6028, 39.7341],
    name: "Sochi, Russia",
    year: "2014",
    gold: "+208%"
}
];


// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    L.marker(city.location)
        //    .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Year: " + city.year + "</h3>")
        .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Year: " + city.year + "</h3> <h3>Gold Medal Increase: " + city.gold + "</h3>")
        .addTo(myMap);
}


//populate select element with possible gender values
gendersUrl = "/fetch_genders";
Plotly.d3.json(gendersUrl, function (error, response) {
    if (error) console.log(error);
    genderList = ['All Genders'];
    for (var i = 0; i < response.length; i++) {
        genderList.push(response[i]);
    }
    //console.log(genderList);
    $genderSelectListStackedBar = document.getElementById("genderSelectStackedBar");
    $genderSelectListCumulativeLine = document.getElementById("genderSelectCumulativeLine");
    $genderSelectListDemographicScatter = document.getElementById("genderSelectDemographicScatter");
    $genderSelectListComparisonPie = document.getElementById("genderSelectComparisonPie");
    for (var i = 0; i < genderList.length; i++) {
        var $optionStackedBar = document.createElement("option");
        $optionStackedBar.value = genderList[i];
        $optionStackedBar.text = genderList[i];
        $genderSelectListStackedBar.appendChild($optionStackedBar);

        var $optionCumulativeLine = document.createElement("option");
        $optionCumulativeLine.value = genderList[i];
        $optionCumulativeLine.text = genderList[i];
        $genderSelectListCumulativeLine.appendChild($optionCumulativeLine);

        var $optionDemographicScatter = document.createElement("option");
        $optionDemographicScatter.value = genderList[i];
        $optionDemographicScatter.text = genderList[i];
        $genderSelectListDemographicScatter.appendChild($optionDemographicScatter);

        var $optionComparisonPie = document.createElement("option");
        $optionComparisonPie.value = genderList[i];
        $optionComparisonPie.text = genderList[i];
        $genderSelectListComparisonPie.appendChild($optionComparisonPie);
    }
});

//populate select element with possible medal values
medalsUrl = "/fetch_medals";
Plotly.d3.json(medalsUrl, function (error, response) {
    if (error) console.log(error);
    medalList = ['All Medal Types'];
    for (var i = 0; i < response.length; i++) {
        medalList.push(response[i]);
    }
    //console.log(medalList);
    $medalSelectListCumulativeLine = document.getElementById("medalSelectCumulativeLine");
    $medalSelectListDemographicScatter = document.getElementById("medalSelectDemographicScatter");
    $medalSelectListComparisonPie = document.getElementById("medalSelectComparisonPie");
    for (var i = 0; i < medalList.length; i++) {
        var $optionCumulativeLine = document.createElement("option");
        $optionCumulativeLine.value = medalList[i];
        $optionCumulativeLine.text = medalList[i];
        $medalSelectListCumulativeLine.appendChild($optionCumulativeLine);

        var $optionDemographicScatter = document.createElement("option");
        $optionDemographicScatter.value = medalList[i];
        $optionDemographicScatter.text = medalList[i];
        $medalSelectListDemographicScatter.appendChild($optionDemographicScatter);

        var $optionComparisonPie = document.createElement("option");
        $optionComparisonPie.value = medalList[i];
        $optionComparisonPie.text = medalList[i];
        $medalSelectListComparisonPie.appendChild($optionComparisonPie);
    }
});

//populate select element with possible sport values
sportsUrl = "/fetch_sports";
Plotly.d3.json(sportsUrl, function (error, response) {
    if (error) console.log(error);
    sportList = ['All Sports'];
    for (var i = 0; i < response.length; i++) {
        sportList.push(response[i]);
    }
    //console.log(sportList);
    $sportSelectListStackedBar = document.getElementById("sportSelectStackedBar");
    $sportSelectListCumulativeLine = document.getElementById("sportSelectCumulativeLine");
    $sportSelectListDemographicScatter = document.getElementById("sportSelectDemographicScatter");
    for (var i = 0; i < sportList.length; i++) {
        var $optionStackedBar = document.createElement("option");
        $optionStackedBar.value = sportList[i];
        $optionStackedBar.text = sportList[i];
        $sportSelectListStackedBar.appendChild($optionStackedBar);

        var $optionCumulativeLine = document.createElement("option");
        $optionCumulativeLine.value = sportList[i];
        $optionCumulativeLine.text = sportList[i];
        $sportSelectListCumulativeLine.appendChild($optionCumulativeLine);

        var $optionDemographicScatter = document.createElement("option");
        $optionDemographicScatter.value = sportList[i];
        $optionDemographicScatter.text = sportList[i];
        $sportSelectListDemographicScatter.appendChild($optionDemographicScatter);
    }
});

/* //populate select element with possible event values
//i am going to wait to implement this until i have the other pieces working
//if a sport is selected these will only include events for that sport
eventsUrl = `/fetch_events/${sportSelectList.value}`;
Plotly.d3.json(eventsUrl, function (error, response) {
    if (error) console.log(error);
    eventList = ['All'];
    for (var i=0;i<response.length;i++){
        eventList.push(response[i]);
    }
    console.log(eventList);
    $eventSelectList = document.getElementById("eventSelect");
    for (var i = 0; i < eventList.length; i++) {
        var $option = document.createElement("option");
        $option.value = eventList[i];
        $option.text = eventList[i];
        $eventSelectList.appendChild($option);
    }
}); */

//populate select element with possible year values
//i think this would be cooler as a slider but haven't figured out how to use that library yet....
yearsUrl = "/fetch_years";
Plotly.d3.json(yearsUrl, function (error, response) {
    if (error) console.log(error);
    yearList = ['All Years'];
    for (var i = 0; i < response.length; i++) {
        yearList.push(response[i]);
    }
    //console.log(yearList);
    $yearSelectListStackedBar = document.getElementById("yearSelectStackedBar");
    $yearSelectListComparisonPie = document.getElementById("yearSelectComparisonPie");
    for (var i = 0; i < yearList.length; i++) {
        var $optionStackedBar = document.createElement("option");
        $optionStackedBar.value = yearList[i];
        $optionStackedBar.text = yearList[i];
        $yearSelectListStackedBar.appendChild($optionStackedBar);

        var $optionComparisonPie = document.createElement("option");
        $optionComparisonPie.value = yearList[i];
        $optionComparisonPie.text = yearList[i];
        $yearSelectListComparisonPie.appendChild($optionComparisonPie);
    }
});

yearsUrl = "/fetch_years_demographics"
Plotly.d3.json(yearsUrl, function (error, response) {
    if (error) console.log(error);
    yearList = ['All Years'];
    for (var i = 0; i < response.length; i++) {
        yearList.push(response[i]);
    }
    console.log("Year List:")
    console.log(yearList);
    $yearSelectListDemographics = document.getElementById("yearSelectDemographicScatter");
    for (var i = 0; i < yearList.length; i++) {
        var $option = document.createElement("option");
        $option.value = yearList[i];
        $option.text = yearList[i];
        $yearSelectListDemographics.appendChild($option);
    }
});

//build demographic select list
demographicList = ['Population', 'GDP', 'Temperature'];
//console.log(demographicList);
$demographicSelectList = document.getElementById("demographicSelect");
for (var i = 0; i < demographicList.length; i++) {
    var $option = document.createElement("option");
    $option.value = demographicList[i];
    $option.text = demographicList[i];
    $demographicSelectList.appendChild($option);
}

//populate select element with possible country values
countriesUrl = "/fetch_countries";
Plotly.d3.json(countriesUrl, function (error, response) {
    if (error) console.log(error);
    countryList1 = ['Country 1'];
    countryList2 = ['Country 2'];
    for (var i = 0; i < response.length; i++) {
        countryList1.push(response[i]);
        countryList2.push(response[i]);
    }
    //console.log(countryList1);
    //console.log(countryList2);
    $countrySelectListComparisonPlots1 = document.getElementById("countrySelectComparisonPlots1");
    $countrySelectListComparisonPlots2 = document.getElementById("countrySelectComparisonPlots2");
    for (var i = 0; i < countryList1.length; i++) {
        var $optionComparisonPlots1 = document.createElement("option");
        $optionComparisonPlots1.value = countryList1[i];
        $optionComparisonPlots1.text = countryList1[i];
        $countrySelectListComparisonPlots1.appendChild($optionComparisonPlots1);

        var $optionComparisonPlots2 = document.createElement("option");
        $optionComparisonPlots2.value = countryList2[i];
        $optionComparisonPlots2.text = countryList2[i];
        $countrySelectListComparisonPlots2.appendChild($optionComparisonPlots2);
    }
    optionChangedStackedBar();
    optionChangedComparisonCharts();
    optionChangedDemographicScatter();
});

function optionChangedStackedBar() {
    //set url for flask route using select objects
    medalDataUrl = `/stacked_bar_chart/${$genderSelectListStackedBar.value}/${$sportSelectListStackedBar.value}/${$yearSelectListStackedBar.value}`;

    //get info from flask route
    Plotly.d3.json(medalDataUrl, function (error, response) {

        //get data from response object
        countriesToPlot = response.countries;
        bronzeData = response.bronze_data;
        silverData = response.silver_data;
        goldData = response.gold_data;

        //set up data traces
        var bronzeTrace = {
            x: countriesToPlot,
            y: bronzeData,
            name: 'bronze',
            type: 'bar',
            marker: {
                color: 'rgb(205, 127, 50)'
            }
        };

        var silverTrace = {
            x: countriesToPlot,
            y: silverData,
            name: 'silver',
            type: 'bar',
            marker: {
                color: 'rgb(192,192,192)'
            }
        };

        var goldTrace = {
            x: countriesToPlot,
            y: goldData,
            name: 'gold',
            type: 'bar',
            marker: {
                color: 'rgb(255,215,0)'
            }
        };

        //put traces into data array
        var data = [bronzeTrace, silverTrace, goldTrace];

        //set layout for chart
        var layout = {
            barmode: 'stack',
            xaxis: {
                title: 'Country',
                tickangle: -45
            },
            yaxis: {
                title: 'Number of Medals Won'
            },
            title: 'Number of Medals Won per Country'
        };

        //create plot
        Plotly.newPlot('stackedBar', data, layout);
    });
}

function optionChangedComparisonCharts() {
    console.log(`Gender: ${$genderSelectListCumulativeLine.value}`);
    console.log(`Medal Type: ${$medalSelectListCumulativeLine.value}`);
    console.log(`Sport: ${$sportSelectListCumulativeLine.value}`);
    console.log(`Country 1: ${$countrySelectListComparisonPlots1.value}`);
    console.log(`Country 2: ${$countrySelectListComparisonPlots2.value}`);
    cumulativeLineUrl = `/cumulative_line_plot/${$genderSelectListCumulativeLine.value}/${$sportSelectListCumulativeLine.value}/${$medalSelectListCumulativeLine.value}/${$countrySelectListComparisonPlots1.value}/${$countrySelectListComparisonPlots2.value}`;
    cumulativePieUrl = `/comparison_pie_plot/${$genderSelectListComparisonPie.value}/${$yearSelectListComparisonPie.value}/${$medalSelectListComparisonPie.value}/${$countrySelectListComparisonPlots1.value}/${$countrySelectListComparisonPlots2.value}`;
    if ($countrySelectListComparisonPlots1.value === 'Country 1' || $countrySelectListComparisonPlots2.value === 'Country 2' || $countrySelectListComparisonPlots1.value === $countrySelectListComparisonPlots2.value) {
        console.log("Please select two unique countries to compare!")
    }
    else {
        Plotly.d3.json(cumulativeLineUrl, function (error, response) {
            if (error) {
                console.log(error);
            }
            country1Medals = response.country1;
            country2Medals = response.country2;
            yearsToPlot = response.years;
            country1_select = $countrySelectListComparisonPlots1.value;
            country2_select = $countrySelectListComparisonPlots2.value;
            console.log(country1Medals);
            console.log(country2Medals);
            console.log(yearsToPlot);

            //plotly line graph

            var cum_country1 = {
                x: yearsToPlot,
                y: country1Medals,
                mode: 'line',
                name: country1_select
            };
            //from second filter dropdown
            var cum_country2 = {
                x: yearsToPlot,
                y: country2Medals,
                mode: 'line',
                name: country2_select
            };

            var data = [cum_country1, cum_country2];

            Plotly.newPlot('countryComparisonPlot', data);

        });

        Plotly.d3.json(cumulativePieUrl, function (error, response) {
            if (error) {
                console.log(error);
            }
            country1Medals = response.country1;
            country2Medals = response.country2;
            sportsToPlot = response.sports;
            console.log(country1Medals);
            console.log(country2Medals);
            console.log(sportsToPlot);
            // PieChart    
            var country1_pie = [{
                values: country1Medals,
                labels: sportsToPlot,
                type: 'pie'

            }];

            var layout = {
                height: 400,
                width: 500
            };

            var country2_pie = [{
                values: country2Medals,
                labels: sportsToPlot,
                type: 'pie'
            }];

            var layout = {
                height: 400,
                width: 500
            };

            Plotly.newPlot('countryComparisonPie1', country1_pie, layout);
            Plotly.newPlot('countryComparisonPie2', country2_pie, layout);
        });
    }

}

function optionChangedDemographicScatter() {
    demographicUrl = `/demographic_scatter_plot/${$genderSelectListDemographicScatter.value}/${$sportSelectListDemographicScatter.value}/${$medalSelectListDemographicScatter.value}/${$yearSelectListDemographics.value}/${$demographicSelectList.value}`
    Plotly.d3.json(demographicUrl, function (error, response) {
        if (error) {
            console.log(error);
        }
        medalCount = response.medal_list;
        demographicValues = response.demographic_list;
        countryList = response.country_list
        year = $yearSelectListDemographics.value
        console.log(medalCount);
        console.log(demographicValues);
        console.log(countryList);
        console.log(year);
        var trace1 = {
            x: demographicValues,
            y: medalCount,
            mode: 'markers',
            type: 'scatter',
            name: 'country vs medels',
            text: countryList,
            marker: { size: 12 }
        };
        var data = [trace1];

        if ($demographicSelectList.value == 'Population') {
            var layout = {
                xaxis: {
                    type: 'log',
                    autorange: true
                },
                title: 'Medal Count vs. Population'
            };
        }
        else if ($demographicSelectList.value == 'GDP (USD)') {
            var layout = {
                xaxis: {
                    type: 'log',
                    autorange: true
                },
                title: 'Medal Count vs.GDP'
            };
        }
        else if ($demographicSelectList.value == 'Temperature (Degrees Celsius)') {
            var layout = {
                title: 'Medal Count vs.Temperature'
            }
        }
        Plotly.newPlot('demographicScatterPlot', data, layout);
    });
}