/* Global Variables */
const generate = document.getElementById('generate');
// Personal API Key for OpenWeatherMap API
const apiKey = '0e576197987e1d4fe62b40d408ef1632&units=imperial';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//GET
const getData = async (url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json()
        console.log(allData);
    }
    catch (error) {
        console.log("error", error);
    }
};

//POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
    } catch (error) {
        console.log("error", error);
    }
};

// postData('/data/new', { cat: 456 });
// getData('/all');
// fetch chain
generate.addEventListener('click', tempByZip);

function tempByZip() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemp(url, zipCode, apiKey)
        .then((data) => {
            postData('/data/new', { date: newDate, temp: data.main.temp, feeling: feelings })
            updateUI();
        })
};

const getTemp = async (url, zipCode, apiKey) => {
    const res = await fetch(`${url}${zipCode}&appid=${apiKey}`);
    try {
        const tempData = await res.json();
        return tempData;
    } catch (error) {
        console.log('Error', error);
    }
};

// updating UI Dynamically
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const entries = await req.json();
        console.log(entries);
        document.getElementById('date').innerHTML = entries.date;
        document.getElementById('temp').innerHTML = Math.round(entries.temp) + ' degrees';
        document.getElementById('content').innerHTML = entries.feeling;
    } catch (error) {
        console.log("Error Updating UI!", error);
    }
}