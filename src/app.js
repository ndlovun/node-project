const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { CONNREFUSED } = require('dns')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Nkanyiso Ndlovu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nkanyiso Ndlovu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'You have reached the A team.',
        name: 'Nkanyiso Ndlovu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
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

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help page',
        message: 'Help article not found.',
        name: 'Nkanyiso Ndlovu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Page not found.',
        name: 'Nkanyiso Ndlovu'
    })
})

app.listen('3002', "127.0.0.1", () => {
    console.log('Server is up on port 3002.')
})