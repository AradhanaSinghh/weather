
 const apikey='2a38f731632e47217985a981626cb8e2';
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
    
    function searchByCity(){
        var place= document.getElementById('input').value;

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

//    function 
    
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
            document.getElementById('temperature').innerText= 'Temperature : '+ Math.floor(data.main.temp-273)+ ' °C'+ "\n "+'humidity:' +Math.floor(data.main.humidity)+'%'+'\n' + 'feels like:' +Math.floor(data.main.feels_like-273)+ ' °C'+ "\n ";
        
            document.getElementById('clouds').innerText= data.weather[0].description;
            console.log(data.weather[0].description)
            
            let icon1= data.weather[0].icon;
            let iconurl= "https://api.openweathermap.org/img/w/"+ icon1 +".png";
            document.getElementById('img').src=iconurl;

        })
        var backgroundImage = chooseImage(data.main.temp-273);
        $("body").css("background", "url(" + backgroundImage + ")");

        // chooseImage() definition
                          function chooseImage(temp) {
                         if (temp > 15) {
                         return 'bg50.jpg';
                               }
                        if (temp < 15) {
                          return 'bg20.jpg';
            }
        }
    }
    
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
    
            div.appendChild(time)
            div.appendChild(temp)
    
            let desc= document.createElement('p');
            desc.setAttribute('class','desc')
            desc.innerText= forecast.list[i].weather[0].description;

            hourR.appendChild(div);
            hourR.appendChild(desc);

            document.querySelector('.templist').appendChild(hourR);

    }
    const average1=((forecast.list[0].main.temp+forecast.list[1].main.temp+forecast.list[2].main.temp+forecast.list[3].main.temp+forecast.list[4].main.temp+forecast.list[5].main.temp+forecast.list[6].main.temp+forecast.list[7].main.temp))/8;
            const weather_today_avg=document.getElementById("Average1");
            weather_today_avg.innerText= 'Average of hourly prediction for today is: ' +Math.floor(average1-273)+ ' °C' ;
           
}

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
        const average=((forecast.list[0].main.temp+forecast.list[1].main.temp+forecast.list[2].main.temp+forecast.list[3].main.temp+forecast.list[4].main.temp))/5;
            const weather_day_avg=document.getElementById("Average");
            weather_day_avg.innerText= 'Average of temperature for 5 days is: ' +Math.floor(average-273)+ ' °C' ;
    }