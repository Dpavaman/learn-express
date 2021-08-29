const Joi = require("joi");
const express = require("express"); //returns a function

const app = express(); // :Express --  returns an object of type Express.

app.use(express.json()); //this has to be enabled in order to parse the items being sent through the body object of request.

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

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
  res.send(courses);
});

//req.params will return an object that contains all the available route parameters, in our case it is "id"
//let's send the route paramater back as a response so that it verifies we are fetching the right parameter

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("The course you requested doesn'e exist");
  } else {
    res.send(course);
  }
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

//Let's learn app.post()

app.post("/api/courses", (req, res) => {
  const validationResult = validateCourse(req.body);

  if (validationResult.error) {
    res.status(400).send(validationResult.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1, //this is not the right way of assigning id, this would make a duplicate id if any item in between is deleted
    name: req.body.name, //assuming request body has an object which contains name of the course that is being added to courses
  };
  courses.push(course);
  res.send(courses);
});

// Let's learn app.put()

app.put("/api/courses/:id", (req, res) => {
  //Look up for the course with specified id
  // if course doesn't exist, return 404 (resource not found)

  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("Requested course is not available");
    return;
  }

  // else Validate
  // if Invalid, return 400 (Bad request),

  const validationResult = validateCourse(req.body);
  if (validationResult.error) {
    res.status(400).send(validationResult.error.details[0].message);
    return;
  }

  //if Valid, update the course and acknowledge the client on updation

  course.name = req.body.name;
  res.send(courses);
});

// Let's learn app.delete()

app.delete("/api/courses/:id", (req, res) => {
  // Look for the course wuth the specified id
  // if course doesn'r exists, return 404 (resource not found)
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("The course you requested was not found");
    return;
  }

  //if exists, delete the course and acknowledge the client
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});

// Below code corresponds to the listening of this app.
// on hosting the port can be assigned dynamically, thus process.env.PORT || 3000 is used below

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
