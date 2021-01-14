
var APIKey = "3d9641eee0c651fc79dbda5c2f33989f";

//console.log(APIKey);

// document ready function that looks in local storage
// produces buttons on aside html

$(document).ready(function(){
  let citiesArray = localStorage.getItem("citiesArray");
  if (citiesArray === null ){
    localStorage.setItem("citiesArray", JSON.stringify([]));
  }else{
    drawCitiesButtons(citiesArray);
  }
});

//creates the buttons on the aside

function drawCitiesButtons(citiesString){
  const citiesArray = JSON.parse(citiesString);
  $("#historyButtons").empty();
  citiesArray.forEach(city=>{
    const button = $("<button>");
    button.text(city);
    button.addClass("savedCityButtons") // adds a class so a function can click on class
    $("#historyButtons").append(button);
    $(".savedCityButtons").on("click",function(){
      var buttonCityText = $(this).text(); //assigning variable for text of button class clicked
      searchWeather(buttonCityText); // calling function with button text entered

      seeForecast(buttonCityText); // calling function with button text entered


    })
       
    

  })
  // iterate over cities array
  // create a button for each of them.
  // append it to the page
}


// function for adding city to local storage.

function addCityToLocalStorage(city){
  const oldList = JSON.parse(localStorage.getItem("citiesArray"))
  const newList = JSON.stringify(oldList.concat([city]))
  localStorage.setItem("citiesArray", newList)
}

// search button click event that calls functions

$("#search-button").on("click", function(event){
  event.preventDefault();

  var cityInput = $("#search-value").val();

  //calls searchWeather function
  searchWeather(cityInput);

  //calls seeForecast function
  seeForecast(cityInput);

  //calls addingCities function
  //addingCities(cityInput);

  addCityToLocalStorage(cityInput);

  drawCitiesButtons(localStorage.getItem("citiesArray"));


});


// variables for divs on existing html

var displayToday = $("#today")
// adding attributes for css on displaytoday
displayToday.attr("class","displaytoday")

var forecastDays = $("#forecast")

var cityList = $(".list-group history")



// function for finding weather on displayToday Div

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
    // adding moment to ajax
    var m = moment().format("MM"+"/"+"D"+"/"+"YY")

    //adding icon
    var iconImage = response.weather[0].icon
    //console.log(iconImage);

    //trying to get longitude and latitude

    latitude = response.coord.lat
    //localStorage.setItem("latitude", latitude);
    //console.log(latitude);
    longitude = response.coord.lon

    //var uvToday = localStorage.getItem("uv");    

    var nameH1 = $("<h1>")
    nameH1.text(name)
    var tempH3 = $("<h3>")
    tempH3.text("Temperature: " + temp + " degrees F")
    var humidityH3 = $("<h3>")
    humidityH3.text("Humidity: " + humidity +" %")
    var windspeedH3 = $("<h3>");
    windspeedH3.text("Windspeed: " + windSpeed + " mph")
    //adding attribute for windspeed to see if other function can use it in jquery
    windspeedH3.attr("class", "windDayOne")
    //adding moment variable
    var timeM = $("<h7>");
    timeM.text("("+m+")");
    //creating image variable
    var imageOne = $("<img>");
    imageOne.attr("src", "http://openweathermap.org/img/wn/"+iconImage+"@2x.png")
    //creating variable for uvrating - not working at beginning of program
    //var uvH5 = $("<h3>");
    //uvH5.text("UV Index: "+uvToday);
    displayToday.empty();
    displayToday.append(nameH1,tempH3,humidityH3,windspeedH3);
    nameH1.append(timeM);
    timeM.append(imageOne);


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



// function to create forecast

function seeForecast(cityName){

  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=" + APIKey ;

  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(response){
    //console.log(forecastURL)
    console.log(response)

    //displaying heading five-day forecast
    var headingFive = $("<h2>");
    headingFive.text("5-Day Forecast:");
    forecastDays.append(headingFive);

    var fiveDayDiv = $("<div>");
    fiveDayDiv.attr("class", "container");
    headingFive.append(fiveDayDiv);    

    var addingDiv = $("<div>")
    addingDiv.attr("class","row");
    fiveDayDiv.append(addingDiv);


    var temp1 = response.list[0].main.temp
    var temp2 = response.list[7].main.temp
    var temp3 = response.list[15].main.temp
    var temp4 = response.list[23].main.temp
    var temp5 = response.list[31].main.temp
    
    var humidity1 = response.list[0].main.humidity
    var humidity2 = response.list[7].main.humidity
    var humidity3 = response.list[15].main.humidity
    var humidity4 = response.list[23].main.humidity
    var humidity5 = response.list[31].main.humidity

    // adding times with moment

    var time = moment().format("MM"+"/"+"D"+"/"+"YY")
    //console.log(time);
    var timeAddOne = moment().add(1, 'days').format("MM"+"/"+"D"+"/"+"YY");
    //console.log(timeAddOne)
    var timeAddTwo = moment().add(2, 'days').format("MM"+"/"+"D"+"/"+"YY");
    var timeAddThree = moment().add(3, 'days').format("MM"+"/"+"D"+"/"+"YY");
    var timeAddFour = moment().add(4, 'days').format("MM"+"/"+"D"+"/"+"YY");
    var timeAddFive = moment().add(5, 'days').format("MM"+"/"+"D"+"/"+"YY");


    // adding weather icons

    var iconImage1 = response.list[0].weather[0].icon
    //console.log(iconImage1);
    var iconImage2 = response.list[7].weather[0].icon
    var iconImage3 = response.list[15].weather[0].icon
    var iconImage4 = response.list[23].weather[0].icon
    var iconImage5 = response.list[31].weather[0].icon
    

    tempList = [temp1, temp2, temp3, temp4, temp5];
    humidityList = [humidity1, humidity2, humidity3, humidity4, humidity5];
    // adding time list for moment
    timeList = [timeAddOne,timeAddTwo,timeAddThree,timeAddFour,timeAddFive];
    
    // adding images list for weather icons
    weatherIcon = [iconImage1,iconImage2,iconImage3,iconImage4,iconImage5];

    

    for (var i=0; i<5; i++){
      var newColumnDiv = $("<div>");
      newColumnDiv.attr("class", "col-sm-2");
      addingDiv.append(newColumnDiv);
      var newCard = $("<div>");
      newCard.attr({"class":"forecast card bg-primary text-white", "style":"width: 7rem"});
      newColumnDiv.append(newCard);
      var newCardBody = $("<div>");
      newCardBody.attr("class", "card-body");
      newCard.append(newCardBody);
      //adding moment times
      var timeH6 = $("<h6>");
      timeH6.text(timeList[i]);
      //adding image icons
      var imageImg = $("<img>");
      imageImg.attr("src", "http://openweathermap.org/img/wn/"+weatherIcon[i]+"@2x.png");
      var tempH5 = $("<h6>");
      tempH5.text("Temp: " + tempList[i] + " degrees F");
      tempH5.attr("id", "dayone");
      var humidityH5 = $("<h6>");
      humidityH5.text("Humidity: " + humidityList[i]+ "%");
      //testing clearing beforing appending;
      //adding moment times
      newCardBody.append(timeH6,imageImg,tempH5,humidityH5);

    }

  });


};


