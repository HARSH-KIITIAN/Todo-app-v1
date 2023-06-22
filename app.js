const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+'/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

let day = "";
const items = ["Drink water","Do Excercise","Do Meditation"];
const workLists = [];

app.get("/", (req,res)=>{
    day = date.getDate();
    res.render("lists", {
        listTitle: day,
        newItems: items
    });
})

app.get("/work", (req,res)=>{
    res.render("lists", {
        listTitle: "Work List",
        newItems: workLists
    })
})

app.get("/about", (req,res)=>{
    res.render("about");
})

app.post("/", (req,res)=>{
    let item = req.body.newItem;
    if(req.body.list === 'Work'){
        workLists.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})