const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.ipstack.com/223.184.120.205?access_key=33d42ad61d849af2e97feb3d32f20bd4'
    request({ url: url , json: true}, (error,response) => {
 
       if(error){
          callback('Unable to connect to weather service', undefined)
       }else if (response.body.error){
          callback('Unable to find a Location', undefined)
       }else {
          callback(undefined, response.body.current.weather_descriptions[0] + '.It is Currently a ' + response.body.current.temperature + ' '  + 'out there. There is no' + ' ' + response.body.current.feelslike + ' ' + 'chance of rain.')
        }
 
    })
 
}

forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
 })