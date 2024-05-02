const express = require('express');

const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// connect to mongoDB
const dbURI ="mongodb+srv://christiepham:test1234@nodetuts.nkxtpsa.mongodb.net/blog-ejs?retryWrites=true&w=majority&appName=nodetuts"
mongoose.connect(dbURI)
.then((result)=> app.listen(3000)) //only listen to request after the database is connected
.catch((err)=>console.log(err))

// register view engine
app.set('view engine', 'ejs');

// manually set up a different views file folder that is not views
// app.set('views', 'myviews')

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res)=> {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'an example of a new blog',
//         body: 'body of the example blog'
//     });

//     blog.save()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>console.log(err))
// })

// app.get('/all-blogs', (req, res)=> {
//     Blog.find()
//      .then((result)=>{
//         res.send(result)
//      })
//      .catch((err)=> console.log(err))
// })

// app.get('/single-blog', (req, res)=>{
//     Blog.findById('663383d71107ac537798b856')
//     .then((result)=>{
//         res.send(result)
//      })
//      .catch((err)=> console.log(err))
// })


//middleware static files - have it accessible from the front-end
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
//logging middleware = show time loaded and .path
app.use(morgan('dev'))


// routes
app.get('/', (req,res) => {
    // const blogs = [
    //     {title: "Blog A", snippet:'This is something something'},
    //     {title: "Blog B", snippet: 'This is something something'},
    //     {title: "Blog C", snippet: 'This is something something'}
    // ]
    // res.render('index', {title: "Home", blogs});
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About"});
})

// app.get('/about-us', (req, res)=>{
//     res.redirect('/about');
// })


// blog routes
app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1}) //descending order
    .then((result)=> {
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    .then (err => console.log(err))

})
app.get('/blogs/create', (req,res) =>{
    res.render('create', {title: "Create blog"});
})

app.post('/blogs', (req, res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=> {
        res.redirect('/blogs')
    })
    .catch((err)=> {
        console.log(err)
    })
})

app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result=>{
            res.render('details', {title: 'Blog Details', blog:result})
        })
        .then(err=>console.log(err))

})

app.delete('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({ redirect: '/blogs'})
    })
    .catch(err=>console.log(err))

})

// 404 page
app.use((req, res)=> {
    res.status(404).render('404', {title: "Page not found"});
})