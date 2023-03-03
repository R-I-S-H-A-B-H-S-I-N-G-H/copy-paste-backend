const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const COPYSCHEMA = require("./schema/copydata");

const URL =
  "mongodb+srv://copytest:copytest@cluster0.vpid4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URL).catch((err) => {
  console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 2001;
app.listen(2020, () => {
  console.log("PORT LIVE " + `${PORT}`);
});

async function createData(data) {
  try {
    const res = await COPYSCHEMA.create({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getData(top = 10) {
  try {
    const res = await COPYSCHEMA.find().sort({ _id: -1 }).limit(top);
    return res;
  } catch (error) {
    return error.message;
  }
}

app.get("/", (req, res) => {
  getData(1)
    .then((result) => {
      return res.json({
        result,
      });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
});

app.post("/", (req, res) => {
  // console.log(req.body);
  // console.log(req.body.data);

  if (req.body.data === undefined || req.body.data === null)
    return res.status(400).json("ERROR");

  createData(req.body.data)
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
});

app.get("/:size", (req, res) => {
  var size = req.params.size | 1;
  getData(size)
    .then((result) => {
      return res.json({
        result,
      });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
});
