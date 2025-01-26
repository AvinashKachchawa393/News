const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));


app.get('/',(req,res)=>{ 
    res.send("hi i am root");
});

// root route
app.get('/news',async(req,res)=>{
    let rowData = await fetch('https://newsapi.org/v2/everything?q=india&apiKey=4c4266a294b84eedb45b9c874956224b');
    let data = await rowData.json();
    let news = data.articles;
    res.render('index.ejs',{news});
});

// search functionality
app.get('/news/search',async(req,res)=>{
    let search = req.query.search;
    let rowData = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=4c4266a294b84eedb45b9c874956224b`);
    let data  = await rowData.json();
    let news = data.articles;
    res.render('index.ejs',{news});
})

// ipl politics finance
app.get("/news/:id",async(req,res)=>{
    let {id} = req.params;
    let rowData = await fetch(`https://newsapi.org/v2/everything?q=${id}&apiKey=4c4266a294b84eedb45b9c874956224b`);
    let data = await rowData.json();
    let news = data.articles;
    res.render('index.ejs',{news});
});



app.listen(port,()=>{
    console.log(`Server is listing to port : ${port}`);
});