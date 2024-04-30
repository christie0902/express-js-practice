const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs');

// manually set up a different views file folder that is not views
// app.set('views', 'myviews')

app.listen(3000);


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