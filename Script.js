//Providing a unique Api id frmo openWeatherApi 
const apikey='2a38f731632e47217985a981626cb8e2';
//adding event to load the details of the place user lives by geological indicator
window.addEventListener("load",()=>{
       if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition((position)=>{
               let lon= position.coords.longitude;
               let lat= position.coords.latitude;
               const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
               fetch(url).then((res)=>{
                   return res.json();
               }).then((data)=>{
                   console.log(data);
                   console.log(new Date().getTime())
                   var dat= new Date(data.dt)
                   console.log(dat.toLocaleString(undefined,'Asia/Kolkata'))
                   console.log(new Date().getMinutes())
                   weatherReport(data);
       
               })
           })
       }
   })
   //searching by city -- User will enter the name of the city where the url will be fetched 
   function searchByCity(){
       var place= document.getElementById('input').value;

       //if user has not mentioned any place then it will give alert to the user to enter the name of the city
       if(place.length==0){
           alert("please type in a city name");
       }
       var urlsearch= `https://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${apikey}`;
       fetch(urlsearch).then((res)=>{
           return res.json();
           
       }).then((data)=>{
           console.log(data);
           weatherReport(data);
       })

       console.log("urlsearchdata:" + urlsearch);
       document.getElementById('input').value='';
   }

//    function to check weeatherReport details ****

   function weatherReport(data){
   
       var urlcast= `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;
   
       fetch(urlcast).then((res)=>{
           return res.json();
       }).then((forecast)=>{
           console.log(forecast.city);
           hourForecast(forecast);
           dayForecast(forecast);
   
           console.log(data);
           document.getElementById('city').innerText= data.name + ', '+data.sys.country;
           console.log(data.name,data.sys.country);
       
           console.log(Math.floor(data.main.temp-273));
           document.getElementById('temperature').innerText= '⛅Temperature : '+ Math.floor(data.main.temp-273)+ ' °C'+ "\n "+'💧humidity:' +Math.floor(data.main.humidity)+'%'+'\n'+'🍃wind:' + Math.floor(data.wind.speed)+ " km/hr"+ "\n \n " +'feels like: ' + Math.floor(data.main.feels_like-273)+ '°C';
       
           document.getElementById('clouds').innerText= data.weather[0].description;
           console.log(data.weather[0].description)
           
           let icon1= data.weather[0].icon;
           let iconurl= "https://api.openweathermap.org/img/w/"+ icon1 +".png";
           document.getElementById('img').src=iconurl;

       })

       //background change with temperature
       var backgroundImage = chooseImage(data.weather[0].description);


       // chooseImage() definition
                         function chooseImage(temp) {
                           if (temp == "clear sky") {
                               $("body").css("background-image", "url(https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)");
                           } 
                           else if (temp == "broken clouds" || temp== "overcast clouds" || temp == "mist" ||temp=="few clouds" || temp=="haze") {
                               $("body").css("background-image", "url(https://images.unsplash.com/photo-1546538743-50202de912e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)")
                           }
                         else if (temp == "thunderstorm") {
                            $("body").css("background-image", "url(https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80)")
                        } 
                           else if (temp == "thunderstorm with light rain" || temp== "scattered clouds" || temp=="light rain"||temp == "shower rain"|| temp=="rain"||temp="heavy intensity shower rain") {
                            $("body").css("background-image", "url(https://images.unsplash.com/photo-1512511708753-3150cd2ec8ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80)")
                        } 
                           else if(temp == "snow" || temp=="light snow" ||temp=="Heavy snow"||temp=="light shower snow"||temp=="Light rain and snow"||temp=="Heavy shower snow"){
                            $("body").css("background-image", "url(https://images.unsplash.com/photo-1542692576-0eb0bd11a968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)")
                         }
                           else if(temp=="fog"){
                            $("body").css("background-image", "url(https://images.unsplash.com/photo-1516410529446-2c777cb7366d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)")
                        } else{
                            $("body").css("background-image", "url(https://images.unsplash.com/photo-1546538743-50202de912e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)")
                        }
           }
       
   }
   //hour forecast is to update user within every 3hours
   function hourForecast(forecast){
       document.querySelector('.templist').innerHTML=''
       for (let i = 0; i < 8; i++) {
           var date= new Date(forecast.list[i].dt*1000)
           console.log((date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00',''))
   
           let hourR=document.createElement('div');
           hourR.setAttribute('class','next');
   
           let div= document.createElement('div');
           let time= document.createElement('p');
           time.setAttribute('class','time')
           time.innerText= (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');
   
           let temp= document.createElement('p');
           temp.innerText="temp: "+Math.floor((forecast.list[i].main.temp - 273))+ '°C '+", Max-temp/Min-temp "+" " + Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C'+',' +" feels like :" + Math.floor((forecast.list[i].main.feels_like - 273))+ ' °C';
   //****Note****:-
   // YOU MIGHT SEE WEATHER_MIN and WEATHER_MAX SAME FOR FEW PLACES
   //reason:- temp_min and temp_max reflect deviations in measurement for the given city. If they are equal to temp then either all weather stations are perfect or there is just one for the whole city.
   //temp_min refers to minimum temperature at the moment
   //temp_max refers to maximum temperature at the moment
   //for further details about the same refer :
   //https://openweathermap.org/current#:~:text=main.temp_min%20Minimum%20temperature%20at,Maximum%20temperature%20at%20the%20moment.
           div.appendChild(time)
           div.appendChild(temp)
   
           let desc= document.createElement('p');
           desc.setAttribute('class','desc')
           desc.innerText= forecast.list[i].weather[0].description;

           hourR.appendChild(div);
           hourR.appendChild(desc);

           document.querySelector('.templist').appendChild(hourR);

   }
   //prediction average of a day by hour
   const average1=((forecast.list[0].main.temp+forecast.list[1].main.temp+forecast.list[2].main.temp+forecast.list[3].main.temp+forecast.list[4].main.temp+forecast.list[5].main.temp+forecast.list[6].main.temp+forecast.list[7].main.temp))/8;
           const weather_hourly_avg=document.getElementById("Average1");
           weather_hourly_avg.innerText= 'Average of hourly prediction for today is: ' +Math.floor(average1-273)+ ' °C' ;
          
}

// 5 day prediction of weather 
   function dayForecast(forecast){
       document.querySelector('.weekF').innerHTML=''
       
       for (let i = 7; i < forecast.list.length; i+=8) {
           console.log(forecast.list[i]);
           let div= document.createElement('div');
           div.setAttribute('class','dayF');
           
           let day= document.createElement('p');
           day.setAttribute('class','date')
           day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
           div.appendChild(day);
           let temp= document.createElement('p');
           temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
           div.appendChild(temp)
   
           let description= document.createElement('p');
           description.setAttribute('class','desc')
           description.innerText= forecast.list[i].weather[0].description;

           div.appendChild(description);
           document.querySelector('.weekF').appendChild(div)
       }
       //prediction average of a 5 day
       const average=((forecast.list[0].main.temp+forecast.list[1].main.temp+forecast.list[2].main.temp+forecast.list[3].main.temp+forecast.list[4].main.temp))/5;
           const weather_day_avg=document.getElementById("Average");
           weather_day_avg.innerText= 'Average of temperature for 5 days is: ' +Math.floor(average-273)+ ' °C' ;

   }
