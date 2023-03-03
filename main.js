const apiKey = "815fd7dfd7c84ef5863133637231902"

const container = document.querySelector('.container');
const input = document.querySelector('.weather-input');
const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;
let store = {
    city: 'London',
    temp: 0,
}

// Делаю запрос на получение данных
const fetchData = async () => {
    const res = await fetch(`${query}&q=${store.city}`)
    const data = await res.json()
    // Деструктуризация
    const { current:{temp_c: temp, }, location:{name:city}} = data;
    store = {
        ...store,
        city: city,
        temp: temp
    };
    renderData()

    
};


//  Создаю разметку 
const markup = () => {
    const {city,temp} = store;

    return `<div class="weather">
        <div class="weather__container">
        <input  class="weather-input" type="text">
        <div class="weather__card">
            <h3 class="weather-city">London</h3>
            <p class="weather-temp">4</p>
        </div>
        </div>
    </div>`
};



function renderData(){
    container.innerHTML = markup;
}
fetchData();

