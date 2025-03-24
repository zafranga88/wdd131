document.getElementById('currentYear').textContent = new Date().getFullYear();

document.getElementById('lastModified').textContent = document.lastModified;

function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 10 && windSpeed > 4.8) {
        return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1) + '°C';
    } else {
        return "N/A";
    }
}

const tempElement = document.querySelector('.temp');
const temperature = parseFloat(tempElement.textContent); 
const windSpeedElement = document.querySelector('.weather-info p:nth-child(3)');
const windSpeed = parseFloat(windSpeedElement.textContent.match(/\d+(\.\d+)?/)[0]); 

const windChillValue = calculateWindChill(temperature, windSpeed);

const windchillElements = document.querySelectorAll('[id^="windchill"]');
windchillElements.forEach(element => {
    element.textContent = windChillValue;
});