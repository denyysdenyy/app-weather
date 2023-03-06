const apiKey = "815fd7dfd7c84ef5863133637231902"
const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;
// ---------------------------------------------------------------------------------------------------------------------------------------


const form = document.getElementById('form');
const container = document.querySelector('.weather__container');
const input = document.querySelector('.weather-input');
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
form.addEventListener('submit',formHandler)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let info = {
    city: 'Kiev',
    temp: 0
}  

function formHandler(e){
    e.preventDefault();


     const inputText = input.value.trim();
     if (input.value === ''){
        console.log('ошибка')
     }

    fetch(`${query}&q=${inputText}`).then((data) =>{
        return data.json();
    }).then((data) =>{
        const {current:{temp_c: temp, condition:{text: condition}}, location:{name:city}} = data;
        info = {
            ...info,
            city:city,
            temp:temp,
            condition: condition
        };

      console.log(info)
        
      function getSvg(){

        switch(condition){
            case 'Clear':
                return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 37.44C31.4227 37.44 37.44 31.4227 37.44 24C37.44 16.5773 31.4227 10.56 24 10.56C16.5773 10.56 10.56 16.5773 10.56 24C10.56 31.4227 16.5773 37.44 24 37.44Z" fill="#FFA500"/> </svg>`;
            case 'Overcast':
            return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.6162 34.7328C47.1554 34.2048 46.3818 34.0096 45.701 34.2368C43.7926 34.8736 41.7226 35.2 39.5426 35.2C29.1137 35.2 20.6309 27.3024 20.6309 17.6C20.6309 11.76 23.729 6.3232 28.9177 3.0528C29.5057 2.6816 29.7876 2.0128 29.6295 1.3696C29.4713 0.7264 28.9039 0.24 28.1991 0.144C27.3944 0.0352002 26.5933 0 25.7887 0C11.5671 0 0 10.7648 0 24C0 37.2352 11.5671 48 25.7887 48C34.8147 48 43.0258 43.7312 47.7469 36.5824C48.1285 36.0032 48.0735 35.264 47.6162 34.7328Z" fill="#B0BEC5"/>
            </svg>
            
            `
          };

      }
     
      

        function markup(){
            return `<form id="form" action="" class="weather-form">
                <input  class="weather-input" placeholder="Kharkiv..." type="text">
                <button class="weather-btn" type="submit"><svg width="24"   height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="weather-search-svg" d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64444 17.3333 8.66667 17.3333C6.24444 17.3333 4.19467 16.4942 2.51733 14.816C0.84 13.1378 0.000888889 11.088 0 8.66667C0 6.24444 0.839111 4.19467 2.51733 2.51733C4.19556 0.84 6.24533 0.000888889 8.66667 0C11.0889 0 13.1387 0.839111 14.816 2.51733C16.4933 4.19556 17.3324 6.24533 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.7502 14.0831 12.9173 12.916C14.0844 11.7489 14.6676 10.3324 14.6667 8.66667C14.6667 7 14.0831 5.58311 12.916 4.416C11.7489 3.24889 10.3324 2.66578 8.66667 2.66667C7 2.66667 5.58311 3.25022 4.416 4.41733C3.24889 5.58444 2.66578 7.00089 2.66667 8.66667C2.66667 10.3333 3.25022 11.7502 4.41733 12.9173C5.58444 14.0844 7.00089 14.6676 8.66667 14.6667Z" fill="#1F6098"/>
                </svg></button>
            </form>
            <div class="weather__card">
                <h3 class="weather-city">${city}</h3>
                <span class="weather-icon">${getSvg(condition)}</span>
                <p class="weather-temp">${temp}°C</p>
            </div>`
       };

      container.innerHTML = markup();

      
    });

};




