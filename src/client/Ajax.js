//const dotenv = require('dotenv').config()
const axios = require('axios')
const confirmBox = document.getElementById('confirm')
const getBatch = document.getElementById('get-batch');

const SaveChart = (data) => {
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

const GetBatchList = (getSelectedChart) => {
    if (getBatch.options.length == 1) {
        const request = axios({
            url: 'http://localhost:3005/getBatchList',
            method: "get",
            responseType: "json"
        });
        request.catch(error => console.log("ajax error: " + error));
        request.then((resp) => {
            var batches = resp.data.result.rows
            for (i = 0; i < batches.length; i++) {
                var newOption = document.createElement('option')
                newOption.text = batches[i].batch
                newOption.id = batches[i].id
                newOption.onclick = (event) => { getSelectedChart(event) }
                getBatch.add(newOption, getBatch[i])
            }
        })
    }
}

const GetChart = (event) => {
    return new Promise((resolve, reject) => {

        const request = axios({
            url: '/getChart/' + event.target.id,
            method: "get",
            data: event.target.id,
            responseType: "json",

        });
        request.catch(error => { reject(console.log("ajax error: " + error)) });
        request.then((resp) => {
            resolve(resp.data.result[0])
        })
    })
}


module.exports = { SaveChart, GetBatchList, GetChart };