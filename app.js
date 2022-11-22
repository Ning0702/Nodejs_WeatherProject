const express = require( "express" );
const https = require( "https" ); // npm i https
const bodyParser = require( "body-parser" ); // npm i body-parser

const app = express(); //for express
const port = 3000;

app.use( bodyParser.urlencoded( { extended: true } ) ); // start the body-parser

app.get( "/", ( req, res ) =>
{
    res.sendFile( __dirname + "/index.html" );
} );

app.post( "/", ( req, res ) =>
{
    console.log( req.body.cityName );
    const city = req.body.cityName;
    const appID = "..."; //This part is deleted for privacy.Sorry
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + appID;
    https.get( url, ( response ) =>
    {
        response.on( "data", ( data ) =>
        {
            const weatherData = JSON.parse( data );
            const temp = weatherData.main.temp;
            const description = weatherData.weather[ 0 ].description;
            const icon = " http://openweathermap.org/img/wn/" + weatherData.weather[ 0 ].icon + "@2x.png";
            
            res.write( "<h1>The temperature in " + req.body.cityName +" is " + temp + " degrees Celcius.</h1>" );
            res.write( "<p>The weather description is " + description + "</p>" );
            res.write( "<img src=" + icon + " >" );
            res.send();
        } );
    } );
} );

app.listen( port, () =>
{
    console.log( "listening" );
} );
