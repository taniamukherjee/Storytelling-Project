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
    for (var i = 0; i < medalList.length; i++) {
        var $optionCumulativeLine = document.createElement("option");
        $optionCumulativeLine.value = medalList[i];
        $optionCumulativeLine.text = medalList[i];
        $medalSelectListCumulativeLine.appendChild($optionCumulativeLine);

        var $optionDemographicScatter = document.createElement("option");
        $optionDemographicScatter.value = medalList[i];
        $optionDemographicScatter.text = medalList[i];
        $medalSelectListDemographicScatter.appendChild($optionDemographicScatter);
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
    for (var i = 0; i < yearList.length; i++) {
        var $option = document.createElement("option");
        $option.value = yearList[i];
        $option.text = yearList[i];
        $yearSelectListStackedBar.appendChild($option);
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
demographicList = ['Population','GDP','Temperature'];
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
    $countrySelectListCumulativeLine1 = document.getElementById("countrySelectCumulativeLine1");
    $countrySelectListCumulativeLine2 = document.getElementById("countrySelectCumulativeLine2");
    for (var i = 0; i < countryList1.length; i++) {
        var $optionCumulativeLine1 = document.createElement("option");
        $optionCumulativeLine1.value = countryList1[i];
        $optionCumulativeLine1.text = countryList1[i];
        $countrySelectListCumulativeLine1.appendChild($optionCumulativeLine1);

        var $optionCumulativeLine2 = document.createElement("option");
        $optionCumulativeLine2.value = countryList2[i];
        $optionCumulativeLine2.text = countryList2[i];
        $countrySelectListCumulativeLine2.appendChild($optionCumulativeLine2);
    }
    optionChangedStackedBar();
    optionChangedComparisonCharts();
    optionChangedDemographicScatter();
});

buildHostCityMap();

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
    console.log(`Country 1: ${$countrySelectListCumulativeLine1.value}`);
    console.log(`Country 2: ${$countrySelectListCumulativeLine2.value}`);
    comparisonDataUrl = `/cumulative_line_plot/${$genderSelectListCumulativeLine.value}/${$sportSelectListCumulativeLine.value}/${$medalSelectListCumulativeLine.value}/${$countrySelectListCumulativeLine1.value}/${$countrySelectListCumulativeLine2.value}`;
    if ($countrySelectListCumulativeLine1.value==='Country 1' || $countrySelectListCumulativeLine2.value==='Country 2' || $countrySelectListCumulativeLine1.value===$countrySelectListCumulativeLine2.value){
        console.log("Please select two unique countries to compare!")
    }
    else{
        Plotly.d3.json(comparisonDataUrl, function (error, response) {
            if (error){
                console.log(error);
            }
            country1Medals = response.country1;
            country2Medals = response.country2;
            yearsToPlot = response.years;
            console.log(country1Medals);
            console.log(country2Medals);
            console.log(yearsToPlot);
    
        });
    }
}

function optionChangedDemographicScatter() {
    demographicUrl=`/demographic_scatter_plot/${$genderSelectListDemographicScatter.value}/${$sportSelectListDemographicScatter.value}/${$medalSelectListDemographicScatter.value}/${$yearSelectListDemographics.value}/${$demographicSelectList.value}`
    Plotly.d3.json(demographicUrl, function (error, response) {
        if (error){
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
    });
}

function buildHostCityMap() {

}