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

//on a request at "/" endpoint, we are sending a response with a string "Hello World"
app.get("/", (req, res) => {
  res.send("Hello world");
});

//This is another endpoint, when hit, it will provide the details of the courses available on the database.
app.get("/api/courses", (req, res) => {
  res.send("This page will have the details of the available courses");
});

//req.params will return an object that contains all the available route parameters, in our case it is "id"
//let's send the route paramater back as a response so that it verifies we are fetching the right parameter

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});
/* 
this is known as a route parameter, 
where from the courses we are trying to get only a particular course that corresponds to the given id 
*/

/* 

routes having multiple parameters are also accessed in the same manner as above. 
for instance. "/api/courses/:year/:semester" can be a route and 
/api/courses/2/4 would provide you all the courses related to 2nd Year and 4th semester of your stream.

these parameter can be accessed as below. 
to access year -- req.params.year
to access semester -- req.params.semester


we can also use query parameters in the route such as 

"/api/courses/:year/:semester?sortBy=name"

where the string "sortBy=name" after the question mark is known as a query, 
this query is used to provide some additional information to the backend. 

to access these queries, use "req.query" which will return an object of all the queries. 
{
    sortBy : "name"
}
in this case

*/

// Below code corresponds to the listening of this app.
// on hosting the port can be assigned dynamically, thus process.env.PORT || 3000 is used below

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
