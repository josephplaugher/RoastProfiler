const axios = require('axios')
const confirmBox = document.getElementById('confirm')

const SaveChart = (chart) => {
    const request = axios({
        withCredentials: true,
        url: BASE_URL_DEV + '/saveProfile',
        method: "post",
        data: chart.data,
        responseType: "json",

    });
    request.catch(error => console.log("ajax error: " + error));
    request.data((resp) => {
        confirmBox.innerHTML = resp;
    })
};

const GetChart = (batch) => {
    const request = axios({
        withCredentials: true,
        url: BASE_URL_DEV + '/getProfile',
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