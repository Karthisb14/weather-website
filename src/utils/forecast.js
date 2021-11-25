const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=64cd8168d73be40d2e1ecc7ea6fd8c68&query=' + latitude + ',' + longitude + '&units=f'
 
    request({ url , json: true}, (error,{body}) => {
 
       if(error){
          callback('Unable to connect to weather service', undefined)
       }else if (body.error){
          callback('Unable to find a Location', undefined)
       }else {
          callback(undefined, body.current.weather_descriptions[0] + '.It is Currently a ' + body.current.temperature + ' '  + 'out there. There is no' + ' ' + body.current.feelslike + ' ' + 'degree out. The humidity is'+ '' + body.current.temperature + '' + '%.')
        }
 
    })
 
}

module.exports = forecast