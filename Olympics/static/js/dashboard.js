//populate select element with possible gender values
gendersUrl = "/fetch_genders";
Plotly.d3.json(gendersUrl, function (error, response) {
    if (error) console.log(error);
    genderList = ['All'];
    for (var i=0;i<response.length;i++){
        genderList.push(response[i]);
    }
    console.log(genderList);
    $genderSelectList = document.getElementById("genderSelect");
    for (var i = 0; i < genderList.length; i++) {
        var $option = document.createElement("option");
        $option.value = genderList[i];
        $option.text = genderList[i];
        $genderSelectList.appendChild($option);
    }
});

//populate select element with possible medal values
medalsUrl = "/fetch_medals";
Plotly.d3.json(medalsUrl, function (error, response) {
    if (error) console.log(error);
    medalList = ['All'];
    for (var i=0;i<response.length;i++){
        medalList.push(response[i]);
    }
    console.log(medalList);
    $medalSelectList = document.getElementById("medalSelect");
    for (var i = 0; i < medalList.length; i++) {
        var $option = document.createElement("option");
        $option.value = medalList[i];
        $option.text = medalList[i];
        $medalSelectList.appendChild($option);
    }
});

//populate select element with possible sport values
sportsUrl = "/fetch_sports";
Plotly.d3.json(sportsUrl, function (error, response) {
    if (error) console.log(error);
    sportList = ['All'];
    for (var i=0;i<response.length;i++){
        sportList.push(response[i]);
    }
    console.log(sportList);
    $sportSelectList = document.getElementById("sportSelect");
    for (var i = 0; i < sportList.length; i++) {
        var $option = document.createElement("option");
        $option.value = sportList[i];
        $option.text = sportList[i];
        $sportSelectList.appendChild($option);
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
    yearList = ['All'];
    for (var i=0;i<response.length;i++){
        yearList.push(response[i]);
    }
    console.log(yearList);
    $yearSelectList = document.getElementById("yearSelect");
    for (var i = 0; i < yearList.length; i++) {
        var $option = document.createElement("option");
        $option.value = yearList[i];
        $option.text = yearList[i];
        $yearSelectList.appendChild($option);
    }
});

//populate select element with possible country values
countriesUrl = "/fetch_countries";
Plotly.d3.json(countriesUrl, function (error, response) {
    if (error) console.log(error);
    countryList = ['All'];
    for (var i=0;i<response.length;i++){
        countryList.push(response[i]);
    }
    console.log(countryList);
    $countrySelectList = document.getElementById("countrySelect");
    for (var i = 0; i < countryList.length; i++) {
        var $option = document.createElement("option");
        $option.value = countryList[i];
        $option.text = countryList[i];
        $countrySelectList.appendChild($option);
    }
    optionChanged();
});

function optionChanged() {
//    buildStackedBar()
//    buildComparisonLineChart()
    //get medal data
    medalDataUrl = `/stacked_bar_chart/${$genderSelectList.value}/${$sportSelectList.value}/${$yearSelectList.value}`;
    Plotly.d3.json(medalDataUrl, function (error, response) {
        countriesToPlot = response.countries;
        bronzeData = response.bronze_data;
        silverData = response.silver_data;
        goldData = response.gold_data;

        var bronzeTrace = {
            x: countriesToPlot,
            y: bronzeData,
            name: 'bronze',
            type: 'bar'
          };

        var silverTrace = {
            x: countriesToPlot,
            y: silverData,
            name: 'silver',
            type: 'bar'
          };

          var goldTrace = {
            x: countriesToPlot,
            y: goldData,
            name: 'gold',
            type: 'bar'
          };

        var data = [bronzeTrace,silverTrace,goldTrace];
        var layout = {barmode: 'stack'};
        Plotly.newPlot('stackedBar', data, layout);
    });
}