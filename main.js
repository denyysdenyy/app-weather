const apiKey = "815fd7dfd7c84ef5863133637231902"
const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;


const form = document.getElementById('form');
const container = document.querySelector('.weather__container');
const input = document.querySelector('.weather-input');

let info = {
    city: 'Kiev',
    temp: 0
}

form.addEventListener('submit',formHandler)

function formHandler(e){
    e.preventDefault();


     const inputText = input.value.trim();

    fetch(`${query}&q=${inputText}`).then((data) =>{
        return data.json();
    }).then((data) =>{
        const {current:{temp_c: temp, }, location:{name:city}} = data;
        info = {
            ...info,
            city:city,
            temp:temp
        }
      console.log(info)
       const markup = function(){
            return `<form id="form" action="" class="weather-form">
            <input  class="weather-input" type="text">
            <button class="weather-btn" type="submit">Поиск</button>
        </form>
    <div class="weather__card">
        <h3 class="weather-city">${city}</h3>
        <p class="weather-temp">${temp}°C</p>
    </div>`
       };
      container.innerHTML = markup();

      
    });
    
    // input.value = '';
     


}




