const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const port = 4000;
const session = require("express-session");
const Sequelize = require('sequelize');
const {User, Bathroom} = require("./models"); // Replace the path with the correct one for your project
// const {Bathroom, Review, User} = require("./models"); // Replace the path with the correct one for your project

require("dotenv").config();
//-----------------------login auth---------------------------------------------

//prints to the console what request was made and the status returned
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
      // the 'finish' event will be emitted when the response is handed over to the OS
      console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});

app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, 
      },
    })
  );
//--------------------------------------welcome-------------------------------
app.get("/", (req, res) => {
  res.send("Welcome to Nature's Call!");
});
//-----------------------login, sign up, and logout -----------------
  //signUp
  app.post("/signup", async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
  
    try {
      const user = await User.create({ 
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        photo:req.body.photo

      });
      req.session.userId = user.id;
      // Send a response to the client informing them that the user was successfully created
      res.status(201).json({
        message: "User created",
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {

      console.error(error);
      if (error.name === "SequelizeValidationError") {
        return res
          .status(422)
          .json({ errors: error.errors.map((e) => e.message) });
      }
      res.status(500).json({
        message: "Error occurred while creating user",
        error: error,
        
      });
    }

  });
  //login using credentials--------------------------------------------- (name email and pass)
  app.post("/login", async (req, res) => {
    try {
      // find user by email
      const user = await User.findOne({ where: { email: req.body.email } });
  
      if (user === null) {
        // user not found
        return res.status(401).json({
          message: "unknown credentials",
        });
      }
  
      // if user found, use bcrypt to check if password matches hashed password
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (result) {
          // Passwords match, create session
          req.session.userId = user.id;
          res.status(200).json({
            message: "Logged in successfully",
            user: {
              name: user.name,
              email: user.email,
            },
          });
        } else {
          // Passwords don't match
          res.status(401).json({ message: "Incorrect password" });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred during the login process" });
    }
  });
//logout (destroy session)
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    
    return res.status(200).json({ message: "Logout successful" });
  });
});
//------------------------------------------------------------------------------

//get all of our databases bathrooms
app.get("/bathrooms", async (req, res) => {
  try {
    const allbathrooms = await Bathroom.findAll();


    res.status(200).json(allbathrooms);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});