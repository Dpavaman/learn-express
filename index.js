const express = require("express"); //returns a function

const app = express(); // :Express --  returns an object of type Express.

/*

this app Object has a bunch of useful methods such as 
1. app.get()
2. app.post()
3. app.put()
4. app.delete()

all the above methods corresponds to HTTP Methods
*/

// let's try with app.get()

app.get("/", (req, res) => {
  res.send("Hello world"); //on a request at "/" endpoint, we are sending a response with a string "Hello World"
});

app.get("/api/courses", (req, res) => {
  res.send("This page will have the details of the available courses");
  //This is another endpoint, when hit, it will provide the details of the courses available on the database.
});

// Below code corresponds to the listening of this app.
// on hosting the port can be assigned dynamically, thus process.env.PORT || 3000 is used below

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
