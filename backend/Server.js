require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const depObj = require("./models/Department");
const dsgObj = require("./models/Designation");
const empObj = require("./models/Employee");

const app = express();
app.use(cors());
app.use(express.json());

//Dep
app.post("/saveDep", (req, res) => {
  depObj
    .create(req.body)
    .then((d) => {
      res.json({ status: 1, message: "data saved" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "data not saved" });
    });
});

app.get("/getDep", (req, res) => {
  depObj
    .find()
    .then((d) => {
      res.json({ status: 1, data: d });
    })
    .catch((e) => {
      res.json({ status: -1, data: null });
    });
});

//Dsg
app.post("/saveDsg", (req, res) => {
  dsgObj
    .create(req.body)
    .then((d) => {
      res.json({ status: 1, message: "data saved" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "data not saved" });
    });
});

app.get("/getDsg", (req, res) => {
  dsgObj
    .find()
    .then((d) => {
      res.json({ status: 1, data: d });
    })
    .catch((e) => {
      res.json({ status: -1, data: null });
    });
});

//Emp
app.post("/saveEmp", (req, res) => {
  empObj
    .create(req.body)
    .then((d) => {
      res.json({ status: 1, message: "data saved" });
    })
    .catch((e) => {
      res.json({ status: -1, message: e.message });
    });
});

app.post("/updateEmp", (req, res) => {
  empObj
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((d) => {
      res.json({ status: 1, message: "data updated" });
    })
    .catch((e) => {
      res.json({ status: -1, message: e.message });
    });
});

app.get("/getEmp", (req, res) => {
  empObj
    .find()
    .populate("department")
    .populate("designation")
    .then((d) => {
      res.json({ status: 1, data: d });
    })
    .catch((e) => {
      res.json({ status: -1, data: null });
    });
});

mongoose.connect(process.env.DB_URL, () => {
  console.log("database connected");
  app.listen(process.env.PORT, () => {
    console.log("server running at port : " + process.env.PORT);
  });
});
