//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



const request = require('postman-request')

const forecast = (longtitue,latitue,cb) =>{
    const key = '6884a620c16b0dab5b60ec6331428c98'
    const url = 'http://api.weatherstack.com/current?access_key='+key+'&query='+latitue+','+longtitue
    //console.log(url)
    //api.weatherstack.com/current?access_key=6884a620c16b0dab5b60ec6331428c98&query=400.7831,-73.9712
    request({
        url : url,
        json:true
    },(error, {body})=>{
        if (error) {
            cb("Cannot run. Error is found",'')
        }
        else if (!body.current) {
            cb("now the error inside the body",'')
        } else {
            const location = body.location.country
            const temp = body.current.temperature
            const feel =  body.current.feelslike
            cb('',{location:location,forecastData:'in '+location+' temperature is '+temp+' but its feel like '+feel})
        }

    })
}
module.exports = forecast
