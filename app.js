const express = require("express");
const app = express();
const https= require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
    
})
app.post("/",function(rreq,rres){
    console.log(rreq.body.cityName);
    const cityName = rreq.body.cityName;

    const appid = "YOUR ID"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName +"&appid="+ appid+"&units="+ unit
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(re){
            const weatherData = JSON.parse(re)
            const temp = weatherData.main.temp;
            const icon =weatherData.weather[0].icon
            imageurl = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
        rres.write("<h1>the temperature in " + cityName+ " is " + temp + "degree cel</h1>");
        rres.write("<img src ="  +imageurl+ ">")
        rres.send()
        })
    })
})


/**/
app.listen(3000,function(){
    console.log("your port is running on 3000");
})
