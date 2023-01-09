const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c688a938edee305933ad722fbae8ed8a&query=' + encodeURIComponent(latitude) + ',' + + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(
            undefined, 
            body.current.weather_descriptions[0]  
            + '. It is currently '+ body.current.temperature + ' degrees out.It feels like '
            + body.current.feelslike + ' degrees out.'
            +'Time zone: ' + body.location.timezone_id + 'Local time is: ' + body.location.localtime)
        }
    })
}

module.exports = forecast