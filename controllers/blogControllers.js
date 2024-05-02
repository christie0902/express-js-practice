const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //descending order
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            if (!result) {
                res.status(404).send('Blog not found');
                return;
            }
            res.render('details', { title: 'Blog Details', blog: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create blog' });
}

const blog_create_post =(req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                res.status(404).send('Blog not found');
                return;
            }
            res.json({ redirect: '/' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}