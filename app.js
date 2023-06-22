const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

let day = "";
let items = ["Drink water","Do Excercise","Do Meditation"];

app.get("/", (req,res)=>{
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    day = today.toLocaleDateString("en-US", options);

    res.render("lists", {
        kindofDay: day,
        newItems: items
    });
})

app.post("/", (req,res)=>{
    let item = req.body.newItem;
    items.push(item);
    res.render("lists", {
        kindofDay: day,
        newItems: items
    });
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})