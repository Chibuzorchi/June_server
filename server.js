const express = require("express");
const app = express();
const port = 7000;
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose")
const User = require("./models/User.js")
const bcrypt = require("bcryptjs")

//DB Connection
mongoose.connect("mongodb://localhost/MyBlog")
.then(response => console.log("Database Connected Successfully"))
.catch(error => console.log(`Database connection:${error}`))


//Morgan Setup
app.use(logger("dev"));

//Setup View Engine to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/", (req, res) => {
    res.render("home")
});

app.get("/", (req, res) => {
    res.render("login")
});

app.get("/", (req, res) => {
    res.render("new-post")
});
app.post("/user/register", async (req, res) => {
    let {userName, password, confirmPassword, email, summary, image} = req.body;
    if(password.length > 6){
        console.log("password must be greater than six")
    }
    else if (password != confirmPassword) {
        console.log("password not the same")
    }
    let userExist = await User.findOne({email})
    if(userExist){
        console.log("User already exist")
    }
    else{
 
const salt = await bcrypt.genSalt(10)        
const hashedPassword = await bcrypt.hash(password, salt)
        let newUser = new User({
            userName,
            password : hashedPassword,
            email,
            summary,
            image
    
        })
        newUser = await newUser.save();
        if(!newUser){
            console.log("Something went wrong")
        }else{
            console.log(`Registration successful ${newUser}`)
        }

    }

})
app.get('/newpost', (req,res) => {
    res.render('newpost');
})

app.listen(port, () => console.log(`Server running on ${port}`))