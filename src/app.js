const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { SocketAddress } = require('net')
const geocode = require('./utils/geocoding')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicdirectoryname = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// setup handlerbar engine and  view location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)

// setup static directory to serve
app.use(express.static(publicdirectoryname))

app.get('',(req, res ) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Karthi'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Robot',
        name: 'Karthi'
    })
})

app.get('/help', ( req, res) => {
    res.render('help', {
        title: 'help',
        name: 'karthi'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
       return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location}= {}) => {
         
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {

            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/help/*'  ,(req, res) => {
    res.render('error' ,{
        title: '404',
        name: 'karthi',
        errormessage: 'Help article Not found'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        title: '404',
        name: 'karthi',
        errormessage: 'Page Not found'
    })

})


app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})
