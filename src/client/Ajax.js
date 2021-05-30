//const dotenv = require('dotenv').config()
const axios = require('axios')
var confirmBox = document.getElementById('confirm')


const SaveChart = (data) => {
    console.log('batch val in ajax.js: ', data)
    const request = axios({
        url: 'http://localhost:3005/saveProfile',
        method: "post",
        data: data,
        responseType: "json"
    });
    request.catch(error => console.log("ajax error: " + error));
    request.then((resp) => {
        confirmBox.innerHTML = resp.data.result;
    })
};

const GetChart = (batch) => {
    const request = axios({
        withCredentials: true,
        url: '/getProfile',
        method: "get",
        data: batch,
        responseType: "json",

    });
    request.catch(error => console.log("ajax error: " + error));
    request.data((resp) => {
        //more complex logic to populate the chart here
    })
};


module.exports = { SaveChart, GetChart };