document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const temperatureLink = document.getElementById('temperature-link');
    const conditionLink = document.getElementById('condition-link');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const loadingIndicator = document.getElementById('loading-indicator');
    const geolocationLoadingIndicator = document.getElementById('geolocation-loading-indicator');

    let currentCity = "Your Location";
    let currentLatitude;
    let currentLongitude;

    // Function to toggle theme and save preference to localStorage
    function toggleTheme() {
        document.body.classList.toggle('night-mode');
        if (document.body.classList.contains('night-mode')) {
            localStorage.setItem('theme', 'night-mode');
        } else {
            localStorage.setItem('theme', 'day-mode');
        }
    }

    // Retrieve and apply theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night-mode') {
        document.body.classList.add('night-mode');
    }

    temperatureLink.addEventListener('click', () => {
        fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m');
    });

    conditionLink.addEventListener('click', () => {
        fetchWeatherData(currentLatitude, currentLongitude, 'weathercode');
    });

    toggleThemeButton.addEventListener('click', toggleTheme);

    searchButton.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            fetchCoordinates(city);
        }
    });

    function fetchCoordinates(city) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true`;

        showLoading();
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                currentCity = city;
                currentLatitude = data.latitude;
                currentLongitude = data.longitude;
                fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m');
            })
            .catch(error => {
                console.error('Error fetching coordinates:', error);
                content.innerHTML = '<p>Error fetching coordinates.</p>';
            })
            .finally(hideLoading);
    }

    function fetchWeatherData(latitude, longitude, parameter) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${parameter}`;

        showLoading();
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayData(data.hourly, parameter);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                content.innerHTML = '<p>Error fetching data.</p>';
            })
            .finally(hideLoading);
    }

    function displayData(data, parameter) {
        let contentHtml = `<h2>${parameter === 'temperature_2m' ? 'Temperature' : 'Weather Condition'} in ${currentCity}</h2>`;
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
        return Math.round(celsius * 9 / 5 + 32);
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

    function showLoading() {
        loadingIndicator.style.display = 'block';
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    function showGeolocationLoading() {
        geolocationLoadingIndicator.style.display = 'block';
    }

    function hideGeolocationLoading() {
        geolocationLoadingIndicator.style.display = 'none';
    }

    // Initial load using geolocation
    if (navigator.geolocation) {
        showGeolocationLoading();
        navigator.geolocation.getCurrentPosition((position) => {
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;
            fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m');
            hideGeolocationLoading();
        }, (error) => {
            console.error('Error getting geolocation:', error);
            content.innerHTML = '<p>Error getting geolocation. Defaulting to Roseville, CA.</p>';
            // Default to Roseville, CA
            currentLatitude = 38.7521;
            currentLongitude = -121.2880;
            fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m');
            hideGeolocationLoading();
        });
    } else {
        console.error('Geolocation not supported');
        content.innerHTML = '<p>Geolocation not supported. Defaulting to Roseville, CA.</p>';
        // Default to Roseville, CA
        currentLatitude = 38.7521;
        currentLongitude = -121.2880;
        fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m');
    }
});
