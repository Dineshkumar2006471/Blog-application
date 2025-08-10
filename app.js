import express from "express";
import bodyParser from "body-parser";

const app =express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let posts = [];
let postId = 1;

// Home page - Show all posts and form to create a new one
app.get("/", (req, res) => {
    res.render("home", {posts});
});

// Handle post creation
app.post("/create", (req, res) => {
    const {title, content} = req.body;
    posts.push({id:postId++, title, content});
    res.redirect("/");
});

// Show edit form
app.get("/edit/:id", (req,res) => {
    const post = posts.find(p => p.id == req.params.id);
    if(post){
        res.render("edit", {post});
    } else{
        res.status(404).send("post not found");
    }
});

// Handle post update
app.post("/edit/:id", (req,res) => {
    const post = posts.find(p => p.id ==req.params.id);
    if(post){
        post.title =req.body.title;
        post.content =req.body.content;
    res.redirect("/");
    }else{
        res.status(404).send("post not found");
    }
});

// Handle delete
app.post("/delete/:id", (req, res) => {
    posts = posts.find(p => p.id != req.params.id);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port} `);
});