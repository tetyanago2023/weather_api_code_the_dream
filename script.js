// Description: This file contains the main logic for the Weather API Project.

// Function to toggle theme and save preference to localStorage
export function toggleTheme() {
    const isNightMode = document.body.classList.toggle('night-mode'); // Toggle night-mode class on body
    localStorage.setItem('theme', isNightMode ? 'night-mode' : 'day-mode'); // Save theme preference to localStorage
    const themeIcon = document.getElementById('theme-icon'); // Icon indicating current theme
    if (themeIcon) {
        themeIcon.className = isNightMode ? 'wi wi-day-sunny' : 'wi wi-night-clear'; // Update theme icon
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content'); // Main content area
    const temperatureLink = document.getElementById('temperature-link'); // Link to fetch temperature data
    const conditionLink = document.getElementById('condition-link'); // Link to fetch weather condition data
    const toggleThemeButton = document.getElementById('toggle-theme'); // Button to toggle theme
    const searchButton = document.getElementById('search-button'); // Button to initiate city search
    const cityInput = document.getElementById('city-input'); // Input field for city name
    const loadingIndicator = document.getElementById('loading-indicator'); // Loading indicator for data fetch
    const geolocationLoadingIndicator = document.getElementById('geolocation-loading-indicator'); // Loading indicator for geolocation

    let currentCity = localStorage.getItem('city') || "Your Location"; // Retrieve saved city from localStorage
    let currentLatitude = parseFloat(localStorage.getItem('latitude')) || null; // Retrieve saved latitude from localStorage
    let currentLongitude = parseFloat(localStorage.getItem('longitude')) || null; // Retrieve saved longitude from localStorage

    // Retrieve and apply theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night-mode') {
        document.body.classList.add('night-mode'); // Apply night-mode if saved in localStorage
        const themeIcon = document.getElementById('theme-icon'); // Icon indicating current theme
        if (themeIcon) {
            themeIcon.className = 'wi wi-day-sunny'; // Set icon to day-sunny
        }
    }

    // Event listener to fetch temperature data
    temperatureLink.addEventListener('click', () => {
        fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m');
    });

    // Event listener to fetch weather condition data
    conditionLink.addEventListener('click', () => {
        fetchWeatherData(currentLatitude, currentLongitude, 'weathercode');
    });

    // Event listener to toggle theme
    toggleThemeButton.addEventListener('click', toggleTheme);

    // Event listener to search for a city's coordinates
    searchButton.addEventListener('click', () => {
        const city = cityInput.value; // Get city name from input field
        if (city) {
            fetchCoordinates(city); // Fetch coordinates if city name is not empty
        }
    });

    // Function to fetch coordinates of a city
    function fetchCoordinates(city) {
        const apiUrl = `https://geocode.xyz/${city}?json=1`; // API URL to fetch coordinates

        showLoading(); // Show loading indicator
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error.description); // Handle error if present in response
                }
                currentCity = city; // Set current city
                currentLatitude = parseFloat(data.latt); // Set current latitude
                currentLongitude = parseFloat(data.longt); // Set current longitude
                localStorage.setItem('city', currentCity); // Save city to localStorage
                localStorage.setItem('latitude', currentLatitude); // Save latitude to localStorage
                localStorage.setItem('longitude', currentLongitude); // Save longitude to localStorage
                fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m'); // Fetch weather data
                cityInput.value = ''; // Clear input field
            })
            .catch(error => {
                console.error('Error fetching coordinates:', error);
                content.innerHTML = '<p>Error fetching coordinates. Please check the city name correctness you have inserted in the search field.</p>'; // Display error message
            })
            .finally(hideLoading); // Hide loading indicator
    }

    // Function to fetch weather data
    function fetchWeatherData(latitude, longitude, parameter) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${parameter}`; // API URL to fetch weather data

        showLoading(); // Show loading indicator
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayData(data.hourly, parameter); // Display fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                content.innerHTML = '<p>Error fetching data.</p>'; // Display error message
            })
            .finally(hideLoading); // Hide loading indicator
    }

    // Function to display weather data
    function displayData(data, parameter) {
        let contentHtml = `<h2>${parameter === 'temperature_2m' ?
            'Temperature forecast for 7 days'
            : 'Weather condition forecast for 7 days'} in ${currentCity}</h2>`;
        contentHtml += '<ul>';
        data[parameter].forEach((value, index) => {
            const dateTime = new Date(data.time[index]).toLocaleString(); // Convert time to locale string
            const displayValue = parameter === 'temperature_2m'
                ? `${convertCelsiusToFahrenheit(value)}°F`
                : getWeatherIcon(value); // Convert value based on parameter
            contentHtml += `<li>${dateTime}: ${displayValue}</li>`; // Append data to contentHtml
        });
        contentHtml += '</ul>';
        content.innerHTML = contentHtml; // Set content HTML
    }

    // Function to convert Celsius to Fahrenheit
    function convertCelsiusToFahrenheit(celsius) {
        return Math.round(celsius * 9 / 5 + 32); // Convert and round to nearest integer
    }

    // Function to get weather icon based on code
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
        return `<i class="${iconMap[code]}"></i>`; // Return icon HTML
    }

    // Function to show loading indicator
    function showLoading() {
        loadingIndicator.style.display = 'block'; // Show loading indicator
    }

    // Function to hide loading indicator
    function hideLoading() {
        loadingIndicator.style.display = 'none'; // Hide loading indicator
    }

    // Function to show geolocation loading indicator
    function showGeolocationLoading() {
        geolocationLoadingIndicator.style.display = 'block'; // Show geolocation loading indicator
    }

    // Function to hide geolocation loading indicator
    function hideGeolocationLoading() {
        geolocationLoadingIndicator.style.display = 'none'; // Hide geolocation loading indicator
    }

    // Initial load using saved city or geolocation
    if (currentLatitude && currentLongitude) {
        fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m'); // Fetch data using saved coordinates
    } else if (navigator.geolocation) {
        showGeolocationLoading(); // Show geolocation loading indicator
        navigator.geolocation.getCurrentPosition((position) => {
            currentLatitude = position.coords.latitude; // Get latitude from geolocation
            currentLongitude = position.coords.longitude; // Get longitude from geolocation
            fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m'); // Fetch weather data
            hideGeolocationLoading(); // Hide geolocation loading indicator
        }, (error) => {
            console.error('Error getting geolocation:', error);
            content.innerHTML = '<p>Error getting geolocation. Defaulting to Roseville, CA.</p>'; // Display error message
            // Default to Roseville, CA
            currentLatitude = 38.7521;
            currentLongitude = -121.2880;
            fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m'); // Fetch data for default location
            hideGeolocationLoading(); // Hide geolocation loading indicator
        });
    } else {
        console.error('Geolocation not supported');
        content.innerHTML = '<p>Geolocation not supported. Defaulting to Roseville, CA.</p>'; // Display error message
        // Default to Roseville, CA
        currentLatitude = 38.7521;
        currentLongitude = -121.2880;
        fetchWeatherData(currentLatitude, currentLongitude, 'temperature_2m'); // Fetch data for default location
    }
});

