const express = require('express');

const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')


// connect to mongoDB
const dbURI ="mongodb+srv://christiepham:test1234@nodetuts.nkxtpsa.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts"
mongoose.connect(dbURI)
.then((result)=> app.listen(3000)) //only listen to request after the database is connected
.catch((err)=>console.log(err))

// register view engine
app.set('view engine', 'ejs');

// manually set up a different views file folder that is not views
// app.set('views', 'myviews')



//middleware static files - have it accessible from the front-end
app.use(express.static('public'))

//logging middleware = show time loaded and .path
app.use(morgan('dev'))

app.get('/', (req,res) => {
    const blogs = [
        {title: "Blog A", snippet:'This is something something'},
        {title: "Blog B", snippet: 'This is something something'},
        {title: "Blog C", snippet: 'This is something something'}
    ]
    res.render('index', {title: "Home", blogs});
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About"});
})

// app.get('/about-us', (req, res)=>{
//     res.redirect('/about');
// })

app.get('/blogs/create', (req,res) =>{
    res.render('create', {title: "Create blog"});
})


// 404 page
app.use((req, res)=> {
    res.status(404).render('404', {title: "Page not found"});
})