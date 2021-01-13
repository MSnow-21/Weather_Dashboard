// API Testing

$("#search-button").on("click", function(event){
    event.preventDefault();

  
    var cityInput = $("#search-value").val();

    searchWeather(cityInput);
  
});


//creating variables for existing html

var displayToday = $("#today")
//adding styling to displayToday Div
displayToday.attr("class", "displaytoday");



// function for main weather display

function searchWeather(cityName){

 
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=" + APIKey ;
  
    $.ajax({
      url: weatherURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
  
      var name = response.name;
      var temp = response.main.temp;
      var humidity = response.main.humidity
      var windSpeed = response.wind.speed;

      // assigning longitude and latitude for function below

      latitude = response.coord.lat

      longitude = response.coord.lon

      // Date
      var m = moment().format("MM"+"/"+"D"+"/"+"YY")

      // variable for icon image
      var iconImage = response.weather[0].icon

      var nameH1 = $("<h1>")
      nameH1.text(name)
      var tempH3 = $("<h3>")
      tempH3.text("Temperature: " + temp + " degrees F")
      var humidityH3 = $("<h3>")
      humidityH3.text("Humidity: " + humidity +" %")
      var windspeedH3 = $("<h3>");
      windspeedH3.text("Windspeed: " + windSpeed + " mph")
      // adding attribute to windspeedH3 to see if other call can use it
      windspeedH3.attr("class", "windDayOne");
      //adding moment variable html
      var timeM = $("<h7>");
      timeM.text("("+m+")");
      //creating image variable html
      var imageOne = $("<img>");
      imageOne.attr("src", "http://openweathermap.org/img/wn/"+iconImage+"@2x.png")
      displayToday.empty(); //empties contents of div before new information is added
      displayToday.append(nameH1,tempH3,humidityH3,windspeedH3);
      nameH1.append(timeM);
      timeM.append(imageOne);


      // adding another query call to get the UV index information. need longitude and latitude from above

      var uvindexURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=hourly&units=imperial&appid=" + APIKey;
    
      $.ajax({
      url: uvindexURL,
      method: "GET"
      }).then(function(response){
      console.log(response);


      uvToday = response.current.uvi
      console.log(uvToday);
      //localStorage.setItem("uvItem", uvItem);
      windFirstDay = $(".windDayOne");
      uvTodayH5 = $("<h5>");
      uvTodayH5.text("UV Rating: "+uvToday);
      windFirstDay.append(uvTodayH5);

      

    });


      
    });
};