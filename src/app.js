

const path = require('path')
const hbs = require('hbs')
const express = require("express");
const app = express()
const geo = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const listenFunc = () => {
    console.log('server is up')
}

const publicDirectoryPath = path.join(__dirname, '../public')
console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));


app.set('view engine', 'hbs')
const viewPath = path.join(__dirname, '../views')
const partialPath = path.join(__dirname, '../template')
app.set('views', viewPath)
console.log(partialPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'This is main page',
        name: 'Roi Yadgar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'About me',
        name: 'Roi Yadgar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Roi Yadgar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error_message: "Didng't get adress!!!"
        })
    }

    geo(req.query.address, (error, parameters) => {
        if (error) {
            return res.send({
                error_message: error
            })
        }
        forecast(parameters.latitue, parameters.longitude, (error, reply) => {
            if (error) {
                return res.send({
                    error_message: error
                })
            }
            res.send({
                forecast: reply.forecastData,
                location: reply.location,
                address:req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('e404', {
        error_message: 'Help article now found'
    })
})

app.get('*', (req, res) => {
    res.render('e404', {
        error_message: 'Page not found'
    })
})



app.listen(port, listenFunc)