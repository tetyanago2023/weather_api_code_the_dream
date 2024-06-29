document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const temperatureLink = document.getElementById('temperature-link');
    const conditionLink = document.getElementById('condition-link');
    const cityNameElement = document.getElementById('city-name');

    // Set the city name
    const cityName = "Roseville, CA";
    cityNameElement.textContent = cityName;

    temperatureLink.addEventListener('click', () => {
        fetchWeatherData('temperature_2m');
    });

    conditionLink.addEventListener('click', () => {
        fetchWeatherData('weathercode');
    });

    function fetchWeatherData(parameter) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=38.7521&longitude=-121.2880&hourly=${parameter}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayData(data.hourly, parameter);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                content.innerHTML = '<p>Error fetching data.</p>';
            });
    }

    function displayData(data, parameter) {
        let contentHtml = `<h2>${parameter === 'temperature_2m' ? 'Temperature' : 'Weather Condition'} in ${cityName}</h2>`;
        contentHtml += '<ul>';
        data[parameter].forEach((value, index) => {
            const dateTime = new Date(data.time[index]).toLocaleString();
            const displayValue = parameter === 'temperature_2m' ? `${convertCelsiusToFahrenheit(value)}°F` : getWeatherIcon(value);
            contentHtml += `<li>${dateTime}: ${displayValue}</li>`;
        });
        contentHtml += '</ul>';
        content.innerHTML = contentHtml;
    }

    function convertCelsiusToFahrenheit(celsius) {
        return Math.round(celsius * 9/5 + 32);
    }

    function getWeatherIcon(code) {
        const iconMap = {
            0: 'wi wi-day-sunny',
            1: 'wi wi-day-sunny-overcast',
            2: 'wi wi-day-cloudy',
            3: 'wi wi-day-cloudy',
            45: 'wi wi-fog',
            48: 'wi wi-fog',
            51: 'wi wi-sprinkle',
            53: 'wi wi-sprinkle',
            55: 'wi wi-rain',
            56: 'wi wi-rain-mix',
            57: 'wi wi-rain-mix',
            61: 'wi wi-showers',
            63: 'wi wi-showers',
            65: 'wi wi-rain',
            66: 'wi wi-rain-mix',
            67: 'wi wi-rain-mix',
            71: 'wi wi-snow',
            73: 'wi wi-snow',
            75: 'wi wi-snow',
            77: 'wi wi-snowflake-cold',
            80: 'wi wi-showers',
            81: 'wi wi-showers',
            82: 'wi wi-rain',
            85: 'wi wi-snow',
            86: 'wi wi-snow',
            95: 'wi wi-thunderstorm',
            96: 'wi wi-thunderstorm',
            99: 'wi wi-thunderstorm'
        };
        return `<i class="${iconMap[code]}"></i>`;
    }

    // Initial load
    fetchWeatherData('temperature_2m');
});
