const express= require('express')
const request=require('request')
//syntax of express
const app=express()
const dotenv=require('dotenv')
dotenv.config()
app.set("view engine", "ejs")
app.use('/public', express.static('public'));    //Ask express.js to look for folder called views

app.get("/",(req,res)=>{
    //res.send("hello")
    res.render("homepage.ejs")
})

app.get("/aboutMe",(req,res)=>{
    res.render("aboutme.ejs")
})

app.get("/result",(req,res)=>{
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.MovieName}`
    request(url,function(error, response , body){
        if(!error&&response.statusCode==200){
            const data=JSON.parse(body)   //parsing json to JS
            //res.send(data)
            //console.log(data)
            res.render("result", {movieData: data})

        }
        else
        {
            res.send("error found")
        }
    })
})

app.get("/result/:id",(req,res)=>{
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url,function(error, response , body){
        if(!error&&response.statusCode==200){
            const data=JSON.parse(body)   //parsing json to JS
            //res.send(data)
            console.log(data)
            res.render("aboutmovie", {movieInfo: data})

        }
        else
        {
            res.send("error found")
        }
    })
})


app.get("*",(req,res)=>{
    res.send("Wrong url")
})

//creating web server
app.listen(process.env.PORT,()=>{
    console.log("server started")
})

