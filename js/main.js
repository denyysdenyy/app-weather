const apiKey = "815fd7dfd7c84ef5863133637231902";
const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;
// ---------------------------------------------------------------------------------------------------------------------------------------

const weatherCard = document.querySelector('.weather__card');
const form = document.getElementById('form');
const container = document.querySelector('.weather__container');
const input = document.querySelector('.weather-input');
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
form.addEventListener('submit',formHandler);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let info = {
    city: 'Kiev',
    temp: 0
} ;

function formHandler(e){
    e.preventDefault();


     const inputText = input.value.trim();
     if (input.value === ''){
        console.log('ошибка')
     }
        // Запрос данных
    fetch(`${query}&q=${inputText}`).then((data) =>{
        return data.json();
    }).then((data) =>{
        console.log(data);
        // Деструктуризация
        const {current:{temp_c: temp, condition:{text: condition},wind_mph: wind,is_day:isDay}, location:{name:city}} = data;
        info = {
            ...info,
            city:city,
            temp:temp,
            condition: condition,
            wind:wind,
            isDay:isDay
        };

      console.log(info)
    
      
    
    
      function getSvg(){
        switch(condition){
            case 'Clear':
            case 'Sunny':
                return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24 37.44C31.4227 37.44 37.44 31.4227 37.44 24C37.44 16.5773 31.4227 10.56 24 10.56C16.5773 10.56 10.56 16.5773 10.56 24C10.56 31.4227 16.5773 37.44 24 37.44Z" fill="#FFA500"/> </svg>`;
            case 'Overcast':
            case 'Partly cloudy':
                return `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.8 33.28C49.0415 33.28 52.48 29.8416 52.48 25.6C52.48 21.3585 49.0415 17.92 44.8 17.92C40.5584 17.92 37.12 21.3585 37.12 25.6C37.12 29.8416 40.5584 33.28 44.8 33.28Z" fill="#FFA500"/> <path d="M42.0393 26.8821C41.0829 22.145 36.9336 18.688 32 18.688C27.9019 18.688 24.2237 21.1272 22.612 24.8341C18.7392 24.9262 15.616 28.1047 15.616 32C15.616 35.9527 18.8314 39.168 22.784 39.168H42.24C45.6274 39.168 48.384 36.4114 48.384 33.024C48.384 29.569 45.4697 26.794 42.0393 26.8821Z" fill="#57A0EE"/></svg>`
            case 'Patchy light snow':
                return `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M47.7 34.4C47.7 29.8 44 26.2 39.5 26.2C38.5 26.2 37.6 26.4 36.7 26.7C36.4 23.3 33.6 20.5 30.1 20.5C26.4 20.5 23.4 23.5 23.4 27.2C23.4 28 23.6 28.8 23.8 29.5C23.5 29.4 23.1 29.4 22.8 29.4C19.1 29.4 16.1 32.4 16.1 36.1C16.1 39.7 19 42.7 22.6 42.8H39.8C44.2 42.3 47.7 38.8 47.7 34.4Z" fill="#57A0EE" stroke="white" stroke-width="1.2" stroke-linejoin="round"/> <path d="M27 44.5V49.5" stroke="#57A0EE" stroke-width="1.2" stroke-linecap="round"/> <path d="M28.7678 45.2322L25.2322 48.7678" stroke="#57A0EE" stroke-linecap="round"/> <path d="M29.5 47H24.5" stroke="#57A0EE" stroke-linecap="round"/> <path d="M28.7678 48.7678L25.2322 45.2322" stroke="#57A0EE" stroke-linecap="round"/> <path d="M36 44.5V49.5" stroke="#57A0EE" stroke-width="1.2" stroke-linecap="round"/> <path d="M37.7678 45.2322L34.2322 48.7678" stroke="#57A0EE" stroke-linecap="round"/> <path d="M38.5 47H33.5" stroke="#57A0EE" stroke-linecap="round"/> <path d="M37.7678 48.7678L34.2322 45.2322" stroke="#57A0EE" stroke-linecap="round"/></svg>`
            case 'Mist':
                case 'Freezing fog': 
                return `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.3"> <path d="M44.8 29.44C44.7181 29.44 44.6362 29.44 44.5491 29.4426C43.3562 23.5213 38.1671 19.2 32 19.2C26.8775 19.2 22.2797 22.249 20.265 26.8826C15.424 26.9978 11.52 30.9709 11.52 35.84C11.52 40.7808 15.5392 44.8 20.48 44.8H44.8C49.0343 44.8 52.48 41.3543 52.48 37.12C52.48 32.8858 49.0343 29.44 44.8 29.44Z" fill="#57A0EE"/> <path d="M50.0674 47.3206H16.7874C16.0809 47.3206 15.5074 47.894 15.5074 48.6006C15.5074 49.3071 16.0809 49.8806 16.7874 49.8806H50.0674C50.774 49.8806 51.3474 49.3071 51.3474 48.6006C51.3474 47.894 50.774 47.3206 50.0674 47.3206Z" fill="#607D8B"/> <path d="M50.0674 52.4406H16.7874C16.0809 52.4406 15.5074 53.014 15.5074 53.7206C15.5074 54.4271 16.0809 55.0006 16.7874 55.0006H50.0674C50.774 55.0006 51.3474 54.4271 51.3474 53.7206C51.3474 53.014 50.774 52.4406 50.0674 52.4406Z" fill="#607D8B"/> </g> </svg>`
          };

      }
     
      
        function markup(){
            return `<form id="form" action="" class="weather-form">
                <input  class="weather-input" placeholder="Kharkiv..." type="text">
                <button class="weather-btn" type="submit"> <svg width="24"   height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="weather-search-svg" d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64444 17.3333 8.66667 17.3333C6.24444 17.3333 4.19467 16.4942 2.51733 14.816C0.84 13.1378 0.000888889 11.088 0 8.66667C0 6.24444 0.839111 4.19467 2.51733 2.51733C4.19556 0.84 6.24533 0.000888889 8.66667 0C11.0889 0 13.1387 0.839111 14.816 2.51733C16.4933 4.19556 17.3324 6.24533 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.7502 14.0831 12.9173 12.916C14.0844 11.7489 14.6676 10.3324 14.6667 8.66667C14.6667 7 14.0831 5.58311 12.916 4.416C11.7489 3.24889 10.3324 2.66578 8.66667 2.66667C7 2.66667 5.58311 3.25022 4.416 4.41733C3.24889 5.58444 2.66578 7.00089 2.66667 8.66667C2.66667 10.3333 3.25022 11.7502 4.41733 12.9173C5.58444 14.0844 7.00089 14.6676 8.66667 14.6667Z" fill="#1F6098"/>
                </svg></button>
            </form>
            <div class="weather__card">
                <h3 class="weather-city">${city}</h3>
                <span class="weather-icon">${getSvg(condition)}</span>
                <p class="weather-temp">${temp}°C</p>
            </div>`
       };
       

       function nightMod(){
        function giveNightMod(){
          weatherCard.classList.add('night-mod')
        }
        switch(isDay){
            case 0:
            giveNightMod();
        };
    }
       nightMod();
      container.innerHTML = markup();

      
    });

};




