//getting the location  

const apiKey = '5b88c3f39e3c4ca2b493dfb64bf41cbc'

window.addEventListener('load', ()=>{
    let long;
    let lat;
    
    //html elements we would need to modify
    let timezoneLocation = document.querySelector('.location-timezone');
    let tempDeg = document.querySelector('.temperature-degree');
    let tempDesc = document.querySelector('.temperature-description');
    let img = document.querySelector('.location img');
    let unit = document.querySelector('.temperature span');

    let imgPath = 'icons\\';

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const apiCall =`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${apiKey}`

            fetch(apiCall)
                .then(data =>{
                    return data.json()
                })
                .then(data =>{
                    

                    const {timezone, temp, weather } = data.data[0];

                    //set dom elements from the api

                    timezoneLocation.textContent = timezone;
                    tempDeg.textContent = temp;
                    tempDesc.textContent = weather.description;

                    img.setAttribute('src', `${imgPath}${weather.icon}.png`)


                    //tempchange

                    tempDeg.addEventListener('click', e=>{

                        if(unit.textContent === 'F'){
                            unit.textContent = 'C';
            
                            let f = Number(tempDeg.textContent);
                            let formula = Math.floor((f - 32) * (5/9));
            
                            tempDeg.textContent = String(formula);
                        }else{
                            unit.textContent = 'F';
                            tempDeg.textContent = temp;
            
                        }
            
                    })

                })
        })

       

    }
});