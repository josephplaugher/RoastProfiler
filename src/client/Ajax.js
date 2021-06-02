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

const GetBatchList = () => {
    if (getBatch.options.length == 1) {
        console.log('get batch')
        const request = axios({
            url: 'http://localhost:3005/getBatchList',
            method: "get",
            responseType: "json"
        });
        request.catch(error => console.log("ajax error: " + error));
        request.then((resp) => {
            var batches = resp.data.result.rows
            console.log('retrieved batches,', batches)
            for (i = 0; i < batches.length; i++) {
                var newOption = document.createElement('option')
                console.log('this bach: ', batches[i].batch)
                newOption.text = batches[i].batch
                getBatch.add(newOption, getBatch[i])
            }
        })
    } else { console.log('options already populated') }
}

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


module.exports = { SaveChart, GetBatchList, GetChart };