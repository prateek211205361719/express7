
var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3000;


var hbs = require('hbs');
hbs.registerHelper('toCapital', function(text){
    return text.toUpperCase();
});
hbs.registerPartials(__dirname+'/views/partial');
hbs.registerHelper('getDate', function(text){
    return new Date().getFullYear();
});
app.set('view engine', hbs);

app.use(function(req, res, next){
    var log = req.method+' '+req.url+' '+req.ip+' '+new Date().getFullYear()+ ' \n';
    fs.appendFileSync('user.log', log);
    next();
});

app.get('/', function(req, res){
    res.render('home.hbs', {
         title:'Home page'
    });
});
app.get('/about', function(req, res){
    res.render('about.hbs', {
        title:'About page'
    });
});
app.get('/user/:id', function(req, res){
   res.render('user.hbs', {
        title:req.params.id,
    });
});
app.listen(port, function(){
    console.log('------running on port----'+port);
});