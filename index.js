require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");

// initialise express
const app = express();

//  mondodb connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB not connected: " + err));

// create a schema
const studentSchema = new mongoose.Schema({
  roll_no: Number,
  name: String,
  year: Number,
  subjects: [String],
});

// create a model with studentSchema
const Student = mongoose.model("Student", studentSchema);

// get documents
app.get("/", (req, res) => {
  Student.find({})
    .then(function (FoundItems) {
      res.send(FoundItems);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// get documents
app.get("/new", (req, res) => {
  // Create a new document
  const stud = new Student({
    roll_no: 1001,
    name: "Madison Hyde",
    year: 3,
    subjects: ["DBMS", "OS", "Graph Theory", "Internet Programming"],
  });
  // Add the document to Collections
  stud.save().then(
    () => res.send('New Data Saved'),
    (err) => res.send('Error Saving')
  );
  // Save method can also be written as:
  // stud.save((err, result) => {
  //     if(err) console.log(err);
  //     else console.log("entry added");
  // });
});

// Server listen
app.listen(3000, () => console.log("Server listening to port 3000"));
