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

const geocode = (place,cb) =>{
    const mapBoxToken = 'pk.eyJ1Ijoicm9peSIsImEiOiJjbGhkY2x3Z2swZ2NnM2xtaG1kOXJib2s5In0.ptK5Ey6jKgyloeEPyhTJ1g'
    const urlMapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token="+mapBoxToken+"&limit=1"

   // console.log(urlMapBox)

    request({
        url : urlMapBox,
        json:true
    },(error, {body})=>{
        if (error) {
            cb("Cannot run. Error is found",'')
        }
        else if (body.features.length<1) {
            cb("now the error inside the body",'')
        } else {
            const latitue = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            cb('',{latitue:latitue,longitude:longitude})
        }

    })
}
module.exports = geocode
