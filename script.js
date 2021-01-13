// API Testing


$("#search-button").on("click", function(event){
  event.preventDefault();
  
  var cityInput = $("#search-value").val();
  
  //function for calling main weather  
  searchWeather(cityInput);
  
  // function for calling forecast  
  seeForecast(cityInput);
  
});


//creating variables for existing html

var displayToday = $("#today")
//adding styling to displayToday Div
displayToday.attr("class", "displaytoday");

var forecastDays = $("#forecast");



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
      //uvToday = "7.9"; testing value
      console.log(uvToday);
      windFirstDay = $(".windDayOne");
      uvTodayH5 = $("<h5>");
      uvTodayH5.text("UV Rating: "+uvToday);
      windFirstDay.append(uvTodayH5);

      if(uvToday <="2"){
        uvTodayH5.addClass("greenUV");
      }else if(uvToday >="2.9" && uvToday < "6"){
        uvTodayH5.addClass("yellowUV");
      }else if(uvToday > "6.999" && uvToday < "8"){
        uvTodayH5.addClass("orangeUV");
      }else if(uvToday > "7.999" && uvToday < "9.999"){
        uvTodayH5.addClass("redUV");
      }



      

    });


      
    });
};


// function to see the forecast

function seeForecast(cityName){

  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=" + APIKey ;

  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(response){
    console.log(response)

    // variables for temperatures

    var temp1 = response.list[0].main.temp
    console.log(temp1);
    var temp2 = response.list[7].main.temp
    var temp3 = response.list[15].main.temp
    var temp4 = response.list[23].main.temp
    var temp5 = response.list[31].main.temp
    
    var humidity1 = response.list[0].main.humidity
    var humidity2 = response.list[7].main.humidity
    var humidity3 = response.list[15].main.humidity
    var humidity4 = response.list[23].main.humidity
    var humidity5 = response.list[31].main.humidity

    // times with moment

    var time = moment().format("MM"+"/"+"D"+"/"+"YY")
    console.log(time);
    var timeAddOne = moment().add(1, 'days').format("MM"+"/"+"D"+"/"+"YY");
    console.log(timeAddOne)
    var timeAddTwo = moment().add(2, 'days').format("MM"+"/"+"D"+"/"+"YY");
    var timeAddThree = moment().add(3, 'days').format("MM"+"/"+"D"+"/"+"YY");
    var timeAddFour = moment().add(4, 'days').format("MM"+"/"+"D"+"/"+"YY");
    var timeAddFive = moment().add(5, 'days').format("MM"+"/"+"D"+"/"+"YY");


    // weather icons

    var iconImage1 = response.list[0].weather[0].icon
    console.log(iconImage1);
    var iconImage2 = response.list[7].weather[0].icon
    var iconImage3 = response.list[15].weather[0].icon
    var iconImage4 = response.list[23].weather[0].icon
    var iconImage5 = response.list[31].weather[0].icon

    // Array of temperatures, humidities, times, and weather icons
  
    tempList = [temp1, temp2, temp3, temp4, temp5];

    humidityList = [humidity1, humidity2, humidity3, humidity4, humidity5];

    timeList = [timeAddOne,timeAddTwo,timeAddThree,timeAddFour,timeAddFive];

    weatherIcon = [iconImage1,iconImage2,iconImage3,iconImage4,iconImage5];

    



  });

  

};