import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  ngOnInit(): void {
    this.weatherBalloon(4105435)
  }

  constructor() { }
  key = 'f348ce5303cd85f4b27a3bcd5a5f0558';

  if(key = '')
  {
     document.getElementById('temp').innerHTML = ('Remember to add your api key!');
  } 
  
  public weatherBalloon( cityID ) {
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + this.key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
      var celcius = Math.round(parseFloat(data.main.temp)-273.15);
      var fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
      var description = data.weather[0].description; 
      document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
      document.getElementById('description').innerHTML = description;
      document.getElementById('location').innerHTML = data.name;
      
      if( description.indexOf('rain') > 0 ) {
        document.body.className = 'rainy';
      } else if( description.indexOf('cloud') > 0 ) {
        document.body.className = 'cloudy';
      } else if( description.indexOf('sunny') > 0 ) {
        document.body.className = 'sunny';
      } else {
        document.body.className = 'clear';
      }



    })
    .catch(function() {
      // catch any errors
    });
  }


}
