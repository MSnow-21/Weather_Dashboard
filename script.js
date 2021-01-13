// API Testing


$("#search-button").on("click", function(event){
    event.preventDefault();

  
    var cityInput = $("#search-value").val();

    searchWeather(cityInput);
  
});


//creating variables for existing html

var displayToday = $("#today")


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

  
    });
};