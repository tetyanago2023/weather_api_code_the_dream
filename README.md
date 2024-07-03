# Weather API Project

## Description
This Weather Dashboard is a web application that allows users to check the current weather conditions and forecast for a specific location. It utilizes the Open-Meteo API for weather data and the geocode.xyz API for geocoding city names to coordinates. Data is fetched from the Open-Meteo API and displayed on the webpage, where users can toggle between temperature and weather condition views. The application supports dark mode and geolocation to automatically fetch weather data. The weather data is displayed in the correct timezone based on the user's location.

## Code source and demo
* Code source: [Weather API Project](https://github.com/tetyanago2023/weather_api_code_the_dream)
* Demo: [Weather API Project](https://weather-api-code-the-dream.netlify.app/)



## Features
* Display current temperature and weather conditions.
* Toggle between temperature and weather condition views.
* Support for dark mode theme.
* Geolocation support to automatically fetch weather for the user's location.
* Search functionality to look up weather by city name.
* Responsive design for mobile and desktop devices.

## Technologies Used
* HTML/CSS/vanilla JavaScript
* Open-Meteo API
* geocode.xyz API

## Project Structure

- **index.html**: The main HTML file that structures the webpage and includes interactive elements.
- **script.js**: JavaScript file responsible for fetching weather data from the Open-Meteo API and dynamically updating the HTML content.
- **styles.css**: CSS file that styles the HTML elements for a cohesive look and includes night mode functionality.
- **README.md**: Instructions and details about the project.

## Setup and Usage

1. Clone the repository:
    ```bash
    git clone https://github.com/tetyanago2023/weather_api_code_the_dream.git
    ```

2. Navigate to the project directory:
    ```bash
    cd weather_api_code_the_dream
    ```

3. Open the project in your IDE.

4. Start a local server:
   - Open `index.html` in your IDE.
   - Right-click on `index.html` and select "Run 'index.html'" to start a local server.
   - Alternatively, open `index.html` directly in a web browser to view the project.

## Dependencies

- [Open-Meteo API](https://open-meteo.com/)
- [Geocode API](https://geocode.xyz/api/)
- [Weather Icons](https://erikflowers.github.io/weather-icons/)

## How to Use

**Search for Weather Data**

## Usage
* Upon loading, the application will attempt to fetch weather data for the user's current location using geolocation.
* Alternatively, users can search for weather by entering a city name in the input field and clicking "Search".
* Toggle between temperature and weather condition views using the respective links.
* Click the theme toggle icon-equipped button (`Toggle Theme`) to switch between day and night modes.

**View Temperature**

Click on the "Temperature" link in the navigation bar to view temperature data. Alternatively, users can search for weather by entering a city name in the input field and clicking "Search".

**View Weather Conditions**

Click on the "Condition" link in the navigation bar to view weather conditions represented by icons.

**Toggle Dark Mode**

Click the theme toggle icon-equipped button to switch between day and night modes for better readability.

## Testing

For testing please install listed below packages through npm:

```bash
npm install --save-dev jest
npm install --save-dev jest-environment-jsdom
npm install --save-dev babel-jest @babel/core @babel/preset-env
```
The tests are located in the `script.test.js` file. To run the tests, use the following command:

```bash
npm test
```
Regarding Punycode deprecation message at the moment of this project development please note that it is a warning message from the Jest library. It is not an error and does not affect the test results. Also, please refer to [Punycode Deprecation](https://nodejs.org/api/punycode.html).
## License

This project is in the frame of the MIT License (Users of software using an MIT License are permitted to use, copy, modify, merge publish, distribute, sublicense and sell copies of the software).
